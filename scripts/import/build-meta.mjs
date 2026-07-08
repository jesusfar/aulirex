// Genera src/content/bank-meta.json: taxonomía (bloques→temas) y conteo por
// materia del banco importado. Es pequeño (~pocos KB) y se importa de forma
// sincrónica para poblar los filtros SIN cargar los bancos pesados (que se
// cargan lazy por materia, code-splitting).
//
// Uso: node scripts/import/build-meta.mjs

import { readFileSync, writeFileSync } from 'node:fs';

const subjects = ['biologia', 'fisica', 'quimica'];
const meta = {};
for (const s of subjects) {
  const items = JSON.parse(
    readFileSync(`src/content/items/${s}/banco-${s}.json`, 'utf8'),
  ).filter((i) => i.status === 'active'); // los deprecados no cuentan ni filtran
  const blocks = {};
  for (const i of items) {
    (blocks[i.block] ??= new Set()).add(i.topic);
  }
  meta[s] = {
    count: items.length,
    blocks: Object.fromEntries(
      Object.entries(blocks).map(([b, t]) => [b, [...t]]),
    ),
  };
}
writeFileSync('src/content/bank-meta.json', JSON.stringify(meta), 'utf8');
console.log(
  'bank-meta.json:',
  subjects.map((s) => `${s}=${meta[s].count}`).join(' '),
);
