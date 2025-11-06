import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Download, Bell, Smartphone, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.error('Aplikacja jest już zainstalowana lub przeglądarka nie obsługuje instalacji');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast.success('Aplikacja została zainstalowana!');
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  const handleNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Twoja przeglądarka nie obsługuje powiadomień');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        toast.success('Powiadomienia zostały włączone!');
        
        // Schedule notifications based on user's collection
        scheduleNotifications();
      } else {
        toast.error('Powiadomienia zostały zablokowane');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Wystąpił błąd podczas włączania powiadomień');
    }
  };

  const scheduleNotifications = () => {
    // This will be triggered when user enables notifications
    // Actual scheduling logic will be in a separate service
    if ('serviceWorker' in navigator && 'Notification' in window && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        // Send message to service worker to schedule notifications
        registration.active?.postMessage({
          type: 'SCHEDULE_NOTIFICATIONS'
        });
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Zainstaluj Aplikację
          </h1>
          <p className="text-muted-foreground">
            Dodaj AbuzdaFlora do ekranu głównego i włącz powiadomienia
          </p>
        </div>

        <div className="space-y-4">
          {/* Install App Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                Zainstaluj na Telefonie
              </CardTitle>
              <CardDescription>
                Dodaj aplikację do ekranu głównego aby korzystać jak z natywnej aplikacji
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isInstalled ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Aplikacja jest już zainstalowana!</span>
                </div>
              ) : deferredPrompt ? (
                <Button onClick={handleInstallClick} className="w-full" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Zainstaluj Aplikację
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground space-y-3">
                  <p className="font-medium">Jak zainstalować aplikację:</p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold">Na iPhone (Safari):</p>
                      <ol className="list-decimal list-inside ml-2 space-y-1">
                        <li>Dotknij ikonę "Udostępnij" (kwadrat ze strzałką w górę)</li>
                        <li>Przewiń w dół i wybierz "Dodaj do ekranu początkowego"</li>
                        <li>Dotknij "Dodaj"</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold">Na Android (Chrome):</p>
                      <ol className="list-decimal list-inside ml-2 space-y-1">
                        <li>Dotknij menu (3 kropki w prawym górnym rogu)</li>
                        <li>Wybierz "Dodaj do ekranu głównego"</li>
                        <li>Dotknij "Dodaj"</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enable Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Włącz Powiadomienia
              </CardTitle>
              <CardDescription>
                Otrzymuj przypomnienia o podlewaniu i nawożeniu roślin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationPermission === 'granted' ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Powiadomienia są włączone!</span>
                </div>
              ) : notificationPermission === 'denied' ? (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="text-amber-600 dark:text-amber-400 font-medium">
                    Powiadomienia są zablokowane w ustawieniach przeglądarki
                  </p>
                  <p>Aby je włączyć:</p>
                  <ol className="list-decimal list-inside ml-2 space-y-1">
                    <li>Otwórz ustawienia przeglądarki</li>
                    <li>Znajdź ustawienia tej strony</li>
                    <li>Zmień ustawienie powiadomień na "Zezwalaj"</li>
                  </ol>
                </div>
              ) : (
                <Button onClick={handleNotificationPermission} className="w-full" size="lg">
                  <Bell className="w-5 h-5 mr-2" />
                  Włącz Powiadomienia
                </Button>
              )}

              <div className="text-sm text-muted-foreground mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">Co będziesz otrzymywać:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Przypomnienia o podlewaniu roślin</li>
                  <li>Przypomnienia o nawożeniu</li>
                  <li>Porady sezonowe pielęgnacji</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <Card>
            <CardHeader>
              <CardTitle>Korzyści z Aplikacji</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Błyskawiczne uruchamianie bez otwierania przeglądarki</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Działa offline - przeglądaj kolekcję bez internetu</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Przypomnienia push o pielęgnacji roślin</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Zajmuje mniej miejsca niż aplikacja z App Store</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Automatyczne aktualizacje bez pobierania</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
