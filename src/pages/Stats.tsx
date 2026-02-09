import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Leaf, Droplets, NotebookPen, BarChart3 } from 'lucide-react';

interface MonthlyData { month: string; count: number; }

export default function Stats() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [plantCount, setPlantCount] = useState(0);
  const [wateringCount, setWateringCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [monthlyWaterings, setMonthlyWaterings] = useState<MonthlyData[]>([]);
  const [monthlyJournal, setMonthlyJournal] = useState<MonthlyData[]>([]);

  useEffect(() => {
    if (!user) return;
    loadStats();
  }, [user]);

  async function loadStats() {
    if (!user) return;
    setLoading(true);
    try {
      const [plants, waterings, journals, wateringList, journalList] = await Promise.all([
        supabase.from('plant_collection').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('watering_schedule').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('growth_journal').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('watering_schedule').select('watered_at').eq('user_id', user.id).order('watered_at', { ascending: true }),
        supabase.from('growth_journal').select('entry_date').eq('user_id', user.id).order('entry_date', { ascending: true }),
      ]);

      setPlantCount(plants.count || 0);
      setWateringCount(waterings.count || 0);
      setJournalCount(journals.count || 0);

      setMonthlyWaterings(groupByMonth(wateringList.data?.map(w => w.watered_at) || []));
      setMonthlyJournal(groupByMonth(journalList.data?.map(j => j.entry_date) || []));
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid gap-4 grid-cols-3"><Skeleton className="h-24" /><Skeleton className="h-24" /><Skeleton className="h-24" /></div>
          <Skeleton className="h-64" />
        </div>
      </Layout>
    );
  }

  const chartConfig = {
    count: { label: 'Ilość', color: 'hsl(var(--primary))' },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Statystyki</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3"><Leaf className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{plantCount}</p>
                <p className="text-sm text-muted-foreground">Roślin w kolekcji</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3"><Droplets className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{wateringCount}</p>
                <p className="text-sm text-muted-foreground">Podlań łącznie</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3"><NotebookPen className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{journalCount}</p>
                <p className="text-sm text-muted-foreground">Wpisów w dzienniku</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {monthlyWaterings.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Podlewania miesięcznie</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={monthlyWaterings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {monthlyJournal.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Wpisy w dzienniku miesięcznie</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart data={monthlyJournal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

function groupByMonth(dates: string[]): MonthlyData[] {
  const map: Record<string, number> = {};
  const months = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
  
  for (const d of dates) {
    const date = new Date(d);
    const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
    map[key] = (map[key] || 0) + 1;
  }
  
  return Object.entries(map).map(([month, count]) => ({ month, count }));
}
