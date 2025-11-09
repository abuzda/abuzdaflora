import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Leaf, Beaker, BookOpen, CheckCircle2, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { NutrientCalculator } from "@/components/NutrientCalculator";
import step1 from "@/assets/hydro-diy/step1-materials.jpg";
import step2 from "@/assets/hydro-diy/step2-drilling.jpg";
import step3 from "@/assets/hydro-diy/step3-airpump.jpg";
import step4 from "@/assets/hydro-diy/step4-netpots.jpg";
import step5 from "@/assets/hydro-diy/step5-nutrients.jpg";
import step6 from "@/assets/hydro-diy/step6-planting.jpg";
import step7 from "@/assets/hydro-diy/step7-complete.jpg";

const Hydroponics = () => {
  const beginnerPlants = [
    {
      name: "Sałata",
      difficulty: "Łatwa",
      growthTime: "30-45 dni",
      description: "Idealna dla początkujących, szybko rośnie i nie wymaga dużo uwagi"
    },
    {
      name: "Bazylia",
      difficulty: "Łatwa",
      growthTime: "28-40 dni",
      description: "Aromatyczne zioło, łatwe w uprawie hydroponicznej"
    },
    {
      name: "Mięta",
      difficulty: "Łatwa",
      growthTime: "90 dni",
      description: "Bardzo odporna roślina, dobrze rośnie w systemach hydroponicznych"
    },
    {
      name: "Szpinak",
      difficulty: "Łatwa",
      growthTime: "40-50 dni",
      description: "Wymaga niewiele światła, doskonały dla początkujących"
    },
    {
      name: "Truskawki",
      difficulty: "Średnia",
      growthTime: "60-90 dni",
      description: "Wymaga więcej uwagi, ale daje wspaniałe rezultaty"
    },
    {
      name: "Pomidory koktajlowe",
      difficulty: "Średnia",
      growthTime: "60-80 dni",
      description: "Idealne do małych systemów, smaczne i produktywne"
    },
    {
      name: "Pothos (Epipremnum)",
      difficulty: "Bardzo łatwa",
      growthTime: "Ciągły",
      description: "Roślina ozdobna, praktycznie niezniszczalna w hydroponice"
    },
    {
      name: "Monstera",
      difficulty: "Łatwa",
      growthTime: "Ciągły",
      description: "Piękna roślina ozdobna, dobrze rośnie w wodzie"
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hydroponika dla Początkujących</h1>
          <p className="text-muted-foreground">
            Poznaj podstawy uprawy roślin bez gleby i odkryj, które gatunki są idealne na start
          </p>
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basics">Podstawy</TabsTrigger>
            <TabsTrigger value="systems">Systemy</TabsTrigger>
            <TabsTrigger value="diy">Roztwory DIY</TabsTrigger>
            <TabsTrigger value="gallery">Budowa DIY</TabsTrigger>
            <TabsTrigger value="plants">Rośliny</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Czym jest hydroponika?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Hydroponika to metoda uprawy roślin bez użycia gleby. Rośliny rosną w wodzie wzbogaconej 
                  w składniki odżywcze lub w obojętnym medium (np. keramzyt, perlit), które jest regularnie 
                  nawadniane roztworem odżywczym.
                </p>
                
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold">Zalety hydroponiki:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Szybszy wzrost</strong> - rośliny mają bezpośredni dostęp do składników odżywczych</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Oszczędność wody</strong> - zużycie wody jest o 90% mniejsze niż w tradycyjnej uprawie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Brak szkodników glebowych</strong> - mniej problemów z chorobami i pasożytami</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Uprawa przez cały rok</strong> - niezależnie od pory roku i warunków zewnętrznych</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Oszczędność miejsca</strong> - możliwość uprawy wertykalnej</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5" />
                  Podstawowe składniki
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">1. Roztwór odżywczy</h4>
                    <p className="text-sm text-muted-foreground">
                      Specjalny płyn zawierający wszystkie niezbędne składniki odżywcze (azot, fosfor, potas, mikroelementy). 
                      Można kupić gotowy lub przygotować samodzielnie.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">2. Światło</h4>
                    <p className="text-sm text-muted-foreground">
                      Naturalne światło słoneczne lub lampy LED do uprawy roślin (grow lights). 
                      Większość roślin wymaga 12-16 godzin światła dziennie.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">3. Medium uprawowe (opcjonalne)</h4>
                    <p className="text-sm text-muted-foreground">
                      Keramzyt, perlit, wełna mineralna, kokoswłókno - zapewniają podparcie dla korzeni 
                      i zatrzymują wilgoć.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">4. pH i EC</h4>
                    <p className="text-sm text-muted-foreground">
                      Regularne sprawdzanie poziomu pH (5.5-6.5) i przewodności elektrycznej (EC) 
                      roztworu jest kluczowe dla zdrowia roślin.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">5. Napowietrzanie</h4>
                    <p className="text-sm text-muted-foreground">
                      W niektórych systemach konieczne jest napowietrzanie wody (pompa powietrza), 
                      aby korzenie miały dostęp do tlenu.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="systems" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  Typy systemów hydroponicznych
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">1. Deep Water Culture (DWC)</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Dla początkujących
                    </p>
                    <p className="text-sm mb-2">
                      Korzenie wiszą bezpośrednio w napowietrzonym roztworze odżywczym. Najprostszy system do rozpoczęcia.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> sałata, bazylia, mięta, szpinak
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">2. Kratky (pasywny system)</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Dla początkujących
                    </p>
                    <p className="text-sm mb-2">
                      Najprostszy system bez użycia pompy. Roślina pobiera wodę i składniki odżywcze, 
                      a poziom wody stopniowo opada, pozostawiając miejsce na tlen dla korzeni.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> sałata, zioła, rośliny doniczkowe
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">3. Nutrient Film Technique (NFT)</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Średnio zaawansowany
                    </p>
                    <p className="text-sm mb-2">
                      Cienka warstwa roztworu odżywczego przepływa przez kanały, w których rosną rośliny. 
                      Wymaga pompy recyrkulacyjnej.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> sałata, truskawki, zioła
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">4. Ebb and Flow (przypływ i odpływ)</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Średnio zaawansowany
                    </p>
                    <p className="text-sm mb-2">
                      System okresowo zalewa medium uprawowe roztworem odżywczym, a następnie pozwala mu spłynąć 
                      z powrotem do zbiornika.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> pomidory, papryka, różne rośliny jednocześnie
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">5. Wicking (system knotowy)</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Dla początkujących
                    </p>
                    <p className="text-sm mb-2">
                      Najprostszy pasywny system, w którym knot (sznurek) przenosi roztwór odżywczy 
                      z rezerwuaru do medium uprawowego.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> zioła, rośliny doniczkowe o małych wymaganiach wodnych
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">6. Aeroponika</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Zaawansowany
                    </p>
                    <p className="text-sm mb-2">
                      Korzenie wiszą w powietrzu i są regularnie spryskiwane mgłą z roztworu odżywczego. 
                      Najszybszy wzrost, ale wymaga więcej doświadczenia i sprzętu.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> pomidory, papryka, truskawki, rośliny o wysokich wymaganiach
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">7. Drip System (system kroplowy)</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Średnio zaawansowany
                    </p>
                    <p className="text-sm mb-2">
                      Roztwór odżywczy jest podawany bezpośrednio do każdej rośliny przez system kroplowy. 
                      Nadmiar spływa z powrotem do zbiornika lub jest odprowadzany.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> większe rośliny jak pomidory, ogórki, papryka
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">8. Dutch Bucket System</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Średnio zaawansowany
                    </p>
                    <p className="text-sm mb-2">
                      Każda roślina rośnie w osobnym "wiadrze" wypełnionym medium uprawowym. 
                      Roztwór odżywczy jest dostarczany na górę i spływa przez medium.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> duże rośliny jak pomidory, ogórki, cukinie
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">9. Vertical Tower Garden</h3>
                    <p className="text-sm mb-2">
                      <strong>Poziom:</strong> Dla początkujących do średnio zaawansowanych
                    </p>
                    <p className="text-sm mb-2">
                      Wieża z otworami na rośliny, gdzie roztwór odżywczy spływa od góry lub jest 
                      rozprowadzany systemem kroplowym. Oszczędza miejsce - idealne dla małych przestrzeni.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Idealne dla:</strong> sałata, zioła, truskawki, rośliny ozdobne
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Porady dla początkujących</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Zacznij od prostego systemu DWC lub Kratky</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Wybierz łatwe rośliny jak sałata lub bazylia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Monitoruj pH roztworu regularnie (5.5-6.5)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Wymień roztwór odżywczy co 2-3 tygodnie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Zapewnij odpowiednie oświetlenie (12-16h dziennie)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Utrzymuj odpowiednią temperaturę (18-24°C)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diy" className="space-y-4">
            <NutrientCalculator />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5" />
                  Jak przygotować roztwór odżywczy?
                </CardTitle>
                <CardDescription>
                  Samodzielne przygotowanie roztworu jest tańsze i pozwala na pełną kontrolę
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Podstawowy roztwór dla początkujących</h3>
                  <p className="text-sm mb-4">Na 10 litrów wody destylowanej lub odstanej (bez chloru):</p>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-semibold">Makroelementy:</p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• 25g Saletra wapniowa (Ca(NO₃)₂) - azot i wapń</li>
                        <li>• 10g Siarczan magnezu (MgSO₄) - magnez i siarka</li>
                        <li>• 15g Fosforan monopotasowy (KH₂PO₄) - fosfor i potas</li>
                        <li>• 20g Azotan potasowy (KNO₃) - azot i potas</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-semibold">Mikroelementy (gotowa mieszanka):</p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• 5ml roztworu chelatu żelaza (Fe-EDTA 13%)</li>
                        <li>• 2ml roztworu mikroelementów (Mn, Zn, Cu, B, Mo)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <p className="text-sm">
                      <strong>⚠️ Ważne:</strong> Nie mieszaj saletr wapniowej bezpośrednio z siarczanem magnezu - 
                      rozpuść je osobno w małej ilości wody, a potem dodaj do głównego zbiornika.
                    </p>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Łatwy roztwór dla ziół i sałaty</h3>
                  <p className="text-sm mb-4">Na 5 litrów wody:</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>15g nawóz wieloskładnikowy</strong> (np. NPK 20-20-20) - dostępny w każdym sklepie ogrodniczym</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>5g siarczan magnezu</strong> (sól Epsom) - dostępna w aptece</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>2ml chelat żelaza</strong> - można kupić online lub w sklepie ogrodniczym</span>
                    </li>
                  </ul>

                  <p className="text-sm mt-4 italic text-muted-foreground">
                    To najprostsze rozwiązanie, które działa świetnie dla większości ziół i warzyw liściastych!
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Roztwór dla pomidorów i warzyw owocowych</h3>
                  <p className="text-sm mb-4">Na 10 litrów wody (wyższe stężenie fosforu i potasu dla owocowania):</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>30g Saletra wapniowa</strong> (Ca(NO₃)₂)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>25g Azotan potasowy</strong> (KNO₃)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>20g Fosforan monopotasowy</strong> (KH₂PO₄) - wyższe stężenie dla kwitnienia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>12g Siarczan magnezu</strong> (MgSO₄)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>6ml chelat żelaza i 3ml mikroelementy</strong></span>
                    </li>
                  </ul>

                  <p className="text-sm mt-4 italic text-muted-foreground">
                    Zwiększone stężenie K i P pomaga w obfitym owocowaniu!
                  </p>
                </div>

                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Roztwór dla truskawek</h3>
                  <p className="text-sm mb-4">Na 5 litrów wody (zoptymalizowany dla roślin owocowych jagodowych):</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>12g Saletra wapniowa</strong> - dla mocnych owoców</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>10g Siarczan potasowy</strong> (K₂SO₄) - dla słodyczy owoców</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>8g Fosforan monopotasowy</strong> (KH₂PO₄)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>6g Siarczan magnezu</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>4ml chelat żelaza, 2ml mikroelementy</strong></span>
                    </li>
                  </ul>

                  <div className="mt-3 p-2 bg-background/50 rounded text-xs">
                    <strong>Wskazówka:</strong> Truskawki potrzebują EC 1.8-2.2 mS/cm i pH 5.8-6.2
                  </div>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Roztwór Masterblend (profesjonalny przepis)</h3>
                  <p className="text-sm mb-4">Popularny roztwór 3-częściowy na 3.8 litra (1 galon):</p>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-semibold">Część A - Masterblend 4-18-38:</p>
                      <p className="text-sm mt-1">• 12g nawóz Masterblend (lub podobny NPK 4-18-38)</p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-semibold">Część B - Siarczan magnezu:</p>
                      <p className="text-sm mt-1">• 12g sól Epsom (MgSO₄·7H₂O)</p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-semibold">Część C - Saletra wapniowa:</p>
                      <p className="text-sm mt-1">• 12g Ca(NO₃)₂·4H₂O</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <p className="text-sm">
                      <strong>⚠️ Kolejność dodawania:</strong> Najpierw A+B razem, potem osobno C. 
                      Nigdy nie mieszaj B i C razem przed dodaniem do wody!
                    </p>
                  </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Prosty roztwór z kompostu (organiczny)</h3>
                  <p className="text-sm mb-4">Naturalny roztwór dla miłośników ekologii:</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>200g dobrego kompostu lub humusu</strong> w woreczku z gazy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>10L wody odstanej</strong> - zamocz kompost na 24-48h</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>50ml płynnego nawozu rybnego</strong> lub z glonów</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>1 łyżka melasy</strong> - dla mikroorganizmów</span>
                    </li>
                  </ul>

                  <p className="text-sm mt-4 italic text-muted-foreground">
                    Ten roztwór jest mniej precyzyjny, ale całkowicie naturalny i bezpieczny dla ziół i warzyw liściastych.
                  </p>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Roztwór dla roślin ozdobnych</h3>
                  <p className="text-sm mb-4">Na 5 litrów wody (dla Pothos, Monstera, Philodendron):</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>8g Nawóz NPK 20-20-20</strong> (zrównoważony)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>3g Siarczan magnezu</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>2ml Chelat żelaza</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>5ml Ekstrakt z wodorostów</strong> (opcjonalnie - dla lepszego wzrostu)</span>
                    </li>
                  </ul>

                  <div className="mt-3 p-2 bg-background/50 rounded text-xs">
                    EC dla roślin ozdobnych: 1.0-1.5 mS/cm (niższe niż dla warzyw)
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">Krok po kroku - przygotowanie</h3>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary shrink-0">1.</span>
                      <span>Użyj czystej, destylowanej lub przynajmniej odstanej wody (24h) aby chlor wyparował</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary shrink-0">2.</span>
                      <span>Rozpuść każdy składnik osobno w małej ilości ciepłej wody (nie gorącej!)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary shrink-0">3.</span>
                      <span>Dodaj rozpuszczone składniki do głównego zbiornika z wodą, mieszając dokładnie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary shrink-0">4.</span>
                      <span>Sprawdź pH roztworu (powinno być 5.5-6.5). Użyj kwasu cytrynowego do obniżenia lub sody oczyszczonej do podwyższenia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary shrink-0">5.</span>
                      <span>Zmierz EC (przewodność elektryczną) - dla większości roślin 1.5-2.5 mS/cm</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pielęgnacja i konserwacja roztworu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Codziennie:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Sprawdź poziom wody i uzupełnij czystą wodą</li>
                      <li>• Obserwuj rośliny pod kątem zmian koloru lub wzrostu</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Co 3-4 dni:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Sprawdź i dostosuj pH (5.5-6.5)</li>
                      <li>• Sprawdź EC - jeśli spada, dodaj więcej roztworu odżywczego</li>
                      <li>• Sprawdź temperaturę roztworu (18-24°C jest optymalne)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Co 2-3 tygodnie:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Wymień cały roztwór odżywczy na świeży</li>
                      <li>• Wyczyść zbiornik i system z osadów</li>
                      <li>• Sprawdź korzenie pod kątem choróbowych objawów</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Raz w miesiącu:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Dokładne czyszczenie całego systemu</li>
                      <li>• Dezynfekcja (roztwór nadtlenku wodoru 3% - 50ml/10L wody)</li>
                      <li>• Sprawdzenie i wymiana filtrów (jeśli system je posiada)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Najczęstsze problemy i rozwiązania
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">Brązowe, śliskie korzenie:</p>
                      <p className="text-muted-foreground">→ Gnicie korzeni. Wymień roztwór, zwiększ napowietrzanie, obniż temperaturę</p>
                    </div>
                    <div>
                      <p className="font-semibold">Żółknące liście (od dołu):</p>
                      <p className="text-muted-foreground">→ Niedobór azotu. Dodaj więcej roztworu odżywczego lub zwiększ EC</p>
                    </div>
                    <div>
                      <p className="font-semibold">Biały osad na korzeniach:</p>
                      <p className="text-muted-foreground">→ Zbyt wysokie EC lub twarda woda. Rozcieńcz roztwór, użyj destylowanej wody</p>
                    </div>
                    <div>
                      <p className="font-semibold">Glony w zbiorniku:</p>
                      <p className="text-muted-foreground">→ Za dużo światła dociera do roztworu. Zasłoń zbiornik nieprzezroczystym materiałem</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Narzędzia i wyposażenie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold mb-2">Niezbędne:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Miernik pH (10-30 zł)</li>
                      <li>• Roztwór kalibracyjny pH</li>
                      <li>• Miernik EC/TDS (50-100 zł)</li>
                      <li>• Termometr</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold mb-2">Przydatne:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Pompa powietrza z dyfuzorem</li>
                      <li>• Pipety do dozowania</li>
                      <li>• Waga elektroniczna (0.1g)</li>
                      <li>• Pojemniki na składniki</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Budowa systemu hydroponicznego DWC krok po kroku
                </CardTitle>
                <CardDescription>
                  Kompletny przewodnik wizualny budowy prostego systemu Deep Water Culture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {/* Step 1 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                      <h3 className="text-lg font-semibold">Przygotowanie materiałów</h3>
                    </div>
                    <img src={step1} alt="Krok 1 - Materiały" className="w-full rounded-lg border" />
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Potrzebne materiały:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Pojemnik plastikowy z pokrywką (10-20L)</li>
                        <li>• Doniczki sieciowe (net pots) 5-8cm średnicy</li>
                        <li>• Pompa powietrza akwariowa</li>
                        <li>• Przewód silikonowy</li>
                        <li>• Dyfuzor powietrza (air stone)</li>
                        <li>• Keramzyt lub hydroton</li>
                        <li>• Roztwór odżywczy</li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                      <h3 className="text-lg font-semibold">Wiercenie otworów</h3>
                    </div>
                    <img src={step2} alt="Krok 2 - Wiercenie" className="w-full rounded-lg border" />
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">
                        Wywiercić otwory w pokrywce pojemnika, dostosowane do rozmiaru doniczek sieciowych. 
                        Rozmieść je równomiernie, zachowując odstęp min. 15cm między roślinami. 
                        Dodatkowo wywiercić małe otwory na przewód powietrzny.
                      </p>
                      <p className="text-sm mt-2 font-semibold">
                        💡 Wskazówka: Użyj otwornic lub ostrych nożyczek do plastiku. Wygładź krawędzie papierem ściernym.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                      <h3 className="text-lg font-semibold">Instalacja pompy powietrza</h3>
                    </div>
                    <img src={step3} alt="Krok 3 - Pompa powietrza" className="w-full rounded-lg border" />
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">
                        Podłącz dyfuzor powietrza (air stone) do przewodu i umieść na dnie pojemnika. 
                        Połącz przewód z pompą powietrza. Napełnij pojemnik czystą wodą do poziomu około 5-7cm 
                        poniżej pokrywki. Włącz pompę - powinieneś zobaczyć bąbelki unoszące się w wodzie.
                      </p>
                      <p className="text-sm mt-2 font-semibold">
                        ⚠️ Ważne: Pompa musi działać 24/7, aby dostarczać tlen do korzeni!
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                      <h3 className="text-lg font-semibold">Przygotowanie doniczek sieciowych</h3>
                    </div>
                    <img src={step4} alt="Krok 4 - Doniczki" className="w-full rounded-lg border" />
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">
                        Wypełnij doniczki sieciowe keramzytem lub hydrotonem. Jeśli używasz sadzonek, 
                        delikatnie oczyść korzenie z ziemi pod bieżącą wodą. Umieść sadzonkę w doniczce 
                        i uzupełnij medium uprawowe wokół korzeni. Włóż doniczki w otwory w pokrywce.
                      </p>
                      <p className="text-sm mt-2 font-semibold">
                        💡 Wskazówka: Korzenie powinny lekko dotykać wody na początku. Z czasem opadnie poziom.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">5</div>
                      <h3 className="text-lg font-semibold">Dodanie roztworu odżywczego</h3>
                    </div>
                    <img src={step5} alt="Krok 5 - Roztwór" className="w-full rounded-lg border" />
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">
                        Przygotuj roztwór odżywczy według instrukcji na opakowaniu lub użyj przepisu DIY 
                        z zakładki "Roztwory DIY". Dodaj roztwór do wody w pojemniku. Sprawdź pH (powinno 
                        być między 5.5-6.5) i EC roztworu. Dostosuj jeśli potrzeba.
                      </p>
                      <p className="text-sm mt-2 font-semibold">
                        📊 Dla sałaty i ziół: EC około 1.2-1.8 mS/cm, pH 5.5-6.0
                      </p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">6</div>
                      <h3 className="text-lg font-semibold">Sadzenie roślin</h3>
                    </div>
                    <img src={step6} alt="Krok 6 - Sadzenie" className="w-full rounded-lg border" />
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">
                        Umieść młode sadzonki w przygotowanych doniczkach sieciowych. Upewnij się, 
                        że korzenie mają kontakt z roztworem odżywczym. Zabezpiecz roślinę dodatkowym 
                        keramzytem. Pierwszych kilka dni przyciemnij system, aby rośliny się zaaklimatyzowały.
                      </p>
                      <p className="text-sm mt-2 font-semibold">
                        🌱 Najłatwiejsze na start: sałata, bazylia, mięta
                      </p>
                    </div>
                  </div>

                  {/* Step 7 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">7</div>
                      <h3 className="text-lg font-semibold">System gotowy!</h3>
                    </div>
                    <img src={step7} alt="Krok 7 - Gotowy system" className="w-full rounded-lg border" />
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Dalsze kroki i konserwacja:</h4>
                      <ul className="text-sm space-y-2">
                        <li>✅ Zapewnij 12-16 godzin światła dziennie (naturalne lub lampy LED)</li>
                        <li>✅ Sprawdzaj poziom wody codziennie - uzupełniaj według potrzeb</li>
                        <li>✅ Monitoruj pH i EC co 2-3 dni</li>
                        <li>✅ Wymieniaj całkowicie roztwór co 2-3 tygodnie</li>
                        <li>✅ Utrzymuj temperaturę 18-24°C</li>
                        <li>✅ Pierwszy plon sałaty możesz zebrać już po 30-40 dniach!</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-lg">🎉 Gratulacje!</h4>
                    <p className="text-sm">
                      Masz już działający system hydroponiczny! To dopiero początek Twojej przygody z uprawą bez gleby. 
                      Możesz teraz eksperymentować z różnymi roślinami i optymalizować warunki wzrostu. 
                      Pamiętaj, że praktyka czyni mistrza - każdy system może wymagać drobnych dostosowań.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Najlepsze rośliny dla początkujących
                </CardTitle>
                <CardDescription>
                  Rośliny idealne do uprawy hydroponicznej w domu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {beginnerPlants.map((plant, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{plant.name}</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {plant.difficulty}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <strong>Czas wzrostu:</strong> {plant.growthTime}
                      </div>
                      <p className="text-sm">{plant.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rośliny ozdobne w hydroponice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>
                  Wiele popularnych roślin doniczkowych doskonale rośnie w wodzie lub systemach hydroponicznych:
                </p>
                <ul className="grid gap-2 md:grid-cols-2">
                  <li className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Pothos (Epipremnum)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Monstera deliciosa</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Filodendron</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Bambus szczęścia</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Paproć</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Skrzydłokwiat</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Hydroponics;