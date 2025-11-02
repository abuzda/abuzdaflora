import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Apple, Github, Download as DownloadIcon } from 'lucide-react';

export default function Download() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Pobierz Aplikację</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-6 w-6" />
              Aplikacja iOS
            </CardTitle>
            <CardDescription>
              Instrukcja instalacji aplikacji na iPhone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Kroki instalacji:</h3>
              <ol className="space-y-2">
                <li>
                  <strong>Przenieś projekt do GitHub:</strong>
                  <p className="text-muted-foreground">Użyj przycisku "Export to GitHub" w Lovable</p>
                </li>
                <li>
                  <strong>Sklonuj repozytorium:</strong>
                  <code className="block bg-muted p-2 rounded mt-1">
                    git clone [twoje-repo]
                  </code>
                </li>
                <li>
                  <strong>Zainstaluj zależności:</strong>
                  <code className="block bg-muted p-2 rounded mt-1">
                    npm install
                  </code>
                </li>
                <li>
                  <strong>Dodaj platformę iOS:</strong>
                  <code className="block bg-muted p-2 rounded mt-1">
                    npx cap add ios
                  </code>
                </li>
                <li>
                  <strong>Zaktualizuj zależności:</strong>
                  <code className="block bg-muted p-2 rounded mt-1">
                    npx cap update ios
                  </code>
                </li>
                <li>
                  <strong>Zbuduj projekt:</strong>
                  <code className="block bg-muted p-2 rounded mt-1">
                    npm run build
                  </code>
                </li>
                <li>
                  <strong>Synchronizuj z iOS:</strong>
                  <code className="block bg-muted p-2 rounded mt-1">
                    npx cap sync
                  </code>
                </li>
                <li>
                  <strong>Uruchom aplikację:</strong>
                  <code className="block bg-muted p-2 rounded mt-1">
                    npx cap run ios
                  </code>
                </li>
              </ol>
              
              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="font-semibold">⚠️ Wymagania:</p>
                <ul>
                  <li>Mac z zainstalowanym Xcode</li>
                  <li>Konto Apple Developer (do publikacji w App Store)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Otwórz GitHub
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://capacitorjs.com/docs/ios" target="_blank" rel="noopener noreferrer">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Dokumentacja Capacitor
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
