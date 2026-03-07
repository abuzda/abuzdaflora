import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi, RefreshCw, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function TuyaSetup() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const syncDevices = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("tuya-sync", {
        body: { action: "sync" },
      });

      if (error) throw error;

      if (data?.simulated) {
        setSyncResult("Tuya API nie jest jeszcze skonfigurowane. Skontaktuj się z administratorem, aby dodać klucze TUYA_ACCESS_ID i TUYA_ACCESS_SECRET.");
        toast.info("Tryb symulacji — brak kluczy Tuya API");
      } else if (data?.results) {
        const synced = data.results.filter((r: any) => r.status === "synced").length;
        setSyncResult(`Zsynchronizowano ${synced} z ${data.results.length} urządzeń.`);
        toast.success(`Zsynchronizowano ${synced} urządzeń!`);
      } else {
        setSyncResult(data?.message || "Brak urządzeń do synchronizacji.");
      }
    } catch (err) {
      console.error("Sync error:", err);
      toast.error("Błąd synchronizacji z Tuya");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card className="border-dashed border-primary/30">
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Integracja z Tuya Smart
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Aby połączyć rzeczywiste czujniki, potrzebujesz:
        </p>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Konta na <strong>Tuya IoT Platform</strong> (iot.tuya.com)</li>
          <li>Klucza API (Access ID) i Secret Key z platformy Tuya</li>
          <li>Bramki WiFi Tuya z sparowanymi czujnikami Bluetooth</li>
        </ol>
        <p className="text-sm text-muted-foreground mt-3">
          Po skonfigurowaniu, czujniki będą automatycznie wysyłać odczyty do Twojego dashboardu.
        </p>

        {syncResult && (
          <div className="mt-3 p-3 rounded-lg bg-muted/50 text-sm text-foreground flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            {syncResult}
          </div>
        )}

        <Button variant="outline" className="mt-4" onClick={syncDevices} disabled={isSyncing}>
          {isSyncing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          {isSyncing ? "Synchronizuję..." : "Synchronizuj z Tuya"}
        </Button>
      </CardContent>
    </Card>
  );
}
