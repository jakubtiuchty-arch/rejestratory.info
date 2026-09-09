import { createElement } from 'react'
import { existsSync } from 'fs'
import path from 'path'
import { Font, renderToBuffer } from '@react-pdf/renderer'
import { OfertaPdfDoc, type OfertaPdfDane } from './OfertaPdf'

/**
 * Renderuje ofertę do PDF (Buffer). Fonty i logo bierzemy z public/ przez system
 * plików, gdy funkcja ma do nich dostęp (dev, a na Vercelu dzięki
 * `outputFileTracingIncludes` w next.config.js); w przeciwnym razie z adresu
 * publicznego serwisu. DejaVu jest konieczne — wbudowane fonty react-pdf
 * gubią polskie znaki.
 */

const SITE = 'https://www.rejestratory.info'

function zasob(rel: string): string {
  const lokalny = path.join(process.cwd(), 'public', rel)
  return existsSync(lokalny) ? lokalny : `${SITE}/${rel}`
}

let fontyZarejestrowane = false
function zarejestrujFonty() {
  if (fontyZarejestrowane) return
  Font.register({
    family: 'DejaVu',
    fonts: [
      { src: zasob('fonts/DejaVuSans.ttf') },
      { src: zasob('fonts/DejaVuSans-Bold.ttf'), fontWeight: 'bold' },
    ],
  })
  Font.registerHyphenationCallback((slowo) => [slowo])
  fontyZarejestrowane = true
}

export async function renderujOfertePdf(dane: Omit<OfertaPdfDane, 'logoSrc'>): Promise<Buffer> {
  zarejestrujFonty()
  const element = createElement(OfertaPdfDoc, {
    o: { ...dane, logoSrc: zasob('takma_logo_footer.png') },
  }) as Parameters<typeof renderToBuffer>[0]
  const buffer = await renderToBuffer(element)
  return Buffer.from(buffer)
}

export function nazwaPlikuOferty(numer: string, produkt: string): string {
  const czysty = (t: string) => t.replace(/[^A-Za-z0-9-]+/g, '-').replace(/^-|-$/g, '')
  return `oferta-${czysty(numer)}-${czysty(produkt)}.pdf`
}
