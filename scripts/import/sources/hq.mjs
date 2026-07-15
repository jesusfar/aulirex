// Config de la fuente HQ APOYO UNIVERSITARIO (Química / Física).
// Solo importamos la seccion "EJERCICIOS DE EXAMENES ANTERIORES E INTEGRADORES"
// (la unica con opcion multiple + clave compacta). El resto del PDF es teoria y
// ejercicios abiertos (no MCQ).
// Formato:
//   · Preguntas numeradas "001-", "002-" (3 digitos + guion).
//   · Opciones "a)".."e)".
//   · Clave compacta al final tras "EXAMENES INTEGRADORES:" con tokens "N) L"
//     (L = A..E). Las respuestas numericas (problemas) se ignoran solas.
//   · "Ver solucion: http://hqlearning..." y pies de pagina a descartar.

export default {
  id: 'hq',
  answerStrategy: 'separate-key',
  sectionHeaderRe: /EJERCICIOS DE EX[AÁ]MENES ANTERIORES E INTEGRADORES\s*:/i,
  keyHeaderRe: /EX[AÁ]MENES INTEGRADORES\s*:/i,
  questionRe: /^\s*(\d{2,3})\s*-\s+(.*)$/,
  optionRe: /^\s*([a-eA-E])\s*[).]\s+(\S.*)$/,
  // Token de clave: "N) L" con L una letra A-E (evita respuestas numericas).
  keyTokenRe: /(\d{1,3})\s*\)\s*([A-Ea-e])(?![A-Za-z0-9])/g,
  stopBlockRe: null,
  footerRe:
    /ver soluci[oó]n|hqlearning|hq\s*learning|https?:\/\/|QU[IÍ]MICA PARA INGRESO|F[IÍ]SICA PARA INGRESO|HQ APOYO|P[aá]gina\s+\d+\s+de\s+\d+|^\s*\d{1,3}\s*$/i,
  figureRe:
    /esquema|gr[áa]fico|figura|imagen|siguiente(s)? (?:diagrama|dibujo|mol[eé]cula|estructura|compuesto|gr[áa]fico|esquema|figura|tabla|circuito)|se representa en (?:el|los) siguientes?|el gr[áa]fico|seg[uú]n el gr[áa]fico|el dibujo|la figura/i,
  subjectHint: 'quimica',
  forceSubject: 'quimica', // el PDF de HQ Química es 100% química
};
