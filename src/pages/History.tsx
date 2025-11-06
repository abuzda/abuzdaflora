import { Layout } from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Leaf, Stethoscope, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface HistoryItem {
  id: string;
  image_url: string;
  identification_type: string;
  plant_name?: string;
  scientific_name?: string;
  diagnosis?: string;
  light?: string;
  watering?: string;
  humidity?: string;
  soil?: string;
  fertilizing?: string;
  tips?: string;
  common_issues?: string;
  symptoms?: string;
  causes?: string;
  treatment?: string;
  prevention?: string;
  created_at: string;
}

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [cachedHistory, setCachedHistory] = useLocalStorage<HistoryItem[]>('history', []);

  const fetchHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('plant_identifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      const historyData = data || [];
      setHistory(historyData);
      setCachedHistory(historyData);
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
    // Load from cache first
    if (cachedHistory.length > 0) {
      setHistory(cachedHistory);
      setLoading(false);
    }
    
    // Then fetch fresh data
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
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {history.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedItem(item)}
              >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Usuń
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {selectedItem && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      {selectedItem.identification_type === 'identify' ? (
                        <><Leaf className="h-6 w-6 text-primary" /> {selectedItem.plant_name}</>
                      ) : (
                        <><Stethoscope className="h-6 w-6 text-accent" /> {selectedItem.diagnosis}</>
                      )}
                    </DialogTitle>
                    {selectedItem.scientific_name && (
                      <p className="text-muted-foreground italic">{selectedItem.scientific_name}</p>
                    )}
                  </DialogHeader>

                  <div className="space-y-6">
                    <img 
                      src={selectedItem.image_url} 
                      alt="Roślina" 
                      className="w-full rounded-lg object-cover max-h-96"
                    />

                    {selectedItem.identification_type === 'identify' ? (
                      <div className="space-y-4">
                        {selectedItem.light && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">💡 Światło</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.light}</CardContent>
                          </Card>
                        )}
                        {selectedItem.watering && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">💧 Podlewanie</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.watering}</CardContent>
                          </Card>
                        )}
                        {selectedItem.humidity && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">💨 Wilgotność</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.humidity}</CardContent>
                          </Card>
                        )}
                        {selectedItem.soil && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🌱 Podłoże</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.soil}</CardContent>
                          </Card>
                        )}
                        {selectedItem.fertilizing && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🌿 Nawożenie</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.fertilizing}</CardContent>
                          </Card>
                        )}
                        {selectedItem.tips && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">💡 Wskazówki</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.tips}</CardContent>
                          </Card>
                        )}
                        {selectedItem.common_issues && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">⚠️ Typowe Problemy</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.common_issues}</CardContent>
                          </Card>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedItem.symptoms && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🔍 Objawy</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.symptoms}</CardContent>
                          </Card>
                        )}
                        {selectedItem.causes && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🧬 Przyczyny</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.causes}</CardContent>
                          </Card>
                        )}
                        {selectedItem.treatment && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">💊 Leczenie</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.treatment}</CardContent>
                          </Card>
                        )}
                        {selectedItem.prevention && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🛡️ Profilaktyka</CardTitle>
                            </CardHeader>
                            <CardContent>{selectedItem.prevention}</CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          </>
        )}
      </div>
    </Layout>
  );
}