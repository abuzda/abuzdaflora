import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface SensorData {
  soil_moisture: number | null;
  temperature: number | null;
  humidity: number | null;
  battery_level: number | null;
}

interface SensorAdvisorProps {
  sensorData: SensorData;
  plantName?: string;
}

export function SensorAdvisor({ sensorData, plantName }: SensorAdvisorProps) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAdvice = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("sensor-advisor", {
        body: {
          soil_moisture: sensorData.soil_moisture,
          temperature: sensorData.temperature,
          humidity: sensorData.humidity,
          battery_level: sensorData.battery_level,
          plant_name: plantName,
        },
      });

      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setAdvice(data.advice);
    } catch (err) {
      console.error("Advisor error:", err);
      toast.error("Nie udało się uzyskać porad AI");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          AI Doradca
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          Lovable AI
        </Badge>
      </CardHeader>
      <CardContent>
        {!advice && !isLoading && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-3">
              Uzyskaj spersonalizowane porady AI na podstawie aktualnych odczytów czujników
            </p>
            <Button onClick={getAdvice} size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Analizuj dane
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
            <span className="text-sm text-muted-foreground">Analizuję dane z czujników...</span>
          </div>
        )}

        {advice && !isLoading && (
          <div className="space-y-3">
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground">
              <ReactMarkdown>{advice}</ReactMarkdown>
            </div>
            <Button onClick={getAdvice} size="sm" variant="outline" className="w-full">
              <RefreshCw className="h-3 w-3 mr-2" />
              Odśwież porady
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
