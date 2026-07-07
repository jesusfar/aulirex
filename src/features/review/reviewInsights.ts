import { misconceptionById } from '../../content';
import { dueQueue } from '../../lib/spaced-repetition/scheduler';
import { formatContentLabel } from '../../lib/contentLabels';
import type { Item, Subject } from '../../types/content';
import type { Attempt, ReviewCard } from '../../types/progress';

export interface ReviewTopicInsight {
  key: string;
  subject: Subject;
  block: string;
  topic: string;
  label: string;
  attempts: number;
  correct: number;
  wrong: number;
  activeErrors: number;
  dueCards: number;
  lapses: number;
  accuracy: number;
  score: number;
  lastWrongAt: number;
}

export interface ReviewErrorEntry {
  itemId: string;
  lastAt: number;
  timesWrong: number;
  chosenMisconception?: string;
  item: Item;
}

export interface ReviewMisconceptionGroup {
  key: string;
  name: string;
  remedy?: string;
  entries: ReviewErrorEntry[];
  totalWrong: number;
  lastAt: number;
}

export interface ReviewInsights {
  dueItems: Item[];
  dueCount: number;
  activeErrors: ReviewErrorEntry[];
  activeErrorCount: number;
  weakTopics: ReviewTopicInsight[];
  misconceptionGroups: ReviewMisconceptionGroup[];
  totalAttempts: number;
  totalCorrect: number;
  accuracy: number;
}

const SUBJECT_LABELS: Record<Subject, string> = {
  introduccion: 'Introduccion',
  biologia: 'Biologia',
  quimica: 'Quimica',
  fisica: 'Fisica',
  matematica: 'Matematica',
  comprension_textos: 'Comprension de textos',
  alfabetizacion: 'Alfabetizacion',
};

function topicKey(item: Item) {
  return `${item.subject}:${item.block}:${item.topic}`;
}

export function humanizeTopic(value: string) {
  return formatContentLabel(value);
}

function emptyTopic(item: Item): ReviewTopicInsight {
  return {
    key: topicKey(item),
    subject: item.subject,
    block: item.block,
    topic: item.topic,
    label: humanizeTopic(item.topic || item.block),
    attempts: 0,
    correct: 0,
    wrong: 0,
    activeErrors: 0,
    dueCards: 0,
    lapses: 0,
    accuracy: 100,
    score: 0,
    lastWrongAt: 0,
  };
}

function ensureTopic(
  byTopic: Map<string, ReviewTopicInsight>,
  item: Item,
): ReviewTopicInsight {
  const key = topicKey(item);
  const existing = byTopic.get(key);
  if (existing) return existing;
  const next = emptyTopic(item);
  byTopic.set(key, next);
  return next;
}

function activeErrorEntries(
  attempts: Attempt[],
  byId: Map<string, Item>,
): ReviewErrorEntry[] {
  const byItem = new Map<string, Omit<ReviewErrorEntry, 'item'>>();

  for (const attempt of [...attempts].sort((a, b) => a.at - b.at)) {
    if (!byId.has(attempt.itemId)) continue;

    if (attempt.correct) {
      byItem.delete(attempt.itemId);
      continue;
    }

    const prev = byItem.get(attempt.itemId);
    byItem.set(attempt.itemId, {
      itemId: attempt.itemId,
      lastAt: attempt.at,
      timesWrong: (prev?.timesWrong ?? 0) + 1,
      chosenMisconception: attempt.chosenMisconception ?? prev?.chosenMisconception,
    });
  }

  return [...byItem.values()]
    .map((entry) => {
      const item = byId.get(entry.itemId);
      return item ? { ...entry, item } : null;
    })
    .filter((entry): entry is ReviewErrorEntry => Boolean(entry))
    .sort((a, b) => b.lastAt - a.lastAt);
}

function buildMisconceptionGroups(entries: ReviewErrorEntry[]) {
  const groups = new Map<string, ReviewMisconceptionGroup>();

  for (const entry of entries) {
    const key = entry.chosenMisconception ?? '__sin__';
    const misconception = entry.chosenMisconception
      ? misconceptionById.get(entry.chosenMisconception)
      : undefined;

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        name: misconception?.name ?? 'Otros errores',
        remedy: misconception?.remedy,
        entries: [],
        totalWrong: 0,
        lastAt: 0,
      });
    }

    const group = groups.get(key)!;
    group.entries.push(entry);
    group.totalWrong += entry.timesWrong;
    group.lastAt = Math.max(group.lastAt, entry.lastAt);
  }

  return [...groups.values()].sort(
    (a, b) => b.totalWrong - a.totalWrong || b.lastAt - a.lastAt,
  );
}

export function buildReviewInsights({
  attempts,
  reviewCards,
  byId,
  now = Date.now(),
}: {
  attempts: Attempt[];
  reviewCards: ReviewCard[];
  byId: Map<string, Item>;
  now?: number;
}): ReviewInsights {
  const byTopic = new Map<string, ReviewTopicInsight>();
  const dueCards = dueQueue(reviewCards, now);
  const dueItems = dueCards
    .map((card) => byId.get(card.itemId))
    .filter((item): item is Item => Boolean(item));

  for (const attempt of attempts) {
    const item = byId.get(attempt.itemId);
    if (!item) continue;

    const topic = ensureTopic(byTopic, item);
    topic.attempts += 1;
    if (attempt.correct) {
      topic.correct += 1;
    } else {
      topic.wrong += 1;
      topic.lastWrongAt = Math.max(topic.lastWrongAt, attempt.at);
    }
  }

  for (const card of reviewCards) {
    const item = byId.get(card.itemId);
    if (!item) continue;
    const topic = ensureTopic(byTopic, item);
    topic.lapses += card.lapses;
  }

  for (const card of dueCards) {
    const item = byId.get(card.itemId);
    if (!item) continue;
    ensureTopic(byTopic, item).dueCards += 1;
  }

  const activeErrors = activeErrorEntries(attempts, byId);
  for (const entry of activeErrors) {
    ensureTopic(byTopic, entry.item).activeErrors += 1;
  }

  const weakTopics = [...byTopic.values()]
    .map((topic) => {
      const accuracy = topic.attempts
        ? Math.round((topic.correct / topic.attempts) * 100)
        : 100;
      const score =
        topic.activeErrors * 4 +
        topic.wrong * 2 +
        topic.lapses * 2 +
        topic.dueCards * 1.5 +
        (100 - accuracy) / 10 -
        topic.correct * 0.35;

      return {
        ...topic,
        accuracy,
        score: Math.max(0, score),
      };
    })
    .filter(
      (topic) =>
        topic.attempts > 0 ||
        topic.activeErrors > 0 ||
        topic.dueCards > 0 ||
        topic.lapses > 0,
    )
    .sort((a, b) => b.score - a.score || b.lastWrongAt - a.lastWrongAt)
    .slice(0, 8);

  const totalAttempts = attempts.length;
  const totalCorrect = attempts.filter((attempt) => attempt.correct).length;
  const accuracy = totalAttempts
    ? Math.round((totalCorrect / totalAttempts) * 100)
    : 0;

  return {
    dueItems,
    dueCount: dueItems.length,
    activeErrors,
    activeErrorCount: activeErrors.length,
    weakTopics,
    misconceptionGroups: buildMisconceptionGroups(activeErrors),
    totalAttempts,
    totalCorrect,
    accuracy,
  };
}

export function subjectLabel(subject: Subject) {
  return SUBJECT_LABELS[subject] ?? subject;
}
