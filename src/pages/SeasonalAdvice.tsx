import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';

export default function SeasonalAdvice() {
  const seasons = [
    {
      name: 'Wiosna',
      icon: Leaf,
      color: 'text-green-600',
      tasks: [
        {
          title: 'Przesadzanie',
          description: 'Przesadź rośliny do większych doniczek. To idealny czas na wymianę podłoża.',
          timing: 'Marzec - Kwiecień'
        },
        {
          title: 'Wzrost',
          description: 'Zwiększ nawożenie - rośliny wchodzą w fazę intensywnego wzrostu.',
          timing: 'Cała wiosna'
        },
        {
          title: 'Przycinanie',
          description: 'Przetnij rośliny pnące i zimozielone, usuń martwe części.',
          timing: 'Marzec'
        },
        {
          title: 'Rozmnażanie',
          description: 'Pobieraj sadzonki i ułamki do ukorzeniania.',
          timing: 'Kwiecień - Maj'
        },
        {
          title: 'Siew nasion',
          description: 'Zacznij siać nasiona ziół i warzyw na parapecie.',
          timing: 'Luty - Marzec'
        }
      ]
    },
    {
      name: 'Lato',
      icon: Sun,
      color: 'text-yellow-600',
      tasks: [
        {
          title: 'Podlewanie',
          description: 'Podlewaj częściej i obficiej. Sprawdzaj wilgotność gleby codziennie.',
          timing: 'Codziennie'
        },
        {
          title: 'Zacienienie',
          description: 'Chroń rośliny przed bezpośrednim słońcem w upalne dni.',
          timing: 'Lipiec - Sierpień'
        },
        {
          title: 'Nawożenie',
          description: 'Kontynuuj regularne nawożenie co 2 tygodnie.',
          timing: 'Cały sezon'
        },
        {
          title: 'Zbiór',
          description: 'Zbieraj dojrzałe zioła i warzywa przed kwitnieniem.',
          timing: 'Lipiec - Sierpień'
        },
        {
          title: 'Usuwanie kwiatów',
          description: 'Usuń przekwitłe kwiaty, aby stymulować dalsze kwitnienie.',
          timing: 'Cały sezon'
        }
      ]
    },
    {
      name: 'Jesień',
      icon: Cloud,
      color: 'text-orange-600',
      tasks: [
        {
          title: 'Ograniczanie podlewania',
          description: 'Stopniowo zmniejszaj częstotliwość podlewania.',
          timing: 'Wrzesień - Listopad'
        },
        {
          title: 'Zaprzestanie nawożenia',
          description: 'Przestań nawozić, rośliny przechodzą w stan spoczynku.',
          timing: 'Październik'
        },
        {
          title: 'Przeniesienie do domu',
          description: 'Przenieś rośliny doniczkowe z balkonu do środka przed mrozami.',
          timing: 'Wrzesień - Październik'
        },
        {
          title: 'Czyszczenie',
          description: 'Usuń obumarłe liście i oczyść rośliny z kurzu.',
          timing: 'Październik'
        },
        {
          title: 'Kontrola szkodników',
          description: 'Sprawdź rośliny pod kątem szkodników przed zimą.',
          timing: 'Wrzesień'
        }
      ]
    },
    {
      name: 'Zima',
      icon: Snowflake,
      color: 'text-blue-600',
      tasks: [
        {
          title: 'Minimalne podlewanie',
          description: 'Podlewaj bardzo oszczędnie, tylko gdy podłoże wyschnie.',
          timing: 'Grudzień - Luty'
        },
        {
          title: 'Światło',
          description: 'Zapewnij maksimum światła - dni są krótkie.',
          timing: 'Cała zima'
        },
        {
          title: 'Temperatura',
          description: 'Chroń przed zimnym powietrzem od okien i kaloryferami.',
          timing: 'Cały sezon'
        },
        {
          title: 'Wilgotność',
          description: 'Zwiększ wilgotność powietrza - ogrzewanie je wysusza.',
          timing: 'Cały sezon'
        },
        {
          title: 'Bez nawozów',
          description: 'Nie nawozuj - rośliny są w fazie spoczynku.',
          timing: 'Grudzień - Luty'
        },
        {
          title: 'Planowanie',
          description: 'Zaplanuj przesadzenia i zakupy na wiosnę.',
          timing: 'Styczeń - Luty'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Porady Sezonowe
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kalendarz pielęgnacji roślin w każdej porze roku. Dowiedz się, co robić w danym sezonie.
          </p>
        </div>

        <Tabs defaultValue="spring" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="spring">
              <Leaf className="w-4 h-4 mr-2" />
              Wiosna
            </TabsTrigger>
            <TabsTrigger value="summer">
              <Sun className="w-4 h-4 mr-2" />
              Lato
            </TabsTrigger>
            <TabsTrigger value="autumn">
              <Cloud className="w-4 h-4 mr-2" />
              Jesień
            </TabsTrigger>
            <TabsTrigger value="winter">
              <Snowflake className="w-4 h-4 mr-2" />
              Zima
            </TabsTrigger>
          </TabsList>

          {seasons.map((season, idx) => (
            <TabsContent 
              key={idx} 
              value={['spring', 'summer', 'autumn', 'winter'][idx]}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {season.tasks.map((task, taskIdx) => (
                  <Card key={taskIdx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <season.icon className={`w-5 h-5 ${season.color}`} />
                        {task.title}
                      </CardTitle>
                      <CardDescription className="text-xs font-semibold text-primary">
                        {task.timing}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
