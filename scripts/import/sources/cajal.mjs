// Config de la fuente CAJAL (exámenes/resoluciones "tradicional").
// Formato observado:
//   · Preguntas numeradas "N-" o "N.-" (guion), no "N." como QUANTUM.
//   · Opciones "a)" / "a-" / "a.-" / "a." (delimitador variable).
//   · Respuesta marcada EN LÍNEA con "***" (a veces "****") sobre la opción
//     correcta, seguida de una explicación entre paréntesis.
//   · Fallback: bloque "Resolución:" con "Opción correcta: X)".
//   · Pies/marcas de imprenta a descartar entre páginas.

export default {
  id: 'caj',
  answerStrategy: 'inline-star',
  // "12-" o "12.-" al inicio de línea.
  questionRe: /^\s*(\d{1,3})\s*\.?-\s+(.*)$/,
  // a) / a- / a. / a.- (letra + delimitador + opcional . o - + espacio + texto).
  optionRe: /^\s*([a-eA-E])\s*[).\-](?:[.\-])?\s+(\S.*)$/,
  // Marca de respuesta correcta en línea (3 o más asteriscos).
  starRe: /\*{3,}/,
  // Fallback textual de clave dentro de "Resolución:".
  keyLineRe: /opci[oó]n correcta\s*:?\s*([a-eA-E])\s*[).]?/i,
  // Corta el bloque de opciones (empieza la resolución/explicación).
  stopBlockRe: /^\s*(resoluci[oó]n\s*:|justificaci[oó]n\s*:)/i,
  // Líneas de pie/marca de imprenta que no son contenido.
  footerRe:
    /CAJAL TRADICIONAL|EXAMEN N°\s*\d+\s*[–-]\s*MEDICINA|WALLY IMPRESIONES|IMPRESIONES SALTA|Instagram\s*:|\+54\s*9|Zona (Norte|Oeste)|B°\s|FILADD\.COM|^\s*\d{1,3}\s*$/i,
  // Referencia a figura → se marca dependsOnFigure (se difiere, no se importa).
  figureRe:
    /esquema|gr[áa]fico|figura|imagen|siguiente(s)? (?:diagrama|dibujo|mol[eé]cula|estructura|compuesto|gr[áa]fico|esquema|figura|tabla|circuito)|se representa en los siguientes|el gr[áa]fico de|seg[uú]n el gr[áa]fico|el dibujo/i,
  subjectHint: 'mixto',
};
