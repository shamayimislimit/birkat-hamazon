import { Header } from '@/components/Header';
import { NosachToggle } from '@/components/NosachToggle';
import { SettingsToolbar } from '@/components/SettingsToolbar';
import { PrayerText } from '@/components/PrayerText';
import { MemorialSeal } from '@/components/MemorialSeal';
import { Footer } from '@/components/Footer';
import { useBirkatSettings } from '@/hooks/useBirkatSettings';
import { useEffect } from 'react';

const Index = () => {
  const { settings, updateSettings } = useBirkatSettings();

  // Listen for PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Sober gradient background, no decorative glows */}
      <div className="fixed inset-0 bg-[var(--gradient-wedding)] -z-10" />
      <div className="fixed inset-0 bg-[var(--gradient-overlay)] -z-10" />

      <div className="max-w-3xl mx-auto relative">
        <Header language={settings.language} nosach={settings.nosach} />

        <SettingsToolbar
          fontSize={settings.fontSize}
          onFontSizeChange={(size) => updateSettings({ fontSize: size })}
          language={settings.language}
          onLanguageChange={(language) => updateSettings({ language })}
          phoneticMode={settings.phoneticMode}
          onPhoneticModeChange={(phoneticMode) => updateSettings({ phoneticMode })}
          prayerFont={settings.prayerFont}
          onPrayerFontChange={(prayerFont) => updateSettings({ prayerFont })}
        />

        {/* Always-visible nosach toggle, sticky just under the header */}
        <div className="sticky top-0 z-10 py-3 bg-background/85 backdrop-blur-sm border-b border-border/60">
          <NosachToggle
            nosach={settings.nosach}
            onNosachChange={(nosach) => updateSettings({ nosach })}
            language={settings.language}
          />
        </div>

        <main className="p-4">
          <PrayerText
            language={settings.language}
            nosach={settings.nosach}
            phoneticMode={settings.phoneticMode}
            fontSize={settings.fontSize}
            prayerFont={settings.prayerFont}
          />

          <MemorialSeal language={settings.language} />
        </main>

        <div className="px-4">
          <Footer language={settings.language} />
        </div>
      </div>
    </div>
  );
};

export default Index;
