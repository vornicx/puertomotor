import { vehicles } from './data.js';
import { header, vehicleCard, footer, setupShell } from './components.js';

const params = new URLSearchParams(location.search);
const app = document.querySelector('#app');
app.innerHTML = `
${header('stock')}
<main>
  <section class="page-hero"><div class="section-kicker">Stock</div><h1>Encuentra el coche<br>que estás buscando.</h1><p>Un catálogo corto, bien explicado y sin ruido. Filtra por lo que realmente importa.</p></section>
  <form class="stock-toolbar" data-toolbar>
    <select name="brand"><option value="">Todas las marcas</option>${[...new Set(vehicles.map(v=>v.brand))].map(x=>`<option ${params.get('brand')===x?'selected':''}>${x}</option>`).join('')}</select>
    <select name="body"><option value="">Todas las carrocerías</option><option ${params.get('type')==='Coupé'?'selected':''}>Coupé</option><option ${params.get('type')==='SUV'?'selected':''}>SUV</option></select>
    <select name="fuel"><option value="">Todos los combustibles</option><option>Gasolina</option><option>Híbrido enchufable / Gasolina</option></select>
    <select name="price"><option value="">Cualquier precio</option><option value="150000" ${params.get('price')==='150000'?'selected':''}>Hasta 150.000 €</option><option value="300000" ${params.get('price')==='300000'?'selected':''}>Hasta 300.000 €</option><option value="650000" ${params.get('price')==='650000'?'selected':''}>Hasta 650.000 €</option></select>
    <button type="button" class="button button--dark" data-clear>Limpiar</button>
  </form>
  <section class="stock-results"><div class="results-count" data-count></div><div class="vehicle-grid" data-grid></div></section>
</main>${footer()}`;
setupShell();

const form = document.querySelector('[data-toolbar]');
const grid = document.querySelector('[data-grid]');
const count = document.querySelector('[data-count]');
function render() {
  const fd = new FormData(form);
  const brand=fd.get('brand'), body=fd.get('body'), fuel=fd.get('fuel'), price=Number(fd.get('price')||Infinity);
  const filtered = vehicles.filter(v => (!brand || v.brand===brand) && (!body || v.body===body) && (!fuel || v.fuel===fuel) && v.price<=price);
  count.textContent = `${filtered.length} ${filtered.length===1?'vehículo':'vehículos'}`;
  grid.innerHTML = filtered.length ? filtered.map(v=>vehicleCard(v)).join('') : '<p>No hay vehículos que coincidan con estos filtros.</p>';
}
form.addEventListener('change', render);
document.querySelector('[data-clear]').addEventListener('click', ()=>{ form.reset(); render(); history.replaceState({},'', '/stock.html'); });
render();
