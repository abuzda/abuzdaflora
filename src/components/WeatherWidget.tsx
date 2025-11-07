import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Cloud, Droplets, Wind, Sun, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export function WeatherWidget() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [savedCity, setSavedCity] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem('openweather_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setShowApiKeyInput(true);
    }
    loadSavedLocation();
  }, [user]);

  const loadSavedLocation = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_weather_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data && !error) {
      setSavedCity(data.city_name);
      setCity(data.city_name);
      fetchWeather(data.city_name);
    }
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    if (!apiKey) {
      toast({
        title: 'Brak klucza API',
        description: 'Podaj klucz API OpenWeatherMap',
        variant: 'destructive',
      });
      setShowApiKeyInput(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pl`
      );
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych pogodowych');
      }

      const data = await response.json();
      setWeather({
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });

      await saveLocation(cityName);
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się pobrać danych pogodowych. Sprawdź nazwę miasta.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveLocation = async (cityName: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_weather_preferences')
      .upsert({
        user_id: user.id,
        city_name: cityName,
      });

    if (!error) {
      setSavedCity(cityName);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem('openweather_api_key', apiKey);
    setShowApiKeyInput(false);
    toast({
      title: 'Sukces',
      description: 'Klucz API został zapisany',
    });
  };

  const getWeatherAdvice = () => {
    if (!weather) return null;

    const advice = [];
    
    if (weather.temperature > 25) {
      advice.push('🌡️ Gorąco - podlewaj częściej');
    } else if (weather.temperature < 10) {
      advice.push('❄️ Zimno - ogranicz podlewanie');
    }

    if (weather.humidity < 40) {
      advice.push('💧 Niska wilgotność - zwiększ zraszanie');
    } else if (weather.humidity > 70) {
      advice.push('💦 Wysoka wilgotność - uważaj na choroby grzybowe');
    }

    return advice.length > 0 ? advice : ['✅ Warunki optymalne dla większości roślin'];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Pogoda w Twojej okolicy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showApiKeyInput && (
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Potrzebujesz klucza API OpenWeatherMap. Zarejestruj się za darmo na{' '}
              <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                openweathermap.org
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Klucz API OpenWeatherMap"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button onClick={handleSaveApiKey}>Zapisz</Button>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Wpisz miasto..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!apiKey}
          />
          <Button type="submit" disabled={loading || !apiKey}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          </Button>
        </form>
        
        {apiKey && !showApiKeyInput && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowApiKeyInput(true)}
            className="text-xs w-full"
          >
            Zmień klucz API
          </Button>
        )}

        {weather && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{savedCity}</p>
                <p className="text-3xl font-bold">{weather.temperature}°C</p>
                <p className="text-sm capitalize">{weather.description}</p>
              </div>
              <Sun className="h-12 w-12 text-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Wilgotność</p>
                  <p className="font-semibold">{weather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Wiatr</p>
                  <p className="font-semibold">{weather.windSpeed} m/s</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg space-y-1">
              <p className="text-sm font-semibold mb-2">Porady pielęgnacyjne:</p>
              {getWeatherAdvice()?.map((advice, i) => (
                <p key={i} className="text-sm">{advice}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}