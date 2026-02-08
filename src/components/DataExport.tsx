import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { exportData } from '@/utils/exportData';
import { FileDown, FileText, Sprout, NotebookPen, Leaf, Droplets, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type ExportType = 'collection' | 'journal' | 'fertilization' | 'watering';
type ExportFormat = 'csv' | 'pdf';

const exportOptions: { type: ExportType; label: string; icon: React.ReactNode }[] = [
  { type: 'collection', label: 'Kolekcja roślin', icon: <Sprout className="h-4 w-4" /> },
  { type: 'journal', label: 'Dziennik wzrostu', icon: <NotebookPen className="h-4 w-4" /> },
  { type: 'fertilization', label: 'Harmonogram nawożenia', icon: <Leaf className="h-4 w-4" /> },
  { type: 'watering', label: 'Historia podlewania', icon: <Droplets className="h-4 w-4" /> },
];

export function DataExport() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleExport = async (type: ExportType, fmt: ExportFormat) => {
    if (!user) return;
    const key = `${type}-${fmt}`;
    setLoading(key);
    try {
      await exportData({ userId: user.id, type, format: fmt });
      toast.success('Dane wyeksportowane pomyślnie!');
    } catch (err: any) {
      toast.error(err.message || 'Błąd podczas eksportu');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileDown className="h-5 w-5 text-primary" />
          Eksport Danych
        </CardTitle>
        <CardDescription>
          Pobierz swoje dane w formacie CSV lub PDF
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exportOptions.map(({ type, label, icon }) => (
            <div key={type} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-2 text-sm font-medium">
                {icon}
                {label}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport(type, 'csv')}
                  disabled={loading !== null}
                >
                  {loading === `${type}-csv` ? <Loader2 className="h-3 w-3 animate-spin" /> : <FileDown className="h-3 w-3" />}
                  <span className="ml-1">CSV</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport(type, 'pdf')}
                  disabled={loading !== null}
                >
                  {loading === `${type}-pdf` ? <Loader2 className="h-3 w-3 animate-spin" /> : <FileText className="h-3 w-3" />}
                  <span className="ml-1">PDF</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
