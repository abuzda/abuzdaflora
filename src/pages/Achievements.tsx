import { Layout } from '@/components/layout/Layout';
import { useAchievements } from '@/hooks/useAchievements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy } from 'lucide-react';

export default function Achievements() {
  const { achievements, loading } = useAchievements();

  const unlocked = achievements.filter(a => a.unlocked).length;
  const total = achievements.length;

  const categories = [
    { key: 'collection', label: 'Kolekcja' },
    { key: 'watering', label: 'Podlewanie' },
    { key: 'journal', label: 'Dziennik' },
  ] as const;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-bold">Osiągnięcia</h1>
            <p className="text-muted-foreground">
              Odblokowano {unlocked} z {total} odznak
            </p>
          </div>
        </div>

        <Progress value={(unlocked / Math.max(total, 1)) * 100} className="h-3" />

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
        ) : (
          categories.map(({ key, label }) => {
            const items = achievements.filter(a => a.category === key);
            if (!items.length) return null;
            return (
              <div key={key} className="space-y-3">
                <h2 className="text-xl font-semibold">{label}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map(a => (
                    <Card key={a.id} className={a.unlocked ? 'border-primary/50 bg-primary/5' : 'opacity-70'}>
                      <CardContent className="flex items-center gap-4 p-4">
                        <span className="text-3xl">{a.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{a.name}</span>
                            {a.unlocked && <Badge variant="default" className="text-[10px] px-1.5 py-0">✓</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{a.description}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <Progress value={(a.progress / a.target) * 100} className="h-1.5 flex-1" />
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                              {a.progress}/{a.target}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
