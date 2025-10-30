import { useState, useRef } from "react";
import { Camera, Upload, Loader2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PlantData {
  plantName: string;
  scientificName: string;
  light: string;
  watering: string;
  humidity: string;
  soil: string;
  fertilizing: string;
  tips: string;
  commonIssues: string;
}

interface DiagnosisData {
  diagnosis: string;
  symptoms: string;
  causes: string;
  treatment: string;
  prevention: string;
}

export const PlantIdentifier = () => {
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"identify" | "diagnose">("identify");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const convertImageToJPEG = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          // Create canvas and draw image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          // Calculate dimensions (max 1024px to reduce size)
          const maxSize = 1024;
          let width = img.width;
          let height = img.height;

          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and convert to JPEG
          ctx.drawImage(img, 0, 0, width, height);
          const jpegBase64 = canvas.toDataURL("image/jpeg", 0.9);
          resolve(jpegBase64);
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (file: File, diagnosisMode: boolean = false) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Proszę wybrać plik graficzny");
      return;
    }
    // Block unsupported HEIC/HEIF to avoid AI extraction errors
    const isHeic = /heic|heif/i.test(file.type) || file.name?.toLowerCase().endsWith(".heic") || file.name?.toLowerCase().endsWith(".heif");
    if (isHeic) {
      toast.error("Format HEIC nieobsługiwany. Wybierz JPEG/PNG lub użyj aparatu.");
      return;
    }

    setIsIdentifying(true);
    setPlantData(null);
    setDiagnosisData(null);

    try {
      // Convert image to JPEG base64
      const base64String = await convertImageToJPEG(file);
      setSelectedImage(base64String);

      try {
        const { data, error } = await supabase.functions.invoke("identify-plant", {
          body: { imageBase64: base64String, diagnosisMode },
        });

        if (error) throw error;

        if (!data.success) {
          throw new Error(data.error || "Nie udało się rozpoznać rośliny");
        }

        if (diagnosisMode) {
          setDiagnosisData(data.data);
          toast.success("Diagnoza została wykonana!");
        } else {
          setPlantData(data.data);
          toast.success("Roślina rozpoznana!");
        }
      } catch (err) {
        console.error("Error identifying plant:", err);
        toast.error(
          err instanceof Error ? err.message : "Wystąpił błąd podczas rozpoznawania"
        );
      } finally {
        setIsIdentifying(false);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Błąd podczas przetwarzania zdjęcia");
      setIsIdentifying(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, activeMode === "diagnose");
    }
  };

  return (
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Global hidden inputs used by both tabs */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          ref={cameraInputRef}
          className="hidden"
        />
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="hidden"
        />
        <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="identify">Rozpoznaj Roślinę</TabsTrigger>
            <TabsTrigger value="diagnose">Diagnoza Problemu</TabsTrigger>
          </TabsList>

        <TabsContent value="identify" className="space-y-6 mt-8">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <Leaf className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Zrób lub wgraj zdjęcie rośliny
                </h3>
                <p className="text-muted-foreground">
                  Dowiedz się wszystkiego o swojej roślinie doniczkowej
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={isIdentifying}
                  className="w-full h-24"
                >
                  {isIdentifying ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-6 h-6 mr-2" />
                      Zrób Zdjęcie
                    </>
                  )}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isIdentifying}
                  className="w-full h-24"
                >
                  {isIdentifying ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 mr-2" />
                      Wgraj z Galerii
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {selectedImage && !isIdentifying && plantData && (
            <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/20 p-6">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full max-h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-primary">{plantData.plantName}</h2>
                  <p className="text-muted-foreground italic">{plantData.scientificName}</p>
                </div>

                <div className="grid gap-6">
                  <InfoSection title="💡 Oświetlenie" content={plantData.light} />
                  <InfoSection title="💧 Podlewanie" content={plantData.watering} />
                  <InfoSection title="💨 Wilgotność" content={plantData.humidity} />
                  <InfoSection title="🌱 Podłoże" content={plantData.soil} />
                  <InfoSection title="🌿 Nawożenie" content={plantData.fertilizing} />
                  <InfoSection title="✨ Wskazówki" content={plantData.tips} />
                  <InfoSection title="⚠️ Częste Problemy" content={plantData.commonIssues} />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="diagnose" className="space-y-6 mt-8">
          <Card className="border-2 border-accent/20 shadow-lg">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <Leaf className="w-12 h-12 mx-auto text-accent" />
                <h3 className="text-xl font-semibold text-foreground">
                  Zdiagnozuj Problem Rośliny
                </h3>
                <p className="text-muted-foreground">
                  Wgraj zdjęcie problematycznego liścia lub całej rośliny
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={isIdentifying}
                  className="w-full h-24 bg-accent hover:bg-accent/90"
                >
                  {isIdentifying ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-6 h-6 mr-2" />
                      Zrób Zdjęcie
                    </>
                  )}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isIdentifying}
                  className="w-full h-24"
                >
                  {isIdentifying ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 mr-2" />
                      Wgraj z Galerii
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {selectedImage && !isIdentifying && diagnosisData && (
            <Card className="border-2 border-accent/20 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-accent/10 to-destructive/10 p-6">
                <img
                  src={selectedImage}
                  alt="Plant diagnosis"
                  className="w-full max-h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-accent">{diagnosisData.diagnosis}</h2>
                </div>

                <div className="grid gap-6">
                  <InfoSection title="🔍 Objawy" content={diagnosisData.symptoms} />
                  <InfoSection title="❓ Przyczyny" content={diagnosisData.causes} />
                  <InfoSection title="💊 Leczenie" content={diagnosisData.treatment} />
                  <InfoSection title="🛡️ Zapobieganie" content={diagnosisData.prevention} />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InfoSection = ({ title, content }: { title: string; content: string }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
  </div>
);
