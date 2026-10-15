import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { esc, limitOk, losowyCiag } from '@/lib/antyspam'

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
      address,
      phone,
      email,
      deviceType,
      otherDevice,
      serialNumber,
      hasContract,
      courierPickup,
      problemDescription,
      website, // honeypot — ukryte pole, wypełniają je tylko boty
      startedAt
    } = body

    // Bot dostaje udawany sukces, żeby nie próbował dalej innymi danymi
    const udawanySukces = (powod: string) => {
      console.log(`[service] spam zablokowany: ${powod}`)
      return NextResponse.json({ success: true, messageId: 'blocked', courierNeeded: false })
    }

    if (website) return udawanySukces('honeypot')

    // Brak startedAt nie blokuje — strony sprzed zmiany mogą jeszcze siedzieć w cache
    if (typeof startedAt === 'number' && Date.now() - startedAt < 3000) {
      return udawanySukces('za_szybko')
    }

    const polaLosowe = (['firstName', 'lastName', 'forestDistrict', 'address'] as const).filter(
      (pole) => typeof body[pole] === 'string' && losowyCiag(body[pole])
    )
    // Tylko nazwy pól, bez wartości — dane osobowe nie trafiają do logów
    if (polaLosowe.length >= 2) return udawanySukces(`losowe_ciagi (${polaLosowe.join(', ')})`)

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
    if (!limitOk(ip)) {
      return NextResponse.json(
        { error: 'Zbyt wiele zgłoszeń w krótkim czasie. Prosimy spróbować za kilka minut.' },
        { status: 429 }
      )
    }

    // Walidacja
    if (!firstName || !lastName || !forestDistrict || !address || !phone || !email || !deviceType || !hasContract || !courierPickup || !problemDescription) {
      return NextResponse.json(
        { error: 'Wszystkie pola wymagane są obowiązkowe' },
        { status: 400 }
      )
    }

    // Walidacja dla typu "inny"
    if (deviceType === 'inny' && !otherDevice) {
      return NextResponse.json(
        { error: 'Proszę określić typ urządzenia' },
        { status: 400 }
      )
    }

    const deviceTypeName = deviceType === 'inny' ? otherDevice : deviceType
    const deviceTypeLabels: Record<string, string> = {
      'rejestrator': 'Rejestrator',
      'telefon': 'Telefon',
      'laptop': 'Laptop',
      'drukarka-laserowa': 'Drukarka laserowa',
      'urzadzenie-wielofunkcyjne': 'Urządzenie wielofunkcyjne',
      'drukarka-termiczna': 'Drukarka termiczna',
      'urzadzenie-fiskalne': 'Urządzenie fiskalne',
    }
    const displayDeviceType = deviceTypeLabels[deviceType] || deviceTypeName

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
    <h1 style="color: white; margin: 0; font-size: 24px;">🔧 Zgłoszenie Serwisowe</h1>
    <p style="color: #fed7aa; margin: 10px 0 0 0; font-size: 14px;">z serwisu Rejestratory.info</p>
  </div>

  <!-- Content -->
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    
    <!-- Dane kontaktowe -->
    <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #ea580c; margin-bottom: 30px;">
      <h2 style="color: #9a3412; margin-top: 0; font-size: 18px;">👤 Dane Kontaktowe</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Imię i nazwisko:</strong></td>
          <td style="padding: 8px 0;">${esc(firstName)} ${esc(lastName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Nadleśnictwo:</strong></td>
          <td style="padding: 8px 0;">${esc(forestDistrict)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Adres:</strong></td>
          <td style="padding: 8px 0;">${esc(address)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Telefon:</strong></td>
          <td style="padding: 8px 0;"><a href="tel:${esc(phone)}" style="color: #ea580c; text-decoration: none;">${esc(phone)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:${esc(email)}" style="color: #ea580c; text-decoration: none;">${esc(email)}</a></td>
        </tr>
      </table>
    </div>

    <!-- Informacje o urządzeniu -->
    <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 30px;">
      <h2 style="color: #065f46; margin-top: 0; font-size: 18px;">💻 Urządzenie</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Typ urządzenia:</strong></td>
          <td style="padding: 8px 0;">${esc(displayDeviceType)}</td>
        </tr>
        ${serialNumber ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Numer seryjny:</strong></td>
          <td style="padding: 8px 0;">${esc(serialNumber)}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Kontrakt serwisowy:</strong></td>
          <td style="padding: 8px 0;">${hasContract === 'tak' ? '✅ TAK' : '❌ NIE'}</td>
        </tr>
      </table>
    </div>

    <!-- Odbiór kurierem -->
    <div style="background: ${courierPickup === 'tak' ? '#dbeafe' : '#f3f4f6'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${courierPickup === 'tak' ? '#3b82f6' : '#6b7280'}; margin-bottom: 30px;">
      <h2 style="color: ${courierPickup === 'tak' ? '#1e40af' : '#374151'}; margin-top: 0; font-size: 18px;">🚚 Odbiór urządzenia</h2>
      <p style="margin: 0; font-size: 16px; font-weight: bold;">
        ${courierPickup === 'tak' ? '✅ Zamówić kuriera' : '❌ Klient dostarczy osobiście'}
      </p>
    </div>

    <!-- Opis problemu -->
    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
      <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">⚠️ Opis usterki</h3>
      <p style="color: #1f2937; margin: 0; white-space: pre-wrap;">${esc(problemDescription)}</p>
    </div>

    <!-- Footer info -->
    <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 13px;">
      <p style="margin: 5px 0;">🌲 Wiadomość wygenerowana automatycznie z formularza zgłoszenia serwisowego</p>
      <p style="margin: 5px 0;">Rejestratory.info | TAKMA</p>
      <p style="margin: 5px 0;">📞 601 619 898 | ✉️ serwis@takma.com.pl</p>
    </div>
  </div>

</body>
</html>
    `

    // Wysyłka email - warunkowo dla localhost i produkcji
    const { data, error } = await resend.emails.send({
      from: process.env.NODE_ENV === 'development' 
        ? 'onboarding@resend.dev' 
        : 'kontakt@rejestratory.info',
      to: ['serwis@takma.com.pl'],
      replyTo: email,
      subject: `🔧 Zgłoszenie serwisowe - ${displayDeviceType} | ${firstName} ${lastName}`.replace(/[\r\n]+/g, ' '),
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
      messageId: data?.id,
      courierNeeded: courierPickup === 'tak'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}