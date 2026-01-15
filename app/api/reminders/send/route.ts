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
          subject: `🔔 Przypomnienie o przeglądzie - ${clientName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">
                  🔔 Przypomnienie o przeglądzie
                </h1>
              </div>
              
              <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
                <p style="font-size: 16px; color: #374151; margin-top: 0;">
                  <strong>${clientName}</strong> ma urządzenia wymagające ${isFirstInspection ? 'pierwszego przeglądu' : 'przeglądu okresowego'}:
                </p>
                
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="font-size: 14px; color: #6b7280; margin: 0 0 10px 0;">
                    <strong>Liczba urządzeń:</strong> ${(clientReminders as PendingReminder[]).length}
                  </p>
                  <pre style="font-size: 13px; color: #374151; white-space: pre-wrap; margin: 0; font-family: inherit;">${deviceList}</pre>
                </div>

                <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 15px; margin-top: 20px;">
                  <p style="margin: 0; color: #92400e; font-size: 14px;">
                    ⏰ <strong>Uwaga:</strong> Termin przeglądu zbliża się za mniej niż 14 dni!
                  </p>
                </div>

                <div style="margin-top: 30px; text-align: center;">
                  <a href="https://rejestratory.info/admin/dashboard" 
                     style="background: #059669; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
                    Otwórz Panel Admin
                  </a>
                </div>
              </div>
              
              <div style="background: #374151; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
                <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                  Rejestratory.info - System zarządzania urządzeniami fiskalnymi
                </p>
              </div>
            </div>
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
