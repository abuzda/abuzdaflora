import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Sun, AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const plantLightRequirements = {
  "Monstera": { 
    min: 200, max: 400, name: "Monstera", type: "średnie światło",
    description: "Tropikalna pnącząca roślina o charakterystycznych dziurawych liściach. W naturze rośnie pod osłoną drzew, więc preferuje jasne, rozproszone światło bez bezpośredniego słońca."
  },
  "Sansevieria": { 
    min: 50, max: 300, name: "Sansewieria (Jęzor teściowej)", type: "niskie do średniego światła",
    description: "Wyjątkowo odporna roślina sukulent. Może rosnąć zarówno w cieniu, jak i na słońcu, choć wolniejszy wzrost przy niskim świetle. Idealna dla zapracowanych."
  },
  "Pothos": { 
    min: 100, max: 400, name: "Epipremnum (Pothos)", type: "niskie do średniego światła",
    description: "Szybko rosnąca roślina pnąca, bardzo tolerancyjna. Im jaśniej, tym więcej pstrych wzorów na liściach. Może rosnąć nawet w słabo oświetlonych pomieszczeniach."
  },
  "Ficus": { 
    min: 400, max: 800, name: "Fikus", type: "jasne światło",
    description: "Okazała roślina o dużych, błyszczących liściach. Wymaga jasnego miejsca bez bezpośredniego słońca. Wrażliwa na zmiany miejsca - wybierz raz na zawsze."
  },
  "Sukulent": { 
    min: 600, max: 1000, name: "Sukulent", type: "bardzo jasne światło",
    description: "Rośliny pustynne magazynujące wodę w mięsistych liściach. Potrzebują dużo jasnego światła, najlepiej z kilkoma godzinami bezpośredniego słońca dziennie."
  },
  "Kaktus": { 
    min: 800, max: 1200, name: "Kaktus", type: "pełne słońce",
    description: "Rośliny pustynne wymagające bardzo jasnego światła i bezpośredniego słońca. Idealne na południowe parapety. Przy słabym świetle deformują się i nie kwitną."
  },
  "Paproć": { 
    min: 100, max: 300, name: "Paproć", type: "niskie światło",
    description: "Roślina lasów deszczowych, naturalnie rosnąca w cieniu. Preferuje niskie do średniego światła i wysoką wilgotność. Idealna do łazienek."
  },
  "Storczyk": { 
    min: 300, max: 600, name: "Storczyk (Phalaenopsis)", type: "średnie do jasnego światła",
    description: "Elegancka roślina kwitnąca. Potrzebuje jasnego, rozproszonego światła bez bezpośredniego słońca. Za mało światła = brak kwiatów, za dużo = poparzenia liści."
  },
  "Zamiokulkas": {
    min: 100, max: 400, name: "Zamiokulkas (ZZ Plant)", type: "niskie do średniego światła",
    description: "Niezwykle odporna roślina magazynująca wodę w kłączach. Toleruje zarówno cień, jak i jasne światło. Prawie niezniszczalna, idealna dla początkujących."
  },
  "Skrzydłokwiat": {
    min: 100, max: 400, name: "Skrzydłokwiat (Spathiphyllum)", type: "niskie do średniego światła",
    description: "Roślina kwitnąca dobrze rosnąca w cieniu. Białe kwiaty pojawiają się nawet przy niskim świetle. Świetnie oczyszcza powietrze, idealna do biur."
  },
  "Aloes": {
    min: 600, max: 1000, name: "Aloes (Aloe Vera)", type: "bardzo jasne światło",
    description: "Leczniczy sukulent potrzebujący dużo światła. Wymaga jasnego miejsca z kilkoma godzinami bezpośredniego słońca. Przy słabym świetle wypuszcza długie, słabe liście."
  },
  "Filodendron": {
    min: 200, max: 500, name: "Filodendron", type: "średnie światło",
    description: "Tropikalna roślina pnąca o sercowatych liściach. Lubi jasne, rozproszone światło ale toleruje półcień. Bardzo łatwy w uprawie i szybko rosnący."
  },
  "Dracena": {
    min: 200, max: 600, name: "Dracena", type: "średnie do jasnego światła",
    description: "Elegancka roślina o wąskich, długich liściach. Preferuje jasne miejsca ale radzi sobie też w półcieniu. Doskonale oczyszcza powietrze z toksyn."
  },
  "Begonia": {
    min: 300, max: 700, name: "Begonia", type: "średnie do jasnego światła",
    description: "Roślina ozdobna z pięknymi liśćmi lub kwiatami. Potrzebuje jasnego, rozproszonego światła. Bezpośrednie słońce może spalić delikatne liście."
  },
  "Zioła_Kulinary": {
    min: 800, max: 1200, name: "Zioła kulinarne (Bazylia, Rozmaryn)", type: "bardzo jasne światło",
    description: "Zioła śródziemnomorskie wymagające dużo światła - minimum 6 godzin dziennie. Przy słabym świetle będą wyciągnięte i mniej aromatyczne."
  },
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
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kalkulator Światła i Lokalizacji</h1>
            <p className="text-muted-foreground max-w-3xl">
              Sprawdź, czy wybrane miejsce ma odpowiednie warunki świetlne dla Twojej rośliny. 
              Kalkulator wykorzystuje kamerę urządzenia do pomiaru poziomu światła i porównuje go z wymaganiami wybranego gatunku.
            </p>
          </div>

          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-lg">Jak to działa?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                • <strong>Wybierz roślinę</strong> - każdy gatunek ma swoje optymalne wymagania świetlne wyrażone w luksach (jednostka natężenia światła)
              </p>
              <p>
                • <strong>Skanuj miejsce</strong> - kamera analizuje jasność miejsca i oblicza przybliżony poziom światła
              </p>
              <p>
                • <strong>Otrzymaj rekomendację</strong> - dowiesz się czy miejsce jest odpowiednie i jakie zmiany wprowadzić
              </p>
              <p className="text-muted-foreground italic mt-2">
                💡 Dla najlepszych wyników skanuj w ciągu dnia, w godzinach kiedy roślina będzie stała w danym miejscu.
              </p>
            </CardContent>
          </Card>
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
            {selectedPlant && plantLightRequirements[selectedPlant as keyof typeof plantLightRequirements] && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2 text-sm">O tej roślinie:</h4>
                <p className="text-sm text-muted-foreground">
                  {plantLightRequirements[selectedPlant as keyof typeof plantLightRequirements].description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">
                    Wymaga: {plantLightRequirements[selectedPlant as keyof typeof plantLightRequirements].min}-
                    {plantLightRequirements[selectedPlant as keyof typeof plantLightRequirements].max} lux
                  </span>
                </div>
              </div>
            )}
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