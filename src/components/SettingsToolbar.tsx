import { Share, Share2, Download, Type, Languages, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Language, PrayerFont } from '@/types/birkat';
import { translations, getTranslation } from '@/data/translations';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import config from '@/config.json';
import { cn } from '@/lib/utils';

interface SettingsToolbarProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  phoneticMode: boolean;
  onPhoneticModeChange: (enabled: boolean) => void;
  prayerFont: PrayerFont;
  onPrayerFontChange: (font: PrayerFont) => void;
}

const PRAYER_FONT_OPTIONS: { value: PrayerFont; labelKey: 'fontFrank' | 'fontDavid' | 'fontAssistant'; previewClass: string }[] = [
  { value: 'frank', labelKey: 'fontFrank', previewClass: 'font-frank' },
  { value: 'david', labelKey: 'fontDavid', previewClass: 'font-david' },
  { value: 'assistant', labelKey: 'fontAssistant', previewClass: 'font-assistant' },
];

export const SettingsToolbar = ({
  fontSize,
  onFontSizeChange,
  language,
  onLanguageChange,
  phoneticMode,
  onPhoneticModeChange,
  prayerFont,
  onPrayerFontChange,
}: SettingsToolbarProps) => {
  const [showIOSDialog, setShowIOSDialog] = useState(false);

  const isRtl = language === 'hebrew';

  const supportedLanguages = config.settings.supportedLanguages as Language[];

  const handle = async () => {
    const shareTitle = `${config.app.title.hebrew} - ${config.dedication.hebrew}`;
    const shareText = `${config.app.title.english} - ${config.dedication.english}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(getTranslation('share', language) + ' - Link copied!');
    }
  };

  const handleInstall = () => {
    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      setShowIOSDialog(true);
      return;
    }

    // For Android/PWA
    const deferredPrompt = (window as any).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          toast.success('App installed successfully!');
        }
        (window as any).deferredPrompt = null;
      });
    } else {
      toast.info('This app is already installed or installation is not available');
    }
  };

  return (
    <>
      {/* Elegant Floating Settings Button */}
      <div className="fixed top-6 left-6 z-20">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] border-2 border-border/60 transition-all duration-300 hover:scale-105"
            >
              <Settings className="w-4 h-4 text-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-80 p-5 space-y-5 bg-background/95 backdrop-blur-md shadow-[var(--shadow-elegant)] border-2 border-border/60 rounded-2xl" 
            align={isRtl ? 'end' : 'start'}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/*  and Install with elegant styling */}
            <div className={cn("flex gap-3", isRtl && "flex-row-reverse")}>
              <Button
                variant="outline"
                size="sm"
                onClick={handle}
                className={cn("flex-1 gap-2 rounded-xl border-2 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 font-assistant", isRtl && "flex-row-reverse")}
              >
                <Share2 className="w-4 h-4" />
                {getTranslation('share', language)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleInstall}
                className={cn("flex-1 gap-2 rounded-xl border-2 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 font-assistant", isRtl && "flex-row-reverse")}
              >
                <Download className="w-4 h-4" />
                {getTranslation('install', language)}
              </Button>
            </div>

            {/* Font Size with elegant label */}
            <div className="space-y-3">
              <div className={cn("flex items-center gap-2", isRtl && "flex-row-reverse")}>
                <Type className="w-4 h-4 text-primary" />
                <Label className="text-xs font-cormorant font-semibold">{getTranslation('fontSize', language)}</Label>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={([value]) => onFontSizeChange(value)}
                min={14}
                max={32}
                step={1}
                className="w-full"
              />
            </div>

            {/* Prayer font — three siddur-friendly faces */}
            <div className="space-y-3">
              <Label className={cn("text-xs font-cormorant font-semibold flex items-center gap-2", isRtl && "flex-row-reverse")}>
                <BookOpen className="w-4 h-4 text-primary" />
                {getTranslation('prayerFont', language)}
              </Label>
              <Select value={prayerFont} onValueChange={(v) => onPrayerFontChange(v as PrayerFont)}>
                <SelectTrigger className="h-10 rounded-xl border-2 font-assistant">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {PRAYER_FONT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className={cn(opt.previewClass)}>
                      <span className={opt.previewClass}>אבג&nbsp;·&nbsp;</span>
                      <span className="font-assistant text-xs text-muted-foreground">
                        {getTranslation(opt.labelKey, language)}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language with refined styling */}
            <div className="space-y-3">
              <Label className={cn("text-xs font-cormorant font-semibold flex items-center gap-2", isRtl && "flex-row-reverse")}>
                <Languages className="w-4 h-4 text-primary" />
                {getTranslation('language', language)}
              </Label>
              <Select value={language} onValueChange={(v) => onLanguageChange(v as Language)}>
                <SelectTrigger className="h-10 rounded-xl border-2 font-assistant">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {supportedLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang} className="font-assistant">
                      {translations.languageOptions[lang][language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phonetic Toggle with elegant styling */}
            <div className={cn("flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/30", isRtl && "flex-row-reverse")}>
              <Label htmlFor="phonetic" className="text-xs font-cormorant font-semibold">
                {getTranslation('phonetic', language)}
              </Label>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-assistant transition-all duration-200", !phoneticMode ? "text-foreground font-semibold" : "text-muted-foreground")}>
                  Off
                </span>
                <Switch
                  id="phonetic"
                  checked={phoneticMode}
                  onCheckedChange={onPhoneticModeChange}
                />
                <span className={cn("text-xs font-assistant transition-all duration-200", phoneticMode ? "text-foreground font-semibold" : "text-muted-foreground")}>
                  On
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* iOS Installation Dialog with elegant styling */}
      <Dialog open={showIOSDialog} onOpenChange={setShowIOSDialog}>
        <DialogContent dir={isRtl ? 'rtl' : 'ltr'} className="rounded-2xl bg-background/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className={cn("text-2xl font-cormorant text-primary", isRtl ? "text-right" : "text-left")}>
              {translations.iosInstall.title[language]}
            </DialogTitle>
            <DialogDescription className={cn("space-y-4 pt-2", isRtl ? "text-right" : "text-left")}>
              <p className={cn("flex items-center gap-2 font-assistant", isRtl ? "flex-row-reverse" : "")}>
                {translations.iosInstall.step1[language]} <Share className="inline w-4 h-4 text-primary" />
              </p>
              <p className="font-assistant">{translations.iosInstall.step2[language]}</p>
              <p className="font-assistant">{translations.iosInstall.step3[language]}</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
