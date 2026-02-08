import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NotificationSettings } from '@/components/NotificationSettings';
import { DataExport } from '@/components/DataExport';

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
            <div className="pt-4 border-t">
              <Button variant="destructive" onClick={signOut}>
                Wyloguj się
              </Button>
            </div>
          </CardContent>
        </Card>

        <NotificationSettings />
        <DataExport />
      </div>
    </Layout>
  );
}
