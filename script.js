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
});

// ── SPARKS ANIMATION ──
const sparksEl = document.getElementById('sparks');
for (let i = 0; i < 24; i++) {
  const s = document.createElement('div');
  s.className = 'spark';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = (40 + Math.random() * 50) + '%';
  s.style.setProperty('--dur', (3 + Math.random() * 4) + 's');
  s.style.setProperty('--delay', (Math.random() * 5) + 's');
  sparksEl.appendChild(s);
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
