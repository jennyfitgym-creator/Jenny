const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { title, body, topic, secret } = req.body;

    if (secret !== 'JENNYFIT_ADMIN_2026') {
        return res.status(401).json({ error: 'No autorizado' });
    }

    if (!title || !body || !topic) {
        return res.status(400).json({ error: 'Faltan datos.' });
    }

    try {
        const message = {
            notification: { 
                title: title, 
                body: body 
            },
            // AQUÍ LE DECIMOS A FIREBASE QUE USE TU ICONO OFICIAL
            webpush: {
                notification: {
                    icon: 'https://jenny-one-green.vercel.app/Iconojennyfit.jpg',
                    badge: 'https://jenny-one-green.vercel.app/Iconojennyfit.jpg'
                }
            },
            topic: topic
        };
        
        const response = await admin.messaging().send(message);
        return res.status(200).json({ success: true, messageId: response });
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        return res.status(500).json({ error: error.message });
    }
};
