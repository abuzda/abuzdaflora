import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Camera, Calendar, Ruler, Leaf, ImageOff } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface GalleryEntry {
  id: string;
  plant_id: string;
  entry_date: string;
  height_cm: number | null;
  leaf_count: number | null;
  notes: string | null;
  image_url: string | null;
}

interface Plant {
  id: string;
  plant_name: string;
}

export default function PlantGallery() {
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPlants();
      fetchEntries();
    }
  }, [user]);

  const fetchPlants = async () => {
    const { data } = await supabase
      .from('plant_collection')
      .select('id, plant_name')
      .eq('user_id', user?.id)
      .order('plant_name');
    setPlants(data || []);
  };

  const fetchEntries = async () => {
    const { data } = await supabase
      .from('growth_journal')
      .select('*')
      .eq('user_id', user?.id)
      .not('image_url', 'is', null)
      .order('entry_date', { ascending: true });
    setEntries(data || []);
  };

  const filteredEntries = selectedPlant === 'all'
    ? entries
    : entries.filter(e => e.plant_id === selectedPlant);

  const getPlantName = (plantId: string | null) =>
    plants.find(p => p.id === plantId)?.plant_name || 'Nieznana roślina';

  // Group by plant for timeline view
  const grouped = filteredEntries.reduce((acc, entry) => {
    const name = getPlantName(entry.plant_id);
    if (!acc[name]) acc[name] = [];
    acc[name].push(entry);
    return acc;
  }, {} as Record<string, GalleryEntry[]>);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-2 mb-6">
          <Camera className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Galeria Wzrostu</h1>
        </div>

        <div className="mb-6 max-w-xs">
          <Select value={selectedPlant} onValueChange={setSelectedPlant}>
            <SelectTrigger>
              <SelectValue placeholder="Filtruj po roślinie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie rośliny</SelectItem>
              {plants.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.plant_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center space-y-3">
              <ImageOff className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                Brak zdjęć w dzienniku wzrostu. Dodaj wpisy ze zdjęciami w Dzienniku Wzrostu, aby zobaczyć galerię.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([plantName, plantEntries]) => (
              <Card key={plantName}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    {plantName}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      ({plantEntries.length} {plantEntries.length === 1 ? 'zdjęcie' : 'zdjęć'})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-6">
                      {plantEntries.map((entry, idx) => (
                        <div key={entry.id} className="relative pl-10">
                          <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(entry.entry_date), 'dd MMMM yyyy', { locale: pl })}
                          </div>
                          <div className="rounded-lg overflow-hidden border">
                            <AspectRatio ratio={4 / 3}>
                              <img
                                src={entry.image_url!}
                                alt={`${plantName} - ${entry.entry_date}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </AspectRatio>
                          </div>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            {entry.height_cm != null && (
                              <span className="flex items-center gap-1">
                                <Ruler className="h-3 w-3" /> {entry.height_cm} cm
                              </span>
                            )}
                            {entry.leaf_count != null && (
                              <span className="flex items-center gap-1">
                                <Leaf className="h-3 w-3" /> {entry.leaf_count} liści
                              </span>
                            )}
                          </div>
                          {entry.notes && (
                            <p className="text-sm text-muted-foreground mt-1 bg-muted/50 p-2 rounded">
                              {entry.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
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
