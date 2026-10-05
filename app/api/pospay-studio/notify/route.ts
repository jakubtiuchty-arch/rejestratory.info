import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { authorizedPospayRequest, parseNotification, PospayRegistration } from "@/lib/pospay-registration";
import { pospayErrorResponse, pospayRPC } from "@/lib/pospay-portal";
import { sendClientPanelEmail } from "@/lib/client-panel-email";

export const runtime = "nodejs";

// Ta ścieżka jest wywoływana wyłącznie przez przycisk „Wyślij mail” w Pospay Studio.
export async function POST(request: NextRequest) {
  if (!authorizedPospayRequest(request.headers.get("authorization"))) return NextResponse.json({ message: "Brak dostępu do integracji." }, { status: 401 });
  try {
    if (Number(request.headers.get("content-length")) > 50000) return NextResponse.json({ message: "Zgłoszenie jest za duże." }, { status: 413 });
    const notification = parseNotification(await request.json());
    const claimId = randomUUID();
    const claim = await pospayRPC("claim_email", { ...notification, claimId });
    if (claim.status === "sent") return NextResponse.json({ success: true, ...claim });
    if (!claim.claimed) return NextResponse.json({ success: false, status: "sending", message: "Trwa wcześniejsza wysyłka tej wiadomości." }, { status: 202 });
    const registrations = claim.registrations as PospayRegistration[];
    let emailId: string;
    try {
      emailId = await sendClientPanelEmail({
        clientName: claim.clientName, deviceType: "Posnet Pospay", serialNumber: registrations[0].serialNumber,
        allSerialNumbers: registrations.map(r => r.serialNumber),
        fiscalizations: registrations.map(r => ({ serialNumber: r.serialNumber, forestryUnit: r.forestryUnit,
          date: r.fiscalizationDate, nextInspection: r.nextInspectionDate })),
        taxpayerNIP: claim.taxpayerNIP,
      }, notification.recipients, "pospay-batch/" + notification.batchId);
    } catch {
      await pospayRPC("finish_email", { batchId: notification.batchId, claimId, error: "Brak potwierdzenia przyjęcia maila przez dostawcę." });
      return NextResponse.json({ message: "Nie potwierdzono wysyłki maila. Dane urządzeń są zachowane w panelu." }, { status: 502 });
    }
    const result = await pospayRPC("finish_email", { batchId: notification.batchId, claimId, emailId });
    return NextResponse.json({ success: true, ...result, deviceCount: registrations.length });
  } catch (error) {
    if (error instanceof SyntaxError) return NextResponse.json({ message: "Nieprawidłowy JSON." }, { status: 400 });
    const result = pospayErrorResponse(error);
    return NextResponse.json({ message: result.message }, { status: result.status });
  }
}
