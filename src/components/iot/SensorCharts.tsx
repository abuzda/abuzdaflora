import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

interface ChartData {
  time: string;
  soil_moisture: number;
  temperature: number;
  humidity: number;
}

export function SensorCharts({ data }: { data: ChartData[] }) {
  return (
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="soil_moisture" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Wilgotność %" />
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} name="Temp °C" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
