import { supabase } from '@/integrations/supabase/client';

export interface PlantNotification {
  plantId: string;
  plantName: string;
  type: 'watering' | 'fertilization';
  scheduledDate: Date;
}

export class NotificationScheduler {
  private static checkAndSchedule() {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    if (!('serviceWorker' in navigator)) {
      return;
    }

    // Schedule check every hour
    setInterval(() => {
      this.checkDueNotifications();
    }, 60 * 60 * 1000); // 1 hour

    // Initial check
    this.checkDueNotifications();
  }

  private static async checkDueNotifications() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Check watering schedule
      const { data: plants } = await supabase
        .from('plant_collection')
        .select('*')
        .eq('user_id', user.id);

      if (plants) {
        for (const plant of plants) {
          if (plant.next_watering_at) {
            const wateringDate = new Date(plant.next_watering_at);
            const hoursDiff = (wateringDate.getTime() - now.getTime()) / (1000 * 60 * 60);

            // Notify 24 hours before and on the day
            if (hoursDiff <= 24 && hoursDiff > 0) {
              this.sendNotification({
                title: '💧 Przypomnienie o Podlewaniu',
                body: `Czas podlać ${plant.plant_name}!`,
                tag: `watering-${plant.id}`,
                data: { plantId: plant.id, type: 'watering' }
              });
            }
          }
        }
      }

      // Check fertilization schedule
      const { data: fertilizations } = await supabase
        .from('fertilization_schedule')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .lte('scheduled_date', tomorrow.toISOString());

      if (fertilizations) {
        for (const fert of fertilizations) {
          const fertDate = new Date(fert.scheduled_date);
          const hoursDiff = (fertDate.getTime() - now.getTime()) / (1000 * 60 * 60);

          if (hoursDiff <= 24 && hoursDiff > 0) {
            this.sendNotification({
              title: '🌿 Przypomnienie o Nawożeniu',
              body: `Czas nawozić ${fert.plant_name}!`,
              tag: `fertilization-${fert.id}`,
              data: { plantId: fert.plant_id, type: 'fertilization' }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error checking notifications:', error);
    }
  }

  private static async sendNotification(options: {
    title: string;
    body: string;
    tag: string;
    data?: any;
  }) {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      const registration = await navigator.serviceWorker.ready;
      
      registration.showNotification(options.title, {
        body: options.body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: options.tag,
        data: options.data,
        requireInteraction: false
      });
    }
  }

  static initialize() {
    if (typeof window === 'undefined') return;

    // Request notification permission if not already granted
    if ('Notification' in window && Notification.permission === 'default') {
      // Don't auto-request, let user do it from Install page
      return;
    }

    if (Notification.permission === 'granted') {
      this.checkAndSchedule();
    }
  }

  static async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      this.checkAndSchedule();
    }

    return permission;
  }
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  NotificationScheduler.initialize();
}
