/**
 * poem-reader.js — Poem Page Logic
 * Handles: dynamic poem loading, navigation, typewriter animation
 */

// ── Dark Mode (same as index) ──────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function getStoredTheme() {
  return localStorage.getItem('folio-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☽';
  localStorage.setItem('folio-theme', theme);
}

applyTheme(getStoredTheme());
themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


// ── Page Transitions ───────────────────────────────────────
const curtain = document.getElementById('pageCurtain');

function navigateTo(url) {
  if (!curtain) {
    window.location.href = url;
    return;
  }
  curtain.classList.remove('enter');
  curtain.classList.add('exit');
  curtain.addEventListener('animationend', () => {
    window.location.href = url;
  }, { once: true });
}

window.addEventListener('DOMContentLoaded', () => {
  if (curtain) curtain.classList.add('enter');
});


// ── Poem Loading ───────────────────────────────────────────
function getCurrentId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id') ?? '0', 10);
}

function renderPoem() {
  if (typeof POEMS === 'undefined') {
    console.error('POEMS data not loaded. Ensure poems.js is included before poem-reader.js.');
    return;
  }

  const id = getCurrentId();
  const poem = POEMS.find(p => p.id === id);

  if (!poem) {
    // Graceful fallback
    document.getElementById('poemTitle').textContent = 'Poem not found';
    return;
  }

  // Update document title
  document.title = `${poem.title} — Folio`;

  // Populate header
  const titleEl = document.getElementById('poemTitle');
  const metaEl = document.getElementById('poemMeta');
  const counterEl = document.getElementById('poemCounter');

  if (titleEl) titleEl.textContent = poem.title;
  if (metaEl) metaEl.textContent = `${poem.author} · ${poem.date}`;
  if (counterEl) counterEl.textContent = `${id + 1} of ${POEMS.length}`;

  // Render poem content with stanza breaks
  renderPoemContent(poem.content);

  // Set up navigation
  setupNavigation(id);
}

function renderPoemContent(content) {
  const container = document.getElementById('poemBody');
  if (!container) return;

  // Split into stanzas on double newline
  const stanzas = content.split(/\n\n+/);

  container.innerHTML = '';

  stanzas.forEach((stanza, i) => {
    const stanzaEl = document.createElement('div');
    stanzaEl.className = 'poem-stanza';

    // Each stanza line
    const lines = stanza.trim().split('\n');
    lines.forEach(line => {
      const lineEl = document.createElement('p');
      lineEl.className = 'poem-text';
      lineEl.textContent = line;
      stanzaEl.appendChild(lineEl);
    });

    container.appendChild(stanzaEl);
  });

  // Trigger fade-in animation
  requestAnimationFrame(() => {
    container.style.opacity = '0';
    container.style.transform = 'translateY(16px)';
    container.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';

    requestAnimationFrame(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });
  });
}

function setupNavigation(currentId) {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const homeBtn = document.getElementById('homeBtn');

  const isFirst = currentId <= 0;
  const isLast = currentId >= POEMS.length - 1;

  // Previous button
  if (prevBtn) {
    if (isFirst) {
      prevBtn.disabled = true;
      prevBtn.setAttribute('aria-disabled', 'true');
    } else {
      prevBtn.addEventListener('click', () => {
        navigateTo(`poem.html?id=${currentId - 1}`);
      });
    }
  }

  // Next button
  if (nextBtn) {
    if (isLast) {
      nextBtn.disabled = true;
      nextBtn.setAttribute('aria-disabled', 'true');
    } else {
      nextBtn.addEventListener('click', () => {
        navigateTo(`poem.html?id=${currentId + 1}`);
      });
    }
  }

  // Home button
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      navigateTo('index.html');
    });
  }
}

// ── Keyboard Navigation ────────────────────────────────────
document.addEventListener('keydown', (e) => {
  const id = getCurrentId();
  if (e.key === 'ArrowLeft' && id > 0) {
    navigateTo(`poem.html?id=${id - 1}`);
  }
  if (e.key === 'ArrowRight' && id < POEMS.length - 1) {
    navigateTo(`poem.html?id=${id + 1}`);
  }
  if (e.key === 'Escape') {
    navigateTo('index.html');
  }
});

// ── Init ───────────────────────────────────────────────────
renderPoem();
