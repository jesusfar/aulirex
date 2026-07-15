// Triage de los PDF de origen (p. ej. "D:\\PDF MEDICINA"): para cada PDF decide
//   · materia   → heurística por nombre de archivo/carpeta
//   · esBanco   → ¿tiene opciones a-e + clave/solucionario? (vs solo temario)
//   · necesitaOCR → ¿el texto extraíble es demasiado escaso? (PDF escaneado)
//   · fuente    → etiqueta corta para el namespace de IDs (caj, ares, hq, tp, ...)
//
// No modifica nada del banco: solo produce un manifiesto para rutear el pipeline.
// Usa `pdftotext -layout` (poppler). Salida: scripts/import/manifests/pdf-sources.json
//
// Uso: node scripts/import/triage.mjs "D:\\PDF MEDICINA" [out.json]

import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { tmpdir } from 'node:os';

const root = process.argv[2] || 'D:\\PDF MEDICINA';
const outPath =
  process.argv[3] || new URL('./manifests/pdf-sources.json', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

// --- Descubrir PDFs recursivamente -----------------------------------------
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (extname(name).toLowerCase() === '.pdf') out.push({ path: p, size: st.size });
  }
  return out;
}

// --- Heurísticas de materia y fuente ---------------------------------------
function guessSubject(p) {
  const t = p.toLowerCase();
  if (/q-o-|quimica organica|química orgánica|organic/i.test(t)) return 'quimica'; // orgánica → block dentro de química
  if (/biolog/i.test(t)) return 'biologia';
  if (/f[ií]sica|logikamente/i.test(t)) return 'fisica';
  if (/qu[ií]mica|inorganica/i.test(t)) return 'quimica';
  if (/matem[aá]tica/i.test(t)) return 'matematica';
  if (/alfabetiz|comprensi[oó]n|texto/i.test(t)) return 'comprension_textos';
  return 'mixto'; // combinados / modelos de examen multi-materia
}

function guessSource(p) {
  const t = p.toLowerCase();
  if (/cajal/.test(t)) return 'caj';
  if (/ares|preguntero/.test(t)) return 'ares';
  if (/hq apoyo|apoyo universitario/.test(t)) return 'hq';
  if (/\\teorias\\|todos los tp|todas las teor/i.test(t)) return 'tp';
  if (/logikamente/.test(t)) return 'logi';
  if (/modelos de examenes/.test(t)) return 'mod';
  if (/q-o-|quimica organica/.test(t)) return 'qo';
  return 'otro';
}

// --- Extracción de texto y métricas -----------------------------------------
const tmp = mkdtempSync(join(tmpdir(), 'triage-'));
const OPTION_RE = /^\s*[a-eA-E]\)\s+\S/;
const ANSWER_RE = /(?:Rtas?|Respuestas?)\s+correctas|solucionario|clave de correcci/i;
const QNUM_RE = /^\s*\d{1,3}\s*[.)]\s+\S/;

function analyze(pdfPath) {
  const txtPath = join(tmp, basename(pdfPath) + '.txt');
  let text = '';
  try {
    execFileSync('pdftotext', ['-enc', 'UTF-8', '-layout', pdfPath, txtPath], { stdio: 'ignore' });
    text = readFileSync(txtPath, 'utf8');
  } catch {
    return { chars: 0, pages: 0, options: 0, qnums: 0, hasAnswerKey: false, error: 'pdftotext falló' };
  }
  const pages = (text.match(/\f/g) || []).length + 1;
  const lines = text.split(/\r?\n/);
  let options = 0,
    qnums = 0;
  for (const l of lines) {
    if (OPTION_RE.test(l)) options++;
    if (QNUM_RE.test(l)) qnums++;
  }
  const hasAnswerKey = ANSWER_RE.test(text);
  // Densidad de caracteres "de verdad" (sin espacios) por página → detecta escaneo.
  const dense = text.replace(/\s/g, '').length;
  return { chars: dense, pages, charsPerPage: Math.round(dense / pages), options, qnums, hasAnswerKey };
}

// --- Clasificación final ----------------------------------------------------
const OCR_CHARS_PER_PAGE = 250; // por debajo de esto, el texto es residual (marca/URL) → escaneado

const files = walk(root).sort((a, b) => a.path.localeCompare(b.path));
const rows = [];
for (const f of files) {
  const m = analyze(f.path);
  const necesitaOCR = (m.charsPerPage ?? 0) < OCR_CHARS_PER_PAGE;
  // esBanco solo se puede afirmar si hay texto; si necesita OCR, queda "?" para
  // reevaluar tras OCR. Señal robusta = densidad de opciones a-e por página
  // (los temarios tienen pocas), reforzada por muchas opciones o un solucionario.
  // No dependemos de `qnums` (line-start) porque -layout no siempre lo respeta.
  const optsPorPagina = m.pages ? m.options / m.pages : 0;
  const esBanco = necesitaOCR
    ? null
    : optsPorPagina >= 0.8 || m.options >= 60 || (m.hasAnswerKey && m.options >= 15);
  rows.push({
    archivo: f.path,
    sizeMB: +(f.size / 1048576).toFixed(2),
    materia: guessSubject(f.path),
    fuente: guessSource(f.path),
    paginas: m.pages,
    charsPorPagina: m.charsPerPage ?? 0,
    opciones_ae: m.options,
    preguntas_num: m.qnums,
    tieneSolucionario: m.hasAnswerKey,
    necesitaOCR,
    esBanco, // true | false | null(=revisar tras OCR)
    ...(m.error ? { error: m.error } : {}),
  });
}

rmSync(tmp, { recursive: true, force: true });
writeFileSync(outPath, JSON.stringify(rows, null, 2), 'utf8');

// --- Reporte legible --------------------------------------------------------
const banco = rows.filter((r) => r.esBanco === true).length;
const ocr = rows.filter((r) => r.necesitaOCR).length;
console.log(`\nTriage: ${rows.length} PDF · banco(texto)=${banco} · necesitaOCR=${ocr}\n`);
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(pad('archivo', 46), pad('mat', 8), pad('src', 5), pad('pg', 4), pad('c/pg', 6), pad('a-e', 5), pad('sol', 4), pad('OCR', 4), 'banco');
for (const r of rows) {
  console.log(
    pad(basename(r.archivo), 46),
    pad(r.materia, 8),
    pad(r.fuente, 5),
    pad(r.paginas, 4),
    pad(r.charsPorPagina, 6),
    pad(r.opciones_ae, 5),
    pad(r.tieneSolucionario ? 'sí' : '-', 4),
    pad(r.necesitaOCR ? 'sí' : '-', 4),
    r.esBanco === null ? '?' : r.esBanco ? 'sí' : 'no',
  );
}
console.log(`\nEscrito: ${outPath}`);
