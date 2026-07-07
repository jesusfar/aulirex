import type { Item, Track } from '../types/content';
import type { Attempt } from '../types/progress';

// Pronóstico "hoy sacarías ~X%": estima, por track, la probabilidad de acertar
// cada ítem practicado y promedia. Aplica una curva de olvido (los intentos
// viejos pesan menos) y un prior que arrastra hacia una retención base cuando la
// evidencia es escasa o antigua. Es una estimación, no una promesa (plan §Fase 4).

const DAY = 86_400_000;
const HALFLIFE_DAYS = 21; // a los 21 días un intento pesa la mitad
const FLOOR = 0.3; // retención base al olvidar (algo mejor que el azar de 5 opciones)
const PRIOR_W = 1; // peso del pseudo-intento base (no decae)

export interface TrackForecast {
  track: Track;
  expectedPct: number; // % esperado sobre lo practicado, con olvido aplicado
  practiced: number; // ítems distintos practicados de este track
  total: number; // ítems del track en el banco
  coverage: number; // practiced / total (%)
  confidence: 'baja' | 'media' | 'alta';
}

export interface Forecast {
  teorico: TrackForecast;
  practico: TrackForecast;
}

function retention(list: Attempt[], now: number): number {
  let weightedCorrect = FLOOR * PRIOR_W;
  let weight = PRIOR_W;
  for (const a of list) {
    const ageDays = Math.max(0, (now - a.at) / DAY);
    const w = Math.pow(0.5, ageDays / HALFLIFE_DAYS);
    weightedCorrect += w * (a.correct ? 1 : 0);
    weight += w;
  }
  return weightedCorrect / weight;
}

export function buildForecast(
  attempts: Attempt[],
  byId: Map<string, Item>,
  now = Date.now(),
): Forecast {
  const perItem = new Map<string, Attempt[]>();
  for (const a of attempts) {
    if (!byId.has(a.itemId)) continue;
    const list = perItem.get(a.itemId);
    if (list) list.push(a);
    else perItem.set(a.itemId, [a]);
  }

  const totals: Record<Track, number> = { teorico: 0, practico: 0 };
  for (const item of byId.values()) totals[item.track] += 1;

  const probs: Record<Track, number[]> = { teorico: [], practico: [] };
  for (const [id, list] of perItem) {
    const item = byId.get(id)!;
    probs[item.track].push(retention(list, now));
  }

  const mk = (track: Track): TrackForecast => {
    const ps = probs[track];
    const practiced = ps.length;
    const total = totals[track];
    const expectedPct = practiced
      ? Math.round((ps.reduce((s, p) => s + p, 0) / practiced) * 100)
      : 0;
    const coverage = total ? Math.round((practiced / total) * 100) : 0;
    const confidence: TrackForecast['confidence'] =
      practiced >= 20 && coverage >= 40
        ? 'alta'
        : practiced >= 8
          ? 'media'
          : 'baja';
    return { track, expectedPct, practiced, total, coverage, confidence };
  };

  return { teorico: mk('teorico'), practico: mk('practico') };
}
