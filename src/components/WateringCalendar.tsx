import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface Plant {
  id: string;
  plant_name: string;
  watering_frequency_days: number;
  last_watered_at: string | null;
  next_watering_at: string | null;
}

interface WateringRecord {
  id: string;
  plant_id: string;
  watered_at: string;
  plant_name?: string;
}

export function WateringCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [plants, setPlants] = useState<Plant[]>([]);
  const [wateringRecords, setWateringRecords] = useState<WateringRecord[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPlants();
      fetchWateringRecords();
    }
  }, [user]);

  const fetchPlants = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('plant_collection')
      .select('*')
      .eq('user_id', user.id)
      .order('plant_name');

    if (error) {
      console.error('Error fetching plants:', error);
      return;
    }

    setPlants(data || []);
    if (data && data.length > 0 && !selectedPlant) {
      setSelectedPlant(data[0].id);
    }
  };

  const fetchWateringRecords = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('watering_schedule')
      .select(`
        *,
        plant_collection!inner(plant_name)
      `)
      .eq('user_id', user.id)
      .order('watered_at', { ascending: false });

    if (error) {
      console.error('Error fetching watering records:', error);
      return;
    }

    const recordsWithNames = (data || []).map(record => ({
      id: record.id,
      plant_id: record.plant_id,
      watered_at: record.watered_at,
      plant_name: (record.plant_collection as any)?.plant_name
    }));

    setWateringRecords(recordsWithNames);
  };

  const markAsWatered = async () => {
    if (!user || !selectedPlant || !date) return;

    const plant = plants.find(p => p.id === selectedPlant);
    if (!plant) return;

    const { error } = await supabase.from('watering_schedule').insert({
      user_id: user.id,
      plant_id: selectedPlant,
      watered_at: date.toISOString(),
    });

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się zapisać podlania',
        variant: 'destructive',
      });
      return;
    }

    // Update plant's next watering date
    const nextWateringDate = new Date(date);
    nextWateringDate.setDate(nextWateringDate.getDate() + plant.watering_frequency_days);

    await supabase
      .from('plant_collection')
      .update({
        last_watered_at: date.toISOString(),
        next_watering_at: nextWateringDate.toISOString(),
      })
      .eq('id', selectedPlant);

    toast({
      title: 'Zapisano!',
      description: `Podlano roślinę: ${plant.plant_name}`,
    });

    fetchPlants();
    fetchWateringRecords();
  };

  const getWateringDatesForMonth = () => {
    if (!date) return new Set<string>();
    
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    
    return new Set(
      wateringRecords
        .filter(record => {
          const recordDate = new Date(record.watered_at);
          return recordDate.getMonth() === currentMonth && 
                 recordDate.getFullYear() === currentYear;
        })
        .map(record => format(new Date(record.watered_at), 'yyyy-MM-dd'))
    );
  };

  const wateringDates = getWateringDatesForMonth();

  const modifiers = {
    watered: (day: Date) => wateringDates.has(format(day, 'yyyy-MM-dd')),
  };

  const modifiersStyles = {
    watered: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      fontWeight: 'bold',
    },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Kalendarz Podlewania
          </CardTitle>
          <CardDescription>
            Oznaczone dni to dni, w które podlano rośliny
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border pointer-events-auto"
            locale={pl}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Oznacz jako podlane</CardTitle>
            <CardDescription>
              Wybierz roślinę i datę podlania
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {plants.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Dodaj rośliny do kolekcji, aby śledzić ich podlewanie
              </p>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wybierz roślinę</label>
                  <select
                    value={selectedPlant}
                    onChange={(e) => setSelectedPlant(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>
                        {plant.plant_name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedPlant && plants.find(p => p.id === selectedPlant) && (
                  <div className="p-4 rounded-lg bg-muted space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Częstotliwość:</span>{' '}
                      co {plants.find(p => p.id === selectedPlant)?.watering_frequency_days} dni
                    </p>
                    {plants.find(p => p.id === selectedPlant)?.next_watering_at && (
                      <p className="text-sm">
                        <span className="font-medium">Następne podlanie:</span>{' '}
                        {format(
                          new Date(plants.find(p => p.id === selectedPlant)!.next_watering_at!),
                          'dd MMMM yyyy',
                          { locale: pl }
                        )}
                      </p>
                    )}
                  </div>
                )}

                <Button onClick={markAsWatered} className="w-full" disabled={!date}>
                  <Plus className="h-4 w-4 mr-2" />
                  Oznacz jako podlane w wybranym dniu
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historia podlewania</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {wateringRecords.slice(0, 10).map(record => (
                <div
                  key={record.id}
                  className="flex justify-between items-center p-2 rounded-md bg-muted/50"
                >
                  <span className="text-sm font-medium">{record.plant_name}</span>
                  <Badge variant="outline">
                    {format(new Date(record.watered_at), 'dd MMM yyyy', { locale: pl })}
                  </Badge>
                </div>
              ))}
              {wateringRecords.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Brak zapisów podlewania
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}