import { vehicles, formatPrice, formatKm } from './data.js';
import { header, footer, setupShell, vehicleCard, trustRail, buttonLabel } from './components.js';

const id = new URLSearchParams(location.search).get('id') || vehicles[0].id;
const vehicle = vehicles.find(v=>v.id===id) || vehicles[0];
const related = vehicles.filter(v=>v.id!==vehicle.id && (v.brand===vehicle.brand || v.body===vehicle.body)).slice(0,3);
const gallery = vehicle.gallery?.length ? vehicle.gallery : [vehicle.hero];
const galleryPositions = vehicle.galleryPositions?.length ? vehicle.galleryPositions : gallery.map(()=>vehicle.heroPosition || '50% 50%');
const storyImage = gallery[Math.min(3, gallery.length - 1)];
const storyImagePosition = galleryPositions[Math.min(3, galleryPositions.length - 1)] || vehicle.heroPosition || '50% 50%';
const detailImage = gallery[Math.min(4, gallery.length - 1)];
const detailImagePosition = galleryPositions[Math.min(4, galleryPositions.length - 1)] || vehicle.heroPosition || '50% 50%';
const app = document.querySelector('#app');

function ensureMeta(attribute, key, content) {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

document.title = `${vehicle.brand} ${vehicle.model} — Puerto Motor`;
document.querySelector('meta[name="description"]')?.setAttribute('content', `${vehicle.brand} ${vehicle.model}, ${vehicle.year}, ${formatKm(vehicle.km)}, ${vehicle.hp} CV. Fotografías, equipamiento, garantía y contacto con Puerto Motor.`);
ensureMeta('property', 'og:title', `${vehicle.brand} ${vehicle.model} — Puerto Motor`);
ensureMeta('property', 'og:description', `${formatPrice(vehicle.price)} · ${formatKm(vehicle.km)} · ${vehicle.hp} CV · ${vehicle.warranty} de garantía.`);
ensureMeta('property', 'og:image', vehicle.hero);
ensureMeta('property', 'og:type', 'website');
ensureMeta('name', 'twitter:card', 'summary_large_image');
ensureMeta('name', 'twitter:title', `${vehicle.brand} ${vehicle.model} — Puerto Motor`);
ensureMeta('name', 'twitter:description', `${formatPrice(vehicle.price)} · ${formatKm(vehicle.km)} · ${vehicle.hp} CV`);
ensureMeta('name', 'twitter:image', vehicle.hero);

let canonical = document.querySelector('link[rel="canonical"]');
if (!canonical) {
  canonical = document.createElement('link');
  canonical.rel = 'canonical';
  document.head.appendChild(canonical);
}
canonical.href = `${location.origin}/vehicle.html?id=${encodeURIComponent(vehicle.id)}`;

const structuredData = document.createElement('script');
structuredData.type = 'application/ld+json';
structuredData.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Vehicle',
  name: `${vehicle.brand} ${vehicle.model}`,
  description: vehicle.summary,
  image: gallery,
  url: canonical.href,
  brand: { '@type': 'Brand', name: vehicle.brand },
  model: vehicle.model,
  vehicleModelDate: String(vehicle.year),
  mileageFromOdometer: { '@type': 'QuantitativeValue', value: vehicle.km, unitCode: 'KMT' },
  fuelType: vehicle.fuel,
  vehicleTransmission: vehicle.transmission,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    price: vehicle.price,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Puerto Motor',
      telephone: '+34956856488',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Estuario, 14',
        postalCode: '11500',
        addressLocality: 'El Puerto de Santa María',
        addressRegion: 'Cádiz',
        addressCountry: 'ES'
      }
    }
  }
});
document.head.appendChild(structuredData);

