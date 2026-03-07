import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Thermometer, Droplets, Wind, Battery, AlertTriangle } from "lucide-react";

interface SensorData {
  soil_moisture: number | null;
  temperature: number | null;
  humidity: number | null;
  battery_level: number | null;
}

const getMoistureStatus = (value: number) => {
  if (value < 30) return { label: "Sucha!", color: "destructive" as const, icon: AlertTriangle };
  if (value < 50) return { label: "Optymalna", color: "default" as const, icon: Droplets };
  return { label: "Wilgotna", color: "secondary" as const, icon: Droplets };
};

export function SensorCards({ data }: { data: SensorData }) {
  const moistureStatus = getMoistureStatus(data.soil_moisture ?? 0);
  const MoistureIcon = moistureStatus.icon;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="border-primary/20">
        <CardContent className="p-4 text-center">
          <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <p className="text-2xl font-bold text-foreground">{data.soil_moisture}%</p>
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
          <p className="text-2xl font-bold text-foreground">{data.temperature}°C</p>
          <p className="text-xs text-muted-foreground">Temperatura</p>
          <Badge variant="secondary" className="mt-2 text-xs">
            {(data.temperature ?? 0) >= 18 && (data.temperature ?? 0) <= 26 ? "✓ Optymalna" : "⚠ Sprawdź"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Wind className="h-8 w-8 mx-auto mb-2 text-teal-500" />
          <p className="text-2xl font-bold text-foreground">{data.humidity}%</p>
          <p className="text-xs text-muted-foreground">Wilgotność powietrza</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Battery className="h-8 w-8 mx-auto mb-2 text-green-500" />
          <p className="text-2xl font-bold text-foreground">{data.battery_level}%</p>
          <p className="text-xs text-muted-foreground">Bateria czujnika</p>
          <Progress value={data.battery_level ?? 0} className="mt-2 h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
