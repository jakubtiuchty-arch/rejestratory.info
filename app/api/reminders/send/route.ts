import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

// Inicjalizacja Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Sekretny klucz do autoryzacji cron joba
const CRON_SECRET = process.env.CRON_SECRET || 'your-secret-key-here';

interface PendingReminder {
  id: string;
  device_id: string;
  client_name: string;
  serial_number: string;
  reminder_date: string;
  reminder_type: string;
  device_name: string;
  next_inspection_date: string;
}

export async function GET(request: Request) {
  // Sprawdź autoryzację
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Pobierz oczekujące przypomnienia
    const { data: reminders, error } = await supabase
      .from('v_pending_reminders')
      .select('*');

    if (error) {
      console.error('Error fetching reminders:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!reminders || reminders.length === 0) {
      return NextResponse.json({ 
        message: 'No pending reminders',
        sent: 0 
      });
    }

    // Grupuj przypomnienia po kliencie
    const remindersByClient = reminders.reduce((acc: Record<string, PendingReminder[]>, reminder: PendingReminder) => {
      if (!acc[reminder.client_name]) {
        acc[reminder.client_name] = [];
      }
      acc[reminder.client_name].push(reminder);
      return acc;
    }, {});

    let sentCount = 0;
    const errors: string[] = [];

    // Wyślij email dla każdego klienta
    for (const [clientName, clientReminders] of Object.entries(remindersByClient)) {
      const deviceList = (clientReminders as PendingReminder[]).map((r: PendingReminder) => 
        `• ${r.device_name} (${r.serial_number}) - przegląd do: ${new Date(r.next_inspection_date).toLocaleDateString('pl-PL')}`
      ).join('\n');

      const firstReminder = (clientReminders as PendingReminder[])[0];
      const isFirstInspection = firstReminder.reminder_type === 'first_inspection';

      try {
        // Wyślij email
        await resend.emails.send({
          from: 'Rejestratory.info <przypomnienia@rejestratory.info>',
          to: [process.env.ADMIN_EMAIL || 'jakub.tiuchty@gmail.com'],
          subject: `Przypomnienie o przeglądzie - ${clientName}`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #059669; padding: 30px 40px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: bold;">
                🔔 Przypomnienie o przeglądzie
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px 40px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0; line-height: 1.5;">
                <strong>${clientName}</strong> ma urządzenia wymagające ${isFirstInspection ? 'pierwszego przeglądu' : 'przeglądu okresowego'}:
              </p>
              
              <!-- Device list -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="font-size: 14px; color: #6b7280; margin: 0 0 10px 0;">
                      <strong>Liczba urządzeń:</strong> ${(clientReminders as PendingReminder[]).length}
                    </p>
                    <p style="font-size: 13px; color: #374151; margin: 0; line-height: 1.8; white-space: pre-line;">${deviceList}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Warning -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="margin: 0; color: #92400e; font-size: 14px;">
                      ⏰ <strong>Uwaga:</strong> Termin przeglądu zbliża się za mniej niż 14 dni!
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://rejestratory.info/admin/dashboard" 
                       style="display: inline-block; background-color: #059669; color: #ffffff; padding: 14px 35px; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 6px;">
                      Otwórz Panel Admin
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #374151; padding: 20px 40px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                Rejestratory.info - System zarządzania urządzeniami fiskalnymi
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        });

        // Oznacz przypomnienia jako wysłane
        const reminderIds = (clientReminders as PendingReminder[]).map((r: PendingReminder) => r.id);
        await supabase
          .from('reminders')
          .update({ is_sent: true, sent_at: new Date().toISOString() })
          .in('id', reminderIds);

        sentCount += (clientReminders as PendingReminder[]).length;
      } catch (emailError) {
        console.error(`Error sending email for ${clientName}:`, emailError);
        errors.push(`Failed to send email for ${clientName}`);
      }
    }

    return NextResponse.json({
      message: 'Reminders processed',
      sent: sentCount,
      clients: Object.keys(remindersByClient).length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error processing reminders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
