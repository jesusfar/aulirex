// Convierte el JSON parseado (parse-ejercitacion.mjs) en ítems tipados del banco.
// Importa las preguntas de opción única/múltiple con clave válida; adjunta la
// figura extraída si existe. Genera un inventario (.inventory.json) con lo NO
// importado y el motivo, para que nada quede descartado en silencio.
//
// Uso: node scripts/import/convert-to-items.mjs <parsed.json> <subject> <out.json>

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const [, , inPath, subject, outPath] = process.argv;
if (!inPath || !subject || !outPath) {
  console.error('Uso: node convert-to-items.mjs <parsed.json> <subject> <out.json>');
  process.exit(1);
}

const parsed = JSON.parse(readFileSync(inPath, 'utf8'));

// Manifiesto de figuras extraídas (extract_figures.py): (número|stem) -> imagen.
const manifestPath = new URL(`./manifests/${subject}.json`, import.meta.url);
const figureByStem = new Map();
if (existsSync(manifestPath)) {
  for (const e of JSON.parse(readFileSync(manifestPath, 'utf8'))) {
    if (e.status === 'con_figura' && e.image) {
      figureByStem.set(`${e.number}|${e.stemKey}`, e.image);
    }
  }
}
const figureFor = (q) => figureByStem.get(`${q.number}|${q.stem.slice(0, 50)}`);

// Limpia el nombre de sección crudo del PDF antes de derivar el topic.
function cleanSection(s) {
  let t = s.split(/\s{2,}/)[0]; // corta en la primera doble-espacio
  t = t.replace(/^[-–\s]*/, '');
  t = t.replace(/^(gu[ií]a|preguntero)\s+/i, '');
  t = t.replace(/\s*[-–]\s*ejercitaci[oó]n.*$/i, '');
  t = t.replace(/\s*ejercitaci[oó]n.*$/i, '');
  t = t.replace(/[-]/g, ' ');
  t = t.replace(/[:;]+$/, '').replace(/\s+\d+$/, '').replace(/\s{2,}/g, ' ').trim();
  return t || 'general';
}

function slug(s) {
  return (
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 40) || 'general'
  );
}

// Notación científica aplanada por pdftotext: "3,01 .1023" -> "3,01×10²³".
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const SCI_RE = /(\d+(?:,\d+)?)\s*\.\s*10(-?\d{1,3})(?!\d)/g;
const supExp = (exp) => [...exp].map((c) => SUP[c] ?? c).join('');
function fixSci(t) {
  return typeof t === 'string'
    ? t
        .replace(SCI_RE, (_, coef, exp) => `${coef}×10${supExp(exp)}`)
        .replace(/×\s*10(-?\d{1,3})(?!\d)/g, (_, exp) => `×10${supExp(exp)}`)
    : t;
}

// Subíndices químicos: "H2O" -> "H₂O". Solo fórmulas (≥2 mayúsculas / paréntesis
// de fórmula / diatómico); no toca unidades (cm3) ni variables (q1, V2).
const SUB = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
const DIATOM = /^(O2|O3|N2|H2|F2|Cl2|Br2|I2|P4|S8)$/;
const FORMULA_TOKEN_RE = /[A-Za-z0-9()]*[A-Za-z][A-Za-z0-9()]*/g;
const NOT_SUBSCRIPT = new Set(['H2A', 'H2B']); // histonas (no ácido diprótico en el corpus)
const FORCE_SUBSCRIPT = new Set(['B12']); // vitamina B₁₂
function isFormula(tok) {
  if (!/\d/.test(tok)) return false;
  const upper = (tok.match(/[A-Z]/g) || []).length;
  const formulaParen = /\)\d/.test(tok) || /[A-Za-z]\(/.test(tok);
  return upper >= 2 || formulaParen || DIATOM.test(tok);
}
const subDigits = (tok) =>
  tok.replace(/([A-Za-z)])(\d+)/g, (_, p, d) => p + [...d].map((c) => SUB[c] ?? c).join(''));
function fixFormulas(t) {
  if (typeof t !== 'string') return t;
  return t.replace(FORMULA_TOKEN_RE, (tok) => {
    if (NOT_SUBSCRIPT.has(tok)) return tok;
    if (FORCE_SUBSCRIPT.has(tok) || isFormula(tok)) return subDigits(tok);
    return tok;
  });
}

