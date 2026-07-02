/**
 * renderer.js — Study Hub
 * Universal DOM construction engine. Zero innerHTML. Maps typed JSON schema
 * sections to existing style.css class names.
 */

// ─── Core DOM helper ────────────────────────────────────────────────────────

function el(tag, classes = [], text = null) {
  const node = document.createElement(tag);
  if (typeof classes === 'string') {
    if (classes) node.className = classes;
  } else {
    classes.forEach(c => { if (c) node.classList.add(c); });
  }
  if (text !== null) node.textContent = String(text);
  return node;
}

function append(parent, ...children) {
  children.forEach(c => { if (c) parent.appendChild(c); });
  return parent;
}

// ─── Color → CSS class map (matches style.css card-title variants) ──────────

const COLOR_MAP = {
  blue:   'blue',
  green:  'green',
  gold:   'gold',
  purple: 'purple',
  pink:   'pink',
  red:    'red',
  orange: 'orange',
  cyan:   'cyan',
  default: ''
};

const INFOBOX_COLOR = {
  red:    'red',
  gold:   'gold',
  green:  'green',
  purple: 'purple',
  pink:   'pink',
  blue:   '',       // base info-box is blue by default
  cyan:   '',
  orange: '',
  default: ''
};

// Temporary cache used during mountTab to preserve existing static island DOM nodes
let _islandCacheGlobal = null;

// ─── Section dispatcher ──────────────────────────────────────────────────────

function renderSection(section) {
  if (!section || typeof section.type !== 'string') return null;
  switch (section.type) {
    case 'card':            return renderCard(section);
    case 'grid':            return renderGrid(section);
    case 'vocab_table':     return renderVocabTable(section);
    case 'vocab_grid':      return renderVocabGrid(section);
    case 'conjugation_grid': return renderConjugationGrid(section);
    case 'info_box':        return renderInfoBox(section);
    case 'info_grid':       return renderInfoGrid(section);
    case 'irregular_verbs': return renderIrregularVerbs(section);
    case 'frequency_scale': return renderFrequencyScale(section);
    case 'hiragana_grid':   return renderKanaGrid(section, false);
    case 'katakana_grid':   return renderKanaGrid(section, true);
    case 'static_island':   return handleStaticIsland(section);
    default:
      console.warn(`[Renderer] Unknown section type: ${section.type}`);
      return null;
  }
}

// ─── Static Islands — leave existing DOM node untouched ──────────────────────

