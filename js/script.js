/**
 * script.js — Index Page Logic
 * Handles: poem card rendering, dark mode, page transitions, audio
 */

// ── Dark Mode ──────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function getStoredTheme() {
  return localStorage.getItem('folio-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀' : '☽';
  localStorage.setItem('folio-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Apply theme immediately (before DOM paint to avoid flash)
applyTheme(getStoredTheme());
themeToggle?.addEventListener('click', toggleTheme);


// ── Poem Cards ────────────────────────────────────────────
const grid = document.getElementById('poemsGrid');

function padNumber(n, total) {
  return String(n + 1).padStart(String(total).length, '0');
}

function buildCards() {
  if (!grid || typeof POEMS === 'undefined') return;

  POEMS.forEach((poem, index) => {
    const card = document.createElement('a');
    card.className = 'poem-card';
    card.href = `poem.html?id=${poem.id}`;
    card.setAttribute('aria-label', `Read poem: ${poem.title}`);

    card.innerHTML = `
      <div class="card-number">${padNumber(index, POEMS.length)}</div>
      <h2 class="card-title">${poem.title}</h2>
      <p class="card-preview">${poem.preview}</p>
      <div class="card-footer">
        <span class="card-author">${poem.author} &nbsp;·&nbsp; ${poem.year}</span>
        <span class="card-arrow" aria-hidden="true">→</span>
      </div>
    `;

    // Page transition on navigate
    card.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(card.href);
    });

    grid.appendChild(card);
  });
}

buildCards();


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

// Fade in on arrival
window.addEventListener('DOMContentLoaded', () => {
  if (curtain) {
    curtain.classList.add('enter');
  }
});


// ── Ambient Audio ──────────────────────────────────────────
const audioBtn = document.getElementById('audioBtn');
const audioIcon = document.getElementById('audioIcon');

// Synthesized ambient audio using Web Audio API (no file dependency)
let audioCtx = null;
let masterGain = null;
let isPlaying = false;
let oscillators = [];

function createAmbientAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 3);
  masterGain.connect(audioCtx.destination);

  // Reverb (convolver approximation via feedback delay)
  const delay = audioCtx.createDelay(3);
  delay.delayTime.value = 1.4;
  const feedback = audioCtx.createGain();
  feedback.gain.value = 0.35;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(masterGain);

  // Soft drone tones — pentatonic intervals
  const frequencies = [110, 165, 220, 277.2, 329.6];
  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    oscGain.gain.value = 0.008 + (i * 0.002);

    // Gentle LFO tremolo per note
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.05 + (i * 0.02);
    lfoGain.gain.value = 0.003;
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();

    osc.connect(oscGain);
    oscGain.connect(delay);
    oscGain.connect(masterGain);
    osc.start();
    oscillators.push(osc);
    oscillators.push(lfo);
  });
}

function startAudio() {
  if (!audioCtx) createAmbientAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  masterGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2);
  isPlaying = true;
  audioBtn?.classList.add('is-playing');
  if (audioIcon) audioIcon.textContent = '♫';
}

function stopAudio() {
  if (!audioCtx || !masterGain) return;
  masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2);
  isPlaying = false;
  audioBtn?.classList.remove('is-playing');
  if (audioIcon) audioIcon.textContent = '♪';
}

audioBtn?.addEventListener('click', () => {
  isPlaying ? stopAudio() : startAudio();
});
