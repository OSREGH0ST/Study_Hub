/**
 * french.js — Study Hub
 * Page controller for french.html.
 * Fetches french_data.json, mounts all tabs via renderer,
 * handles tab switching, vocab category grid, sub-tabs, search.
 */

import {
  mountTab,
  mountSubTabs,
  mountVocabCategory,
  renderSearchResult,
  renderLoading,
  renderError
} from './renderer.js';

import { searchFrench, DictionaryError } from './search.js';

// ─── Bootstrap ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  initMobileMenu();
  initTabButtons();

  let data;
  try {
    const res = await fetch(new URL('../data/french_data.json', import.meta.url));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error('[French] Failed to load data:', err);
    showFatalError('Could not load study materials. Check your connection and reload.');
    return;
  }

  mountStaticTabs(data);
  initVerbsTab(data.tabs.verbs);
  initVocabTab(data.tabs.vocabulary);
  initSearchTab();
});

// ─── Static tab mounts ────────────────────────────────────────────────────────

function mountStaticTabs(data) {
  const { tabs } = data;

  // Grammar — unhide negation sandwich island after mount
  if (tabs.grammar?.sections) {
    mountTab('grammar', tabs.grammar.sections);
    const negationVisual = document.getElementById('negation-sandwich-visual');
    if (negationVisual) negationVisual.style.removeProperty('display');
  }

  // Adjectives — unhide BAGS placement island after mount
  if (tabs.adjectives?.sections) {
    mountTab('adjectives', tabs.adjectives.sections);
    const bagsPlacement = document.getElementById('bags-placement');
    if (bagsPlacement) bagsPlacement.style.removeProperty('display');
  }

  // Adverbs
  if (tabs.adverbs?.sections) mountTab('adverbs', tabs.adverbs.sections);

  // Phrases — render as vocab tables grid
  if (tabs.phrases?.tables) {
    mountTab('phrases', tabs.phrases.tables.map(t => ({
      type: 'vocab_table',
      header: t.header,
      items: t.items
    })));
  }
}

// ─── Verbs tab (sub-tabs) ────────────────────────────────────────────────────

function initVerbsTab(verbsData) {
  if (!verbsData?.sub_tabs) return;
  mountSubTabs('verbs', verbsData.sub_tabs);
}

// ─── Vocabulary tab ───────────────────────────────────────────────────────────

function initVocabTab(vocabData) {
  if (!vocabData?.categories) return;

  const menu = document.querySelector('#vocabulary .vocab-menu');
  const tablesDiv = document.getElementById('vocab-tables');
  if (!menu || !tablesDiv) return;

  // Clear existing static buttons — replace with data-driven ones
  while (menu.firstChild) menu.removeChild(menu.firstChild);

  // Build category container divs + buttons
  vocabData.categories.forEach((cat, index) => {
    // Button
    const btn = document.createElement('button');
    btn.className = `vocab-btn ${cat.color || 'blue'}`;
    btn.setAttribute('data-category', cat.id);
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = cat.icon || '';
    btn.appendChild(icon);
    btn.appendChild(document.createTextNode(' ' + cat.label));
    btn.addEventListener('click', () => showFrVocabCategory(cat, tablesDiv, menu));
    menu.appendChild(btn);

    // Container div
    const catDiv = document.createElement('div');
    catDiv.id = cat.id;
    catDiv.className = 'vocab-category';
    catDiv.style.display = 'none';
    tablesDiv.appendChild(catDiv);
  });

  // Show first category by default
  if (vocabData.categories.length > 0) {
    showFrVocabCategory(vocabData.categories[0], tablesDiv, menu);
  }
}

