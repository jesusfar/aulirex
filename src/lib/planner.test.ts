import { describe, expect, it } from 'vitest';
import type { Subject, TopicNode } from '../types/content';
import { buildStudyPlan } from './planner';
import { topicKey, type TopicMastery } from './mastery';

function node(topic: string, prereqs: string[]): TopicNode {
  return { topic, subject: 'fisica', frequency: 'alta', prereqs };
}

function mastery(
  entries: Array<[string, number, number]>,
): Map<string, TopicMastery> {
  const m = new Map<string, TopicMastery>();
  const subject: Subject = 'fisica';
  for (const [topic, mval, attempts] of entries) {
    m.set(topicKey(subject, topic), {
      key: topicKey(subject, topic),
      subject,
      topic,
      mastery: mval,
      attempts,
      correct: Math.round(mval * attempts),
    });
  }
  return m;
}

// a → b → c (c depende de b, b depende de a)
const nodes = [node('a', []), node('b', ['a']), node('c', ['b'])];

describe('buildStudyPlan', () => {
  it('marca bloqueado un tema cuyo prerrequisito está flojo', () => {
    const plan = buildStudyPlan(nodes, mastery([['a', 0.2, 4]]));
    const c = plan.statuses.find((s) => s.topic === 'c')!;
    const b = plan.statuses.find((s) => s.topic === 'b')!;
    expect(b.state).toBe('blocked');
    expect(b.blockedBy).toContain('a');
    expect(c.state).toBe('blocked');
  });

  it('desbloquea el siguiente tema cuando el prerrequisito queda sólido', () => {
    const plan = buildStudyPlan(nodes, mastery([['a', 0.8, 4]]));
    const b = plan.statuses.find((s) => s.topic === 'b')!;
    expect(b.state).toBe('ready');
    expect(b.blockedBy).toHaveLength(0);
  });

  it('da por dominado un tema con dominio alto y evidencia suficiente', () => {
    const plan = buildStudyPlan(nodes, mastery([['a', 0.9, 5]]));
    const a = plan.statuses.find((s) => s.topic === 'a')!;
    expect(a.state).toBe('mastered');
  });

  it('cuenta cuántos temas desbloquea (transitividad)', () => {
    const plan = buildStudyPlan(nodes, mastery([]));
    const a = plan.statuses.find((s) => s.topic === 'a')!;
    expect(a.unlocks).toBe(2); // b y c
  });

  it('recomienda solo temas listos y no los bloqueados', () => {
    const plan = buildStudyPlan(nodes, mastery([['a', 0.3, 2]]));
    expect(plan.recommended.every((s) => s.state === 'ready')).toBe(true);
    expect(plan.recommended.some((s) => s.topic === 'a')).toBe(true);
    expect(plan.recommended.some((s) => s.topic === 'c')).toBe(false);
  });
});
