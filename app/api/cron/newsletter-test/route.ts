import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getManifest, getEditionHtml, approvalToken, NEWSLETTER_TEST_TO, NEWSLETTER_FROM, NEWSLETTER_REPLY_TO, SITE } from '@/lib/newsletter'

/**
 * Cron: poniedziałek 7:00 UTC (9:00 czasu PL latem).
 * Wysyła TESTOWĄ wersję bieżącego wydania newslettera (public/newsletter/manifest.json)
 * do Jakuba, z żółtym pasem akceptacji na górze. Kliknięcie linku w pasie
 * (/api/newsletter/approve) planuje wysyłkę bulk na termin z manifestu.
 *
 * Vercel cron uwierzytelnia się nagłówkiem Authorization: Bearer CRON_SECRET.
 */
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const manifest = await getManifest()
    const { html, subject } = await getEditionHtml(manifest.file)

    const approveUrl = `${SITE}/api/newsletter/approve?f=${encodeURIComponent(manifest.file)}&t=${approvalToken(manifest.file)}`
    const banner = `
  <div style="max-width:600px;margin:0 auto 8px;background:#fef3c7;border:2px solid #f59e0b;border-radius:10px;padding:14px 18px;font-family:Arial,Helvetica,sans-serif;">
    <p style="margin:0 0 8px;font-size:14px;color:#92400e;font-weight:bold;">WERSJA TESTOWA — do akceptacji</p>
    <p style="margin:0 0 10px;font-size:13px;color:#92400e;">
      Wysyłka do wszystkich nadleśnictw zaplanuje się na <b>${manifest.bulkAt.replace('T', ' ').slice(0, 16)}</b> dopiero po zatwierdzeniu.
    </p>
    <a href="${approveUrl}" style="display:inline-block;background:#166534;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;padding:10px 22px;border-radius:6px;">Zatwierdź wysyłkę &#8594;</a>
  </div>`
    const testHtml = html.replace(/(<body[^>]*>)/, `$1${banner}`)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: NEWSLETTER_FROM,
      replyTo: NEWSLETTER_REPLY_TO,
      to: NEWSLETTER_TEST_TO,
      subject: `[TEST — zatwierdź] ${subject}`,
      html: testHtml,
    })
    if (error) throw new Error(error.message)

    return NextResponse.json({ ok: true, file: manifest.file, bulkAt: manifest.bulkAt, testTo: NEWSLETTER_TEST_TO })
  } catch (e) {
    console.error('[newsletter-test]', e)
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
