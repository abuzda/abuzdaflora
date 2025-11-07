import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Droplets, Sun, Wind, Leaf, Thermometer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import monsteraImg from '@/assets/plants/monstera.jpg';
import sansevieriaImg from '@/assets/plants/sansevieria.jpg';
import pothosImg from '@/assets/plants/pothos.jpg';
import zamioculcasImg from '@/assets/plants/zamioculcas.jpg';
import ficusImg from '@/assets/plants/ficus.jpg';
import spathiphyllumImg from '@/assets/plants/spathiphyllum.jpg';
import aloeImg from '@/assets/plants/aloe.jpg';
import orchidImg from '@/assets/plants/orchid.jpg';
import fernImg from '@/assets/plants/fern.jpg';
import cactusImg from '@/assets/plants/cactus.jpg';
import begoniaImg from '@/assets/plants/begonia.jpg';
import basilImg from '@/assets/plants/basil.jpg';
import mintImg from '@/assets/plants/mint.jpg';
import rosemaryImg from '@/assets/plants/rosemary.jpg';
import lavenderImg from '@/assets/plants/lavender.jpg';

export default function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState('');

  const plants = [
    {
      name: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      commonName: 'Filodendron dziurawy',
      difficulty: 'Łatwa',
      light: 'Jasne, rozproszone',
      water: 'Umiarkowane (co 7-10 dni)',
      humidity: 'Wysoka (60-80%)',
      temperature: '18-27°C',
      image: monsteraImg,
      description: 'Tropikalna roślina o spektakularnych, dziurawych liściach. W naturze rośnie jako pnącze w lasach deszczowych. Może osiągnąć imponujące rozmiary.',
      care: 'Podlewaj, gdy górna warstwa ziemi wyschnie. Regularnie czyść liście wilgotną ściereczką. Zapewnij podporę do wspinania się.',
      tips: 'Dziury w liściach (fenestry) pojawiają się dopiero na dojrzałych roślinach. Młode rośliny mają pełne liście.'
    },
    {
      name: 'Sansevieria',
      scientificName: 'Sansevieria trifasciata',
      commonName: 'Jęzor teściowej',
      difficulty: 'Bardzo łatwa',
      light: 'Dowolne (słońce do cienia)',
      water: 'Rzadkie (co 2-3 tygodnie)',
      humidity: 'Niska (30-50%)',
      temperature: '15-30°C',
      image: sansevieriaImg,
      description: 'Jedna z najbardziej wytrzymałych roślin doniczkowych. Oczyszcza powietrze z toksyn, wydziela tlen w nocy. Idealna do sypialni i biur.',
      care: 'Prawie niezawodna! Podlewaj bardzo rzadko, dopiero gdy ziemia całkowicie wyschnie. Unikaj zalewania - to jedyny sposób na jej zniszczenie.',
      tips: 'Może przetrwać miesiąc bez podlewania. Rośnie wolno, ale żyje bardzo długo. Doskonała dla zapracowanych.'
    },
    {
      name: 'Pothos',
      scientificName: 'Epipremnum aureum',
      commonName: 'Epipremnum złociste',
      difficulty: 'Łatwa',
      light: 'Jasne do półcienia',
      water: 'Umiarkowane (co 5-7 dni)',
      humidity: 'Średnia (40-60%)',
      temperature: '17-30°C',
      image: pothosImg,
      description: 'Szybko rosnąca roślina pnąca o pięknych, sercowatych liściach. Doskonale oczyszcza powietrze. Może rosnąć w wodzie lub ziemi.',
      care: 'Podlewaj, gdy ziemia jest sucha w dotyku. Przycinaj długie pędy, aby zachęcić do krzewienia. Sadzonki łatwo się ukorzeniają w wodzie.',
      tips: 'Im jaśniej, tym więcej pstrych wzorów na liściach. W cieniu liście będą ciemnozielone.'
    },
    {
      name: 'Zamiokulkas',
      scientificName: 'Zamioculcas zamiifolia',
      commonName: 'Zamiokulkas zamiolistny',
      difficulty: 'Bardzo łatwa',
      light: 'Jasne do półcienia',
      water: 'Rzadkie (co 2-3 tygodnie)',
      humidity: 'Niska (30-50%)',
      temperature: '15-27°C',
      image: zamioculcasImg,
      description: 'Ekstremalne odporna roślina o błyszczących, skórzastych liściach. Magazynuje wodę w grubych kłączach. Symbol dobrobytu.',
      care: 'Bardzo tolerancyjna! Podlewaj rzadko - lepiej za mało niż za dużo. Może przetrwać w słabym świetle i przy zaniedbaniu.',
      tips: 'Nowe pędy wyrastają z ziemi - to normalny wzrost. Może żyć latami przy minimalnej pielęgnacji.'
    },
    {
      name: 'Fikus',
      scientificName: 'Ficus elastica',
      commonName: 'Figowiec sprężysty',
      difficulty: 'Średnia',
      light: 'Jasne (bez bezpośredniego słońca)',
      water: 'Umiarkowane (co 7 dni)',
      humidity: 'Średnia (40-60%)',
      temperature: '16-24°C',
      image: ficusImg,
      description: 'Okazała roślina o dużych, lśniących liściach w kolorze ciemnozielonym lub bordowym. Może urosnąć do 3 metrów wysokości w domu.',
      care: 'Regularnie podlewaj, utrzymując ziemię lekko wilgotną. Czyść liście wilgotną szmatką. Unikaj częstego przesadzania.',
      tips: 'Nie lubi zmian - wybierz miejsce raz na zawsze. Zrzucanie liści to reakcja stresowa na przeprowadzkę.'
    },
    {
      name: 'Skrzydłokwiat',
      scientificName: 'Spathiphyllum',
      commonName: 'Skrzydłokwiat',
      difficulty: 'Łatwa',
      light: 'Półcień do cienia',
      water: 'Obfite (co 3-5 dni)',
      humidity: 'Wysoka (50-70%)',
      temperature: '18-27°C',
      image: spathiphyllumImg,
      description: 'Elegancka roślina z białymi, żaglowaymi kwiatami. Doskonale oczyszcza powietrze z formaldehydu i benzenu. Kwiatnie przez cały rok.',
      care: 'Utrzymuj ziemię stale wilgotną (nie mokrą). Zraszaj liście regularnie. Lubi cień - idealna do łazienki czy ciemnego pomieszczenia.',
      tips: 'Ma "barometr wody" - liście opadają, gdy potrzebuje podlewania, ale szybko się podnoszą po nawodnieniu.'
    },
    {
      name: 'Aloes',
      scientificName: 'Aloe vera',
      commonName: 'Aloes zwyczajny',
      difficulty: 'Łatwa',
      light: 'Jasne, słoneczne',
      water: 'Rzadkie (co 2-3 tygodnie)',
      humidity: 'Niska (30-40%)',
      temperature: '15-27°C',
      image: aloeImg,
      description: 'Leczniczy sukulent z grubymi, mięsistymi liśćmi pełnymi żelu. Doskonały na oparzenia, rany i pielęgnację skóry. Łatwy w uprawie.',
      care: 'Podlewaj rzadko, dopiero gdy ziemia jest całkowicie sucha. Wymaga świetnej gleby sukulentowej z dobrym drenażem. Lubi słońce.',
      tips: 'Żel z liści ma właściwości lecznicze - możesz go stosować bezpośrednio na skórę. Wytwarza młode odrosty.'
    },
    {
      name: 'Storczyk',
      scientificName: 'Phalaenopsis',
      commonName: 'Storczyk motylek',
      difficulty: 'Średnia',
      light: 'Jasne, rozproszone (bez słońca)',
      water: 'Specjalne (moczenie co 7-10 dni)',
      humidity: 'Wysoka (60-80%)',
      temperature: '18-25°C',
      image: orchidImg,
      description: 'Spektakularne kwiaty trwają miesiącami! Elegancka roślina do domu. Kwiatostany pojawiają się 2-3 razy w roku przy odpowiedniej pielęgnacji.',
      care: 'Podlewaj przez moczenie korzeni na 15 min raz w tygodniu. Używaj przezroczystej doniczki i specjalnego podłoża dla storczyków (kora).',
      tips: 'Po przekwitnięciu przytnij pęd nad trzecim oczkiem - pęd rozgałęzi się i zakwitnie ponownie.'
    },
    {
      name: 'Paproć',
      scientificName: 'Nephrolepis exaltata',
      commonName: 'Paproć nerkowa',
      difficulty: 'Średnia',
      light: 'Półcień',
      water: 'Obfite (co 3-5 dni)',
      humidity: 'Bardzo wysoka (70-90%)',
      temperature: '15-24°C',
      image: fernImg,
      description: 'Dekoracyjna roślina o delikatnych, pierzastych liściach. Doskonale oczyszcza powietrze i dodaje świeżości wnętrzom.',
      care: 'Utrzymuj ziemię stale wilgotną. Regularnie zraszaj liście - uwielbia wysoką wilgotność. Idealna do łazienki z naturalnym światłem.',
      tips: 'Potrzebuje wysokiej wilgotności - idealna do łazienki. Może rosnąć na hydroponice.'
    },
    {
      name: 'Kaktus',
      scientificName: 'Cactaceae',
      commonName: 'Kaktus',
      difficulty: 'Łatwa',
      light: 'Bardzo jasne, słoneczne',
      water: 'Bardzo rzadkie (co 3-4 tygodnie)',
      humidity: 'Bardzo niska (20-40%)',
      temperature: '15-30°C',
      image: cactusImg,
      description: 'Sukulentowa roślina pustynna. Wiele odmian i kształtów. Magazynuje wodę w mięsistych łodygach, co czyni je niemal niezniszczalnymi.',
      care: 'Podlewaj bardzo rzadko - dopiero gdy gleba całkowicie wyschnie. Wymaga doskonałego drenażu i pełnego słońca. Zimą prawie wcale nie podlewaj.',
      tips: 'Zimą prawie nie podlewaj - to okres spoczynku. Zbyt częste podlewanie to częsta przyczyna gnicia.'
    },
    {
      name: 'Begonia',
      scientificName: 'Begonia',
      commonName: 'Begonia',
      difficulty: 'Średnia',
      light: 'Jasne, rozproszone',
      water: 'Umiarkowane (co 5-7 dni)',
      humidity: 'Średnia (50-60%)',
      temperature: '16-24°C',
      image: begoniaImg,
      description: 'Roślina o pięknych, ozdobnych liściach lub kwiatach. Setki odmian o różnorodnych wzorach i kolorach liści.',
      care: 'Podlewaj regularnie, ale pozwól ziemi lekko wyschnąć między podlewaniami. Unikaj mocnego słońca - może spalić liście. Nie lubi zalewania.',
      tips: 'Unikaj mocnego słońca i przelania. Liście mogą być bardzo dekoracyjne nawet bez kwiatów.'
    },
    {
      name: 'Bazylia',
      scientificName: 'Ocimum basilicum',
      commonName: 'Bazylia',
      difficulty: 'Łatwa',
      light: 'Bardzo jasne (min. 6h słońca)',
      water: 'Obfite (codziennie)',
      humidity: 'Średnia (40-60%)',
      temperature: '18-27°C',
      image: basilImg,
      description: 'Aromatyczne zioło kulinarne. Świeże liście do potraw włoskich, sałatek i sosów pesto. Najlepsze prosto z doniczki.',
      care: 'Podlewaj codziennie - lubi wilgotną glebę. Wymaga dużo słońca. Regularnie przycinaj końcówki, aby roślina była bardziej krzaczasta.',
      tips: 'Regularnie przycinaj, aby był bardziej krzaczasty. Usuwaj kwiatostany - przedłuży to produkcję liści.'
    },
    {
      name: 'Mięta',
      scientificName: 'Mentha',
      commonName: 'Mięta',
      difficulty: 'Bardzo łatwa',
      light: 'Jasne do półcienia',
      water: 'Obfite (co 2-3 dni)',
      humidity: 'Średnia (40-60%)',
      temperature: '15-25°C',
      image: mintImg,
      description: 'Ekspansywne zioło o orzeźwiającym aromacie. Świetne do herbat, koktajli i deserów. Rośnie bardzo szybko.',
      care: 'Podlewaj często - lubi wilgotną glebę. Może rosnąć w półcieniu. Bardzo ekspansywna - trzymaj w osobnej doniczce lub kontroluj rozrost.',
      tips: 'Rośnie bardzo szybko - trzymaj w osobnej doniczce. Możesz hodować nawet w wodzie.'
    },
    {
      name: 'Rozmaryn',
      scientificName: 'Rosmarinus officinalis',
      commonName: 'Rozmaryn lekarski',
      difficulty: 'Średnia',
      light: 'Bardzo jasne (min. 6h słońca)',
      water: 'Rzadkie (co 7-10 dni)',
      humidity: 'Niska (30-50%)',
      temperature: '12-24°C',
      image: rosemaryImg,
      description: 'Aromatyczne zioło śródziemnomorskie. Idealne do dań mięsnych, pieczonych warzyw i ziemniaków. Intensywny aromat.',
      care: 'Podlewaj oszczędnie - nie lubi mokrej gleby. Wymaga pełnego słońca i dobrego drenażu. Może rosnąć na zewnątrz latem.',
      tips: 'Nie lubi mokrej gleby - dobry drenaż jest kluczowy. Może przezimować na dworze w łagodnym klimacie.'
    },
    {
      name: 'Lawenda',
      scientificName: 'Lavandula',
      commonName: 'Lawenda',
      difficulty: 'Średnia',
      light: 'Bardzo jasne, słoneczne (min. 6h)',
      water: 'Rzadkie (co 7-10 dni)',
      humidity: 'Niska (30-50%)',
      temperature: '15-25°C',
      image: lavenderImg,
      description: 'Pachnąca roślina o fioletowych kwiatach. Uspokaja, poprawia sen i odpędza insekty. Kwiaty nadają się do suszenia.',
      care: 'Podlewaj oszczędnie - pochodzi z suchych regionów. Wymaga pełnego słońca i bardzo dobrego drenażu. Przycinaj po kwitnieniu.',
      tips: 'Potrzebuje dużo słońca i dobrze przepuszczalnej gleby. Suszone kwiaty zachowują aromat przez miesiące.'
    }
  ];

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Bardzo łatwa':
        return 'bg-green-500';
      case 'Łatwa':
        return 'bg-blue-500';
      case 'Średnia':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Encyklopedia Roślin
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Poznaj wymagania popularnych roślin domowych i ziół
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Szukaj rośliny..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlants.map((plant, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow overflow-hidden">
              {plant.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{plant.name}</CardTitle>
                    <CardDescription className="italic text-xs">
                      {plant.scientificName}
                    </CardDescription>
                  </div>
                  <Badge className={`${getDifficultyColor(plant.difficulty)} text-white`}>
                    {plant.difficulty}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {plant.commonName}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{plant.description}</p>
                
                {plant.care && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Pielęgnacja: </span>
                      {plant.care}
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Sun className="w-4 h-4 text-yellow-600" />
                    <span className="text-muted-foreground">Światło:</span>
                    <span className="font-medium text-xs">{plant.light}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span className="text-muted-foreground">Podlewanie:</span>
                    <span className="font-medium text-xs">{plant.water}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wind className="w-4 h-4 text-cyan-600" />
                    <span className="text-muted-foreground">Wilgotność:</span>
                    <span className="font-medium text-xs">{plant.humidity}</span>
                  </div>
                  {plant.temperature && (
                    <div className="flex items-center gap-2 text-sm">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span className="text-muted-foreground">Temperatura:</span>
                      <span className="font-medium text-xs">{plant.temperature}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-start gap-2">
                    <Leaf className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground italic">{plant.tips}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nie znaleziono roślin pasujących do wyszukiwania.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
