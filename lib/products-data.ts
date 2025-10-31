export const productsByCategory = {
  "rejestratory-mobilne": [
    {
      id: 1,
      slug: 'zebra-em45',
      name: 'Zebra EM45',
      category: 'Rejestrator',
      description: 'Zebra EM45 to niezawodny terminal terenowy, który zastępuje zwykły telefon.',
      shortDescription: 'Niezawodny terminal terenowy z wbudowanym skanerem',
      specifications: [
        { label: 'System operacyjny', value: 'Android 14' },
        { label: 'Ekran', value: '6,5" FHD' },
        { label: 'Procesor', value: 'Snapdragon Octa-Core 2,2 GHz' }
      ],
      accessories: ['Ładowarka sieciowa USBC', 'ładowarka samochodowa'],
      whereToBuy: 'ZUP Łódź',
      imageUrl: '/images/zebra-em45.jpg',
      serviceContract: '3 i 5 letnie',
      price: 'Cena na zapytanie',
      availability: 'Na zamówienie'
    },
    {
      id: 2,
      slug: 'honeywell-ct40',
      name: 'Honeywell CT40',
      category: 'Rejestrator',
      description: 'Kompaktowy terminal mobilny z Android i długą żywotnością baterii',
      shortDescription: 'Terminal mobilny z wytrzymałą konstrukcją',
      specifications: [
        { label: 'System operacyjny', value: 'Android 11' },
        { label: 'Ekran', value: '5,5" HD' },
        { label: 'Procesor', value: 'Qualcomm 660 2,2 GHz' }
      ],
      accessories: ['Stacja dokująca', 'Pasek nośny'],
      whereToBuy: 'ZUP Warszawa',
      imageUrl: '/images/honeywell-ct40.jpg',
      serviceContract: '3 lata',
      price: '2800 PLN',
      availability: 'Dostępny'
    }
  ],
  "drukarki": [
    {
      id: 3,
      slug: 'zebra-zd420',
      name: 'Zebra ZD420',
      category: 'Drukarka',
      description: 'Drukarka etykiet termicznych do zastosowań biurowych',
      shortDescription: 'Kompaktowa drukarka etykiet termicznych',
      specifications: [
        { label: 'Typ', value: 'Termiczna' },
        { label: 'Szerokość druku', value: '104 mm' },
        { label: 'Rozdzielczość', value: '203 dpi' }
      ],
      accessories: ['Rolka etykiet', 'Kabel USB'],
      whereToBuy: 'ZUP Kraków',
      imageUrl: '/images/zebra-zd420.jpg',
      serviceContract: '2 lata',
      price: '680 PLN',
      availability: 'Dostępny'
    },
    {
      id: 4,
      slug: 'hp-laserjet-pro',
      name: 'HP LaserJet Pro M404n',
      category: 'Drukarka',
      description: 'Szybka drukarka laserowa do biura z funkcją sieciową',
      shortDescription: 'Drukarka A4 monochromatyczna z siecią',
      specifications: [
        { label: 'Typ', value: 'Laserowa' },
        { label: 'Format', value: 'A4' },
        { label: 'Prędkość', value: '38 str/min' }
      ],
      accessories: ['Toner CF276A', 'Kabel sieciowy'],
      whereToBuy: 'ZUP Poznań',
      imageUrl: '/images/hp-m404n.jpg',
      serviceContract: '1 rok',
      price: '920 PLN',
      availability: 'Dostępny'
    }
  ],
  "tablety": [
    {
      id: 5,
      slug: 'samsung-galaxy-tab-active',
      name: 'Samsung Galaxy Tab Active 4 Pro',
      category: 'Tablet',
      description: 'Wytrzymały tablet z certyfikatem IP68 do pracy w trudnych warunkach',
      shortDescription: 'Pancerny tablet z rysikiem S Pen',
      specifications: [
        { label: 'System operacyjny', value: 'Android 13' },
        { label: 'Ekran', value: '10,1" WUXGA' },
        { label: 'Procesor', value: 'Exynos 1380' }
      ],
      accessories: ['Etui pancerne', 'Rysik S Pen', 'Ładowarka'],
      whereToBuy: 'ZUP Gdańsk',
      imageUrl: '/images/galaxy-tab-active.jpg',
      serviceContract: '2 lata',
      price: '1890 PLN',
      availability: 'Na zamówienie'
    }
  ],
  "laptopy": [
    {
      id: 6,
      slug: 'lenovo-thinkpad-e15',
      name: 'Lenovo ThinkPad E15',
      category: 'Laptop',
      description: 'Biznesowy laptop z długą żywotnością baterii',
      shortDescription: 'Laptop biznesowy 15,6" z Windows 11 Pro',
      specifications: [
        { label: 'Procesor', value: 'Intel Core i5-1235U' },
        { label: 'RAM', value: '16 GB DDR4' },
        { label: 'Dysk', value: '512 GB SSD' }
      ],
      accessories: ['Torba na laptop', 'Mysz optyczna'],
      whereToBuy: 'ZUP Wrocław',
      imageUrl: '/images/thinkpad-e15.jpg',
      serviceContract: '3 lata',
      price: '3200 PLN',
      availability: 'Dostępny'
    }
  ],
  "serwery": [
    {
      id: 7,
      slug: 'dell-poweredge-t140',
      name: 'Dell PowerEdge T140',
      category: 'Serwer',
      description: 'Kompaktowy serwer wieżowy dla małych biur',
      shortDescription: 'Serwer tower z Intel Xeon',
      specifications: [
        { label: 'Procesor', value: 'Intel Xeon E-2224' },
        { label: 'RAM', value: '16 GB DDR4' },
        { label: 'Dyski', value: '2x 1TB SATA' }
      ],
      accessories: ['Rails kit', 'UPS'],
      whereToBuy: 'ZUP Lublin',
      imageUrl: '/images/dell-t140.jpg',
      serviceContract: '5 lat',
      price: 'Cena na zapytanie',
      availability: 'Na zamówienie'
    }
  ]
};

export const getTotalProductCount = () => {
  return Object.values(productsByCategory).flat().length;
};
