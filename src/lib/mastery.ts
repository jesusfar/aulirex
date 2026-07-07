import type { Item, Subject } from '../types/content';
import type { Attempt } from '../types/progress';
import { retentionOf } from './retention';

// Dominio (0..1) por tema, estimado sobre los intentos de ese tema con la curva
// de olvido compartida. Alimenta el planificador y el desglose por materia.

export interface TopicMastery {
  key: string; // `${subject}::${topic}`
  subject: Subject;
  topic: string;
  mastery: number; // 0..1 (retención estimada hoy)
  attempts: number;
  correct: number;
}

export function topicKey(subject: Subject, topic: string): string {
  return `${subject}::${topic}`;
}

export function masteryByTopic(
  attempts: Attempt[],
  byId: Map<string, Item>,
  now = Date.now(),
): Map<string, TopicMastery> {
  const grouped = new Map<string, { subject: Subject; topic: string; list: Attempt[]; correct: number }>();

  for (const a of attempts) {
    const item = byId.get(a.itemId);
    if (!item) continue;
    const key = topicKey(item.subject, item.topic);
    const g = grouped.get(key);
    if (g) {
      g.list.push(a);
      if (a.correct) g.correct += 1;
    } else {
      grouped.set(key, {
        subject: item.subject,
        topic: item.topic,
        list: [a],
        correct: a.correct ? 1 : 0,
      });
    }
  }

  const out = new Map<string, TopicMastery>();
  for (const [key, g] of grouped) {
    out.set(key, {
      key,
      subject: g.subject,
      topic: g.topic,
      mastery: retentionOf(g.list, now),
      attempts: g.list.length,
      correct: g.correct,
    });
  }
  return out;
}

export interface SubjectMastery {
  subject: Subject;
  mastery: number; // 0..1 promedio ponderado por intentos
  attempts: number;
  topics: number; // temas practicados
}

// Resumen por materia (promedio ponderado por intentos de los temas tocados).
export function masteryBySubject(
  byTopic: Map<string, TopicMastery>,
): Map<Subject, SubjectMastery> {
  const acc = new Map<Subject, { wSum: number; w: number; attempts: number; topics: number }>();
  for (const t of byTopic.values()) {
    const a = acc.get(t.subject) ?? { wSum: 0, w: 0, attempts: 0, topics: 0 };
    a.wSum += t.mastery * t.attempts;
    a.w += t.attempts;
    a.attempts += t.attempts;
    a.topics += 1;
    acc.set(t.subject, a);
  }
  const out = new Map<Subject, SubjectMastery>();
  for (const [subject, a] of acc) {
    out.set(subject, {
      subject,
      mastery: a.w ? a.wSum / a.w : 0,
      attempts: a.attempts,
      topics: a.topics,
    });
  }
  return out;
}
