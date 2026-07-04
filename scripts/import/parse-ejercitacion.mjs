// Parser de las ejercitaciones (texto extraído con `pdftotext -enc UTF-8 -layout`).
// Extrae enunciado + opciones a-e, cruza con la clave y CLASIFICA cada pregunta.
// No descarta nada: lo no importable como texto queda marcado para inventario.
//
// Dos modos (autodetectados por la cantidad de bloques "Respuestas correctas"):
//   · global    → un solo solucionario al final, numeración global (Biología).
//   · sectioned → claves intercaladas por guía, numeración que reinicia por guía;
//                 las respuestas se asocian por posición al lote de preguntas
//                 que las precede (Física, Química).
//
// Uso: node scripts/import/parse-ejercitacion.mjs <archivo.txt> <subject> [out.json] [--mode=global|sectioned]

import { readFileSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const inPath = args[0];
const subject = args[1];
const outPath = args.find((a, i) => i >= 2 && !a.startsWith('--'));
const modeArg = (args.find((a) => a.startsWith('--mode=')) || '').split('=')[1];

if (!inPath || !subject) {
  console.error('Uso: node parse-ejercitacion.mjs <archivo.txt> <subject> [out.json] [--mode=...]');
  process.exit(1);
}

const raw = readFileSync(inPath, 'utf8');
const lines = raw.split(/\r?\n/);

// --- Regex compartidas ------------------------------------------------------
const optionRe = /^\s*([a-eA-E])\)\s+(.*)$/;
const questionStartRe = /^\s*(\d{1,3})\s*[.)]\s+(.*)$/;
const answerHeaderRe = /(?:Rtas?|Respuestas?)\s+correctas/i;

// Whitelist de secciones por materia. Evita que captions de figuras/labels de
// diagramas ("Concentración de sustrato", "C   F", "A B C D E") o instrucciones
// ("Pistas:", "Marcar lo correcto:") se tomen como encabezados de sección.
const SECTION_WHITELIST = {
  biologia:
    /seres vivos|bioelement|protoplasma|difusi[oó]n|[oó]smosis|membrana|citoesqueleto|citosol|inclusion|endomembran|mitocondri|microcuerpo|cloroplast|ribosom|n[uú]cleo|s[ií]ntesis|ciclo celular|mitosis|meiosis|gen[eé]tica|mutacion|herencia|mendel|genealog|ecolog[ií]a|sistemas? de la|evoluci[oó]n|embriolog/i,
}[subject];

function looksLikeSection(l) {
  const t = l.trim();
  if (t.length < 4 || t.length > 46) return false;
  if (/^\d/.test(t)) return false;
  if (optionRe.test(l)) return false;
  if (/QUANTUM|Quantum|Ingreso a Medicina|Prof\./i.test(t)) return false;
  if (/[.?¿:]/.test(t)) return false; // instrucciones tipo "Pistas:", "Marcar lo correcto:"
  // labels de diagrama: varios tokens de 1-2 letras ("C F", "A B C D E")
  const toks = t.split(/\s+/);
  if (toks.length >= 2 && toks.every((w) => w.length <= 2)) return false;
  if (!/^[A-ZÁÉÍÓÚ]/.test(t) || toks.length > 7) return false;
  // si la materia tiene whitelist, exigir coincidencia temática
  if (SECTION_WHITELIST && !SECTION_WHITELIST.test(t)) return false;
  return true;
}

// Encabezado fuerte de guía (Física/Química): "X Ejercitación" o "Guía X".
// Sirve para delimitar guías incluso cuando el solucionario trae respuestas
// escritas que parecen preguntas.
function isStrongHeader(l) {
  const t = l.trim();
  if (t.length > 60) return false;
  if (optionRe.test(l)) return false;
  if (/\bEjercitaci[oó]n\b/i.test(t) && !/^\d/.test(t)) return true;
  if (/^(Guía|Guia)\b/i.test(t)) return true;
  return looksLikeSection(l);
}

// Detección de modo.
const headerCount = lines.filter((l) => answerHeaderRe.test(l)).length;
const mode = modeArg || (headerCount > 1 ? 'sectioned' : 'global');

