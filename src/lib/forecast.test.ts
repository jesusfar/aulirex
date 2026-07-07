import { describe, expect, it } from 'vitest';
import type { Item, Track } from '../types/content';
import type { Attempt } from '../types/progress';
import { buildForecast } from './forecast';

function item(id: string, track: Track): Item {
  return {
    id,
    institutions: ['UNC'],
    subject: track === 'teorico' ? 'biologia' : 'fisica',
    block: 'b',
    topic: 't',
    track,
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
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

function attempt(itemId: string, correct: boolean, at: number): Attempt {
  return { itemId, itemVersion: 1, correct, givenAnswer: 'a', timeMs: 1000, at };
}

const NOW = 1_000 * 86_400_000; // día 1000 en ms

describe('buildForecast', () => {
  const byId = new Map<string, Item>([
    ['t1', item('t1', 'teorico')],
    ['t2', item('t2', 'teorico')],
    ['p1', item('p1', 'practico')],
    ['p2', item('p2', 'practico')],
  ]);

  it('cuenta cobertura y total por track', () => {
    const f = buildForecast([attempt('t1', true, NOW)], byId, NOW);
    expect(f.teorico.total).toBe(2);
    expect(f.teorico.practiced).toBe(1);
    expect(f.teorico.coverage).toBe(50);
    expect(f.practico.practiced).toBe(0);
    expect(f.practico.expectedPct).toBe(0);
  });

  it('aciertos recientes elevan el % esperado por encima de fallos recientes', () => {
    const good = buildForecast([attempt('t1', true, NOW)], byId, NOW).teorico
      .expectedPct;
    const bad = buildForecast([attempt('t1', false, NOW)], byId, NOW).teorico
      .expectedPct;
    expect(good).toBeGreaterThan(bad);
  });

  it('aplica olvido: un acierto viejo pesa menos que uno reciente', () => {
    const recent = buildForecast([attempt('t1', true, NOW)], byId, NOW).teorico
      .expectedPct;
    const old = buildForecast(
      [attempt('t1', true, NOW - 90 * 86_400_000)],
      byId,
      NOW,
    ).teorico.expectedPct;
    expect(old).toBeLessThan(recent);
  });

  it('marca confianza alta solo con muchos ítems practicados y buena cobertura', () => {
    const big = new Map<string, Item>();
    const attempts: Attempt[] = [];
    for (let i = 0; i < 50; i++) {
      const id = `x${i}`;
      big.set(id, item(id, 'teorico'));
      attempts.push(attempt(id, true, NOW));
    }
    const f = buildForecast(attempts, big, NOW);
    expect(f.teorico.confidence).toBe('alta');
  });
});
