import { Layout } from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Leaf, Stethoscope, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface HistoryItem {
  id: string;
  image_url: string;
  identification_type: string;
  plant_name?: string;
  scientific_name?: string;
  diagnosis?: string;
  created_at: string;
}

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('plant_identifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Nie udało się pobrać historii');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('plant_identifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setHistory(history.filter(item => item.id !== id));
      toast.success('Usunięto z historii');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Nie udało się usunąć');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Historia Rozpoznań</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : history.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Leaf className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Brak historii rozpoznań. Zacznij od zrobienia zdjęcia rośliny!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {history.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.image_url} 
                    alt="Roślina" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {item.identification_type === 'identify' ? (
                      <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        Rozpoznanie
                      </div>
                    ) : (
                      <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Stethoscope className="h-3 w-3" />
                        Diagnoza
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      {item.identification_type === 'identify' 
                        ? item.plant_name 
                        : item.diagnosis}
                    </h3>
                    {item.scientific_name && (
                      <p className="text-sm text-muted-foreground italic">
                        {item.scientific_name}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(item.created_at), 'dd MMMM yyyy, HH:mm', { locale: pl })}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Usuń
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}