import { vehicles, featuredVehicles, formatPrice, formatKm } from './data.js';
import { header, footer, setupShell, buttonLabel } from './components.js';

const app = document.querySelector('#app');
const heroVehicles = featuredVehicles.length ? featuredVehicles : vehicles.slice(0, 3);
const initialHero = heroVehicles[0];
const stockPreview = vehicles[1] || vehicles[0];

function heroControls() {
  return heroVehicles.map((vehicle, index) => `
    <button class="home-hero-switch ${index === 0 ? 'is-active' : ''}" type="button" data-hero-switch="${index}" aria-label="Mostrar ${vehicle.brand} ${vehicle.model}">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <strong>${vehicle.brand}</strong>
    </button>
  `).join('');
}

function stockRows() {
  return vehicles.map((vehicle, index) => `
    <a class="stock-row ${index === 1 ? 'is-active' : ''}" href="/vehicle.html?id=${vehicle.id}"
      data-stock-row data-image="${vehicle.hero}" data-position="${vehicle.heroPosition || '50% 50%'}"
      data-name="${vehicle.brand} ${vehicle.model}" data-index="${String(index + 1).padStart(2, '0')}">
      <span class="stock-row__number">${String(index + 1).padStart(2, '0')}</span>
      <span class="stock-row__name"><small>${vehicle.brand}</small><strong>${vehicle.model}</strong></span>
      <span class="stock-row__meta">${vehicle.year}<br>${formatKm(vehicle.km)}<br>${vehicle.hp} CV</span>
      <span class="stock-row__price">${formatPrice(vehicle.price)}</span>
      <span class="stock-row__arrow" aria-hidden="true">↗</span>
    </a>
  `).join('');
}

app.innerHTML = `
  ${header()}
  <main class="home-page home-page--v2">
    <section class="home-product-hero" data-home-hero>
      <div class="home-product-hero__media">
        <img src="${initialHero.hero}" alt="${initialHero.brand} ${initialHero.model}" data-hero-image style="object-position:${initialHero.heroPosition || '50% 50%'}">
      </div>
      <div class="home-product-hero__veil" aria-hidden="true"></div>
      <div class="home-product-hero__content">
        <div class="home-product-hero__title">
          <span data-hero-brand>${initialHero.brand}</span>
          <h1 data-hero-model>${initialHero.model}</h1>
        </div>
        <div class="home-product-hero__details">
          <p data-hero-meta>${initialHero.year} · ${formatKm(initialHero.km)} · ${initialHero.hp} CV</p>
          <strong data-hero-price>${formatPrice(initialHero.price)}</strong>
          <div class="home-product-hero__actions">
            <a class="button button--light" href="/vehicle.html?id=${initialHero.id}" data-hero-link>${buttonLabel('Ver unidad')}</a>
            <a class="home-product-hero__stock-link" href="/stock.html">Explorar stock <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div class="home-product-hero__switcher" aria-label="Cambiar vehículo destacado">
        ${heroControls()}
      </div>
      <div class="home-product-hero__location">El Puerto de Santa María · Cádiz</div>
    </section>

    <section class="home-stock-explorer" id="stock-destacado">
      <header class="home-stock-explorer__head">
        <div>
          <span class="home-index">01</span>
          <h2>Stock.<br>Sin adornos.</h2>
        </div>
        <div class="home-stock-explorer__intro">
          <p>Cada unidad con fotografías reales, kilometraje, potencia y precio visibles desde el principio. Entra en el coche que te interesa y nada más.</p>
          <a class="text-link" href="/stock.html">${buttonLabel('Ver stock completo')}</a>
        </div>
      </header>

      <div class="home-stock-explorer__body">
        <div class="home-stock-list" aria-label="Selección actual de Puerto Motor">
          ${stockRows()}
        </div>
        <aside class="home-stock-preview" aria-hidden="true">
          <div class="home-stock-preview__sticky">
            <img src="${stockPreview.hero}" alt="" data-stock-preview style="object-position:${stockPreview.heroPosition || '50% 50%'}">
            <div class="home-stock-preview__caption"><span data-stock-preview-index>02</span><strong data-stock-preview-name>${stockPreview.brand} ${stockPreview.model}</strong></div>
          </div>
        </aside>
      </div>
    </section>

    <section class="home-manifesto" id="puerto-motor">
      <div class="home-manifesto__copy">
        <span class="home-index">02</span>
        <h2>Criterio antes<br>que volumen.</h2>
        <p>Puerto Motor lleva más de diez años comprando y vendiendo automóviles. La selección no empieza en la web: empieza antes, decidiendo qué unidad merece entrar.</p>
        <p class="home-manifesto__proof">100 puntos de revisión · kilometraje certificado · 12 meses de garantía.</p>
        <a class="text-link text-link--light" href="#contacto">${buttonLabel('Hablar con Puerto Motor')}</a>
      </div>
      <div class="home-manifesto__gallery">
        <figure class="home-manifesto__gallery-main">
          <img src="https://puertomotor.es/wp-content/uploads/2023/12/DSC07353-Grande-672x568.jpg" alt="Instalaciones de Puerto Motor" loading="lazy">
          <figcaption>Calle Estuario, 14</figcaption>
        </figure>
        <div class="home-manifesto__gallery-side">
          <figure>
            <img src="https://puertomotor.es/wp-content/uploads/2023/12/instalaciones01-672x568.jpg" alt="Showroom de Puerto Motor" loading="lazy">
            <figcaption>Showroom</figcaption>
          </figure>
          <figure>
            <img src="https://puertomotor.es/wp-content/uploads/2023/12/DSC01421-min-1024x683-1.jpg" alt="Equipo de Puerto Motor" loading="lazy">
            <figcaption>Equipo Puerto Motor</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="home-sell" id="vende">
      <div class="home-sell__media">
        <img src="https://puertomotor.es/wp-content/uploads/2023/12/DSC01421-min-1024x683-1.jpg" alt="Equipo de Puerto Motor" loading="lazy">
      </div>
      <div class="home-sell__copy">
        <span class="home-index">03</span>
        <h2>¿Tienes un coche<br>que encaja aquí?</h2>
        <p>Dinos modelo, año, kilómetros y estado. Si la unidad encaja con Puerto Motor, el equipo continúa contigo directamente y prepara una valoración.</p>
        <a class="button button--dark" href="https://wa.me/34605932417?text=${encodeURIComponent('Hola, quiero valorar mi coche para venderlo a Puerto Motor')}">${buttonLabel('Solicitar valoración')}</a>
        <div class="home-sell__note"><span>Valoración directa</span><span>Gestión clara</span><span>Sin formulario eterno</span></div>
      </div>
    </section>
  </main>
  ${footer()}`;

