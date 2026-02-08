import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface ExportOptions {
  userId: string;
  type: 'collection' | 'journal' | 'fertilization' | 'watering';
  format: 'csv' | 'pdf';
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob(['\ufeff' + content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function arrayToCSV(headers: string[], rows: string[][]): string {
  const csvHeaders = headers.join(';');
  const csvRows = rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(';'));
  return [csvHeaders, ...csvRows].join('\n');
}

function generateHTMLForPDF(title: string, headers: string[], rows: string[][]): string {
  const tableRows = rows.map(row =>
    `<tr>${row.map(cell => `<td style="border:1px solid #ddd;padding:8px;font-size:12px;">${cell || '-'}</td>`).join('')}</tr>`
  ).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 20px; }
  h1 { color: #2d5016; font-size: 24px; }
  p { color: #666; font-size: 12px; }
  table { border-collapse: collapse; width: 100%; margin-top: 20px; }
  th { background-color: #2d5016; color: white; padding: 10px; text-align: left; font-size: 13px; }
  tr:nth-child(even) { background-color: #f9f9f9; }
</style></head><body>
<h1>🌿 AbuzdaFlora - ${title}</h1>
<p>Wygenerowano: ${format(new Date(), 'dd MMMM yyyy, HH:mm', { locale: pl })}</p>
<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
<tbody>${tableRows}</tbody></table></body></html>`;
}

function printHTML(html: string) {
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    win.print();
  }
}

export async function exportData(options: ExportOptions) {
  const { userId, type, format: fmt } = options;
  const date = format(new Date(), 'yyyy-MM-dd');

  if (type === 'collection') {
    const { data } = await supabase
      .from('plant_collection')
      .select('*')
      .eq('user_id', userId)
      .order('plant_name');

    if (!data?.length) throw new Error('Brak danych do eksportu');

    const headers = ['Nazwa', 'Nazwa naukowa', 'Podlewanie (dni)', 'Ostatnie podlewanie', 'Nawóz', 'Notatki', 'Dodano'];
    const rows = data.map(p => [
      p.plant_name,
      p.scientific_name || '',
      String(p.watering_frequency_days || 7),
      p.last_watered_at ? format(new Date(p.last_watered_at), 'dd.MM.yyyy') : '',
      p.fertilizer_recommendation || '',
      p.notes || '',
      format(new Date(p.created_at), 'dd.MM.yyyy'),
    ]);

    if (fmt === 'csv') {
      downloadFile(arrayToCSV(headers, rows), `kolekcja-roslin-${date}.csv`, 'text/csv;charset=utf-8');
    } else {
      printHTML(generateHTMLForPDF('Kolekcja Roślin', headers, rows));
    }
  }

  if (type === 'journal') {
    const { data: entries } = await supabase
      .from('growth_journal')
      .select('*')
      .eq('user_id', userId)
      .order('entry_date', { ascending: false });

    const { data: plants } = await supabase
      .from('plant_collection')
      .select('id, plant_name')
      .eq('user_id', userId);

    if (!entries?.length) throw new Error('Brak danych do eksportu');

    const plantMap = new Map(plants?.map(p => [p.id, p.plant_name]) || []);
    const headers = ['Data', 'Roślina', 'Wysokość (cm)', 'Liczba liści', 'Notatki'];
    const rows = entries.map(e => [
      format(new Date(e.entry_date), 'dd.MM.yyyy'),
      plantMap.get(e.plant_id || '') || 'Nieznana',
      e.height_cm != null ? String(e.height_cm) : '',
      e.leaf_count != null ? String(e.leaf_count) : '',
      e.notes || '',
    ]);

    if (fmt === 'csv') {
      downloadFile(arrayToCSV(headers, rows), `dziennik-wzrostu-${date}.csv`, 'text/csv;charset=utf-8');
    } else {
      printHTML(generateHTMLForPDF('Dziennik Wzrostu', headers, rows));
    }
  }

  if (type === 'fertilization') {
    const { data } = await supabase
      .from('fertilization_schedule')
      .select('*')
      .eq('user_id', userId)
      .order('scheduled_date', { ascending: false });

    if (!data?.length) throw new Error('Brak danych do eksportu');

    const headers = ['Data', 'Roślina', 'Typ nawozu', 'Wykonane', 'Notatki'];
    const rows = data.map(f => [
      format(new Date(f.scheduled_date), 'dd.MM.yyyy'),
      f.plant_name,
      f.fertilizer_type,
      f.completed ? 'Tak' : 'Nie',
      f.notes || '',
    ]);

    if (fmt === 'csv') {
      downloadFile(arrayToCSV(headers, rows), `nawozenie-${date}.csv`, 'text/csv;charset=utf-8');
    } else {
      printHTML(generateHTMLForPDF('Harmonogram Nawożenia', headers, rows));
    }
  }

  if (type === 'watering') {
    const { data: records } = await supabase
      .from('watering_schedule')
      .select('*')
      .eq('user_id', userId)
      .order('watered_at', { ascending: false });

    const { data: plants } = await supabase
      .from('plant_collection')
      .select('id, plant_name')
      .eq('user_id', userId);

    if (!records?.length) throw new Error('Brak danych do eksportu');

    const plantMap = new Map(plants?.map(p => [p.id, p.plant_name]) || []);
    const headers = ['Data podlania', 'Roślina', 'Notatki'];
    const rows = records.map(r => [
      format(new Date(r.watered_at), 'dd.MM.yyyy HH:mm'),
      plantMap.get(r.plant_id) || 'Nieznana',
      r.notes || '',
    ]);

    if (fmt === 'csv') {
      downloadFile(arrayToCSV(headers, rows), `podlewanie-${date}.csv`, 'text/csv;charset=utf-8');
    } else {
      printHTML(generateHTMLForPDF('Historia Podlewania', headers, rows));
    }
  }
}
