// Mezcla archivos de STAGING (por fuente, posiblemente multi-materia) dentro de
// los bancos vivos por materia. Deduplica por enunciado normalizado contra el
// banco vivo Y contra lo ya mezclado en esta corrida. Verifica que ningún ID
// nuevo colisione con uno existente. Por defecto es DRY-RUN (no escribe): informa
// qué se agregaría. Con --apply, anexa al final de cada banco (no renumera lo
// existente) y deja intactos los ítems previos.
//
// Uso: node scripts/import/merge-bank.mjs <staging1.json> [staging2.json ...] [--apply]

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { normalize } from './sources/normalize.mjs';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const stagingPaths = args.filter((a) => !a.startsWith('--'));
if (!stagingPaths.length) {
  console.error('Uso: node merge-bank.mjs <staging.json> [...] [--apply]');
  process.exit(1);
}

const bankPath = (s) => `src/modules/ingreso-medicina/content/items/${s}/banco-${s}.json`;
const sig = (stem) => normalize(stem).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 90);

// Cargar staging y agrupar por materia.
const incoming = {};
for (const p of stagingPaths) {
  for (const it of JSON.parse(readFileSync(p, 'utf8'))) {
    (incoming[it.subject] ??= []).push(it);
  }
}

const report = {};
const writes = [];
for (const [subject, newItems] of Object.entries(incoming)) {
  const path = bankPath(subject);
  const live = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : [];
  const liveSigs = new Set(live.map((i) => sig(i.stem)));
  const liveIds = new Set(live.map((i) => i.id));

  const toAdd = [];
  const skipped = { dup: 0, idCollision: 0 };
  const seenNew = new Set();
  for (const it of newItems) {
    const s = sig(it.stem);
    if (liveSigs.has(s) || seenNew.has(s)) { skipped.dup++; continue; }
    if (liveIds.has(it.id)) { skipped.idCollision++; continue; }
    seenNew.add(s);
    toAdd.push(it);
  }

  report[subject] = { vivos: live.length, entrantes: newItems.length, aAgregar: toAdd.length, ...skipped, totalTras: live.length + toAdd.length };
  if (apply && toAdd.length) writes.push({ path, data: [...live, ...toAdd] });
}

console.log(JSON.stringify({ modo: apply ? 'APPLY' : 'DRY-RUN', porMateria: report }, null, 2));

if (apply) {
  for (const w of writes) {
    writeFileSync(w.path, JSON.stringify(w.data, null, 2) + '\n', 'utf8');
    console.log(`Escrito: ${w.path} (${w.data.length} ítems)`);
  }
  if (!writes.length) console.log('Nada que escribir (todo era duplicado).');
  console.log('\nRecordá regenerar la taxonomía:  node scripts/import/build-meta.mjs');
} else {
  console.log('\nDRY-RUN: no se escribió nada. Repetí con --apply para mezclar.');
}
