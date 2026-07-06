// Recupera los ítems de V/F en serie y ordering que el import automático dejó
// afuera. Las sub-afirmaciones quedaron dentro del stem lumpeado con marcadores
// "___"; acá se parten y se cruzan con la clave (string V/F o lista de posiciones).
// Emite ítems tipados y los AÑADE al banco de la materia. Correr DESPUÉS de
// convert-to-items.mjs (que genera el banco base).
//
// Uso: node scripts/import/reparse-structured.mjs <parsed.json> <subject> <banco.json>

import { readFileSync, writeFileSync } from 'node:fs';

const [, , inPath, subject, bancoPath] = process.argv;
if (!inPath || !subject || !bancoPath) {
  console.error('Uso: node reparse-structured.mjs <parsed.json> <subject> <banco.json>');
  process.exit(1);
}

// ---- normalize (mismo pipeline que convert-to-items, para texto consistente) ----
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const SUB = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
const CHAR_MAP = new Map(
  [[0xf03d, '='], [0xf02d, '−'], [0xf02b, '+'], [0xf0b4, '×'], [0xf0b7, '•'], [0xf0a7, '•'], [0xf0e0, '→']].map(
    ([cp, v]) => [String.fromCodePoint(cp), v],
  ),
);
const DIATOM = /^(O2|O3|N2|H2|F2|Cl2|Br2|I2|P4|S8)$/;
const FORMULA_TOKEN_RE = /[A-Za-z0-9()]*[A-Za-z][A-Za-z0-9()]*/g;
const NOT_SUBSCRIPT = new Set(['H2A', 'H2B']);
const supExp = (e) => [...e].map((c) => SUP[c] ?? c).join('');
function fixChars(t) {
  for (const [k, v] of CHAR_MAP) t = t.split(k).join(v);
  return t.replace(/[-]/g, ' ').replace(/\s*-{4,}\s*(?:→\s*)?/g, ' → ').replace(/→\s*→/g, '→').replace(/\s{2,}/g, ' ').trim();
}
function fixSci(t) {
  return t
    .replace(/(\d+(?:,\d+)?)\s*\.\s*10(-?\d{1,3})(?!\d)/g, (_, c, e) => `${c}×10${supExp(e)}`)
    .replace(/×\s*10(-?\d{1,3})(?!\d)/g, (_, e) => `×10${supExp(e)}`);
}
function isFormula(tok) {
  if (!/\d/.test(tok)) return false;
  const up = (tok.match(/[A-Z]/g) || []).length;
  return up >= 2 || /\)\d/.test(tok) || /[A-Za-z]\(/.test(tok) || DIATOM.test(tok);
}
function fixFormulas(t) {
  return t.replace(FORMULA_TOKEN_RE, (tok) =>
    !NOT_SUBSCRIPT.has(tok) && isFormula(tok)
      ? tok.replace(/([A-Za-z)])(\d+)/g, (_, p, d) => p + [...d].map((c) => SUB[c] ?? c).join(''))
      : tok,
  );
}
// Quita marcadores de "completar" al inicio (___ , guiones, viñetas) que quedan
// de las opciones tipo "a) ___ Afirmación".
const stripLead = (t) => t.replace(/^[\s_·•–—-]+/, '').trim();
const normalize = (t) => (typeof t === 'string' ? fixFormulas(fixSci(fixChars(stripLead(t)))) : t);

function cleanSection(s) {
  let t = s.split(/\s{2,}/)[0].replace(/^[-–\s]*/, '').replace(/^(gu[ií]a|preguntero)\s+/i, '');
  return t.replace(/\s*[-–]?\s*ejercitaci[oó]n.*$/i, '').replace(/[:;]+$/, '').replace(/\s+\d+$/, '').replace(/\s{2,}/g, ' ').trim() || 'general';
}
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40) || 'general';

const PRACTICO_RE = /problema|mendel|herencia|genealog|c[aá]lculo|ph|buffer|soluc|diluc|molarid|cinem|din[aá]m|hidro|gases|electr|est[aá]tica|energ|vector|estequiom|coligat|redox|equilibr|ecuacion|pasaje|logaritm|funci[oó]n/i;
const ALTA_RE = /membrana|transporte|mitocondri|dogma|transcrip|traduc|duplicac|mendel|herencia|sangu|nefr|cardiac|respirat|hematosis|nervios|buffer|ph|grupo|hibrid|solucion|coligat|cinem|din[aá]m|newton|energ|gases|ohm|electr/i;

