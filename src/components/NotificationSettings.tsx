import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Check, Droplets, Leaf } from 'lucide-react';
import { toast } from 'sonner';
import { NotificationScheduler } from '@/utils/notificationScheduler';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface NotificationPreferences {
  watering: boolean;
  fertilization: boolean;
}

export function NotificationSettings() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [prefs, setPrefs] = useLocalStorage<NotificationPreferences>('notification_prefs', {
    watering: true,
    fertilization: true,
  });

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleEnable = async () => {
    try {
      const perm = await NotificationScheduler.requestPermission();
      setPermission(perm);
      if (perm === 'granted') {
        toast.success('Powiadomienia zostały włączone!');
      } else {
        toast.error('Powiadomienia zostały zablokowane');
      }
    } catch {
      toast.error('Twoja przeglądarka nie obsługuje powiadomień');
    }
  };

  const handleTestNotification = async () => {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification('🌿 Test powiadomienia', {
        body: 'Powiadomienia działają poprawnie!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'test',
      });
      toast.success('Wysłano testowe powiadomienie');
    }
  };

  const updatePref = (key: keyof NotificationPreferences, value: boolean) => {
    setPrefs({ ...prefs, [key]: value });
  };

  if (!('Notification' in window)) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">
          <BellOff className="h-8 w-8 mx-auto mb-2" />
          Twoja przeglądarka nie obsługuje powiadomień push.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Powiadomienia Push
        </CardTitle>
        <CardDescription>
          Otrzymuj przypomnienia o podlewaniu i nawożeniu roślin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {permission !== 'granted' ? (
          <div className="space-y-3">
            {permission === 'denied' ? (
              <p className="text-sm text-destructive">
                Powiadomienia są zablokowane. Zmień ustawienia w przeglądarce.
              </p>
            ) : (
              <Button onClick={handleEnable} className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                Włącz powiadomienia
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              Powiadomienia są aktywne
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="watering-notif" className="flex items-center gap-2 cursor-pointer">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  Przypomnienia o podlewaniu
                </Label>
                <Switch
                  id="watering-notif"
                  checked={prefs.watering}
                  onCheckedChange={(v) => updatePref('watering', v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="fert-notif" className="flex items-center gap-2 cursor-pointer">
                  <Leaf className="h-4 w-4 text-green-500" />
                  Przypomnienia o nawożeniu
                </Label>
                <Switch
                  id="fert-notif"
                  checked={prefs.fertilization}
                  onCheckedChange={(v) => updatePref('fertilization', v)}
                />
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleTestNotification}>
              Wyślij testowe powiadomienie
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
