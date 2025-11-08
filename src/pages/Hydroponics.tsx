import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Leaf, Beaker, BookOpen, CheckCircle2 } from "lucide-react";

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basics">Podstawy</TabsTrigger>
            <TabsTrigger value="systems">Systemy</TabsTrigger>
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