/* =========================================================
   RETRO//STACK — Catálogo Técnico de Hardware
   Tema: "Pixel Modern" — paleta de UI de jogo moderno,
   ícones/pixel-art crus + layout limpo, tipografia atual.
   ========================================================= */

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Silkscreen:wght@400;700&display=swap');

:root {
  --bg: #100e1b;
  --bg-1: #15132424;
  --bg-panel: #1c1930;
  --bg-panel-2: #221e3a;
  --ink: #342e54;
  --ink-soft: #262244;

  --primary: #7c5cff;
  --primary-soft: rgba(124, 92, 255, 0.16);

  --acc-mb: #ffd23f;
  --acc-gpu: #ff5d8f;
  --acc-cpu: #4fd6ff;
  --acc-ram: #7cff6b;

  --ok: #59e88a;
  --warn: #ffc94a;
  --bad: #ff5c6c;
  --mid: #8b83ab;

  --text: #f2eeff;
  --text-dim: #ada5cf;
  --text-faint: #6c6591;

  --font-body: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-pixel: 'Silkscreen', var(--font-mono);
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --notch: 10px;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15.5px;
  line-height: 1.55;
}

body { min-height: 100vh; position: relative; }

/* soft dot-grid backdrop — modern, not scanlines */
.pixel-bg {
  position: fixed; inset: 0; z-index: -1;
  background-color: var(--bg);
  background-image:
    radial-gradient(circle at 1px 1px, rgba(124,92,255,0.16) 1px, transparent 0),
    radial-gradient(circle at 20% 15%, rgba(255,93,143,0.08), transparent 40%),
    radial-gradient(circle at 85% 75%, rgba(79,214,255,0.07), transparent 40%);
  background-size: 22px 22px, auto, auto;
}

a { color: var(--primary); }
::selection { background: var(--primary); color: #fff; }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg-panel); }
::-webkit-scrollbar-thumb { background: var(--ink); border-radius: 6px; border: 2px solid var(--bg-panel); }

/* helper: pixel-notched corners used across cards, modal, chips */
.pixel-cut {
  clip-path: polygon(
    var(--notch) 0, 100% 0, 100% calc(100% - var(--notch)),
    calc(100% - var(--notch)) 100%, 0 100%, 0 var(--notch)
  );
}

/* ---------- boot overlay: pixel loading screen ---------- */
#boot {
  position: fixed; inset: 0; z-index: 2000;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  transition: opacity .45s ease, visibility .45s ease;
}
#boot.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
.boot-card { text-align: center; width: 280px; }
.boot-logo {
  font-family: var(--font-pixel);
  font-size: 20px;
  color: var(--text);
  margin-bottom: 22px;
  letter-spacing: 1px;
}
.boot-logo span { color: var(--primary); }
.boot-bar {
  height: 16px;
  background: var(--bg-panel);
  border: 2px solid var(--ink);
  padding: 3px;
}
.boot-bar-fill {
  height: 100%;
  width: 0%;
  background: repeating-linear-gradient(90deg, var(--primary) 0 6px, var(--acc-cpu) 6px 12px);
  animation: fillbar 1.1s steps(20) forwards;
}
@keyframes fillbar { to { width: 100%; } }
.boot-label {
  margin-top: 12px; font-family: var(--font-mono); font-size: 11px;
  color: var(--text-faint); text-transform: uppercase; letter-spacing: .08em;
}

/* ---------- layout shell ---------- */
.wrap { max-width: 1220px; margin: 0 auto; padding: 0 20px 60px; }

header.hero { padding: 48px 0 30px; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 7px;
  color: var(--text-dim);
  letter-spacing: .1em;
  font-size: 11px;
  text-transform: uppercase;
  margin: 0 0 14px;
  font-family: var(--font-mono);
}
.eyebrow::before {
  content: ""; display: inline-block; width: 8px; height: 8px;
  background: var(--acc-ram); box-shadow: 3px 0 var(--acc-cpu), 6px 0 var(--acc-gpu);
}

h1.title {
  font-family: var(--font-pixel);
  font-size: clamp(24px, 4.2vw, 42px);
  line-height: 1.4;
  margin: 0 0 16px;
  color: var(--text);
  letter-spacing: 1px;
}
h1.title .title-slash { color: var(--primary); }

.subtitle { color: var(--text-dim); max-width: 640px; margin: 0 0 28px; font-size: 14.5px; }
.subtitle b { color: var(--text); font-weight: 600; }

