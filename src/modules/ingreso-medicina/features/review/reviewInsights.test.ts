import { describe, expect, it } from 'vitest';
import type { Item } from '../../../../types/content';
import type { Attempt, ReviewCard } from '../../../../types/progress';
import { buildReviewInsights } from './reviewInsights';

function item(id: string, topic: string): Item {
  return {
    id,
    institutions: ['UNC'],
    subject: 'biologia',
    block: 'membrana_plasmatica',
    topic,
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: `Pregunta ${id}`,
    choices: [
      { id: 'a', text: 'A', correct: true },
      { id: 'b', text: 'B', correct: false },
    ],
    explanation: 'Explicacion',
    source: 'original',
    version: 1,
    status: 'active',
  };
}

describe('buildReviewInsights', () => {
  it('closes active errors after a later correct answer and prioritizes weak topics', () => {
    const byId = new Map<string, Item>([
      ['closed-error', item('closed-error', 'transporte_pasivo')],
      ['open-error', item('open-error', 'transporte_activo')],
    ]);
    const attempts: Attempt[] = [
      {
        itemId: 'closed-error',
        itemVersion: 1,
        correct: false,
        givenAnswer: 'b',
        timeMs: 1200,
        at: 10,
      },
      {
        itemId: 'closed-error',
        itemVersion: 1,
        correct: true,
        givenAnswer: 'a',
        timeMs: 900,
        at: 20,
      },
      {
        itemId: 'open-error',
        itemVersion: 1,
        correct: false,
        givenAnswer: 'b',
        timeMs: 1100,
        at: 30,
      },
    ];
    const reviewCards: ReviewCard[] = [
      { itemId: 'closed-error', box: 2, dueAt: 1_000, lapses: 1 },
      { itemId: 'open-error', box: 1, dueAt: 500, lapses: 2 },
    ];

    const insights = buildReviewInsights({
      attempts,
      reviewCards,
      byId,
      now: 2_000,
    });

    expect(insights.dueCount).toBe(2);
    expect(insights.activeErrorCount).toBe(1);
    expect(insights.activeErrors[0].itemId).toBe('open-error');
    expect(insights.weakTopics[0].topic).toBe('transporte_activo');
  });
});
