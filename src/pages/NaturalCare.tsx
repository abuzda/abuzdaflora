import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Droplets, Bug, Sprout, Coffee, Egg, Fish, Apple, Milk, Flame as Fire } from 'lucide-react';

export default function NaturalCare() {
  const fertilizers = [
    {
      icon: Coffee,
      name: 'Fusy z kawy',
      description: 'Doskonałe źródło azotu, idealne dla roślin kwasolubnych',
      usage: 'Wysuszone fusy wymieszaj z ziemią lub posyp wokół rośliny. Używaj co 2-3 tygodnie.',
      benefits: ['Bogaty w azot', 'Zakwasza glebę', 'Odpędza szkodniki'],
      plants: ['Azalie', 'Różaneczniki', 'Hortensje', 'Paprocie']
    },
    {
      icon: Egg,
      name: 'Skorupki jajek',
      description: 'Naturalne źródło wapnia, poprawia strukturę gleby',
      usage: 'Rozdrobnione skorupki dodaj do ziemi lub przygotuj wywar (gotuj 24h, odstaw na tydzień).',
      benefits: ['Dostarcza wapń', 'Odżywia glebę', 'Zapobiega gniciu wierzchołkowym'],
      plants: ['Pomidory', 'Rośliny doniczkowe', 'Warzywa']
    },
    {
      icon: Fish,
      name: 'Odwar z ryb',
      description: 'Bogaty w azot i fosfor, doskonały nawóz organiczny',
      usage: 'Resztki ryb zalej wodą, odstaw na tydzień. Rozcieńcz 1:10 przed użyciem.',
      benefits: ['Wysokie stężenie NPK', 'Pobudza wzrost', 'Wzmacnia korzenie'],
      plants: ['Rośliny owocowe', 'Warzywa liściaste', 'Kwiaty']
    },
    {
      icon: Apple,
      name: 'Skórki bananów',
      description: 'Bogate w potas, wspierają kwitnienie i owocowanie',
      usage: 'Pokrój skórki, zakop w ziemi lub przygotuj napar (zalej wodą na 48h).',
      benefits: ['Wysoka zawartość potasu', 'Wspomaga kwitnienie', 'Wzmacnia rośliny'],
      plants: ['Rośliny kwitnące', 'Rośliny owocowe', 'Róże']
    },
    {
      icon: Milk,
      name: 'Mleko',
      description: 'Źródło wapnia i białka, chroni przed chorobami grzybowymi',
      usage: 'Rozcieńcz mleko z wodą w proporcji 1:4. Opryskuj liście co 2 tygodnie.',
      benefits: ['Dostarcza wapń', 'Zapobiega mączniakowi', 'Odżywia liście'],
      plants: ['Pomidory', 'Ogórki', 'Róże', 'Rośliny doniczkowe']
    },
    {
      icon: Leaf,
      name: 'Kompost z liści',
      description: 'Uniwersalny nawóz organiczny, poprawia strukturę gleby',
      usage: 'Przemieszaj liście z ziemią ogrodową, zostaw na 3-6 miesięcy do rozkładu.',
      benefits: ['Poprawia strukturę gleby', 'Dostarcza składniki odżywcze', 'Zatrzymuje wilgoć'],
      plants: ['Wszystkie rośliny ogrodowe', 'Krzewy', 'Drzewa']
    },
    {
      icon: Droplets,
      name: 'Woda po gotowaniu warzyw',
      description: 'Zawiera minerały i witaminy z gotowanych warzyw',
      usage: 'Ostudzony wywar (bez soli!) podlewaj rośliny raz w tygodniu.',
      benefits: ['Dostarcza minerały', 'Zero odpadów', 'Ekonomiczne'],
      plants: ['Rośliny doniczkowe', 'Zioła', 'Warzywa']
    },
    {
      icon: Sprout,
      name: 'Pokrzywa',
      description: 'Naturalny stymulator wzrostu, bogaty w azot',
      usage: 'Maceruj pokrzywę w wodzie przez 2 tygodnie. Rozcieńcz 1:10 przed użyciem.',
      benefits: ['Wysoka zawartość azotu', 'Wzmacnia odporność', 'Odpędza szkodniki'],
      plants: ['Pomidory', 'Warzywa', 'Rośliny zielone']
    },
    {
      icon: Bug,
      name: 'Czosnek',
      description: 'Naturalny środek ochrony przed szkodnikami i chorobami',
      usage: 'Zmiksuj 5 ząbków czosnku z wodą, odstaw na dobę. Przesącz i opryskuj rośliny.',
      benefits: ['Odpędza szkodniki', 'Działa przeciwgrzybicznie', 'Wzmacnia rośliny'],
      plants: ['Wszystkie rośliny']
    },
    {
      icon: Coffee,
      name: 'Herbata',
      description: 'Źródło tanin i składników odżywczych',
      usage: 'Wysuszone fusy herbaty wymieszaj z ziemią lub przygotuj słaby napar do podlewania.',
      benefits: ['Zakwasza glebę', 'Dostarcza składniki odżywcze', 'Poprawia strukturę gleby'],
      plants: ['Paprocie', 'Róże', 'Rośliny kwasolubne']
    },
    {
      icon: Leaf,
      name: 'Skrzyp polny',
      description: 'Wzmacnia rośliny, bogaty w krzem',
      usage: 'Przygotuj wywar: gotuj 30 min, odstaw na dobę. Rozcieńcz 1:5 i opryskuj rośliny.',
      benefits: ['Wzmacnia tkanki roślinne', 'Zapobiega chorobom grzybowym', 'Bogaty w krzem'],
      plants: ['Wszystkie rośliny ogrodowe']
    },
    {
      icon: Droplets,
      name: 'Gnojówka z kompostu',
      description: 'Płynny nawóz pełen składników odżywczych',
      usage: 'Kompost zalej wodą (1:3), odstaw na tydzień mieszając codziennie. Rozcieńcz 1:10.',
      benefits: ['Kompleksowy nawóz', 'Pobudza wzrost', 'Poprawia żyzność gleby'],
      plants: ['Warzywa', 'Kwiaty', 'Rośliny owocowe']
    },
    {
      icon: Apple,
      name: 'Drożdże',
      description: 'Stymulator wzrostu korzeni i pędów',
      usage: '10g drożdży + 1 łyżka cukru na 10l letniej wody. Odstaw 2h, rozcieńcz 1:5.',
      benefits: ['Przyspiesza wzrost', 'Wzmacnia korzenie', 'Zwiększa odporność'],
      plants: ['Rozsady', 'Rośliny młode', 'Warzywa']
    },
    {
      icon: Leaf,
      name: 'Woda z akwarium',
      description: 'Naturalne źródło składników odżywczych',
      usage: 'Wodę z akwarium po wymianie używaj bezpośrednio do podlewania.',
      benefits: ['Zawiera azot i fosfor', 'Naturalne bakterie', 'Zero odpadów'],
      plants: ['Wszystkie rośliny doniczkowe']
    },
    {
      icon: Apple,
      name: 'Skórki od owoców cytrusowych',
      description: 'Bogate w witaminy, odstraszają szkodniki',
      usage: 'Rozdrobnione skórki zakop w glebie lub dodaj do kompostu. Możesz też zrobić napar.',
      benefits: ['Odstraszają mszyce i mrówki', 'Kwasują glebę', 'Dodają aromatu'],
      plants: ['Rośliny kwasolubne', 'Cytrusy', 'Azalie']
    },
    {
      icon: Fire,
      name: 'Popiół drzewny',
      description: 'Źródło potasu i mikroelementów',
      usage: 'Cienką warstwę posyp wokół roślin (max 2 razy rocznie). Nie używaj na rośliny kwasolubne.',
      benefits: ['Zwiększa pH gleby', 'Bogaty w potas', 'Wspiera kwitnienie'],
      plants: ['Pomidory', 'Róże', 'Rośliny owocowe']
    },
    {
      icon: Milk,
      name: 'Serwatka',
      description: 'Produkt uboczny produkcji sera, bogaty w probiotyki',
      usage: 'Rozcieńcz serwatkę z wodą 1:10. Podlewaj lub spryskuj rośliny co 2 tygodnie.',
      benefits: ['Wzmacnia rośliny', 'Zapobiega chorobom grzybiczym', 'Dostarcza białka'],
      plants: ['Wszystkie warzywa', 'Rośliny owocowe']
    },
    {
      icon: Fish,
      name: 'Wodorosty morskie',
      description: 'Pełne mikroelementów i hormonów wzrostu',
      usage: 'Napar z suszonych wodorostów lub gnojówka (maceruj 2 tyg, rozcieńcz 1:20).',
      benefits: ['Stymulują wzrost', 'Zwiększają odporność', 'Poprawiają strukturę gleby'],
      plants: ['Wszystkie rośliny']
    },
    {
      icon: Coffee,
      name: 'Osad z kawy espresso',
      description: 'Koncentrat składników odżywczych z kawy',
      usage: 'Stosuj umiarkowanie - bardzo mocny. Najlepiej w kompoście lub rozcieńczony.',
      benefits: ['Bardzo bogaty w azot', 'Kwasuje glebę intensywnie', 'Poprawia strukturę'],
      plants: ['Azalie', 'Hortensje', 'Borówki']
    },
    {
      icon: Leaf,
      name: 'Skoszona trawa',
      description: 'Szybko rozkładający się mulcz organiczny',
      usage: 'Rozłóż cienką warstwę (2-3 cm) wokół roślin. Przed użyciem lekko przesusz.',
      benefits: ['Dodaje azotu', 'Chroni przed wysychaniem', 'Tłumi chwasty'],
      plants: ['Wszystkie rośliny ogrodowe']
    },
    {
      icon: Bug,
      name: 'Cebula',
      description: 'Naturalny środek ochrony i nawóz',
      usage: 'Łupiny cebuli zalej wodą, gotuj 15 min. Rozcieńcz 1:5 i spryskuj rośliny.',
      benefits: ['Odstraszają szkodniki', 'Działają przeciwgrzybicznie', 'Wzmacniają odporność'],
      plants: ['Wszystkie rośliny']
    },
    {
      icon: Sprout,
      name: 'Nasiona lucerny',
      description: 'Bogate w azot i mikroelementy',
      usage: 'Zakop nasiona wokół rośliny lub zrób napar (zalej wodą na dobę).',
      benefits: ['Wysoka zawartość azotu', 'Poprawia strukturę gleby', 'Naturalny nawóz wolno działający'],
      plants: ['Rośliny zielone', 'Warzywa liściaste']
    },
    {
      icon: Egg,
      name: 'Woda po gotowaniu jaj',
      description: 'Woda bogata w wapń ze skorupek',
      usage: 'Schłodzoną wodę (bez soli!) używaj do podlewania raz w tygodniu.',
      benefits: ['Dostarcza wapń', 'Zero odpadów', 'Łatwe w użyciu'],
      plants: ['Pomidory', 'Papryka', 'Wszystkie warzywa']
    },
    {
      icon: Leaf,
      name: 'Liście orzecha włoskiego',
      description: 'Naturalne źródło tanin i składników odżywczych',
      usage: 'Wysuszone liście dodaj do kompostu lub zrób napar (maceruj 2 tyg).',
      benefits: ['Odpędza szkodniki', 'Bogaty w taniny', 'Naturalny środek ochrony'],
      plants: ['Róże', 'Pomidory', 'Wszystkie rośliny ogrodowe']
    }
  ];

  const tips = [
    {
      title: 'Kompostowanie',
      content: 'Własny kompost to najlepszy sposób na wykorzystanie odpadów organicznych. Mieszaj odpady "zielone" (resztki warzyw) z "brązowymi" (liście, papier).',
    },
    {
      title: 'Mulczowanie',
      content: 'Warstwa ściółki organicznej (kora, słoma, skoszona trawa) zatrzymuje wilgoć, zapobiega chwastom i stopniowo odżywia glebę.',
    },
    {
      title: 'Płodozmian',
      content: 'Nie sadź tych samych roślin w tym samym miejscu co roku. Zmniejszy to ryzyko chorób i wyczerpania gleby.',
    },
    {
      title: 'Bioróżnorodność',
      content: 'Sadź różne gatunki razem. Niektóre rośliny wzajemnie się chronią i wspierają (np. bazylia i pomidory).',
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Leaf className="h-8 w-8 text-primary" />
            Naturalna Pielęgnacja Roślin
          </h1>
          <p className="text-muted-foreground text-lg">
            Ekologiczne nawozy i metody pielęgnacji dostępne w każdym domu
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {fertilizers.map((fertilizer) => {
            const Icon = fertilizer.icon;
            return (
              <Card key={fertilizer.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    {fertilizer.name}
                  </CardTitle>
                  <CardDescription>{fertilizer.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Zastosowanie:</h4>
                    <p className="text-sm text-muted-foreground">{fertilizer.usage}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Korzyści:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {fertilizer.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Najlepsze dla:</h4>
                    <div className="flex flex-wrap gap-2">
                      {fertilizer.plants.map((plant) => (
                        <span
                          key={plant}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {plant}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            Dodatkowe Wskazówki
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <Card key={tip.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Pamiętaj
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ Stosuj nawozy naturalne regularnie, ale z umiarem</p>
            <p>✓ Zawsze rozcieńczaj silne roztwory przed użyciem</p>
            <p>✓ Obserwuj reakcję roślin i dostosowuj częstotliwość nawożenia</p>
            <p>✓ Łącz różne metody dla najlepszych rezultatów</p>
            <p>✓ Naturalne nawozy działają wolniej niż sztuczne, ale są bezpieczniejsze</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
