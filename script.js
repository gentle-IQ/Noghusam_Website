// ── MOBILE MENU TOGGLE ──
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
}

// Close menu when any nav link is clicked
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('navMenu');
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
  initThemeToggle();
  initCarousel();
});

// ── THEME TOGGLE ──
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const storageKey = 'noghusam-theme';
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const savedTheme = localStorage.getItem(storageKey);
  const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    const stateLabel = toggle.querySelector('.theme-toggle-state');
    if (stateLabel) {
      stateLabel.textContent = theme === 'light' ? 'Light mode' : 'Dark mode';
    }
  }

  applyTheme(initialTheme);

  toggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
}

// ── HERO CAROUSEL ──
function initCarousel() {
  const carousel = document.getElementById('heroCarousel');
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!carousel || !track) return;
  
  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  let currentIndex = 0;
  let autoplayInterval;
  let touchStart = 0, touchEnd = 0;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
  
  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    resetAutoplay();
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  carousel.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 30) nextSlide();
    else if (touchEnd - touchStart > 30) prevSlide();
  }, { passive: true });
  
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  
  startAutoplay();
}

// ── SPARKS ANIMATION ──
const sparksEl = document.getElementById('sparks');
if (sparksEl) {
  for (let i = 0; i < 24; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = (40 + Math.random() * 50) + '%';
    s.style.setProperty('--dur', (3 + Math.random() * 4) + 's');
    s.style.setProperty('--delay', (Math.random() * 5) + 's');
    sparksEl.appendChild(s);
  }
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 4000);
}

// ── ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--orange)' : '';
  });
});
