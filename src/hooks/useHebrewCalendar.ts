import { useMemo } from 'react';
import { HDate, months } from '@hebcal/core';
import { HebrewCalendarEvent } from '@/types/birkat';

export const useHebrewCalendar = (): HebrewCalendarEvent => {
  return useMemo(() => {
    const hDate = new HDate();
    const dayOfWeek = hDate.getDay();
    const month = hDate.getMonth();
    const day = hDate.getDate();

    // Check if Rosh Chodesh (1st or 30th of month)
    const isRoshChodesh = day === 1 || day === 30;

    // Check if Chanukah (25 Kislev - 2 Tevet)
    const isChanukah = 
      (month === months.KISLEV && day >= 25) || 
      (month === months.TEVET && day <= 2);

    // Check if Shabbat (Saturday)
    const isShabbat = dayOfWeek === 6;

    // For simplicity, we'll mark all special occasions as Yom Tov
    const isYomTov = false; // This would need more complex logic for actual holidays

    return {
      isRoshChodesh,
      isChanukah,
      isShabbat,
      isYomTov,
    };
  }, []);
};
