/**
 * japanese.js — Study Hub
 * Page controller for japanese.html.
 * Fetches japanese_data.json, mounts all tabs via renderer,
 * handles tab switching, kanji, vocab categories, sub-tabs, search.
 * Static islands (particle-grid, kosoado-table, sentence-structure-block)
 * remain in japanese.html untouched — renderer skips them.
 */

import {
  mountTab,
  mountSubTabs,
  renderSearchResult,
  renderLoading,
  renderError
} from './renderer.js';

import { searchJapanese, DictionaryError } from './search.js';

// ─── Bootstrap ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  initMobileMenu();
  initTabButtons();

  let data;
  try {
    const res = await fetch('data/japanese_data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error('[Japanese] Failed to load data:', err);
    showFatalError('Could not load study materials. Check your connection and reload.');
    return;
  }

  mountStaticTabs(data);
  initVerbsTab(data.tabs.verbs);
  initKanjiTab(data.tabs.kanji);
  initVocabTab(data.tabs.vocabulary);
  initSearchTab();
});

// ─── Static tab mounts ────────────────────────────────────────────────────────

function mountStaticTabs(data) {
  const { tabs } = data;

  if (tabs.writing?.sections)    mountTab('writing',    tabs.writing.sections);
  if (tabs.adjectives?.sections) mountTab('adjectives', tabs.adjectives.sections);
  if (tabs.adverbs?.sections)    mountTab('adverbs',    tabs.adverbs.sections);
}

// ─── Verbs tab (sub-tabs) ────────────────────────────────────────────────────

function initVerbsTab(verbsData) {
  if (!verbsData?.sub_tabs) return;
  mountSubTabs('verbs', verbsData.sub_tabs);
}

// ─── Kanji tab ────────────────────────────────────────────────────────────────

function initKanjiTab(kanjiData) {
  const container = document.getElementById('kanji');
  if (!container || !kanjiData?.lessons) return;

  // Preserve kanji intro block if it exists
  const intro = container.querySelector('.kanji-intro');

  // Clear safely
  while (container.firstChild) container.removeChild(container.firstChild);

  if (intro) container.appendChild(intro);

  const inner = document.createElement('div');
  inner.id = 'kanji-container';

  const frag = document.createDocumentFragment();
  kanjiData.lessons.forEach(lesson => {
    const lessonDiv = document.createElement('div');
    lessonDiv.className = 'kanji-lesson';

    const header = document.createElement('div');
    header.className = 'kanji-lesson-header';
    const h3 = document.createElement('h3');
    h3.textContent = `Lesson ${lesson.lesson}: ${lesson.title}`;
    header.appendChild(h3);
    lessonDiv.appendChild(header);

    const charsDiv = document.createElement('div');
    charsDiv.className = 'kanji-chars';

    lesson.chars.forEach(char => {
      const charDiv = document.createElement('div');
      charDiv.className = 'kanji-char';

      const sym = document.createElement('div');
      sym.className = 'kanji-symbol';
      sym.textContent = char.k;

      const reading = document.createElement('div');
      reading.className = 'kanji-reading';
      reading.textContent = char.r;

      const meaning = document.createElement('div');
      meaning.className = 'kanji-meaning';
      meaning.textContent = char.m;

      charDiv.appendChild(sym);
      charDiv.appendChild(reading);
      charDiv.appendChild(meaning);
      charsDiv.appendChild(charDiv);
    });

    lessonDiv.appendChild(charsDiv);
    frag.appendChild(lessonDiv);
  });

  inner.appendChild(frag);
  container.appendChild(inner);
}

// ─── Vocabulary tab ───────────────────────────────────────────────────────────

function initVocabTab(vocabData) {
  if (!vocabData?.categories) return;

  const menu = document.querySelector('#vocabulary .vocab-menu');
  const tablesDiv = document.getElementById('vocab-tables');
  if (!menu || !tablesDiv) return;

  while (menu.firstChild) menu.removeChild(menu.firstChild);

  vocabData.categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `vocab-btn ${cat.color || 'blue'}`;
    btn.setAttribute('data-category', cat.id);
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = cat.icon || '';
    btn.appendChild(icon);
    btn.appendChild(document.createTextNode(' ' + cat.label));
    btn.addEventListener('click', () => showJpVocabCategory(cat, tablesDiv, menu));
    menu.appendChild(btn);

    const catDiv = document.createElement('div');
    catDiv.id = cat.id;
    catDiv.className = 'vocab-category';
    catDiv.style.display = 'none';
    tablesDiv.appendChild(catDiv);
  });

  if (vocabData.categories.length > 0) {
    showJpVocabCategory(vocabData.categories[0], tablesDiv, menu);
  }
}

