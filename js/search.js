/**
 * search.js — Study Hub
 * Fetch wrapper for dictionaryapi.dev.
 * Exports: searchFrench(word), searchJapanese(word), DictionaryError
 * Returns normalized { word, phonetic, meanings[] } or null on 404.
 * Zero DOM contact — data only.
 */

const API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries';
const TIMEOUT_MS = 8000;

// ─── Error class ─────────────────────────────────────────────────────────────

export class DictionaryError extends Error {
  constructor(message, status = null, code = 'UNKNOWN') {
    super(message);
    this.name = 'DictionaryError';
    this.status = status;
    this.code = code;
  }
}

// ─── Response normalizer ──────────────────────────────────────────────────────

function normalize(data) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const entry = data[0];
  if (!entry || typeof entry !== 'object') return null;

  // Phonetic — prefer top-level string, fall back to phonetics array
  let phonetic = typeof entry.phonetic === 'string' ? entry.phonetic : null;
  if (!phonetic && Array.isArray(entry.phonetics)) {
    const ph = entry.phonetics.find(p => typeof p.text === 'string' && p.text.trim());
    if (ph) phonetic = ph.text;
  }

  const meanings = Array.isArray(entry.meanings)
    ? entry.meanings.map(m => ({
        partOfSpeech: typeof m.partOfSpeech === 'string' ? m.partOfSpeech : '',
        definitions: Array.isArray(m.definitions)
          ? m.definitions.map(d => ({
              definition: typeof d.definition === 'string' ? d.definition : '',
              example:    typeof d.example    === 'string' ? d.example    : null
            }))
          : []
      })).filter(m => m.definitions.length > 0)
    : [];

  return {
    word:     typeof entry.word === 'string' ? entry.word : '',
    phonetic: phonetic || null,
    meanings
  };
}

// ─── Core fetch ───────────────────────────────────────────────────────────────

async function lookup(lang, word) {
  if (typeof word !== 'string' || !word.trim()) {
    throw new TypeError('word must be a non-empty string');
  }

  const clean = word.trim();
  if (clean.length > 100) {
    throw new DictionaryError('Query too long', 400, 'INPUT_TOO_LONG');
  }

  const url = `${API_BASE}/${lang}/${encodeURIComponent(clean)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });

    // 404 = word not found — not an error, return null
    if (res.status === 404) return null;

    if (!res.ok) {
      throw new DictionaryError(
        `API error ${res.status}`,
        res.status,
        'HTTP_ERROR'
      );
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new DictionaryError('Non-JSON response', 502, 'BAD_CONTENT_TYPE');
    }

    let raw;
    try { raw = await res.json(); }
    catch { throw new DictionaryError('JSON parse failed', 200, 'PARSE_ERROR'); }

    return normalize(raw);

  } catch (err) {
    if (err.name === 'AbortError') {
      throw new DictionaryError(`Request timed out after ${TIMEOUT_MS}ms`, null, 'TIMEOUT');
    }
    if (err instanceof DictionaryError || err instanceof TypeError) throw err;
    throw new DictionaryError(err.message || 'Network failure', null, 'NETWORK_ERROR');
  } finally {
    clearTimeout(timer);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Look up a French word on dictionaryapi.dev.
 * @param {string} word
 * @returns {Promise<{word, phonetic, meanings[]}|null>}
 */
export function searchFrench(word) {
  return lookup('fr', word);
}

/**
 * Look up a Japanese word on dictionaryapi.dev.
 * @param {string} word
 * @returns {Promise<{word, phonetic, meanings[]}|null>}
 */
export function searchJapanese(word) {
  return lookup('ja', word);
}
