import { Language, Nosach } from '@/types/birkat';
import { translations } from '@/data/translations';
import config from '@/config.json';
import { cn } from '@/lib/utils';

interface NosachToggleProps {
  nosach: Nosach;
  onNosachChange: (nosach: Nosach) => void;
  language: Language;
}

/**
 * Always-visible Ashkenaz / Edot Hamizrah segmented control.
 * Sits between the header and the prayer text so users can switch
 * without opening the settings popover.
 */
export const NosachToggle = ({ nosach, onNosachChange, language }: NosachToggleProps) => {
  const supportedNosach = config.settings.supportedNosach as Nosach[];

  if (supportedNosach.length < 2) return null;

  return (
    <div className="flex justify-center px-4">
      <div
        role="radiogroup"
        aria-label={translations.nosach?.[language] ?? 'Nosach'}
        className="inline-flex items-center gap-1 rounded-full border border-border bg-card/70 backdrop-blur-sm p-1 shadow-[var(--shadow-soft)]"
      >
        {supportedNosach.map((n) => {
          const active = nosach === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onNosachChange(n)}
              className={cn(
                'px-4 py-1.5 text-xs md:text-sm font-assistant rounded-full transition-colors duration-200',
                'tracking-wide',
                active
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {translations.nosachOptions[n][language]}
            </button>
          );
        })}
      </div>
    </div>
  );
};
