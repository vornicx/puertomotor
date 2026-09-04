import { formatPrice, formatKm } from './data.js';

const arrow = `<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M10 5l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function header(active = '') {
  return `
    <header class="site-header" data-header>
      <a class="wordmark" href="/index.html" aria-label="Puerto Motor, inicio">PUERTO MOTOR</a>
      <button class="menu-button" aria-label="Abrir menú" aria-expanded="false" data-menu-button>
        <span></span><span></span>
      </button>
      <nav class="nav" data-nav>
        <a class="${active === 'stock' ? 'is-active' : ''}" href="/stock.html">Stock</a>
        <a href="/index.html#vende">Vende tu coche</a>
        <a href="/index.html#servicios">Servicios</a>
        <a href="/index.html#puerto-motor">Puerto Motor</a>
        <a href="/index.html#contacto">Contacto</a>
      </nav>
      <a class="header-cta" href="/stock.html">Ver stock ${arrow}</a>
    </header>`;
}

export function buttonLabel(label) {
  return `${label}${arrow}`;
}

export function vehicleCard(vehicle, large = false) {
  return `
  <article class="vehicle-card ${large ? 'vehicle-card--large' : ''}">
    <a class="vehicle-card__media" href="/vehicle.html?id=${vehicle.id}" aria-label="Ver ${vehicle.brand} ${vehicle.model}">
      <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}" loading="lazy" />
      <span class="vehicle-card__status">Disponible</span>
    </a>
    <div class="vehicle-card__body">
      <div class="vehicle-card__eyebrow">${vehicle.brand} · ${vehicle.year}</div>
      <h3><a href="/vehicle.html?id=${vehicle.id}">${vehicle.model}</a></h3>
      <div class="vehicle-card__meta">
        <span>${formatKm(vehicle.km)}</span><span>${vehicle.hp} CV</span><span>${vehicle.fuel}</span>
      </div>
      <div class="vehicle-card__footer">
        <strong>${formatPrice(vehicle.price)}</strong>
        <a href="/vehicle.html?id=${vehicle.id}">Ver detalles ${arrow}</a>
      </div>
    </div>
  </article>`;
}

export function trustRail() {
  return `<section class="trust-rail" aria-label="Garantías Puerto Motor">
    <div><strong>100</strong><span>puntos de revisión</span></div>
    <div><strong>Km</strong><span>certificados</span></div>
    <div><strong>12</strong><span>meses de garantía</span></div>
    <div><strong>ES</strong><span>entrega en toda España</span></div>
  </section>`;
}

export function footer() {
  return `
    <footer class="footer" id="contacto">
      <div class="footer__brand">
        <div class="wordmark wordmark--light">PUERTO MOTOR</div>
        <p>Calle Estuario, 14<br>11500 El Puerto de Santa María, Cádiz</p>
      </div>
      <div><a href="tel:+34956856488">956 856 488</a><a href="mailto:ventas4@puertomotor.es">ventas4@puertomotor.es</a><p>Atención directa del equipo de Puerto Motor.</p></div>
      <div><a href="/stock.html">Stock</a><a href="/#vende">Vende tu coche</a><a href="/#servicios">Servicios</a><a href="/#puerto-motor">Puerto Motor</a></div>
      <div><a href="/#contacto">Contacto</a><a href="https://puertomotor.es/aviso-legal/">Aviso legal</a><a href="https://puertomotor.es/politica-de-privacidad/">Privacidad</a><a href="https://www.instagram.com/puertomotor/">Instagram</a></div>
    </footer>`;
}

export function setupShell() {
  const button = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  button?.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });
  const header = document.querySelector('[data-header]');
  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
}