/* ---------- stat strip ---------- */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 8px;
}
.stat {
  background: var(--bg-panel);
  border: 2px solid var(--ink);
  padding: 13px 16px;
}
.stat .num { font-family: var(--font-pixel); font-size: 22px; color: var(--primary); }
.stat .label { color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: .06em; margin-top: 6px; }
.stat:nth-child(1) { border-left: 4px solid var(--acc-mb); }
.stat:nth-child(2) { border-left: 4px solid var(--acc-gpu); }
.stat:nth-child(3) { border-left: 4px solid var(--acc-cpu); }
.stat:nth-child(4) { border-left: 4px solid var(--acc-ram); }

.status-strip { display:flex; flex-wrap:wrap; gap:8px 20px; margin-top: 20px; font-size: 12px; color: var(--text-dim); font-family: var(--font-mono); }
.status-strip .dot { display:inline-block; width:9px; height:9px; margin-right:7px; vertical-align:middle; border-radius: 2px; }

/* ---------- toolbar ---------- */
.toolbar {
  position: sticky; top: 0; z-index: 50;
  background: rgba(16,14,27,0.9);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid var(--ink-soft);
  padding: 16px 0;
  margin-top: 10px;
}
.toolbar-inner { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }

.search {
  flex: 1 1 260px;
  display: flex; align-items: center; gap: 9px;
  background: var(--bg-panel);
  border: 2px solid var(--ink);
  padding: 10px 14px;
}
.search:focus-within { border-color: var(--primary); }
.search-icon { color: var(--text-faint); flex-shrink: 0; }
.search input {
  flex: 1; background: transparent; border: none; outline: none;
  color: var(--text); font-family: var(--font-body); font-size: 14px;
}
.search input::placeholder { color: var(--text-faint); }

.chips { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  font-family: var(--font-mono);
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: .04em;
  color: var(--text-dim);
  background: var(--bg-panel);
  border: 2px solid var(--ink);
  padding: 8px 14px;
  cursor: pointer;
  transition: all .12s ease;
}
.chip:hover { border-color: var(--primary); color: var(--text); }
.chip.active { background: var(--primary-soft); border-color: var(--primary); color: var(--text); }

.count-note { color: var(--text-faint); font-size: 12px; margin: 14px 2px 0; font-family: var(--font-mono); }

/* ---------- grid & cards ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.card {
  background: var(--bg-panel);
  border: 2px solid var(--ink);
  border-top: 4px solid var(--ink);
  padding: 16px;
  cursor: pointer;
  position: relative;
  transition: transform .14s ease, border-color .14s ease, box-shadow .14s ease;
}
.card:hover { transform: translateY(-3px); }
.card[data-type="motherboards"] { border-top-color: var(--acc-mb); }
.card[data-type="gpus"] { border-top-color: var(--acc-gpu); }
.card[data-type="cpus"] { border-top-color: var(--acc-cpu); }
.card[data-type="memory"] { border-top-color: var(--acc-ram); }
.card[data-type="motherboards"]:hover { border-color: var(--acc-mb); box-shadow: 5px 5px 0 0 rgba(255,210,63,0.18); }
.card[data-type="gpus"]:hover { border-color: var(--acc-gpu); box-shadow: 5px 5px 0 0 rgba(255,93,143,0.18); }
.card[data-type="cpus"]:hover { border-color: var(--acc-cpu); box-shadow: 5px 5px 0 0 rgba(79,214,255,0.18); }
.card[data-type="memory"]:hover { border-color: var(--acc-ram); box-shadow: 5px 5px 0 0 rgba(124,255,107,0.18); }

.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.card-icon { display: flex; align-items: center; gap: 8px; }
.card-icon svg { display: block; image-rendering: pixelated; }

.code-badge {
  font-family: var(--font-mono);
  font-size: 11px; letter-spacing: .04em;
  color: var(--text);
  background: var(--bg-panel-2);
  border: 1px solid var(--ink);
  padding: 3px 8px;
}
.led { display:flex; align-items:center; gap:6px; font-size: 10.5px; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono); }
.led .dot { width: 9px; height: 9px; border-radius: 2px; }

.card h3 { margin: 2px 0 4px; font-size: 16px; color: var(--text); font-weight: 600; }
.card .kicker { color: var(--text-dim); font-size: 11.5px; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 12px; font-family: var(--font-mono); }

.spec-line { display:flex; justify-content: space-between; gap: 10px; font-size: 12.2px; color: var(--text-dim); padding: 4px 0; border-top: 1px dotted var(--ink); font-family: var(--font-mono); }
.spec-line span:last-child { color: var(--text); text-align: right; }

.card-cta { margin-top: 14px; font-size: 11px; color: var(--text-faint); text-transform: uppercase; letter-spacing: .06em; font-family: var(--font-mono); }
.card:hover .card-cta { color: var(--primary); }

/* ---------- status colors ---------- */
.status-ok { background: var(--ok); box-shadow: 0 0 0 3px rgba(89,232,138,0.18); }
.status-warn { background: var(--warn); box-shadow: 0 0 0 3px rgba(255,201,74,0.18); }
.status-bad { background: var(--bad); box-shadow: 0 0 0 3px rgba(255,92,108,0.18); }
.status-mid { background: var(--mid); box-shadow: none; }

