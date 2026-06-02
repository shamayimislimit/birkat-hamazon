import yehudaPhoto from '@/assets/yehuda.png';
import { Language, Nosach } from '@/types/birkat';
import config from '@/config.json';
import { translations } from '@/data/translations';

interface HeaderProps {
  language: Language;
  nosach: Nosach;
}

export const Header = ({ language, nosach }: HeaderProps) => {
  const isRtl = language === 'hebrew';
  const main = config.app.title[language];
  const dedicationLine = config.dedication[language];
  const nosachText = translations.nosachOptions[nosach][language];

  return (
    <header className="relative">
      {/* B"SD — discrete top-right marker */}
      <div className="absolute top-5 right-5 z-10">
        <span className="text-xs font-frank text-muted-foreground/70 tracking-wide">
          בס"ד
        </span>
      </div>

      <div className="text-center pt-16 pb-10 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Portrait — circular, silver ring, no glow */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-border shadow-[var(--shadow-elegant)] ring-1 ring-white/80 ring-offset-2 ring-offset-background">
              <img
                src={yehudaPhoto}
                alt={config.dedication[language]}
                className="w-full h-full object-cover grayscale-[15%]"
              />
            </div>
          </div>
        </div>

        {/* Title — Hebrew uses David Libre for Torah-like dignity */}
        <h1
          className={
            language === 'hebrew'
              ? 'font-david text-4xl md:text-5xl font-medium tracking-tight text-foreground'
              : 'font-cormorant text-4xl md:text-5xl font-light tracking-wide text-foreground'
          }
        >
          {main}
        </h1>

        {/* Thin steel-blue separator */}
        <div className="my-5 flex items-center justify-center">
          <div className="h-px w-16 bg-primary/40" />
        </div>

        {/* Dedication line */}
        <p
          className={
            language === 'hebrew'
              ? 'font-david text-xl md:text-2xl text-foreground/85 leading-snug'
              : 'font-cormorant italic text-xl md:text-2xl font-light text-foreground/80 tracking-wide leading-snug'
          }
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {dedicationLine}
        </p>

        {/* Nosach (small caption under the dedication, in case the toggle is collapsed) */}
        <p className="mt-6 text-xs uppercase tracking-[0.2em] font-assistant text-muted-foreground">
          {nosachText}
        </p>
      </div>
    </header>
  );
};
