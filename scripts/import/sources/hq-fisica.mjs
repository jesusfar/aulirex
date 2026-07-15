// Config de HQ APOYO — FÍSICA (sección integradora).
// Ojo: es una versión DEMO (parte de los integradores están bloqueados) y el
// texto de algunos enunciados viene con encoding roto → el guardia looksCorrupt
// de convert-source los descarta.
// Estructura:
//   · Preguntas numeradas "N)" (1..194 CONTINUO) entre el encabezado integrador
//     y el mensaje de candado ("...desbloquearlos con la versión FULL").
//   · La clave correcta es el bloque B "EJERCICIOS INTEGRADORES Y EXÁMENES"
//     (también 1..194). El bloque A anterior son claves de TP con numeración que
//     reinicia — por eso acotamos la región de preguntas con sectionEndRe.

export default {
  id: 'hqf',
  answerStrategy: 'separate-key',
  // Anclado a fin de línea para NO matchear la entrada del índice ("...155").
  sectionHeaderRe: /EJERCITACI[OÓ]N DE EX[AÁ]MENES Y EJERCICIOS INTEGRADORES\s*:\s*$/i,
  sectionEndRe: /desbloquear\w*\s+con la versi[oó]n FULL/i,
  keyHeaderRe: /EJERCICIOS INTEGRADORES Y EX[AÁ]MENES/i,
  questionRe: /^\s*(\d{1,3})\s*\)\s+(.*)$/,
  optionRe: /^\s*([a-eA-E])\s*[).]\s+(\S.*)$/,
  keyTokenRe: /(\d{1,3})\s*\)\s*([A-Ea-e])(?![A-Za-z0-9])/g,
  stopBlockRe: null,
  footerRe:
    /ver soluci[oó]n|hqlearning|hq\s*learning|https?:\/\/|F[IÍ]SICA PARA INGRESO|HQ APOYO|CURSO COMPLETO|VERSION COMPLETA|P[aá]gina\s+\d+\s+de\s+\d+|^\s*\d{1,3}\s*$/i,
  figureRe:
    /esquema|gr[áa]fico|figura|imagen|siguiente(s)? (?:diagrama|dibujo|mol[eé]cula|estructura|compuesto|gr[áa]fico|esquema|figura|tabla|circuito)|se representa en (?:el|los) siguientes?|el gr[áa]fico|seg[uú]n el gr[áa]fico|el dibujo|la figura|el circuito/i,
  subjectHint: 'fisica',
  forceSubject: 'fisica', // el PDF de HQ Física es física (incluye biofísica)
};
