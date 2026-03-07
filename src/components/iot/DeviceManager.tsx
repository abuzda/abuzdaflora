import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Leaf } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  tuya_device_id: string | null;
  plant_id: string | null;
  is_active: boolean;
  last_seen_at: string | null;
}

interface Plant {
  id: string;
  plant_name: string;
}

interface DeviceManagerProps {
  devices: Device[];
  plants: Plant[];
  onDeviceAdded: () => void;
}

export function DeviceManager({ devices, plants, onDeviceAdded }: DeviceManagerProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [plantId, setPlantId] = useState("");

  const addDevice = async () => {
    if (!name.trim() || !user) return;
    const { error } = await supabase.from("iot_devices").insert({
      user_id: user.id,
      device_name: name,
      plant_id: plantId || null,
      device_type: "soil_sensor",
    });
    if (!error) {
      toast.success("Urządzenie dodane!");
      setName("");
      setPlantId("");
      setIsOpen(false);
      onDeviceAdded();
    } else {
      toast.error("Błąd dodawania urządzenia");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Twoje urządzenia</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" /> Dodaj czujnik
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj nowy czujnik</DialogTitle>
              <DialogDescription>Podaj nazwę czujnika i opcjonalnie przypisz go do rośliny.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nazwa urządzenia</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="np. Czujnik salon" />
              </div>
              <div>
                <Label>Przypisz do rośliny (opcjonalnie)</Label>
                <Select value={plantId} onValueChange={setPlantId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz roślinę" />
                  </SelectTrigger>
                  <SelectContent>
                    {plants.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.plant_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addDevice} className="w-full">Dodaj urządzenie</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {devices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Leaf className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Nie masz jeszcze żadnych czujników.</p>
            <p className="text-sm mt-1">Dane wyświetlane powyżej to symulacja. Dodaj czujnik Tuya, aby zobaczyć rzeczywiste odczyty.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${device.is_active ? "bg-green-500" : "bg-muted"}`} />
                  <div>
                    <p className="font-medium text-sm text-foreground">{device.device_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.tuya_device_id ? `Tuya: ${device.tuya_device_id}` : "Brak połączenia z Tuya"}
                    </p>
                  </div>
                </div>
                <Badge variant={device.is_active ? "default" : "secondary"}>
                  {device.is_active ? "Aktywny" : "Nieaktywny"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
