import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Mapowanie Nadleśnictw do RDLP
const NADLESNICTWO_TO_RDLP: Record<string, string> = {
  // RDLP Białystok
  "Augustów": "RDLP Białystok",
  "Białowieża": "RDLP Białystok",
  "Bielsk": "RDLP Białystok",
  "Borki": "RDLP Białystok",
  "Browsk": "RDLP Białystok",
  "Czarna Białostocka": "RDLP Białystok",
  "Dojlidy": "RDLP Białystok",
  "Drygały": "RDLP Białystok",
  "Głęboki Bród": "RDLP Białystok",
  "Gródek": "RDLP Białystok",
  "Hajnówka": "RDLP Białystok",
  "Knyszyn": "RDLP Białystok",
  "Krynki": "RDLP Białystok",
  "Łomża": "RDLP Białystok",
  "Maskulińskie": "RDLP Białystok",
  "Nurzec": "RDLP Białystok",
  "Płaska": "RDLP Białystok",
  "Pomorze": "RDLP Białystok",
  "Rajgród": "RDLP Białystok",
  "Rudka": "RDLP Białystok",
  "Sokółka": "RDLP Białystok",
  "Supraśl": "RDLP Białystok",
  "Suwałki": "RDLP Białystok",
  "Szczebra": "RDLP Białystok",
  "Waliły": "RDLP Białystok",
  "Żednia": "RDLP Białystok",
  
  // RDLP Gdańsk
  "Cewice": "RDLP Gdańsk",
  "Choczewo": "RDLP Gdańsk",
  "Gdańsk": "RDLP Gdańsk",
  "Kaliska": "RDLP Gdańsk",
  "Kartuzy": "RDLP Gdańsk",
  "Kościerzyna": "RDLP Gdańsk",
  "Lębork": "RDLP Gdańsk",
  "Lipusz": "RDLP Gdańsk",
  "Przymuszewo": "RDLP Gdańsk",
  "Starogard": "RDLP Gdańsk",
  "Strzebielino": "RDLP Gdańsk",
  "Wejherowo": "RDLP Gdańsk",
  "Wirty": "RDLP Gdańsk",
  
  // RDLP Katowice
  "Andrychów": "RDLP Katowice",
  "Bielsko": "RDLP Katowice",
  "Brynek": "RDLP Katowice",
  "Chrzanów": "RDLP Katowice",
  "Gidle": "RDLP Katowice",
  "Herby": "RDLP Katowice",
  "Jeleśnia": "RDLP Katowice",
  "Katowice": "RDLP Katowice",
  "Kłobuck": "RDLP Katowice",
  "Kobiór": "RDLP Katowice",
  "Koniecpol": "RDLP Katowice",
  "Lubliniec": "RDLP Katowice",
  "Olkusz": "RDLP Katowice",
  "Olesno": "RDLP Katowice",
  "Prudnik": "RDLP Katowice",
  "Rudziniec": "RDLP Katowice",
  "Rybnik": "RDLP Katowice",
  "Siewierz": "RDLP Katowice",
  "Strzelce Opolskie": "RDLP Katowice",
  "Sucha": "RDLP Katowice",
  "Świerklaniec": "RDLP Katowice",
  "Ujsoły": "RDLP Katowice",
  "Ustroń": "RDLP Katowice",
  "Wisła": "RDLP Katowice",
  "Zawadzkie": "RDLP Katowice",
  "Złoty Potok": "RDLP Katowice",
  
  // RDLP Kraków
  "Brzesko": "RDLP Kraków",
  "Dąbrowa Tarnowska": "RDLP Kraków",
  "Gorlice": "RDLP Kraków",
  "Gromnik": "RDLP Kraków",
  "Krościenko": "RDLP Kraków",
  "Krzeszowice": "RDLP Kraków",
  "Limanowa": "RDLP Kraków",
  "Łosie": "RDLP Kraków",
  "Miechów": "RDLP Kraków",
  "Myślenice": "RDLP Kraków",
  "Nawojowa": "RDLP Kraków",
  "Niepołomice": "RDLP Kraków",
  "Nowy Sącz": "RDLP Kraków",
  "Nowy Targ": "RDLP Kraków",
  "Piwniczna": "RDLP Kraków",
  "Stary Sącz": "RDLP Kraków",
  "Staszów": "RDLP Kraków",
  "Tarnów": "RDLP Kraków",
  
  // RDLP Krosno
  "Baligród": "RDLP Krosno",
  "Bircza": "RDLP Krosno",
  "Brzozów": "RDLP Krosno",
  "Cisna": "RDLP Krosno",
  "Dukla": "RDLP Krosno",
  "Dynów": "RDLP Krosno",
  "Jarosław": "RDLP Krosno",
  "Kańczuga": "RDLP Krosno",
  "Kolbuszowa": "RDLP Krosno",
  "Komańcza": "RDLP Krosno",
  "Krasiczyn": "RDLP Krosno",
  "Krosno": "RDLP Krosno",
  "Lesko": "RDLP Krosno",
  "Lubaczów": "RDLP Krosno",
  "Lutowiska": "RDLP Krosno",
  "Narol": "RDLP Krosno",
  "Oleszyce": "RDLP Krosno",
  "Przemyśl": "RDLP Krosno",
  "Radymno": "RDLP Krosno",
  "Rymanów": "RDLP Krosno",
  "Sieniawa": "RDLP Krosno",
  "Strzyżów": "RDLP Krosno",
  "Stuposiany": "RDLP Krosno",
  "Ustrzyki Dolne": "RDLP Krosno",
  "Wetlina": "RDLP Krosno",
  
  // RDLP Lublin
  "Biała Podlaska": "RDLP Lublin",
  "Biłgoraj": "RDLP Lublin",
  "Chełm": "RDLP Lublin",
  "Chotyłów": "RDLP Lublin",
  "Gościeradów": "RDLP Lublin",
  "Janów Lubelski": "RDLP Lublin",
  "Józefów": "RDLP Lublin",
  "Krasnystaw": "RDLP Lublin",
  "Kraśnik": "RDLP Lublin",
  "Lubartów": "RDLP Lublin",
  "Łuków": "RDLP Lublin",
  "Mircze": "RDLP Lublin",
  "Nowa Dęba": "RDLP Lublin",
  "Parczew": "RDLP Lublin",
  "Puławy": "RDLP Lublin",
  "Radzyń Podlaski": "RDLP Lublin",
  "Rozwadów": "RDLP Lublin",
  "Sarnaki": "RDLP Lublin",
  "Sobibór": "RDLP Lublin",
  "Tomaszów Lubelski": "RDLP Lublin",
  "Włodawa": "RDLP Lublin",
  "Zamość": "RDLP Lublin",
  "Zwierzyniec": "RDLP Lublin",
  
  // RDLP Łódź
  "Bełchatów": "RDLP Łódź",
  "Brzeziny": "RDLP Łódź",
  "Grotniki": "RDLP Łódź",
  "Kolumna": "RDLP Łódź",
  "Opoczno": "RDLP Łódź",
  "Piotrków": "RDLP Łódź",
  "Poddębice": "RDLP Łódź",
  "Przedbórz": "RDLP Łódź",
  "Radomsko": "RDLP Łódź",
  "Radziwiłłów": "RDLP Łódź",
  "Skierniewice": "RDLP Łódź",
  "Smardzewice": "RDLP Łódź",
  "Spała": "RDLP Łódź",
  "Wieluń": "RDLP Łódź",
  "Złoczew": "RDLP Łódź",
  
  // RDLP Olsztyn
  "Bartoszyce": "RDLP Olsztyn",
  "Czerwony Dwór": "RDLP Olsztyn",
  "Dobrocin": "RDLP Olsztyn",
  "Elbląg": "RDLP Olsztyn",
  "Giżycko": "RDLP Olsztyn",
  "Górowo Iławeckie": "RDLP Olsztyn",
  "Iława": "RDLP Olsztyn",
  "Jagiełek": "RDLP Olsztyn",
  "Jedwabno": "RDLP Olsztyn",
  "Korpele": "RDLP Olsztyn",
  "Kudypy": "RDLP Olsztyn",
  "Lidzbark": "RDLP Olsztyn",
  "Młynary": "RDLP Olsztyn",
  "Mrągowo": "RDLP Olsztyn",
  "Nowe Ramuki": "RDLP Olsztyn",
  "Olsztyn": "RDLP Olsztyn",
  "Olsztynek": "RDLP Olsztyn",
  "Orneta": "RDLP Olsztyn",
  "Srokowo": "RDLP Olsztyn",
  "Stare Jabłonki": "RDLP Olsztyn",
  "Strzałowo": "RDLP Olsztyn",
  "Szczytno": "RDLP Olsztyn",
  "Wichrowo": "RDLP Olsztyn",
  "Wipsowo": "RDLP Olsztyn",
  "Zaporowo": "RDLP Olsztyn",
  
  // RDLP Piła
  "Durowo": "RDLP Piła",
  "Gniezno": "RDLP Piła",
  "Jastrowie": "RDLP Piła",
  "Kaczory": "RDLP Piła",
  "Krucz": "RDLP Piła",
  "Oborniki": "RDLP Piła",
  "Płytnica": "RDLP Piła",
  "Podanin": "RDLP Piła",
  "Potrzebowice": "RDLP Piła",
  "Sarbia": "RDLP Piła",
  "Trzcianka": "RDLP Piła",
  "Wronki": "RDLP Piła",
  "Zdrojowa Góra": "RDLP Piła",
  
  // RDLP Poznań
  "Babki": "RDLP Poznań",
  "Czerniejewo": "RDLP Poznań",
  "Góra Śląska": "RDLP Poznań",
  "Grodziec": "RDLP Poznań",
  "Grodzisk": "RDLP Poznań",
  "Jarocin": "RDLP Poznań",
  "Karczma Borowa": "RDLP Poznań",
  "Kalisz": "RDLP Poznań",
  "Konstantynowo": "RDLP Poznań",
  "Kościan": "RDLP Poznań",
  "Łopuchówko": "RDLP Poznań",
  "Piaski": "RDLP Poznań",
  "Przedecz": "RDLP Poznań",
  "Sieraków": "RDLP Poznań",
  "Syców": "RDLP Poznań",
  "Taczanów": "RDLP Poznań",
  "Turek": "RDLP Poznań",
  
  // RDLP Radom
  "Barycz": "RDLP Radom",
  "Chmielnik": "RDLP Radom",
  "Daleszyce": "RDLP Radom",
  "Dobieszyn": "RDLP Radom",
  "Grójec": "RDLP Radom",
  "Jędrzejów": "RDLP Radom",
  "Kielce": "RDLP Radom",
  "Końskie": "RDLP Radom",
  "Łagów": "RDLP Radom",
  "Marcule": "RDLP Radom",
  "Ostrowiec Świętokrzyski": "RDLP Radom",
  "Pińczów": "RDLP Radom",
  "Przysucha": "RDLP Radom",
  "Radom": "RDLP Radom",
  "Ruda Maleniecka": "RDLP Radom",
  "Skarżysko": "RDLP Radom",
  "Starachowice": "RDLP Radom",
  "Stąporków": "RDLP Radom",
  "Suchedniów": "RDLP Radom",
  "Włoszczowa": "RDLP Radom",
  "Zagnańsk": "RDLP Radom",
  
  // RDLP Szczecin
  "Barlinek": "RDLP Szczecin",
  "Bogdaniec": "RDLP Szczecin",
  "Chojna": "RDLP Szczecin",
  "Choszczno": "RDLP Szczecin",
  "Dębno": "RDLP Szczecin",
  "Dobrzany": "RDLP Szczecin",
  "Goleniów": "RDLP Szczecin",
  "Gryfice": "RDLP Szczecin",
  "Gryfino": "RDLP Szczecin",
  "Kliniska": "RDLP Szczecin",
  "Międzychód": "RDLP Szczecin",
  "Międzyzdroje": "RDLP Szczecin",
  "Mieszkowice": "RDLP Szczecin",
  "Myślibórz": "RDLP Szczecin",
  "Nowogard": "RDLP Szczecin",
  "Resko": "RDLP Szczecin",
  "Rokita": "RDLP Szczecin",
  "Skwierzyna": "RDLP Szczecin",
  "Trzebież": "RDLP Szczecin",
  "Uchanie": "RDLP Szczecin",
  
  // RDLP Szczecinek
  "Białogard": "RDLP Szczecinek",
  "Bobolice": "RDLP Szczecinek",
  "Borne Sulinowo": "RDLP Szczecinek",
  "Bytów": "RDLP Szczecinek",
  "Czaplinek": "RDLP Szczecinek",
  "Człopa": "RDLP Szczecinek",
  "Damnica": "RDLP Szczecinek",
  "Drawsko": "RDLP Szczecinek",
  "Dretyń": "RDLP Szczecinek",
  "Gościno": "RDLP Szczecinek",
  "Karnieszewice": "RDLP Szczecinek",
  "Koszalin": "RDLP Szczecinek",
  "Łupawa": "RDLP Szczecinek",
  "Manowo": "RDLP Szczecinek",
  "Miastko": "RDLP Szczecinek",
  "Mirosławiec": "RDLP Szczecinek",
  "Osusznica": "RDLP Szczecinek",
  "Polanów": "RDLP Szczecinek",
  "Połczyn": "RDLP Szczecinek",
  "Sławno": "RDLP Szczecinek",
  "Słupsk": "RDLP Szczecinek",
  "Świdwin": "RDLP Szczecinek",
  "Świerczyna": "RDLP Szczecinek",
  "Szczecinek": "RDLP Szczecinek",
  "Tychowo": "RDLP Szczecinek",
  "Ustka": "RDLP Szczecinek",
  "Wałcz": "RDLP Szczecinek",
  "Złocieniec": "RDLP Szczecinek",
  
  // RDLP Toruń
  "Bydgoszcz": "RDLP Toruń",
  "Cierpiszewo": "RDLP Toruń",
  "Dąbrowa": "RDLP Toruń",
  "Dobrzejewice": "RDLP Toruń",
  "Gniewkowo": "RDLP Toruń",
  "Golub-Dobrzyń": "RDLP Toruń",
  "Gostycyn": "RDLP Toruń",
  "Jamy": "RDLP Toruń",
  "Lutówko": "RDLP Toruń",
  "Miradz": "RDLP Toruń",
  "Niedźwiedź": "RDLP Toruń",
  "Osie": "RDLP Toruń",
  "Różanna": "RDLP Toruń",
  "Runowo": "RDLP Toruń",
  "Rytel": "RDLP Toruń",
  "Skrwilno": "RDLP Toruń",
  "Solec Kujawski": "RDLP Toruń",
  "Szubin": "RDLP Toruń",
  "Toruń": "RDLP Toruń",
  "Trzebciny": "RDLP Toruń",
  "Tuchola": "RDLP Toruń",
  "Włocławek": "RDLP Toruń",
  "Zamrzenica": "RDLP Toruń",
  "Żołędowo": "RDLP Toruń",
  
  // RDLP Warszawa
  "Błędów": "RDLP Warszawa",
  "Celestynów": "RDLP Warszawa",
  "Chojnów": "RDLP Warszawa",
  "Ciechanów": "RDLP Warszawa",
  "Drewnica": "RDLP Warszawa",
  "Jabłonna": "RDLP Warszawa",
  "Kozienice": "RDLP Warszawa",
  "Mińsk": "RDLP Warszawa",
  "Mława": "RDLP Warszawa",
  "Nasielsk": "RDLP Warszawa",
  "Ostrołęka": "RDLP Warszawa",
  "Ostrów Mazowiecka": "RDLP Warszawa",
  "Pułtusk": "RDLP Warszawa",
  "Płock": "RDLP Warszawa",
  "Siedlce": "RDLP Warszawa",
  "Sokołów": "RDLP Warszawa",
  "Wyszków": "RDLP Warszawa",
  
  // RDLP Wrocław
  "Bardo Śląskie": "RDLP Wrocław",
  "Bolesławiec": "RDLP Wrocław",
  "Bystrzyca Kłodzka": "RDLP Wrocław",
  "Głogów": "RDLP Wrocław",
  "Henryków": "RDLP Wrocław",
  "Jawor": "RDLP Wrocław",
  "Jelenia Góra": "RDLP Wrocław",
  "Jugów": "RDLP Wrocław",
  "Kamienna Góra": "RDLP Wrocław",
  "Lądek Zdrój": "RDLP Wrocław",
  "Legnica": "RDLP Wrocław",
  "Lwówek Śląski": "RDLP Wrocław",
  "Międzylesie": "RDLP Wrocław",
  "Miękinia": "RDLP Wrocław",
  "Milicz": "RDLP Wrocław",
  "Oława": "RDLP Wrocław",
  "Oleśnica Śląska": "RDLP Wrocław",
  "Śnieżka": "RDLP Wrocław",
  "Szklarska Poręba": "RDLP Wrocław",
  "Świeradów": "RDLP Wrocław",
  "Świętoszów": "RDLP Wrocław",
  "Wałbrzych": "RDLP Wrocław",
  "Wołów": "RDLP Wrocław",
  "Zdroje": "RDLP Wrocław",
  "Złotoryja": "RDLP Wrocław",
  "Żmigród": "RDLP Wrocław",
  
  // RDLP Zielona Góra
  "Babimost": "RDLP Zielona Góra",
  "Bierzwnik": "RDLP Zielona Góra",
  "Bytnica": "RDLP Zielona Góra",
  "Gubin": "RDLP Zielona Góra",
  "Krosno Odrzańskie": "RDLP Zielona Góra",
  "Krzystkowice": "RDLP Zielona Góra",
  "Lipinki Łużyckie": "RDLP Zielona Góra",
  "Lubsko": "RDLP Zielona Góra",
  "Nowa Sól": "RDLP Zielona Góra",
  "Nowogród Bobrzański": "RDLP Zielona Góra",
  "Przytok": "RDLP Zielona Góra",
  "Sława Śląska": "RDLP Zielona Góra",
  "Sulechów": "RDLP Zielona Góra",
  "Sulęcin": "RDLP Zielona Góra",
  "Szprotawa": "RDLP Zielona Góra",
  "Świebodzin": "RDLP Zielona Góra",
  "Wymiarki": "RDLP Zielona Góra",
  "Żagań": "RDLP Zielona Góra",
  "Żary": "RDLP Zielona Góra",
  
  // Dodatkowe znane nadleśnictwa (uzupełnij w razie potrzeby)
  "Pieńsk": "RDLP Wrocław",
};

