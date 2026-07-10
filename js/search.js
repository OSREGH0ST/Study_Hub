/**
 * search.js — Study Hub
 * Fetches structured dictionary-style results from Gemini via the same proxy
 * pattern used by the practice module.
 * Exports: searchFrench(word), searchJapanese(word), DictionaryError
 * Returns normalized { word, phonetic, meanings[] } or null when no data is found.
 * Zero DOM contact — data only.
 */

const PROXY_URL = 'https://api-management.owensanrios.workers.dev';
const TIMEOUT_MS = 15000;

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

function normalizeGeminiResponse(data, fallbackWord) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

  const entry = data.entry && typeof data.entry === 'object' && !Array.isArray(data.entry)
    ? data.entry
    : data;

  const word = typeof entry.word === 'string' && entry.word.trim()
    ? entry.word.trim()
    : (typeof fallbackWord === 'string' && fallbackWord.trim() ? fallbackWord.trim() : '');

  const phonetic = typeof entry.phonetic === 'string' && entry.phonetic.trim()
    ? entry.phonetic.trim()
    : (typeof entry.pronunciation === 'string' && entry.pronunciation.trim()
      ? entry.pronunciation.trim()
      : null);

  const rawMeanings = Array.isArray(entry.meanings)
    ? entry.meanings
    : [];

  const meanings = rawMeanings
    .map(item => {
      const partOfSpeech = typeof item.partOfSpeech === 'string' ? item.partOfSpeech : '';
      const definitions = Array.isArray(item.definitions)
        ? item.definitions.map(def => {
            if (typeof def === 'string') {
              return { definition: def, example: null };
            }
            if (def && typeof def === 'object') {
              return {
                definition: typeof def.definition === 'string' ? def.definition : '',
                example: typeof def.example === 'string' ? def.example : null
              };
            }
            return { definition: '', example: null };
          }).filter(def => def.definition)
        : [];

      return { partOfSpeech, definitions };
    })
    .filter(item => item.definitions.length > 0);

  if (!word && meanings.length === 0) return null;
  return { word, phonetic, meanings };
}

function parseGeminiJson(text) {
  if (typeof text !== 'string') return null;

  const cleaned = text.trim();
  if (!cleaned) return null;

  const fenced = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();

  try {
    return JSON.parse(fenced);
  } catch {
    const first = fenced.indexOf('{');
    const last = fenced.lastIndexOf('}');
    if (first !== -1 && last !== -1 && last > first) {
      try {
        return JSON.parse(fenced.slice(first, last + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

// ─── Core fetch ───────────────────────────────────────────────────────────────

async function lookup(lang, word, intent = 'language study lookup') {
  if (typeof word !== 'string' || !word.trim()) {
    throw new TypeError('word must be a non-empty string');
  }

  const clean = word.trim();
  if (clean.length > 100) {
    throw new DictionaryError('Query too long', 400, 'INPUT_TOO_LONG');
  }

  const langName = lang === 'ja' ? 'Japanese' : 'French';
  const promptText = `You are a ${langName} dictionary assistant for a study website.
The user typed the word "${clean}" and is using the app for ${intent}.
Return ONLY compact JSON with no explanation, no markdown, and no extra text.
Use this exact schema:
{"word":"...","phonetic":"... or null","meanings":[{"partOfSpeech":"...","definitions":[{"definition":"...","example":"... or null"}]}]}
If the word is unknown, return {"word":"${clean}","phonetic":null,"meanings":[]}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      }),
      signal: controller.signal
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Gemini proxy error:', data);
      throw new DictionaryError(`Proxy error ${res.status}`, res.status, 'HTTP_ERROR');
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof rawText !== 'string' || !rawText.trim()) {
      throw new DictionaryError('Gemini returned no usable content', 502, 'EMPTY_RESPONSE');
    }

    const parsed = parseGeminiJson(rawText);
    return normalizeGeminiResponse(parsed, clean);
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
 * Look up a French word using Gemini.
 * @param {string} word
 * @param {string} [intent]
 * @returns {Promise<{word, phonetic, meanings[]}|null>}
 */
export function searchFrench(word, intent = 'language study lookup') {
  return lookup('fr', word, intent);
}

/**
 * Look up a Japanese word using Gemini.
 * @param {string} word
 * @param {string} [intent]
 * @returns {Promise<{word, phonetic, meanings[]}|null>}
 */
export function searchJapanese(word, intent = 'language study lookup') {
  return lookup('ja', word, intent);
}
