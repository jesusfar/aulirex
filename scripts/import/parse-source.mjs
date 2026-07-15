// Parser genérico, configurable por FUENTE. Complementa a parse-ejercitacion.mjs
// (que queda intacto para las ejercitaciones QUANTUM con clave separada). Aquí se
// soporta además la estrategia de respuesta EN LÍNEA (Cajal "***") y la
// clasificación por contenido cuando la fuente no trae secciones limpias.
//
// Emite el MISMO shape que consume convert-to-items.mjs, más `subject` y
// `explanation` por pregunta:
//   { number, section, subject, stem, options:[{id,text}], answerRaw, correct,
//     kind, dependsOnFigure, explanation }
//
// Uso: node scripts/import/parse-source.mjs <archivo.txt> <fuente> [out.json]
//   <fuente> = nombre de módulo en ./sources/<fuente>.mjs (p. ej. "cajal")

import { readFileSync, writeFileSync } from 'node:fs';
import { classifyByText } from './sources/taxonomy.mjs';

const [, , inPath, sourceName, outPath] = process.argv;
if (!inPath || !sourceName) {
  console.error('Uso: node parse-source.mjs <archivo.txt> <fuente> [out.json]');
  process.exit(1);
}

const cfg = (await import(`./sources/${sourceName}.mjs`)).default;
const raw = readFileSync(inPath, 'utf8');
const lines = raw.split(/\r?\n/);

const isFooter = (l) => cfg.footerRe && cfg.footerRe.test(l);
const clean = (s) => s.replace(/\s+/g, ' ').trim();
let droppedNoOptions = 0;

// --- Extracción de la explicación entre paréntesis tras la marca *** ---------
// Devuelve { text, rest } separando "texto (explicación)" en la parte de opción.
function splitParenExplanation(optionText) {
  const i = optionText.indexOf('(');
  if (i === -1) return { text: clean(optionText), explanation: '' };
  const before = optionText.slice(0, i);
  let depth = 0,
    j = i,
    end = -1;
  for (; j < optionText.length; j++) {
    if (optionText[j] === '(') depth++;
    else if (optionText[j] === ')') {
      depth--;
      if (depth === 0) { end = j; break; }
    }
  }
  const inside = end === -1 ? optionText.slice(i + 1) : optionText.slice(i + 1, end);
  const after = end === -1 ? '' : optionText.slice(end + 1);
  return { text: clean(before + ' ' + after), explanation: clean(inside) };
}

// ============================================================================
// Estrategia INLINE-STAR (Cajal): la opción correcta lleva "***" en su texto.
// ============================================================================
function parseInlineStar() {
  const out = [];
  let cur = null; // pregunta en construcción
  let mode = null; // 'stem' | 'options'
  let resolBuf = null; // acumula "Resolución:" para fallback de clave/explicación

  const finishOption = (q) => {
    if (!q || !q.options.length) return;
    const o = q.options.at(-1);
    if (cfg.starRe.test(o._raw)) {
      const { text, explanation } = splitParenExplanation(o._raw.replace(cfg.starRe, ' '));
      o.text = text;
      o.correctInline = true;
      if (explanation && !q.explanation) q.explanation = explanation;
    } else {
      o.text = clean(o._raw);
    }
  };

  const push = () => {
    if (!cur) return;
    finishOption(cur);
    // Falsos positivos: líneas numeradas de prosa (apéndices de teoría/TP) que no
    // tienen opciones ni figura → no son preguntas. Se cuentan, no se emiten.
    if (cur.options.length === 0 && !cfg.figureRe.test(cur.stem)) {
      droppedNoOptions++;
      cur = null;
      mode = null;
      resolBuf = null;
      return;
    }
    // Fallback de clave por bloque "Resolución: ... Opción correcta: X"
    if (resolBuf && !cur.options.some((o) => o.correctInline)) {
      const km = resolBuf.match(cfg.keyLineRe);
      if (km) cur._keyLetter = km[1].toLowerCase();
      if (!cur.explanation) {
        const expl = clean(resolBuf.replace(/^.*?resoluci[oó]n\s*:/i, ''));
        if (expl) cur.explanation = expl.slice(0, 600);
      }
    }
    out.push(cur);
    cur = null;
    mode = null;
    resolBuf = null;
  };

  for (let line of lines) {
    if (isFooter(line)) continue;
    const qm = line.match(cfg.questionRe);
    const om = line.match(cfg.optionRe);

    if (qm && !om) {
      // Nueva pregunta (evita falsos positivos de opciones que empiezan con dígito).
      push();
      cur = { number: +qm[1], stem: qm[2].trim(), options: [], explanation: '' };
      mode = 'stem';
      continue;
    }
    if (!cur) continue;

    if (cfg.stopBlockRe && cfg.stopBlockRe.test(line)) {
      finishOption(cur);
      mode = 'resol';
      resolBuf = (resolBuf || '') + ' ' + line;
      continue;
    }
    if (mode === 'resol') {
      resolBuf += ' ' + line;
      continue;
    }
    if (om) {
      finishOption(cur);
      cur.options.push({ id: om[1].toLowerCase(), _raw: om[2], text: '', correctInline: false });
      mode = 'options';
      continue;
    }
    // Continuación de texto (stem u opción). Preservar líneas en blanco como corte.
    const t = line.trim();
    if (!t) continue;
    if (mode === 'options' && cur.options.length) cur.options.at(-1)._raw += ' ' + t;
    else if (mode === 'stem') cur.stem += ' ' + t;
  }
  push();
  return out;
}