// --- Parseo de tokens de respuesta (letra, serie V/F, o lista numérica) -----
const ansTokenRe =
  /(\d{1,3})\s*[.)]?\s*([a-eA-E]|[VvFf]{2,}|\d+(?:\s*,\s*\d+)+)(?![A-Za-zÁÉÍÓÚáéíóú0-9])/g;

function parseAnswerTokens(line, into) {
  const re = new RegExp(ansTokenRe.source, 'g');
  let m;
  while ((m = re.exec(line)) !== null) {
    const num = parseInt(m[1], 10);
    const val = m[2].trim();
    if (val && !into.has(num)) into.set(num, val);
  }
}

// ===========================================================================
// MODO GLOBAL (Biología)
// ===========================================================================
function parseGlobal() {
  let keyStart = lines.findIndex((l) => answerHeaderRe.test(l));
  if (keyStart === -1) keyStart = lines.length;
  const qLines = lines.slice(0, keyStart);
  const aLines = lines.slice(keyStart);

  const answers = new Map();
  // Formato del solucionario de Biología: "192. c", varios por línea en columnas.
  const dotTokenRe = /(\d{1,3})\.\s*([^]*?)(?=(?:\s{2,}\d{1,3}\.)|$)/g;
  for (const line of aLines) {
    const re = new RegExp(dotTokenRe.source, 'g');
    let m;
    while ((m = re.exec(line)) !== null) {
      const num = parseInt(m[1], 10);
      const val = m[2].trim();
      if (val && !answers.has(num)) answers.set(num, val);
    }
  }

  const parsed = [];
  let current = null;
  let section = 'general';

  const isIsolatedSection = (idx) => {
    if (!looksLikeSection(qLines[idx])) return false;
    const prev = (qLines[idx - 1] ?? '').trim();
    const next = qLines[idx + 1] ?? '';
    return prev === '' && (next.trim() === '' || /^\s*\d{1,3}\s*[.)]\s/.test(next));
  };
  const push = () => { if (current) parsed.push(current); current = null; };

  for (let i = 0; i < qLines.length; i++) {
    const line = qLines[i];
    if (isIsolatedSection(i)) { push(); section = line.trim(); continue; }
    const qm = line.match(questionStartRe);
    if (qm) {
      push();
      current = { number: +qm[1], section, stem: qm[2].trim(), options: [], _stem: true };
      continue;
    }
    const om = line.match(optionRe);
    if (om && current) {
      current._stem = false;
      current.options.push({ id: om[1].toLowerCase(), text: om[2].trim() });
      continue;
    }
    if (current) {
      const t = line.trim();
      if (!t) continue;
      if (current._stem) current.stem += ' ' + t;
      else if (current.options.length) current.options.at(-1).text += ' ' + t;
    }
  }
  push();

  // Dedup por número: preferir la entrada con más opciones.
  const byNum = new Map();
  for (const q of parsed) {
    const prev = byNum.get(q.number);
    if (!prev || q.options.length > prev.options.length) byNum.set(q.number, q);
  }
  const questions = [...byNum.values()].sort((a, b) => a.number - b.number);
  return questions.map((q) => ({ ...q, answerRaw: answers.get(q.number) ?? null }));
}

