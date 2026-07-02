/* main.js — Stanley Smith Studios Playground */

// ── LENIS SMOOTH SCROLL ─────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);

// ── CAPE TOWN LIVE TIME ─────────────────────────────────────────────────────
function updateCPTTime() {
  const el = document.getElementById('cptTime');
  if (!el) return;
  const time = new Date().toLocaleTimeString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  el.textContent = 'Local time: ' + time;
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
    catch {
      const ta = document.createElement('textarea');
      ta.value = 'hello@stanleysmithstudios.com';
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
    const fill = wrap.querySelector('.btn-magnetic__fill');
    wrap.querySelectorAll('.copy-label').forEach(el => el.style.display = 'none');
    wrap.querySelectorAll('.copy-confirm').forEach(el => el.style.display = 'inline-flex');
    if (fill) fill.style.backgroundColor = '#16a34a';
    setTimeout(() => {
      wrap.querySelectorAll('.copy-label').forEach(el => el.style.display = 'inline-flex');
      wrap.querySelectorAll('.copy-confirm').forEach(el => el.style.display = 'none');
      if (fill) fill.style.backgroundColor = '';
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
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(href, '_blank', 'noopener,noreferrer'); }
  });
});

// ── HOVER VIDEO — definitive fix ────────────────────────────────────────────
// Uses data-src instead of src so the browser never tries to load
// a non-existent file. The src is only assigned on first hover.
// The .is-playing class (not :hover) drives the CSS fade so there
// is no race condition between the promise and the transition.
document.querySelectorAll('.pg-card').forEach((card) => {
  const video = card.querySelector('.pg-card__video');
  if (!video) return;

  const dataSrc = video.getAttribute('data-src');
  if (!dataSrc) return; // no video configured

  let loaded = false;
  let playing = false;

  function loadAndPlay() {
    if (!loaded) {
      video.src = dataSrc;
      video.load();
      loaded = true;
    }
    if (playing) return;
    video.currentTime = 0;
    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        playing = true;
        card.classList.add('is-playing');
      }).catch(() => {
        // Autoplay blocked or file missing — stay on thumbnail silently
      });
    }
  }

  function pauseAndReset() {
    card.classList.remove('is-playing');
    video.pause();
    video.currentTime = 0;
    playing = false;
  }

  card.addEventListener('mouseenter', loadAndPlay);
  card.addEventListener('mouseleave', pauseAndReset);
});

// ── MAGNETIC BUTTONS ────────────────────────────────────────────────────────
function initMagneticEffect() {
  if (window.innerWidth <= 991) return;
  document.querySelectorAll('[data-magnetic-strength]').forEach(m => {
    const resetEl = (el, immediate) => {
      if (!el) return;
      gsap.killTweensOf(el);
      (immediate ? gsap.set : gsap.to)(el, {
        x: '0em', y: '0em', rotate: '0deg', clearProps: 'all',
        ...(!immediate && { ease: 'elastic.out(1, 0.3)', duration: 1.6 })
      });
    };
    m.addEventListener('mouseenter', e => {
      resetEl(e.currentTarget, true);
      resetEl(e.currentTarget.querySelector('[data-magnetic-inner-target]'), true);
    });
    m.addEventListener('mousemove', e => {
      const b = m.getBoundingClientRect();
      const strength = parseFloat(m.getAttribute('data-magnetic-strength')) || 25;
      const inner = m.querySelector('[data-magnetic-inner-target]');
      const innerStrength = parseFloat(m.getAttribute('data-magnetic-strength-inner')) || strength;
      const ox = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (strength / 16);
      const oy = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (strength / 16);
      gsap.to(m, { x: ox + 'em', y: oy + 'em', rotate: '0.001deg', ease: 'power4.out', duration: 1.6 });
      if (inner) {
        const ix = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (innerStrength / 16);
        const iy = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (innerStrength / 16);
        gsap.to(inner, { x: ix + 'em', y: iy + 'em', rotate: '0.001deg', ease: 'power4.out', duration: 2 });
      }
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
  let batchTimer = null;
  let batchEntries = [];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        batchEntries.push(entry.target);
        observer.unobserve(entry.target);
      }
    });
    // Process all entries that arrived in this observer tick together as one batch
    if (batchEntries.length) {
      clearTimeout(batchTimer);
      batchTimer = setTimeout(() => {
        batchEntries.forEach((card, i) => {
          setTimeout(() => card.classList.add('is-visible'), i * 70);
        });
        batchEntries = [];
      }, 0);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  cards.forEach(c => observer.observe(c));
} else {
  cards.forEach(c => c.classList.add('is-visible'));
}

document.addEventListener('DOMContentLoaded', initMagneticEffect);

// ── INTRO REVEAL ─────────────────────────────────────────────────────────────
(function () {
  const eyebrow = document.querySelector('.intro-eyebrow');
  const headline = document.querySelector('.intro-headline');
  const body = document.querySelector('.intro-body');
  const actions = document.querySelector('.intro-actions');
  const rule = document.querySelector('.intro-rule');
  if (!eyebrow) return;
  gsap.set([eyebrow, headline, body, actions], { opacity: 0, y: 30 });
  if (rule) gsap.set(rule, { opacity: 0 });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
  tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.75 })
    .to(headline, { opacity: 1, y: 0, duration: 1.0 }, '-=0.45')
    .to(body, { opacity: 1, y: 0, duration: 0.75 }, '-=0.55')
    .to(actions, { opacity: 1, y: 0, duration: 0.75 }, '-=0.5')
    .to(rule, { opacity: 1, duration: 0.9 }, '-=0.35');
})();

/* ── Filter system ──────────────────────────────────────── */
(function () {
  const filters = document.querySelectorAll('.pg-filter');
  const cards   = document.querySelectorAll('.pg-card');
  const count   = document.getElementById('pgCount');

  function updateCount(active) {
    const visible = active === 'all'
      ? cards.length
      : [...cards].filter(c => c.dataset.category === active).length;
    if (count) count.textContent = visible + ' demo' + (visible === 1 ? '' : 's');
  }

  function applyFilter(active) {
    cards.forEach(card => {
      const cat = card.dataset.category || 'motion';
      if (active === 'all' || cat === active) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
    updateCount(active);
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilter(btn.dataset.filter);
    });
  });

  // Init count
  updateCount('all');
})();
