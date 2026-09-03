import { vehicles, formatPrice, formatKm } from './data.js';
import { header, footer, setupShell } from './components.js';
const id = new URLSearchParams(location.search).get('id') || vehicles[0].id;
const vehicle = vehicles.find(v=>v.id===id) || vehicles[0];
const app = document.querySelector('#app');
app.innerHTML = `${header('stock')}<main class="detail">
  <a class="detail__back" href="/stock.html">← Volver al stock</a>
  <div class="detail__grid">
    <div class="detail__image"><img src="${vehicle.hero}" alt="${vehicle.brand} ${vehicle.model}"></div>
    <aside class="detail__panel">
      <div class="detail__brand">${vehicle.brand}</div><h1>${vehicle.model}</h1><div class="detail__price">${formatPrice(vehicle.price)}</div>
      <p class="detail__summary">${vehicle.summary}</p>
      <div class="detail__specs">
        <div class="spec"><label>Año</label>${vehicle.year}</div><div class="spec"><label>Kilómetros</label>${formatKm(vehicle.km)}</div>
        <div class="spec"><label>Potencia</label>${vehicle.hp} CV</div><div class="spec"><label>Cambio</label>${vehicle.transmission}</div>
        <div class="spec"><label>Combustible</label>${vehicle.fuel}</div><div class="spec"><label>Garantía</label>${vehicle.warranty}</div>
      </div>
      <div class="detail__actions"><a class="button button--dark" href="tel:+34956856488">Hablar con ventas <span>→</span></a><a class="button button--dark" href="mailto:ventas4@puertomotor.es?subject=Consulta ${encodeURIComponent(vehicle.brand+' '+vehicle.model)}">Solicitar información <span>→</span></a></div>
    </aside>
  </div>
</main>${footer()}`;
setupShell();