function showJpVocabCategory(cat, tablesDiv, menu) {
  tablesDiv.querySelectorAll('.vocab-category').forEach(d => d.style.display = 'none');

  const bar = document.getElementById('vocab-picker-bar');
  const menuEl = document.querySelector('#vocabulary .vocab-menu');

  const target = document.getElementById(cat.id);
  if (!target) return;

  // Lazy render
  if (target.children.length === 0) {
    // Number scale
    if (cat.scale) {
      const scaleCard = document.createElement('div');
      scaleCard.className = 'card';
      scaleCard.style.gridColumn = '1 / -1';
      const h3 = document.createElement('h3');
      h3.className = 'card-title blue';
      h3.textContent = 'Number Scale (Big to Small)';
      scaleCard.appendChild(h3);
      const scaleNote = document.createElement('p');
      scaleNote.className = 'vocab-en';
      scaleNote.style.cssText = 'font-size:12px;margin-bottom:1rem;font-style:italic;';
      scaleNote.textContent = 'Note: Japanese groups numbers by 4 zeros (Man), not 3!';
      scaleCard.appendChild(scaleNote);
      const sg = document.createElement('div');
      sg.className = 'grid-5';
      sg.style.gap = '1rem';
      cat.scale.forEach(s => {
        const box = document.createElement('div');
        box.className = 'info-box blue';
        box.style.cssText = 'margin:0;text-align:center;';
        const accent = document.createElement('p');
        accent.className = 'accent-text';
        accent.textContent = s.value;
        const jp = document.createElement('p');
        jp.className = 'vocab-jp';
        jp.style.fontSize = '2rem';
        jp.textContent = s.jp;
        const read = document.createElement('p');
        read.className = 'vocab-en';
        read.style.fontSize = '11px';
        read.textContent = s.reading;
        box.appendChild(accent);
        box.appendChild(jp);
        box.appendChild(read);
        sg.appendChild(box);
      });
      scaleCard.appendChild(sg);
      target.appendChild(scaleCard);
    }

    // nationality note
    if (cat.note) {
      const noteCard = document.createElement('div');
      noteCard.className = 'card';
      noteCard.style.gridColumn = '1 / -1';
      const h3 = document.createElement('h3');
      h3.className = 'card-title blue';
      h3.textContent = 'Nationalities & Languages';
      noteCard.appendChild(h3);
      const noteP = document.createElement('p');
      noteP.className = 'vocab-en';
      noteP.style.fontSize = '13px';
      noteP.textContent = cat.note;
      noteCard.appendChild(noteP);
      target.appendChild(noteCard);
    }

    const grid = document.createElement('div');
    grid.className = 'grid-2';

    if (Array.isArray(cat.tables)) {
      cat.tables.forEach(t => {
        grid.appendChild(buildVocabTableNode(t));
      });
    }
    target.appendChild(grid);

    // Irregulars
    if (cat.irregulars) {
      cat.irregulars.forEach(ir => {
        const irBox = buildInfoBoxNode({
          variant: ir.label.includes('100') ? 'red' : 'gold',
          label: ir.label,
          body: ir.items.join(' | ')
        });
        irBox.style.marginTop = '1rem';
        target.appendChild(irBox);
      });
    }

    // info_box (clothing verb tip, body parts pain)
    if (cat.info_box) {
      target.appendChild(buildInfoBoxNode(cat.info_box));
    }
  }

  target.style.display = 'grid';

  if (window.innerWidth < 768) {
    if (menuEl) menuEl.classList.add('is-collapsed');
    if (bar) {
      const labelEl = bar.querySelector('.vocab-picker-label');
      if (labelEl) labelEl.textContent = cat.icon + ' ' + cat.label;
      bar.style.display = 'flex';
    }
    const tables = document.getElementById('vocab-tables');
    if (tables) tables.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ─── Search tab ───────────────────────────────────────────────────────────────

function initSearchTab() {
  const searchPanel = document.getElementById('search');
  if (!searchPanel) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'card';

  const title = document.createElement('h3');
  title.className = 'card-title pink';
  title.textContent = '🔍 Japanese Dictionary Search';
  wrapper.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'vocab-en';
  subtitle.style.cssText = 'font-size:13px;margin-bottom:1rem;';
  subtitle.textContent = 'Look up any Japanese word using the free dictionary API. Try romaji like "sushi" or hiragana like "たべる".';
  wrapper.appendChild(subtitle);

  const inputRow = document.createElement('div');
  inputRow.style.cssText = 'display:flex;gap:0.75rem;margin-bottom:1.5rem;';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'jp-search-input';
  input.placeholder = 'e.g. sushi, kawaii, たべる...';
  input.style.cssText = 'flex:1;padding:0.75rem 1rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:#e2e8f0;font-family:inherit;font-size:14px;';

  const btn = document.createElement('button');
  btn.className = 'tab-btn active';
  btn.style.cssText = 'padding:0.75rem 1.5rem;border-radius:0.5rem;background:rgba(249,168,212,0.2);color:#f9a8d4;border:none;cursor:pointer;font-family:inherit;font-weight:bold;';
  btn.textContent = 'Search';

  inputRow.appendChild(input);
  inputRow.appendChild(btn);
  wrapper.appendChild(inputRow);

  const results = document.createElement('div');
  results.id = 'jp-search-results';
  wrapper.appendChild(results);

  searchPanel.appendChild(wrapper);

  const doSearch = async () => {
    const q = input.value.trim();
    if (!q) return;
    renderLoading(results);
    try {
      const data = await searchJapanese(q);
      renderSearchResult(data, results);
    } catch (err) {
      if (err instanceof DictionaryError) {
        renderError(results, err.code === 'TIMEOUT'
          ? 'Request timed out. Please try again.'
          : `Error: ${err.message}`);
      } else {
        renderError(results, 'An unexpected error occurred.');
      }
    }
  };

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

// ─── Tab switching ────────────────────────────────────────────────────────────

function initTabButtons() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const match = btn.getAttribute('onclick')?.match(/switchTab\('([^']+)'\)/);
      if (!match) return;
      e.stopPropagation();
      switchTab(match[1]);
      const menuToggle = document.getElementById('menuToggle');
      const navTabs = document.getElementById('navTabs');
      if (window.innerWidth < 768 && menuToggle && navTabs) {
        menuToggle.classList.remove('active');
        navTabs.classList.remove('active');
      }
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.getAttribute('onclick')?.includes(`'${tabId}'`)) b.classList.add('active');
  });
  // trigger practice module init when practice tab is opened
  if (tabId === 'practice' && typeof initPractice === 'function') {
    initPractice();
  }
  // Kanji lazy-init guard — already handled by initKanjiTab on load
}

