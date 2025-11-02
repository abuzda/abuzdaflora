import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Download as DownloadIcon, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Download() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Zainstaluj Aplikację</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-6 w-6" />
              Aplikacja Mobilna PWA
            </CardTitle>
            <CardDescription>
              Zainstaluj AbuzdaFlora na swoim telefonie jednym kliknięciem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isInstalled ? (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Check className="h-5 w-5" />
                  <p className="font-semibold">Aplikacja jest już zainstalowana!</p>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Znajdziesz ją na ekranie głównym swojego urządzenia.
                </p>
              </div>
            ) : isInstallable ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Kliknij poniższy przycisk, aby zainstalować aplikację na swoim urządzeniu.
                </p>
                <Button onClick={handleInstall} size="lg" className="w-full">
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Zainstaluj Aplikację
                </Button>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3>Jak zainstalować:</h3>
                
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="font-semibold mb-2">📱 iPhone (Safari):</p>
                  <ol className="space-y-1 text-sm">
                    <li>Otwórz tę stronę w przeglądarce Safari</li>
                    <li>Kliknij przycisk "Udostępnij" (ikona ze strzałką w górę)</li>
                    <li>Przewiń w dół i wybierz "Dodaj do ekranu głównego"</li>
                    <li>Kliknij "Dodaj"</li>
                  </ol>
                </div>

                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="font-semibold mb-2">🤖 Android (Chrome):</p>
                  <ol className="space-y-1 text-sm">
                    <li>Otwórz tę stronę w przeglądarce Chrome</li>
                    <li>Kliknij menu (trzy kropki w prawym górnym rogu)</li>
                    <li>Wybierz "Dodaj do ekranu głównego" lub "Zainstaluj aplikację"</li>
                    <li>Kliknij "Zainstaluj"</li>
                  </ol>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">✨ Zalety PWA:</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                    <li>✅ Działa offline</li>
                    <li>✅ Szybkie ładowanie</li>
                    <li>✅ Ikona na ekranie głównym</li>
                    <li>✅ Pełnoekranowe działanie</li>
                    <li>✅ Automatyczne aktualizacje</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
