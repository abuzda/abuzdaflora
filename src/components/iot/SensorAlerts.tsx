import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bell, Droplets, Thermometer, AlertTriangle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

export interface AlertThresholds {
  moistureEnabled: boolean;
  moistureMin: number;
  temperatureEnabled: boolean;
  temperatureMin: number;
  temperatureMax: number;
}

const DEFAULT_THRESHOLDS: AlertThresholds = {
  moistureEnabled: true,
  moistureMin: 25,
  temperatureEnabled: true,
  temperatureMin: 10,
  temperatureMax: 35,
};

interface SensorAlertsProps {
  sensorData: {
    soil_moisture: number | null;
    temperature: number | null;
    humidity: number | null;
    battery_level: number | null;
  };
}

export function SensorAlerts({ sensorData }: SensorAlertsProps) {
  const [thresholds, setThresholds] = useLocalStorage<AlertThresholds>('sensor_alert_thresholds', DEFAULT_THRESHOLDS);
  const [lastAlertTime, setLastAlertTime] = useLocalStorage<Record<string, number>>('sensor_last_alerts', {});

  const ALERT_COOLDOWN_MS = 5 * 60 * 1000; // 5 min cooldown between same alerts

  useEffect(() => {
    checkAlerts();
  }, [sensorData]);

  const canAlert = (key: string) => {
    const last = lastAlertTime[key] || 0;
    return Date.now() - last > ALERT_COOLDOWN_MS;
  };

  const markAlerted = (key: string) => {
    setLastAlertTime({ ...lastAlertTime, [key]: Date.now() });
  };

  const sendPushNotification = async (title: string, body: string, tag: string) => {
    if ('Notification' in window && Notification.permission === 'granted' && 'serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(title, {
          body,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag,
          vibrate: [200, 100, 200],
          requireInteraction: false,
        });
      } catch (e) {
        console.error('Push notification error:', e);
      }
    }
  };

  const checkAlerts = () => {
    const moisture = sensorData.soil_moisture;
    const temp = sensorData.temperature;

    if (thresholds.moistureEnabled && moisture !== null && moisture < thresholds.moistureMin) {
      if (canAlert('moisture_low')) {
        const msg = `Wilgotność gleby wynosi ${moisture}% — poniżej progu ${thresholds.moistureMin}%!`;
        toast.warning('⚠️ Niska wilgotność gleby!', { description: msg });
        sendPushNotification('⚠️ Niska wilgotność gleby!', msg, 'sensor-moisture-low');
        markAlerted('moisture_low');
      }
    }

    if (thresholds.temperatureEnabled && temp !== null) {
      if (temp < thresholds.temperatureMin && canAlert('temp_low')) {
        const msg = `Temperatura wynosi ${temp}°C — poniżej progu ${thresholds.temperatureMin}°C!`;
        toast.warning('🥶 Za niska temperatura!', { description: msg });
        sendPushNotification('🥶 Za niska temperatura!', msg, 'sensor-temp-low');
        markAlerted('temp_low');
      }
      if (temp > thresholds.temperatureMax && canAlert('temp_high')) {
        const msg = `Temperatura wynosi ${temp}°C — powyżej progu ${thresholds.temperatureMax}°C!`;
        toast.warning('🔥 Za wysoka temperatura!', { description: msg });
        sendPushNotification('🔥 Za wysoka temperatura!', msg, 'sensor-temp-high');
        markAlerted('temp_high');
      }
    }
  };

  const activeAlerts: string[] = [];
  if (thresholds.moistureEnabled && sensorData.soil_moisture !== null && sensorData.soil_moisture < thresholds.moistureMin) {
    activeAlerts.push(`Wilgotność ${sensorData.soil_moisture}% < ${thresholds.moistureMin}%`);
  }
  if (thresholds.temperatureEnabled && sensorData.temperature !== null) {
    if (sensorData.temperature < thresholds.temperatureMin) activeAlerts.push(`Temp ${sensorData.temperature}°C < ${thresholds.temperatureMin}°C`);
    if (sensorData.temperature > thresholds.temperatureMax) activeAlerts.push(`Temp ${sensorData.temperature}°C > ${thresholds.temperatureMax}°C`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-primary" />
          Alerty czujników
          {activeAlerts.length > 0 && (
            <Badge variant="destructive" className="ml-auto text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {activeAlerts.length} aktywne
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeAlerts.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 space-y-1">
            {activeAlerts.map((a, i) => (
              <p key={i} className="text-sm text-destructive flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {a}
              </p>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 cursor-pointer">
                <Droplets className="h-4 w-4 text-blue-500" />
                Alert wilgotności gleby
              </Label>
              <Switch
                checked={thresholds.moistureEnabled}
                onCheckedChange={(v) => setThresholds({ ...thresholds, moistureEnabled: v })}
              />
            </div>
            {thresholds.moistureEnabled && (
              <div className="pl-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Minimalna wilgotność</span>
                  <span className="font-medium">{thresholds.moistureMin}%</span>
                </div>
                <Slider
                  value={[thresholds.moistureMin]}
                  onValueChange={([v]) => setThresholds({ ...thresholds, moistureMin: v })}
                  min={5}
                  max={60}
                  step={5}
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 cursor-pointer">
                <Thermometer className="h-4 w-4 text-orange-500" />
                Alert temperatury
              </Label>
              <Switch
                checked={thresholds.temperatureEnabled}
                onCheckedChange={(v) => setThresholds({ ...thresholds, temperatureEnabled: v })}
              />
            </div>
            {thresholds.temperatureEnabled && (
              <div className="pl-6 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min. temperatura</span>
                    <span className="font-medium">{thresholds.temperatureMin}°C</span>
                  </div>
                  <Slider
                    value={[thresholds.temperatureMin]}
                    onValueChange={([v]) => setThresholds({ ...thresholds, temperatureMin: v })}
                    min={0}
                    max={20}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Max. temperatura</span>
                    <span className="font-medium">{thresholds.temperatureMax}°C</span>
                  </div>
                  <Slider
                    value={[thresholds.temperatureMax]}
                    onValueChange={([v]) => setThresholds({ ...thresholds, temperatureMax: v })}
                    min={25}
                    max={50}
                    step={1}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {!('Notification' in window) || Notification.permission !== 'granted' ? (
          <p className="text-xs text-muted-foreground">
            💡 Włącz powiadomienia push w <a href="/profile" className="text-primary underline">profilu</a>, aby otrzymywać alerty na telefon.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
