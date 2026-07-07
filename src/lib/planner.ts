import type { Frequency, Subject, TopicNode } from '../types/content';
import type { TopicMastery } from './mastery';
import { topicKey } from './mastery';

// Planificador "qué estudiar hoy": cruza el dominio por tema con el grafo de
// prerrequisitos. Un tema está listo si sus prerrequisitos ya están sólidos;
// bloqueado si arrastra un prerrequisito flojo; dominado si lo tenés afianzado.

export const MASTERED = 0.75; // dominio para dar un tema por afianzado
export const SOLID = 0.6; // dominio mínimo para considerar un prerrequisito ok
const MIN_ATTEMPTS = 3; // evidencia mínima para "dominado"

const FREQ_W: Record<Frequency, number> = { alta: 2, media: 1, baja: 0.5 };

export type TopicState = 'mastered' | 'ready' | 'blocked';

export interface TopicStatus {
  topic: string;
  subject: Subject;
  state: TopicState;
  started: boolean; // tiene algún intento
  mastery: number; // 0..1
  attempts: number;
  blockedBy: string[]; // prerrequisitos flojos
  unlocks: number; // cuántos temas dependen (transitivamente) de este
  frequency: Frequency;
  score: number; // urgencia de estudiarlo hoy (mayor = más urgente)
}

export interface StudyPlan {
  statuses: TopicStatus[];
  recommended: TopicStatus[];
}

function transitiveUnlocks(nodes: TopicNode[]): Map<string, number> {
  const dependents = new Map<string, string[]>();
  for (const node of nodes) {
    for (const pre of node.prereqs) {
      const list = dependents.get(pre) ?? [];
      list.push(node.topic);
      dependents.set(pre, list);
    }
  }
  const counts = new Map<string, number>();
  for (const node of nodes) {
    const seen = new Set<string>();
    const stack = [...(dependents.get(node.topic) ?? [])];
    while (stack.length) {
      const t = stack.pop()!;
      if (seen.has(t)) continue;
      seen.add(t);
      stack.push(...(dependents.get(t) ?? []));
    }
    counts.set(node.topic, seen.size);
  }
  return counts;
}

export function buildStudyPlan(
  nodes: TopicNode[],
  mastery: Map<string, TopicMastery>,
  limit = 6,
): StudyPlan {
  const unlocks = transitiveUnlocks(nodes);

  const masteryOf = (subject: Subject, topic: string) =>
    mastery.get(topicKey(subject, topic));

  const isSolid = (subject: Subject, topic: string) => {
    const m = masteryOf(subject, topic);
    return Boolean(m && m.attempts > 0 && m.mastery >= SOLID);
  };

  const statuses: TopicStatus[] = nodes.map((node) => {
    const m = masteryOf(node.subject, node.topic);
    const attempts = m?.attempts ?? 0;
    const masteryVal = m?.mastery ?? 0;
    const started = attempts > 0;
    const blockedBy = node.prereqs.filter((p) => !isSolid(node.subject, p));

    let state: TopicState;
    if (masteryVal >= MASTERED && attempts >= MIN_ATTEMPTS) state = 'mastered';
    else if (blockedBy.length > 0) state = 'blocked';
    else state = 'ready';

    // Urgencia: alta frecuencia + muchos temas que desbloquea + poco dominio.
    const gap = started ? MASTERED - masteryVal : 0.5; // sin practicar → hueco medio
    const score =
      FREQ_W[node.frequency] +
      (unlocks.get(node.topic) ?? 0) * 0.5 +
      Math.max(0, gap) * 2;

    return {
      topic: node.topic,
      subject: node.subject,
      state,
      started,
      mastery: masteryVal,
      attempts,
      blockedBy,
      unlocks: unlocks.get(node.topic) ?? 0,
      frequency: node.frequency,
      score,
    };
  });

  const recommended = statuses
    .filter((s) => s.state === 'ready')
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { statuses, recommended };
}
