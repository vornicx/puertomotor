import { vehicles, brands, bodies, fuels, formatPrice, formatKm } from './data.js';
import { header, footer, setupShell } from './components.js';

const params = new URLSearchParams(location.search);
const app = document.querySelector('#app');

const sortOptions = [
  ['featured', 'Recomendado'],
  ['price-asc', 'Precio ↑'],
  ['price-desc', 'Precio ↓'],
  ['km-asc', 'Menos km'],
  ['year-desc', 'Más recientes']
];

function option(value, current, label = value) {
  return `<option value="${value}" ${current === value ? 'selected' : ''}>${label}</option>`;
}

function tile(vehicle) {
  const secondary = vehicle.gallery?.[1];
  return `
    <article class="stock-tile">
      <a class="stock-tile__media" href="/vehicle.html?id=${vehicle.id}" aria-label="Ver ${vehicle.brand} ${vehicle.model}">
        <img class="stock-tile__image stock-tile__image--primary" src="${vehicle.hero}" alt="${vehicle.brand} ${vehicle.model}" loading="lazy" style="object-position:${vehicle.heroPosition || '50% 50%'}">
        ${secondary ? `<img class="stock-tile__image stock-tile__image--secondary" src="${secondary}" alt="" loading="lazy" aria-hidden="true">` : ''}
        <span class="stock-tile__status">Disponible</span>
      </a>
      <div class="stock-tile__info">
        <div class="stock-tile__topline"><span>${vehicle.brand}</span><span>${vehicle.year}</span></div>
        <div class="stock-tile__headline">
          <h2><a href="/vehicle.html?id=${vehicle.id}">${vehicle.model}</a></h2>
          <strong>${formatPrice(vehicle.price)}</strong>
        </div>
        <div class="stock-tile__meta"><span>${formatKm(vehicle.km)}</span><span>${vehicle.hp} CV</span><span>${vehicle.fuel}</span></div>
      </div>
    </article>`;
}

app.innerHTML = `
${header('stock')}
<main class="stock-page stock-page--gallery">
  <section class="stock-heading">
    <div class="stock-heading__eyebrow">Stock</div>
    <div class="stock-heading__row">
      <h1>Unidades disponibles.</h1>
      <div class="stock-heading__count"><strong>${vehicles.length}</strong><span>vehículos</span></div>
    </div>
  </section>

  <section class="stock-bar" aria-label="Controles de stock">
    <div class="stock-bar__inner">
      <div class="stock-brands" role="group" aria-label="Filtrar por marca">
        <button type="button" data-brand="" class="${params.get('brand') ? '' : 'is-active'}">Todos</button>
        ${brands.map(brand => `<button type="button" data-brand="${brand}" class="${params.get('brand') === brand ? 'is-active' : ''}">${brand}</button>`).join('')}
      </div>
      <div class="stock-bar__actions">
        <button type="button" class="stock-filter-button" data-filter-open>Filtros <span data-filter-count></span></button>
        <label class="stock-sort"><span>Orden</span><select data-sort>${sortOptions.map(([value,label]) => option(value, params.get('sort') || 'featured', label)).join('')}</select></label>
      </div>
    </div>
  </section>

  <section class="stock-gallery">
    <div class="stock-gallery__meta"><span data-result-count></span><button type="button" data-clear class="stock-clear">Limpiar</button></div>
    <div class="stock-gallery__grid" data-grid></div>
  </section>

  <div class="stock-filter-layer" data-filter-layer aria-hidden="true">
    <button class="stock-filter-layer__backdrop" type="button" data-filter-close aria-label="Cerrar filtros"></button>
    <aside class="stock-filter-panel" role="dialog" aria-modal="true" aria-labelledby="stock-filter-title">
      <header class="stock-filter-panel__head"><h2 id="stock-filter-title">Filtros</h2><button type="button" data-filter-close aria-label="Cerrar">×</button></header>
      <form class="stock-filter-panel__form" data-filter-form>
        <label><span>Marca</span><select name="brand"><option value="">Todas</option>${brands.map(brand => option(brand, params.get('brand'))).join('')}</select></label>
        <label><span>Carrocería</span><select name="body"><option value="">Todas</option>${bodies.map(body => option(body, params.get('body'))).join('')}</select></label>
        <label><span>Combustible</span><select name="fuel"><option value="">Todos</option>${fuels.map(fuel => option(fuel, params.get('fuel'))).join('')}</select></label>
        <label><span>Precio máximo</span><select name="price"><option value="">Sin límite</option>${option('60000',params.get('price'),'60.000 €')}${option('150000',params.get('price'),'150.000 €')}${option('300000',params.get('price'),'300.000 €')}${option('650000',params.get('price'),'650.000 €')}</select></label>
        <div class="stock-filter-panel__actions"><button type="button" data-filter-reset>Limpiar</button><button type="submit">Aplicar</button></div>
      </form>
    </aside>
  </div>
</main>
${footer()}`;

