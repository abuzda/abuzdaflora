import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Share2, Copy, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ShareProfile() {
  const { user } = useAuth();
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadToken();
  }, [user]);

  async function loadToken() {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('share_token')
      .eq('id', user.id)
      .maybeSingle();
    setShareToken(data?.share_token || null);
    setLoading(false);
  }

  async function generateToken() {
    if (!user) return;
    setLoading(true);
    const token = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    const { error } = await supabase
      .from('profiles')
      .update({ share_token: token })
      .eq('id', user.id);

    if (error) {
      toast.error('Nie udało się wygenerować linku');
    } else {
      setShareToken(token);
      toast.success('Link do udostępniania został wygenerowany!');
    }
    setLoading(false);
  }

  async function disableSharing() {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ share_token: null })
      .eq('id', user.id);

    if (error) {
      toast.error('Nie udało się wyłączyć udostępniania');
    } else {
      setShareToken(null);
      toast.success('Udostępnianie wyłączone');
    }
    setLoading(false);
  }

  function copyLink() {
    const url = `${window.location.origin}/public/${shareToken}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link skopiowany!');
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          Udostępnij Kolekcję
        </CardTitle>
        <CardDescription>
          Wygeneruj publiczny link do swojej kolekcji roślin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : shareToken ? (
          <>
            <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
              <code className="text-xs flex-1 truncate">
                {window.location.origin}/public/{shareToken}
              </code>
              <Button variant="ghost" size="sm" onClick={copyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={disableSharing}>
              Wyłącz udostępnianie
            </Button>
          </>
        ) : (
          <Button onClick={generateToken}>
            <Share2 className="h-4 w-4 mr-2" />
            Wygeneruj link
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