function showFrVocabCategory(cat, tablesDiv, menu) {
  // Hide all
  tablesDiv.querySelectorAll('.vocab-category').forEach(d => d.style.display = 'none');

  // Deactivate mobile picker bar logic (reuse existing pattern)
  const bar = document.getElementById('vocab-picker-bar');
  const menuEl = document.querySelector('#vocabulary .vocab-menu');

  const target = document.getElementById(cat.id);
  if (!target) return;

  // Lazy render — only build DOM once
  if (target.children.length === 0) {
    const gridClass = cat.tables?.length > 2 ? 'grid-2' : 'grid-2';
    const grid = document.createElement('div');
    grid.className = gridClass;

    if (Array.isArray(cat.tables)) {
      cat.tables.forEach(t => {
        const node = buildVocabTableNode(t);
        if (node) grid.appendChild(node);
      });
    }
    // Extra info_box for body parts pain section
    if (cat.info_box) {
      const boxEl = buildInfoBoxNode(cat.info_box);
      target.appendChild(boxEl);
    }
    target.appendChild(grid);
    // Irregulars for numbers
    if (cat.irregulars) {
      cat.irregulars.forEach(ir => {
        const irBox = buildInfoBoxNode({ variant: ir.label.includes('100') ? 'red' : 'gold', label: ir.label, body: ir.items.join(' | ') });
        target.appendChild(irBox);
      });
    }
  }

  target.style.display = 'grid';

  // Mobile: collapse menu, show picker bar
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

  // Build search UI
  const wrapper = document.createElement('div');
  wrapper.className = 'card';

  const title = document.createElement('h3');
  title.className = 'card-title blue';
  title.textContent = '🔍 French Dictionary Search';
  wrapper.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'vocab-en';
  subtitle.style.cssText = 'font-size:13px;margin-bottom:1rem;';
  subtitle.textContent = 'Look up any French word using the free dictionary API.';
  wrapper.appendChild(subtitle);

  // Input row
  const inputRow = document.createElement('div');
  inputRow.style.cssText = 'display:flex;gap:0.75rem;margin-bottom:1.5rem;';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'fr-search-input';
  input.placeholder = 'e.g. bonjour, manger, beau...';
  input.style.cssText = 'flex:1;padding:0.75rem 1rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:#e2e8f0;font-family:inherit;font-size:14px;';

  const btn = document.createElement('button');
  btn.className = 'tab-btn active';
  btn.style.cssText = 'padding:0.75rem 1.5rem;border-radius:0.5rem;background:rgba(249,168,212,0.2);color:#f9a8d4;border:none;cursor:pointer;font-family:inherit;font-weight:bold;';
  btn.textContent = 'Search';

  inputRow.appendChild(input);
  inputRow.appendChild(btn);
  wrapper.appendChild(inputRow);

  // Results container
  const results = document.createElement('div');
  results.id = 'fr-search-results';
  wrapper.appendChild(results);

  searchPanel.appendChild(wrapper);

  // Event handlers
  const doSearch = async () => {
    const q = input.value.trim();
    if (!q) return;
    renderLoading(results);
    try {
      const data = await searchFrench(q);
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

// ─── Tab switching (matches existing style.css active class pattern) ──────────

function initTabButtons() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const tabId = btn.getAttribute('onclick')?.match(/switchTab\('([^']+)'\)/)?.[1];
      if (!tabId) return;
      e.stopPropagation();
      switchTab(tabId);
      // close mobile menu
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
  // highlight matching button
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.getAttribute('onclick')?.includes(`'${tabId}'`)) b.classList.add('active');
  });
  // trigger practice module init when practice tab is opened
  if (tabId === 'practice' && typeof initPractice === 'function') {
    initPractice();
  }
}

// Make switchTab available globally (onclick attributes in HTML call it)
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

// ─── Vocab mobile back button (reuse existing pattern) ───────────────────────

// Make showVocabMenu available globally (onclick in HTML)
window.showVocabMenu = function () {
  const menu = document.querySelector('#vocabulary .vocab-menu');
  const bar = document.getElementById('vocab-picker-bar');
  if (menu) menu.classList.remove('is-collapsed');
  if (bar) bar.style.display = 'none';
  document.querySelectorAll('.vocab-category').forEach(d => d.style.display = 'none');
  if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ─── DOM helpers (local, not exported) ───────────────────────────────────────

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
    const fr = document.createElement('span');
    fr.className = item.jp !== undefined ? 'vocab-jp' : 'vocab-fr';
    fr.textContent = item.jp !== undefined ? item.jp : (item.fr || '');
    row.appendChild(en);
    row.appendChild(fr);
    items.appendChild(row);
  });
  div.appendChild(items);
  return div;
}

function buildInfoBoxNode(ib) {
  const colorMap = { red: 'red', gold: 'gold', green: 'green', purple: 'purple', pink: 'pink' };
  const box = document.createElement('div');
  box.className = ['info-box', colorMap[ib.variant] || ''].filter(Boolean).join(' ');
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
