import { vehicles, brands, bodies, fuels } from './data.js';
import { header, vehicleCard, footer, setupShell } from './components.js';

const params = new URLSearchParams(location.search);
const app = document.querySelector('#app');
app.innerHTML = `
${header('stock')}
<main>
  <section class="page-hero page-hero--stock">
    <div class="page-hero__count">Stock actual</div>
    <h1>Unidades disponibles.</h1>
  </section>
  <form class="stock-toolbar" data-toolbar>
    <select name="brand"><option value="">Todas las marcas</option>${brands.map(x=>`<option ${params.get('brand')===x?'selected':''}>${x}</option>`).join('')}</select>
    <select name="body"><option value="">Todas las carrocerías</option>${bodies.map(x=>`<option ${params.get('body')===x?'selected':''}>${x}</option>`).join('')}</select>
    <select name="fuel"><option value="">Todos los combustibles</option>${fuels.map(x=>`<option ${params.get('fuel')===x?'selected':''}>${x}</option>`).join('')}</select>
    <select name="price"><option value="">Cualquier precio</option><option value="60000" ${params.get('price')==='60000'?'selected':''}>Hasta 60.000 €</option><option value="150000" ${params.get('price')==='150000'?'selected':''}>Hasta 150.000 €</option><option value="300000" ${params.get('price')==='300000'?'selected':''}>Hasta 300.000 €</option><option value="650000" ${params.get('price')==='650000'?'selected':''}>Hasta 650.000 €</option></select>
    <select name="sort" aria-label="Ordenar vehículos"><option value="featured">Orden recomendado</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option><option value="km-asc">Menos kilómetros</option><option value="year-desc">Más recientes</option></select>
    <button type="button" class="toolbar-clear" data-clear>Limpiar</button>
  </form>
  <section class="stock-results">
    <div class="results-bar"><div class="results-count" data-count></div></div>
    <div class="vehicle-grid" data-grid></div>
  </section>
</main>${footer()}`;
setupShell();

const form = document.querySelector('[data-toolbar]');
const grid = document.querySelector('[data-grid]');
const count = document.querySelector('[data-count]');

function render() {
  const fd = new FormData(form);
  const brand=fd.get('brand'), body=fd.get('body'), fuel=fd.get('fuel'), price=Number(fd.get('price')||Infinity), sort=fd.get('sort');
  let filtered = vehicles.filter(v => (!brand || v.brand===brand) && (!body || v.body===body) && (!fuel || v.fuel===fuel) && v.price<=price);
  filtered = [...filtered].sort((a,b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'km-asc') return a.km - b.km;
    if (sort === 'year-desc') return b.year - a.year;
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
  count.textContent = `${filtered.length} ${filtered.length===1?'vehículo':'vehículos'}`;
  grid.innerHTML = filtered.length ? filtered.map(v=>vehicleCard(v)).join('') : '<div class="empty-state"><strong>No hay vehículos con estos filtros.</strong><span>Prueba a quitar algún filtro.</span></div>';
}

form.addEventListener('change', render);
document.querySelector('[data-clear]').addEventListener('click', ()=>{ form.reset(); render(); history.replaceState({},'', '/stock.html'); });
render();
