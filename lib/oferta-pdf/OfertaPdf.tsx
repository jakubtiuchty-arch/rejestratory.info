import React from 'react'
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import { SPRZEDAWCA, WARUNKI_OFERTY, type ProduktOferty } from './produkty'

/**
 * Oferta w PDF generowana przez klienta z karty produktu (react-pdf).
 * Układ powtarza ofertę ze sklepu TAKMA: nagłówek, strony, daty, tabela pozycji,
 * warunki i podsumowanie, stopka — ale w palecie leśnego panelu z rejestratory.info:
 * ciemna zieleń #0A1B12, zieleń #14532d i limonka #A8F000 jako akcent.
 */

export type OfertaPdfDane = {
  numer: string
  wystawiona: Date
  waznaDo: Date
  nabywca: {
    nazwa: string
    adres: string
    nip?: string | null
    osoba: string
    email: string
    telefon?: string | null
  }
  produkt: ProduktOferty
  ilosc: number
  uwagiKlienta?: string | null
  logoSrc: string
}

const C = {
  ink: '#0A1B12',
  body: '#1f2937',
  muted: '#6b7280',
  green: '#14532d',
  emerald: '#166534',
  lime: '#A8F000',
  line: '#dfe7e0',
  /** delikatna ramka boksów na bieli — mocniejsza niż `line`, żeby boksy się nie zlewały */
  edge: '#cfdcd2',
  soft: '#eef4ec',
  /** tło co drugiego wiersza tabeli */
  row: '#f8faf8',
  white: '#ffffff',
}

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 36, paddingHorizontal: 0, fontFamily: 'DejaVu', fontSize: 9.5, color: C.body, lineHeight: 1.35 },
  band: { backgroundColor: '#ffffff', paddingTop: 22, paddingBottom: 14, paddingHorizontal: 44, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: C.green },
  logo: { width: 118, height: 46, objectFit: 'contain', objectPositionX: 0 } as never,
  docTitleWrap: { alignItems: 'flex-end' },
  docTitle: { fontSize: 22, fontWeight: 'bold', color: C.green, letterSpacing: 3, lineHeight: 1 },
  docNumber: { fontSize: 9.5, color: C.emerald, fontWeight: 'bold', marginTop: 6, lineHeight: 1 },
  docSub: { fontSize: 8, color: C.muted, marginTop: 4, lineHeight: 1 },
  body: { paddingHorizontal: 44, paddingTop: 18 },

  parties: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 13 },
  party: { width: '47%' },
  partyTitle: { fontSize: 7.5, fontWeight: 'bold', color: C.emerald, letterSpacing: 1.5, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: C.line, paddingBottom: 3, marginBottom: 5 },
  partyName: { fontSize: 11, fontWeight: 'bold', color: C.ink, marginBottom: 2 },
  partyText: { fontSize: 9.5, color: '#374151' },

  dates: { flexDirection: 'row', backgroundColor: C.soft, borderRadius: 6, paddingVertical: 9, paddingHorizontal: 10, marginBottom: 13 },
  dateItem: { flex: 1, alignItems: 'center' },
  dateLabel: { fontSize: 7, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8 },
  dateValue: { fontSize: 11, fontWeight: 'bold', color: C.ink, marginTop: 2 },

  th: { flexDirection: 'row', backgroundColor: C.green, paddingVertical: 8, paddingHorizontal: 8, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  thText: { color: '#ffffff', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.6 },
  tr: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.line, paddingVertical: 8, paddingHorizontal: 8 },
  trAlt: { backgroundColor: C.row },
  colLp: { width: 26 },
  colName: { flex: 1, paddingRight: 8 },
  colQty: { width: 44, textAlign: 'right' },
  colPrice: { width: 80, textAlign: 'right' },
  colVat: { width: 34, textAlign: 'center' },
  colTotal: { width: 86, textAlign: 'right' },
  name: { fontWeight: 'bold', color: C.ink },
  desc: { fontSize: 8, color: C.muted, marginTop: 2 },
  bold: { fontWeight: 'bold' },

  summaryWrap: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 10, marginTop: 12, marginBottom: 8 },
  box: { flex: 1, backgroundColor: C.soft, borderWidth: 1, borderColor: C.line, borderRadius: 6, padding: 10 },
  boxTitle: { fontSize: 7.5, fontWeight: 'bold', color: C.emerald, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
  condRow: { flexDirection: 'row', marginBottom: 3 },
  condLabel: { width: 58, color: C.muted, fontSize: 9 },
  condValue: { flex: 1, fontWeight: 'bold', color: C.ink, fontSize: 9 },
  summary: { width: 236, backgroundColor: C.white, borderWidth: 1, borderColor: C.edge, borderRadius: 6, overflow: 'hidden' },
  sumBody: { paddingHorizontal: 13, paddingTop: 14, paddingBottom: 12 },
  sumRow: { flexDirection: 'row', marginBottom: 4 },
  sumLabel: { flex: 1, color: C.muted },
  sumValue: { width: 100, textAlign: 'right', color: C.ink },
  sumTotal: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.green, paddingHorizontal: 13, paddingVertical: 12 },
  sumTotalLabel: { flex: 1, fontSize: 12, fontWeight: 'bold', color: C.white },
  sumTotalValue: { fontSize: 13, fontWeight: 'bold', color: C.lime, textAlign: 'right' },

  feesWrap: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  feeBox: { flex: 1, backgroundColor: C.white, borderWidth: 1, borderColor: C.edge, borderRadius: 6, padding: 13 },
  feeBig: { fontSize: 14, fontWeight: 'bold', color: C.ink, marginTop: 2 },
  feeUnit: { fontSize: 8, color: C.muted },
  feeText: { fontSize: 8, color: '#374151', marginTop: 4 },
  prowizjeBox: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: C.white, borderWidth: 1, borderColor: C.edge, borderRadius: 6, padding: 12, marginBottom: 8 },
  prowizjeLewa: { flex: 1 },
  commissions: { flexDirection: 'row', gap: 8, width: 288 },
  commission: { flex: 1, backgroundColor: C.soft, borderRadius: 5, paddingVertical: 11, alignItems: 'center' },
  commissionLabel: { fontSize: 7.5, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.6 },
  commissionValue: { fontSize: 14, fontWeight: 'bold', color: C.emerald, marginTop: 3 },

  steps: { flexDirection: 'row', backgroundColor: C.white, borderWidth: 1, borderColor: C.edge, borderRadius: 6, padding: 8, marginBottom: 4 },
  step: { flex: 1, alignItems: 'center', paddingHorizontal: 2 },
  stepNo: { width: 17, height: 17, borderRadius: 8.5, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  stepNoText: { color: C.white, fontSize: 8, fontWeight: 'bold', lineHeight: 1 },
  stepTitle: { fontSize: 8, fontWeight: 'bold', color: C.ink, textAlign: 'center' },
  stepNote: { fontSize: 7, color: C.muted, textAlign: 'center', marginTop: 1 },
  stepsTitle: { fontSize: 7.5, fontWeight: 'bold', color: C.emerald, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },

  /* jeden pasek zamiast dwóch kolumn — niższy, więc mieści się także wtedy,
     gdy klient wpisze długie uwagi */
  kontaktBox: { backgroundColor: C.soft, borderRadius: 6, padding: 8, marginBottom: 4 },
  kontaktText: { fontSize: 7.5, lineHeight: 1.4, color: '#374151' },
  clientNotes: { backgroundColor: C.soft, borderLeftWidth: 3, borderLeftColor: C.green, borderTopRightRadius: 6, borderBottomRightRadius: 6, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 8, fontSize: 9, color: '#374151' },

  footer: { position: 'absolute', bottom: 14, left: 44, right: 44, borderTopWidth: 1, borderTopColor: C.line, paddingTop: 6, fontSize: 7.5, color: C.muted },
})

