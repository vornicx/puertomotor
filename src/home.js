import { vehicles } from './data.js';
import { header, vehicleCard, footer, setupShell } from './components.js';

const app = document.querySelector('#app');
app.innerHTML = `
  ${header()}
  <main>
    <section class="hero">
      <div class="hero__image" aria-hidden="true"></div>
      <div class="hero__content">
        <h1>Automóviles extraordinarios.</h1>
        <p>Una selección curada de vehículos premium y deportivos, elegidos con criterio y preparados para disfrutarlos.</p>
        <div class="hero__actions">
          <a class="button button--light" href="/stock.html">Ver stock <span>→</span></a>
          <a class="button" href="#vende">Vender mi coche <span>→</span></a>
        </div>
      </div>
    </section>
    <form class="search-band" data-search-form>
      <div class="search-field"><label>Marca</label><select name="brand"><option value="">Cualquiera</option>${[...new Set(vehicles.map(v=>v.brand))].map(x=>`<option>${x}</option>`).join('')}</select></div>
      <div class="search-field"><label>Modelo</label><select name="model"><option value="">Cualquiera</option>${vehicles.map(v=>`<option>${v.model}</option>`).join('')}</select></div>
      <div class="search-field"><label>Precio</label><select name="price"><option value="">Precio máximo</option><option value="150000">150.000 €</option><option value="300000">300.000 €</option><option value="650000">650.000 €</option></select></div>
      <div class="search-field"><label>Carrocería / combustible</label><select name="type"><option value="">Cualquiera</option><option>Coupé</option><option>SUV</option><option>Gasolina</option></select></div>
      <button class="button button--light search-submit" type="submit">Buscar stock <span>→</span></button>
    </form>

    <section class="section" id="servicios">
      <div class="section-head">
        <div><div class="section-kicker">Selección destacada</div><h2 class="section-title">Coches que no necesitan presentación.</h2></div>
        <a class="text-link" href="/stock.html">Ver todo el stock <span>→</span></a>
      </div>
      <div class="vehicle-grid">${vehicles.map(v=>vehicleCard(v,true)).join('')}</div>
    </section>

    <section class="editorial" id="puerto-motor">
      <div class="editorial__inner">
        <div class="editorial__copy">
          <div class="section-kicker">Puerto Motor</div>
          <h2>El coche importa.<br>Cómo lo compras, también.</h2>
          <p>Cada unidad pasa por un proceso de selección, inspección y preparación. Información clara, kilometraje certificado y atención directa antes, durante y después de la compra.</p>
          <a class="text-link" href="https://puertomotor.es/instalaciones/">Conoce Puerto Motor <span>→</span></a>
        </div>
        <div class="editorial__gallery">
          <figure><img src="https://puertomotor.es/wp-content/uploads/2026/08/PORSCHE-992-NEGRO-49-KMS-1.jpg" alt="Porsche 911 seleccionado por Puerto Motor"></figure>
          <figure><img src="https://puertomotor.es/wp-content/uploads/2026/08/ferrari_purosangre_23-kms-1.jpg" alt="Ferrari Purosangue seleccionado por Puerto Motor"></figure>
          <figure><img src="https://puertomotor.es/wp-content/uploads/2026/08/lamborrghini_revuelto_70kms-1.jpg" alt="Lamborghini Revuelto seleccionado por Puerto Motor"></figure>
        </div>
      </div>
    </section>

    <section class="section" id="vende">
      <div class="process">
        <div class="process__intro"><div class="section-kicker">Vende tu coche</div><h2 class="section-title">Un proceso claro, rápido y seguro.</h2></div>
        ${[
          ['01','Valoración','Cuéntanos sobre tu coche y recibe una valoración inicial.'],
          ['02','Inspección','Revisamos el estado real del vehículo para ajustar la oferta.'],
          ['03','Oferta','Te presentamos una propuesta de compra transparente.'],
          ['04','Recogida / venta','Nos encargamos de la gestión y el pago.']
        ].map(([n,t,p])=>`<div class="process__step"><div class="process__num">${n}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}
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
