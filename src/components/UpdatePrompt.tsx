import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, X } from 'lucide-react';

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        // Check for updates every 60 seconds
        const checkForUpdates = () => {
          reg.update();
        };
        
        const interval = setInterval(checkForUpdates, 60000);
        
        // Listen for new service worker waiting
        const handleUpdateFound = () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setShowPrompt(true);
              }
            });
          }
        };

        reg.addEventListener('updatefound', handleUpdateFound);

        return () => {
          clearInterval(interval);
          reg.removeEventListener('updatefound', handleUpdateFound);
        };
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      registration.waiting.addEventListener('statechange', (e) => {
        const target = e.target as ServiceWorker;
        if (target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-fade-in">
      <Alert className="bg-background border-primary shadow-lg">
        <Download className="h-4 w-4" />
        <AlertTitle>Dostępna aktualizacja!</AlertTitle>
        <AlertDescription className="mt-2">
          Nowa wersja aplikacji jest gotowa. Zaktualizuj teraz, aby korzystać z najnowszych funkcji.
        </AlertDescription>
        <div className="flex gap-2 mt-4">
          <Button onClick={handleUpdate} size="sm" className="flex-1">
            Zaktualizuj teraz
          </Button>
          <Button onClick={handleClose} variant="outline" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Alert>
    </div>
  );
}