import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, Trash2 } from 'lucide-react';

interface Favorite {
  id: string;
  plant_name: string;
  scientific_name: string | null;
  image_url: string | null;
  identification_data: any;
  created_at: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      return;
    }

    setFavorites(data || []);
  };

  const handleDeleteFavorite = async (id: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się usunąć z ulubionych',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Usunięto',
      description: 'Roślina została usunięta z ulubionych',
    });

    fetchFavorites();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-primary" />
            Ulubione Rośliny
          </h1>
          <p className="text-muted-foreground">
            Twoje ulubione rozpoznane rośliny
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Nie masz jeszcze żadnych ulubionych roślin
              </p>
              <p className="text-sm text-muted-foreground">
                Rozpoznaj roślinę i dodaj ją do ulubionych!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden">
                {favorite.image_url && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={favorite.image_url}
                      alt={favorite.plant_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{favorite.plant_name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFavorite(favorite.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardTitle>
                  {favorite.scientific_name && (
                    <CardDescription className="italic">
                      {favorite.scientific_name}
                    </CardDescription>
                  )}
                </CardHeader>
                {favorite.identification_data && (
                  <CardContent className="space-y-2 text-sm">
                    {favorite.identification_data.light && (
                      <div>
                        <span className="font-semibold">💡 Światło: </span>
                        <span className="text-muted-foreground">
                          {favorite.identification_data.light.substring(0, 100)}...
                        </span>
                      </div>
                    )}
                    {favorite.identification_data.watering && (
                      <div>
                        <span className="font-semibold">💧 Podlewanie: </span>
                        <span className="text-muted-foreground">
                          {favorite.identification_data.watering.substring(0, 100)}...
                        </span>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
