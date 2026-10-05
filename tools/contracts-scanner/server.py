"""Private scan adapter. Run behind HTTPS on a TAKMA-controlled server.

Requires clamscan, current ClamAV signatures and qpdf. No document content or
original filename is logged or sent to a third party. Original bytes are kept.
"""
import hashlib
import hmac
import json
import os
from pathlib import Path
import subprocess
import tempfile
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

MAX_BYTES = 3 * 1024 * 1024
TOKEN = os.environ.get("CONTRACT_SCAN_TOKEN", "")
SLOTS = threading.BoundedSemaphore(2)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_args):
        pass

    def reply(self, status, body):
        data = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        if self.path != "/scan" or not hmac.compare_digest(self.headers.get("Authorization", ""), "Bearer " + TOKEN):
            return self.reply(403, {"clean": False})
        if not SLOTS.acquire(blocking=False):
            return self.reply(503, {"clean": False})
        try:
            self.connection.settimeout(15)
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_BYTES:
                return self.reply(413, {"clean": False})
            data = self.rfile.read(length)
            if len(data) != length or not data.startswith(b"%PDF-"):
                return self.reply(422, {"clean": False})
            signatures = list(Path(os.environ.get("CLAMAV_DB_DIR", "/var/lib/clamav")).glob("daily.*"))
            if not signatures or max(p.stat().st_mtime for p in signatures) < time.time() - 48 * 3600:
                return self.reply(503, {"clean": False})
            with tempfile.TemporaryDirectory(prefix="takma-scan-") as directory:
                file = Path(directory) / "document.pdf"
                file.write_bytes(data)
                file.chmod(0o600)
                parser = subprocess.run(["qpdf", "--check", str(file)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)
                encrypted = subprocess.run(["qpdf", "--is-encrypted", str(file)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)
                if parser.returncode != 0 or encrypted.returncode != 2:
                    return self.reply(422, {"clean": False})
                result = subprocess.run(["clamscan", "--no-summary", str(file)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=15)
                if result.returncode != 0:
                    return self.reply(422 if result.returncode == 1 else 503, {"clean": False})
            self.reply(200, {"clean": True, "sha256": hashlib.sha256(data).hexdigest()})
        except Exception:
            self.reply(503, {"clean": False})
        finally:
            SLOTS.release()


if __name__ == "__main__":
    if len(TOKEN) < 32:
        raise SystemExit("Configure CONTRACT_SCAN_TOKEN (at least 32 chars).")
    # Do not publish this HTTP port directly. TLS/reverse-proxy access required.
    ThreadingHTTPServer((os.environ.get("SCAN_BIND", "127.0.0.1"), int(os.environ.get("SCAN_PORT", "8088"))), Handler).serve_forever()
