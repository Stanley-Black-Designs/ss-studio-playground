/* main.js — Stanley Smith Studios Playground */

// ── COPY EMAIL ──────────────────────────────────────────────────────────────
function setupCopyEmail(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@stanleysmithstudios.com');
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = 'hello@stanleysmithstudios.com';
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 2200);
  });
}

setupCopyEmail('copyEmailBtn');
setupCopyEmail('copyEmailBtn2');

// ── CARD CLICK → open demo in new tab ──────────────────────────────────────
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

// ── HOVER VIDEO — robust play/pause ────────────────────────────────────────
// Videos only exist if the user has added MP4s to the videos/ folder.
// If src is missing or empty the <video> element simply has no source and
// we handle that gracefully — no console errors, thumbnail stays visible.
document.querySelectorAll('.pg-card').forEach((card) => {
  const video = card.querySelector('.pg-card__video');
  const thumb = card.querySelector('.pg-card__thumb');
  if (!video) return;

  // If no src is set (videos not yet added), skip silently
  const hasSrc = video.src && video.src !== window.location.href;
  if (!hasSrc) return;

  let playPromise = null;
  let didError = false;

  video.addEventListener('error', () => { didError = true; });

  card.addEventListener('mouseenter', () => {
    if (didError) return;
    video.currentTime = 0;
    playPromise = video.play().catch(() => { didError = true; });
  });

  card.addEventListener('mouseleave', () => {
    if (!playPromise) return;
    playPromise.then(() => {
      video.pause();
      video.currentTime = 0;
    }).catch(() => {});
    playPromise = null;
  });
});

// ── SCROLL-IN ANIMATION ─────────────────────────────────────────────────────
const cards = document.querySelectorAll('.pg-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = [...cards].indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('is-visible'), index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  cards.forEach((card) => observer.observe(card));
} else {
  cards.forEach((card) => card.classList.add('is-visible'));
}
