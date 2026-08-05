import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { getManifest, getEditionHtml, approvalToken, getRecipients, NEWSLETTER_FROM, NEWSLETTER_REPLY_TO } from '@/lib/newsletter'

/**
 * Zatwierdzenie wysyłki newslettera (link z maila testowego).
 * GET  ?f=<plik>&t=<token>            → strona z przyciskiem potwierdzenia
 * GET  ?f=<plik>&t=<token>&confirm=1  → planuje bulk (Resend scheduledAt = manifest.bulkAt)
 *
 * Idempotencja: tabela newsletter_sends (PK: file) — patrz MIGRACJA_NEWSLETTER.sql.
 * Token: HMAC(CRON_SECRET, file) — ważny tylko dla tego wydania.
 */

const page = (title: string, body: string, button?: { href: string; label: string }) => `<!DOCTYPE html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head>
<body style="margin:0;font-family:Arial,Helvetica,sans-serif;background:#e8ebe8;">
  <div style="max-width:560px;margin:60px auto;background:#fff;border-radius:14px;padding:36px 40px;">
    <h1 style="margin:0 0 12px;font-size:22px;color:#111827;">${title}</h1>
    <div style="font-size:15px;line-height:1.6;color:#374151;">${body}</div>
    ${button ? `<a href="${button.href}" style="display:inline-block;margin-top:22px;background:#166534;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:8px;">${button.label}</a>` : ''}
  </div>
</body></html>`

export async function GET(request: NextRequest) {
  const f = request.nextUrl.searchParams.get('f') || ''
  const t = request.nextUrl.searchParams.get('t') || ''
  const confirm = request.nextUrl.searchParams.get('confirm') === '1'
  const htmlResp = (s: string, code = 200) => new NextResponse(s, { status: code, headers: { 'Content-Type': 'text/html; charset=utf-8' } })

  if (!f || t !== approvalToken(f)) {
    return htmlResp(page('Nieprawidłowy link', 'Token nie pasuje do wydania. Użyj linku z najnowszego maila testowego.'), 403)
  }

  try {
    const manifest = await getManifest()
    if (manifest.file !== f) {
      return htmlResp(page('Nieaktualne wydanie', `Ten link dotyczy <code>${f}</code>, a bieżące wydanie w manifeście to <code>${manifest.file}</code>.`), 409)
    }

    const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // już zatwierdzone?
    const { data: existing, error: exErr } = await sb.from('newsletter_sends').select('*').eq('file', f).maybeSingle()
    if (exErr) {
      return htmlResp(page('Brak tabeli newsletter_sends', `Uruchom najpierw MIGRACJA_NEWSLETTER.sql w Supabase SQL editor.<br><code>${exErr.message}</code>`), 500)
    }
    if (existing) {
      return htmlResp(page('Już zatwierdzone ✓', `To wydanie zostało zatwierdzone ${new Date(existing.approved_at).toLocaleString('pl-PL')} — zaplanowano ${existing.recipient_count} maili na ${new Date(existing.scheduled_for).toLocaleString('pl-PL')}. Nic więcej nie trzeba robić.`))
    }

    if (!confirm) {
      const recipients = await getRecipients()
      return htmlResp(page(
        'Potwierdź wysyłkę newslettera',
        `Wydanie: <b>${f.split('/').pop()}</b><br>Odbiorcy: <b>${recipients.length}</b> (nadleśnictwa + wydziały informatyki RDLP)<br>Termin wysyłki: <b>${manifest.bulkAt.replace('T', ' ').slice(0, 16)}</b>`,
        { href: `${request.nextUrl.pathname}?f=${encodeURIComponent(f)}&t=${t}&confirm=1`, label: `Potwierdzam — wysyłaj` },
      ))
    }

    // rezerwacja (idempotencja): insert PK — drugi klik dostanie "już zatwierdzone"
    const { error: insErr } = await sb.from('newsletter_sends').insert({
      file: f, approved_at: new Date().toISOString(), scheduled_for: manifest.bulkAt, recipient_count: 0,
    })
    if (insErr) {
      return htmlResp(page('Już zatwierdzone ✓', 'Wysyłka została już zaplanowana (równoległe kliknięcie). Nic więcej nie trzeba robić.'))
    }

    const { html, subject } = await getEditionHtml(f)
    const recipients = await getRecipients()
    const resend = new Resend(process.env.RESEND_API_KEY)
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    let ok = 0
    const failed: string[] = []
    for (let i = 0; i < recipients.length; i++) {
      try {
        const { error } = await resend.emails.send({
          from: NEWSLETTER_FROM, replyTo: NEWSLETTER_REPLY_TO, to: recipients[i], subject, html,
          scheduledAt: manifest.bulkAt,
        })
        if (error) throw new Error(error.message)
        ok++
      } catch (e) {
        failed.push(`${recipients[i]}: ${e instanceof Error ? e.message : e}`)
      }
      if (i < recipients.length - 1) await sleep(600)
    }
    await sb.from('newsletter_sends').update({ recipient_count: ok }).eq('file', f)
    console.log(`[newsletter-approve] ${f}: zaplanowane ${ok}/${recipients.length}`, failed.slice(0, 5))

    return htmlResp(page(
      'Wysyłka zaplanowana ✓',
      `Zaplanowano <b>${ok} z ${recipients.length}</b> maili na <b>${manifest.bulkAt.replace('T', ' ').slice(0, 16)}</b>.${failed.length ? `<br><br>Błędy (${failed.length}):<br><code style="font-size:12px">${failed.slice(0, 10).join('<br>')}</code>` : ''}`,
    ))
  } catch (e) {
    console.error('[newsletter-approve]', e)
    return htmlResp(page('Błąd', `<code>${e instanceof Error ? e.message : String(e)}</code>`), 500)
  }
}

export const maxDuration = 800 // ~610 odbiorców x 600 ms = ~370 s; Pro/fluid pozwala do 800 s
