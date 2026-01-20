import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ✅ WYMUSZENIE RUNTIME RENDERING (FIX DLA VERCEL)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY)

// 🛡️ SPAM PROTECTION FUNCTIONS
function isSpamName(name: string): boolean {
  // Sprawdź czy nazwa wygląda jak losowy ciąg znaków
  const hasNoSpaces = !name.includes(' ');
  const tooManyUppercase = (name.match(/[A-Z]/g) || []).length > 5;
  const randomPattern = /[A-Z][a-z][A-Z][a-z]/; // CamelCase pattern
  const longWithoutSpaces = name.length > 15 && hasNoSpaces;
  
  return (hasNoSpaces && name.length > 10) || tooManyUppercase || randomPattern.test(name) || longWithoutSpaces;
}

function isSpamEmail(email: string): boolean {
  // Sprawdź podejrzane wzorce emaila
  const localPart = email.split('@')[0];
  const hasManyDots = (localPart.match(/\./g) || []).length > 3;
  const hasRandomPattern = /[a-z]\.[a-z]{2}\.[a-z]\.[a-z]{2}/i.test(localPart); // a.bc.d.ef pattern
  const suspiciousDomains = ['temp', 'fake', 'spam', 'test'];
  const isSuspiciousDomain = suspiciousDomains.some(d => email.toLowerCase().includes(d));
  
  return hasManyDots || hasRandomPattern || isSuspiciousDomain;
}

function isSpamContent(text: string): boolean {
  // Sprawdź czy treść wygląda jak spam
  const randomCharsPattern = /[A-Z][a-z][A-Z][a-z][A-Z]/; // aBcDe pattern
  const hasLinks = /(http|www\.|\.com|\.ru|\.cn)/i.test(text);
  const tooManyUppercase = (text.match(/[A-Z]/g) || []).length > text.length * 0.4;
  
  return randomCharsPattern.test(text) || tooManyUppercase;
}

function isSpamPhone(phone: string): boolean {
  if (!phone) return false;
  // Polski numer powinien mieć 9 cyfr lub +48 i 9 cyfr
  const digitsOnly = phone.replace(/\D/g, '');
  const isPolishFormat = digitsOnly.length === 9 || (digitsOnly.length === 11 && digitsOnly.startsWith('48'));
  return !isPolishFormat;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { 
      name,
      email,
      phone,
      company,
      subject,
      department,
      message,
      website // 🍯 HONEYPOT FIELD - jeśli wypełnione = bot
    } = body

    // 🍯 HONEYPOT CHECK - boty wypełniają ukryte pola
    if (website) {
      console.log('🚫 SPAM DETECTED: Honeypot field filled');
      // Zwróć sukces żeby bot myślał że wysłał
      return NextResponse.json({ success: true, messageId: 'blocked' });
    }

    // Walidacja podstawowa
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Wszystkie pola wymagane są obowiązkowe' },
        { status: 400 }
      )
    }

    // 🛡️ SPAM DETECTION
    const spamReasons: string[] = [];
    
    if (isSpamName(name)) spamReasons.push('suspicious_name');
    if (isSpamEmail(email)) spamReasons.push('suspicious_email');
    if (isSpamContent(subject)) spamReasons.push('suspicious_subject');
    if (isSpamContent(message)) spamReasons.push('suspicious_message');
    if (company && isSpamContent(company)) spamReasons.push('suspicious_company');
    if (isSpamPhone(phone)) spamReasons.push('suspicious_phone');
    
    // Jeśli więcej niż 2 podejrzane elementy = spam
    if (spamReasons.length >= 2) {
      console.log(`🚫 SPAM DETECTED: ${spamReasons.join(', ')} | Name: ${name} | Email: ${email}`);
      // Zwróć sukces żeby bot myślał że wysłał
      return NextResponse.json({ success: true, messageId: 'blocked' });
    }

    const departmentLabels: Record<string, string> = {
      'general': 'Ogólne',
      'sales': 'Sprzedaż',
      'service': 'Serwis',
      'fiscal': 'Urządzenia fiskalne'
    }
    const displayDepartment = departmentLabels[department] || 'Ogólne'

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
    <h1 style="color: white; margin: 0; font-size: 24px;">📧 Wiadomość Kontaktowa</h1>
    <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">z formularza kontaktowego Rejestratory.info</p>
  </div>

  <!-- Content -->
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    
    <!-- Dane kontaktowe -->
    <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 30px;">
      <h2 style="color: #065f46; margin-top: 0; font-size: 18px;">👤 Dane Kontaktowe</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Imię i nazwisko:</strong></td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Telefon:</strong></td>
          <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #10b981; text-decoration: none;">${phone}</a></td>
        </tr>
        ` : ''}
        ${company ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Nadleśnictwo/Firma:</strong></td>
          <td style="padding: 8px 0;">${company}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; color: #6b7280;"><strong>Dział:</strong></td>
          <td style="padding: 8px 0;">${displayDepartment}</td>
        </tr>
      </table>
    </div>

    <!-- Temat -->
    <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 30px;">
      <h2 style="color: #1e40af; margin-top: 0; font-size: 18px;">📝 Temat</h2>
      <p style="color: #1f2937; margin: 0; font-size: 16px; font-weight: 600;">${subject}</p>
    </div>

    <!-- Wiadomość -->
    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
      <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">💬 Wiadomość</h3>
      <p style="color: #1f2937; margin: 0; white-space: pre-wrap;">${message}</p>
    </div>

    <!-- Footer info -->
    <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 13px;">
      <p style="margin: 5px 0;">🌲 Wiadomość wygenerowana automatycznie z formularza kontaktowego</p>
      <p style="margin: 5px 0;">Rejestratory.info | TAKMA</p>
      <p style="margin: 5px 0;">📞 607 819 688 | ✉️ handlowy@takma.com.pl</p>
    </div>
  </div>

</body>
</html>
    `

    // Wysyłka email na dwa adresy
    const { data, error } = await resend.emails.send({
      from: 'kontakt@rejestratory.info',
      to: ['handlowy@takma.com.pl', 'rejestratory@takma.com.pl'],
      replyTo: email,
      subject: `📧 Kontakt - ${subject} | ${name}`,
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