const fichaMessage = encodeURIComponent(`Hola, quiero la ficha completa y más información sobre el ${vehicle.brand} ${vehicle.model}`);
const infoMessage = encodeURIComponent(`Hola, quiero información sobre el ${vehicle.brand} ${vehicle.model}`);
const detailMessage = encodeURIComponent(`Hola, quiero información detallada sobre el ${vehicle.brand} ${vehicle.model}`);

app.innerHTML = `${header('stock')}<main class="vehicle-page vehicle-page--${vehicle.id}">
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
          <a class="button button--dark" href="https://wa.me/34605932417?text=${infoMessage}">${buttonLabel('WhatsApp')}</a>
          <a class="button button--outline" href="tel:+34956856488">${buttonLabel('Llamar')}</a>
        </div>
        <a class="detail__source" href="https://wa.me/34605932417?text=${fichaMessage}">Solicitar ficha e historial →</a>
      </aside>
    </div>
  </section>

  <section class="product-numbers" aria-label="Datos principales de ${vehicle.brand} ${vehicle.model}">
    <div><span>Potencia</span><strong>${vehicle.hp}</strong><em>CV</em></div>
    <div><span>Kilometraje</span><strong>${new Intl.NumberFormat('es-ES').format(vehicle.km)}</strong><em>km</em></div>
    <div><span>Año</span><strong>${vehicle.year}</strong></div>
    <div><span>Cambio</span><strong>${vehicle.transmission}</strong></div>
  </section>

  <section class="product-story">
    <div class="product-story__copy">
      <div class="section-kicker">La unidad</div>
      <div class="product-story__index">01</div>
      <h2>${vehicle.brand}<br>${vehicle.model}</h2>
      <p>${vehicle.summary}</p>
      <div class="product-story__micro"><span>${vehicle.body}</span><span>${vehicle.fuel}</span><span>${vehicle.warranty} de garantía</span></div>
    </div>
    <figure class="product-story__media">
      <img src="${storyImage}" alt="${vehicle.brand} ${vehicle.model}, fotografía real" loading="lazy" style="object-position:${storyImagePosition}">
      <figcaption>${vehicle.brand} ${vehicle.model} · Puerto Motor</figcaption>
    </figure>
  </section>

  <section class="vehicle-story vehicle-story--editorial">
    <div class="vehicle-story__intro">
      <div class="section-kicker">Equipamiento destacado</div>
      <div class="product-story__index">02</div>
      <h2>Equipamiento.</h2>
    </div>
    <div class="vehicle-story__list">${vehicle.highlights.map((item,index)=>`<div><span>${String(index+1).padStart(2,'0')}</span><strong>${item}</strong></div>`).join('')}</div>
  </section>

  <section class="product-detail-scene">
    <figure class="product-detail-scene__media">
      <img src="${detailImage}" alt="Detalle de ${vehicle.brand} ${vehicle.model}" loading="lazy" style="object-position:${detailImagePosition}">
    </figure>
    <div class="product-detail-scene__copy">
      <div class="section-kicker">Puerto Motor</div>
      <div class="product-story__index">03</div>
      <h2>Información y documentación.</h2>
      <p>Solicita historial, documentación o cualquier detalle adicional directamente al equipo de Puerto Motor.</p>
      <a class="text-link" href="https://wa.me/34605932417?text=${detailMessage}">${buttonLabel('Solicitar información')}</a>
    </div>
  </section>

  ${trustRail()}

  ${related.length ? `<section class="section related"><div class="section-head"><div><div class="section-kicker">Relacionados</div><h2 class="section-title">Vehículos relacionados.</h2></div></div><div class="vehicle-grid">${related.map(v=>vehicleCard(v)).join('')}</div></section>` : ''}

  <div class="mobile-vehicle-cta" aria-label="Contactar sobre ${vehicle.brand} ${vehicle.model}">
    <div><span>${vehicle.brand}</span><strong>${formatPrice(vehicle.price)}</strong></div>
    <a href="https://wa.me/34605932417?text=${infoMessage}">WhatsApp</a>
  </div>
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
