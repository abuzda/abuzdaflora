import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { WateringCalendar } from '@/components/WateringCalendar';
import { PlantChat } from '@/components/PlantChat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Droplets, MessageSquare } from 'lucide-react';

interface Plant {
  id: string;
  plant_name: string;
  scientific_name: string | null;
  image_url: string | null;
  watering_frequency_days: number;
  last_watered_at: string | null;
  next_watering_at: string | null;
  notes: string | null;
}

export default function Collection() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    plant_name: '',
    scientific_name: '',
    watering_frequency_days: 7,
    notes: '',
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPlants();
    }
  }, [user]);

  const fetchPlants = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('plant_collection')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching plants:', error);
      return;
    }

    setPlants(data || []);
  };

  const handleAddPlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('plant_collection').insert({
      user_id: user.id,
      plant_name: formData.plant_name,
      scientific_name: formData.scientific_name || null,
      watering_frequency_days: formData.watering_frequency_days,
      notes: formData.notes || null,
    });

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się dodać rośliny',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sukces!',
      description: 'Roślina została dodana do kolekcji',
    });

    setFormData({
      plant_name: '',
      scientific_name: '',
      watering_frequency_days: 7,
      notes: '',
    });
    setIsDialogOpen(false);
    fetchPlants();
  };

  const handleDeletePlant = async (id: string) => {
    const { error } = await supabase
      .from('plant_collection')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się usunąć rośliny',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Usunięto',
      description: 'Roślina została usunięta z kolekcji',
    });

    fetchPlants();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Moja Kolekcja Roślin</h1>
          <p className="text-muted-foreground">
            Zarządzaj swoimi roślinami i śledź harmonogram podlewania
          </p>
        </div>

        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="collection">Kolekcja</TabsTrigger>
            <TabsTrigger value="calendar">
              <Droplets className="h-4 w-4 mr-2" />
              Kalendarz
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Czat AI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Twoje rośliny ({plants.length})</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Dodaj roślinę
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj nową roślinę</DialogTitle>
                    <DialogDescription>
                      Wprowadź informacje o roślinie, którą chcesz dodać do kolekcji
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddPlant} className="space-y-4">
                    <div>
                      <Label htmlFor="plant_name">Nazwa rośliny *</Label>
                      <Input
                        id="plant_name"
                        value={formData.plant_name}
                        onChange={(e) => setFormData({ ...formData, plant_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="scientific_name">Nazwa naukowa</Label>
                      <Input
                        id="scientific_name"
                        value={formData.scientific_name}
                        onChange={(e) => setFormData({ ...formData, scientific_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="watering_frequency">Częstotliwość podlewania (dni)</Label>
                      <Input
                        id="watering_frequency"
                        type="number"
                        min="1"
                        value={formData.watering_frequency_days}
                        onChange={(e) => setFormData({ ...formData, watering_frequency_days: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notatki</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Dodatkowe informacje o roślinie..."
                      />
                    </div>
                    <Button type="submit" className="w-full">Dodaj roślinę</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {plants.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Nie masz jeszcze żadnych roślin w kolekcji
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Dodaj pierwszą roślinę
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plants.map((plant) => (
                  <Card key={plant.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{plant.plant_name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePlant(plant.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </CardTitle>
                      {plant.scientific_name && (
                        <CardDescription className="italic">
                          {plant.scientific_name}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Droplets className="h-4 w-4 text-primary" />
                        <span>Co {plant.watering_frequency_days} dni</span>
                      </div>
                      {plant.notes && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {plant.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <WateringCalendar />
          </TabsContent>

          <TabsContent value="chat">
            <PlantChat />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}