function handleStaticIsland(section) {
  // Prefer the mountTab cache (preserved while we clear/replace the container)
  if (_islandCacheGlobal && _islandCacheGlobal.has(section.id)) {
    return _islandCacheGlobal.get(section.id);
  }
  const existing = document.getElementById(section.id);
  if (existing) return existing; // already in DOM, caller re-appends it
  return null;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function renderCard(section) {
  const card = el('div', 'card');

  if (section.title) {
    const titleColor = COLOR_MAP[section.color] || '';
    const h3 = el('h3', ['card-title', titleColor].filter(Boolean), section.title);
    card.appendChild(h3);
  }

  if (section.subtitle) {
    const sub = el('p', 'vocab-en');
    sub.style.fontSize = '13px';
    sub.style.marginBottom = '1rem';
    sub.style.textAlign = 'center';
    sub.textContent = section.subtitle;
    card.appendChild(sub);
  }

  // note_top
  if (section.note_top) {
    card.appendChild(renderRawInfoBox(section.note_top));
  }

  // items as grid inside card (used in adverbs frequency items, writing expressions)
  if (Array.isArray(section.items) && !section.children) {
    const grid = el('div', 'grid-2');
    grid.style.gap = '1rem';
    section.items.forEach(item => {
      const box = el('div', 'info-box');
      box.style.margin = '0';
      const accent = el('p', 'accent-text', item.en);
      const word = el('p', 'vocab-jp');
      word.style.fontSize = '1.25rem';
      word.textContent = item.jp || item.fr || '';
      if (item.example) {
        const ex = el('p', 'vocab-en');
        ex.style.fontSize = '11px';
        ex.style.marginTop = '0.25rem';
        ex.textContent = item.example;
        append(box, accent, word, ex);
      } else {
        append(box, accent, word);
      }
      if (item.fullWidth) box.style.gridColumn = '1 / -1';
      grid.appendChild(box);
    });
    card.appendChild(grid);
  }

  // groups — labelled article/partitive sub-sections (e.g. Definite & Indefinite Articles)
  if (Array.isArray(section.groups)) {
    section.groups.forEach(group => {
      const groupWrap = el('div');
      groupWrap.style.marginBottom = '1.5rem';

      const groupLabel = el('p', 'accent-text');
      groupLabel.style.color = group.labelColor || '#60a5fa';
      groupLabel.style.marginBottom = '0.5rem';
      groupLabel.textContent = group.label || '';
      groupWrap.appendChild(groupLabel);

      const variantClass = INFOBOX_COLOR[group.variant] || '';
      const itemGrid = el('div', 'grid-2');
      itemGrid.style.gap = '0.5rem';

      if (Array.isArray(group.items)) {
        group.items.forEach(item => {
          const box = el('div', ['info-box', variantClass].filter(Boolean));
          box.style.cssText = 'margin:0;padding:0.5rem;';
          const fr = el('span', 'vocab-fr', item.fr || '');
          const en = el('span', 'vocab-en');
          en.style.fontSize = '12px';
          en.textContent = ' ' + (item.en || '');
          append(box, fr, en);
          itemGrid.appendChild(box);
        });
      }
      groupWrap.appendChild(itemGrid);
      card.appendChild(groupWrap);
    });
  }

  // children sections
  if (Array.isArray(section.children)) {
    section.children.forEach(child => {
      const node = renderSection(child);
      if (node) card.appendChild(node);
    });
  }

  // info_boxes
  if (Array.isArray(section.info_boxes)) {
    section.info_boxes.forEach(ib => card.appendChild(renderRawInfoBox(ib)));
  }

  // table (single vocab table inside card)
  if (section.table && !Array.isArray(section.table)) {
    card.appendChild(renderVocabTable({ ...section.table, items: section.table.items }));
  }

  // tables (array of vocab tables inside card)
  if (Array.isArray(section.tables)) {
    const tgrid = el('div', 'grid-2');
    section.tables.forEach(t => tgrid.appendChild(renderVocabTable(t)));
    card.appendChild(tgrid);
  }

  // conjugation_tables
  if (Array.isArray(section.conjugation_tables)) {
    const cgrid = el('div', 'grid-3');
    section.conjugation_tables.forEach(ct => cgrid.appendChild(renderConjTable(ct)));
    card.appendChild(cgrid);
  }

  // tense_grid (masu form tenses)
  if (Array.isArray(section.tense_grid)) {
    const tgrid = el('div', 'grid-4');
    section.tense_grid.forEach(tg => {
      const box = el('div', ['info-box', INFOBOX_COLOR[tg.variant] || ''].filter(Boolean));
      box.style.margin = '0';
      const accent = el('p', 'accent-text', tg.label);
      const jp = el('p', 'vocab-jp');
      jp.style.fontSize = '1.25rem';
      jp.textContent = tg.jp;
      const ex = el('p', 'vocab-en');
      ex.style.fontSize = '11px';
      ex.style.marginTop = '4px';
      ex.textContent = tg.example;
      append(box, accent, jp, ex);
      tgrid.appendChild(box);
    });
    card.appendChild(tgrid);
  }

  // participe_tables (passé composé)
  if (Array.isArray(section.participe_tables)) {
    const pgrid = el('div', 'grid-3');
    section.participe_tables.forEach(pt => pgrid.appendChild(renderVocabTable(pt)));
    card.appendChild(pgrid);
  }

  // te_rules
  if (Array.isArray(section.te_rules)) {
    section.te_rules.forEach(group => {
      const tableDiv = el('div', 'vocab-table');
      tableDiv.style.marginTop = '1rem';
      const header = el('div', 'vocab-header', group.header);
      if (group.headerColor) header.style.color = group.headerColor;
      tableDiv.appendChild(header);
      const items = el('div', 'vocab-items');
      group.rules.forEach(rule => {
        const row = el('div', 'vocab-item');
        append(row,
          el('span', 'vocab-en', rule.condition),
          el('span', 'vocab-jp', rule.result + (rule.example ? ' — ' + rule.example : ''))
        );
        items.appendChild(row);
      });
      tableDiv.appendChild(items);
      if (group.note) tableDiv.appendChild(renderRawInfoBox(group.note));
      card.appendChild(tableDiv);
    });
  }

  // question_words (grammar tab WH questions)
  if (Array.isArray(section.question_words)) {
    const grid = el('div', 'grid-2');
    section.question_words.forEach(qw => {
      const box = el('div', 'info-box');
      box.style.margin = '0';
      if (qw.fullWidth) box.style.gridColumn = '1 / -1';
      const accent = el('p', 'accent-text', qw.en);
      const fr = el('p', 'vocab-fr');
      fr.style.fontSize = '1.25rem';
      fr.textContent = qw.fr;
      append(box, accent, fr);
      if (qw.note) {
        const n = el('p', 'vocab-en');
        n.style.fontSize = '11px';
        n.style.marginTop = '0.5rem';
        n.textContent = qw.note;
        box.appendChild(n);
      }
      grid.appendChild(box);
    });
    card.appendChild(grid);
    // question_structures sub-section
    if (Array.isArray(section.question_structures)) {
      const divider = el('div');
      divider.style.marginTop = '2rem';
      divider.style.borderTop = '1px solid rgba(255,255,255,0.1)';
      divider.style.paddingTop = '1.5rem';
      const qgrid = el('div', 'grid-2');
      section.question_structures.forEach(qs => {
        const box = el('div', ['info-box', INFOBOX_COLOR[qs.variant] || ''].filter(Boolean));
        box.style.margin = '0';
        const accent = el('p', 'accent-text', qs.label);
        const fr = el('p', 'vocab-fr');
        fr.style.fontSize = '1.25rem';
        fr.textContent = qs.fr;
        const en = el('p', 'vocab-en');
        en.style.fontSize = '12px';
        en.style.marginTop = '0.5rem';
        en.textContent = qs.en + ' — ' + qs.example;
        append(box, accent, fr, en);
        qgrid.appendChild(box);
      });
      append(divider, qgrid);
      card.appendChild(divider);
    }
  }

  // frequency_scale inside card
  if (Array.isArray(section.frequency_scale)) {
    const labelRow = el('div');
    labelRow.style.cssText = 'display:flex;justify-content:space-between;font-size:11px;text-transform:uppercase;font-weight:bold;color:#94a3b8;margin-bottom:0.5rem;';
    append(labelRow, el('span', '', 'Never'), el('span', '', 'Always'));
    card.appendChild(labelRow);

    const bar = el('div');
    bar.style.cssText = 'height:0.5rem;background:linear-gradient(to right,#ef4444,#f59e0b,#10b981);border-radius:1rem;margin-bottom:1.5rem;';
    card.appendChild(bar);

    const grid = el('div', 'grid-4');
    section.frequency_scale.forEach(item => {
      const box = el('div', 'info-box');
      box.style.cssText = 'margin:0;border-left-color:' + (item.color || '#60a5fa');
      const accent = el('p', 'accent-text', item.en);
      const fr = el('p', 'vocab-fr', item.fr);
      append(box, accent, fr);
      grid.appendChild(box);
    });
    card.appendChild(grid);
  }

  // info_box (single, on vocab cards like body parts pain)
  if (section.info_box && !Array.isArray(section.info_box)) {
    card.appendChild(renderRawInfoBox(section.info_box));
  }

  // note_bottom
  if (section.note_bottom) {
    card.appendChild(renderRawInfoBox(section.note_bottom));
  }

  // note (plain)
  if (section.note && typeof section.note === 'object' && section.note.text) {
    card.appendChild(renderRawInfoBox(section.note));
  }

  return card;
}

// ─── Grid layout ─────────────────────────────────────────────────────────────

function renderGrid(section) {
  const cols = section.cols === 3 ? 'grid-3' : 'grid-2';
  const wrap = el('div', cols);
  if (Array.isArray(section.children)) {
    section.children.forEach(child => {
      const node = renderSection(child);
      if (node) wrap.appendChild(node);
    });
  }
  return wrap;
}

// ─── Vocab Table ──────────────────────────────────────────────────────────────

function renderVocabTable(section) {
  const tableDiv = el('div', 'vocab-table');
  if (section.header || section.title) {
    const hdr = el('div', 'vocab-header', section.header || section.title);
    if (section.headerColor) hdr.style.color = section.headerColor;
    tableDiv.appendChild(hdr);
  }
  if (section.note && typeof section.note === 'string') {
    const noteEl = el('p', 'vocab-en');
    noteEl.style.fontSize = '12px';
    noteEl.style.margin = '0.5rem 1rem';
    noteEl.textContent = section.note;
    tableDiv.appendChild(noteEl);
  }
  const items = el('div', 'vocab-items');
  if (Array.isArray(section.items)) {
    section.items.forEach(item => {
      // Sub-header rows (adjective table type dividers)
      if (item.sub) {
        const subrow = el('div', 'vocab-item');
        subrow.style.borderBottom = 'none';
        const accent = el('span', 'accent-text');
        accent.style.color = '#60a5fa';
        accent.textContent = item.sub;
        subrow.appendChild(accent);
        items.appendChild(subrow);
        if (!item.en) return;
      }
      const row = el('div', 'vocab-item');
      const enSpan = el('span', item.jp !== undefined ? 'vocab-en' : 'vocab-en', item.en || '');
      const langSpan = el('span',
        item.jp !== undefined ? 'vocab-jp' : 'vocab-fr',
        item.jp !== undefined ? item.jp : (item.fr || '')
      );
      append(row, enSpan, langSpan);
      items.appendChild(row);
    });
  }
  tableDiv.appendChild(items);
  if (section.note && typeof section.note === 'object') {
    tableDiv.appendChild(renderRawInfoBox(section.note));
  }
  return tableDiv;
}

// ─── Vocab Grid (multiple tables in a grid) ───────────────────────────────────

function renderVocabGrid(section) {
  const cols = section.cols === 3 ? 'grid-3' : 'grid-2';
  const wrap = el('div', ['vocab-grid', cols]);
  if (section.title) {
    const h3 = el('h3', 'card-title', section.title);
    wrap.style.gridColumn = '1 / -1';
    // title needs to be outside grid — wrap in a fragment
    const outer = el('div');
    outer.appendChild(h3);
    outer.appendChild(wrap);
    // rebuild — return outer instead
    if (Array.isArray(section.tables)) {
      section.tables.forEach(t => wrap.appendChild(renderVocabTable(t)));
    }
    return outer;
  }
  if (Array.isArray(section.tables)) {
    section.tables.forEach(t => wrap.appendChild(renderVocabTable(t)));
  }
  return wrap;
}

// ─── Conjugation Grid (single table: header + pronoun/form rows) ─────────────

function renderConjugationGrid(section) {
  return renderConjTable(section);
}

function renderConjTable(ct) {
  const tableDiv = el('div', 'vocab-table');
  tableDiv.style.margin = '0';
  const hdr = el('div', 'vocab-header', ct.header || ct.title || '');
  if (ct.headerColor) hdr.style.color = ct.headerColor;
  tableDiv.appendChild(hdr);
  const items = el('div', 'vocab-items');
  if (Array.isArray(ct.rows)) {
    ct.rows.forEach(row => {
      const rowEl = el('div', 'vocab-item');
      append(rowEl,
        el('span', 'vocab-en', row.pronoun || row.p || ''),
        el('span', 'vocab-fr', row.form || row.f || '')
      );
      items.appendChild(rowEl);
    });
  }
  tableDiv.appendChild(items);
  return tableDiv;
}

// ─── Info Box ─────────────────────────────────────────────────────────────────

function renderInfoBox(section) {
  return renderRawInfoBox(section);
}

function renderRawInfoBox(ib) {
  const colorClass = INFOBOX_COLOR[ib.variant || ib.color] || '';
  const box = el('div', ['info-box', colorClass].filter(Boolean));

  if (ib.title) {
    const strong = el('strong', '', ib.title);
    box.appendChild(strong);
  }
  if (ib.label) {
    const accent = el('p', 'accent-text', ib.label);
    box.appendChild(accent);
  }
  // body / text may contain HTML tags like <b>, <em> — safe subset via textContent chunks
  const bodyText = ib.body || ib.text || ib.en || '';
  if (bodyText) {
    const p = el('p');
    p.style.fontSize = '13px';
    p.style.lineHeight = '1.5';
    // Strip unsafe tags, allow only b/em/i via manual parse
    p.innerHTML = sanitizeBasicHTML(bodyText);
    box.appendChild(p);
  }
  // French / Japanese word
  if (ib.fr || ib.jp) {
    const word = el('p', ib.jp ? 'vocab-jp' : 'vocab-fr');
    word.style.fontSize = '1.5rem';
    word.textContent = ib.fr || ib.jp;
    box.appendChild(word);
  }
  if (ib.example) {
    const ex = el('p', 'vocab-en');
    ex.style.fontSize = '12px';
    ex.style.marginTop = '0.5rem';
    ex.style.fontStyle = 'italic';
    ex.textContent = ib.example;
    box.appendChild(ex);
  }
  if (Array.isArray(ib.examples)) {
    ib.examples.forEach(e => {
      const exEl = el('p', 'vocab-en');
      exEl.style.fontSize = '12px';
      exEl.style.fontStyle = 'italic';
      exEl.textContent = e.ex || e.fr || e.jp || '';
      box.appendChild(exEl);
    });
  }
  return box;
}

// ─── Info Grid (demonstratives, partitives) ────────────────────────────────

function renderInfoGrid(section) {
  const card = el('div', 'card');
  const colorClass = COLOR_MAP[section.color] || '';
  const h3 = el('h3', ['card-title', colorClass].filter(Boolean), section.title || '');
  card.appendChild(h3);

  const grid = el('div', 'grid-2');
  grid.style.gap = '1rem';

  if (Array.isArray(section.items)) {
    section.items.forEach(item => {
      const variantClass = INFOBOX_COLOR[section.variant] || '';
      const box = el('div', ['info-box', variantClass].filter(Boolean));
      box.style.margin = '0';
      const accent = el('p', 'accent-text');
      accent.style.color = item.labelColor || '#60a5fa';
      accent.textContent = item.label;
      const fr = el('p', 'vocab-fr');
      fr.style.fontSize = '1.25rem';
      fr.textContent = item.fr;
      const ex = el('p', 'vocab-en');
      ex.style.fontSize = '11px';
      ex.style.marginTop = '0.5rem';
      ex.textContent = 'Ex: ' + item.example;
      append(box, accent, fr, ex);
      grid.appendChild(box);
    });
  }
  card.appendChild(grid);

  if (section.note) {
    card.appendChild(renderRawInfoBox(section.note));
  }
  return card;
}

// ─── Irregular Verbs (2-col card grid) ────────────────────────────────────────

function renderIrregularVerbs(section) {
  const outer = el('div');

  if (section.title) {
    const h3 = el('h3', 'card-title');
    h3.style.marginTop = '2rem';
    h3.textContent = section.title;
    outer.appendChild(h3);
  }

  const grid = el('div', ['vocab-grid', 'grid-2']);

  if (Array.isArray(section.verbs)) {
    section.verbs.forEach(v => {
      const card = el('div', 'card');
      const colorClass = COLOR_MAP[v.color] || '';
      const titleDiv = el('div', ['card-title', colorClass].filter(Boolean));
      const icon = el('span', '', v.icon || '');
      const h4 = el('h4', '', `${v.fr} (${v.en})`);
      append(titleDiv, icon, h4);
      card.appendChild(titleDiv);

      const items = el('div', 'vocab-items');
      if (Array.isArray(v.rows)) {
        v.rows.forEach(row => {
          const rowEl = el('div', 'vocab-item');
          append(rowEl,
            el('span', 'vocab-en', row.p),
            el('span', 'vocab-fr', row.f)
          );
          items.appendChild(rowEl);
        });
      }
      card.appendChild(items);
      grid.appendChild(card);
    });
  }
  outer.appendChild(grid);
  return outer;
}

// ─── Frequency Scale ─────────────────────────────────────────────────────────

function renderFrequencyScale(section) {
  const card = el('div', 'card');
  const colorClass = COLOR_MAP[section.color] || 'gold';
  const h3 = el('h3', ['card-title', colorClass].filter(Boolean), section.title || '');
  card.appendChild(h3);

  // Labels
  const labelRow = el('div');
  labelRow.style.cssText = 'display:flex;justify-content:space-between;font-size:11px;text-transform:uppercase;font-weight:bold;color:#94a3b8;margin-bottom:0.5rem;';
  append(labelRow, el('span', '', 'Never'), el('span', '', 'Always'));
  card.appendChild(labelRow);

  // Gradient bar
  const bar = el('div');
  bar.style.cssText = 'height:0.5rem;background:linear-gradient(to right,#ef4444,#f59e0b,#10b981);border-radius:1rem;margin-bottom:1.5rem;';
  card.appendChild(bar);

  const grid = el('div', 'grid-4');
  if (Array.isArray(section.frequency_scale || section.items)) {
    (section.frequency_scale || section.items).forEach(item => {
      const box = el('div', 'info-box');
      box.style.cssText = 'margin:0;border-left-color:' + (item.color || '#60a5fa');
      const accent = el('p', 'accent-text', item.en);
      const fr = el('p', 'vocab-fr', item.fr);
      append(box, accent, fr);
      grid.appendChild(box);
    });
  }
  card.appendChild(grid);
  return card;
}

// ─── Kana Grid (Hiragana / Katakana) ─────────────────────────────────────────

function renderKanaGrid(section, isKatakana) {
  const card = el('div', 'card');
  const colorClass = isKatakana ? 'orange' : 'blue';
  const h3 = el('h3', ['card-title', colorClass].filter(Boolean), section.title || '');
  card.appendChild(h3);

  const grid = el('div', 'grid-5');
  if (Array.isArray(section.rows)) {
    section.rows.forEach(row => {
      row.forEach(char => {
        const charEl = el('div',
          char === '' ? ['grid-char', 'empty'] : ['grid-char', isKatakana ? 'orange-bg' : ''].filter(Boolean),
          char
        );
        grid.appendChild(charEl);
      });
    });
  }
  card.appendChild(grid);
  return card;
}

// ─── Minimal HTML sanitizer (allows b, em, i, strong, span, br) ──────────────

function sanitizeBasicHTML(str) {
  if (typeof str !== 'string') return '';
  // Allow only safe inline tags with no attributes.
  return str
    .replace(/<\s*(\/?\s*)(b|em|i|strong|br)\b[^>]*>/gi, '<$1$2>')
    .replace(/<(?!\/?(?:b|em|i|strong|br)\b)[^>]*>/gi, '')
    .replace(/javascript:/gi, '');
}

// ─── Vocab sub-tab renderer (for verbs sub-tabs) ─────────────────────────────

function renderSubTabs(subTabsData, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(subTabsData)) return;

  // Build inner nav
  const navDiv = el('div', 'inner-nav-tabs');
  subTabsData.forEach((st, i) => {
    const btn = el('button', ['inner-tab-btn', i === 0 ? 'active' : ''].filter(Boolean), st.label);
    btn.addEventListener('click', e => openSubTab(e, st.id, container));
    navDiv.appendChild(btn);
  });
  container.appendChild(navDiv);

  // Build panels
  subTabsData.forEach((st, i) => {
    const panel = el('div', 'inner-tab-content');
    panel.id = st.id;
    panel.style.display = i === 0 ? 'block' : 'none';
    if (Array.isArray(st.sections)) {
      st.sections.forEach(sec => {
        const node = renderSection(sec);
        if (node) panel.appendChild(node);
      });
    }
    container.appendChild(panel);
  });
}

