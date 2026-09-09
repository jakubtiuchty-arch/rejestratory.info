-- Rejestr ofert PDF generowanych przez klientów z kart produktów (/api/oferta-pdf).
-- Uruchomić w Supabase SQL Editor. Numer oferty to OF-RRRR-DDMMRRRR (data wystawienia),
-- więc kilka ofert z jednego dnia dzieli numer — stąd brak UNIQUE na `numer`.
-- Bez tej tabeli endpoint nadal działa, tylko nic nie zapisuje.

create table if not exists public.oferty_pdf (
  id           bigserial primary key,
  numer        text not null,
  slug         text not null,
  nadlesnictwo text not null,
  adres        text not null,
  nip          text,
  osoba        text not null,
  email        text not null,
  telefon      text,
  ilosc        integer not null default 1,
  uwagi        text,
  netto        bigint not null,   -- grosze
  brutto       bigint not null,   -- grosze
  wazna_do     date,
  created_at   timestamptz not null default now()
);

create index if not exists oferty_pdf_created_at_idx on public.oferty_pdf (created_at desc);
create index if not exists oferty_pdf_email_idx on public.oferty_pdf (email);

-- Endpoint pisze kluczem anon (jak reszta formularzy), więc RLS musi wpuścić insert.
alter table public.oferty_pdf enable row level security;

drop policy if exists "oferty_pdf_insert_anon" on public.oferty_pdf;
create policy "oferty_pdf_insert_anon" on public.oferty_pdf
  for insert to anon, authenticated with check (true);

drop policy if exists "oferty_pdf_select" on public.oferty_pdf;
create policy "oferty_pdf_select" on public.oferty_pdf
  for select to anon, authenticated using (true);
