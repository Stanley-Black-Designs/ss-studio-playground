# Stanley Smith Studios — Motion Playground

A client-facing demo page showcasing motion and interaction components.

## Structure

```
stanley-playground/
├── index.html              ← Main playground page
├── style.css               ← All styles for index
├── main.js                 ← Card interactions (hover video, click to open)
├── radial-cards-marquee.avif
├── 3d-tornado.avif
├── infinite-grid.avif
├── parallax-slider.avif
├── videos/                 ← Drop your preview MP4s here (see below)
│   ├── radial-marquee.mp4
│   ├── 3d-tornado.mp4
│   ├── infinite-grid.mp4
│   └── parallax-slider.mp4
└── demos/
    ├── demo-chrome.css     ← Shared header strip for all demos
    ├── radial-marquee.html
    ├── 3d-tornado.html
    ├── infinite-grid.html
    └── parallax-slider.html
```

## Setup

1. Open the folder in VS Code
2. Install the **Live Server** extension (if not already installed)
3. Right-click `index.html` → **Open with Live Server**

No build step, no dependencies to install. Everything runs in the browser.

## Adding preview videos

Each card shows a static image by default. On hover, it attempts to play a video from the `videos/` folder.

To add hover videos:
- Record a short screen capture (5–10 sec loop) of each live demo
- Export as MP4 (H.264, no audio)
- Name them exactly as listed in the structure above
- Drop them into the `videos/` folder

If a video file is missing, the card simply stays on the static preview image — no errors.

## Adding more cards

Duplicate any `<article class="pg-card">` block in `index.html` and update:
- `data-href` → path to the new demo HTML
- `<img src="">` → preview image filename
- `<video src="">` → video filename in `videos/`
- Title, description, and tech tags

Then create a corresponding demo page in `demos/` using the existing ones as templates.

## Contact

hello@stanleysmithstudios.com
