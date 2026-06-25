# Stanley Smith Studios — Motion Playground

## What this project is
A client-facing demo playground showcasing 24 motion and interaction components. Built in plain HTML/CSS/JS — no framework, no build step. Deployed on Vercel via GitHub auto-deploy.

**Live site:** https://ss-studio-playground.vercel.app (or custom domain once set)
**Repo:** https://github.com/Stanley-Black-Designs/ss-studio-playground
**Branch:** main (Vercel auto-deploys on every push)

## Stack
- Pure HTML / CSS / JS — no React, no bundler
- GSAP 3.15 (loaded via CDN) for animations
- Lenis 1.1.14 (CDN) for smooth scroll on index
- Neue Montreal (local .otf files in /fonts/) for headings
- Inter (Google Fonts CDN) for body text
- Vercel for hosting, GitHub for source

## Project structure
```
/
├── index.html              ← Main playground page (24 cards)
├── style.css               ← All styles for index
├── main.js                 ← Card interactions, video hover, magnetic buttons, CPT time, Lenis
├── fonts/                  ← Neue Montreal .otf files (all 8 weights)
├── videos/                 ← MP4 hover previews (drop files here, named to match cards)
├── *.avif                  ← Static preview thumbnails for each card
└── demos/
    ├── demo-chrome.css     ← Shared header strip for all demo pages
    ├── radial-marquee.html
    ├── 3d-tornado.html
    ├── infinite-grid.html
    ├── parallax-slider.html
    ├── layered-slider.html
    ├── depth-tiles.html
    ├── orbit-tiles.html
    ├── cascading-slider.html
    ├── bg-zoom.html
    ├── image-trail.html
    ├── feature-pills.html
    ├── image-sequence.html
    ├── stacking-cards.html
    ├── sticky-features.html
    ├── horizontal-scroll.html
    ├── typo-scroll.html
    ├── pixelated-scroll.html
    ├── interactive-globe.html
    ├── sticky-steps.html
    ├── highlight-marker.html
    ├── line-testimonials.html
    ├── stanley-loader.html
    ├── dropping-cards.html
    └── stacking-bounce.html
```

## Design system (index.html + style.css)
- **Background:** `#0c0d10`
- **Surface:** `#12141a`
- **Accent (blue):** `#0064E7` — used on logo dot, eyebrow dots, CTA buttons, card tags
- **Heading font:** Neue Montreal (`--font-heading`)
- **Body font:** Inter (`--font-body`)
- **Text primary:** `#f0f0f2`
- **Text secondary:** `rgba(240,240,242,0.42)`
- **Text tertiary (eyebrows, labels):** `rgba(240,240,242,0.40)`
- **Card border:** `rgba(255,255,255,0.09)`
- **Header CTA:** white text, `rgba(255,255,255,0.35)` border

## Key decisions
- All videos use `data-src` (not `src`) so missing files don't cause errors. JS sets `src` on first hover.
- `.is-playing` class (not `:hover`) drives the CSS video fade to avoid race conditions.
- Magnetic buttons need `padding: 12px 16px; margin: -12px -16px` on `.btn-wrap` for breathing room — reset to `margin: 0` on mobile.
- Cape Town time in footer uses `Africa/Johannesburg` timezone, ticks every second.
- Lenis smooth scroll is initialised in `main.js` before everything else.
- All demo pages share `demos/demo-chrome.css` for the sticky top bar.
- Demo page CTAs link to `https://calendly.com/stanleysmithstudios/30min`
- Studio email: `hello@stanleysmithstudios.com`

## Owner info
- **Studio:** Stanley Smith Studios
- **Location:** Cape Town, South Africa
- **Email:** hello@stanleysmithstudios.com
- **Calendly:** https://calendly.com/stanleysmithstudios/30min
- **Main site:** https://stanleysmithstudios.com

## How to deploy
Just push to main — Vercel auto-deploys within ~30 seconds.
```
git add -A
git commit -m "your message"
git push origin main
```

## Adding a new card
1. Add `<article class="pg-card" data-href="demos/newdemo.html">` block to `index.html`
2. Add preview image `newdemo.avif` to root
3. Add video `videos/newdemo.mp4` (optional — card falls back to static image)
4. Create `demos/newdemo.html` using existing demos as template
5. Update `section-label-count` in `index.html`
6. Commit and push

## Responsiveness rules
- Grid: 4 col desktop → 2 col tablet (≤1100px) → 1 col mobile (≤640px)
- Magnetic button negative margins reset to 0 on mobile
- CTA button groups stack vertically on mobile with `gap: 16px`
- Always test: 375px, 768px, 1280px
