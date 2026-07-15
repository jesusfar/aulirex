// Normalización de texto compartida por los conversores del banco. Repara los
// artefactos típicos de pdftotext / OCR: notación científica aplanada,
// subíndices/superíndices químicos, isótopos, caracteres de fuente Symbol y
// unidades con exponente. Extraído para reutilizar entre fuentes sin duplicar.

const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const SUB = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };

// Notación científica: "3,01 .1023" -> "3,01×10²³".
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
const DIATOM = /^(O2|O3|N2|H2|F2|Cl2|Br2|I2|P4|S8)$/;
const FORMULA_TOKEN_RE = /[A-Za-z0-9()]*[A-Za-z][A-Za-z0-9()]*/g;
const NOT_SUBSCRIPT = new Set(['H2A', 'H2B']);
const FORCE_SUBSCRIPT = new Set(['B12']);
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

// Isótopos: número másico como superíndice-prefijo ("35Cl" -> "³⁵Cl").
const EL2 =
  'He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Ag|Cd|Sn|Sb|Te|Xe|Ba|Pt|Au|Hg|Pb|Bi|Ra|Th';
const ISOTOPE_RE = new RegExp('(?<![\\d.,])(\\d{1,3})(' + EL2 + ')(?![A-Za-z0-9])', 'g');
function fixIsotopes(t) {
  return typeof t === 'string'
    ? t.replace(ISOTOPE_RE, (_, n, el) => [...n].map((c) => SUP[c] ?? c).join('') + el)
    : t;
}

// Caracteres de fuente Symbol que pdftotext dejó como uso privado (F0xx).
const CHAR_MAP = new Map(
  [
    [0xf03d, '='], [0xf02d, '−'], [0xf02b, '+'], [0xf0b4, '×'],
    [0xf0b7, '•'], [0xf0a7, '•'], [0xf0e0, '→'],
  ].map(([cp, v]) => [String.fromCodePoint(cp), v]),
);
function fixChars(t) {
  if (typeof t !== 'string') return t;
  for (const [k, v] of CHAR_MAP) t = t.split(k).join(v);
  t = t.replace(/[-]/g, ' '); // otros de uso privado → fuera
  t = t.replace(/\s*-{4,}\s*(?:→\s*)?/g, ' → '); // flecha de reacción como run de guiones
  return t.replace(/→\s*→/g, '→').replace(/\s{2,}/g, ' ').trim();
}

// Unidades con exponente aplanado: cm3→cm³, m/s2→m/s².
function fixUnits(t) {
  if (typeof t !== 'string') return t;
  return t
    .replace(/\b(cm|dm|mm|km|nm|µm|μm)([23])\b/g, (_, u, e) => u + (e === '2' ? '²' : '³'))
    .replace(/\/s([23])\b/g, (_, e) => '/s' + (e === '2' ? '²' : '³'))
    .replace(/([0-9/]\s*)m([23])\b/g, (_, pre, e) => pre + 'm' + (e === '2' ? '²' : '³'));
}

// Símbolos que delatan corrupción irreparable (separadores Symbol fusionando
// preguntas, o carácter perdido de reemplazo).
export const CORRUPT_RE = new RegExp(
  '[' + [0xf0dc, 0xf046, 0xf04c, 0xfffd].map((c) => String.fromCodePoint(c)).join('') + ']',
);

export const normalize = (t) => fixFormulas(fixIsotopes(fixSci(fixUnits(fixChars(t)))));

// Texto con encoding roto (PDF sin ToUnicode): muchas palabras cortadas en
// fragmentos de 1-2 letras que NO son palabras ("Que ep ese to la a tidad de i
// dividuos ue se e fe a o"). Ignora stopwords del español y símbolos de fórmula
// (1-2 mayúsculas) para no confundir con química legítima. Umbral calibrado 0.18.
const STOP = new Set(
  'el la los las un una unos unas de del al a ante con en para por segun según sin so sobre tras y o u e ni que se su sus lo le les me te nos os es son fue ser mas más si no ya he ha han hay dos tres uno como cual esta este esa ese eso mi tu al da va'.split(' '),
);
export function looksCorrupt(stem) {
  const toks = (stem || '').split(/\s+/).filter(Boolean);
  if (toks.length < 10) return false;
  let susp = 0;
  for (const t of toks) {
    const a = t.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ]/g, '');
    if (a.length === 0 || a.length > 2) continue;
    if (STOP.has(a.toLowerCase())) continue;
    if (/^[A-Z]{1,2}$/.test(a)) continue;
    susp++;
  }
  return susp / toks.length > 0.18;
}
