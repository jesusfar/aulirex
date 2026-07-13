// Desempaqueta el "Selector VHS (standalone).html" (formato __bundler) a
// archivos estáticos editables en public/vhs/. Replica lo que hace el bootstrap
// del artefacto: decodifica cada asset (base64 + gunzip si compressed), lo
// escribe como archivo, y reemplaza en el template las referencias UUID por la
// ruta del archivo. Uso: node scripts/unbundle-vhs.mjs "<ruta-al-html>"
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const INPUT =
  process.argv[2] ||
  'C:/Users/sofia/OneDrive/Desktop/Selector VHS (standalone).html';
const OUT = resolve('public/vhs');
const ASSETS = resolve(OUT, 'assets');

const EXT = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp',
  'image/gif': 'gif', 'image/svg+xml': 'svg', 'text/javascript': 'js',
  'application/javascript': 'js', 'text/css': 'css', 'font/woff2': 'woff2',
  'font/woff': 'woff', 'application/json': 'json', 'audio/mpeg': 'mp3',
  'audio/wav': 'wav', 'video/mp4': 'mp4',
};

// Extrae el textContent de <script type="__bundler/<kind>"> ... </script>.
// El contenido interno tiene sus </script> escapados como <\/script>, así que
// cortar en el primer </script> real es seguro.
function extractScript(html, kind) {
  // Exige el tag real <script ... type="__bundler/<kind>"> (no el string
  // 'script[type="..."]' que aparece en el bootstrap).
  const re = new RegExp(`<script[^>]*type="__bundler/${kind}"[^>]*>`, 'i');
  const m = re.exec(html);
  if (!m) return null;
  const gt = m.index + m[0].length;
  const close = html.indexOf('</script>', gt);
  return html.slice(gt, close);
}

const html = readFileSync(INPUT, 'utf8');
const manifest = JSON.parse(extractScript(html, 'manifest'));
let template = JSON.parse(extractScript(html, 'template'));
const extRaw = extractScript(html, 'ext_resources');
const extResources = extRaw ? JSON.parse(extRaw) : [];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(ASSETS, { recursive: true });

const pathFor = {}; // uuid -> ruta relativa (assets/<uuid>.<ext>)
let bytesTotal = 0;
for (const [uuid, entry] of Object.entries(manifest)) {
  let buf = Buffer.from(entry.data, 'base64');
  if (entry.compressed) buf = gunzipSync(buf);
  const ext = EXT[entry.mime] || 'bin';
  const rel = `assets/${uuid}.${ext}`;
  writeFileSync(resolve(OUT, rel), buf);
  pathFor[uuid] = rel;
  bytesTotal += buf.length;
}

// Reemplaza cada UUID en el template por su ruta de archivo (igual que el
// bootstrap con blobUrls). Orden por longitud desc por si algún uuid es
// prefijo de otro (no debería, pero es barato).
for (const uuid of Object.keys(pathFor).sort((a, b) => b.length - a.length)) {
  template = template.split(uuid).join(pathFor[uuid]);
}

// Reconstruye window.__resources (id -> ruta) desde ext_resources.
const resourceMap = {};
for (const e of extResources) if (pathFor[e.uuid]) resourceMap[e.id] = pathFor[e.uuid];

// Limpia integrity/crossorigin (como el bootstrap) e inyecta __resources tras <head>.
template = template
  .replace(/\s+integrity="[^"]*"/gi, '')
  .replace(/\s+crossorigin="[^"]*"/gi, '');
const resourceScript =
  '<script>window.__resources = ' +
  JSON.stringify(resourceMap).replace(/<\//g, '<\\/') +
  ';</' + 'script>';
const headOpen = template.match(/<head[^>]*>/i);
if (headOpen) {
  const i = headOpen.index + headOpen[0].length;
  template = template.slice(0, i) + resourceScript + template.slice(i);
}

writeFileSync(resolve(OUT, 'index.html'), template, 'utf8');

const nAssets = Object.keys(pathFor).length;
console.log(`OK: ${nAssets} assets (${(bytesTotal / 1e6).toFixed(2)} MB) → public/vhs/assets`);
console.log(`    index.html (${(template.length / 1024).toFixed(0)} KB) → public/vhs/index.html`);
console.log(`    __resources: ${Object.keys(resourceMap).length} entradas`);
