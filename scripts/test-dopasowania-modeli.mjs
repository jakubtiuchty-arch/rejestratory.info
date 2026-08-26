// Test dopasowania modelu do slug — dokładnie ten kod, który stoi w parserze.
const MODELE = [
  ['A36', 'samsung-a36'],
  ['A56', 'samsung-a56'],
  ['TC58', 'zebra-tc58e'],
  ['EM45', 'zebra-em45'],
  ['P2726H', 'dell-pro-27-p2726h'],
  ['P2726HE', 'dell-pro-27-p2726he'],
  ['S25 FE', 'samsung-s25-fe'],
  ['ELITE BOOK 645', 'hp-elitebook-6-g1ah-14'],
  ['SL20', 'm3-sl20'],
  ['HL-L6210DW', 'brother-hl-l6210dw'],
  ['CT32', 'honeywell-ct32'],
]

const uprosc = (tekst) => tekst.toUpperCase().replace(/[^A-Z0-9]/g, '')

const wzorzecModelu = (fragment) =>
  new RegExp(`(?<![A-Z0-9])${uprosc(fragment).split('').join('[\\s\\-_.–—]*')}(?![0-9])`, 'i')

const dopasujSlug = (nazwa) => {
  const trafienie = [...MODELE]
    .sort((a, b) => b[0].length - a[0].length)
    .find(([fragment]) => wzorzecModelu(fragment).test(nazwa))
  return trafienie ? trafienie[1] : null
}

const testy = [
  ['Drukarka termiczna Brother RJ-4230B Gwarancja 36 miesiące', null],
  ['Torba transportowa do drukarki Brother RJ4230B', null],
  ['Papier termiczny do drukarki Brother RJ4230B (karton 40 szt.)', null],
  ['Mobilny komputer dotykowy SAMSUNG GALAXY A36 - rejestrator leśniczego', 'samsung-a36'],
  ['SAMSUNG GALAXY A56 rejestrator', 'samsung-a56'],
  ['Rejestrator Zebra TC58e', 'zebra-tc58e'],
  ['Zebra EM45 + STACJA', 'zebra-em45'],
  ['Monitor Dell P2726HE z USB-C', 'dell-pro-27-p2726he'],
  ['Monitor Dell P2726H', 'dell-pro-27-p2726h'],
  ['SAMSUNG GALAXY S25 FE', 'samsung-s25-fe'],
  ['Elite Book 645 14" G11', 'hp-elitebook-6-g1ah-14'],
  ['M3 Mobile SL20+', 'm3-sl20'],
  ['Gwarancja 36 miesięcy na wszystko', null],
  ['Kontrakt serwisowy 36 miesięcy', null],
  ['Gwarancja 56 miesięcy', null],
  ['BROTHER HLL – 6210DW', 'brother-hl-l6210dw'],
  ['Mobilny komputer dotykowy Honeywell CT32 rejestrator leśniczego', 'honeywell-ct32'],
  // PM95 nie jest naszą pozycją — druk pomijany w całości, modelu nie ma w tabeli
  ['URZĄDZENIE DO POMIARU GNSS POINT MOBILE PM95', null],
  ['Kontrakt serwisowy producenta (3 letni)', null],
]

let bledy = 0
for (const [tekst, oczekiwane] of testy) {
  const wynik = dopasujSlug(tekst)
  const ok = wynik === oczekiwane
  if (!ok) bledy++
  console.log(`${ok ? 'OK  ' : 'ŹLE '} ${JSON.stringify(tekst).slice(0, 56).padEnd(58)} → ${wynik}`)
}
console.log(bledy ? `BŁĘDÓW: ${bledy}` : `wszystkie ${testy.length} przypadków przechodzi`)
