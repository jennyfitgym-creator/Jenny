import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

export default async function handler(req, res) {
  try {
    if (!getApps().length) {
      const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
      if (!serviceAccountBase64) {
        throw new Error('Falta la variable de entorno FIREBASE_SERVICE_ACCOUNT_BASE64 en Vercel.');
      }
      const serviceAccountJson = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));
      initializeApp({
        credential: cert(serviceAccountJson)
      });
    }

    const message = {
      notification: {
        title: "💧 ¡Recordatorio de Agua - Jennyfit!",
        body: "Toma un vaso de agua ahora para mantener tus músculos hidratados y rendir al máximo."
      },
      topic: "recordatorio_agua"
    };

    const messaging = getMessaging();
    const response = await messaging.send(message);

    return res.status(200.0).json({ success: true, messageId: response });
  } catch (error) {
    console.error('Error enviando notificación push:', error);
    return res.status(500.0).json({ error: error.message });
  }
}