function openSubTab(evt, tabName, container) {
  container.querySelectorAll('.inner-tab-content').forEach(el => el.style.display = 'none');
  container.querySelectorAll('.inner-tab-btn').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(tabName);
  if (target) target.style.display = 'block';
  evt.currentTarget.classList.add('active');
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Mount an array of sections into a tab container div by ID.
 * @param {string} tabId
 * @param {Array} sections
 */

export function mountTab(tabId, sections) {
  const container = document.getElementById(tabId);
  if (!container) {
    console.error(`[Renderer] mountTab: container #${tabId} not found`);
    return;
  }

  // Cache static islands before clearing
  const islandCache = new Map();
  function cacheIslands(arr) {
    if (!Array.isArray(arr)) return;
    arr.forEach(s => {
      if (s.type === 'static_island' && s.id) {
        const existing = document.getElementById(s.id);
        if (existing) islandCache.set(s.id, existing);
      }
      if (s.children) cacheIslands(s.children);
      if (s.sections) cacheIslands(s.sections);
    });
  }
  cacheIslands(sections);

  // Expose the cache globally during the mount operation so nested render calls
  // (renderSection -> handleStaticIsland) can resolve cached islands too.
  _islandCacheGlobal = islandCache;

  // Clear safely
  while (container.firstChild) container.removeChild(container.firstChild);

  const frag = document.createDocumentFragment();
  sections.forEach(sec => {
    let node;
    if (sec.type === 'static_island') {
      node = islandCache.get(sec.id) || null;
    } else {
      node = renderSection(sec);
    }
    if (node) frag.appendChild(node);
  });
  container.appendChild(frag);

  // Clear the temporary global cache after mounting so future mounts aren't affected
  _islandCacheGlobal = null;
}

/**
 * Mount sub-tabs (verbs section) into a container.
 * @param {string} containerId
 * @param {Array} subTabs  — array of { id, label, sections[] }
 */
export function mountSubTabs(containerId, subTabs) {
  renderSubTabs(subTabs, containerId);
}

/**
 * Mount a vocabulary category (tables array) into a category div.
 * @param {string} categoryId
 * @param {Array} tables
 */
export function mountVocabCategory(categoryId, tables) {
  const container = document.getElementById(categoryId);
  if (!container) return;
  while (container.firstChild) container.removeChild(container.firstChild);
  const frag = document.createDocumentFragment();
  tables.forEach(t => {
    const node = renderVocabTable(t);
    if (node) frag.appendChild(node);
  });
  container.appendChild(frag);
}

/**
 * Build search result cards from normalized dictionaryapi.dev response.
 * @param {Object|null} result — normalized { word, phonetic, meanings[] }
 * @param {HTMLElement} container
 */
export function renderSearchResult(result, container) {
  while (container.firstChild) container.removeChild(container.firstChild);

  if (!result) {
    const msg = el('div', 'info-box');
    msg.textContent = 'No definition found. Try another word.';
    container.appendChild(msg);
    return;
  }

  const card = el('div', 'card');

  // Word + phonetic
  const wordRow = el('div', 'vocab-item');
  const wordEl = el('span', 'vocab-fr');
  wordEl.style.fontSize = '1.5rem';
  wordEl.textContent = result.word;
  wordRow.appendChild(wordEl);
  if (result.phonetic) {
    const ph = el('span', 'vocab-en');
    ph.style.fontSize = '14px';
    ph.style.fontStyle = 'italic';
    ph.textContent = result.phonetic;
    wordRow.appendChild(ph);
  }
  card.appendChild(wordRow);

  // Meanings
  result.meanings.forEach(meaning => {
    const posEl = el('p', 'accent-text');
    posEl.style.marginTop = '1rem';
    posEl.textContent = meaning.partOfSpeech;
    card.appendChild(posEl);

    const tableDiv = el('div', 'vocab-table');
    const itemsDiv = el('div', 'vocab-items');
    meaning.definitions.slice(0, 4).forEach((def, i) => {
      const row = el('div', 'vocab-item');
      row.style.flexDirection = 'column';
      row.style.alignItems = 'flex-start';
      row.style.gap = '0.25rem';
      const defText = el('p', 'vocab-en');
      defText.style.fontSize = '13px';
      defText.textContent = `${i + 1}. ${def.definition}`;
      row.appendChild(defText);
      if (def.example) {
        const exText = el('p', 'vocab-en');
        exText.style.fontSize = '12px';
        exText.style.fontStyle = 'italic';
        exText.style.color = '#64748b';
        exText.textContent = `"${def.example}"`;
        row.appendChild(exText);
      }
      itemsDiv.appendChild(row);
    });
    tableDiv.appendChild(itemsDiv);
    card.appendChild(tableDiv);
  });

  container.appendChild(card);
}

/**
 * Render a loading state into a container.
 * @param {HTMLElement} container
 */
export function renderLoading(container) {
  while (container.firstChild) container.removeChild(container.firstChild);
  const box = el('div', 'info-box');
  box.style.textAlign = 'center';
  box.textContent = 'Searching…';
  container.appendChild(box);
}

/**
 * Render an error state into a container.
 * @param {HTMLElement} container
 * @param {string} message
 */
export function renderError(container, message) {
  while (container.firstChild) container.removeChild(container.firstChild);
  const box = el('div', ['info-box', 'red']);
  box.textContent = message;
  container.appendChild(box);
}
