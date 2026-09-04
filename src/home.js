import { vehicles, featuredVehicles, brands, bodies } from './data.js';
import { header, vehicleCard, footer, setupShell, trustRail, buttonLabel } from './components.js';

const app = document.querySelector('#app');
app.innerHTML = `
  ${header()}
  <main>
    <section class="hero">
      <div class="hero__image" aria-hidden="true"></div>
      <div class="hero__content">
        <h1>Automóviles<br>extraordinarios.</h1>
        <p>Selección de vehículos premium y deportivos con historial claro, kilometraje certificado y una atención a la altura del coche.</p>
        <div class="hero__actions">
          <a class="button button--light" href="/stock.html">${buttonLabel('Ver stock')}</a>
          <a class="button" href="#vende">${buttonLabel('Vender mi coche')}</a>
        </div>
      </div>
      <div class="hero__caption" aria-label="Vehículo mostrado">
        <span>Porsche 911 Carrera 4S</span>
        <span>2020 · 450 CV</span>
      </div>
    </section>

    <form class="search-band" data-search-form>
      <div class="search-field"><label>Marca</label><select name="brand"><option value="">Cualquiera</option>${brands.map(x=>`<option>${x}</option>`).join('')}</select></div>
      <div class="search-field"><label>Modelo</label><select name="model"><option value="">Cualquiera</option>${vehicles.map(v=>`<option value="${v.id}">${v.model}</option>`).join('')}</select></div>
      <div class="search-field"><label>Precio</label><select name="price"><option value="">Precio máximo</option><option value="60000">60.000 €</option><option value="150000">150.000 €</option><option value="300000">300.000 €</option><option value="650000">650.000 €</option></select></div>
      <div class="search-field"><label>Carrocería</label><select name="body"><option value="">Cualquiera</option>${bodies.map(x=>`<option>${x}</option>`).join('')}</select></div>
      <button class="button button--light search-submit" type="submit">${buttonLabel('Buscar stock')}</button>
    </form>

    <section class="section featured-section" id="stock-destacado">
      <div class="section-head">
        <div><div class="section-kicker">Selección destacada</div><h2 class="section-title">Coches que no necesitan presentación.</h2></div>
        <a class="text-link" href="/stock.html">${buttonLabel('Ver todo el stock')}</a>
      </div>
      <div class="vehicle-grid vehicle-grid--featured">${featuredVehicles.map(v=>vehicleCard(v,true)).join('')}</div>
    </section>

    <section class="editorial" id="puerto-motor">
      <div class="editorial__inner">
        <div class="editorial__copy">
          <div class="section-kicker">Puerto Motor</div>
          <h2>Criterio para elegir.<br>Transparencia para comprar.</h2>
          <p>Más de diez años comprando y vendiendo automóviles. Cada unidad se selecciona, se revisa y se entrega con información clara sobre kilometraje, mantenimiento y estado.</p>
          <a class="text-link text-link--light" href="https://puertomotor.es/instalaciones/">${buttonLabel('Conoce Puerto Motor')}</a>
        </div>
        <div class="editorial__media">
          <figure class="editorial__media-main">
            <img src="https://puertomotor.es/wp-content/uploads/2023/12/DSC07353-Grande-672x568.jpg" alt="Instalaciones de Puerto Motor" loading="lazy">
            <figcaption>El Puerto de Santa María · Cádiz</figcaption>
          </figure>
          <div class="editorial__media-side">
            <figure>
              <img src="https://puertomotor.es/wp-content/uploads/2023/12/instalaciones01-672x568.jpg" alt="Showroom de Puerto Motor" loading="lazy">
              <figcaption>Showroom Puerto Motor</figcaption>
            </figure>
            <figure>
              <img src="https://puertomotor.es/wp-content/uploads/2023/12/DSC01421-min-1024x683-1.jpg" alt="Equipo de Puerto Motor" loading="lazy">
              <figcaption>Equipo Puerto Motor</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    ${trustRail()}

    <section class="section" id="vende">
      <div class="process">
        <div class="process__intro"><div class="section-kicker">Vende tu coche</div><h2 class="section-title">Un proceso claro, rápido y seguro.</h2></div>
        ${[
          ['01','Valoración','Cuéntanos sobre tu coche y recibe una primera valoración.'],
          ['02','Inspección','Revisamos el estado real del vehículo y su historial.'],
          ['03','Oferta','Te presentamos una propuesta de compra transparente.'],
          ['04','Recogida / venta','Nos encargamos de la gestión para que el proceso sea sencillo.']
        ].map(([n,t,p])=>`<div class="process__step"><div class="process__num">${n}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}
      </div>
    </section>
  </main>
  ${footer()}`;
setupShell();

document.querySelector('[data-search-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const selectedModel = data.get('model');
  if (selectedModel) {
    window.location.href = `/vehicle.html?id=${encodeURIComponent(selectedModel)}`;
    return;
  }
  const params = new URLSearchParams();
  for (const [key, value] of data.entries()) if (value) params.set(key, value);
  window.location.href = `/stock.html${params.size ? `?${params.toString()}` : ''}`;
});