/** Kwoty bez toLocaleString — okrojony ICU w Node dawał inne separatory niż przeglądarka. */
export const zl = (grosze: number) => {
  const calk = Math.floor(Math.abs(grosze) / 100)
  const reszta = Math.abs(grosze) % 100
  const tys = calk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${grosze < 0 ? '-' : ''}${tys},${reszta.toString().padStart(2, '0')} zł`
}
const data = (d: Date) => {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}.${d.getFullYear()}`
}

export function OfertaPdfDoc({ o }: { o: OfertaPdfDane }) {
  const p = o.produkt
  const netto = p.cenaNetto * o.ilosc
  const vat = Math.round(netto * WARUNKI_OFERTY.vat)
  const brutto = netto + vat
  const abonamentBrutto = p.abonament ? Math.round(p.abonament.cenaNetto * (1 + WARUNKI_OFERTY.vat)) : 0

  return (
    <Document title={`Oferta ${o.numer} — ${p.nazwa} — TAKMA`} author="TAKMA" creator="rejestratory.info" producer="rejestratory.info">
      <Page size="A4" style={s.page}>
        <View style={s.band} fixed>
          <Image src={o.logoSrc} style={s.logo} />
          <View style={s.docTitleWrap}>
            <Text style={s.docTitle}>OFERTA</Text>
            <Text style={s.docNumber}>Nr {o.numer}</Text>
            <Text style={s.docSub}>sprzęt IT dla nadleśnictw · rejestratory.info</Text>
          </View>
        </View>

        <View style={s.body}>
          <View style={s.parties}>
            <View style={s.party}>
              <Text style={s.partyTitle}>Sprzedawca</Text>
              <Text style={s.partyName}>{SPRZEDAWCA.nazwa}</Text>
              <Text style={s.partyText}>{SPRZEDAWCA.adres1}</Text>
              <Text style={s.partyText}>{SPRZEDAWCA.adres2}</Text>
              <Text style={s.partyText}>NIP {SPRZEDAWCA.nip}</Text>
              <Text style={s.partyText}>{SPRZEDAWCA.email} · tel. {SPRZEDAWCA.telefon}</Text>
            </View>
            <View style={s.party}>
              <Text style={s.partyTitle}>Nabywca</Text>
              <Text style={s.partyName}>{o.nabywca.nazwa}</Text>
              {o.nabywca.adres.split(',').map((cz, i) => (
                <Text key={i} style={s.partyText}>{cz.trim()}</Text>
              ))}
              {o.nabywca.nip ? <Text style={[s.partyText, s.bold]}>NIP {o.nabywca.nip}</Text> : null}
              <Text style={s.partyText}>{o.nabywca.osoba}</Text>
              <Text style={s.partyText}>{o.nabywca.email}{o.nabywca.telefon ? ` · tel. ${o.nabywca.telefon}` : ''}</Text>
            </View>
          </View>

          <View style={s.dates}>
            <View style={s.dateItem}><Text style={s.dateLabel}>Data wystawienia</Text><Text style={s.dateValue}>{data(o.wystawiona)}</Text></View>
            <View style={s.dateItem}><Text style={s.dateLabel}>Ważna do</Text><Text style={s.dateValue}>{data(o.waznaDo)}</Text></View>
            <View style={s.dateItem}><Text style={s.dateLabel}>Nr oferty</Text><Text style={s.dateValue}>{o.numer}</Text></View>
          </View>

          <View style={s.th}>
            <Text style={[s.thText, s.colLp]}>Lp.</Text>
            <Text style={[s.thText, s.colName]}>Pozycja</Text>
            <Text style={[s.thText, s.colQty]}>Ilość</Text>
            <Text style={[s.thText, s.colPrice]}>Cena netto</Text>
            <Text style={[s.thText, s.colVat]}>VAT</Text>
            <Text style={[s.thText, s.colTotal]}>Razem netto</Text>
          </View>
          <View style={s.tr} wrap={false}>
            <Text style={s.colLp}>1</Text>
            <View style={s.colName}>
              <Text style={s.name}>{p.nazwa}</Text>
              <Text style={s.desc}>{p.opis}</Text>
            </View>
            <Text style={s.colQty}>{o.ilosc} szt.</Text>
            <Text style={[s.colPrice, s.bold]}>{zl(p.cenaNetto)}</Text>
            <Text style={s.colVat}>23%</Text>
            <Text style={[s.colTotal, s.bold]}>{zl(netto)}</Text>
          </View>

          {o.uwagiKlienta ? (
            <View style={s.clientNotes} wrap={false}>
              <Text><Text style={s.bold}>Uwagi zamawiającego: </Text>{o.uwagiKlienta}</Text>
            </View>
          ) : null}

          <View style={s.summaryWrap} wrap={false}>
            {p.abonament ? (
              <View style={s.feeBox}>
                <Text style={s.boxTitle}>Opłata miesięczna</Text>
                <Text style={s.feeBig}>
                  {zl(p.abonament.cenaNetto)}{' '}
                  <Text style={s.feeUnit}>netto {p.abonament.okres} za urządzenie</Text>
                </Text>
                <Text style={[s.feeUnit, { marginTop: 3 }]}>
                  {zl(abonamentBrutto)} brutto {p.abonament.okres} za urządzenie
                </Text>
                <Text style={s.feeText}>{p.abonament.opis}</Text>
              </View>
            ) : null}
            <View style={s.summary}>
              <View style={s.sumBody}>
                <View style={s.sumRow}><Text style={s.sumLabel}>Wartość netto</Text><Text style={s.sumValue}>{zl(netto)}</Text></View>
                <View style={s.sumRow}><Text style={s.sumLabel}>VAT 23%</Text><Text style={s.sumValue}>{zl(vat)}</Text></View>
              </View>
              <View style={s.sumTotal}>
                <Text style={s.sumTotalLabel}>Razem brutto</Text>
                <Text style={s.sumTotalValue}>{zl(brutto)}</Text>
              </View>
            </View>
          </View>

          {p.prowizje ? (
            <View style={s.prowizjeBox} wrap={false}>
              <View style={s.prowizjeLewa}>
                <Text style={s.boxTitle}>Prowizja od transakcji</Text>
                <Text style={s.feeText}>
                  Nalicza ją operator płatności eService od wartości każdej transakcji. Stawki VISA
                  i MasterCard dotyczą kart wydanych w Polsce.
                </Text>
              </View>
              <View style={s.commissions}>
                {p.prowizje.map((c) => (
                  <View key={c.label} style={s.commission}>
                    <Text style={s.commissionLabel}>{c.label}</Text>
                    <Text style={s.commissionValue}>{c.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}


          <View wrap={false}>
            <Text style={s.stepsTitle}>Proces zakupu i wdrożenia</Text>
            <View style={s.steps}>
              {p.wdrozenie.map((k, i) => (
                <View key={k.title} style={s.step}>
                  <View style={s.stepNo}><Text style={s.stepNoText}>{i + 1}</Text></View>
                  <Text style={s.stepTitle}>{k.title}</Text>
                  <Text style={s.stepNote}>{k.note}</Text>
                </View>
              ))}
            </View>
          </View>


          {/* Pasek domyka stronę, gdy zostaje na niej puste miejsce. Przy długich
              uwagach zamawiającego dół jest już wypełniony, a pasek wypchnąłby
              treść na drugą stronę — wtedy go nie pokazujemy. */}
          {(o.uwagiKlienta?.length ?? 0) < 120 ? (
          <View style={s.kontaktBox} wrap={false}>
            <Text style={s.boxTitle}>Jak zamówić</Text>
            <Text style={s.kontaktText}>
              Wystarczy odpowiedzieć na tę ofertę albo zadzwonić: {SPRZEDAWCA.telefon}. Potwierdzimy
              termin dostawy i prześlemy dokumenty do fiskalizacji.
            </Text>
          </View>
          ) : null}

        </View>

        <View fixed style={s.footer}>
          <Text style={{ textAlign: 'center' }}>
            {SPRZEDAWCA.nazwa} · {SPRZEDAWCA.adres1}, {SPRZEDAWCA.adres2} · NIP {SPRZEDAWCA.nip} · {SPRZEDAWCA.email} · {SPRZEDAWCA.telefon} · {SPRZEDAWCA.www}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
