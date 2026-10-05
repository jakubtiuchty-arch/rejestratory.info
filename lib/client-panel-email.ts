import { Resend } from "resend";

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!));
}

export async function sendClientPanelEmail(data: EmailData, recipients: string[], idempotencyKey?: string): Promise<string> {
  if (!process.env.RESEND_API_KEY) throw new Error("Nie skonfigurowano wysyłki maili.");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: "TAKMA <noreply@rejestratory.info>",
    replyTo: "serwis@takma.com.pl",
    to: recipients,
    subject: "Urządzenia zostały dodane do Panelu Klienta | TAKMA",
    html: generateEmailHtml(data),
  }, idempotencyKey ? { idempotencyKey } : undefined);
  if (result.error || !result.data?.id) throw new Error(result.error?.message || "Brak potwierdzenia przyjęcia maila.");
  return result.data.id;
}

export interface EmailData {
  clientName: string;
  deviceType: string;
  serialNumber: string;
  allSerialNumbers: string[];
  taxpayerNIP?: string;
  fiscalizations?: { serialNumber: string; date: string; nextInspection: string; forestryUnit: string }[];
}

export function generateEmailHtml(data: EmailData): string {
  const clientName = escapeHtml(data.clientName);
  const deviceType = escapeHtml(data.deviceType);
  const serialNumber = escapeHtml(data.serialNumber);
  const details = data.fiscalizations;
  const date = (value: string) => escapeHtml(value.split("-").reverse().join("."));
  const fiscalRows = details?.map(item => `<tr>
    <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.serialNumber)}</td>
    <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.forestryUnit)}</td>
    <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${date(item.date)}</td>
    <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${date(item.nextInspection)}</td>
  </tr>`).join("") || "";
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

    <!-- Header z logo -->
    <div style="background: #ffffff; padding: 24px 40px; border-bottom: 1px solid #e5e7eb;">
      <img src="https://rejestratory.info/rejestratory_logo_footer_header.png" alt="rejestratory.info" style="height: 38px;">
    </div>

    <!-- Banner -->
    <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 28px 40px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: bold;">
        Urządzenia dodane do Panelu Klienta
      </h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 40px;">
      <p style="font-size: 16px; color: #374151; margin: 0 0 24px 0; line-height: 1.6;">
        Szanowni Państwo,
      </p>

      <p style="font-size: 15px; color: #4b5563; margin: 0 0 30px 0; line-height: 1.6;">
        Informujemy, że urządzenia dla Państwa Nadleśnictwa zostały zarejestrowane w <strong>Panelu Klienta</strong>.
        Od teraz mają Państwo pełną kontrolę nad ewidencją urządzeń oraz możliwość szybkiego zgłaszania serwisu.
      </p>

      <!-- Device Info Box -->
      <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 140px;">Klient:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: bold;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Typ urządzenia:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: bold;">${deviceType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Przykładowy S/N:</td>
            <td style="padding: 8px 0; font-size: 14px;">
              <code style="background: #e5e7eb; padding: 4px 10px; border-radius: 6px; font-family: monospace; color: #059669; font-weight: bold;">
                ${serialNumber}
              </code>
            </td>
          </tr>
        </table>
      </div>

${details ? `<div style="margin-bottom:30px;">
        <p><strong>NIP podatnika:</strong> ${escapeHtml(data.taxpayerNIP || "")}</p>
        <p><strong>Liczba dodanych urządzeń:</strong> ${details.length}</p>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead><tr style="background:#ecfdf5;"><th style="padding:10px;text-align:left;">Numer unikatowy</th><th style="padding:10px;text-align:left;">Leśnictwo</th><th style="padding:10px;text-align:left;">Fiskalizacja</th><th style="padding:10px;text-align:left;">Następny przegląd</th></tr></thead>
          <tbody>${fiscalRows}</tbody>
        </table>
      </div>` : ""}

      <!-- Features Section -->
      <h2 style="font-size: 18px; color: #111827; margin: 0 0 20px 0; font-weight: bold;">
        Co daje Panel Klienta?
      </h2>

      <!-- Feature 1 -->
      <div style="display: flex; align-items: flex-start; margin-bottom: 12px; padding: 16px; background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); border-radius: 10px; border: 1px solid #e5e7eb;">
        <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 14px; flex-shrink: 0; font-size: 14px; font-weight: bold; color: #ffffff;">
          1
        </div>
        <div>
          <h3 style="margin: 0 0 4px 0; font-size: 15px; color: #111827; font-weight: bold;">
            Ewidencja urządzeń
          </h3>
          <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
            Pełna lista wszystkich urządzeń Nadleśnictwa w jednym miejscu z datami zakupu i gwarancjami.
          </p>
        </div>
      </div>

      <!-- Feature 2 -->
      <div style="display: flex; align-items: flex-start; margin-bottom: 12px; padding: 16px; background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); border-radius: 10px; border: 1px solid #e5e7eb;">
        <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 14px; flex-shrink: 0; font-size: 14px; font-weight: bold; color: #ffffff;">
          2
        </div>
        <div>
          <h3 style="margin: 0 0 4px 0; font-size: 15px; color: #111827; font-weight: bold;">
            Przypisanie do leśnictwa
          </h3>
          <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
            Możliwość przypisania każdego urządzenia do konkretnego leśnictwa dla łatwego zarządzania sprzętem.
          </p>
        </div>
      </div>

      <!-- Feature 3 -->
      <div style="display: flex; align-items: flex-start; margin-bottom: 30px; padding: 16px; background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); border-radius: 10px; border: 1px solid #e5e7eb;">
        <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 14px; flex-shrink: 0; font-size: 14px; font-weight: bold; color: #ffffff;">
          3
        </div>
        <div>
          <h3 style="margin: 0 0 4px 0; font-size: 15px; color: #111827; font-weight: bold;">
            Serwis jednym kliknięciem
          </h3>
          <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
            W razie awarii możliwość wysłania urządzenia do serwisu bez dzwonienia - zamówienie kuriera online.
          </p>
        </div>
      </div>

      <!-- Note about new features -->
      <p style="font-size: 13px; color: #6b7280; margin: 0 0 30px 0; font-style: italic; text-align: center;">
        Stale pracujemy nad nowymi funkcjami - kolejne udogodnienia będą sukcesywnie dodawane.
      </p>

      <!-- CTA Section -->
      <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 30px;">
        <h3 style="color: #ffffff; margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">
          Jak się zalogować?
        </h3>
        <p style="color: #d1fae5; margin: 0 0 16px 0; font-size: 14px; line-height: 1.5;">
          Wystarczy wejść na stronę panelu i wpisać numer seryjny jednego z dostarczonych urządzeń.
        </p>
        <a href="https://rejestratory.info/panel-klienta" style="display: inline-block; background: #ffffff; color: #059669; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">
          Przejdź do Panelu Klienta →
        </a>
      </div>

      <!-- Tip Box -->
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
        <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.5;">
          <strong>Wskazówka:</strong> Warto zapisać link do panelu w zakładkach przeglądarki dla szybkiego dostępu.
        </p>
      </div>

      <!-- Signature -->
      <p style="font-size: 14px; color: #4b5563; margin: 0 0 16px 0; line-height: 1.6;">
        Z poważaniem,<br>
        <strong>Zespół TAKMA</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f3f4f6; padding: 20px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151; font-weight: bold;">
        TAKMA
      </p>
      <p style="margin: 0; font-size: 13px; color: #6b7280;">
        Tel: 601 619 898 &nbsp;•&nbsp; serwis@takma.com.pl &nbsp;•&nbsp; rejestratory.info
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