// Funkcja do wyciągnięcia nazwy Nadleśnictwa z pełnej nazwy klienta
function extractNadlesnictwoName(clientName: string): string {
  // Usuń "Nadleśnictwo " z nazwy
  return clientName.replace(/^Nadleśnictwo\s+/i, '').trim();
}

// Funkcja do przypisania RDLP
function getRDLP(clientName: string): string {
  const name = extractNadlesnictwoName(clientName);
  return NADLESNICTWO_TO_RDLP[name] || "Nieznane RDLP";
}

// Funkcja do grupowania danych według RDLP
function groupByRDLP(products: any[]) {
  const grouped: Record<string, any[]> = {};
  
  products.forEach(product => {
    const rdlp = getRDLP(product.client_name);
    if (!grouped[rdlp]) {
      grouped[rdlp] = [];
    }
    grouped[rdlp].push(product);
  });
  
  return grouped;
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return NextResponse.json({ error: "Brak pytania" }, { status: 400 });
    }

    // Pobierz wszystkie produkty z bazy
    const { data: products, error } = await supabase
      .from("sales_products")
      .select("*")
      .order("sale_date", { ascending: false });

    if (error) {
      console.error("Błąd pobierania danych:", error);
      return NextResponse.json({ error: "Błąd pobierania danych" }, { status: 500 });
    }

    // Przygotuj kontekst dla AI
    const productsWithRDLP = (products || []).map(p => ({
      ...p,
      rdlp: getRDLP(p.client_name)
    }));

    // Grupuj dane
    const byRDLP = groupByRDLP(productsWithRDLP);
    const byCategory: Record<string, number> = {};
    const byDevice: Record<string, number> = {};
    const byClient: Record<string, number> = {};

    productsWithRDLP.forEach(p => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      byDevice[p.device_type] = (byDevice[p.device_type] || 0) + 1;
      byClient[p.client_name] = (byClient[p.client_name] || 0) + 1;
    });

    // Statystyki RDLP
    const rdlpStats: Record<string, { total: number; devices: Record<string, number> }> = {};
    Object.entries(byRDLP).forEach(([rdlp, items]) => {
      rdlpStats[rdlp] = {
        total: items.length,
        devices: {}
      };
      items.forEach((item: any) => {
        rdlpStats[rdlp].devices[item.device_type] = (rdlpStats[rdlp].devices[item.device_type] || 0) + 1;
      });
    });

    // Sortuj urządzenia od największej liczby do najmniejszej
    const sortedDevices = Object.entries(byDevice).sort((a, b) => b[1] - a[1]);
    const sortedClients = Object.entries(byClient).sort((a, b) => b[1] - a[1]);
    const sortedRDLPs = Object.entries(rdlpStats).sort((a, b) => b[1].total - a[1].total);

    // Kontekst dla AI
    const context = `
Jesteś asystentem analitycznym firmy TAKMA, która sprzedaje sprzęt IT do Lasów Państwowych.
ZAWSZE odpowiadaj KONKRETNIE na pytanie, podając liczby!

PODSUMOWANIE:
- Łączna liczba urządzeń: ${productsWithRDLP.length}
- Liczba modeli: ${sortedDevices.length}
- Liczba klientów: ${Object.keys(byClient).length}

TOP 5 URZĄDZEŃ (od największej sprzedaży):
${sortedDevices.slice(0, 5).map(([d, c], i) => `${i + 1}. ${d}: ${c} szt.`).join('\n')}

TOP 5 KLIENTÓW:
${sortedClients.slice(0, 5).map(([c, cnt], i) => `${i + 1}. ${c}: ${cnt} szt.`).join('\n')}

TOP 5 RDLP:
${sortedRDLPs.slice(0, 5).map(([r, s], i) => `${i + 1}. ${r}: ${s.total} szt.`).join('\n')}

WSZYSTKIE URZĄDZENIA:
${sortedDevices.map(([device, count]) => `${device}: ${count}`).join('\n')}

WSZYSTKIE KLIENTY:
${sortedClients.map(([client, count]) => `${client} (${getRDLP(client)}): ${count}`).join('\n')}

ZASADY:
- Odpowiadaj po polsku, zwięźle i ZAWSZE z konkretnymi liczbami
- Na pytanie "jakich urządzeń najwięcej" - podaj TOP 5 urządzeń z liczbami
- Na pytanie "kto kupił najwięcej" - podaj TOP 5 klientów
- Używaj emoji dla lepszej czytelności
`;

    // Wywołaj OpenAI
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiKey) {
      // Jeśli nie ma klucza OpenAI, zwróć podstawową odpowiedź
      return NextResponse.json({
        answer: generateBasicAnswer(question, productsWithRDLP, rdlpStats, byDevice, byCategory),
        rdlpStats,
        totalProducts: productsWithRDLP.length
      });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: context },
          { role: "user", content: question }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error("OpenAI error:", errorData);
      return NextResponse.json({
        answer: generateBasicAnswer(question, productsWithRDLP, rdlpStats, byDevice, byCategory),
        rdlpStats,
        totalProducts: productsWithRDLP.length
      });
    }

    const openaiData = await openaiResponse.json();
    const answer = openaiData.choices?.[0]?.message?.content || "Nie udało się uzyskać odpowiedzi.";

    return NextResponse.json({
      answer,
      rdlpStats,
      totalProducts: productsWithRDLP.length
    });

  } catch (error) {
    console.error("Błąd:", error);
    return NextResponse.json({ error: "Wystąpił błąd" }, { status: 500 });
  }
}

