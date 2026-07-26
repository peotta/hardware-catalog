/* RETRO//STACK — lógica do catálogo
   Lê CATALOG_DATA (gerado por build.py a partir da planilha) e renderiza
   o dashboard, a grade de itens, busca/filtros e o modal de detalhes. */

(function () {
  const DATA = typeof CATALOG_DATA !== "undefined" ? CATALOG_DATA : null;

  const CATEGORY_META = {
    motherboards: { label: "Placas-mãe", singular: "Placa-mãe", prefix: "MB" },
    gpus: { label: "Placas de vídeo", singular: "Placa de vídeo", prefix: "VG" },
    cpus: { label: "Processadores", singular: "Processador", prefix: "CPU" },
    memory: { label: "Memórias", singular: "Módulo de memória", prefix: "RAM" },
  };

  // Ícones pixel-art (grade 8x8, retângulos alinhados ao pixel — sem
  // anti-aliasing "borrado", fica nítido em qualquer tamanho).
  const ICONS = {
    motherboards: `<svg viewBox="0 0 8 8" width="18" height="18"><rect width="8" height="8" fill="var(--acc-mb)"/><rect x="1" y="1" width="2" height="2" fill="#100e1b"/><rect x="5" y="1" width="2" height="2" fill="#100e1b"/><rect x="1" y="5" width="2" height="2" fill="#100e1b"/><rect x="5" y="5" width="2" height="2" fill="#100e1b"/><rect x="3.5" y="3.5" width="1" height="1" fill="#100e1b"/></svg>`,
    gpus: `<svg viewBox="0 0 8 8" width="18" height="18"><rect width="8" height="6" fill="var(--acc-gpu)"/><rect x="0" y="6" width="1" height="2" fill="var(--acc-gpu)"/><rect x="2" y="6" width="1" height="2" fill="var(--acc-gpu)"/><rect x="4" y="6" width="1" height="2" fill="var(--acc-gpu)"/><rect x="6" y="6" width="1" height="2" fill="var(--acc-gpu)"/><rect x="1" y="1" width="2" height="2" fill="#100e1b"/><rect x="5" y="1" width="2" height="2" fill="#100e1b"/></svg>`,
    cpus: `<svg viewBox="0 0 8 8" width="18" height="18"><rect x="2" y="2" width="4" height="4" fill="var(--acc-cpu)"/><rect x="0" y="1" width="1" height="1" fill="var(--acc-cpu)"/><rect x="0" y="3" width="1" height="1" fill="var(--acc-cpu)"/><rect x="0" y="5" width="1" height="1" fill="var(--acc-cpu)"/><rect x="7" y="1" width="1" height="1" fill="var(--acc-cpu)"/><rect x="7" y="3" width="1" height="1" fill="var(--acc-cpu)"/><rect x="7" y="5" width="1" height="1" fill="var(--acc-cpu)"/><rect x="1" y="0" width="1" height="1" fill="var(--acc-cpu)"/><rect x="3" y="0" width="1" height="1" fill="var(--acc-cpu)"/><rect x="1" y="7" width="1" height="1" fill="var(--acc-cpu)"/><rect x="3" y="7" width="1" height="1" fill="var(--acc-cpu)"/></svg>`,
    memory: `<svg viewBox="0 0 8 8" width="18" height="18"><rect x="0" y="1" width="8" height="5" fill="var(--acc-ram)"/><rect x="1" y="6" width="1" height="1" fill="var(--acc-ram)"/><rect x="3" y="6" width="1" height="1" fill="var(--acc-ram)"/><rect x="5" y="6" width="1" height="1" fill="var(--acc-ram)"/><rect x="1" y="2" width="1" height="3" fill="#100e1b"/><rect x="3" y="2" width="1" height="3" fill="#100e1b"/><rect x="5" y="2" width="1" height="3" fill="#100e1b"/></svg>`,
  };

  const UNCONFIRMED_VALUES = new Set(["não confirmado", "nao confirmado", "—", "não aplicável", "nao aplicavel", ""]);

  function isEmptyValue(v) {
    if (v === null || v === undefined) return true;
    const s = String(v).trim().toLowerCase();
    return UNCONFIRMED_VALUES.has(s);
  }

  function statusClass(status) {
    const s = (status || "").toLowerCase();
    if (s.includes("funcionando") || s.includes("aprovado") || s.includes("detectada")) return "status-ok";
    if (s.includes("reparo") || s.includes("baixada") || s.includes("reprovado")) return "status-bad";
    if (s.includes("diagnóstico") || s.includes("diagnostico") || s.includes("sem vídeo") || s.includes("sem video") || s.includes("inconclusivo")) return "status-warn";
    if (s.includes("não testada") || s.includes("nao testada") || s.includes("pendente")) return "status-mid";
    return "status-mid";
  }

  function findCode(raw) {
    return raw["Código"] || raw["Código do teste"] || raw["Referência"] || "";
  }

  function buildItems() {
    if (!DATA) return [];
    const items = [];

    (DATA.motherboards || []).forEach((raw) => items.push(makeItem("motherboards", raw)));
    (DATA.gpus || []).forEach((raw) => items.push(makeItem("gpus", raw)));
    (DATA.cpus || []).forEach((raw) => items.push(makeItem("cpus", raw)));
    (DATA.memory || []).forEach((raw) => items.push(makeItem("memory", raw)));

    return items;
  }

  function makeItem(type, raw) {
    const code = findCode(raw);
    let title, kicker, previewFields, status;

    if (type === "motherboards") {
      title = `${raw["Fabricante"] || ""} ${raw["Modelo"] || ""}`.trim();
      kicker = raw["Formato"] || "Placa-mãe";
      previewFields = [
        ["Chipset", raw["Chipset principal"]],
        ["Socket", raw["Socket"]],
        ["Memória", raw["Memória suportada"]],
      ];
      status = raw["Estado"];
    } else if (type === "gpus") {
      title = `${raw["Fabricante da placa"] || ""} ${raw["Modelo"] || ""}`.trim();
      kicker = [raw["Fabricante GPU"], raw["Codinome"]].filter(Boolean).join(" · ") || "Placa de vídeo";
      previewFields = [
        ["Memória", raw["Memória"]],
        ["Interface", raw["Interface"]],
        ["Litografia", raw["Litografia"]],
      ];
      status = raw["Estado"];
    } else if (type === "cpus") {
      title = `${raw["Fabricante"] || ""} ${raw["Modelo"] || ""}`.trim();
      kicker = raw["Codinome"] || "Processador";
      previewFields = [
        ["Clock", raw["Clock base"]],
        ["Núcleos/Threads", [raw["Núcleos"], raw["Threads"]].filter(Boolean).join(" / ")],
        ["Cache L2", raw["Cache L2"]],
      ];
      status = raw["Estado"];
    } else if (type === "memory") {
      title = `${raw["Fabricante"] || ""} ${raw["Capacidade"] || ""}`.trim();
      kicker = raw["Tipo"] || "Memória";
      previewFields = [
        ["Capacidade", raw["Capacidade"]],
        ["Clock", raw["Clock nominal"]],
        ["Placa associada", raw["Placa associada"]],
      ];
      status = null;
    }

    return {
      type,
      code,
      title: title || code,
      kicker,
      previewFields: previewFields.filter(([, v]) => !isEmptyValue(v)),
      status,
      raw,
      searchBlob: Object.values(raw).join(" ").toLowerCase(),
    };
  }

  const ITEMS = buildItems();

  // ---------- dashboard stats ----------
  function renderStats() {
    const counts = {
      motherboards: (DATA.motherboards || []).length,
      gpus: (DATA.gpus || []).length,
      cpus: (DATA.cpus || []).length,
      memory: (DATA.memory || []).length,
    };
    const statEl = document.getElementById("stats");
    statEl.innerHTML = Object.entries(CATEGORY_META)
      .map(([key, meta]) => `
        <div class="stat">
          <div class="num">${counts[key]}</div>
          <div class="label">${meta.label}</div>
        </div>`)
      .join("");

    const withStatus = ITEMS.filter((i) => i.status);
    const buckets = { "status-ok": 0, "status-warn": 0, "status-mid": 0, "status-bad": 0 };
    withStatus.forEach((i) => { buckets[statusClass(i.status)]++; });

    const labels = {
      "status-ok": "Funcionando",
      "status-warn": "Atenção / diagnóstico",
      "status-mid": "Não testado",
      "status-bad": "Necessita reparo / baixada",
    };
    const stripEl = document.getElementById("status-strip");
    stripEl.innerHTML = Object.entries(buckets)
      .map(([cls, n]) => `<span><span class="dot ${cls}"></span>${labels[cls]}: ${n}</span>`)
      .join("");
  }

  // ---------- grid ----------
  let activeCategory = "all";
  let query = "";

  function matchesFilter(item) {
    if (activeCategory !== "all" && item.type !== activeCategory) return false;
    if (query && !item.searchBlob.includes(query)) return false;
    return true;
  }

  function renderGrid() {
    const grid = document.getElementById("grid");
    const visible = ITEMS.filter(matchesFilter);
    document.getElementById("count-note").textContent =
      `${visible.length} de ${ITEMS.length} itens exibidos`;

    if (!visible.length) {
      grid.innerHTML = `<div class="empty">Nenhum item encontrado para esse filtro/busca.<br>Ajuste os termos ou limpe os filtros.</div>`;
      return;
    }

    grid.innerHTML = visible.map(cardHTML).join("");

    grid.querySelectorAll("[data-open]").forEach((el) => {
      el.addEventListener("click", () => openModal(el.getAttribute("data-open"), el.getAttribute("data-type")));
    });
  }

  function cardHTML(item) {
    const cls = item.status ? statusClass(item.status) : "status-mid";
    const ledLabel = item.status || "—";
    return `
      <article class="card" data-open="${item.code}" data-type="${item.type}">
        <div class="card-top">
          <div class="card-icon">${ICONS[item.type] || ""}<span class="code-badge">${item.code}</span></div>
          <span class="led"><span class="dot ${cls}"></span>${ledLabel}</span>
        </div>
        <h3>${item.title}</h3>
        <div class="kicker">${item.kicker}</div>
        ${item.previewFields.map(([l, v]) => `<div class="spec-line"><span>${l}</span><span>${v}</span></div>`).join("")}
        <div class="card-cta">Ver ficha completa »</div>
      </article>`;
  }

  // ---------- filters wiring ----------
  function wireToolbar() {
    document.querySelectorAll(".chip[data-cat]").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip[data-cat]").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        activeCategory = chip.getAttribute("data-cat");
        renderGrid();
      });
    });
    document.getElementById("search-input").addEventListener("input", (e) => {
      query = e.target.value.trim().toLowerCase();
      renderGrid();
    });
  }

  // ---------- modal / detail ----------
  function findItemByCode(code) {
    return ITEMS.find((i) => i.code === code);
  }

  function relatedTests(code) {
    return (DATA.tests || []).filter((t) => t["Item"] === code);
  }
  function relatedPhotos(code) {
    return (DATA.photoIndex || []).filter((p) => p["Item"] === code);
  }
  function cpusForBoard(code) {
    return (DATA.cpus || []).filter((c) => c["Placa associada"] === code);
  }
  function memoryForBoard(code) {
    return (DATA.memory || []).filter((m) => m["Placa associada"] === code);
  }

  const HIDDEN_KEYS = new Set(["Imagem", "Manual (URL)"]);

  function specTableHTML(raw, skipKeys) {
    const skip = skipKeys || new Set();
    return `<table class="spec-table">` +
      Object.entries(raw)
        .filter(([k]) => !skip.has(k) && !HIDDEN_KEYS.has(k))
        .map(([k, v]) => {
          const empty = isEmptyValue(v);
          return `<tr class="${empty ? "unconfirmed" : ""}"><td>${k}</td><td>${empty ? "Não confirmado" : v}</td></tr>`;
        })
        .join("") +
      `</table>`;
  }

  const SLOT_ICON = `<svg viewBox="0 0 8 8" width="20" height="20" style="margin-bottom:6px"><rect x="0" y="0" width="2" height="1" fill="currentColor"/><rect x="0" y="0" width="1" height="2" fill="currentColor"/><rect x="6" y="0" width="2" height="1" fill="currentColor"/><rect x="7" y="0" width="1" height="2" fill="currentColor"/><rect x="0" y="6" width="1" height="2" fill="currentColor"/><rect x="0" y="7" width="2" height="1" fill="currentColor"/><rect x="7" y="6" width="1" height="2" fill="currentColor"/><rect x="6" y="7" width="2" height="1" fill="currentColor"/></svg>`;

  // Convenção de nomes: por padrão a foto de um item é <código>.JPG e o
  // manual é <código>.PDF (ex.: MB-001.JPG, MB-001.PDF), sem precisar
  // mexer na planilha. Se os seus arquivos usarem outra extensão/caixa,
  // troque as constantes abaixo.
  const IMAGE_EXT = "JPG";
  const MANUAL_EXT = "PDF";

  // A planilha ainda pode sobrescrever o padrão, se quiser: preencha a
  // coluna "Imagem" ou "Manual (URL)" do item com um nome de arquivo
  // diferente ou uma URL completa (https://...).
  function resolveImage(raw, code) {
    const custom = raw["Imagem"];
    if (!isEmptyValue(custom)) {
      return String(custom).startsWith("http") ? custom : `images/${custom}`;
    }
    return `images/${code}.${IMAGE_EXT}`;
  }
  function resolveManual(raw, code) {
    const custom = raw["Manual (URL)"];
    if (!isEmptyValue(custom)) {
      return String(custom).startsWith("http") ? custom : `manuals/${custom}`;
    }
    return `manuals/${code}.${MANUAL_EXT}`;
  }

  function mediaBoxHTML(raw, code) {
    const imgSrc = resolveImage(raw, code);
    return `<div class="media-row">
      <div class="media-box" id="media-photo-${code}">
        <img src="${imgSrc}" alt="Foto de ${code}" data-photo-code="${code}">
      </div>
      <div class="media-box" id="media-manual-${code}">
        ${SLOT_ICON}<br>verificando manual...
      </div>
    </div>`;
  }

  // Roda depois que o HTML do modal já está no DOM: trata o caso da foto
  // não existir (evento "error" da <img>) e checa se o manual existe de
  // fato (HEAD request) antes de mostrar o link de download.
  function wireMedia(raw, code) {
    const photoBox = document.getElementById(`media-photo-${code}`);
    const img = photoBox ? photoBox.querySelector("img") : null;
    if (img) {
      img.addEventListener("error", () => {
        photoBox.innerHTML = `${SLOT_ICON}<br>Foto ainda não cadastrada<br><span style="opacity:.7">(coloque ${code}.${IMAGE_EXT} em images/)</span>`;
      }, { once: true });
    }

    const manualBox = document.getElementById(`media-manual-${code}`);
    const manualHref = resolveManual(raw, code);
    if (manualBox) {
      fetch(manualHref, { method: "HEAD" })
        .then((res) => {
          if (!res.ok) throw new Error("not found");
          manualBox.innerHTML = `${SLOT_ICON}<br>Manual técnico<a href="${manualHref}" target="_blank" rel="noopener">Abrir PDF »</a>`;
        })
        .catch(() => {
          manualBox.innerHTML = `${SLOT_ICON}<br>Manual ainda não cadastrado<br><span style="opacity:.7">(coloque ${code}.${MANUAL_EXT} em manuals/)</span>`;
        });
    }
  }

  function openModal(code, type) {
    const item = findItemByCode(code);
    if (!item) return;
    const overlay = document.getElementById("modal-overlay");
    const body = document.getElementById("modal-body");

    let html = `
      <div class="modal-head">
        <div class="card-icon">${ICONS[type] || ""}<span class="code-badge">${item.code}</span></div>
        ${item.status ? `<span class="led"><span class="dot ${statusClass(item.status)}"></span>${item.status}</span>` : ""}
      </div>
      <h2>${item.title}</h2>
      <div class="kicker">${item.kicker}</div>

      ${mediaBoxHTML(item.raw, item.code)}

      <div class="section-title">Ficha técnica</div>
      ${specTableHTML(item.raw)}
    `;

    if (type === "motherboards") {
      const cpus = cpusForBoard(code);
      const mems = memoryForBoard(code);
      if (cpus.length) {
        html += `<div class="section-title">Processador(es) instalado(s)</div><div class="pill-row">` +
          cpus.map((c) => `<div class="pill" data-open="${c["Código"]}" data-type="cpus"><b>${c["Código"]}</b> — ${c["Fabricante"]} ${c["Modelo"]}</div>`).join("") +
          `</div>`;
      }
      if (mems.length) {
        html += `<div class="section-title">Memória instalada</div><div class="pill-row">` +
          mems.map((m) => `<div class="pill" data-open="${m["Código"]}" data-type="memory"><b>${m["Código"]}</b> — ${m["Fabricante"]} ${m["Capacidade"]}</div>`).join("") +
          `</div>`;
      }
    }

    if ((type === "cpus" || type === "memory") && item.raw["Placa associada"]) {
      const mbCode = item.raw["Placa associada"];
      const mb = (DATA.motherboards || []).find((m) => m["Código"] === mbCode);
      if (mb) {
        html += `<div class="section-title">Placa associada</div><div class="pill-row">
          <div class="pill" data-open="${mb["Código"]}" data-type="motherboards"><b>${mb["Código"]}</b> — ${mb["Fabricante"]} ${mb["Modelo"]}</div>
        </div>`;
      }
    }

    const tests = relatedTests(code);
    if (tests.length) {
      html += `<div class="section-title">Histórico de testes</div>` +
        tests.map((t) => `
          <div class="test-item">
            <b>${t["Código do teste"]}</b> — ${t["Tipo de teste"]}
            <span class="test-result ${statusClass(t["Resultado"])}">${t["Resultado"]}</span><br>
            ${t["Condição/cenário"] || ""}<br>
            <span style="color:var(--text-faint)">${t["Conclusão"] || ""}</span>
          </div>`).join("");
    }

    const photos = relatedPhotos(code);
    if (photos.length) {
      html += `<div class="section-title">Índice de fotos (anexos do cadastro original)</div>` +
        photos.map((p) => `
          <div class="photo-item"><b>${p["Referência"]}</b> — ${p["Conteúdo das imagens"]}</div>`).join("");
    }

    body.innerHTML = html;
    body.querySelectorAll("[data-open]").forEach((el) => {
      el.addEventListener("click", () => openModal(el.getAttribute("data-open"), el.getAttribute("data-type")));
    });
    wireMedia(item.raw, item.code);

    overlay.classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("modal-overlay").classList.add("hidden");
  }

  function wireModal() {
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // ---------- boot sequence: barra de loading estilo jogo retrô ----------
  function runBoot() {
    const boot = document.getElementById("boot");
    const label = document.getElementById("boot-label");
    if (!boot) return;

    const total = ITEMS.length;
    const messages = [
      "lendo planilha...",
      `indexando ${total} itens...`,
      "cruzando CPU/RAM ↔ placas...",
      "pronto!",
    ];
    let i = 0;
    const tick = () => {
      if (label) label.textContent = messages[i] || messages[messages.length - 1];
      i++;
    };
    tick();
    const interval = setInterval(tick, 300);

    const dismiss = () => {
      clearInterval(interval);
      boot.classList.add("hidden");
    };
    boot.addEventListener("click", dismiss);
    setTimeout(dismiss, 1300);
  }

  // ---------- init ----------
  document.addEventListener("DOMContentLoaded", () => {
    if (!DATA) {
      document.getElementById("grid").innerHTML =
        `<div class="empty">Não foi possível carregar assets/data.js.<br>Rode <code>python3 build.py</code> para gerá-lo a partir da planilha.</div>`;
      return;
    }
    renderStats();
    renderGrid();
    wireToolbar();
    wireModal();
    runBoot();
  });
})();