/* ---------- empty state ---------- */
.empty { text-align:center; padding: 60px 20px; color: var(--text-faint); font-family: var(--font-mono); font-size: 13px; }

/* ---------- modal ---------- */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(10,9,18,0.82);
  display: flex; align-items: flex-start; justify-content: center;
  padding: 5vh 16px; z-index: 200; overflow-y: auto;
  backdrop-filter: blur(3px);
}
.modal-overlay.hidden { display: none; }

.modal {
  background: var(--bg-panel);
  border: 2px solid var(--primary);
  box-shadow: 8px 8px 0 0 rgba(124,92,255,0.22);
  max-width: 800px; width: 100%;
  padding: 28px 28px 32px;
  position: relative;
}
.modal-close {
  position: absolute; top: 16px; right: 16px;
  background: var(--bg-panel-2); border: 2px solid var(--ink); color: var(--text-dim);
  width: 32px; height: 32px; cursor: pointer;
  font-family: var(--font-mono);
}
.modal-close:hover { color: var(--text); border-color: var(--primary); }

.modal-head { display:flex; align-items:center; gap: 10px; flex-wrap: wrap; margin-bottom: 4px; }
.modal h2 { margin: 8px 0 2px; font-size: 21px; color: var(--text); font-weight: 700; }
.modal .kicker { color: var(--text-dim); font-size: 12px; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 18px; font-family: var(--font-mono); }

.section-title {
  font-family: var(--font-mono);
  font-size: 11px; text-transform: uppercase; letter-spacing: .1em;
  color: var(--primary); margin: 24px 0 12px;
  padding-bottom: 7px;
  border-bottom: 2px solid var(--ink);
  display: flex; align-items: center; gap: 8px;
}
.section-title::before { content: ""; width: 8px; height: 8px; background: var(--primary); flex-shrink: 0; }

.spec-table { width: 100%; border-collapse: collapse; font-size: 12.8px; font-family: var(--font-mono); }
.spec-table tr:nth-child(odd) { background: var(--bg-panel-2); }
.spec-table td { padding: 8px 10px; vertical-align: top; }
.spec-table td:first-child { color: var(--text-dim); width: 40%; white-space: nowrap; }
.spec-table td:last-child { color: var(--text); }
.spec-table tr.unconfirmed td:last-child { color: var(--text-faint); font-style: italic; }

.pill-row { display:flex; flex-wrap:wrap; gap: 8px; }
.pill {
  border: 2px solid var(--ink); background: var(--bg-panel-2);
  padding: 9px 12px; font-size: 12px; color: var(--text-dim); cursor: pointer;
  font-family: var(--font-mono);
}
.pill:hover { border-color: var(--primary); color: var(--text); }
.pill b { color: var(--text); }

.test-item, .photo-item {
  border-left: 4px solid var(--primary);
  padding: 9px 12px; margin-bottom: 8px; font-size: 12.5px; color: var(--text-dim);
  background: var(--bg-panel-2); font-family: var(--font-mono);
}
.test-item b, .photo-item b { color: var(--text); }
.test-result { display:inline-block; margin-left: 8px; font-size: 10.5px; text-transform: uppercase; padding: 2px 9px; border: 1px solid var(--ink); }

.media-row { display:flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
.media-box {
  border: 2px dashed var(--ink);
  padding: 16px; font-size: 11.5px; color: var(--text-faint);
  width: 156px; text-align: center; background: var(--bg-panel-2);
  font-family: var(--font-mono);
}
.media-box a {
  display: inline-block; margin-top: 8px; color: var(--bg);
  background: var(--primary); text-decoration: none;
  padding: 4px 10px; font-size: 11px;
}
.media-box img { max-width: 100%; display:block; margin-bottom: 6px; border: 2px solid var(--ink); }

/* ---------- footer ---------- */
footer {
  border-top: 2px solid var(--ink-soft);
  margin-top: 54px; padding-top: 22px;
  color: var(--text-faint); font-size: 11.5px;
  font-family: var(--font-mono);
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
}
footer .glow { color: var(--primary); }

@media (max-width: 640px) {
  .wrap { padding: 0 14px 40px; }
  header.hero { padding: 34px 0 22px; }
  .modal { padding: 22px 16px 26px; }
}
