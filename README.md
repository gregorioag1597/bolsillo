# Bolsillo

App de finanzas personales y gastos compartidos, pensada para el celular.

- **Anotá gastos hablando**: tocá el micrófono y decí *"2 lucas de nafta y 3.800 de farmacia con Mercado Pago"*. Bolsillo saca el monto, la categoría, la cuenta y la fecha.
- **Importá extractos** de Mercado Pago y de tus bancos (CSV o Excel). Detecta las columnas solo, no duplica movimientos y concilia con lo que anotaste a mano.
- **Grupos para dividir gastos** (como Tricount): viajes, casas compartidas, salidas. Mandás el link, cada uno anota lo que paga, y los saldos se actualizan en vivo en todos los celulares. Tus amigos no necesitan crear cuenta.
- **Configurable**: tu moneda, tus cuentas, tus categorías y las palabras que las detectan. Las reglas aprenden cuando corregís una categoría.
- **Se instala en el celular** como una app y funciona sin conexión.
- **Tus datos son tuyos**: los gastos personales solo los ves vos; exportás todo a CSV cuando quieras.

## Cómo funciona

Es una página web estática (HTML, CSS y JavaScript, sin servidor propio). Para sincronizar usa [Firebase](https://firebase.google.com/) (gratis para uso personal y entre amigos):

| Dato | Dónde se guarda | Quién lo ve |
|---|---|---|
| Tus movimientos, cuentas y categorías | `users/<tu-id>/docs` | Solo vos |
| Un grupo y sus gastos | `groups/<código>` | Quien tenga el link del grupo |

Las reglas de [`firestore.rules`](firestore.rules) hacen cumplir eso. Los códigos de grupo son largos y al azar, y nadie puede listar los grupos existentes.

Sin Firebase configurado, Bolsillo funciona igual pero guarda todo solo en el navegador.

## Publicar tu propia copia

### 1. Crear el proyecto de Firebase

1. Entrá a la [consola de Firebase](https://console.firebase.google.com/) y creá un proyecto (podés desactivar Google Analytics).
2. **Authentication → Comenzar → Método de acceso**: activá **Anónimo** y **Google**.
3. **Firestore Database → Crear base de datos**: elegí una ubicación (por ejemplo `southamerica-east1`) y modo **producción**.
4. En **Firestore → Reglas**, pegá el contenido de [`firestore.rules`](firestore.rules) y publicá.
5. En **Configuración del proyecto → Tus apps**, agregá una **app web** y copiá el objeto `firebaseConfig`.
6. Pegalo en [`firebase-config.js`](firebase-config.js):

```js
window.BOLSILLO_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  appId: "1:1234567890:web:abcdef"
};
```

Estos valores no son secretos (viajan a todos los navegadores); lo que protege los datos son las reglas.

### 2. Publicar en GitHub Pages

1. Subí esta carpeta a un repositorio de GitHub.
2. En el repositorio: **Settings → Pages → Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En unos minutos queda en `https://<tu-usuario>.github.io/<repositorio>/`.
4. En Firebase, **Authentication → Configuración → Dominios autorizados**, agregá `<tu-usuario>.github.io` (para que funcione el inicio de sesión con Google).

## Adaptarla

El código de la app está en [`src/app.html`](src/app.html). Después de cambiarlo, generá `index.html`:

```bash
node build.mjs
```

Para probarla en tu computadora:

```bash
node dev-server.mjs
```

y abrí `http://localhost:5173`.

Lugares útiles para tocar en `src/app.html`:

- `PRESET_ACCOUNTS`: los bancos y billeteras que se sugieren al empezar, con sus otros nombres (`"mp"` para Mercado Pago).
- `DEFAULT_CATS`: las categorías iniciales y sus palabras clave.
- `CURRENCIES`: las monedas disponibles.
- `normAmounts`: cómo se interpretan montos dichos en voz alta ("luca", "palo", "mil quinientos").

## Límites conocidos

- Mercado Pago y los bancos se cargan importando extractos; todavía no hay conexión automática.
- Los resúmenes en PDF no se pueden leer.
- El dictado por voz usa el reconocimiento del navegador: anda en Chrome (Android y computadora) y Safari. En otros navegadores podés usar el micrófono del teclado.
- En los grupos, los gastos se dividen en partes iguales entre las personas que elijas.

## Licencia

MIT. Ver [LICENSE](LICENSE).
