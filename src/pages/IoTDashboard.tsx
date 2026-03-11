import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Wifi, WifiOff } from "lucide-react";
import { SensorCards } from "@/components/iot/SensorCards";
import { SensorCharts } from "@/components/iot/SensorCharts";
import { SensorAdvisor } from "@/components/iot/SensorAdvisor";
import { SensorAlerts } from "@/components/iot/SensorAlerts";
import { DeviceManager } from "@/components/iot/DeviceManager";
import { TuyaSetup } from "@/components/iot/TuyaSetup";

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

const generateSimulatedReading = () => ({
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

const IoTDashboard = () => {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [liveData, setLiveData] = useState(generateSimulatedReading());
  const [historicalData] = useState(generateHistoricalData());
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isSimulating] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDevices();
      fetchPlants();
    }
  }, [user]);

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
          <Badge variant={isSimulating ? "default" : "secondary"} className="flex items-center gap-1">
            {isSimulating ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isSimulating ? "Symulacja" : "Offline"}
          </Badge>
        </div>

        <SensorCards data={liveData} />
        <SensorCharts data={historicalData} />
        <SensorAdvisor sensorData={liveData} />
        <DeviceManager devices={devices} plants={plants} onDeviceAdded={fetchDevices} />
        <TuyaSetup />
      </div>
    </Layout>
  );
};

export default IoTDashboard;
