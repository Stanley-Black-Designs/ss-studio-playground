/* main.js — Stanley Smith Studios Playground */

// ── CAPE TOWN LIVE TIME ─────────────────────────────────────────────────────
function updateCPTTime() {
  const el = document.getElementById('cptTime');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
}
updateCPTTime();
setInterval(updateCPTTime, 1000);

// ── COPY EMAIL ──────────────────────────────────────────────────────────────
function setupCopyEmail(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  const btn = wrap.querySelector('.btn-magnetic__click');
  if (!btn) return;
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    try { await navigator.clipboard.writeText('hello@stanleysmithstudios.com'); }
    catch { const ta = document.createElement('textarea'); ta.value = 'hello@stanleysmithstudios.com'; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    wrap.querySelectorAll('.copy-label').forEach(el => el.style.display = 'none');
    wrap.querySelectorAll('.copy-confirm').forEach(el => el.style.display = 'inline-flex');
    wrap.querySelector('.btn-magnetic__fill').style.backgroundColor = '#16a34a';
    setTimeout(() => {
      wrap.querySelectorAll('.copy-label').forEach(el => el.style.display = 'inline-flex');
      wrap.querySelectorAll('.copy-confirm').forEach(el => el.style.display = 'none');
      wrap.querySelector('.btn-magnetic__fill').style.backgroundColor = '';
    }, 2200);
  });
}
setupCopyEmail('copyWrap');
setupCopyEmail('copyWrap2');

// ── CARD CLICK ──────────────────────────────────────────────────────────────
document.querySelectorAll('.pg-card').forEach((card) => {
  const href = card.dataset.href;
  if (!href) return;
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', () => window.open(href, '_blank', 'noopener,noreferrer'));
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(href, '_blank', 'noopener,noreferrer'); } });
});

// ── HOVER VIDEO ─────────────────────────────────────────────────────────────
document.querySelectorAll('.pg-card').forEach((card) => {
  const video = card.querySelector('.pg-card__video');
  if (!video) return;
  const src = video.getAttribute('src');
  if (!src || src === '' || src === window.location.href) return;
  let didError = false;
  video.addEventListener('error', () => { didError = true; });
  card.addEventListener('mouseenter', () => {
    if (didError) return;
    video.currentTime = 0;
    const p = video.play();
    if (p !== undefined) p.then(() => card.classList.add('is-playing')).catch(() => { didError = true; });
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('is-playing');
    video.pause();
    video.currentTime = 0;
  });
});

// ── MAGNETIC BUTTONS ────────────────────────────────────────────────────────
function initMagneticEffect() {
  if (window.innerWidth <= 991) return;
  const magnets = document.querySelectorAll('[data-magnetic-strength]');
  const resetEl = (el, immediate) => {
    if (!el) return;
    gsap.killTweensOf(el);
    (immediate ? gsap.set : gsap.to)(el, { x: '0em', y: '0em', rotate: '0deg', clearProps: 'all', ...(!immediate && { ease: 'elastic.out(1, 0.3)', duration: 1.6 }) });
  };
  magnets.forEach(m => {
    m.addEventListener('mouseenter', e => { resetEl(e.currentTarget, true); resetEl(e.currentTarget.querySelector('[data-magnetic-inner-target]'), true); });
    m.addEventListener('mousemove', e => {
      const b = m.getBoundingClientRect(), strength = parseFloat(m.getAttribute('data-magnetic-strength')) || 25, inner = m.querySelector('[data-magnetic-inner-target]'), innerStrength = parseFloat(m.getAttribute('data-magnetic-strength-inner')) || strength;
      const ox = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (strength / 16), oy = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (strength / 16);
      gsap.to(m, { x: ox + 'em', y: oy + 'em', rotate: '0.001deg', ease: 'power4.out', duration: 1.6 });
      if (inner) { const ix = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (innerStrength / 16), iy = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (innerStrength / 16); gsap.to(inner, { x: ix + 'em', y: iy + 'em', rotate: '0.001deg', ease: 'power4.out', duration: 2 }); }
    });
    m.addEventListener('mouseleave', e => {
      gsap.to(m, { x: '0em', y: '0em', ease: 'elastic.out(1, 0.3)', duration: 1.6, clearProps: 'all' });
      const inner = m.querySelector('[data-magnetic-inner-target]');
      if (inner) gsap.to(inner, { x: '0em', y: '0em', ease: 'elastic.out(1, 0.3)', duration: 2, clearProps: 'all' });
    });
  });
}

// ── SCROLL-IN ────────────────────────────────────────────────────────────────
const cards = document.querySelectorAll('.pg-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { const i = [...cards].indexOf(entry.target); setTimeout(() => entry.target.classList.add('is-visible'), i * 80); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  cards.forEach(c => observer.observe(c));
} else { cards.forEach(c => c.classList.add('is-visible')); }

document.addEventListener('DOMContentLoaded', initMagneticEffect);
