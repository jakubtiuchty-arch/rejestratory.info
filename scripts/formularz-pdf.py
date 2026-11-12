#!/usr/bin/env python3
"""
HTML formularza → PDF z polami do wpisywania (AcroForm).

1. Chromium (Playwright) drukuje HTML do PDF w formacie z @page.
2. Z tego samego układu strony odczytuje pozycje elementów z atrybutem
   data-pole — tam stawiamy pola, więc nic nie jest wykrywane na oko.
   Atrybuty: data-pole (nazwa pola), data-opis (podpowiedź),
   data-wyrownanie (0 do lewej, 1 do środka, 2 do prawej),
   data-rozmiar (stopień pisma w pt, domyślnie 9),
   data-wartosc (tekst wpisany na start — pole zostaje edytowalne),
   data-pogrubienie (obecność atrybutu = Helvetica Bold).
   Każda strona A4 to element .strona; pozycja liczona względem niej.
3. PyMuPDF nakłada pola nad kreską: bez ramki i tła, a NeedAppearances
   każe przeglądarce PDF rysować wpisany tekst własną czcionką, więc
   polskie znaki wyglądają poprawnie w Adobe Reader, Podglądzie macOS
   i przeglądarkach.

Użycie (zwykle woła go scripts/formularz-oferty.mjs):
    python3 scripts/formularz-pdf.py formularz.html wynik.pdf
Wymaga: pip install playwright pymupdf
"""
import sys
import tempfile
from pathlib import Path

import fitz  # PyMuPDF
from playwright.sync_api import sync_playwright

PT_NA_PX = 72 / 96
WYSOKOSC_POLA_PT = 13
FONT_SIZE = 9
KOLOR_TEKSTU = (0.1, 0.1, 0.1)

ODCZYT_POL = """els => {
  const strony = [...document.querySelectorAll('.strona')]
  return els.map(el => {
    const nr = strony.findIndex(s => s.contains(el))
    const s = strony[nr].getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const kreska = parseFloat(getComputedStyle(el).borderBottomWidth) || 0
    return {
      nazwa: el.dataset.pole,
      opis: el.dataset.opis || el.dataset.pole,
      wyrownanie: Number(el.dataset.wyrownanie || 0),
      rozmiar: Number(el.dataset.rozmiar || 0),
      wartosc: el.dataset.wartosc || '',
      pogrubienie: 'pogrubienie' in el.dataset,
      strona: nr,
      x0: r.left - s.left,
      x1: r.right - s.left,
      dol: r.bottom - s.top - kreska,
    }
  })
}"""


def drukuj(html, pdf):
    with sync_playwright() as p:
        przegladarka = p.chromium.launch()
        try:
            strona = przegladarka.new_page(viewport={"width": 794, "height": 1123})
            strona.emulate_media(media="print")
            strona.goto(html.resolve().as_uri())
            strona.evaluate("document.fonts.ready")
            przepelnione = strona.evaluate(
                "[...document.querySelectorAll('.strona')]"
                ".map((s, i) => s.scrollHeight > s.clientHeight + 1 ? i + 1 : 0).filter(Boolean)"
            )
            if przepelnione:
                sys.exit(f"{html}: treść nie mieści się na stronie {przepelnione} — skróć opis albo dodaj stronę")
            pola = strona.eval_on_selector_all("[data-pole]", ODCZYT_POL)
            strona.pdf(path=str(pdf), prefer_css_page_size=True, print_background=True)
        finally:
            przegladarka.close()
    return pola


