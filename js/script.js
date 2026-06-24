/* ===========================
   Mujeres de Madera - JavaScript
   =========================== */

function openLightbox(imagePath, caption = '') {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = imagePath;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

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

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach((card) => {
    observer.observe(card);
  });

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

document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'ArrowRight') {
    navigateGallery(1);
  } else if (e.key === 'ArrowLeft') {
    navigateGallery(-1);
  }
});

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

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + direction + cards.length) % cards.length;
  const nextCard = cards[nextIndex];
  const nextImg = nextCard.querySelector('img');
  const captionEl = document.getElementById('lightbox-caption');

  if (nextImg) {
    lightboxImg.src = nextImg.src;
    captionEl.textContent = nextImg.alt || '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Por favor completa todos los campos.';
      return;
    }

    if (!email.value.includes('@')) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Por favor ingresa un correo electrónico válido.';
      return;
    }

    feedback.className = 'form-feedback success';
    feedback.textContent = 'Gracias por tu mensaje. Te contactaremos pronto.';
    form.reset();
  });
});
