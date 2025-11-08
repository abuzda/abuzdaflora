import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Sun, AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const plantLightRequirements = {
  "Monstera": { min: 200, max: 400, name: "Monstera", type: "średnie światło" },
  "Sansevieria": { min: 50, max: 300, name: "Sansewieria", type: "niskie do średniego światła" },
  "Pothos": { min: 100, max: 400, name: "Epipremnum", type: "niskie do średniego światła" },
  "Ficus": { min: 400, max: 800, name: "Fikus", type: "jasne światło" },
  "Sukulent": { min: 600, max: 1000, name: "Sukulent", type: "bardzo jasne światło" },
  "Kaktus": { min: 800, max: 1200, name: "Kaktus", type: "pełne słońce" },
  "Paproć": { min: 100, max: 300, name: "Paproć", type: "niskie światło" },
  "Storczyk": { min: 300, max: 600, name: "Storczyk", type: "średnie do jasnego światła" },
};

const LightCalculator = () => {
  const [selectedPlant, setSelectedPlant] = useState<string>("");
  const [lightLevel, setLightLevel] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [location, setLocation] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const analyzeLightFromCamera = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        
        // Czekamy chwilę, aby kamera się ustabilizowała
        setTimeout(() => {
          if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            if (context) {
              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;
              context.drawImage(videoRef.current, 0, 0);
              
              // Analiza jasności obrazu
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              let totalBrightness = 0;
              
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const brightness = (r + g + b) / 3;
                totalBrightness += brightness;
              }
              
              const averageBrightness = totalBrightness / (data.length / 4);
              // Konwersja na lux (przybliżona)
              const estimatedLux = Math.round(averageBrightness * 4);
              
              setLightLevel(estimatedLux);
              
              // Zatrzymaj stream
              stream.getTracks().forEach(track => track.stop());
              if (videoRef.current) {
                videoRef.current.srcObject = null;
              }
              setIsScanning(false);
            }
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Błąd dostępu do kamery:", error);
      alert("Nie można uzyskać dostępu do kamery. Spróbuj ręcznie wprowadzić poziom światła.");
      setIsScanning(false);
    }
  };

  const getRecommendation = () => {
    if (!selectedPlant || lightLevel === null) return null;
    
    const requirements = plantLightRequirements[selectedPlant as keyof typeof plantLightRequirements];
    const isGood = lightLevel >= requirements.min && lightLevel <= requirements.max;
    const isTooLow = lightLevel < requirements.min;
    
    return {
      isGood,
      isTooLow,
      requirements,
      currentLevel: lightLevel
    };
  };

  const recommendation = getRecommendation();

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kalkulator Światła</h1>
          <p className="text-muted-foreground">
            Sprawdź, czy wybrane miejsce ma odpowiednie warunki świetlne dla Twojej rośliny
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Lokalizacja
            </CardTitle>
            <CardDescription>
              Podaj nazwę miejsca, które chcesz sprawdzić
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              placeholder="np. Parapet w salonie, Balkon wschodni"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Wybierz roślinę
            </CardTitle>
            <CardDescription>
              Dla jakiej rośliny chcesz sprawdzić warunki?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedPlant} onValueChange={setSelectedPlant}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz gatunek rośliny" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(plantLightRequirements).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name} ({value.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Skanuj światło
            </CardTitle>
            <CardDescription>
              Użyj kamery, aby zmierzyć poziom światła w wybranym miejscu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={analyzeLightFromCamera}
              disabled={isScanning || !selectedPlant}
              className="w-full"
            >
              {isScanning ? "Skanowanie..." : "Rozpocznij skanowanie"}
            </Button>

            {isScanning && (
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover"
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white bg-black/50 px-4 py-2 rounded-lg">
                    Trzymaj aparat stabilnie...
                  </div>
                </div>
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden" />

            {lightLevel !== null && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Zmierzony poziom światła</div>
                <div className="text-2xl font-bold">{lightLevel} lux</div>
              </div>
            )}
          </CardContent>
        </Card>

        {recommendation && (
          <Alert variant={recommendation.isGood ? "default" : "destructive"}>
            {recommendation.isGood ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>
              {recommendation.isGood ? (
                <div>
                  <strong>Doskonałe miejsce!</strong>
                  <p className="mt-2">
                    {location || "Ta lokalizacja"} ma odpowiedni poziom światła dla rośliny {recommendation.requirements.name}.
                    Zmierzone {recommendation.currentLevel} lux mieści się w optymalnym zakresie 
                    {recommendation.requirements.min}-{recommendation.requirements.max} lux.
                  </p>
                </div>
              ) : recommendation.isTooLow ? (
                <div>
                  <strong>Za mało światła</strong>
                  <p className="mt-2">
                    {location || "Ta lokalizacja"} ma zbyt niski poziom światła dla rośliny {recommendation.requirements.name}.
                    Zmierzone {recommendation.currentLevel} lux jest poniżej wymaganego minimum {recommendation.requirements.min} lux.
                  </p>
                  <p className="mt-2 font-semibold">Rekomendacje:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Przenieś roślinę bliżej okna</li>
                    <li>Rozważ użycie lamp LED do wzrostu roślin</li>
                    <li>Wybierz gatunek wymagający mniej światła (np. Sansewieria, Paproć)</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <strong>Za dużo światła</strong>
                  <p className="mt-2">
                    {location || "Ta lokalizacja"} ma zbyt wysoki poziom światła dla rośliny {recommendation.requirements.name}.
                    Zmierzone {recommendation.currentLevel} lux przekracza maksimum {recommendation.requirements.max} lux.
                  </p>
                  <p className="mt-2 font-semibold">Rekomendacje:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Przenieś roślinę w bardziej zacienione miejsce</li>
                    <li>Użyj firanek do filtrowania światła</li>
                    <li>Wybierz gatunek lubiący więcej światła (np. Sukulent, Kaktus)</li>
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Przewodnik po poziomach światła</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between p-2 bg-muted rounded">
              <span>Niskie światło (cień)</span>
              <span className="font-semibold">50-300 lux</span>
            </div>
            <div className="flex justify-between p-2 bg-muted rounded">
              <span>Średnie światło (półcień)</span>
              <span className="font-semibold">300-600 lux</span>
            </div>
            <div className="flex justify-between p-2 bg-muted rounded">
              <span>Jasne światło (pośrednie)</span>
              <span className="font-semibold">600-1000 lux</span>
            </div>
            <div className="flex justify-between p-2 bg-muted rounded">
              <span>Bardzo jasne światło (bezpośrednie)</span>
              <span className="font-semibold">1000+ lux</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LightCalculator;