window.switchTab = switchTab;

// ─── Mobile hamburger ────────────────────────────────────────────────────────

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navTabs = document.getElementById('navTabs');
  if (!menuToggle || !navTabs) return;
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navTabs.classList.toggle('active');
  });
}

// ─── Vocab mobile back button ────────────────────────────────────────────────

window.showVocabMenu = function () {
  const menu = document.querySelector('#vocabulary .vocab-menu');
  const bar = document.getElementById('vocab-picker-bar');
  if (menu) menu.classList.remove('is-collapsed');
  if (bar) bar.style.display = 'none';
  document.querySelectorAll('.vocab-category').forEach(d => d.style.display = 'none');
  if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ─── DOM helpers ─────────────────────────────────────────────────────────────

function buildVocabTableNode(t) {
  const div = document.createElement('div');
  div.className = 'vocab-table';
  const hdr = document.createElement('div');
  hdr.className = 'vocab-header';
  hdr.textContent = t.header || '';
  if (t.headerColor) hdr.style.color = t.headerColor;
  div.appendChild(hdr);
  const items = document.createElement('div');
  items.className = 'vocab-items';
  (t.items || []).forEach(item => {
    if (item.sub) {
      const subrow = document.createElement('div');
      subrow.className = 'vocab-item';
      subrow.style.borderBottom = 'none';
      const accent = document.createElement('span');
      accent.className = 'accent-text';
      accent.style.color = '#60a5fa';
      accent.textContent = item.sub;
      subrow.appendChild(accent);
      items.appendChild(subrow);
      if (!item.en) return;
    }
    const row = document.createElement('div');
    row.className = 'vocab-item';
    const en = document.createElement('span');
    en.className = 'vocab-en';
    en.textContent = item.en || '';
    const lang = document.createElement('span');
    lang.className = item.jp !== undefined ? 'vocab-jp' : 'vocab-fr';
    lang.textContent = item.jp !== undefined ? item.jp : (item.fr || '');
    row.appendChild(en);
    row.appendChild(lang);
    items.appendChild(row);
  });
  div.appendChild(items);
  return div;
}

function buildInfoBoxNode(ib) {
  const colorMap = { red: 'red', gold: 'gold', green: 'green', purple: 'purple', pink: 'pink', blue: '' };
  const box = document.createElement('div');
  box.className = ['info-box', colorMap[ib.variant] ?? ''].filter(Boolean).join(' ');
  if (ib.title) {
    const strong = document.createElement('strong');
    strong.textContent = ib.title;
    box.appendChild(strong);
    box.appendChild(document.createElement('br'));
  }
  if (ib.label) {
    const accent = document.createElement('p');
    accent.className = 'accent-text';
    accent.textContent = ib.label;
    box.appendChild(accent);
  }
  const bodyText = ib.body || ib.text || '';
  if (bodyText) {
    const p = document.createElement('p');
    p.style.fontSize = '13px';
    p.innerHTML = bodyText
      .replace(/<(?!\/?(?:b|em|i|strong|br)\b)[^>]*>/gi, '')
      .replace(/javascript:/gi, '');
    box.appendChild(p);
  }
  return box;
}

function showFatalError(msg) {
  const main = document.querySelector('main');
  if (!main) return;
  const box = document.createElement('div');
  box.className = 'info-box red';
  box.style.margin = '2rem';
  box.textContent = msg;
  main.prepend(box);
}
