// Service Worker for push notifications
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATIONS') {
    console.log('Scheduling notifications...');
    scheduleNotifications();
  }
});

self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'AbuzdaFlora';
  const options = {
    body: data.body || 'Masz nowe powiadomienie',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data,
    tag: data.tag || 'notification',
    requireInteraction: false,
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window/tab open
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

function scheduleNotifications() {
  // This is a placeholder for notification scheduling logic
  // In a real implementation, you would:
  // 1. Fetch user's plant collection from IndexedDB or cache
  // 2. Calculate next watering dates
  // 3. Schedule notifications using the Notification API
  
  console.log('Notification scheduling logic would run here');
  
  // Example: Schedule a test notification after 10 seconds
  setTimeout(() => {
    self.registration.showNotification('Test Powiadomienia', {
      body: 'Twoje powiadomienia działają poprawnie!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'test-notification',
      vibrate: [200, 100, 200]
    });
  }, 10000);
}