setupShell();

const grid = document.querySelector('[data-grid]');
const resultCount = document.querySelector('[data-result-count]');
const clearButton = document.querySelector('[data-clear]');
const filterLayer = document.querySelector('[data-filter-layer]');
const filterForm = document.querySelector('[data-filter-form]');
const sortSelect = document.querySelector('[data-sort]');
const filterCount = document.querySelector('[data-filter-count]');
const brandButtons = [...document.querySelectorAll('[data-brand]')];

function state() {
  const fd = new FormData(filterForm);
  return {
    brand: String(fd.get('brand') || ''),
    body: String(fd.get('body') || ''),
    fuel: String(fd.get('fuel') || ''),
    price: String(fd.get('price') || ''),
    sort: sortSelect.value || 'featured'
  };
}

function syncUrl(current) {
  const next = new URLSearchParams();
  for (const key of ['brand','body','fuel','price']) if (current[key]) next.set(key, current[key]);
  if (current.sort && current.sort !== 'featured') next.set('sort', current.sort);
  const query = next.toString();
  history.replaceState({}, '', `/stock.html${query ? `?${query}` : ''}`);
}

function render() {
  const current = state();
  const maxPrice = Number(current.price || Infinity);
  let filtered = vehicles.filter(vehicle =>
    (!current.brand || vehicle.brand === current.brand) &&
    (!current.body || vehicle.body === current.body) &&
    (!current.fuel || vehicle.fuel === current.fuel) &&
    vehicle.price <= maxPrice
  );

  filtered = [...filtered].sort((a,b) => {
    if (current.sort === 'price-asc') return a.price - b.price;
    if (current.sort === 'price-desc') return b.price - a.price;
    if (current.sort === 'km-asc') return a.km - b.km;
    if (current.sort === 'year-desc') return b.year - a.year;
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });

  const activeCount = [current.brand,current.body,current.fuel,current.price].filter(Boolean).length;
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'vehículo' : 'vehículos'}`;
  filterCount.textContent = activeCount ? `(${activeCount})` : '';
  clearButton.hidden = activeCount === 0 && current.sort === 'featured';
  brandButtons.forEach(button => button.classList.toggle('is-active', button.dataset.brand === current.brand));
  grid.innerHTML = filtered.length ? filtered.map(tile).join('') : `<div class="stock-gallery__empty"><strong>Sin resultados.</strong><button type="button" data-empty-clear>Quitar filtros</button></div>`;
  document.querySelector('[data-empty-clear]')?.addEventListener('click', resetAll);
  syncUrl(current);
}

function openFilters() {
  filterLayer.classList.add('is-open');
  filterLayer.setAttribute('aria-hidden','false');
  document.body.classList.add('stock-filter-open');
}
function closeFilters() {
  filterLayer.classList.remove('is-open');
  filterLayer.setAttribute('aria-hidden','true');
  document.body.classList.remove('stock-filter-open');
}
function resetAll() {
  filterForm.reset();
  sortSelect.value = 'featured';
  render();
}

brandButtons.forEach(button => button.addEventListener('click', () => {
  filterForm.elements.brand.value = button.dataset.brand;
  render();
}));
document.querySelector('[data-filter-open]').addEventListener('click', openFilters);
document.querySelectorAll('[data-filter-close]').forEach(button => button.addEventListener('click', closeFilters));
document.querySelector('[data-filter-reset]').addEventListener('click', () => { filterForm.reset(); render(); });
filterForm.addEventListener('submit', event => { event.preventDefault(); render(); closeFilters(); });
sortSelect.addEventListener('change', render);
clearButton.addEventListener('click', resetAll);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeFilters(); });
render();
