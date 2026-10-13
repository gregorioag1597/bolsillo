// Configuración de Firebase para sincronizar los datos y compartir grupos.
// La sacás de: Consola de Firebase → Configuración del proyecto → Tus apps → App web.
// Estos valores no son secretos: la seguridad la dan las reglas de firestore.rules.
// Si lo dejás en null, Bolsillo funciona igual pero guarda todo solo en el navegador.
window.BOLSILLO_FIREBASE = null;

/* Ejemplo:
window.BOLSILLO_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  appId: "1:1234567890:web:abcdef"
};
*/
