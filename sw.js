importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDT0lieijjz2sxbu6PqaLmkrQ_HsDadK5M",
  authDomain: "jennyfitapp.firebaseapp.com",
  projectId: "jennyfitapp",
  storageBucket: "jennyfitapp.firebasestorage.app",
  messagingSenderId: "492885885548",
  appId: "1:492885885548:web:64d40ccffe8dad340f4e49"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Mensaje recibido:', payload);
    
    // Leemos los datos enviados por el backend
    const title = payload.data?.title || 'Jennyfit';
    const body = payload.data?.body || '';
    const icon = payload.data?.icon || '/Iconojennyfit.jpg';

    const notificationOptions = {
        body: body,
        icon: icon,
        badge: icon,
        vibrate: [200, 100, 200]
    };

    // Mostramos SOLO UNA notificación
    self.registration.showNotification(title, notificationOptions);
});
