export type Language = 'hebrew' | 'french' | 'english';
export type Nosach = 'ashkenaz' | 'edot-hamizrah' | 'yemen';

/** Three siddur/prayer-friendly Hebrew faces available on Google Fonts. */
export type PrayerFont = 'frank' | 'david' | 'assistant';

export interface BirkatSettings {
  fontSize: number;
  nosach: Nosach;
  language: Language;
  phoneticMode: boolean;
  prayerFont: PrayerFont;
}

export interface HebrewCalendarEvent {
  isRoshChodesh: boolean;
  isChanukah: boolean;
  isShabbat: boolean;
  isYomTov: boolean;
}

export interface PrayerSection {
  title: string;
  content: string[];
  highlight?: boolean;
}

export interface ShevaBrachotSection {
  title: string;
  brachot: string[];
}
