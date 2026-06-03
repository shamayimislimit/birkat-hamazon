import { useState, useEffect } from 'react';
import { BirkatSettings, Language, PrayerFont } from '@/types/birkat';
import config from '@/config.json';

const STORAGE_KEY = 'birkat-hamazon-settings';

/**
 * First-run language resolution from `navigator.language`:
 *   he-* / iw-*  → hebrew
 *   anything else → french
 * English is never auto-selected — it must be picked manually in Settings.
 * The user's manual choice (stored in localStorage) always wins on subsequent visits.
 */
const detectLanguage = (): Language => {
  const supported = config.settings.supportedLanguages as Language[];
  const candidates: string[] = [
    ...(typeof navigator !== 'undefined' && Array.isArray(navigator.languages) ? navigator.languages : []),
    typeof navigator !== 'undefined' ? navigator.language : '',
  ].filter(Boolean);

  const isHebrewBrowser = candidates.some((raw) => {
    const tag = raw.toLowerCase().split('-')[0];
    return tag === 'he' || tag === 'iw';
  });

  if (isHebrewBrowser && supported.includes('hebrew')) return 'hebrew';
  if (supported.includes('french')) return 'french';
  return config.settings.defaults.language as Language;
};

const buildDefaults = (): BirkatSettings => ({
  fontSize: config.settings.defaults.fontSize,
  nosach: config.settings.defaults.nosach as BirkatSettings['nosach'],
  language: detectLanguage(),
  phoneticMode: config.settings.defaults.phoneticMode,
  prayerFont: (config.settings.defaults.prayerFont as PrayerFont) ?? 'frank',
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
