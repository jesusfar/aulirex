import { describe, expect, it } from 'vitest';
import type { Item, Subject } from '../types/content';
import {
  applyResponse,
  currentSubject,
  estimateAbility,
  initDiagnostic,
  isDone,
  pickNext,
} from './diagnostic';

function item(id: string, subject: Subject, difficulty: 1 | 2 | 3): Item {
  return {
    id,
    institutions: ['UNC'],
    subject,
    block: 'b',
    topic: 't',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty,
    stem: id,
    choices: [
      { id: 'a', text: 'A', correct: true },
      { id: 'b', text: 'B', correct: false },
    ],
    explanation: 'x',
    source: 'original',
    version: 1,
    status: 'active',
  };
}

const pool: Item[] = [
  item('b1', 'biologia', 1),
  item('b2', 'biologia', 2),
  item('b3', 'biologia', 3),
  item('f1', 'fisica', 1),
  item('f2', 'fisica', 2),
  item('f3', 'fisica', 3),
];

describe('diagnóstico adaptativo', () => {
  it('recorre las materias en orden respetando el cupo', () => {
    let state = initDiagnostic(['biologia', 'fisica'], 2);
    expect(currentSubject(state)).toBe('biologia');
    for (let i = 0; i < 2; i++) {
      const it = pickNext(state, pool)!;
      state = applyResponse(state, it, true);
    }
    expect(currentSubject(state)).toBe('fisica');
  });

  it('sube la dificultad tras aciertos y termina en el total', () => {
    let state = initDiagnostic(['biologia'], 3);
    const seen: number[] = [];
    while (!isDone(state)) {
      const it = pickNext(state, pool)!;
      seen.push(it.difficulty);
      state = applyResponse(state, it, true);
    }
    expect(state.responses).toHaveLength(3);
    expect(seen[seen.length - 1]).toBeGreaterThanOrEqual(seen[0]);
  });

  it('estima mayor habilidad cuando se acierta lo difícil', () => {
    let good = initDiagnostic(['fisica'], 3);
    let bad = initDiagnostic(['fisica'], 3);
    for (const it of [item('f3', 'fisica', 3)]) {
      good = applyResponse(good, it, true);
      bad = applyResponse(bad, it, false);
    }
    expect(estimateAbility(good).ability.fisica).toBeGreaterThan(
      estimateAbility(bad).ability.fisica ?? 0,
    );
  });

  it('no repite ítems ya preguntados', () => {
    let state = initDiagnostic(['biologia'], 3);
    const ids = new Set<string>();
    while (!isDone(state)) {
      const it = pickNext(state, pool)!;
      expect(ids.has(it.id)).toBe(false);
      ids.add(it.id);
      state = applyResponse(state, it, true);
    }
  });
});
