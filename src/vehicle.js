import { vehicles, formatPrice, formatKm } from './data.js';
import { header, footer, setupShell, vehicleCard, trustRail, buttonLabel } from './components.js';

const id = new URLSearchParams(location.search).get('id') || vehicles[0].id;
const vehicle = vehicles.find(v=>v.id===id) || vehicles[0];
const related = vehicles.filter(v=>v.id!==vehicle.id && (v.brand===vehicle.brand || v.body===vehicle.body)).slice(0,3);
const gallery = vehicle.gallery?.length ? vehicle.gallery : [vehicle.hero];
const galleryPositions = vehicle.galleryPositions?.length ? vehicle.galleryPositions : gallery.map(()=>vehicle.heroPosition || '50% 50%');
const app = document.querySelector('#app');

document.title = `${vehicle.brand} ${vehicle.model} — Puerto Motor`;
document.querySelector('meta[name="description"]')?.setAttribute('content', `${vehicle.brand} ${vehicle.model}, ${vehicle.year}, ${formatKm(vehicle.km)}, ${vehicle.hp} CV. Consulta fotografías, equipamiento, garantía y contacto con Puerto Motor.`);
document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${vehicle.brand} ${vehicle.model} — Puerto Motor`);
document.querySelector('meta[property="og:description"]')?.setAttribute('content', `${formatPrice(vehicle.price)} · ${formatKm(vehicle.km)} · ${vehicle.hp} CV · ${vehicle.warranty} de garantía.`);

app.innerHTML = `${header('stock')}<main>
  <section class="detail">
    <a class="detail__back" href="/stock.html">← Volver al stock</a>
    <div class="detail__grid">
      <div class="detail__gallery" data-gallery>
        <div class="detail__gallery-label"><span>Fotografía real</span><span>Puerto Motor</span></div>
        <figure class="detail__image">
          <img src="${gallery[0]}" alt="${vehicle.brand} ${vehicle.model}" data-main-image style="object-position:${galleryPositions[0]}">
          ${gallery.length > 1 ? `
            <button class="detail__nav detail__nav--prev" type="button" data-gallery-prev aria-label="Imagen anterior">←</button>
            <button class="detail__nav detail__nav--next" type="button" data-gallery-next aria-label="Imagen siguiente">→</button>
            <span class="detail__counter" data-gallery-counter>01 / ${String(gallery.length).padStart(2,'0')}</span>
          ` : ''}
        </figure>
        ${gallery.length > 1 ? `<div class="detail__thumbs">${gallery.map((image,index)=>`<button type="button" class="detail__thumb ${index===0?'is-active':''}" data-image="${image}" data-index="${index}" data-position="${galleryPositions[index] || '50% 50%'}" aria-label="Ver imagen ${index+1}"><img src="${image}" alt="" loading="lazy" style="object-position:${galleryPositions[index] || '50% 50%'}"></button>`).join('')}</div>` : ''}
      </div>
      <aside class="detail__panel">
        <div class="detail__availability"><span></span> Disponible</div>
        <div class="detail__brand">${vehicle.brand}</div>
        <h1>${vehicle.model}</h1>
        <div class="detail__price">${formatPrice(vehicle.price)}</div>
        <p class="detail__summary">${vehicle.summary}</p>
        <div class="detail__specs">
          <div class="spec"><label>Año</label>${vehicle.year}</div><div class="spec"><label>Kilómetros</label>${formatKm(vehicle.km)}</div>
          <div class="spec"><label>Potencia</label>${vehicle.hp} CV</div><div class="spec"><label>Cambio</label>${vehicle.transmission}</div>
          <div class="spec"><label>Combustible</label>${vehicle.fuel}</div><div class="spec"><label>Garantía</label>${vehicle.warranty}</div>
        </div>
        <div class="detail__actions">
          <a class="button button--dark" href="https://wa.me/34605932417?text=${encodeURIComponent(`Hola, quiero información sobre el ${vehicle.brand} ${vehicle.model}`)}">${buttonLabel('WhatsApp')}</a>
          <a class="button button--outline" href="tel:+34956856488">${buttonLabel('Llamar a ventas')}</a>
        </div>
        <a class="detail__source" href="${vehicle.source}" target="_blank" rel="noreferrer">Ver anuncio original en Puerto Motor ↗</a>
      </aside>
    </div>
  </section>

  <section class="vehicle-story">
    <div class="vehicle-story__intro"><div class="section-kicker">Equipamiento destacado</div><h2>Lo esencial, sin ruido.</h2></div>
    <div class="vehicle-story__list">${vehicle.highlights.map(item=>`<div>${item}</div>`).join('')}</div>
  </section>

  ${trustRail()}

  ${related.length ? `<section class="section related"><div class="section-head"><div><div class="section-kicker">También puede interesarte</div><h2 class="section-title">Más selección Puerto Motor.</h2></div></div><div class="vehicle-grid">${related.map(v=>vehicleCard(v)).join('')}</div></section>` : ''}
</main>${footer()}`;
setupShell();

let currentIndex = 0;
const main = document.querySelector('[data-main-image]');
const counter = document.querySelector('[data-gallery-counter]');
const thumbButtons = [...document.querySelectorAll('[data-image]')];

function showImage(index) {
  if (!main || !gallery.length) return;
  currentIndex = (index + gallery.length) % gallery.length;
  const nextSrc = gallery[currentIndex];
  const nextPosition = galleryPositions[currentIndex] || '50% 50%';
  main.style.opacity = '0';
  window.setTimeout(() => {
    main.src = nextSrc;
    main.style.objectPosition = nextPosition;
    main.style.opacity = '1';
  }, 120);
  if (counter) counter.textContent = `${String(currentIndex + 1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')}`;
  thumbButtons.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === currentIndex));
  thumbButtons[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}

thumbButtons.forEach((button) => button.addEventListener('click', () => showImage(Number(button.dataset.index))));
document.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showImage(currentIndex - 1));
document.querySelector('[data-gallery-next]')?.addEventListener('click', () => showImage(currentIndex + 1));
main?.addEventListener('click', () => gallery.length > 1 && showImage(currentIndex + 1));

document.addEventListener('keydown', (event) => {
  if (gallery.length < 2) return;
  if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});
