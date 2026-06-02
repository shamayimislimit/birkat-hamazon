import { Header } from '@/components/Header';
import { SettingsToolbar } from '@/components/SettingsToolbar';
import { PrayerText } from '@/components/PrayerText';
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Elegant wedding background */}
      <div className="fixed inset-0 bg-[var(--gradient-wedding)] -z-10" />
      <div className="fixed inset-0 bg-[var(--gradient-overlay)] -z-10" />
      
      {/* Romantic decorative glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
      
      <div className="max-w-4xl mx-auto relative">
        <Header language={settings.language} nosach={settings.nosach} />

        <SettingsToolbar
          fontSize={settings.fontSize}
          onFontSizeChange={(size) => updateSettings({ fontSize: size })}
          nosach={settings.nosach}
          onNosachChange={(nosach) => updateSettings({ nosach })}
          language={settings.language}
          onLanguageChange={(language) => updateSettings({ language })}
          phoneticMode={settings.phoneticMode}
          onPhoneticModeChange={(phoneticMode) => updateSettings({ phoneticMode })}
        />

        <main className="p-4">
          <PrayerText
            language={settings.language}
            nosach={settings.nosach}
            phoneticMode={settings.phoneticMode}
            fontSize={settings.fontSize}
          />
        </main>

        <div className="px-4">
          <Footer language={settings.language} />
        </div>
      </div>
    </div>
  );
};

export default Index;
