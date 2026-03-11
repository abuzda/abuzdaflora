import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wifi, RefreshCw, CheckCircle, Loader2, Key, Eye, EyeOff, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const TUYA_REGIONS = [
  { value: "eu", label: "Europa (EU)" },
  { value: "us", label: "Ameryka (US)" },
  { value: "cn", label: "Chiny (CN)" },
  { value: "in", label: "Indie (IN)" },
];

export function TuyaSetup() {
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [accessId, setAccessId] = useState("");
  const [accessSecret, setAccessSecret] = useState("");
  const [region, setRegion] = useState("eu");
  const [showSecret, setShowSecret] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) loadCredentials();
  }, [user]);

  const loadCredentials = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from("tuya_credentials")
        .select("tuya_access_id, tuya_access_secret, tuya_region")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (data) {
        setAccessId(data.tuya_access_id);
        setAccessSecret(data.tuya_access_secret);
        setRegion(data.tuya_region || "eu");
        setHasCredentials(true);
      }
    } catch (err) {
      console.error("Error loading credentials:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCredentials = async () => {
    if (!accessId.trim() || !accessSecret.trim()) {
      toast.error("Podaj Access ID i Access Secret");
      return;
    }
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("tuya_credentials")
        .upsert({
          user_id: user!.id,
          tuya_access_id: accessId.trim(),
          tuya_access_secret: accessSecret.trim(),
          tuya_region: region,
        }, { onConflict: "user_id" });

      if (error) throw error;
      setHasCredentials(true);
      toast.success("Klucze Tuya zapisane!");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Błąd zapisu kluczy");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCredentials = async () => {
    try {
      const { error } = await supabase
        .from("tuya_credentials")
        .delete()
        .eq("user_id", user!.id);

      if (error) throw error;
      setAccessId("");
      setAccessSecret("");
      setRegion("eu");
      setHasCredentials(false);
      toast.success("Klucze Tuya usunięte");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Błąd usuwania kluczy");
    }
  };

  const syncDevices = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("tuya-sync", {
        body: { action: "sync" },
      });

      if (error) throw error;

      if (data?.simulated) {
        setSyncResult("Brak kluczy Tuya. Wprowadź klucze API poniżej.");
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

  if (isLoading) {
    return (
      <Card className="border-dashed border-primary/30">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed border-primary/30">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Integracja z Tuya Smart
        </h3>

        {/* Credentials form */}
        <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
          <h4 className="text-sm font-medium flex items-center gap-2 text-foreground">
            <Key className="h-4 w-4" />
            Klucze API Tuya
          </h4>

          <div className="space-y-2">
            <Label htmlFor="tuya-access-id" className="text-xs text-muted-foreground">
              Access ID (Client ID)
            </Label>
            <Input
              id="tuya-access-id"
              placeholder="np. p9axf..."
              value={accessId}
              onChange={(e) => setAccessId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tuya-access-secret" className="text-xs text-muted-foreground">
              Access Secret (Client Secret)
            </Label>
            <div className="relative">
              <Input
                id="tuya-access-secret"
                type={showSecret ? "text" : "password"}
                placeholder="••••••••••••"
                value={accessSecret}
                onChange={(e) => setAccessSecret(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TUYA_REGIONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={saveCredentials} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
              {hasCredentials ? "Aktualizuj" : "Zapisz"}
            </Button>
            {hasCredentials && (
              <Button size="sm" variant="destructive" onClick={deleteCredentials}>
                <Trash2 className="h-4 w-4 mr-1" />
                Usuń klucze
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Klucze znajdziesz na{" "}
          <a href="https://iot.tuya.com" target="_blank" rel="noopener noreferrer" className="underline text-primary">
            iot.tuya.com
          </a>{" "}
          → Cloud → twój projekt → Overview.
        </p>

        {syncResult && (
          <div className="p-3 rounded-lg bg-muted/50 text-sm text-foreground flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            {syncResult}
          </div>
        )}

        <Button variant="outline" onClick={syncDevices} disabled={isSyncing || !hasCredentials}>
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