def dodaj_pola(pdf, pola):
    doc = fitz.open(pdf)
    for p in pola:
        rozmiar = p["rozmiar"] or FONT_SIZE
        y1 = p["dol"] * PT_NA_PX - 0.6
        w = fitz.Widget()
        w.field_name = p["nazwa"]
        w.field_label = p["opis"]
        w.field_type = fitz.PDF_WIDGET_TYPE_TEXT
        wysokosc = max(WYSOKOSC_POLA_PT, rozmiar + 4)
        w.rect = fitz.Rect(p["x0"] * PT_NA_PX, y1 - wysokosc, p["x1"] * PT_NA_PX, y1)
        w.text_font = "Helv"
        w.text_fontsize = rozmiar
        if p.get("wartosc"):
            w.field_value = p["wartosc"]
        w.text_color = KOLOR_TEKSTU
        w.border_width = 0
        w.border_color = None
        w.fill_color = None
        strona = doc[p["strona"]]  # trzymamy stronę, bo bez niej adnotacja traci powiązanie
        annot = strona.add_widget(w)
        if p["wyrownanie"]:
            # PyMuPDF nie wystawia wyrównania w Widget — klucz /Q wprost w słowniku pola
            doc.xref_set_key(annot.xref, "Q", str(p["wyrownanie"]))
            if p.get("wartosc"):
                annot.update()  # wygląd wpisanej wartości policzony już z wyrównaniem
        if p.get("pogrubienie"):
            pogrub(doc, annot, p, rozmiar)
    doc.need_appearances(True)
    return doc


def pogrub(doc, annot, p, rozmiar):
    """Pole pisane Helveticą Bold. PyMuPDF zna w polach tylko zwykłą Helveticę,
    więc font trafia do zasobów formularza ręcznie, a wygląd wpisanej wartości
    rysujemy sami — przeglądarka po edycji odtworzy go z /DA."""
    font = getattr(doc, "_hebo", None)
    if font is None:
        font = doc.get_new_xref()
        doc.update_object(font, "<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>")
        doc._hebo = font
        typ, wartosc = doc.xref_get_key(doc.pdf_catalog(), "AcroForm")
        cel = int(wartosc.split()[0]) if typ == "xref" else doc.pdf_catalog()
        klucz = "DR/Font/HeBo" if typ == "xref" else "AcroForm/DR/Font/HeBo"
        doc.xref_set_key(cel, klucz, f"{font} 0 R")
        # skoro formularz ma już własne zasoby, zwykła Helvetica pozostałych pól też musi w nich być
        zwykly = doc.get_new_xref()
        doc.update_object(zwykly, "<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>")
        doc.xref_set_key(cel, klucz.replace("HeBo", "Helv"), f"{zwykly} 0 R")
    kolor = " ".join(f"{k:g}" for k in KOLOR_TEKSTU)
    doc.xref_set_key(annot.xref, "DA", f"({kolor} rg /HeBo {rozmiar:g} Tf)")
    tekst = p.get("wartosc")
    typ, ap = doc.xref_get_key(annot.xref, "AP/N")
    if not tekst or typ != "xref":
        return
    ap = int(ap.split()[0])
    szer, wys = annot.rect.width, annot.rect.height
    dlugosc = fitz.get_text_length(tekst, "hebo", rozmiar)
    x = {0: 2, 1: (szer - dlugosc) / 2, 2: szer - 2 - dlugosc}[p["wyrownanie"]]
    y = (wys - rozmiar) / 2 + rozmiar * 0.22
    znaki = tekst.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
    doc.update_stream(ap, f"/Tx BMC q BT {kolor} rg /HeBo {rozmiar:g} Tf {x:.2f} {y:.2f} Td ({znaki}) Tj ET Q EMC".encode("cp1252"))
    doc.xref_set_key(ap, "Resources", f"<</Font<</HeBo {font} 0 R>>>>")


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    html, wynik = Path(sys.argv[1]), Path(sys.argv[2])

    with tempfile.TemporaryDirectory() as robocze:
        surowy = Path(robocze) / "bez-pol.pdf"
        pola = drukuj(html, surowy)
        doc = dodaj_pola(surowy, pola)
        doc.save(wynik, garbage=3, deflate=True)
        doc.close()

    print(f"{wynik}: {len(pola)} pól")
    for p in pola:
        print(f"  s.{p['strona'] + 1}  {p['nazwa']:26} {p['opis']}")


if __name__ == "__main__":
    main()
