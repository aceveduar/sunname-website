// Scroll suave para navegación interna
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && document.querySelector(targetId)) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Acordeón animado para FAQ
const faqItems = document.querySelectorAll('.sun-faq__item');
faqItems.forEach(item => {
  const question = item.querySelector('.sun-faq__question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
    // Cierra otros
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
  });
});

// Filtro de categorías en FAQ
const faqCategories = document.querySelectorAll('.sun-faq__category');
faqCategories.forEach(btn => {
  btn.addEventListener('click', () => {
    faqCategories.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;
    faqItems.forEach(item => {
      if (cat === 'all' || item.dataset.category === cat) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Toggle de precios mensual/anual para la sección de planes
const pricingToggle = document.querySelector('.sun-pricing__toggle-input');
if (pricingToggle) {
  const priceCells = document.querySelectorAll('.sun-pricing-table__price');
  const priceMensual = ['$15,000 MXN', '$30,000 MXN', '$60,000 MXN'];
  const priceAnual = ['$144,000 MXN', '$288,000 MXN', '$576,000 MXN'];
  pricingToggle.addEventListener('change', function() {
    if (this.checked) {
      priceCells.forEach((cell, i) => cell.textContent = priceAnual[i]);
      document.querySelectorAll('.sun-pricing__toggle-label').forEach((el, idx) => {
        el.classList.toggle('sun-pricing__toggle-label--active', idx === 1);
      });
    } else {
      priceCells.forEach((cell, i) => cell.textContent = priceMensual[i]);
      document.querySelectorAll('.sun-pricing__toggle-label').forEach((el, idx) => {
        el.classList.toggle('sun-pricing__toggle-label--active', idx === 0);
      });
    }
  });
}

// Tabs animados en recursos
const tabs = document.querySelectorAll('.sun-resources__tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // Aquí podrías mostrar/ocultar contenido según el tab si lo implementas
  });
});

// Efecto de resplandor en logos de clientes
const brandCards = document.querySelectorAll('.sun-brand-card');
brandCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const img = card.querySelector('.sn-trust__brand-img');
    if (img) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      img.style.filter = `drop-shadow(0 0 24px #46c2ce88)`;
      img.style.transform = `scale(1.07)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    const img = card.querySelector('.sn-trust__brand-img');
    if (img) {
      img.style.filter = '';
      img.style.transform = '';
    }
  });
});

// 1. Conteo animado en tarjetas de estadísticas
function animateCountUp(element, target, duration = 1500) {
  let start = 0;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    element.textContent = value + (target > 99 ? '+' : '');
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target + (target > 99 ? '+' : '');
    }
  }
  requestAnimationFrame(step);
}

const statsCards = document.querySelectorAll('.sun-stats-card__number');
let statsAnimated = false;
function handleStatsAnimation() {
  if (statsAnimated) return;
  const statsSection = document.getElementById('Estadisticas');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    statsCards.forEach(card => {
      const raw = card.textContent.replace(/[^\d]/g, '');
      const target = parseInt(raw, 10);
      if (!isNaN(target)) animateCountUp(card, target);
    });
    statsAnimated = true;
  }
}
window.addEventListener('scroll', handleStatsAnimation);
window.addEventListener('DOMContentLoaded', handleStatsAnimation);

// 2. Revelado animado al hacer scroll
function revealOnScroll(selector, animation = 'fadeInUp') {
  const elements = document.querySelectorAll(selector);
  function reveal() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.opacity = 1;
        el.style.animation = `${animation} 0.8s cubic-bezier(.4,1.4,.6,1) both`;
      }
    });
  }
  window.addEventListener('scroll', reveal);
  window.addEventListener('DOMContentLoaded', reveal);
}
revealOnScroll('.sun-service-card');
revealOnScroll('.sun-process-step');
revealOnScroll('.sun-case-study');
revealOnScroll('.sun-team-card');
revealOnScroll('.sun-stats-card');
revealOnScroll('.sun-card');

// 3. Efecto shimmer en imágenes de testimonios y casos de éxito
function addShimmerEffect(imgSelector) {
  const imgs = document.querySelectorAll(imgSelector);
  imgs.forEach(img => {
    if (img.complete) return;
    const shimmer = document.createElement('div');
    shimmer.style.position = 'absolute';
    shimmer.style.top = 0;
    shimmer.style.left = 0;
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.background = 'linear-gradient(90deg, #f7fafc 25%, #e3e8ee 50%, #f7fafc 75%)';
    shimmer.style.animation = 'shimmer 1.2s infinite linear';
    shimmer.style.zIndex = 1;
    shimmer.className = 'sun-shimmer';
    img.parentElement.style.position = 'relative';
    img.parentElement.appendChild(shimmer);
    img.addEventListener('load', () => {
      shimmer.remove();
    });
  });
}
addShimmerEffect('.sun-case-study__image');
addShimmerEffect('.sun-case-study__logo');
addShimmerEffect('.sun-team-card__image');
addShimmerEffect('.sun-card > img');

// 4. Tilt 3D en tarjetas de servicios, casos de éxito y equipo
function addTiltEffect(selector) {
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      card.style.transition = 'transform 0.1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(.4,1.4,.6,1)';
    });
  });
}
addTiltEffect('.sun-service-card');
addTiltEffect('.sun-case-study');
addTiltEffect('.sun-team-card');

// 5. Burbujas animadas en el fondo del hero
function createHeroBubbles() {
  const hero = document.querySelector('.odoo-hero__container');
  if (!hero) return;
  const bubbleContainer = document.createElement('div');
  bubbleContainer.style.position = 'absolute';
  bubbleContainer.style.top = 0;
  bubbleContainer.style.left = 0;
  bubbleContainer.style.width = '100%';
  bubbleContainer.style.height = '100%';
  bubbleContainer.style.pointerEvents = 'none';
  bubbleContainer.style.overflow = 'hidden';
  bubbleContainer.style.zIndex = 0;
  bubbleContainer.className = 'odoo-hero__bubbles';
  hero.style.position = 'relative';
  hero.appendChild(bubbleContainer);
  for (let i = 0; i < 12; i++) {
    const bubble = document.createElement('div');
    bubble.style.position = 'absolute';
    bubble.style.bottom = '-60px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.width = 24 + Math.random() * 32 + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.borderRadius = '50%';
    bubble.style.background = 'rgba(70,194,206,0.13)';
    bubble.style.boxShadow = '0 0 24px 8px #46c2ce33';
    bubble.style.animation = `bubbleFloat ${3 + Math.random() * 5}s linear infinite`;
    bubble.style.animationDelay = (Math.random() * 3) + 's';
    bubbleContainer.appendChild(bubble);
  }
}
window.addEventListener('DOMContentLoaded', createHeroBubbles);

// Animación de aparición con escala y opacidad para cualquier elemento con la clase .sun-animate-on-scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.sun-animate-on-scroll');
  elements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && !el.classList.contains('sun-animated')) {
      el.style.opacity = 1;
      el.style.transform = 'scale(1)';
      el.style.transition = 'opacity 0.7s cubic-bezier(.4,1.4,.6,1), transform 0.7s cubic-bezier(.4,1.4,.6,1)';
      el.classList.add('sun-animated');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Inyecta estilos para la animación si no existen
(function injectScrollAnimStyles() {
  if (!document.getElementById('sun-scroll-anim-styles')) {
    const style = document.createElement('style');
    style.id = 'sun-scroll-anim-styles';
    style.innerHTML = `
      .sun-animate-on-scroll {
        opacity: 0;
        transform: scale(0.96);
        will-change: opacity, transform;
      }
      .sun-animate-on-scroll.sun-animated {
        opacity: 1;
        transform: scale(1);
      }
    `;
    document.head.appendChild(style);
  }
})();

// Aplica la clase a cards y secciones principales si no la tienen
function addScrollAnimClass() {
  const selectors = [
    '.sun-service-card',
    '.sun-process-step',
    '.sun-case-study',
    '.sun-team-card',
    '.sun-blog-card',
    '.sun-card',
    '.sun-stats-card',
    '.sun-faq__item',
    '.sun-results__info-box',
    '.sun-testimonial-card',
    '.sun-contact-form',
    '.sun-partner-card',
    '.sun-brand-card'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('sun-animate-on-scroll')) {
        el.classList.add('sun-animate-on-scroll');
      }
    });
  });
}
window.addEventListener('DOMContentLoaded', addScrollAnimClass);
