export const vehicles = [
  {
    id: 'porsche-911',
    brand: 'Porsche',
    model: '911 Carrera 4S',
    year: 2020,
    km: 49424,
    hp: 450,
    fuel: 'Gasolina',
    body: 'Coupé',
    price: 139990,
    image: 'https://puertomotor.es/wp-content/uploads/2026/08/PORSCHE-992-NEGRO-49-KMS-1.jpg',
    hero: 'https://puertomotor.es/wp-content/uploads/2026/08/PORSCHE-992-NEGRO-49-KMS-1.jpg',
    warranty: '12 meses',
    transmission: 'Automático',
    summary: 'Un 911 Carrera 4S con Sport Chrono, escape deportivo, techo panorámico y sistema BOSE.',
    source: 'https://puertomotor.es/stock/porsche-911-carrera-992-4s-450-cv/'
  },
  {
    id: 'ferrari-purosangue',
    brand: 'Ferrari',
    model: 'Purosangue',
    year: 2023,
    km: 23341,
    hp: 719,
    fuel: 'Gasolina',
    body: 'SUV',
    price: 559990,
    image: 'https://puertomotor.es/wp-content/uploads/2026/08/ferrari_purosangre_23-kms-1.jpg',
    hero: 'https://puertomotor.es/wp-content/uploads/2026/08/ferrari_purosangre_23-kms-1.jpg',
    warranty: '12 meses',
    transmission: 'Automático',
    summary: 'Purosangue V12 con techo panorámico, carbono, Surround View y configuración de alto nivel.',
    source: 'https://puertomotor.es/stock/ferrari-purosangue-719-cv/'
  },
  {
    id: 'lamborghini-revuelto',
    brand: 'Lamborghini',
    model: 'Revuelto',
    year: 2025,
    km: 70,
    hp: 1015,
    fuel: 'Híbrido enchufable / Gasolina',
    body: 'Coupé',
    price: 630000,
    image: 'https://puertomotor.es/wp-content/uploads/2026/08/lamborrghini_revuelto_70kms-1.jpg',
    hero: 'https://puertomotor.es/wp-content/uploads/2026/08/lamborrghini_revuelto_70kms-1.jpg',
    warranty: '12 meses',
    transmission: 'Automático',
    summary: 'Revuelto V12 HPEV prácticamente a estrenar, con carbono, lift system y Sonus Faber.',
    source: 'https://puertomotor.es/stock/lamborghini-revuelto-6-5-v12-1-015-cv-2/'
  }
];

export const formatPrice = (value) => new Intl.NumberFormat('es-ES', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0
}).format(value);

export const formatKm = (value) => new Intl.NumberFormat('es-ES').format(value) + ' km';
