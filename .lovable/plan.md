## Cel

Dodać automatyczną synchronizację odczytów z czujników Tuya co 15 minut, żeby użytkownik nie musiał ręcznie klikać "Synchronizuj". Odczyty trafiają do tabeli `sensor_readings` i zasilają wykresy oraz alerty.

## Zakres zmian

### 1. Edge function `tuya-sync` — tryb batch
Obecna funkcja działa per-użytkownik na żądanie. Dodam obsługę trybu cron:
- Gdy wywołanie przychodzi bez `user_id` w body i z nagłówkiem `x-cron-secret` zgodnym z sekretem `CRON_SECRET`, funkcja iteruje po wszystkich rekordach w `tuya_credentials`, pobiera urządzenia każdego użytkownika i zapisuje odczyty do `sensor_readings`.
- Tryb interaktywny (z JWT użytkownika) pozostaje bez zmian.

### 2. Nowy sekret `CRON_SECRET`
Wygenerowany losowo i przechowany w sekretach projektu, używany do autoryzacji wywołań z `pg_cron` (żeby publiczny endpoint nie mógł być wywoływany anonimowo do uruchomienia syncu wszystkich).

### 3. Harmonogram pg_cron
Włączyć rozszerzenia `pg_cron` i `pg_net` i utworzyć zadanie:

```text
nazwa:  tuya-auto-sync
cykl:   */15 * * * *   (co 15 minut)
akcja:  net.http_post → https://<project>.supabase.co/functions/v1/tuya-sync
nagłówki: apikey + x-cron-secret
```

Zapis przez `supabase--insert` (nie migracja), bo zawiera URL projektu i klucze.

### 4. UI — wskaźnik ostatniej synchronizacji
W `src/components/iot/TuyaSetup.tsx` (lub nowej małej karcie obok) pokazać:
- Status: "Auto-sync aktywny — co 15 minut"
- "Ostatnia synchronizacja: <czas>" — wyliczane jako `max(reading_at)` z `sensor_readings` dla bieżącego użytkownika.
- Przycisk "Synchronizuj teraz" działa jak dotąd (wywołanie interaktywne).

Bez zmian w logice alertów ani wykresów — one już czytają z tych samych źródeł.

## Szczegóły techniczne

- `tuya-sync` rozpoznaje tryb: `req.headers.get('x-cron-secret') === Deno.env.get('CRON_SECRET')` → batch wszystkich użytkowników; w przeciwnym razie wymaga JWT i działa jak dziś.
- W trybie batch używa `SUPABASE_SERVICE_ROLE_KEY` do odczytu `tuya_credentials` i zapisu `sensor_readings` z poprawnym `user_id`.
- Błędy per-użytkownik logowane, ale nie przerywają iteracji (jeden zły klucz nie blokuje pozostałych).
- Cron job tworzony przez `supabase--insert` po dodaniu sekretu.

## Plik / zadania

1. Dodać sekret `CRON_SECRET` (wygenerowany).
2. Zmodyfikować `supabase/functions/tuya-sync/index.ts` — dodać gałąź cron-batch.
3. Włączyć `pg_cron` + `pg_net` i utworzyć job `tuya-auto-sync`.
4. Zaktualizować `src/components/iot/TuyaSetup.tsx` o informację o auto-sync i czas ostatniej synchronizacji.

## Pominięte (świadomie)

- UI do włączania/wyłączania auto-sync per użytkownik — globalny harmonogram wystarczy na start.
- Konfigurowalna częstotliwość — 15 min jest sensownym domyślnym kompromisem między świeżością a limitami Tuya.