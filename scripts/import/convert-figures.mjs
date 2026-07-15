// Convierte las preguntas CON FIGURA (dependsOnFigure) a ítems del banco,
// adjuntando la imagen extraída (extract_figures_source.py). Solo importa las que:
//   · tienen figura extraída en el manifiesto (con_figura),
//   · no están en el BLOCKLIST (recortes basura detectados en la revisión visual),
//   · tienen materia clasificada, clave válida, ≥2 opciones y no están corruptas.
// IDs con sufijo "fig" (p. ej. fis-hqffig-0001) → no colisionan con los de texto.
//
// Uso: node scripts/import/convert-figures.mjs <parsed.json> <src> <label> <manifest.json> <out.json>

import { readFileSync, writeFileSync } from 'node:fs';
import { normalize, CORRUPT_RE, looksCorrupt } from './sources/normalize.mjs';

const [, , inPath, src, label, manifestPath, outPath] = process.argv;
if (!inPath || !src || !label || !manifestPath || !outPath) {
  console.error('Uso: node convert-figures.mjs <parsed.json> <src> <label> <manifest.json> <out.json>');
  process.exit(1);
}

const parsed = JSON.parse(readFileSync(inPath, 'utf8'));
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// Mapa stemKey(50) -> imagen, solo de las figuras realmente extraídas.
const imgByKey = new Map();
for (const e of manifest) if (e.status === 'con_figura' && e.image) imgByKey.set(e.stemKey, e.image);

// Recortes basura detectados en la revisión visual de las hojas de contacto
// (caja vacía, figura recargada con texto filtrado). Clave: `<materia>#<numero>`.
const BLOCKLIST = new Set(['fisica#5', 'quimica#76']);

const SUBJ3 = { biologia: 'bio', quimica: 'qui', fisica: 'fis', matematica: 'mat', comprension_textos: 'com' };
const PRACTICO_RE =
  /problema|mendel|herencia|genealog|cruzamiento|c[aá]lculo|ph|buffer|soluc|diluc|molarid|numeric|cinem|din[aá]m|hidro|gases|electr|est[aá]tica|energ|vector|estequiom|coligat|redox|equilibr|ecuacion|pasaje|logaritm|funci[oó]n/i;
const ALTA_RE =
  /membrana|transporte|mitocondri|dogma|transcrip|traduc|duplicac|mendel|herencia|sangu|nefr|cardiac|card[ií]aco|respirat|hematosis|nervios|buffer|ph|grupo|hibrid|solucion|coligat|cinem|din[aá]m|newton|energ|gases|ohm|electr/i;

const items = [];
const excluded = [];
const seenStems = new Set();
const seq = {};

function excludeReason(q, image) {
  if (!q.dependsOnFigure) return 'no es pregunta con figura';
  if (!image) return 'figura no extraída';
  if (BLOCKLIST.has(`${q.subject}#${q.number}`)) return 'figura descartada en revisión visual';
  const raw = q.stem + ' ' + q.options.map((o) => o.text).join(' ');
  if (CORRUPT_RE.test(raw)) return 'corrupto (símbolos ilegibles)';
  if (looksCorrupt(normalize(q.stem))) return 'texto corrupto (encoding roto)';
  if (q.subject === 'sin_clasificar' || !SUBJ3[q.subject]) return 'sin materia clasificada (revisar)';
  if (q.kind !== 'single_choice' && q.kind !== 'multiple_response') return `tipo ${q.kind}`;
  if (!q.correct) return 'sin clave de respuesta';
  if (q.options.length < 2) return 'menos de 2 opciones';
  const ids = new Set(q.options.map((o) => o.id));
  const need = Array.isArray(q.correct) ? q.correct : [q.correct];
  if (!need.every((c) => ids.has(c))) return `la opción correcta (${need}) no está entre las parseadas`;
  return null;
}

for (const q of parsed) {
  const image = imgByKey.get((q.stem || '').slice(0, 50));
  const reason = excludeReason(q, image);
  if (reason) {
    if (q.dependsOnFigure) excluded.push({ number: q.number, subject: q.subject, reason });
    continue;
  }
  const sig = normalize(q.stem).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 90);
  if (seenStems.has(sig)) { excluded.push({ number: q.number, subject: q.subject, reason: 'duplicado' }); continue; }
  seenStems.add(sig);

  const subj3 = SUBJ3[q.subject];
  seq[subj3] = (seq[subj3] || 0) + 1;
  const id = `${subj3}-${src}fig-${String(seq[subj3]).padStart(4, '0')}`;
  const track = PRACTICO_RE.test(q.topic + ' ' + q.block) ? 'practico' : 'teorico';
  const frequency = ALTA_RE.test(q.topic + ' ' + q.block) ? 'alta' : 'media';
  const type = q.kind === 'multiple_response' ? 'multiple_response' : 'single_choice';
  const correctSet = new Set(Array.isArray(q.correct) ? q.correct : [q.correct]);
  const choices = q.options.map((o) => ({ id: o.id, text: normalize(o.text), correct: correctSet.has(o.id) }));
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
    media: [{ kind: 'image', src: image }],
    choices,
    explanation,
    source: 'original',
    version: 1,
    status: 'active',
    authorNote: `Importado de ${label} (nº ${q.number}, con figura, tema "${q.topic}").`,
  });
}

writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf8');
const invPath = outPath.replace(/\.json$/, '.inventory.json');
const byReason = {};
for (const e of excluded) byReason[e.reason] = (byReason[e.reason] || 0) + 1;
writeFileSync(invPath, JSON.stringify({ importados: items.length, excluidos: excluded.length, porMotivo: byReason, detalle: excluded }, null, 2), 'utf8');
console.log(JSON.stringify({ fuente: label, importadosConFigura: items.length, excluidos: excluded.length, porMotivo: byReason }, null, 2));
console.log(`\nEscrito: ${outPath}`);
