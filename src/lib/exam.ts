import type { Item } from '../types/content';
import { buildTestDeck } from './deck';

// Simulacro tipo CONEUM: se aprueba por track (teórico y práctico) por separado,
// con umbral del 60 % en CADA uno (plan §Fase 4).
export const PASS_THRESHOLD = 60;

export interface Simulacro {
  items: Item[]; // teóricas primero, luego prácticas
  teoricoIds: Set<string>;
  practicoIds: Set<string>;
}

// Arma el examen: nT teóricas + nP prácticas, al azar y estratificadas por tema,
// sin repetir. Si no hay suficientes de un track, usa las que haya.
export function buildSimulacro(all: Item[], nT = 25, nP = 25): Simulacro {
  const teorico = buildTestDeck(
    all.filter((i) => i.track === 'teorico'),
    nT,
  );
  const practico = buildTestDeck(
    all.filter((i) => i.track === 'practico'),
    nP,
  );
  return {
    items: [...teorico, ...practico],
    teoricoIds: new Set(teorico.map((i) => i.id)),
    practicoIds: new Set(practico.map((i) => i.id)),
  };
}

export interface TrackScore {
  correct: number;
  total: number;
  pct: number;
  passed: boolean;
}
export interface ExamResult {
  teorico: TrackScore;
  practico: TrackScore;
  passed: boolean; // aprobado sólo si AMBOS tracks ≥ 60 %
}

export function scoreExam(
  sim: Simulacro,
  correctById: Record<string, boolean>,
): ExamResult {
  const tally = (ids: Set<string>): TrackScore => {
    let correct = 0;
    for (const id of ids) if (correctById[id]) correct++;
    const total = ids.size;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    return { correct, total, pct, passed: pct >= PASS_THRESHOLD };
  };
  const teorico = tally(sim.teoricoIds);
  const practico = tally(sim.practicoIds);
  return { teorico, practico, passed: teorico.passed && practico.passed };
}