// ============================================================================
// Estrategia SEPARATE-KEY (HQ): preguntas numeradas + clave compacta "N) L" al
// final, acotadas a una seccion del documento.
// ============================================================================
function parseSeparateKey() {
  // 1) Clave: desde keyHeaderRe hasta el final.
  const keyStart = lines.findIndex((l) => cfg.keyHeaderRe.test(l));
  const answers = new Map();
  if (keyStart !== -1) {
    for (const line of lines.slice(keyStart)) {
      const re = new RegExp(cfg.keyTokenRe.source, 'g');
      let m;
      while ((m = re.exec(line)) !== null) {
        const num = parseInt(m[1], 10);
        if (!answers.has(num)) answers.set(num, m[2].toLowerCase());
      }
    }
  }

  // 2) Preguntas: desde sectionHeaderRe (o 0) hasta el inicio de la clave.
  let secStart = cfg.sectionHeaderRe ? lines.findIndex((l) => cfg.sectionHeaderRe.test(l)) : 0;
  if (secStart === -1) secStart = 0;
  const qLines = lines.slice(secStart, keyStart === -1 ? undefined : keyStart);

  const out = [];
  let cur = null;
  let mode = null;
  const push = () => {
    if (!cur) return;
    if (cur.options.length) cur.options.at(-1).text = clean(cur.options.at(-1)._raw);
    if (cur.options.length === 0 && !cfg.figureRe.test(cur.stem)) { droppedNoOptions++; cur = null; mode = null; return; }
    out.push(cur);
    cur = null;
    mode = null;
  };

  for (const line of qLines) {
    if (isFooter(line)) continue;
    const qm = line.match(cfg.questionRe);
    const om = line.match(cfg.optionRe);
    if (qm && !om) {
      push();
      cur = { number: +qm[1], stem: qm[2].trim(), options: [], explanation: '' };
      mode = 'stem';
      continue;
    }
    if (!cur) continue;
    if (om) {
      if (cur.options.length) cur.options.at(-1).text = clean(cur.options.at(-1)._raw);
      cur.options.push({ id: om[1].toLowerCase(), _raw: om[2], text: '', correctInline: false });
      mode = 'options';
      continue;
    }
    const t = line.trim();
    if (!t) continue;
    if (mode === 'options' && cur.options.length) cur.options.at(-1)._raw += ' ' + t;
    else if (mode === 'stem') cur.stem += ' ' + t;
  }
  push();

  // 3) Adjuntar clave por numero.
  for (const q of out) q._keyLetter = answers.get(q.number) ?? null;
  return out;
}

// --- Clasificación de tipo + subject/topic ----------------------------------
function classify(q) {
  const blob = q.stem + ' ' + q.options.map((o) => o.text).join(' ');
  const dependsOnFigure = cfg.figureRe.test(blob);

  // Correctas: por marca inline, o por fallback de clave textual.
  const inlineCorrect = q.options.filter((o) => o.correctInline).map((o) => o.id);
  let correct = null;
  if (inlineCorrect.length === 1) correct = inlineCorrect[0];
  else if (inlineCorrect.length > 1) correct = inlineCorrect;
  else if (q._keyLetter) correct = q._keyLetter;

  let kind = 'unknown';
  if (Array.isArray(correct)) kind = 'multiple_response';
  else if (correct) kind = 'single_choice';

  const cls = classifyByText(blob, cfg.subjectHint);

  // Fuente de materia única (p. ej. HQ Química): la materia la fija la fuente; el
  // clasificador de contenido solo aporta el tema, y solo si pertenece a esa
  // materia (si no, queda sin_clasificar para revisión, pero con la materia correcta).
  let subject = cls.subject, block = cls.block, topic = cls.topic, matched = cls.matched;
  if (cfg.forceSubject) {
    subject = cfg.forceSubject;
    if (!(cls.matched && cls.subject === cfg.forceSubject)) {
      block = 'sin_clasificar';
      topic = 'sin_clasificar';
      matched = false;
    }
  }

  return {
    number: q.number,
    section: matched ? block : 'sin_clasificar',
    subject,
    block,
    topic,
    classified: matched,
    stem: clean(q.stem),
    options: q.options.map((o) => ({ id: o.id, text: o.text })),
    answerRaw: correct == null ? null : Array.isArray(correct) ? correct.join(',') : correct,
    correct,
    kind,
    dependsOnFigure,
    explanation: q.explanation || '',
  };
}

const STRATEGIES = { 'inline-star': parseInlineStar, 'separate-key': parseSeparateKey };
const runStrategy = STRATEGIES[cfg.answerStrategy];
if (!runStrategy) throw new Error(`estrategia ${cfg.answerStrategy} no implementada`);
const parsed = runStrategy();
const questions = parsed.map(classify);

// --- Reporte ----------------------------------------------------------------
const byKind = {};
const bySubject = {};
let withAnswer = 0, figure = 0, classified = 0, valid = 0;
for (const q of questions) {
  byKind[q.kind] = (byKind[q.kind] || 0) + 1;
  bySubject[q.subject] = (bySubject[q.subject] || 0) + 1;
  if (q.correct) withAnswer++;
  if (q.dependsOnFigure) figure++;
  if (q.classified) classified++;
  if ((q.kind === 'single_choice' || q.kind === 'multiple_response') && q.options.length >= 2 && !q.dependsOnFigure)
    valid++;
}

console.log(JSON.stringify({
  fuente: sourceName,
  totalPreguntasDetectadas: questions.length,
  descartadasSinOpciones: droppedNoOptions,
  conClave: withAnswer,
  clasificadasPorContenido: classified,
  dependenDeFigura: figure,
  importablesLimpias: valid,
  porTipo: byKind,
  porMateria: bySubject,
}, null, 2));

if (outPath) {
  writeFileSync(outPath, JSON.stringify(questions, null, 2), 'utf8');
  console.log(`\nEscrito: ${outPath} (${questions.length} preguntas)`);
}
