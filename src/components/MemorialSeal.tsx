import { Language } from '@/types/birkat';
import config from '@/config.json';

interface MemorialSealProps {
  language: Language;
}

/**
 * Closing memorial mark — sits after the prayer text (after עושה שלום),
 * before the developer footer. A quiet sign-off, not a decoration.
 */
export const MemorialSeal = ({ language }: MemorialSealProps) => {
  const isRtl = language === 'hebrew';

  return (
    <figure className="mt-10 mb-4 flex flex-col items-center gap-2" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Thin separator above */}
      <div className="h-px w-24 bg-border" />

      <figcaption className="text-[11px] uppercase tracking-[0.22em] font-assistant text-muted-foreground/80">
        {config.saying.intro[language]}
      </figcaption>

      <blockquote
        className={
          language === 'hebrew'
            ? 'font-david text-2xl md:text-3xl text-primary/85'
            : 'font-cormorant italic text-2xl md:text-3xl font-light text-primary/85 tracking-wide'
        }
      >
        {language === 'hebrew' ? (
          <>«&nbsp;{config.saying.phraseHebrew}&nbsp;»</>
        ) : (
          <>«&nbsp;{config.saying.phrase}&nbsp;»</>
        )}
      </blockquote>
    </figure>
  );
};
