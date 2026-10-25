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
    
    const title = payload.data?.title || payload.notification?.title || 'Jennyfit';
    const body = payload.data?.body || payload.notification?.body || '';
    const iconUrl = 'https://jenny-one-green.vercel.app/Iconojennyfit.jpg'; 
    const imageUrl = payload.data?.image || null; 

    const notificationOptions = {
        body: body,
        icon: iconUrl,
        badge: iconUrl,
        image: imageUrl, 
        vibrate: [200, 100, 200]
    };

    self.registration.showNotification(title, notificationOptions);
});
