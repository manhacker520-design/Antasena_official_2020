/* ============================================================
   ANTASENA WEB — effects.js
   Scroll reveal, navbar, cursor glow & toast
   ============================================================ */

function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.getAttribute('data-delay')) || 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

  const scrolled = window.scrollY;
  document.querySelectorAll('.star').forEach(star => {
    const speed = parseFloat(star.getAttribute('data-speed') || '0.5');
    star.style.transform = `translateY(${scrolled * speed * 0.05}px)`;
  });
});

document.addEventListener('mousemove', (e) => {
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }
});

function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function showSaveIndicator() {
  const el = document.getElementById('saveIndicator');
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('adminLoginModal')?.addEventListener('click', function (e) {
    if (e.target === this) closeAdminLogin();
  });
  document.getElementById('memberEditModal')?.addEventListener('click', function (e) {
    if (e.target === this) closeMemberEdit();
  });
  document.getElementById('adminPassword')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loginAdmin();
  });
});