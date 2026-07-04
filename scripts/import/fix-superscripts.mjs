// Corrige la notación científica aplanada por pdftotext en los bancos importados.
// pdftotext pierde el superíndice y el signo ×, dejando "3,01 .1023" en vez de
// "3,01×10²³". Como los decimales usan coma (es-AR), el "." antes de "10" es
// inequívocamente multiplicación, así que la conversión es segura.
//
// Uso: node scripts/import/fix-superscripts.mjs <banco1.json> [banco2.json ...]

import { readFileSync, writeFileSync } from 'node:fs';

const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const toSuper = (s) => [...s].map((c) => SUP[c] ?? c).join('');

// coef (con coma decimal opcional) · 10 exponente(1-3 dígitos, signo opcional)
const SCI_RE = /(\d+(?:,\d+)?)\s*\.\s*10(-?\d{1,3})(?!\d)/g;

function fixText(t) {
  if (typeof t !== 'string') return t;
  return t.replace(SCI_RE, (_, coef, exp) => `${coef}×10${toSuper(exp)}`);
}

let totalItems = 0;
let totalReplaced = 0;

for (const path of process.argv.slice(2)) {
  const items = JSON.parse(readFileSync(path, 'utf8'));
  let replaced = 0;
  for (const it of items) {
    const before = JSON.stringify(it);
    it.stem = fixText(it.stem);
    it.explanation = fixText(it.explanation);
    if (Array.isArray(it.choices))
      for (const c of it.choices) c.text = fixText(c.text);
    if (JSON.stringify(it) !== before) replaced++;
  }
  writeFileSync(path, JSON.stringify(items, null, 2), 'utf8');
  totalItems += items.length;
  totalReplaced += replaced;
  console.log(`${path}: ${replaced}/${items.length} ítems con notación corregida`);
}
console.log(`\nTotal: ${totalReplaced}/${totalItems} ítems modificados`);
