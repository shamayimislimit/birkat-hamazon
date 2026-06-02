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
      {/* B"SD */}
      <div className="absolute top-6 right-6 z-10">
        <div className="text-sm font-frank text-muted-foreground/80 px-3 py-1.5 rounded-lg bg-background/40 backdrop-blur-sm shadow-soft">
          בס"ד
        </div>
      </div>

      <div className="text-center space-y-8 py-12 px-4">
        <div className="space-y-4 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Decorative line above title */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold font-cinzel tracking-wide bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
            {main}
          </h1>

          <p className="text-lg md:text-xl font-cormorant font-medium text-muted-foreground/90 tracking-wide">
            {nosachText}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>

          <p
            className="text-2xl md:text-3xl font-cormorant font-semibold text-foreground/90 tracking-wide"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {dedicationLine}
          </p>
        </div>

        {/* Portrait */}
        <div className="flex justify-center pt-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 rounded-full blur-2xl scale-110 opacity-50" />

            <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[var(--shadow-elegant)] border-[6px] border-white/90 backdrop-blur-sm">
              <img
                src={yehudaPhoto}
                alt={config.dedication[language]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
          </div>
        </div>
      </div>
    </header>
  );
};
