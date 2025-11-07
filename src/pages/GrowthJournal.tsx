import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, TrendingUp, Calendar, Ruler, Leaf, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface Plant {
  id: string;
  plant_name: string;
}

interface JournalEntry {
  id: string;
  plant_id: string;
  entry_date: string;
  height_cm: number | null;
  leaf_count: number | null;
  notes: string | null;
  image_url: string | null;
  plant_name?: string;
}

export default function GrowthJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    plant_id: '',
    entry_date: new Date().toISOString().split('T')[0],
    height_cm: '',
    leaf_count: '',
    notes: '',
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPlants();
      fetchEntries();
    }
  }, [user]);

  const fetchPlants = async () => {
    const { data, error } = await supabase
      .from('plant_collection')
      .select('id, plant_name')
      .eq('user_id', user?.id)
      .order('plant_name');

    if (error) {
      console.error('Error fetching plants:', error);
      return;
    }

    setPlants(data || []);
  };

  const fetchEntries = async () => {
    const { data: entriesData, error } = await supabase
      .from('growth_journal')
      .select('*')
      .eq('user_id', user?.id)
      .order('entry_date', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
      return;
    }

    // Fetch plant names for entries
    const entriesWithPlants = await Promise.all(
      (entriesData || []).map(async (entry) => {
        const { data: plantData } = await supabase
          .from('plant_collection')
          .select('plant_name')
          .eq('id', entry.plant_id)
          .single();

        return {
          ...entry,
          plant_name: plantData?.plant_name || 'Nieznana roślina',
        };
      })
    );

    setEntries(entriesWithPlants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('growth_journal').insert({
      user_id: user.id,
      plant_id: formData.plant_id,
      entry_date: formData.entry_date,
      height_cm: formData.height_cm ? parseFloat(formData.height_cm) : null,
      leaf_count: formData.leaf_count ? parseInt(formData.leaf_count) : null,
      notes: formData.notes || null,
    });

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się dodać wpisu do dziennika',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sukces',
      description: 'Wpis został dodany do dziennika wzrostu',
    });

    setFormData({
      plant_id: '',
      entry_date: new Date().toISOString().split('T')[0],
      height_cm: '',
      leaf_count: '',
      notes: '',
    });
    setIsDialogOpen(false);
    fetchEntries();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('growth_journal')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się usunąć wpisu',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sukces',
      description: 'Wpis został usunięty',
    });
    fetchEntries();
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    const plantName = entry.plant_name || 'Nieznana roślina';
    if (!acc[plantName]) {
      acc[plantName] = [];
    }
    acc[plantName].push(entry);
    return acc;
  }, {} as Record<string, JournalEntry[]>);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Dziennik Wzrostu
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Dodaj wpis
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nowy wpis w dzienniku</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="plant">Roślina</Label>
                  <Select
                    value={formData.plant_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, plant_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz roślinę" />
                    </SelectTrigger>
                    <SelectContent>
                      {plants.map((plant) => (
                        <SelectItem key={plant.id} value={plant.id}>
                          {plant.plant_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="entry_date">Data</Label>
                  <Input
                    id="entry_date"
                    type="date"
                    value={formData.entry_date}
                    onChange={(e) =>
                      setFormData({ ...formData, entry_date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="height_cm">Wysokość (cm)</Label>
                  <Input
                    id="height_cm"
                    type="number"
                    step="0.1"
                    placeholder="np. 25.5"
                    value={formData.height_cm}
                    onChange={(e) =>
                      setFormData({ ...formData, height_cm: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="leaf_count">Liczba liści</Label>
                  <Input
                    id="leaf_count"
                    type="number"
                    placeholder="np. 12"
                    value={formData.leaf_count}
                    onChange={(e) =>
                      setFormData({ ...formData, leaf_count: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notatki</Label>
                  <Textarea
                    id="notes"
                    placeholder="Dodaj obserwacje, zmiany w wyglądzie rośliny..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Dodaj wpis
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {plants.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Nie masz jeszcze żadnych roślin w kolekcji. Dodaj rośliny, aby móc śledzić ich wzrost.
              </p>
            </CardContent>
          </Card>
        ) : entries.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Nie masz jeszcze żadnych wpisów w dzienniku wzrostu. Rozpocznij śledzenie rozwoju swoich roślin!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedEntries).map(([plantName, plantEntries]) => (
              <Card key={plantName}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    {plantName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plantEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(entry.entry_date), 'dd MMMM yyyy', { locale: pl })}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {entry.height_cm !== null && (
                            <div className="flex items-center gap-2">
                              <Ruler className="h-4 w-4 text-primary" />
                              <span className="text-sm">
                                Wysokość: <strong>{entry.height_cm} cm</strong>
                              </span>
                            </div>
                          )}
                          {entry.leaf_count !== null && (
                            <div className="flex items-center gap-2">
                              <Leaf className="h-4 w-4 text-primary" />
                              <span className="text-sm">
                                Liści: <strong>{entry.leaf_count}</strong>
                              </span>
                            </div>
                          )}
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}