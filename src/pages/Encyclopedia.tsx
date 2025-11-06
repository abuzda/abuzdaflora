import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Droplets, Sun, Wind, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState('');

  const plants = [
    {
      name: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      commonName: 'Filodendron dziurawy',
      difficulty: 'Łatwa',
      light: 'Jasne, rozproszone',
      water: 'Umiarkowane',
      humidity: 'Wysoka',
      description: 'Popularna roślina o charakterystycznych dziurawych liściach. Idealna dla początkujących.',
      tips: 'Wytrzymuje zaniedbanie, lubi wspinaczkę.'
    },
    {
      name: 'Sansevieria',
      scientificName: 'Sansevieria trifasciata',
      commonName: 'Jęzor teściowej',
      difficulty: 'Bardzo łatwa',
      light: 'Dowolne',
      water: 'Rzadkie',
      humidity: 'Niska',
      description: 'Niezniszczalna roślina odporna na zaniedbanie. Oczyszcza powietrze.',
      tips: 'Lepiej niedolać niż przelać.'
    },
    {
      name: 'Pothos',
      scientificName: 'Epipremnum aureum',
      commonName: 'Epipremnum złociste',
      difficulty: 'Łatwa',
      light: 'Jasne do półcienia',
      water: 'Umiarkowane',
      humidity: 'Średnia',
      description: 'Roślina pnąca o sercowatych liściach. Świetna do wiszących doniczek.',
      tips: 'Łatwo się rozmnażać przez sadzonki.'
    },
    {
      name: 'Zamiokulkas',
      scientificName: 'Zamioculcas zamiifolia',
      commonName: 'Zamiokulkas zamiolistny',
      difficulty: 'Bardzo łatwa',
      light: 'Jasne do półcienia',
      water: 'Rzadkie',
      humidity: 'Niska',
      description: 'Wytrzymała roślina o błyszczących liściach. Idealna do biura.',
      tips: 'Przechowuje wodę w korzeniach.'
    },
    {
      name: 'Fikus',
      scientificName: 'Ficus elastica',
      commonName: 'Figowiec sprężysty',
      difficulty: 'Średnia',
      light: 'Jasne',
      water: 'Umiarkowane',
      humidity: 'Średnia',
      description: 'Elegancka roślina o dużych, błyszczących liściach.',
      tips: 'Nie lubi zmian miejsca.'
    },
    {
      name: 'Skrzydłokwiat',
      scientificName: 'Spathiphyllum',
      commonName: 'Skrzydłokwiat',
      difficulty: 'Łatwa',
      light: 'Półcień',
      water: 'Obfite',
      humidity: 'Wysoka',
      description: 'Pięknie kwitnąca roślina oczyszczająca powietrze.',
      tips: 'Liście opadają gdy potrzebuje wody.'
    },
    {
      name: 'Aloes',
      scientificName: 'Aloe vera',
      commonName: 'Aloes zwyczajny',
      difficulty: 'Łatwa',
      light: 'Jasne, słoneczne',
      water: 'Rzadkie',
      humidity: 'Niska',
      description: 'Sukulentowa roślina lecznicza. Sok ma właściwości kojące.',
      tips: 'Rośnie wolno, wymaga dobrze przepuszczalnej gleby.'
    },
    {
      name: 'Storczyk',
      scientificName: 'Phalaenopsis',
      commonName: 'Storczyk motylek',
      difficulty: 'Średnia',
      light: 'Jasne, rozproszone',
      water: 'Umiarkowane',
      humidity: 'Wysoka',
      description: 'Eleganckie kwiaty o długim okresie kwitnienia.',
      tips: 'Wymaga specjalnego podłoża i przezroczystej doniczki.'
    },
    {
      name: 'Paproć',
      scientificName: 'Nephrolepis exaltata',
      commonName: 'Paproć nerkowa',
      difficulty: 'Średnia',
      light: 'Półcień',
      water: 'Obfite',
      humidity: 'Bardzo wysoka',
      description: 'Dekoracyjna roślina o delikatnych, pierzastych liściach.',
      tips: 'Potrzebuje wysokiej wilgotności - idealna do łazienki.'
    },
    {
      name: 'Kaktus',
      scientificName: 'Cactaceae',
      commonName: 'Kaktus',
      difficulty: 'Łatwa',
      light: 'Bardzo jasne, słoneczne',
      water: 'Bardzo rzadkie',
      humidity: 'Bardzo niska',
      description: 'Sukulentowa roślina pustynna. Wiele odmian i kształtów.',
      tips: 'Zimą prawie nie podlewaj.'
    },
    {
      name: 'Begonia',
      scientificName: 'Begonia',
      commonName: 'Begonia',
      difficulty: 'Średnia',
      light: 'Jasne, rozproszone',
      water: 'Umiarkowane',
      humidity: 'Średnia',
      description: 'Roślina o pięknych, ozdobnych liściach lub kwiatach.',
      tips: 'Unikaj mocnego słońca i przelania.'
    },
    {
      name: 'Bazyli',
      scientificName: 'Ocimum basilicum',
      commonName: 'Bazylia',
      difficulty: 'Łatwa',
      light: 'Bardzo jasne',
      water: 'Obfite',
      humidity: 'Średnia',
      description: 'Aromatyczne zioło kulinarne. Świeże liście do potraw.',
      tips: 'Regularnie przycinaj, aby był bardziej krzaczasty.'
    },
    {
      name: 'Mięta',
      scientificName: 'Mentha',
      commonName: 'Mięta',
      difficulty: 'Bardzo łatwa',
      light: 'Jasne do półcienia',
      water: 'Obfite',
      humidity: 'Średnia',
      description: 'Ekspansywne zioło o orzeźwiającym aromacie.',
      tips: 'Rośnie bardzo szybko - trzymaj w osobnej doniczce.'
    },
    {
      name: 'Rozmaryn',
      scientificName: 'Rosmarinus officinalis',
      commonName: 'Rozmaryn lekarski',
      difficulty: 'Średnia',
      light: 'Bardzo jasne',
      water: 'Rzadkie',
      humidity: 'Niska',
      description: 'Aromatyczne zioło śródziemnomorskie. Idealne do dań mięsnych.',
      tips: 'Nie lubi mokrej gleby - dobry drenaż jest kluczowy.'
    },
    {
      name: 'Lawenda',
      scientificName: 'Lavandula',
      commonName: 'Lawenda',
      difficulty: 'Średnia',
      light: 'Bardzo jasne, słoneczne',
      water: 'Rzadkie',
      humidity: 'Niska',
      description: 'Pachnąca roślina o fioletowych kwiatach. Uspokaja i odpędza insekty.',
      tips: 'Potrzebuje dużo słońca i dobrze przepuszczalnej gleby.'
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
            <Card key={idx} className="hover:shadow-lg transition-shadow">
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
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Sun className="w-4 h-4 text-yellow-600" />
                    <span className="text-muted-foreground">Światło:</span>
                    <span className="font-medium">{plant.light}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span className="text-muted-foreground">Podlewanie:</span>
                    <span className="font-medium">{plant.water}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wind className="w-4 h-4 text-cyan-600" />
                    <span className="text-muted-foreground">Wilgotność:</span>
                    <span className="font-medium">{plant.humidity}</span>
                  </div>
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
