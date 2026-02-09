import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Leaf } from 'lucide-react';

interface PublicPlant {
  id: string;
  plant_name: string;
  scientific_name: string | null;
  image_url: string | null;
  description: string | null;
}

export default function PublicProfile() {
  const { token } = useParams<{ token: string }>();
  const [profile, setProfile] = useState<{ display_name: string | null } | null>(null);
  const [plants, setPlants] = useState<PublicPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    loadPublicProfile();
  }, [token]);

  async function loadPublicProfile() {
    try {
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('id, display_name')
        .eq('share_token', token)
        .maybeSingle();

      if (profileErr || !profileData) {
        setError(true);
        setLoading(false);
        return;
      }

      setProfile(profileData);

      const { data: plantData } = await supabase
        .from('plant_collection')
        .select('id, plant_name, scientific_name, image_url, description')
        .eq('user_id', profileData.id);

      setPlants(plantData || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="h-32 w-64" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-xl font-semibold">Profil nie znaleziony</p>
            <p className="text-muted-foreground mt-2">Ten link może być nieprawidłowy lub profil nie jest już udostępniany.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-2xl">
              {profile.display_name?.charAt(0).toUpperCase() || '🌱'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.display_name || 'Ogrodnik'}</h1>
            <p className="text-muted-foreground flex items-center gap-1">
              <Leaf className="h-4 w-4" /> {plants.length} roślin w kolekcji
            </p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map(plant => (
            <Card key={plant.id} className="overflow-hidden">
              {plant.image_url && (
                <img src={plant.image_url} alt={plant.plant_name} className="w-full h-40 object-cover" />
              )}
              <CardContent className="p-4">
                <p className="font-semibold">{plant.plant_name}</p>
                {plant.scientific_name && (
                  <p className="text-xs text-muted-foreground italic">{plant.scientific_name}</p>
                )}
                {plant.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{plant.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {plants.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Ta kolekcja jest pusta.</p>
        )}

        <footer className="text-center text-sm text-muted-foreground pt-8 border-t">
          Stworzone z 💚 przez Abuzda Flora
        </footer>
      </div>
    </div>
  );
}
