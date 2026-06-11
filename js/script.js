/* ===========================
   Mujeres de Madera - JavaScript
   =========================== */

// Abrir lightbox con imagen
function openLightbox(imagePath, caption = '') {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = imagePath;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Cerrar lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Cerrar lightbox con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Observador de intersección para animaciones al scrollear
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todas las tarjetas de galería
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach((card) => {
    observer.observe(card);
  });

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Lazy loading de imágenes
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

// Navegar a través de lightbox con flechas
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'ArrowRight') {
    navigateGallery(1);
  } else if (e.key === 'ArrowLeft') {
    navigateGallery(-1);
  }
});

// Función auxiliar para navegar en galería
function navigateGallery(direction) {
  const lightboxImg = document.getElementById('lightbox-img');
  const currentSrc = lightboxImg.src;
  const cards = document.querySelectorAll('.gallery-card');
  let currentIndex = -1;

  cards.forEach((card, index) => {
    const img = card.querySelector('img');
    if (img && img.src === currentSrc) {
      currentIndex = index;
    }
  });

  const nextIndex = (currentIndex + direction + cards.length) % cards.length;
  const nextCard = cards[nextIndex];
  const nextImg = nextCard.querySelector('img');

  if (nextImg) {
    lightboxImg.src = nextImg.src;
  }
}
