import { Instagram, Mail, Phone, Info } from 'lucide-react';
import { Language } from '@/types/birkat';
import { getTranslation } from '@/data/translations';
import developerLogo from '@/assets/developer-logo.png';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface FooterProps {
  language: Language;
}

export const Footer = ({ language }: FooterProps) => {
  const isRtl = language === 'hebrew';
  const instagramUrl = 'https://www.instagram.com/hashamayim_hem_hagvul?igsh=MThoZTA4MmZwcjd3ZQ%3D%3D&utm_source=qr';

  return (
    <footer className="mt-16 border-t border-border/40 pt-10 pb-24 space-y-8">
      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-2 -mt-6">
        <div className="w-1 h-1 rounded-full bg-primary/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        <div className="w-1 h-1 rounded-full bg-primary/40" />
      </div>

      {/* Developer Credit */}
      <div className="text-center space-y-5" dir={isRtl ? 'rtl' : 'ltr'}>
        <p className="text-sm font-cormorant text-muted-foreground/80">
          {getTranslation('developer', language)}
        </p>
        
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={developerLogo} 
              alt="Hashamayim Hem Hagvul Logo" 
              className="h-24 w-24 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <p className="text-sm font-cormorant text-muted-foreground/80">
          {getTranslation('followUs', language)}
        </p>

        <a 
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-primary hover:text-primary/70 transition-all duration-300 font-assistant hover:scale-105 ${isRtl ? 'flex-row-reverse' : ''}`}
        >
          <Instagram className="w-5 h-5" />
          <span className="text-sm">@hashamayim_hem_hagvul</span>
        </a>
      </div>

      {/* Contact Info Button - always on left */}
      <div className="fixed bottom-6 left-6 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              size="icon" 
              variant="ghost"
              className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-accent/20 w-12 h-12"
            >
              <Info className="w-6 h-6 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRtl ? 'right' : 'left'} dir={isRtl ? 'rtl' : 'ltr'} className="bg-background/95 backdrop-blur-md">
            <SheetHeader className={isRtl ? 'text-right' : ''}>
              <SheetTitle className="text-2xl font-cormorant text-primary">{getTranslation('wantYourOwn', language)}</SheetTitle>
              <SheetDescription className="space-y-4 pt-6">
                <a 
                  href="https://wa.me/972525234327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-all duration-300 hover:shadow-soft group ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-assistant">+972-525234327</span>
                </a>

                <a 
                  href="mailto:shamayim.is.limit@gmail.com"
                  className={`flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-all duration-300 hover:shadow-soft group ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-assistant text-sm">shamayim.is.limit@gmail.com</span>
                </a>

                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-all duration-300 hover:shadow-soft group ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Instagram className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-assistant">@hashamayim_hem_hagvul</span>
                </a>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </footer>
  );
};