// ===========================================================================
// MODO SECCIONADO (Física, Química)
// ===========================================================================
function parseSectioned() {
  const out = [];
  let pending = [];
  let localAnswers = new Map();
  let current = null;
  let lastSection = 'general';
  let guideName = null; // nombre asignado por el header de respuestas
  let inAnswers = false;

  const pushCurrent = () => { if (current) { pending.push(current); current = null; } };
  const flushGuide = () => {
    pushCurrent();
    const name = guideName || lastSection;
    for (const q of pending) {
      q.section = name;
      q.answerRaw = localAnswers.get(q.number) ?? null;
      out.push(q);
    }
    pending = [];
    localAnswers = new Map();
    guideName = null;
    inAnswers = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Header de respuestas: nombra la guía y arranca la recolección de claves.
    const ah = line.match(answerHeaderRe);
    if (ah) {
      pushCurrent();
      const name = line
        .slice(line.search(answerHeaderRe))
        .replace(answerHeaderRe, '')
        .replace(/[:.]/g, '')
        .trim();
      if (name) guideName = name;
      inAnswers = true;
      continue;
    }

    if (inAnswers) {
      // El bloque de claves termina SOLO ante un encabezado de guía. Las líneas
      // numeradas (incluidas respuestas escritas como "1. Resultados: ...") se
      // tratan siempre como claves, nunca cortan el bloque.
      if (isStrongHeader(line)) {
        flushGuide();
        // no continue: reprocesar esta línea como encabezado abajo
      } else {
        parseAnswerTokens(line, localAnswers);
        continue;
      }
    }

    // Zona de preguntas: actualizar sección ante un encabezado de guía.
    if (isStrongHeader(line)) {
      pushCurrent();
      lastSection = line.trim();
      continue;
    }
    const qm = line.match(questionStartRe);
    if (qm) {
      pushCurrent();
      current = { number: +qm[1], section: lastSection, stem: qm[2].trim(), options: [], _stem: true };
      continue;
    }
    const om = line.match(optionRe);
    if (om && current) {
      current._stem = false;
      current.options.push({ id: om[1].toLowerCase(), text: om[2].trim() });
      continue;
    }
    if (current) {
      const t = line.trim();
      if (!t) continue;
      if (current._stem) current.stem += ' ' + t;
      else if (current.options.length) current.options.at(-1).text += ' ' + t;
    }
  }
  flushGuide();

  // En modo seccionado los números reinician por guía: dedup por (sección+número).
  const seen = new Map();
  for (const q of out) {
    const key = q.section + '#' + q.number;
    const prev = seen.get(key);
    if (!prev || q.options.length > prev.options.length) seen.set(key, q);
  }
  return [...seen.values()];
}

// --- Clasificación ----------------------------------------------------------
const FIGURE_RE =
  /esquema|gr[áa]fico|figura|imagen|siguiente (?:dibujo|molécula|estructura|compuesto|gr[áa]fico|esquema|figura|tabla)|la molécula|el compuesto|una con flechas|el siguiente circuito|el dibujo|según el gr/i;

function classify(q) {
  const ans = q.answerRaw;
  const blob = q.stem + ' ' + q.options.map((o) => o.text).join(' ');
  const dependsOnFigure = FIGURE_RE.test(blob);

  let kind = 'unknown';
  let correct = null;
  if (ans) {
    const a = ans.replace(/\s+/g, ' ').trim();
    if (/^[a-eA-E]$/.test(a)) { kind = 'single_choice'; correct = a.toLowerCase(); }
    else if (/^[a-eA-E](\s*[,y;]\s*[a-eA-E])+$/i.test(a)) {
      kind = 'multiple_response';
      correct = (a.match(/[a-eA-E]/g) || []).map((x) => x.toLowerCase());
    } else if (/^[VvFf]{2,}$/.test(a.replace(/\s/g, ''))) {
      kind = 'true_false_series'; correct = a.replace(/\s/g, '').toUpperCase();
    } else if (/^\d+(\s*,\s*\d+)+$/.test(a)) { kind = 'ordering'; correct = a; }
    else { kind = 'freeform'; correct = a; }
  }
  return { number: q.number, section: q.section, stem: q.stem, options: q.options, answerRaw: ans ?? null, kind, correct, dependsOnFigure };
}

const questions = (mode === 'sectioned' ? parseSectioned() : parseGlobal()).map(classify);

// --- Reporte ----------------------------------------------------------------
const byKind = {};
let withAnswer = 0, figure = 0, valid = 0;
for (const q of questions) {
  byKind[q.kind] = (byKind[q.kind] || 0) + 1;
  if (q.answerRaw) withAnswer++;
  if (q.dependsOnFigure) figure++;
  if ((q.kind === 'single_choice' || q.kind === 'multiple_response') && q.options.length >= 2 && !q.dependsOnFigure) valid++;
}

console.log(JSON.stringify({
  subject, mode,
  totalPreguntasDetectadas: questions.length,
  conClaveDeRespuesta: withAnswer,
  dependenDeFigura: figure,
  importablesLimpias_single_multiple: valid,
  porTipo: byKind,
}, null, 2));

if (outPath) {
  writeFileSync(outPath, JSON.stringify(questions, null, 2), 'utf8');
  console.log(`\nEscrito: ${outPath} (${questions.length} preguntas)`);
}
