import { vehicles, brands, bodies, fuels, formatPrice, formatKm } from './data.js';
import { header, footer, setupShell, buttonLabel } from './components.js';

const params = new URLSearchParams(location.search);
const app = document.querySelector('#app');

function selectOption(value, current, label = value) {
  return `<option value="${value}" ${current === value ? 'selected' : ''}>${label}</option>`;
}

function stockItem(vehicle, index) {
  const lead = index === 0;
  return `
    <article class="stock-item ${lead ? 'stock-item--lead' : ''}">
      <a class="stock-item__media" href="/vehicle.html?id=${vehicle.id}" aria-label="Ver ${vehicle.brand} ${vehicle.model}">
        <img src="${vehicle.hero}" alt="${vehicle.brand} ${vehicle.model}" ${lead ? 'fetchpriority="high"' : 'loading="lazy"'} style="object-position:${vehicle.heroPosition || '50% 50%'}">
        <span class="stock-item__status">Disponible</span>
      </a>
      <div class="stock-item__info">
        <div class="stock-item__identity">
          <div class="stock-item__eyebrow">${vehicle.brand} · ${vehicle.year}</div>
          <h2><a href="/vehicle.html?id=${vehicle.id}">${vehicle.model}</a></h2>
          <div class="stock-item__meta">
            <span>${formatKm(vehicle.km)}</span>
            <span>${vehicle.hp} CV</span>
            <span>${vehicle.fuel}</span>
          </div>
        </div>
        <div class="stock-item__commercial">
          <strong>${formatPrice(vehicle.price)}</strong>
          <a class="text-link" href="/vehicle.html?id=${vehicle.id}">${buttonLabel('Ver unidad')}</a>
        </div>
      </div>
    </article>`;
}

app.innerHTML = `
${header('stock')}
<main class="stock-page">
  <section class="stock-intro">
    <div>
      <div class="stock-intro__eyebrow">Stock actual</div>
      <h1>Unidades disponibles.</h1>
    </div>
    <div class="stock-intro__total"><strong>${vehicles.length}</strong><span>vehículos</span></div>
  </section>

  <div class="stock-controls-shell">
    <div class="stock-mobile-controls">
      <button type="button" data-filter-toggle aria-expanded="false">Filtros <span data-mobile-filter-count></span></button>
      <span data-mobile-result-count></span>
    </div>
    <form class="stock-controls" data-toolbar>
      <label><span>Marca</span><select name="brand"><option value="">Todas</option>${brands.map(x=>selectOption(x, params.get('brand'))).join('')}</select></label>
      <label><span>Carrocería</span><select name="body"><option value="">Todas</option>${bodies.map(x=>selectOption(x, params.get('body'))).join('')}</select></label>
      <label><span>Combustible</span><select name="fuel"><option value="">Todos</option>${fuels.map(x=>selectOption(x, params.get('fuel'))).join('')}</select></label>
      <label><span>Precio</span><select name="price"><option value="">Sin límite</option>${selectOption('60000',params.get('price'),'Hasta 60.000 €')}${selectOption('150000',params.get('price'),'Hasta 150.000 €')}${selectOption('300000',params.get('price'),'Hasta 300.000 €')}${selectOption('650000',params.get('price'),'Hasta 650.000 €')}</select></label>
      <label class="stock-controls__sort"><span>Orden</span><select name="sort">${selectOption('featured',params.get('sort') || 'featured','Recomendado')}${selectOption('price-asc',params.get('sort'),'Precio ↑')}${selectOption('price-desc',params.get('sort'),'Precio ↓')}${selectOption('km-asc',params.get('sort'),'Menos km')}${selectOption('year-desc',params.get('sort'),'Más recientes')}</select></label>
      <button type="button" class="stock-controls__clear" data-clear>Limpiar</button>
    </form>
  </div>

  <section class="stock-catalogue">
    <header class="stock-catalogue__head">
      <div class="stock-catalogue__count" data-count></div>
      <div class="stock-catalogue__filters" data-active-filters></div>
    </header>
    <div class="stock-catalogue__grid" data-grid></div>
  </section>
</main>
${footer()}`;

setupShell();

const form = document.querySelector('[data-toolbar]');
const grid = document.querySelector('[data-grid]');
const count = document.querySelector('[data-count]');
const activeFilters = document.querySelector('[data-active-filters]');
const clearButton = document.querySelector('[data-clear]');
const filterToggle = document.querySelector('[data-filter-toggle]');
const mobileFilterCount = document.querySelector('[data-mobile-filter-count]');
const mobileResultCount = document.querySelector('[data-mobile-result-count]');

function syncUrl(fd) {
  const next = new URLSearchParams();
  for (const [key, value] of fd.entries()) {
    if (!value) continue;
    if (key === 'sort' && value === 'featured') continue;
    next.set(key, value);
  }
  const query = next.toString();
  history.replaceState({}, '', `/stock.html${query ? `?${query}` : ''}`);
}

function render() {
  const fd = new FormData(form);
  const brand = fd.get('brand');
  const body = fd.get('body');
  const fuel = fd.get('fuel');
  const price = Number(fd.get('price') || Infinity);
  const sort = fd.get('sort');

  let filtered = vehicles.filter(vehicle =>
    (!brand || vehicle.brand === brand) &&
    (!body || vehicle.body === body) &&
    (!fuel || vehicle.fuel === fuel) &&
    vehicle.price <= price
  );

  filtered = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'km-asc') return a.km - b.km;
    if (sort === 'year-desc') return b.year - a.year;
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });

  const filterCount = [brand, body, fuel, fd.get('price')].filter(Boolean).length;
  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'vehículo' : 'vehículos'}`;
  activeFilters.textContent = filterCount ? `${filterCount} ${filterCount === 1 ? 'filtro activo' : 'filtros activos'}` : '';
  mobileFilterCount.textContent = filterCount ? `· ${filterCount}` : '';
  mobileResultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'vehículo' : 'vehículos'}`;
  clearButton.classList.toggle('is-hidden', filterCount === 0 && sort === 'featured');

  grid.innerHTML = filtered.length
    ? filtered.map(stockItem).join('')
    : `<div class="stock-empty"><strong>Sin resultados.</strong><button type="button" data-empty-clear>Quitar filtros</button></div>`;

  document.querySelector('[data-empty-clear]')?.addEventListener('click', clearFilters);
  syncUrl(fd);
}

function clearFilters() {
  form.reset();
  render();
}

filterToggle.addEventListener('click', () => {
  const open = filterToggle.getAttribute('aria-expanded') === 'true';
  filterToggle.setAttribute('aria-expanded', String(!open));
  form.classList.toggle('is-open', !open);
});

form.addEventListener('change', render);
clearButton.addEventListener('click', clearFilters);
render();
