import type { Attempt } from '../types/progress';

// Modelo de retención compartido (curva de olvido). Un intento pierde peso a
// medida que envejece: a los HALFLIFE_DAYS vale la mitad. Sobre esa evidencia
// decaída se estima la probabilidad de acertar hoy, con un prior que arrastra
// hacia una retención base cuando hay poca evidencia o es antigua.
// Lo usan el pronóstico (por ítem/track) y el mastery por tema.

export const DAY = 86_400_000;
export const HALFLIFE_DAYS = 21;
export const FLOOR = 0.3; // retención base (algo mejor que el azar de 5 opciones)
export const PRIOR_W = 1; // peso del pseudo-intento base (no decae)

// Peso de un intento según su antigüedad: 1 si es de ahora, 0.5 a los 21 días…
export function decayWeight(at: number, now: number): number {
  const ageDays = Math.max(0, (now - at) / DAY);
  return Math.pow(0.5, ageDays / HALFLIFE_DAYS);
}

// Probabilidad estimada de acertar hoy dado un historial de intentos.
export function retentionOf(attempts: Attempt[], now: number): number {
  let weightedCorrect = FLOOR * PRIOR_W;
  let weight = PRIOR_W;
  for (const a of attempts) {
    const w = decayWeight(a.at, now);
    weightedCorrect += w * (a.correct ? 1 : 0);
    weight += w;
  }
  return weightedCorrect / weight;
}

// Retención pura de una sola card ya consolidada, en función de los días desde
// el último repaso frente a su intervalo objetivo (para proyectar el olvido).
export function projectedRetention(daysSince: number, intervalDays: number): number {
  if (intervalDays <= 0) return Math.pow(0.5, daysSince / HALFLIFE_DAYS);
  // estabilidad ~ intervalo de la caja: cuanto más alta la caja, más lento olvida
  return Math.pow(0.5, daysSince / Math.max(1, intervalDays));
}
