'use client';
import React from 'react';
import { LockKeyhole, FileText, Download } from 'lucide-react';

interface Contract { id: string; name: string; number: string; signed_on: string; bytes: number }
export default function ContractsSection({ clientName }: { clientName: string }) {
  const [serial, setSerial] = React.useState(''), [challengeId, setChallengeId] = React.useState('');
  const [code, setCode] = React.useState(''), [contracts, setContracts] = React.useState<Contract[] | null>(null);
  const [expiresAt, setExpiresAt] = React.useState(0), [resendAt, setResendAt] = React.useState(0);
  const [now, setNow] = React.useState(Date.now()), [busy, setBusy] = React.useState(false), [message, setMessage] = React.useState('');
  const generation = React.useRef(0);
  React.useEffect(() => {
    generation.current++; setSerial(localStorage.getItem('serial_number') || '');
    setContracts(null); setChallengeId(''); setCode(''); setExpiresAt(0); setMessage('');
    // No automatic re-opening from a previously unlocked client/browser state.
    fetch('/api/contracts/logout', { method: 'POST', cache: 'no-store' }).catch(() => undefined);
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => { generation.current++; clearInterval(timer); };
  }, [clientName]);
  React.useEffect(() => { if (expiresAt && now >= expiresAt) { setContracts(null); setExpiresAt(0); setMessage('Dostęp wygasł. Odblokuj umowy ponownie.'); } }, [now, expiresAt]);
  async function call(path: string, body?: unknown) {
    const response = await fetch(path, { method: body ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store',
      headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Nie udało się obsłużyć umów.');
    return result;
  }
  async function perform(action: () => Promise<void>) {
    setBusy(true); setMessage('');
    try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Spróbuj ponownie później.'); }
    finally { setBusy(false); }
  }
  const send = () => perform(async () => {
    const version = generation.current, result = await call('/api/contracts/request-code', { serial });
    if (generation.current !== version) return;
    setChallengeId(result.challengeId); setCode(''); setResendAt(Date.now() + result.resendAfter * 1000); setMessage(result.message);
  });
  const verify = () => perform(async () => {
    const version = generation.current;
    await call('/api/contracts/verify-code', { challengeId, code });
    const result = await call('/api/contracts?serial=' + encodeURIComponent(serial));
    if (generation.current !== version) return;
    setContracts(result.contracts); setExpiresAt(Date.parse(result.expiresAt)); setChallengeId(''); setCode('');
  });
  const lock = () => perform(async () => {
    setContracts(null); setExpiresAt(0); setCode(''); setChallengeId('');
    await call('/api/contracts/logout', {});
  });
  return <section className="mt-6" aria-labelledby="contracts-heading">
    <h2 id="contracts-heading" className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-emerald-700" />Umowy</h2>
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {contracts === null ? <>
        <p className="text-sm text-gray-600 mb-3">Umowy są dostępne po potwierdzeniu kodem SMS na numer telefonu zatwierdzony podczas rejestracji.</p>
        {challengeId && <form onSubmit={e => { e.preventDefault(); void verify(); }} className="flex flex-wrap items-end gap-3 mb-3">
          <label className="text-sm text-gray-700">Kod SMS<input aria-label="Kod SMS" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} className="block mt-1 border rounded-lg px-3 py-2 w-40 tracking-widest" /></label>
          <button disabled={busy || code.length !== 6} className="bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-50">Odblokuj umowy</button>
        </form>}
        <button onClick={() => void send()} disabled={busy || now < resendAt || !serial} className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg px-4 py-2 disabled:opacity-50">
          {busy ? 'Sprawdzanie…' : now < resendAt ? `Ponowny kod za ${Math.ceil((resendAt - now) / 1000)} s` : challengeId ? 'Wyślij nowy kod' : 'Odblokuj kodem SMS'}
        </button>
      </> : <>
        <div className="flex justify-between items-center mb-3"><p className="text-sm text-emerald-700">Dostęp do {new Date(expiresAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</p><button onClick={() => void lock()} disabled={busy} className="text-sm text-gray-600 underline">Zablokuj umowy</button></div>
        {contracts.length === 0 && <p className="text-sm text-gray-600">Nie dodano jeszcze umów.</p>}
        {contracts.map(contract => <div key={contract.id} className="flex justify-between items-center gap-4 border-t py-3">
          <div><p className="text-sm font-semibold flex items-center gap-2"><FileText className="h-4 w-4" />{contract.name}</p><p className="text-xs text-gray-500">{contract.number} · {new Date(contract.signed_on + 'T12:00:00').toLocaleDateString('pl-PL')} · PDF</p></div>
          <button className="flex gap-2 items-center text-sm text-emerald-700" disabled={busy} onClick={() => void perform(async () => {
            const version = generation.current, parts: BlobPart[] = [], chunk = 3 * 1024 * 1024;
            for (let offset = 0; offset < contract.bytes; offset += chunk) {
              const end = Math.min(offset + chunk, contract.bytes) - 1;
              const response = await fetch(`/api/contracts/${contract.id}/download?serial=${encodeURIComponent(serial)}`, {
                cache: 'no-store', credentials: 'same-origin', headers: { Range: `bytes=${offset}-${end}` },
              });
              if (!response.ok) { const error = await response.json(); if (response.status === 401) setContracts(null); throw new Error(error.message); }
              if (generation.current !== version) return;
              const part = await response.arrayBuffer();
              if (response.status !== 206 || response.headers.get('content-range') !== `bytes ${offset}-${end}/${contract.bytes}` || part.byteLength !== end - offset + 1) throw new Error('Nie ukończono pobierania PDF. Spróbuj ponownie.');
              parts.push(part);
            }
            if (generation.current !== version) return;
            const url = URL.createObjectURL(new Blob(parts, { type: 'application/pdf' })), link = document.createElement('a'); link.href = url; link.download = `umowa-${contract.id}.pdf`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
          })}><Download className="h-4 w-4" />Pobierz</button>
        </div>)}
      </>}
      {message && <p role="status" className="text-sm text-gray-700 mt-3">{message}</p>}
    </div>
  </section>;
}
