import { Layout } from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, Sparkles, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { pl } from 'date-fns/locale';

interface CareTask {
  id: string;
  type: 'watering' | 'fertilization';
  plant_name: string;
  date: string;
  completed?: boolean;
  fertilizer_type?: string;
  notes?: string;
}

export default function CareCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<CareTask[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && selectedDate) {
      fetchTasks();
    }
  }, [user, selectedDate]);

  const fetchTasks = async () => {
    if (!user || !selectedDate) return;

    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);

    // Fetch watering records
    const { data: wateringData } = await supabase
      .from('watering_schedule')
      .select(`
        id,
        watered_at,
        plant_collection!inner(plant_name)
      `)
      .eq('user_id', user.id)
      .gte('watered_at', monthStart.toISOString())
      .lte('watered_at', monthEnd.toISOString());

    // Fetch fertilization records
    const { data: fertData } = await supabase
      .from('fertilization_schedule')
      .select('*')
      .eq('user_id', user.id)
      .gte('scheduled_date', monthStart.toISOString())
      .lte('scheduled_date', monthEnd.toISOString());

    const wateringTasks: CareTask[] = (wateringData || []).map(record => ({
      id: record.id,
      type: 'watering',
      plant_name: (record.plant_collection as any)?.plant_name || 'Unknown',
      date: record.watered_at,
      completed: true,
    }));

    const fertTasks: CareTask[] = (fertData || []).map((record: any) => ({
      id: record.id,
      type: 'fertilization',
      plant_name: record.plant_name,
      date: record.scheduled_date,
      completed: record.completed,
      fertilizer_type: record.fertilizer_type,
      notes: record.notes,
    }));

    const allTasks = [...wateringTasks, ...fertTasks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setTasks(allTasks);
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      format(new Date(task.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const tasksForSelectedDate = selectedDate ? getTasksForDate(selectedDate) : [];

  const markedDates = Array.from(
    new Set(tasks.map(task => format(new Date(task.date), 'yyyy-MM-dd')))
  ).map(dateStr => new Date(dateStr));

  const getTaskIcon = (type: 'watering' | 'fertilization') => {
    return type === 'watering' ? Droplets : Sparkles;
  };

  const getTaskColor = (type: 'watering' | 'fertilization') => {
    return type === 'watering' ? 'text-blue-500' : 'text-amber-500';
  };

  const getTaskBadgeVariant = (type: 'watering' | 'fertilization') => {
    return type === 'watering' ? 'default' : 'secondary';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-2 mb-6">
          <CalendarIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kalendarz Pielęgnacyjny</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Kalendarz</CardTitle>
              <CardDescription>
                Wszystkie zadania pielęgnacyjne w jednym miejscu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={pl}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasTask: markedDates,
                }}
                modifiersStyles={{
                  hasTask: {
                    fontWeight: 'bold',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    borderRadius: '0.375rem',
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: pl }) : 'Wybierz datę'}
              </CardTitle>
              <CardDescription>
                {tasksForSelectedDate.length > 0
                  ? `${tasksForSelectedDate.length} zadania`
                  : 'Brak zadań'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {tasksForSelectedDate.map(task => {
                  const Icon = getTaskIcon(task.type);
                  return (
                    <div
                      key={`${task.type}-${task.id}`}
                      className={`p-4 border rounded-lg transition-all ${
                        task.completed ? 'bg-muted/50 opacity-70' : 'bg-card'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <Icon className={`h-5 w-5 mt-0.5 ${getTaskColor(task.type)}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{task.plant_name}</h3>
                              {task.completed && (
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                              )}
                            </div>
                            <Badge variant={getTaskBadgeVariant(task.type)} className="mb-2">
                              {task.type === 'watering' ? 'Podlewanie' : 'Nawożenie'}
                            </Badge>
                            {task.fertilizer_type && (
                              <p className="text-sm text-muted-foreground">
                                {task.fertilizer_type}
                              </p>
                            )}
                            {task.notes && (
                              <p className="text-sm mt-2 text-muted-foreground">
                                {task.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {tasksForSelectedDate.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Brak zadań na ten dzień</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Podlewanie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">
                {tasks.filter(t => t.type === 'watering').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                w tym miesiącu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Nawożenie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">
                {tasks.filter(t => t.type === 'fertilization').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                w tym miesiącu
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
