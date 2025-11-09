import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, AlertTriangle, Bug, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import aphidsImg from '@/assets/pests/aphids.jpg';
import spiderMitesImg from '@/assets/pests/spider-mites.jpg';
import mealybugsImg from '@/assets/pests/mealybugs.jpg';
import scaleImg from '@/assets/pests/scale.jpg';
import fungusGnatsImg from '@/assets/pests/fungus-gnats.jpg';
import thripsImg from '@/assets/pests/thrips.jpg';
import whitefliesImg from '@/assets/pests/whiteflies.jpg';

export default function Pests() {
  const [searchQuery, setSearchQuery] = useState('');

  const pests = [
    {
      name: 'Mszyce',
      scientificName: 'Aphidoidea',
      severity: 'Średnie',
      image: aphidsImg,
      description: 'Małe, miękkie owady o długości 1-3mm, najczęściej w kolorze zielonym, żółtym lub czarnym. Żerują kolonijnie na młodych pędach i spodniej stronie liści.',
      symptoms: 'Zdeformowane, skręcone liście, lepka substancja (spadź) na liściach, słaby wzrost, żółknące liście. Często towarzyszy im pojawienie się mrówek.',
      causes: 'Nadmiar azotu w glebie, suche powietrze, przenoszenie przez inne rośliny, słaba wentylacja.',
      treatment: 'Spryskaj roztworem wody z mydłem (1 łyżka mydła na litr wody), użyj naturalnych drapieżników (biedronki), usuń silnie zaatakowane części, zastosuj spray z oleju neem.',
      prevention: 'Regularnie kontroluj rośliny, utrzymuj właściwą wilgotność powietrza, unikaj nadmiaru azotu, kwarantanna nowych roślin przez 2 tygodnie.',
      tips: 'Mszyce rozmnażają się bardzo szybko - reaguj natychmiast! Naturalni wrogowie jak biedronki są bardzo skuteczne.'
    },
    {
      name: 'Przędziorki',
      scientificName: 'Tetranychidae',
      severity: 'Wysokie',
      image: spiderMitesImg,
      description: 'Mikroskopijne pajęczaki (0,5mm) w kolorze czerwonym lub żółtym. Tworzą charakterystyczne delikatne pajęczyny na spodzie liści i między pędami.',
      symptoms: 'Drobne, żółte lub białe plamki na liściach, delikatne pajęczyny między liśćmi, brązowiejące i opadające liście, osłabiony wzrost rośliny.',
      causes: 'Suche i ciepłe powietrze (poniżej 40% wilgotności), zanieczyszczone narzędzia, przeniesienie z innych roślin, stres wodny.',
      treatment: 'Natychmiast zwiększ wilgotność powietrza, spryskaj rośliny zimną wodą, użyj spray z oleju neem lub specjalistycznych preparatów, w skrajnych przypadkach usuń całą roślinę.',
      prevention: 'Regularnie zraszaj rośliny, utrzymuj wilgotność 50-60%, izoluj nowe rośliny, regularnie myj liście.',
      tips: 'Przędziorki nie znoszą wysokiej wilgotności - prysznic dla roślin co tydzień to najlepsza profilaktyka! Są bardzo trudne do wykrycia we wczesnym stadium.'
    },
    {
      name: 'Wełnowce',
      scientificName: 'Pseudococcidae',
      severity: 'Średnie',
      image: mealybugsImg,
      description: 'Białe, owalne owady pokryte woskowatą, bawełnopodobną substancją. Osiągają 2-5mm długości. Poruszają się wolno i żerują w skupiskach.',
      symptoms: 'Białe, bawełnowate skupiska na łodygach i liściach, lepka substancja, żółknące i opadające liście, słaby wzrost, deformacje młodych pędów.',
      causes: 'Nadmiar wilgoci przy niskiej temperaturze, słaba cyrkulacja powietrza, nadmierne nawożenie azotem, stres rośliny.',
      treatment: 'Usuń mechanicznie wacikiem zamoczonym w alkoholu, spryskaj mydłem potasowym, zastosuj olej neem, w ciężkich przypadkach użyj systemicznych insektycydów.',
      prevention: 'Regularnie kontroluj rośliny (szczególnie załamania liści), utrzymuj dobrą wentylację, unikaj nadmiernego podlewania zimą, kwarantanna nowych roślin.',
      tips: 'Wełnowce często chowają się w załamaniach liści i pachwinie - dokładnie sprawdzaj te miejsca! Alkohol działa natychmiast.'
    },
    {
      name: 'Tarczniki',
      scientificName: 'Coccoidea',
      severity: 'Wysokie',
      image: scaleImg,
      description: 'Małe (2-5mm), brązowe lub żółte owady pokryte twardą, woskową tarczką. Przyczepiają się mocno do łodyg i liści, są nieruchome.',
      symptoms: 'Brązowe lub żółte, wypukłe narośla na łodygach i liściach, lepka substancja (spadź), czarna pleśń, żółknące i opadające liście.',
      causes: 'Suche powietrze, nadmiar ciepła, przeniesienie z infestowanych roślin, osłabiona roślina.',
      treatment: 'Zdrap mechanicznie miękką szczoteczką, przemyj rośliny wodą z mydłem, zastosuj olej neem lub parafinowy, które uduszą owady pod tarczką.',
      prevention: 'Regularnie oglądaj rośliny, zwłaszcza łodygi, utrzymuj właściwą wilgotność, izoluj nowe rośliny, przemywaj liście.',
      tips: 'Tarczniki są bardzo odporne - potrzeba kilku zabiegów! Młode osobniki bez tarczki są najbardziej wrażliwe na preparaty.'
    },
    {
      name: 'Ziemiórki',
      scientificName: 'Sciaridae',
      severity: 'Niskie',
      image: fungusGnatsImg,
      description: 'Małe (2-3mm), czarne, latające owady przypominające muszki. Dorosłe są nieszkodliwe, ale larwy w glebie żerują na korzeniach.',
      symptoms: 'Małe, czarne muszki latające wokół rośliny, larwy w glebie (białe, przezroczyste robaczki), osłabiony wzrost rośliny, żółknące liście.',
      causes: 'Nadmierne podlewanie, ciągle wilgotna gleba, rozkładająca się materia organiczna w glebie, zła jakość podłoża.',
      treatment: 'Ogranicz podlewanie - pozwól glebie wyschnąć, umieść żółte tablice lepowe, posyp powierzchnię gleby piaskiem lub perłitem, zastosuj namaczanie BTI.',
      prevention: 'Podlewaj umiarkowanie, używaj dobrej jakości podłoża, umieść warstwę piasku na powierzchni gleby, zapewnij dobrą wentylację.',
      tips: 'Ziemiórki to znak nadmiernego podlewania! Dorosłe muszki żyją tylko kilka dni - zwalczaj larwy w glebie, nie dorosłe.'
    },
    {
      name: 'Wciornastki',
      scientificName: 'Thysanoptera',
      severity: 'Wysokie',
      image: thripsImg,
      description: 'Bardzo małe (1-2mm), wydłużone owady w kolorze czarnym lub żółtym. Szybko się poruszają i skaczą. Trudne do zauważenia gołym okiem.',
      symptoms: 'Srebrzyste smugi i plamy na liściach, czarne kropki (odchody), zdeformowane kwiaty i pąki, uszkodzone młode liście, opóźniony wzrost.',
      causes: 'Ciepła i sucha atmosfera, przeniesienie z kwiatów ciętych lub nowych roślin, słaba wentylacja.',
      treatment: 'Natychmiast odizoluj zaatakowaną roślinę, spryskaj mydłem insektycydalnym, zastosuj niebieskie tablice lepowe, w ciężkich przypadkach użyj systemicznych pestycydów.',
      prevention: 'Sprawdzaj nowe rośliny i kwiaty cięte, utrzymuj wyższą wilgotność powietrza, usuwaj zwiędłe kwiaty i liście, regularne kontrole.',
      tips: 'Wciornastki są bardzo trudne do zwalczenia - wymagają kilku zabiegów co 5-7 dni! Przenoszą wirusy między roślinami.'
    },
    {
      name: 'Mączliki',
      scientificName: 'Aleyrodidae',
      severity: 'Średnie',
      image: whitefliesImg,
      description: 'Małe (1-2mm), białe, latające owady przypominające małe ćmy. Siedzą głównie na spodniej stronie liści i wzlatują gdy się je poruszy.',
      symptoms: 'Białe, latające owady pod liśćmi, żółknące i opadające liście, lepka substancja na liściach, czarna pleśń (grzybnia sadzi).',
      causes: 'Ciepła temperatura i wysoka wilgotność, przeniesienie z nowych roślin lub warzyw (pomidory), słaba wentylacja.',
      treatment: 'Użyj żółtych tablic lepowych, spryskaj wodą z mydłem lub olejem neem, zastosuj naturalnych wrogów (Encarsia formosa), odkurz dorosłe osobniki.',
      prevention: 'Regularnie kontroluj spodnią stronę liści, odizoluj nowe rośliny, zapewnij dobrą cyrkulację powietrza, unikaj nadmiernej wilgotności.',
      tips: 'Mączliki rozmnażają się w ciepłych warunkach - latem szczególnie uważaj! Żółte tablice lepowe są bardzo skuteczne.'
    }
  ];

  const filteredPests = pests.filter(pest =>
    pest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pest.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Niskie':
        return 'bg-green-500';
      case 'Średnie':
        return 'bg-yellow-500';
      case 'Wysokie':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Szkodniki Roślin Doniczkowych
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Poznaj najczęstsze szkodniki, ich objawy oraz metody zwalczania
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Szukaj szkodnika..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPests.map((pest, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow overflow-hidden">
              {pest.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={pest.image} 
                    alt={pest.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{pest.name}</CardTitle>
                    <CardDescription className="italic text-xs">
                      {pest.scientificName}
                    </CardDescription>
                  </div>
                  <Badge className={`${getSeverityColor(pest.severity)} text-white`}>
                    {pest.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{pest.description}</p>
                
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-semibold text-foreground">Objawy:</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{pest.symptoms}</p>
                </div>

                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Bug className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-semibold text-foreground">Przyczyny:</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{pest.causes}</p>
                </div>

                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-semibold text-foreground">Leczenie:</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{pest.treatment}</p>
                </div>

                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-xs mb-1 font-semibold text-foreground">Profilaktyka:</p>
                  <p className="text-xs text-muted-foreground">{pest.prevention}</p>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    💡 <span className="font-semibold">Wskazówka:</span> {pest.tips}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nie znaleziono szkodników pasujących do wyszukiwania.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
