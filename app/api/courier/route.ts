import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ✅ WYMUSZENIE RUNTIME RENDERING (FIX DLA VERCEL)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { 
      firstName, 
      lastName, 
      forestDistrict,
      city,
      street,
      number,
      postalCode,
      deviceName,
      serialNumber,
      faultDescription,
      activeContract
    } = body

    // Walidacja
    if (!firstName || !lastName || !forestDistrict || !city || !street || !number || !postalCode || !deviceName || !serialNumber || !faultDescription) {
      return NextResponse.json(
        { error: 'Wszystkie pola wymagane są obowiązkowe' },
        { status: 400 }
      )
    }

    // Template email
    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <!-- Header -->
  <div style="background: linear-gradient(90deg, #ea580c, #c2410c); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🚚 Zamówienie kuriera</h1>
    <p style="color: #fed7aa; margin: 10px 0 0 0; font-size: 14px;">Odbiór urządzenia do serwisu</p>
  </div>

  <!-- Content -->
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    
    <!-- Dane kontaktowe -->
    <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #ea580c; margin-bottom: 30px;">
      <h2 style="color: #9a3412; margin-top: 0; font-size: 18px;">👤 Dane Kontaktowe</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Imię i nazwisko:</strong></td>
          <td style="padding: 8px 0;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Nadleśnictwo:</strong></td>
          <td style="padding: 8px 0;">${forestDistrict}</td>
        </tr>
      </table>
    </div>

    <!-- Adres odbioru -->
    <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 30px;">
      <h2 style="color: #1e40af; margin-top: 0; font-size: 18px;">📍 Adres Odbioru</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Miasto:</strong></td>
          <td style="padding: 8px 0;">${city}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Ulica i numer:</strong></td>
          <td style="padding: 8px 0;">${street} ${number}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Kod pocztowy:</strong></td>
          <td style="padding: 8px 0;">${postalCode}</td>
        </tr>
      </table>
    </div>

    <!-- Urządzenie -->
    <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 30px;">
      <h2 style="color: #065f46; margin-top: 0; font-size: 18px;">🔧 Urządzenie</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Nazwa:</strong></td>
          <td style="padding: 8px 0;">${deviceName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Numer seryjny:</strong></td>
          <td style="padding: 8px 0;">${serialNumber}</td>
        </tr>
      </table>
    </div>

    ${activeContract ? `
    <!-- Kontrakt serwisowy -->
    <div style="background: #dcfce7; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 30px;">
      <h2 style="color: #166534; margin-top: 0; font-size: 18px;">🛡️ KONTRAKT SERWISOWY - AKTYWNY</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Okres kontraktu:</strong></td>
          <td style="padding: 8px 0; font-weight: bold; color: #166534;">${activeContract.years} lata</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Ważny do:</strong></td>
          <td style="padding: 8px 0; font-weight: bold; color: #166534;">${new Date(activeContract.endDate).toLocaleDateString('pl-PL')}</td>
        </tr>
      </table>
      <p style="color: #166534; margin: 15px 0 0 0; font-size: 13px;">
        ✓ Serwis w ramach kontraktu • ✓ Priorytetowa obsługa
      </p>
    </div>
    ` : ''}

    <!-- Opis usterki -->
    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
      <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">⚠️ Opis usterki</h3>
      <p style="color: #1f2937; margin: 0; white-space: pre-wrap;">${faultDescription}</p>
    </div>

    <!-- Footer info -->
    <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 13px;">
      <p style="margin: 5px 0;">🌲 Wiadomość wygenerowana automatycznie z formularza zamówienia kuriera</p>
      <p style="margin: 5px 0;">Rejestratory.info | TAKMA</p>
      <p style="margin: 5px 0;">📞 71 781 71 28 | ✉️ takma@takma.com.pl</p>
    </div>
  </div>

</body>
</html>
    `

    // Wysyłka email
    const { data, error } = await resend.emails.send({
      from: 'kontakt@rejestratory.info',
      to: ['handlowy@takma.com.pl'],
      subject: `🚚 Zamówienie kuriera${activeContract ? ' 🛡️ KONTRAKT' : ''} - ${deviceName} | ${firstName} ${lastName}`,
      html: emailHTML,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Błąd wysyłania emaila' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      messageId: data?.id 
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}