// Isótopos: número másico como superíndice-prefijo ("35Cl" -> "³⁵Cl"). Solo con
// símbolos de elemento de DOS letras (nunca ambiguos con unidades 6N/70S/5V).
const EL2 =
  'He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Ag|Cd|Sn|Sb|Te|Xe|Ba|Pt|Au|Hg|Pb|Bi|Ra|Th';
const ISOTOPE_RE = new RegExp('(?<![\\d.,])(\\d{1,3})(' + EL2 + ')(?![A-Za-z0-9])', 'g');
function fixIsotopes(t) {
  return typeof t === 'string'
    ? t.replace(ISOTOPE_RE, (_, n, el) => [...n].map((c) => SUP[c] ?? c).join('') + el)
    : t;
}

// Caracteres de fuente Symbol que pdftotext dejó como uso privado (F0xx).
// Se definen por codepoint para no dejar literales invisibles en el archivo.
const CHAR_MAP = new Map(
  [
    [0xf03d, '='], [0xf02d, '−'], [0xf02b, '+'], [0xf0b4, '×'],
    [0xf0b7, '•'], [0xf0a7, '•'], [0xf0e0, '→'],
  ].map(([cp, v]) => [String.fromCodePoint(cp), v]),
);
function fixChars(t) {
  if (typeof t !== 'string') return t;
  for (const [k, v] of CHAR_MAP) t = t.split(k).join(v);
  // Cualquier otro carácter de uso privado no mapeado (viñetas sueltas, etc.)
  // se elimina para no dejar "tofu" en pantalla.
  t = t.replace(/[-]/g, ' ');
  // Flecha de reacción: pdftotext la dejó como un run largo de guiones.
  t = t.replace(/\s*-{4,}\s*(?:→\s*)?/g, ' → ');
  return t.replace(/→\s*→/g, '→').replace(/\s{2,}/g, ' ').trim();
}

