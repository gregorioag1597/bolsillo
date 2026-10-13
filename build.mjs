// Arma index.html (la página que se publica) a partir de src/app.html.
// Uso: node build.mjs
import fs from 'node:fs';

const app = fs.readFileSync(new URL('./src/app.html', import.meta.url), 'utf8');
const cut = app.indexOf('<div class="app">');
const head = app.slice(0, cut).trim();
const body = app.slice(cut).trim();

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Finanzas personales y gastos compartidos: anotá gastos hablando, importá extractos y dividí cuentas con amigos.">
<meta name="theme-color" content="#0e6a5b">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${head}
<script src="firebase-config.js"></script>
<script>if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js'));</script>
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(new URL('./index.html', import.meta.url), html);
console.log('index.html listo');
