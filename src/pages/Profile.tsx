import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NotificationSettings } from '@/components/NotificationSettings';
import { DataExport } from '@/components/DataExport';
import { ShareProfile } from '@/components/ShareProfile';
import { Trophy, BarChart3 } from 'lucide-react';

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Profil</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Informacje o koncie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.email}</p>
                <p className="text-sm text-muted-foreground">
                  Członek od {new Date(user?.created_at || '').toLocaleDateString('pl-PL')}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild>
                <Link to="/achievements"><Trophy className="h-4 w-4 mr-2" />Osiągnięcia</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/stats"><BarChart3 className="h-4 w-4 mr-2" />Statystyki</Link>
              </Button>
            </div>
            <div className="pt-4 border-t">
              <Button variant="destructive" onClick={signOut}>
                Wyloguj się
              </Button>
            </div>
          </CardContent>
        </Card>

        <ShareProfile />
        <NotificationSettings />
        <DataExport />
      </div>
    </Layout>
  );
}
