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
      email, 
      phone, 
      forestDistrict, 
      message, 
      items 
    } = body

    // Walidacja
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Wszystkie pola wymagane są obowiązkowe' },
        { status: 400 }
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Brak produktów w zapytaniu' },
        { status: 400 }
      )
    }

    // Lista produktów do HTML
    const productsListHTML = items.map((item: any, index: number) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; border-radius: 4px; background: #f9fafb;">
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <strong>${item.name}</strong><br>
          <span style="color: #10b981; font-size: 14px;">${item.category || ''}</span><br>
          ${item.description ? `<span style="color: #6b7280; font-size: 13px;">${item.description}</span>` : ''}
        </td>
      </tr>
    `).join('')

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
  <div style="background: linear-gradient(90deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">📦 Nowe Zapytanie Ofertowe</h1>
    <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">z serwisu Rejestratory.info</p>
  </div>

  <!-- Content -->
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    
    <!-- Dane kontaktowe -->
    <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 30px;">
      <h2 style="color: #065f46; margin-top: 0; font-size: 18px;">👤 Dane Kontaktowe</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Imię i nazwisko:</strong></td>
          <td style="padding: 8px 0;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Telefon:</strong></td>
          <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #10b981; text-decoration: none;">${phone}</a></td>
        </tr>
        ${forestDistrict ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Nadleśnictwo:</strong></td>
          <td style="padding: 8px 0;">${forestDistrict}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Produkty -->
    <div style="margin-bottom: 30px;">
      <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">📦 Produkty w zapytaniu (${items.length})</h2>
      <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px; overflow: hidden;">
        ${productsListHTML}
      </table>
    </div>

    <!-- Wiadomość -->
    ${message ? `
    <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
      <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">💬 Wiadomość od klienta</h3>
      <p style="color: #1f2937; margin: 0; white-space: pre-wrap;">${message}</p>
    </div>
    ` : ''}

    <!-- Footer info -->
    <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 13px;">
      <p style="margin: 5px 0;">🌲 Wiadomość wygenerowana automatycznie z formularza zapytania ofertowego</p>
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
      to: ['jakub.tiuchty@takma.com.pl'], // ← Tu można dodać więcej adresów
      replyTo: email, // Odpowiedź trafi do klienta
      subject: `📦 Zapytanie ofertowe - ${items.length} ${items.length === 1 ? 'produkt' : items.length < 5 ? 'produkty' : 'produktów'} | ${firstName} ${lastName}`,
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