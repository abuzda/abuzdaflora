import { Layout } from '@/components/layout/Layout';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Search() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

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
              <CardTitle>Wyniki wyszukiwania</CardTitle>
              <CardDescription>Informacje o roślinie: {query}</CardDescription>
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