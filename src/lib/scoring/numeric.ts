import type { NumericAnswer } from '../../types/content';

// Corrección numérica con tolerancia absoluta o relativa (plan §7).
export function scoreNumeric(given: number, a: NumericAnswer): boolean {
  const diff = Math.abs(given - a.value);
  return a.toleranceMode === 'abs'
    ? diff <= a.tolerance
    : diff <= Math.abs(a.value) * a.tolerance;
}