// Śmieszne odpowiedzi gdy brak danych
const funnyNoDataResponses = [
  "Ej ej... przecież nie ma takiego Nadleśnictwa! 😅 Sprawdź pisownię albo pytaj o coś co istnieje!",
  "Hmm, szukam, szukam... i nic! 🔍 Takiego Nadleśnictwa nie znam. Może literówka?",
  "No nie no... 🤔 Nie ma czegoś takiego w moich danych. Jesteś pewien pisowni?",
  "Hola hola! 🛑 Nie znam takiego Nadleśnictwa. Może chodziło Ci o inne?",
];

const funnyNoSalesResponses = [
  "A niestety! 😔 Nadleśnictwo istnieje, ale jeszcze tam nic nie sprzedaliśmy. Może czas to zmienić? 💪",
  "Jest takie Nadleśnictwo, owszem... ale 0 sztuk u nich! 📊 Czekamy na pierwszy deal!",
  "Nadleśnictwo jest, sprzedaży brak! 🎯 Może warto zadzwonić?",
  "Znam to miejsce! Ale niestety - pusto w kolumnie sprzedaży. Jeszcze... 😉",
];

const funnyGreetings = [
  "O, to ciekawe pytanie! 🌲",
  "Sprawdzam, sprawdzam... 📈",
  "Dobra, mam to! 💡",
  "No to lecimy z danymi! 🚀",
];

