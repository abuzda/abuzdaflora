import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
  category: 'watering' | 'collection' | 'journal' | 'general';
}

export function useAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadAchievements();
  }, [user]);

  async function loadAchievements() {
    if (!user) return;
    setLoading(true);

    try {
      const [
        { count: plantCount },
        { count: wateringCount },
        { count: journalCount },
        { data: wateringData },
      ] = await Promise.all([
        supabase.from('plant_collection').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('watering_schedule').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('growth_journal').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('watering_schedule').select('watered_at').eq('user_id', user.id).order('watered_at', { ascending: false }).limit(100),
      ]);

      const streak = calculateStreak(wateringData?.map(w => w.watered_at) || []);

      const defs: Achievement[] = [
        { id: 'first-plant', name: 'Pierwszy Liść', description: 'Dodaj pierwszą roślinę do kolekcji', icon: '🌱', category: 'collection', target: 1, progress: Math.min(plantCount || 0, 1), unlocked: (plantCount || 0) >= 1 },
        { id: 'collector-5', name: 'Kolekcjoner', description: 'Posiadaj 5 roślin w kolekcji', icon: '🪴', category: 'collection', target: 5, progress: Math.min(plantCount || 0, 5), unlocked: (plantCount || 0) >= 5 },
        { id: 'collector-10', name: 'Ogrodnik', description: 'Posiadaj 10 roślin w kolekcji', icon: '🌿', category: 'collection', target: 10, progress: Math.min(plantCount || 0, 10), unlocked: (plantCount || 0) >= 10 },
        { id: 'collector-25', name: 'Botanik', description: 'Posiadaj 25 roślin w kolekcji', icon: '🌳', category: 'collection', target: 25, progress: Math.min(plantCount || 0, 25), unlocked: (plantCount || 0) >= 25 },
        { id: 'first-water', name: 'Pierwsza Kropla', description: 'Podlej roślinę po raz pierwszy', icon: '💧', category: 'watering', target: 1, progress: Math.min(wateringCount || 0, 1), unlocked: (wateringCount || 0) >= 1 },
        { id: 'water-10', name: 'Deszczyk', description: 'Podlej rośliny 10 razy', icon: '🌧️', category: 'watering', target: 10, progress: Math.min(wateringCount || 0, 10), unlocked: (wateringCount || 0) >= 10 },
        { id: 'water-50', name: 'Wodospad', description: 'Podlej rośliny 50 razy', icon: '🌊', category: 'watering', target: 50, progress: Math.min(wateringCount || 0, 50), unlocked: (wateringCount || 0) >= 50 },
        { id: 'streak-3', name: 'Systematyk', description: 'Podlewaj 3 dni z rzędu', icon: '🔥', category: 'watering', target: 3, progress: Math.min(streak, 3), unlocked: streak >= 3 },
        { id: 'streak-7', name: 'Tydzień Perfekcji', description: 'Podlewaj 7 dni z rzędu', icon: '⭐', category: 'watering', target: 7, progress: Math.min(streak, 7), unlocked: streak >= 7 },
        { id: 'streak-30', name: 'Mistrz Pielęgnacji', description: 'Podlewaj 30 dni z rzędu', icon: '🏆', category: 'watering', target: 30, progress: Math.min(streak, 30), unlocked: streak >= 30 },
        { id: 'journal-1', name: 'Kronikarz', description: 'Dodaj pierwszy wpis do dziennika', icon: '📝', category: 'journal', target: 1, progress: Math.min(journalCount || 0, 1), unlocked: (journalCount || 0) >= 1 },
        { id: 'journal-10', name: 'Dokumentalista', description: 'Dodaj 10 wpisów do dziennika', icon: '📖', category: 'journal', target: 10, progress: Math.min(journalCount || 0, 10), unlocked: (journalCount || 0) >= 10 },
      ];

      setAchievements(defs);
    } catch (err) {
      console.error('Error loading achievements:', err);
    } finally {
      setLoading(false);
    }
  }

  return { achievements, loading, refetch: loadAchievements };
}

function calculateStreak(dates: string[]): number {
  if (!dates.length) return 0;

  const uniqueDays = [...new Set(dates.map(d => new Date(d).toISOString().split('T')[0]))].sort().reverse();
  
  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const curr = new Date(uniqueDays[i - 1]);
    const prev = new Date(uniqueDays[i]);
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
