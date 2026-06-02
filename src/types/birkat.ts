export type Language = 'hebrew' | 'french' | 'english';
export type Nosach = 'ashkenaz' | 'edot-hamizrah' | 'yemen';

export interface BirkatSettings {
  fontSize: number;
  nosach: Nosach;
  language: Language;
  phoneticMode: boolean;
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