// Footer de página filtrado en medio de preguntas partidas por salto de página.
function stripFooter(t) {
  if (typeof t !== 'string') return t;
  return t
    .replace(
      /\s*\d{0,3}\s*QUANTUM[\s\S]*?Ingreso a Medicina(?:\s+UNC)?(?:\s*[-–]\s*Prof\.?\s*Cristian\s+Quinteros)?(?:\s+(?:Biolog[ií]a|F[ií]sica|Qu[ií]mica))?/gi,
      ' ',
    )
    .replace(/\s*[-–]?\s*Prof\.?\s*Cristian\s+Quinteros/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Unidades con exponente aplanado: cm3→cm³, m/s2→m/s².
function fixUnits(t) {
  if (typeof t !== 'string') return t;
  return t
    .replace(/\b(cm|dm|mm|km|nm|µm|μm)([23])\b/g, (_, u, e) => u + (e === '2' ? '²' : '³'))
    .replace(/\/s([23])\b/g, (_, e) => '/s' + (e === '2' ? '²' : '³'))
    .replace(/([0-9/]\s*)m([23])\b/g, (_, pre, e) => pre + 'm' + (e === '2' ? '²' : '³'));
}

// Pipeline: footer → símbolos → unidades → notación científica → isótopos → fórmulas.
const normalize = (t) => fixFormulas(fixIsotopes(fixSci(fixUnits(fixChars(stripFooter(t))))));

// Símbolos ilegibles: F0DC/F046/F04C (separadores de fuente Symbol que indican
// dos preguntas fusionadas) y FFFD (carácter perdido, p. ej. Griegas de ángulos).
const CORRUPT_RE = new RegExp(
  '[' + [0xf0dc, 0xf046, 0xf04c, 0xfffd].map((c) => String.fromCodePoint(c)).join('') + ']',
);
// Referencia fuerte a una figura: si no la extrajimos, la pregunta es inservible.
const STRONG_FIG_RE =
  /esquema|gr[áa]fico|figura|dibujo|mol[eé]cula|siguiente (?:compuesto|estructura|reacci[oó]n|circuito|imagen)/i;

const PRACTICO_RE =
  /problema|mendel|herencia|genealog|cruzamiento|c[aá]lculo|ph|buffer|soluc|diluc|molarid|numeric|cinem|din[aá]m|hidro|gases|electr|est[aá]tica|energ|vector|estequiom|coligat|redox|equilibr|ecuacion|pasaje|logaritm|funci[oó]n/i;
const ALTA_RE =
  /membrana|transporte|mitocondri|dogma|transcrip|traduc|duplicac|mendel|herencia|sangu|nefr|cardiac|card[ií]aco|respirat|hematosis|nervios|buffer|ph|grupo|hibrid|solucion|coligat|cinem|din[aá]m|newton|energ|gases|ohm|electr/i;

const items = [];
const excluded = [];
const seenStems = new Set(); // dedup de preguntas repetidas en el preguntero

let seq = 0;
const prefix = subject.slice(0, 3);

for (const q of parsed) {
  const reason = excludeReason(q);
  if (reason) {
    excluded.push({ number: q.number, section: q.section, kind: q.kind, reason });
    continue;
  }

  const sig = normalize(q.stem).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 90);
  if (seenStems.has(sig)) {
    excluded.push({ number: q.number, section: q.section, kind: q.kind, reason: 'duplicado' });
    continue;
  }
  seenStems.add(sig);

  seq += 1;
  const id = `${prefix}-imp-${String(seq).padStart(4, '0')}`;
  const sectionClean = cleanSection(q.section);
  const topic = slug(sectionClean);
  const track = PRACTICO_RE.test(sectionClean) ? 'practico' : 'teorico';
  const frequency = ALTA_RE.test(sectionClean) ? 'alta' : 'media';
  const type = q.kind === 'multiple_response' ? 'multiple_response' : 'single_choice';

  const correctSet = new Set(Array.isArray(q.correct) ? q.correct : [q.correct]);
  const choices = q.options.map((o) => ({
    id: o.id,
    text: normalize(o.text),
    correct: correctSet.has(o.id),
  }));

  const correctTexts = choices
    .filter((c) => c.correct)
    .map((c) => `${c.id}) ${c.text}`)
    .join(' · ');

  const image = figureFor(q);

  items.push({
    id,
    institutions: ['UNC', 'UNSa'],
    subject,
    block: topic,
    topic,
    track,
    type,
    frequency,
    difficulty: 2,
    stem: normalize(q.stem),
    ...(image ? { media: [{ kind: 'image', src: image }] } : {}),
    choices,
    explanation: `Respuesta correcta: ${correctTexts}.`,
    source: 'original',
    version: 1,
    status: 'active',
    authorNote: `Importado del preguntero (nº ${q.number}, sección "${sectionClean}").`,
  });
}

function excludeReason(q) {
  const raw = q.stem + ' ' + q.options.map((o) => o.text).join(' ');
  if (CORRUPT_RE.test(raw))
    return 'corrupto (símbolos ilegibles / preguntas fusionadas)';
  if (q.kind !== 'single_choice' && q.kind !== 'multiple_response')
    return `tipo ${q.kind} (requiere conversión estructural)`;
  // Con figura extraída → se importa con imagen. Sin imagen: si el enunciado aún
  // exige una figura fuerte (esquema/gráfico/molécula), excluir; si la referencia
  // es débil (falso positivo del flag), se recupera como texto.
  if (q.dependsOnFigure && !figureFor(q) && STRONG_FIG_RE.test(q.stem))
    return 'figura no extraída (necesita imagen)';
  if (!q.correct) return 'sin clave de respuesta';
  if (q.options.length < 2) return 'menos de 2 opciones parseadas';
  const ids = new Set(q.options.map((o) => o.id));
  const need = Array.isArray(q.correct) ? q.correct : [q.correct];
  if (!need.every((c) => ids.has(c)))
    return `la opción correcta (${need}) no está entre las parseadas`;
  return null;
}

writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf8');
const invPath = outPath.replace(/\.json$/, '.inventory.json');
const byReason = {};
for (const e of excluded) byReason[e.reason] = (byReason[e.reason] || 0) + 1;
writeFileSync(
  invPath,
  JSON.stringify({ importados: items.length, excluidos: excluded.length, porMotivo: byReason, detalle: excluded }, null, 2),
  'utf8',
);

console.log(JSON.stringify({ subject, importados: items.length, excluidos: excluded.length, porMotivo: byReason }, null, 2));
console.log(`\nEscrito banco: ${outPath}`);
console.log(`Escrito inventario: ${invPath}`);
