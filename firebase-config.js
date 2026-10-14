// Configuración de Firebase para sincronizar los datos y compartir grupos.
// La sacás de: Consola de Firebase → Configuración del proyecto → Tus apps → App web.
// Estos valores no son secretos: la seguridad la dan las reglas de firestore.rules.
// Si lo dejás en null, Bolsillo funciona igual pero guarda todo solo en el navegador.
// (Se usa "self" para que también lo lea el service worker de las notificaciones).
self.BOLSILLO_FIREBASE = {
  apiKey: "AIzaSyAoF9yA7js-A4VRo1Mgbz0qJeNnwT0FmQE",
  authDomain: "bolsillo-eea53.firebaseapp.com",
  projectId: "bolsillo-eea53",
  storageBucket: "bolsillo-eea53.firebasestorage.app",
  messagingSenderId: "773713105784",
  appId: "1:773713105784:web:9124003f3f82ee3f1fae8d"
};

// Clave para notificaciones (opcional). La sacás de: Configuración del proyecto →
// Cloud Messaging → Certificados push web → Generar par de claves. Es pública.
self.BOLSILLO_VAPID = "BHRMyF4Psfe0OSJqVoI7UMp6Ev6d1azy4fu4RAZXVd1iqnQs_SMrOMk6H4yJxQJvItg40HwPnwcIVVjMhyQ9GtA";
