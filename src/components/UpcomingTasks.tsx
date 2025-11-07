import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, Leaf, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format, differenceInDays } from 'date-fns';
import { pl } from 'date-fns/locale';

interface Task {
  id: string;
  plantName: string;
  type: 'watering' | 'fertilization';
  date: Date;
  daysUntil: number;
}

export const UpcomingTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const now = new Date();
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);

      // Load watering tasks
      const { data: plants } = await supabase
        .from('plant_collection')
        .select('*')
        .eq('user_id', user!.id)
        .not('next_watering_at', 'is', null)
        .lte('next_watering_at', nextWeek.toISOString());

      const wateringTasks: Task[] = (plants || [])
        .map(plant => ({
          id: plant.id,
          plantName: plant.plant_name,
          type: 'watering' as const,
          date: new Date(plant.next_watering_at!),
          daysUntil: differenceInDays(new Date(plant.next_watering_at!), now)
        }))
        .filter(task => task.daysUntil >= 0);

      // Load fertilization tasks
      const { data: fertilizations } = await supabase
        .from('fertilization_schedule')
        .select('*')
        .eq('user_id', user!.id)
        .eq('completed', false)
        .lte('scheduled_date', nextWeek.toISOString());

      const fertilizationTasks: Task[] = (fertilizations || [])
        .map(fert => ({
          id: fert.id,
          plantName: fert.plant_name,
          type: 'fertilization' as const,
          date: new Date(fert.scheduled_date),
          daysUntil: differenceInDays(new Date(fert.scheduled_date), now)
        }))
        .filter(task => task.daysUntil >= 0);

      // Combine and sort by date
      const allTasks = [...wateringTasks, ...fertilizationTasks]
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5); // Show only next 5 tasks

      setTasks(allTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  if (!user || tasks.length === 0) {
    return null;
  }

  const getUrgencyColor = (days: number) => {
    if (days === 0) return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
    if (days <= 2) return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
    return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
  };

  const getTaskIcon = (type: string) => {
    return type === 'watering' ? Droplets : Leaf;
  };

  const getTaskLabel = (type: string) => {
    return type === 'watering' ? 'Podlewanie' : 'Nawożenie';
  };

  const getDaysLabel = (days: number) => {
    if (days === 0) return 'Dziś';
    if (days === 1) return 'Jutro';
    return `Za ${days} dni`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Nadchodzące zadania</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => {
            const Icon = getTaskIcon(task.type);
            return (
              <div
                key={`${task.type}-${task.id}`}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{task.plantName}</p>
                    <p className="text-xs text-muted-foreground">
                      {getTaskLabel(task.type)} • {format(task.date, 'd MMM', { locale: pl })}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getUrgencyColor(task.daysUntil)}>
                  {getDaysLabel(task.daysUntil)}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};