// ---- construir sub-afirmaciones desde el stem lumpeado ----
function splitStem(stem) {
  const parts = stem.split(/_{2,}/).map((s) => s.trim()).filter(Boolean);
  return { intro: parts[0] ?? '', subs: parts.slice(1) };
}

const parsed = JSON.parse(readFileSync(inPath, 'utf8'));
const banco = JSON.parse(readFileSync(bancoPath, 'utf8'));
const existingIds = new Set(banco.map((i) => i.id));
const existingStems = new Set(banco.map((i) => normalize(i.stem).toLowerCase().slice(0, 90)));

const prefix = subject.slice(0, 3);
let seq = 0;
const added = [];
const skipped = { vf_desalineado: 0, ordering_desalineado: 0, sin_subitems: 0 };

for (const q of parsed) {
  if (q.kind !== 'true_false_series' && q.kind !== 'ordering') continue;
  const { intro, subs } = splitStem(q.stem);

  const sectionClean = cleanSection(q.section);
  const base = {
    institutions: ['UNC', 'UNSa'],
    subject,
    block: slug(sectionClean),
    topic: slug(sectionClean),
    track: PRACTICO_RE.test(sectionClean) ? 'practico' : 'teorico',
    frequency: ALTA_RE.test(sectionClean) ? 'alta' : 'media',
    difficulty: 2,
    stem: normalize(intro),
    source: 'original',
    version: 1,
    status: 'active',
    authorNote: `Importado del preguntero (nº ${q.number}, sección "${sectionClean}").`,
  };

  let item = null;
  if (q.kind === 'true_false_series') {
    const key = String(q.correct).replace(/\s/g, '').toUpperCase();
    // Formato 1: sub-afirmaciones con "___" en el stem.
    // Formato 2: "a) ___ ..." → quedaron como opciones (≤5 afirmaciones).
    let statements = null;
    if (subs.length === key.length && subs.length >= 2) statements = subs;
    else if ((q.options?.length ?? 0) === key.length && key.length >= 2)
      statements = q.options.map((o) => o.text);
    if (!statements) { skipped.vf_desalineado++; continue; }
    item = {
      ...base,
      type: 'true_false_series',
      statements: statements.map((text, i) => ({ text: normalize(text), correct: key[i] === 'V' })),
      explanation:
        'Clave: ' + statements.map((_, i) => `${i + 1}) ${key[i] === 'V' ? 'V' : 'F'}`).join(' · ') + '.',
    };
  } else {
    if (subs.length < 2) { skipped.sin_subitems++; continue; }
    const positions = String(q.correct).split(',').map((n) => parseInt(n.trim(), 10));
    const ok =
      positions.length === subs.length &&
      positions.every((p) => p >= 1 && p <= subs.length) &&
      new Set(positions).size === positions.length;
    if (!ok) { skipped.ordering_desalineado++; continue; }
    const steps = new Array(subs.length);
    positions.forEach((p, j) => { steps[p - 1] = normalize(subs[j]); });
    item = {
      ...base,
      type: 'ordering',
      steps,
      explanation: 'Orden correcto: ' + steps.map((s, i) => `${i + 1}) ${s}`).join(' → ') + '.',
    };
  }

  const sig = normalize(intro).toLowerCase().slice(0, 90);
  if (existingStems.has(sig)) continue; // dedup contra el banco
  seq += 1;
  let id = `${prefix}-vfo-${String(seq).padStart(4, '0')}`;
  while (existingIds.has(id)) id = `${prefix}-vfo-${String(++seq).padStart(4, '0')}`;
  existingIds.add(id);
  existingStems.add(sig);
  added.push({ id, ...item });
}

writeFileSync(bancoPath, JSON.stringify([...banco, ...added], null, 2), 'utf8');
console.log(JSON.stringify({ subject, recuperados: added.length, porTipo: added.reduce((a, i) => ((a[i.type] = (a[i.type] || 0) + 1), a), {}), descartados: skipped }, null, 2));
