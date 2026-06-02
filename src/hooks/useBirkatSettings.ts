import { useState, useEffect } from 'react';
import { BirkatSettings, Language } from '@/types/birkat';
import config from '@/config.json';

const STORAGE_KEY = 'birkat-hamazon-settings';

/**
 * First-run language resolution from `navigator.language`:
 *   he-*   → hebrew
 *   fr-*   → french
 *   en-*   → english (only if supported)
 *   other  → french (default fallback)
 * The user's manual choice (stored in localStorage) always wins on subsequent visits.
 */
const detectLanguage = (): Language => {
  const supported = config.settings.supportedLanguages as Language[];
  const candidates: string[] = [
    ...(typeof navigator !== 'undefined' && Array.isArray(navigator.languages) ? navigator.languages : []),
    typeof navigator !== 'undefined' ? navigator.language : '',
  ].filter(Boolean);

  for (const raw of candidates) {
    const tag = raw.toLowerCase().split('-')[0];
    if (tag === 'he' || tag === 'iw') return supported.includes('hebrew') ? 'hebrew' : 'french';
    if (tag === 'fr') return supported.includes('french') ? 'french' : (config.settings.defaults.language as Language);
    if (tag === 'en') return supported.includes('english') ? 'english' : 'french';
  }
  return supported.includes('french') ? 'french' : (config.settings.defaults.language as Language);
};

const buildDefaults = (): BirkatSettings => ({
  fontSize: config.settings.defaults.fontSize,
  nosach: config.settings.defaults.nosach as BirkatSettings['nosach'],
  language: detectLanguage(),
  phoneticMode: config.settings.defaults.phoneticMode,
});

const readStored = (): BirkatSettings | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...buildDefaults(), ...parsed };
  } catch {
    return null;
  }
};

export const useBirkatSettings = () => {
  const [settings, setSettings] = useState<BirkatSettings>(() => readStored() ?? buildDefaults());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // quota / private mode — settings stay in memory for the session
    }
  }, [settings]);

  const updateSettings = (updates: Partial<BirkatSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings };
};
