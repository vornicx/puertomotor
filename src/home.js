import { vehicles, featuredVehicles, brands, bodies, formatPrice, formatKm } from './data.js';
import { header, footer, setupShell, buttonLabel } from './components.js';

const app = document.querySelector('#app');
const homeHero = featuredVehicles[0] || vehicles[0];
const [leadVehicle, secondVehicle, thirdVehicle] = [featuredVehicles[1], featuredVehicles[2], featuredVehicles[0]].map((vehicle, index) => vehicle || vehicles[index]);

function vehicleMeta(vehicle) {
  return `${vehicle.year} · ${formatKm(vehicle.km)} · ${vehicle.hp} CV`;
}

function editorialVehicle(vehicle, className = '') {
  return `
    <article class="home-vehicle ${className}">
      <a class="home-vehicle__media" href="/vehicle.html?id=${vehicle.id}" aria-label="Ver ${vehicle.brand} ${vehicle.model}">
        <img src="${vehicle.hero}" alt="${vehicle.brand} ${vehicle.model}" loading="lazy" style="object-position:${vehicle.heroPosition || '50% 50%'}">
      </a>
      <div class="home-vehicle__info">
        <div>
          <span class="home-vehicle__brand">${vehicle.brand}</span>
          <h3><a href="/vehicle.html?id=${vehicle.id}">${vehicle.model}</a></h3>
          <p>${vehicleMeta(vehicle)}</p>
        </div>
        <div class="home-vehicle__price">
          <strong>${formatPrice(vehicle.price)}</strong>
          <a class="text-link" href="/vehicle.html?id=${vehicle.id}">${buttonLabel('Ver unidad')}</a>
        </div>
      </div>
    </article>`;
}

app.innerHTML = `
  ${header()}
  <main class="home-page">
    <section class="hero home-hero">
      <div class="hero__image" aria-hidden="true" style="background-image:url('${homeHero.hero}');background-position:${homeHero.heroPosition || '50% 50%'}"></div>
      <div class="hero__content">
        <h1>Automóviles<br>extraordinarios.</h1>
        <p>Selección de vehículos premium y deportivos con historial claro, kilometraje certificado y atención directa de Puerto Motor.</p>
        <div class="hero__actions">
          <a class="button button--light" href="/stock.html">${buttonLabel('Ver stock')}</a>
          <a class="button" href="#vende">${buttonLabel('Vender mi coche')}</a>
        </div>
      </div>
      <a class="hero__caption hero__caption--link" href="/vehicle.html?id=${homeHero.id}" aria-label="Ver ${homeHero.brand} ${homeHero.model}">
        <span>${homeHero.brand} ${homeHero.model}</span>
        <span>${homeHero.year} · ${homeHero.hp} CV · ${formatPrice(homeHero.price)}</span>
      </a>
    </section>

    <section class="home-selection" id="stock-destacado">
      <header class="home-selection__head">
        <div>
          <span class="home-index">01</span>
          <h2>Disponibles ahora.</h2>
        </div>
        <div class="home-selection__intro">
          <p>Una selección corta de unidades que representan el tipo de automóvil que buscamos: configuración, estado y procedencia por delante del volumen.</p>
          <a class="text-link" href="/stock.html">${buttonLabel('Explorar todo el stock')}</a>
        </div>
      </header>

      ${editorialVehicle(leadVehicle, 'home-vehicle--lead')}

      <div class="home-selection__pair">
        ${editorialVehicle(secondVehicle, 'home-vehicle--secondary')}
        ${editorialVehicle(thirdVehicle, 'home-vehicle--secondary home-vehicle--offset')}
      </div>
    </section>

    <section class="stock-entry" aria-label="Buscar vehículos en stock">
      <div class="stock-entry__intro">
        <span class="home-index">02</span>
        <div>
          <h2>Busca por coche.<br>No por ruido.</h2>
          <p>Filtra el stock por lo esencial y entra directamente en cada unidad con fotografías reales, precio y datos claros.</p>
        </div>
      </div>
      <form class="stock-entry__form" data-search-form>
        <label><span>Marca</span><select name="brand"><option value="">Todas</option>${brands.map(x=>`<option>${x}</option>`).join('')}</select></label>
        <label><span>Carrocería</span><select name="body"><option value="">Todas</option>${bodies.map(x=>`<option>${x}</option>`).join('')}</select></label>
        <label><span>Precio máximo</span><select name="price"><option value="">Sin límite</option><option value="60000">60.000 €</option><option value="150000">150.000 €</option><option value="300000">300.000 €</option><option value="650000">650.000 €</option></select></label>
        <button class="stock-entry__submit" type="submit">Ver resultados <span aria-hidden="true">→</span></button>
      </form>
    </section>

    <section class="home-place" id="puerto-motor">
      <figure class="home-place__media">
        <img src="https://puertomotor.es/wp-content/uploads/2023/12/DSC07353-Grande.jpg" alt="Instalaciones de Puerto Motor en El Puerto de Santa María" loading="lazy">
        <figcaption>El Puerto de Santa María · Cádiz</figcaption>
      </figure>
      <div class="home-place__copy" id="servicios">
        <span class="home-index">03</span>
        <div class="section-kicker">Puerto Motor</div>
        <h2>El coche importa.<br>Cómo se vende, también.</h2>
        <p>Más de diez años comprando y vendiendo automóviles. Cada unidad se revisa antes de la entrega y se presenta con información clara sobre kilometraje, mantenimiento y estado.</p>
        <div class="home-place__facts">
          <div><strong>100</strong><span>puntos de revisión</span></div>
          <div><strong>Km</strong><span>certificados</span></div>
          <div><strong>12</strong><span>meses de garantía</span></div>
        </div>
        <a class="text-link text-link--light" href="#contacto">${buttonLabel('Hablar con Puerto Motor')}</a>
      </div>
    </section>

    <section class="sell-editorial" id="vende">
      <div class="sell-editorial__intro">
        <span class="home-index">04</span>
        <div>
          <div class="section-kicker">Vende tu coche</div>
          <h2>Una valoración seria.<br>Sin convertirlo en un formulario eterno.</h2>
        </div>
      </div>
      <div class="sell-editorial__body">
        <p>Cuéntanos qué coche tienes, kilometraje y estado. El equipo revisa la información y continúa contigo de forma directa.</p>
        <a class="button button--dark" href="https://wa.me/34605932417?text=${encodeURIComponent('Hola, quiero valorar mi coche para venderlo a Puerto Motor')}">${buttonLabel('Solicitar valoración')}</a>
        <div class="sell-editorial__steps">
          <div><span>01</span><strong>Datos del coche</strong><p>Modelo, año, kilómetros y estado.</p></div>
          <div><span>02</span><strong>Revisión</strong><p>Valoramos la unidad y su historial.</p></div>
          <div><span>03</span><strong>Oferta</strong><p>Recibes una propuesta y seguimos contigo directamente.</p></div>
        </div>
      </div>
    </section>
  </main>
  ${footer()}`;
setupShell();

document.querySelector('[data-search-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const params = new URLSearchParams();
  for (const [key, value] of data.entries()) if (value) params.set(key, value);
  window.location.href = `/stock.html${params.size ? `?${params.toString()}` : ''}`;
});
