const LOWERCASE_WORDS = new Set(['y', 'o']);

export function formatContentLabel(value: string) {
  return value
    .replaceAll('_', ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => {
      const lower = word.toLocaleLowerCase('es-AR');
      if (LOWERCASE_WORDS.has(lower)) return lower;
      return lower.replace(/^\p{L}/u, (letter) => letter.toLocaleUpperCase('es-AR'));
    })
    .join(' ');
}