// Podstawowa odpowiedź bez AI
function generateBasicAnswer(
  question: string,
  products: any[],
  rdlpStats: Record<string, any>,
  byDevice: Record<string, number>,
  byCategory: Record<string, number>
): string {
  const q = question.toLowerCase();
  
  // Losowa funkcja
  const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Pytania o najwięcej/najmniej sprzedane urządzenia
  if ((q.includes('urządze') || q.includes('model') || q.includes('sprzęt') || q.includes('jakich') || q.includes('dostarczy') || q.includes('sprzeda')) && 
      (q.includes('najwięcej') || q.includes('najmniej') || q.includes('top') || q.includes('ranking') || q.includes('popularn') || q.includes('często'))) {
    const sortedDevices = Object.entries(byDevice).sort((a, b) => b[1] - a[1]);
    
    if (sortedDevices.length === 0) {
      return "Hmm, nie mam jeszcze żadnych danych o urządzeniach. Dodaj sprzedaże! 📊";
    }
    
    if (q.includes('najmniej')) {
      const top5Least = sortedDevices.slice(-5).reverse();
      return `${randomFrom(funnyGreetings)}\n\n📉 Najmniej sprzedane urządzenia:\n${
        top5Least.map(([d, c], i) => `${i + 1}. ${d}: ${c} szt.`).join('\n')
      }`;
    } else {
      const top5 = sortedDevices.slice(0, 5);
      return `${randomFrom(funnyGreetings)}\n\n🏆 TOP 5 najczęściej dostarczanych urządzeń:\n${
        top5.map(([d, c], i) => `${i + 1}. ${d}: ${c} szt.`).join('\n')
      }\n\n📊 Łącznie ${products.length} urządzeń w ${sortedDevices.length} modelach.`;
    }
  }
  
  // Pytania o łączną liczbę, statystyki, podsumowanie
  if (q.includes('ile') && (q.includes('wszystki') || q.includes('łącznie') || q.includes('razem') || q.includes('ogółem') || q.includes('suma'))) {
    const sortedDevices = Object.entries(byDevice).sort((a, b) => b[1] - a[1]);
    const sortedClients = Object.entries(products.reduce((acc: Record<string, number>, p) => {
      acc[p.client_name] = (acc[p.client_name] || 0) + 1;
      return acc;
    }, {})).sort((a, b) => b[1] - a[1]);
    
    return `${randomFrom(funnyGreetings)}\n\n📊 Podsumowanie sprzedaży:\n\n• Łącznie urządzeń: ${products.length} szt.\n• Liczba modeli: ${sortedDevices.length}\n• Liczba klientów: ${sortedClients.length}\n\n🏆 Top 3 urządzenia:\n${
      sortedDevices.slice(0, 3).map(([d, c], i) => `${i + 1}. ${d}: ${c} szt.`).join('\n')
    }\n\n🏢 Top 3 klienci:\n${
      sortedClients.slice(0, 3).map(([c, cnt], i) => `${i + 1}. ${c}: ${cnt} szt.`).join('\n')
    }`;
  }
  
  // Pytania o konkretne Nadleśnictwo
  const nadlesnictwoMatch = q.match(/nadleśnictw[aouy]?\s+(\w+)/i) || q.match(/do\s+(\w+)/i) || q.match(/ile\s+(?:do\s+)?(\w+)/i);
  if (nadlesnictwoMatch) {
    const searchName = nadlesnictwoMatch[1];
    
    // Ignoruj słowa kluczowe które nie są nazwami
    const ignoredWords = ['ile', 'do', 'rdlp', 'rejestratorów', 'urządzeń', 'sztuk', 'sprzedano', 'wszystkich', 'ogółem', 'razem', 'łącznie'];
    if (ignoredWords.includes(searchName.toLowerCase())) {
      // To nie jest nazwa Nadleśnictwa, kontynuuj do innych sprawdzeń
    } else {
      // Szukaj w produktach
      const matchingProducts = products.filter(p => 
        p.client_name.toLowerCase().includes(searchName.toLowerCase())
      );
      
      if (matchingProducts.length === 0) {
        // Sprawdź czy Nadleśnictwo istnieje w mapowaniu RDLP
        const existsInMapping = Object.keys(NADLESNICTWO_TO_RDLP).some(
          name => name.toLowerCase().includes(searchName.toLowerCase())
        );
        
        if (existsInMapping) {
          return randomFrom(funnyNoSalesResponses);
        } else {
          return randomFrom(funnyNoDataResponses);
        }
      } else {
        const clientName = matchingProducts[0].client_name;
        const rdlp = getRDLP(clientName);
        const deviceBreakdown: Record<string, number> = {};
        matchingProducts.forEach(p => {
          deviceBreakdown[p.device_type] = (deviceBreakdown[p.device_type] || 0) + 1;
        });
        
        return `${randomFrom(funnyGreetings)}\n\nDo ${clientName} (${rdlp || 'RDLP nieznane'}) sprzedano łącznie ${matchingProducts.length} urządzeń:\n${
          Object.entries(deviceBreakdown).map(([d, c]) => `• ${d}: ${c} szt.`).join('\n')
        }`;
      }
    }
  }
  
  // Pytania o ranking RDLP (które kupiło najwięcej/najmniej)
  if ((q.includes('rdlp') || q.includes('dyrekcj')) && (q.includes('najwięcej') || q.includes('najmniej') || q.includes('które') || q.includes('ranking') || q.includes('top'))) {
    const sortedRDLPs = Object.entries(rdlpStats)
      .sort((a, b) => b[1].total - a[1].total);
    
    if (sortedRDLPs.length === 0) {
      return "Hmm, nie mam jeszcze żadnych danych o RDLP. Dodaj sprzedaże, a potem pogadamy! 📊";
    }
    
    if (q.includes('najmniej')) {
      const [rdlp, stats] = sortedRDLPs[sortedRDLPs.length - 1];
      return `${randomFrom(funnyGreetings)}\n\n📉 Najmniej kupiło ${rdlp} - tylko ${stats.total} szt.\n\nPełny ranking:\n${
        sortedRDLPs.map(([r, s], i) => `${i + 1}. ${r}: ${s.total} szt.`).join('\n')
      }`;
    } else {
      const [rdlp, stats] = sortedRDLPs[0];
      return `${randomFrom(funnyGreetings)}\n\n🏆 Najwięcej kupiło ${rdlp} - aż ${stats.total} szt.!\n\nPełny ranking:\n${
        sortedRDLPs.map(([r, s], i) => `${i + 1}. ${r}: ${s.total} szt.`).join('\n')
      }`;
    }
  }
  
  // Pytania o konkretne RDLP (z nazwą miasta)
  const knownRDLPs = ['olsztyn', 'białystok', 'gdańsk', 'katowice', 'kraków', 'krosno', 'lublin', 'łódź', 'piła', 'poznań', 'radom', 'szczecin', 'szczecinek', 'toruń', 'warszawa', 'wrocław', 'zielona góra'];
  const rdlpCityMatch = knownRDLPs.find(city => q.includes(city));
  
  if (rdlpCityMatch || q.match(/rdlp\s+([a-ząćęłńóśźż]+)/i)) {
    let rdlpName: string;
    
    if (rdlpCityMatch) {
      rdlpName = `RDLP ${rdlpCityMatch.charAt(0).toUpperCase() + rdlpCityMatch.slice(1)}`;
    } else {
      const match = q.match(/rdlp\s+([a-ząćęłńóśźż]+)/i);
      if (!match) return '';
      const potentialName = match[1].toLowerCase();
      // Sprawdź czy to nie jest słowo kluczowe
      if (['kupiło', 'kupił', 'sprzedało', 'które', 'ile', 'co', 'jak'].includes(potentialName)) {
        // To nie jest nazwa RDLP, kontynuuj do innych sprawdzeń
      } else {
        rdlpName = `RDLP ${potentialName.charAt(0).toUpperCase() + potentialName.slice(1)}`;
      }
    }
    
    if (rdlpName!) {
      const stats = rdlpStats[rdlpName];
      if (stats) {
        return `${randomFrom(funnyGreetings)}\n\nDo ${rdlpName} sprzedano łącznie ${stats.total} urządzeń:\n${
          Object.entries(stats.devices).map(([d, c]) => `• ${d}: ${c} szt.`).join('\n')
        }`;
      } else {
        const availableRDLPs = Object.keys(rdlpStats);
        return `Hmm, ${rdlpName}? 🤔 Nie mamy tam sprzedaży.\n\nMamy dane dla: ${availableRDLPs.length > 0 ? availableRDLPs.join(', ') : 'żadnego RDLP jeszcze'}`;
      }
    }
  }

  // Pytania o konkretne urządzenie
  const deviceMatch = Object.keys(byDevice).find(d => q.includes(d.toLowerCase()));
  if (deviceMatch) {
    const count = byDevice[deviceMatch];
    const rdlpBreakdown = Object.entries(rdlpStats)
      .filter(([_, stats]) => stats.devices[deviceMatch])
      .map(([rdlp, stats]) => `${rdlp}: ${stats.devices[deviceMatch]}`)
      .join(', ');
    return `${randomFrom(funnyGreetings)}\n\nSprzedano ${count} szt. ${deviceMatch}! 🎉\n\nPodział: ${rdlpBreakdown || 'brak szczegółów'}`;
  }

  // Pytania o kategorię
  if (q.includes('rejestr')) {
    const count = byCategory['rejestratory'] || 0;
    return `${randomFrom(funnyGreetings)}\n\nRejestratory: ${count} szt. w systemie! 📱`;
  }

  // Pytania o klientów/nadleśnictwa - kto kupił najwięcej
  if ((q.includes('klient') || q.includes('nadleśnictw') || q.includes('kto')) && 
      (q.includes('najwięcej') || q.includes('najmniej') || q.includes('top') || q.includes('ranking'))) {
    const sortedClients = Object.entries(products.reduce((acc: Record<string, number>, p) => {
      acc[p.client_name] = (acc[p.client_name] || 0) + 1;
      return acc;
    }, {})).sort((a, b) => b[1] - a[1]);
    
    if (sortedClients.length === 0) {
      return "Hmm, nie mam jeszcze żadnych klientów w bazie. Dodaj sprzedaże! 📊";
    }
    
    if (q.includes('najmniej')) {
      const bottom5 = sortedClients.slice(-5).reverse();
      return `${randomFrom(funnyGreetings)}\n\n📉 Nadleśnictwa z najmniejszą liczbą urządzeń:\n${
        bottom5.map(([c, cnt], i) => `${i + 1}. ${c}: ${cnt} szt.`).join('\n')
      }`;
    } else {
      const top5 = sortedClients.slice(0, 5);
      return `${randomFrom(funnyGreetings)}\n\n🏆 TOP 5 klientów z największą liczbą urządzeń:\n${
        top5.map(([c, cnt], i) => `${i + 1}. ${c}: ${cnt} szt.`).join('\n')
      }`;
    }
  }
  
  // Domyślna odpowiedź - pokaż podsumowanie
  const uniqueClients = [...new Set(products.map(p => p.client_name))];
  if (uniqueClients.length === 0) {
    return "Hej! 👋 Jeszcze nie mamy żadnych danych sprzedażowych. Dodaj pierwsze urządzenia, a potem pogadamy! 😉";
  }
  
  // Jeśli pytanie nie pasuje do wzorców, daj sensowne podsumowanie
  const sortedDevices = Object.entries(byDevice).sort((a, b) => b[1] - a[1]);
  const top3Devices = sortedDevices.slice(0, 3);
  
  return `${randomFrom(funnyGreetings)}\n\n📊 Mam dane o ${products.length} urządzeniach dla ${uniqueClients.length} Nadleśnictw.\n\n🏆 TOP 3 urządzenia:\n${
    top3Devices.map(([d, c], i) => `${i + 1}. ${d}: ${c} szt.`).join('\n')
  }`;
}

// Endpoint GET do pobierania mapowania RDLP
export async function GET() {
  const { data: products } = await supabase
    .from("sales_products")
    .select("client_name")
    .order("client_name");

  const uniqueClients = [...new Set((products || []).map(p => p.client_name))];
  const clientsWithRDLP = uniqueClients.map(client => ({
    client,
    rdlp: getRDLP(client)
  }));

  return NextResponse.json({
    mapping: NADLESNICTWO_TO_RDLP,
    clients: clientsWithRDLP
  });
}
