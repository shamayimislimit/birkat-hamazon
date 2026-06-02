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
        {/* Portrait — framed memorial: soft warm halo, double silver ring, ז״ל caption */}
        <div className="flex justify-center mb-8">
          <figure className="relative flex flex-col items-center">
            {/* Soft warm halo behind — candlelight feel */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full blur-2xl opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, hsl(38 70% 78% / 0.45) 0%, hsl(215 30% 85% / 0.25) 45%, transparent 75%)',
              }}
            />

            {/* Double silver ring frame */}
            <div className="relative rounded-full p-[3px] bg-gradient-to-br from-white via-secondary/40 to-secondary shadow-[var(--shadow-elegant)]">
              <div className="rounded-full p-[1.5px] bg-background">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-1 ring-primary/20">
                  <img
                    src={yehudaPhoto}
                    alt={config.dedication[language]}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ז״ל — calligraphic memorial mark */}
            <figcaption className="relative mt-4 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-border" />
              <span className="font-david text-base text-muted-foreground tracking-widest">ז״ל</span>
              <span aria-hidden className="h-px w-8 bg-border" />
            </figcaption>
          </figure>
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
