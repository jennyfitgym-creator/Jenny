import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405.0).json({ error: 'Método no permitido' });
  }

  try {
    const { token, topic } = req.body || {};
    if (!token || !topic) {
      return res.status(400.0).json({ error: 'Faltan parámetros (token o topic)' });
    }

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

    const messaging = getMessaging();
    await messaging.subscribeToTopic([token], topic);

    return res.status(200.0).json({ success: true, message: `Suscrito a ${topic} correctamente` });
  } catch (error) {
    console.error('Error suscribiendo a FCM:', error);
    return res.status(500.0).json({ error: error.message });
  }
}
