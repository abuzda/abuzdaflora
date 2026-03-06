import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Thermometer,
  Droplets,
  Wind,
  Battery,
  Wifi,
  WifiOff,
  Plus,
  RefreshCw,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  tuya_device_id: string | null;
  plant_id: string | null;
  is_active: boolean;
  last_seen_at: string | null;
}

interface SensorReading {
  soil_moisture: number | null;
  temperature: number | null;
  humidity: number | null;
  battery_level: number | null;
  reading_at: string;
}

interface Plant {
  id: string;
  plant_name: string;
}

// Simulated live data generator
const generateSimulatedReading = (): Omit<SensorReading, "reading_at"> => ({
  soil_moisture: Math.round(30 + Math.random() * 50),
  temperature: Math.round((18 + Math.random() * 10) * 10) / 10,
  humidity: Math.round(40 + Math.random() * 40),
  battery_level: Math.round(60 + Math.random() * 40),
});

const generateHistoricalData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }),
      soil_moisture: Math.round(35 + Math.sin(i / 3) * 15 + Math.random() * 5),
      temperature: Math.round((20 + Math.sin(i / 4) * 3 + Math.random() * 2) * 10) / 10,
      humidity: Math.round(50 + Math.cos(i / 5) * 15 + Math.random() * 5),
    });
  }
  return data;
};

const getMoistureStatus = (value: number) => {
  if (value < 30) return { label: "Sucha!", color: "destructive" as const, icon: AlertTriangle };
  if (value < 50) return { label: "Optymalna", color: "default" as const, icon: Droplets };
  return { label: "Wilgotna", color: "secondary" as const, icon: Droplets };
};

const IoTDashboard = () => {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [liveData, setLiveData] = useState(generateSimulatedReading());
  const [historicalData] = useState(generateHistoricalData());
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDevicePlant, setNewDevicePlant] = useState("");
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDevices();
      fetchPlants();
    }
  }, [user]);

  // Simulate live data updates
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setLiveData(generateSimulatedReading());
    }, 5000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const fetchDevices = async () => {
    const { data } = await supabase
      .from("iot_devices")
      .select("*")
      .eq("user_id", user!.id);
    if (data) setDevices(data);
  };

  const fetchPlants = async () => {
    const { data } = await supabase
      .from("plant_collection")
      .select("id, plant_name")
      .eq("user_id", user!.id);
    if (data) setPlants(data);
  };

  const addDevice = async () => {
    if (!newDeviceName.trim()) return;
    const { error } = await supabase.from("iot_devices").insert({
      user_id: user!.id,
      device_name: newDeviceName,
      plant_id: newDevicePlant || null,
      device_type: "soil_sensor",
    });
    if (!error) {
      toast.success("Urządzenie dodane!");
      setNewDeviceName("");
      setNewDevicePlant("");
      setIsAddingDevice(false);
      fetchDevices();
    } else {
      toast.error("Błąd dodawania urządzenia");
    }
  };

  const moistureStatus = getMoistureStatus(liveData.soil_moisture ?? 0);
  const MoistureIcon = moistureStatus.icon;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              🌱 Czujniki IoT
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Monitoruj wilgotność gleby i temperaturę w czasie rzeczywistym
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={isSimulating ? "default" : "secondary"} className="flex items-center gap-1">
              {isSimulating ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              {isSimulating ? "Symulacja" : "Offline"}
            </Badge>
          </div>
        </div>

        {/* Live Sensor Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold text-foreground">{liveData.soil_moisture}%</p>
              <p className="text-xs text-muted-foreground">Wilgotność gleby</p>
              <Badge variant={moistureStatus.color} className="mt-2 text-xs">
                <MoistureIcon className="h-3 w-3 mr-1" />
                {moistureStatus.label}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold text-foreground">{liveData.temperature}°C</p>
              <p className="text-xs text-muted-foreground">Temperatura</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {(liveData.temperature ?? 0) >= 18 && (liveData.temperature ?? 0) <= 26 ? "✓ Optymalna" : "⚠ Sprawdź"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Wind className="h-8 w-8 mx-auto mb-2 text-teal-500" />
              <p className="text-2xl font-bold text-foreground">{liveData.humidity}%</p>
              <p className="text-xs text-muted-foreground">Wilgotność powietrza</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Battery className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold text-foreground">{liveData.battery_level}%</p>
              <p className="text-xs text-muted-foreground">Bateria czujnika</p>
              <Progress value={liveData.battery_level ?? 0} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                Wilgotność gleby (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="soil_moisture"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name="Wilgotność %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                Temperatura (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                    name="Temp °C"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Devices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Twoje urządzenia</CardTitle>
            <Dialog open={isAddingDevice} onOpenChange={setIsAddingDevice}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> Dodaj czujnik
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dodaj nowy czujnik</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nazwa urządzenia</Label>
                    <Input
                      value={newDeviceName}
                      onChange={(e) => setNewDeviceName(e.target.value)}
                      placeholder="np. Czujnik salon"
                    />
                  </div>
                  <div>
                    <Label>Przypisz do rośliny (opcjonalnie)</Label>
                    <Select value={newDevicePlant} onValueChange={setNewDevicePlant}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz roślinę" />
                      </SelectTrigger>
                      <SelectContent>
                        {plants.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.plant_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addDevice} className="w-full">
                    Dodaj urządzenie
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {devices.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Leaf className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Nie masz jeszcze żadnych czujników.</p>
                <p className="text-sm mt-1">
                  Dane wyświetlane powyżej to symulacja. Dodaj czujnik Tuya, aby zobaczyć rzeczywiste odczyty.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
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

        {/* Tuya Integration Info */}
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
            <Button variant="outline" className="mt-4" disabled>
              <RefreshCw className="h-4 w-4 mr-2" />
              Połącz z Tuya (wkrótce)
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IoTDashboard;
