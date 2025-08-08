// hero-config.js
// Dónde vive el hero (si está en <main>):
window.HERO_HEADER_SELECTOR = '.hero-section';

// Imágenes del carrusel
window.HERO_IMAGES = ['banner.png','logo-tienda.png','logo-circulos.png'];

// Ocultar texto en estas slides
const ocultar = new Set(['logo-tienda.png','logo-circulos.png']);
window.HERO_CAPTIONS = window.HERO_IMAGES.map(n => ocultar.has(n) ? null : undefined);

// Autoplay:
window.HERO_AUTOPLAY_MS = 5000; // <- comenta o quita para SIN autoplay
