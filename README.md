# Folio — A Poetry Website

A production-ready, elegantly designed poetry website built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no dependencies beyond Google Fonts.

---

## Features

- **Landing page** with animated poem cards and hero section
- **Individual poem pages** loaded dynamically from URL query params (`poem.html?id=0`)
- **Dark / Light mode** toggle with localStorage persistence and no flash on load
- **Ambient audio** — synthesized via Web Audio API (no audio files needed)
- **Page transition animations** — curtain reveal between pages
- **Keyboard navigation** — ← → arrows to move between poems, Esc to go home
- **Fully responsive** — mobile and desktop
- **Animated background** — drifting gradient orbs + grain overlay
- **Accessible** — semantic HTML, ARIA labels, keyboard navigable

---

## File Structure

```
poetry-site/
├── index.html          ← Landing page (poem grid)
├── poem.html           ← Poem reader page
├── css/
│   └── styles.css      ← All styles, design tokens, animations
├── js/
│   ├── poems.js        ← Poem data (add new poems here)
│   ├── script.js       ← Index page logic
│   └── poem-reader.js  ← Poem page logic
└── README.md
```

---

## Adding New Poems

Open `js/poems.js` and add a new object to the `POEMS` array:

```js
{
  id: 8,                        // Must be unique, sequential
  title: "Your Poem Title",
  author: "Author Name",
  year: "2024",
  preview: "First line here\nSecond line here",   // Shown on cards
  content: `Full poem text here.

Separate stanzas with a blank line.

Each blank line becomes a stanza break.`
}
```

That's it — no HTML changes needed.

---

## Running Locally

Simply open `index.html` in any modern browser. No build step or server required.

For best results (avoids any relative path issues), use a simple local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000`.

---

## GitHub Pages Deployment

1. Push the folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Your site will be live at `https://yourusername.github.io/repo-name/`

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous poem |
| `→` | Next poem |
| `Esc` | Back to collection |

---

## Design Notes

- **Fonts**: Cormorant Garamond (display) + EB Garamond (body) + Jost (UI labels)
- **Color system**: CSS custom properties for seamless dark/light theming
- **Ambient audio**: Pentatonic drone synthesized via Web Audio API — no audio files, works offline
- **Animations**: CSS keyframes + JS requestAnimationFrame for buttery smooth transitions

---

*Built with care. No frameworks were harmed in the making of this site.*
