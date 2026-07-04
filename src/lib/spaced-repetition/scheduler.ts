import type { ReviewCard } from '../../types/progress';

// Sistema de Leitner con 5 cajas (plan §Fase 2). Un acierto promueve la card a
// la caja siguiente (intervalo más largo); un error la devuelve a la caja 1 y
// cuenta un lapso. La fecha de repaso (dueAt) se calcula con el intervalo de la
// caja destino. Lógica pura y determinista para poder testearla sin reloj real.

export type Box = 1 | 2 | 3 | 4 | 5;

const DAY = 24 * 60 * 60 * 1000;

// Intervalos por caja, en días. Caja 1 vuelve el mismo día (repaso corto).
export const BOX_INTERVAL_DAYS: Record<Box, number> = {
  1: 0,
  2: 1,
  3: 3,
  4: 7,
  5: 16,
};

export function newCard(itemId: string, now = Date.now()): ReviewCard {
  return { itemId, box: 1, dueAt: now, lapses: 0 };
}

// Devuelve una card NUEVA (inmutable) con la caja y el dueAt actualizados.
export function schedule(
  card: ReviewCard,
  correct: boolean,
  now = Date.now(),
): ReviewCard {
  if (correct) {
    const box = Math.min(5, card.box + 1) as Box;
    return { ...card, box, dueAt: now + BOX_INTERVAL_DAYS[box] * DAY };
  }
  return {
    ...card,
    box: 1,
    dueAt: now + BOX_INTERVAL_DAYS[1] * DAY,
    lapses: card.lapses + 1,
  };
}

export function isDue(card: ReviewCard, now = Date.now()): boolean {
  return card.dueAt <= now;
}

// Cola de repaso: cards vencidas, primero las de caja más baja (más frágiles) y
// dentro de cada caja, las más atrasadas.
export function dueQueue(cards: ReviewCard[], now = Date.now()): ReviewCard[] {
  return cards
    .filter((c) => isDue(c, now))
    .sort((a, b) => a.box - b.box || a.dueAt - b.dueAt);
}
