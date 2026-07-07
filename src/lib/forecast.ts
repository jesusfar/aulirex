import type { Item, Track } from '../types/content';
import type { Attempt } from '../types/progress';
import { retentionOf } from './retention';

// Pronóstico "hoy sacarías ~X%": estima, por track, la probabilidad de acertar
// cada ítem practicado y promedia. Usa la curva de olvido compartida
// (lib/retention). Es una estimación, no una promesa (plan §Fase 4).

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
    probs[item.track].push(retentionOf(list, now));
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
