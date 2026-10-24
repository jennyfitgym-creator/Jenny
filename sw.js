// sw.js - Service Worker de Jennyfit para Firebase Push Notifications
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDT0lieijjz2sxbu6PqaLmkrQ_HsDadK5M",
  authDomain: "jennyfitapp.firebaseapp.com",
  projectId: "jennyfitapp",
  storageBucket: "jennyfitapp.firebasestorage.app",
  messagingSenderId: "492885885548",
  appId: "1:492885885548:web:64d40ccffe8dad340f4e49"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const titulo = payload?.notification?.title || payload?.data?.title || "💧 ¡Hora de Hidratarte en Jennyfit!";
  const cuerpo = payload?.notification?.body || payload?.data?.body || "Toma un vaso de agua para mantener tus músculos y fuerza al 100%.";
  
  const opciones = {
    body: cuerpo,
    icon: 'Iconojennyfit.jpg',
    badge: 'Iconojennyfit.jpg',
    vibrate: [300, 120, 300, 120, 400],
    tag: 'jennyfit-agua-push',
    renotify: true,
    requireInteraction: true
  };

  self.registration.showNotification(titulo, opciones);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
