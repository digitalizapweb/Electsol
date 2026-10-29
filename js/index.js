// ============================================
// ELECSOL - Interacciones
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Animaciones al hacer scroll
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out' });
  }

  // Año del footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Sombra del menú al hacer scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Cerrar el menú móvil al elegir una sección
  const nav = document.getElementById('navbarNav');
  document.querySelectorAll('#navbarNav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // Marcar en el menú la sección visible
  const links = [...document.querySelectorAll('#navbarNav .nav-link[href^="#"]')];
  const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  // Contador animado de estadísticas
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const countUp = (el) => {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { countUp(e.target); statsObs.unobserve(e.target); }
    });
  }, { threshold: .6 });
  counters.forEach((c) => statsObs.observe(c));

  // Visor de fotos de trabajos
  const works = [...document.querySelectorAll('.work')];
  const box = document.getElementById('lightbox');
  const boxImg = box.querySelector('img');
  let current = 0;
  const show = (i) => {
    current = (i + works.length) % works.length;
    const w = works[current];
    boxImg.src = w.dataset.full;
    boxImg.alt = w.querySelector('img').alt;
  };
  const open = (i) => { show(i); box.hidden = false; document.body.style.overflow = 'hidden'; box.querySelector('.lightbox-close').focus(); };
  const close = () => { box.hidden = true; document.body.style.overflow = ''; works[current].focus(); };
  works.forEach((w, i) => w.addEventListener('click', () => open(i)));
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.prev').addEventListener('click', () => show(current - 1));
  box.querySelector('.next').addEventListener('click', () => show(current + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});
