import { useState, useEffect } from 'react';
import { BirkatSettings } from '@/types/birkat';
import config from '@/config.json';

const DEFAULT_SETTINGS: BirkatSettings = {
  fontSize: config.settings.defaults.fontSize,
  nosach: config.settings.defaults.nosach as BirkatSettings['nosach'],
  language: config.settings.defaults.language as BirkatSettings['language'],
  phoneticMode: config.settings.defaults.phoneticMode,
};

const STORAGE_KEY = 'birkat-hamazon-settings';

export const useBirkatSettings = () => {
  const [settings, setSettings] = useState<BirkatSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<BirkatSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings };
};
