// Convierte el JSON de parse-source.mjs en ítems tipados del banco, a un archivo
// de STAGING por fuente (no toca el banco vivo). Cada ítem lleva:
//   · id namespaced  <subj3>-<src>-NNNN  (no colisiona con los -imp- existentes)
//   · subject/block/topic por pregunta (clasificación por contenido)
//   · explicación real (de la resolución) si la fuente la trae
//   · authorNote con procedencia (fuente + nº + tema) → trazable/auditable
// Genera además <out>.inventory.json con lo NO importado y el motivo.
//
// Uso: node scripts/import/convert-source.mjs <parsed.json> <src> <label> <out.json>
//   <src>   etiqueta corta de namespace (caj, ares, hq, tp, qo, ...)
//   <label> nombre legible de la fuente para authorNote ("Cajal — Examen N°1")

import { readFileSync, writeFileSync } from 'node:fs';
import { normalize, CORRUPT_RE, looksCorrupt } from './sources/normalize.mjs';

const [, , inPath, src, label, outPath] = process.argv;
if (!inPath || !src || !label || !outPath) {
  console.error('Uso: node convert-source.mjs <parsed.json> <src> <label> <out.json>');
  process.exit(1);
}

const parsed = JSON.parse(readFileSync(inPath, 'utf8'));

const SUBJ3 = { biologia: 'bio', quimica: 'qui', fisica: 'fis', matematica: 'mat', comprension_textos: 'com' };
const PRACTICO_RE =
  /problema|mendel|herencia|genealog|cruzamiento|c[aá]lculo|ph|buffer|soluc|diluc|molarid|numeric|cinem|din[aá]m|hidro|gases|electr|est[aá]tica|energ|vector|estequiom|coligat|redox|equilibr|ecuacion|pasaje|logaritm|funci[oó]n/i;
const ALTA_RE =
  /membrana|transporte|mitocondri|dogma|transcrip|traduc|duplicac|mendel|herencia|sangu|nefr|cardiac|card[ií]aco|respirat|hematosis|nervios|buffer|ph|grupo|hibrid|solucion|coligat|cinem|din[aá]m|newton|energ|gases|ohm|electr/i;

const items = [];
const excluded = [];
const seenStems = new Set();
const seq = {}; // secuencia por materia

function excludeReason(q) {
  const raw = q.stem + ' ' + q.options.map((o) => o.text).join(' ');
  if (CORRUPT_RE.test(raw)) return 'corrupto (símbolos ilegibles)';
  // Sobre el texto NORMALIZADO (el que se guarda): así detecta la corrupción que
  // solo se hace evidente tras normalizar.
  if (looksCorrupt(normalize(q.stem))) return 'texto corrupto (encoding roto, tokens sueltos)';
  if (q.subject === 'sin_clasificar' || !SUBJ3[q.subject]) return 'sin materia clasificada (revisar)';
  if (q.kind !== 'single_choice' && q.kind !== 'multiple_response')
    return `tipo ${q.kind} (requiere conversión estructural)`;
  if (q.dependsOnFigure) return 'depende de figura (diferida a fase de imágenes)';
  if (!q.correct) return 'sin clave de respuesta';
  if (q.options.length < 2) return 'menos de 2 opciones parseadas';
  const ids = new Set(q.options.map((o) => o.id));
  const need = Array.isArray(q.correct) ? q.correct : [q.correct];
  if (!need.every((c) => ids.has(c))) return `la opción correcta (${need}) no está entre las parseadas`;
  // La opción CORRECTA debe ser legible: si el texto quedó degradado por encoding
  // roto (p. ej. "· ⁵V" con la notación científica perdida) no sirve importarla.
  const needSet = new Set(need);
  for (const o of q.options) {
    if (!needSet.has(o.id)) continue;
    const alnum = (o.text.match(/[A-Za-z0-9]/g) || []).length;
    if (alnum < 3) return 'opción correcta ilegible (texto degradado)';
  }
  return null;
}

for (const q of parsed) {
  const reason = excludeReason(q);
  if (reason) {
    excluded.push({ number: q.number, subject: q.subject, topic: q.topic, kind: q.kind, reason });
    continue;
  }
  const sig = normalize(q.stem).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 90);
  if (seenStems.has(sig)) {
    excluded.push({ number: q.number, subject: q.subject, topic: q.topic, kind: q.kind, reason: 'duplicado (dentro de la fuente)' });
    continue;
  }
  seenStems.add(sig);

  const subj3 = SUBJ3[q.subject];
  seq[subj3] = (seq[subj3] || 0) + 1;
  const id = `${subj3}-${src}-${String(seq[subj3]).padStart(4, '0')}`;
  const track = PRACTICO_RE.test(q.topic + ' ' + q.block) ? 'practico' : 'teorico';
  const frequency = ALTA_RE.test(q.topic + ' ' + q.block) ? 'alta' : 'media';
  const type = q.kind === 'multiple_response' ? 'multiple_response' : 'single_choice';

  const correctSet = new Set(Array.isArray(q.correct) ? q.correct : [q.correct]);
  const choices = q.options.map((o) => ({
    id: o.id,
    text: normalize(o.text),
    correct: correctSet.has(o.id),
    ...(o.feedback ? { feedback: normalize(o.feedback) } : {}),
  }));
  const correctTexts = choices.filter((c) => c.correct).map((c) => `${c.id}) ${c.text}`).join(' · ');
  const explanation = q.explanation
    ? `Respuesta correcta: ${correctTexts}. ${normalize(q.explanation)}`.trim()
    : `Respuesta correcta: ${correctTexts}.`;

  items.push({
    id,
    institutions: ['UNC'],
    subject: q.subject,
    block: q.block,
    topic: q.topic,
    track,
    type,
    frequency,
    difficulty: 2,
    stem: normalize(q.stem),
    choices,
    explanation,
    source: 'original',
    version: 1,
    status: 'active',
    authorNote: `Importado de ${label} (nº ${q.number}, tema "${q.topic}").`,
  });
}

writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf8');
const invPath = outPath.replace(/\.json$/, '.inventory.json');
const byReason = {};
for (const e of excluded) byReason[e.reason] = (byReason[e.reason] || 0) + 1;
const bySubject = {};
for (const i of items) bySubject[i.subject] = (bySubject[i.subject] || 0) + 1;
writeFileSync(
  invPath,
  JSON.stringify({ importados: items.length, porMateria: bySubject, excluidos: excluded.length, porMotivo: byReason, detalle: excluded }, null, 2),
  'utf8',
);

console.log(JSON.stringify({ fuente: label, importados: items.length, porMateria: bySubject, excluidos: excluded.length, porMotivo: byReason }, null, 2));
console.log(`\nEscrito staging: ${outPath}`);
console.log(`Escrito inventario: ${invPath}`);
