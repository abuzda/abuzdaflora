import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, Home, Sun, Droplets, ThermometerSun } from 'lucide-react';

export default function BeginnerPlants() {
  const easySeeds = [
    {
      name: 'Bazylia',
      latin: 'Ocimum basilicum',
      difficulty: 'Bardzo łatwa',
      time: '7-14 dni',
      tips: 'Sadź w ciepłej glebie (min. 20°C). Lubi słońce i regularny, ale umiarkowany podlew.',
      care: 'Przycinaj wierzchołki dla lepszego krzewienia.',
      icon: Sprout,
    },
    {
      name: 'Rukola',
      latin: 'Eruca sativa',
      difficulty: 'Bardzo łatwa',
      time: '5-7 dni',
      tips: 'Kiełkuje nawet w chłodniejszych temperaturach. Szybki wzrost.',
      care: 'Zbieraj młode liście. Regularnie podlewaj.',
      icon: Sprout,
    },
    {
      name: 'Rzodkiewka',
      latin: 'Raphanus sativus',
      difficulty: 'Bardzo łatwa',
      time: '3-7 dni',
      tips: 'Jedna z najszybciej rosnących roślin. Siej co 2 tygodnie dla ciągłych zbiorów.',
      care: 'Zbieraj po 3-4 tygodniach. Lubi chłodniejsze temperatury.',
      icon: Sprout,
    },
    {
      name: 'Sałata',
      latin: 'Lactuca sativa',
      difficulty: 'Łatwa',
      time: '7-14 dni',
      tips: 'Siej płytko, nasiona potrzebują światła do kiełkowania.',
      care: 'Regularny podlew. Zbieraj zewnętrzne liście.',
      icon: Sprout,
    },
    {
      name: 'Groszek cukrowy',
      latin: 'Pisum sativum',
      difficulty: 'Łatwa',
      time: '7-14 dni',
      tips: 'Siej wczesną wiosną. Potrzebuje podpory do wspinania.',
      care: 'Regularnie zbieraj strąki dla ciągłego plonowania.',
      icon: Sprout,
    },
    {
      name: 'Koper',
      latin: 'Anethum graveolens',
      difficulty: 'Łatwa',
      time: '10-14 dni',
      tips: 'Siej bezpośrednio do gruntu, nie lubi przesadzania.',
      care: 'Regularny podlew. Zbieraj młode listki.',
      icon: Sprout,
    },
    {
      name: 'Pietruszka',
      latin: 'Petroselinum crispum',
      difficulty: 'Średnia',
      time: '14-21 dni',
      tips: 'Nasiona namocz przed siewem. Kiełkuje wolno ale pewnie.',
      care: 'Regularny podlew. Odporna na chłód.',
      icon: Sprout,
    },
    {
      name: 'Kolendra',
      latin: 'Coriandrum sativum',
      difficulty: 'Łatwa',
      time: '7-10 dni',
      tips: 'Lubi chłodniejsze temperatury. Siej co kilka tygodni.',
      care: 'Zbieraj liście przed kwitnieniem.',
      icon: Sprout,
    },
    {
      name: 'Słonecznik',
      latin: 'Helianthus annuus',
      difficulty: 'Bardzo łatwa',
      time: '7-10 dni',
      tips: 'Siej bezpośrednio do gruntu. Bardzo szybki wzrost.',
      care: 'Minimalny podlew. Bardzo tolerancyjny.',
      icon: Sprout,
    },
    {
      name: 'Nagietki',
      latin: 'Calendula officinalis',
      difficulty: 'Bardzo łatwa',
      time: '5-14 dni',
      tips: 'Siej bezpośrednio. Odporne na chłód i suszę.',
      care: 'Usuwaj przekwitłe kwiaty dla dłuższego kwitnienia.',
      icon: Sprout,
    },
  ];

  const easyHouseplants = [
    {
      name: 'Skrzydłokwiat',
      latin: 'Spathiphyllum',
      light: 'Półcień do cienia',
      water: 'Umiarkowany podlew, sygnalizuje brak wody opadającymi liśćmi',
      care: 'Bardzo wybaczający błędów. Świetny dla zapominalskich.',
      tips: 'Biały kwiat pojawia się przy dobrych warunkach.',
      icon: Home,
    },
    {
      name: 'Sansewieria (Wężownica)',
      latin: 'Sansevieria trifasciata',
      light: 'Toleruje prawie każde oświetlenie',
      water: 'Rzadko - co 2-3 tygodnie',
      care: 'Niezniszczalna roślina. Przeżyje zaniedbanie.',
      tips: 'Oczyszcza powietrze. Idealna do sypialni.',
      icon: Home,
    },
    {
      name: 'Epipremnum złociste (Zroślicha)',
      latin: 'Epipremnum aureum',
      light: 'Umiarkowane do słabego światła',
      water: 'Co 7-10 dni',
      care: 'Szybko rośnie. Można hodować w wodzie.',
      tips: 'Przycinaj dla gęstszego wzrostu.',
      icon: Home,
    },
    {
      name: 'Aloes zwyczajny',
      latin: 'Aloe vera',
      light: 'Jasne, słoneczne miejsce',
      water: 'Rzadko - co 2-3 tygodnie',
      care: 'Sukulent - odporna na suszę.',
      tips: 'Sok z liści ma właściwości lecznicze.',
      icon: Home,
    },
    {
      name: 'Zamiokulkas',
      latin: 'Zamioculcas zamiifolia',
      light: 'Od słabego do umiarkowanego światła',
      water: 'Bardzo rzadko - co 2-4 tygodnie',
      care: 'Prawie niezniszczalna. Idealna dla zapracowanych.',
      tips: 'Wolno rośnie ale bardzo odporna.',
      icon: Home,
    },
    {
      name: 'Chlorophytum (Zielistka)',
      latin: 'Chlorophytum comosum',
      light: 'Jasne miejsce bez bezpośredniego słońca',
      water: 'Regularnie - co 5-7 dni',
      care: 'Tolerancyjna i szybko rosnąca.',
      tips: 'Tworzy młode roślinki na stolonach - łatwe rozmnażanie.',
      icon: Home,
    },
    {
      name: 'Paprotka',
      latin: 'Nephrolepis exaltata',
      light: 'Półcień',
      water: 'Regularnie, utrzymuj wilgotność',
      care: 'Lubi wilgoć - często zraszaj.',
      tips: 'Idealna do łazienki.',
      icon: Home,
    },
    {
      name: 'Monstera dziurawa',
      latin: 'Monstera deliciosa',
      light: 'Jasne, rozproszone światło',
      water: 'Co 7-10 dni',
      care: 'Popularna i efektowna. Łatwa w pielęgnacji.',
      tips: 'Duże liście regularnie przecieraj z kurzu.',
      icon: Home,
    },
    {
      name: 'Dracena',
      latin: 'Dracaena marginata',
      light: 'Umiarkowane światło',
      water: 'Co 7-14 dni',
      care: 'Bardzo odporna i dekoracyjna.',
      tips: 'Oczyszcza powietrze z toksyn.',
      icon: Home,
    },
    {
      name: 'Fikus sprężysty',
      latin: 'Ficus elastica',
      light: 'Jasne, rozproszone światło',
      water: 'Co 7-10 dni',
      care: 'Szybko rośnie. Bardzo dekoracyjny.',
      tips: 'Liście przecieraj wilgotną szmatką.',
      icon: Home,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Sprout className="h-8 w-8 text-primary" />
            Rośliny dla Początkujących
          </h1>
          <p className="text-muted-foreground text-lg">
            Najlepsze rośliny na start Twojej przygody z ogrodnictwem
          </p>
        </div>

        <Tabs defaultValue="seeds" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="seeds" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" />
              Łatwy wysiew
            </TabsTrigger>
            <TabsTrigger value="houseplants" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Rośliny doniczkowe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seeds" className="space-y-6">
            <Card className="bg-primary/5 border-primary/20 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-primary" />
                  Wskazówki do siewu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✓ Zachowaj odpowiednią głębokość siewu (zazwyczaj 2-3 razy grubość nasienia)</p>
                <p>✓ Utrzymuj glebę równomiernie wilgotną do czasu kiełkowania</p>
                <p>✓ Temperatura ma znaczenie - większość nasion kiełkuje w 18-24°C</p>
                <p>✓ Nie zakrywaj drobnych nasion ziemią - potrzebują światła</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {easySeeds.map((plant) => (
                <Card key={plant.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="h-6 w-6 text-primary" />
                      {plant.name}
                    </CardTitle>
                    <CardDescription className="italic">{plant.latin}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mb-2">
                        {plant.difficulty}
                      </span>
                      <span className="inline-block text-xs bg-secondary/50 px-2 py-1 rounded-full mb-2 ml-2">
                        Kiełkowanie: {plant.time}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Wskazówki:</h4>
                      <p className="text-sm text-muted-foreground">{plant.tips}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Pielęgnacja:</h4>
                      <p className="text-sm text-muted-foreground">{plant.care}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="houseplants" className="space-y-6">
            <Card className="bg-primary/5 border-primary/20 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Podstawowe zasady
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-primary" />
                  Sprawdź wymagania świetlne przed wyborem miejsca
                </p>
                <p className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary" />
                  Podlewaj gdy wierzchnia warstwa gleby jest sucha
                </p>
                <p className="flex items-center gap-2">
                  <ThermometerSun className="h-4 w-4 text-primary" />
                  Większość roślin lubi temperatury 18-24°C
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {easyHouseplants.map((plant) => (
                <Card key={plant.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-6 w-6 text-primary" />
                      {plant.name}
                    </CardTitle>
                    <CardDescription className="italic">{plant.latin}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
                        <Sun className="h-4 w-4 text-primary" />
                        Światło:
                      </h4>
                      <p className="text-sm text-muted-foreground">{plant.light}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
                        <Droplets className="h-4 w-4 text-primary" />
                        Podlewanie:
                      </h4>
                      <p className="text-sm text-muted-foreground">{plant.water}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Pielęgnacja:</h4>
                      <p className="text-sm text-muted-foreground">{plant.care}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Porady:</h4>
                      <p className="text-sm text-muted-foreground">{plant.tips}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
