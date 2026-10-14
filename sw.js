// Permite abrir Bolsillo sin conexión (por ejemplo, de viaje), instalarlo en el celular
// y recibir las notificaciones para aprobar gastos aunque la app esté cerrada.
const CACHE = 'bolsillo-v2';
const ASSETS = ['./', 'index.html', 'firebase-config.js', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'];

// Notificación que manda el script de Gmail (vía Firebase Cloud Messaging): título y texto vienen en "data".
self.addEventListener('push', e => {
  let msg = {};
  try { msg = e.data ? e.data.json() : {}; } catch (err) { msg = { data: { body: e.data && e.data.text() } }; }
  const d = msg.data || msg.notification || {};
  e.waitUntil(self.registration.showNotification(d.title || 'Bolsillo', {
    body: d.body || 'Tenés un gasto para aprobar.',
    icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: d.tag || 'bolsillo-aprobar',
  }));
});

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Al tocar la notificación se abre (o se trae al frente) la pantalla para aprobar.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL('./#revisar', self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope)) { w.navigate(url).catch(() => {}); return w.focus(); }
    return clients.openWindow(url);
  }));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Librerías y fuentes externas: primero la copia guardada.
  if (/(^|\.)gstatic\.com$|fonts\.googleapis\.com$|cdnjs\.cloudflare\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  // Archivos propios: primero la red, y si no hay conexión, la copia guardada.
  e.respondWith(fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
