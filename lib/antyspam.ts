/**
 * Wspólne zabezpieczenia formularzy: wykrywanie losowych ciągów, escapowanie
 * wartości wstawianych do HTML maili i prosty limit zgłoszeń per IP.
 */

const SLOWO = /^\p{L}+$/u
const WIELKA = /\p{Lu}/u
const MALA = /\p{Ll}/u

/**
 * Bot z formularza serwisowego wpisywał ciągi w rodzaju „nJQrCLQwnaSeSuIfAQ”.
 * Słowo uznajemy za losowe, gdy ma małe litery i co najmniej dwie wielkie
 * w środku. Nazwiska typu „McDonald” mają jedną, a tekst pisany CAPS LOCK-iem
 * nie ma małych liter, więc żadne z nich nie wpada w filtr.
 */
export function losowyCiag(s: string): boolean {
  return s
    .split(/[\s\-.,/]+/)
    .filter((w) => w.length >= 6 && SLOWO.test(w))
    .some((w) => {
      const znaki = Array.from(w)
      if (!znaki.some((c) => MALA.test(c))) return false
      return znaki.slice(1).filter((c) => WIELKA.test(c)).length >= 2
    })
}

export const esc = (v: unknown): string =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/* pamięć procesu, więc na serverless limit resetuje się przy zimnym starcie —
   wystarcza przeciw prostym pętlom */
const limity = new Map<string, number[]>()
export function limitOk(ip: string, max = 5, oknoMs = 10 * 60_000): boolean {
  const teraz = Date.now()
  const okno = (limity.get(ip) ?? []).filter((t) => teraz - t < oknoMs)
  if (okno.length >= max) return false
  okno.push(teraz)
  limity.set(ip, okno)
  return true
}