setupShell();

const heroImage = document.querySelector('[data-hero-image]');
const heroBrand = document.querySelector('[data-hero-brand]');
const heroModel = document.querySelector('[data-hero-model]');
const heroMeta = document.querySelector('[data-hero-meta]');
const heroPrice = document.querySelector('[data-hero-price]');
const heroLink = document.querySelector('[data-hero-link]');
const heroSwitches = [...document.querySelectorAll('[data-hero-switch]')];
let heroIndex = 0;

function showHero(index) {
  const vehicle = heroVehicles[index];
  if (!vehicle || !heroImage) return;
  heroIndex = index;
  heroImage.classList.add('is-changing');
  window.setTimeout(() => {
    heroImage.src = vehicle.hero;
    heroImage.alt = `${vehicle.brand} ${vehicle.model}`;
    heroImage.style.objectPosition = vehicle.heroPosition || '50% 50%';
    heroBrand.textContent = vehicle.brand;
    heroModel.textContent = vehicle.model;
    heroMeta.textContent = `${vehicle.year} · ${formatKm(vehicle.km)} · ${vehicle.hp} CV`;
    heroPrice.textContent = formatPrice(vehicle.price);
    heroLink.href = `/vehicle.html?id=${vehicle.id}`;
    heroImage.classList.remove('is-changing');
  }, 180);
  heroSwitches.forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === index));
}

heroSwitches.forEach((button) => button.addEventListener('click', () => showHero(Number(button.dataset.heroSwitch))));

const stockPreviewImage = document.querySelector('[data-stock-preview]');
const stockPreviewName = document.querySelector('[data-stock-preview-name]');
const stockPreviewIndex = document.querySelector('[data-stock-preview-index]');
const stockRowsElements = [...document.querySelectorAll('[data-stock-row]')];

function previewStock(row) {
  if (!stockPreviewImage || !row) return;
  stockRowsElements.forEach((item) => item.classList.toggle('is-active', item === row));
  stockPreviewImage.classList.add('is-changing');
  window.setTimeout(() => {
    stockPreviewImage.src = row.dataset.image;
    stockPreviewImage.style.objectPosition = row.dataset.position || '50% 50%';
    stockPreviewName.textContent = row.dataset.name;
    stockPreviewIndex.textContent = row.dataset.index;
    stockPreviewImage.classList.remove('is-changing');
  }, 110);
}

stockRowsElements.forEach((row) => {
  row.addEventListener('mouseenter', () => previewStock(row));
  row.addEventListener('focus', () => previewStock(row));
});
