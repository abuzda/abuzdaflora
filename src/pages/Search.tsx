import { Layout } from '@/components/layout/Layout';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search as SearchIcon, Loader2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function Search() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [addingToCollection, setAddingToCollection] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: 'Błąd',
        description: 'Wpisz nazwę rośliny',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('search-plants', {
        body: { query },
      });

      if (error) throw error;

      setResult(data.result);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Błąd',
        description: 'Nie udało się wyszukać rośliny',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = async () => {
    if (!result || !query.trim()) {
      toast({
        title: 'Błąd',
        description: 'Najpierw wyszukaj roślinę',
        variant: 'destructive',
      });
      return;
    }

    setAddingToCollection(true);

    try {
      const { error } = await supabase
        .from('plant_collection')
        .insert({
          user_id: user?.id,
          plant_name: query,
          notes: result,
        });

      if (error) throw error;

      toast({
        title: 'Sukces',
        description: 'Roślina dodana do kolekcji',
      });
    } catch (error) {
      console.error('Error adding to collection:', error);
      toast({
        title: 'Błąd',
        description: 'Nie udało się dodać rośliny do kolekcji',
        variant: 'destructive',
      });
    } finally {
      setAddingToCollection(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Wyszukiwarka Roślin</h1>
        
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Wpisz nazwę rośliny..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SearchIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {result && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Wyniki wyszukiwania</CardTitle>
                  <CardDescription>Informacje o roślinie: {query}</CardDescription>
                </div>
                <Button
                  onClick={handleAddToCollection}
                  disabled={addingToCollection}
                  size="sm"
                >
                  {addingToCollection ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Dodaj do kolekcji
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap">{result}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}