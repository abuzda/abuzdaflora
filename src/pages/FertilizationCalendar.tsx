import { Layout } from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface FertilizationRecord {
  id: string;
  plant_id: string;
  plant_name: string;
  fertilizer_type: string;
  scheduled_date: string;
  notes: string;
  completed: boolean;
}

interface PlantInCollection {
  id: string;
  plant_name: string;
}

export default function FertilizationCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [records, setRecords] = useState<FertilizationRecord[]>([]);
  const [cachedRecords, setCachedRecords] = useLocalStorage<FertilizationRecord[]>('fertilization_records', []);
  const [plants, setPlants] = useState<PlantInCollection[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [fertilizerType, setFertilizerType] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Load from cache first
    if (cachedRecords.length > 0) {
      setRecords(cachedRecords);
    }
    
    // Then fetch fresh data
    if (user) {
      fetchPlants();
      fetchRecords();
    }
  }, [user]);

  const fetchPlants = async () => {
    const { data, error } = await supabase
      .from('plant_collection')
      .select('id, plant_name')
      .order('plant_name');

    if (error) {
      console.error('Error fetching plants:', error);
      return;
    }

    setPlants(data || []);
  };

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from('fertilization_schedule' as any)
      .select('*')
      .order('scheduled_date');

    if (error) {
      console.error('Error fetching records:', error);
      return;
    }

    const recordsData = data as any || [];
    setRecords(recordsData);
    setCachedRecords(recordsData);
  };

  const handleAddRecord = async () => {
    if (!selectedPlantId || !selectedDate || !fertilizerType) {
      toast({
        title: 'Błąd',
        description: 'Wypełnij wszystkie wymagane pola',
        variant: 'destructive',
      });
      return;
    }

    const plant = plants.find(p => p.id === selectedPlantId);
    
    const { error } = await supabase
      .from('fertilization_schedule' as any)
      .insert({
        user_id: user?.id,
        plant_id: selectedPlantId,
        plant_name: plant?.plant_name,
        fertilizer_type: fertilizerType,
        scheduled_date: selectedDate.toISOString(),
        notes,
        completed: false,
      });

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się dodać terminu',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sukces',
      description: 'Termin nawożenia dodany',
    });

    setIsDialogOpen(false);
    setSelectedPlantId('');
    setFertilizerType('');
    setNotes('');
    fetchRecords();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from('fertilization_schedule' as any)
      .update({ completed: !completed } as any)
      .eq('id', id);

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się zaktualizować statusu',
        variant: 'destructive',
      });
      return;
    }

    fetchRecords();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('fertilization_schedule' as any)
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się usunąć terminu',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sukces',
      description: 'Termin usunięty',
    });

    fetchRecords();
  };

  const recordsForSelectedDate = records.filter(r => {
    if (!selectedDate) return false;
    const recordDate = new Date(r.scheduled_date);
    return format(recordDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  });

  const markedDates = records.map(r => new Date(r.scheduled_date));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Kalendarz Nawożenia</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Dodaj termin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj termin nawożenia</DialogTitle>
                <DialogDescription>
                  Zaplanuj nawożenie swojej rośliny
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Roślina</Label>
                  <Select value={selectedPlantId} onValueChange={setSelectedPlantId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz roślinę" />
                    </SelectTrigger>
                    <SelectContent>
                      {plants.map(plant => (
                        <SelectItem key={plant.id} value={plant.id}>
                          {plant.plant_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Data</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={pl}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label>Rodzaj nawozu</Label>
                  <Input
                    value={fertilizerType}
                    onChange={(e) => setFertilizerType(e.target.value)}
                    placeholder="np. Nawóz uniwersalny"
                  />
                </div>
                <div>
                  <Label>Notatki (opcjonalnie)</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Dodatkowe informacje..."
                  />
                </div>
                <Button onClick={handleAddRecord} className="w-full">
                  Dodaj termin
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Kalendarz</CardTitle>
              <CardDescription>Wybierz datę aby zobaczyć zaplanowane nawożenia</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={pl}
                className="rounded-md border"
                modifiers={{
                  scheduled: markedDates,
                }}
                modifiersStyles={{
                  scheduled: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
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
                {recordsForSelectedDate.length > 0
                  ? `${recordsForSelectedDate.length} zaplanowane nawożenia`
                  : 'Brak zaplanowanych nawożeń'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recordsForSelectedDate.map(record => (
                  <div
                    key={record.id}
                    className={`p-4 border rounded-lg ${
                      record.completed ? 'bg-muted opacity-60' : 'bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{record.plant_name}</h3>
                        <p className="text-sm text-muted-foreground">{record.fertilizer_type}</p>
                        {record.notes && (
                          <p className="text-sm mt-2">{record.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={record.completed ? 'default' : 'outline'}
                          onClick={() => handleToggleComplete(record.id, record.completed)}
                        >
                          {record.completed ? 'Wykonane' : 'Oznacz'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(record.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
