import { db, type PlayerProgress } from './db';
import type { Attempt, ReviewCard } from '../../types/progress';
import { newCard, schedule } from '../spaced-repetition/scheduler';
import { updateStreak, xpForAttempt } from '../gamification';
import type { Item } from '../../types/content';

const PROGRESS_ID = 'me';

export async function getProgress(): Promise<PlayerProgress> {
  const p = await db.progress.get(PROGRESS_ID);
  return p ?? { id: PROGRESS_ID, xp: 0, streak: 0, lastActive: 0 };
}

// Registra un intento completo: persiste el intento, reprograma la card de
// repaso (Leitner) y actualiza XP + racha. Todo en una transacción.
export async function recordAttempt(input: {
  item: Item;
  correct: boolean;
  givenAnswer: unknown;
  chosenMisconception?: string;
  timeMs: number;
  now?: number;
}): Promise<{ xpGained: number; progress: PlayerProgress }> {
  const now = input.now ?? Date.now();
  const attempt: Attempt = {
    itemId: input.item.id,
    itemVersion: input.item.version,
    correct: input.correct,
    givenAnswer: input.givenAnswer,
    chosenMisconception: input.chosenMisconception,
    timeMs: input.timeMs,
    at: now,
  };
  const xpGained = xpForAttempt({
    correct: input.correct,
    difficulty: input.item.difficulty,
    frequency: input.item.frequency,
  });

  let progress!: PlayerProgress;
  await db.transaction('rw', db.attempts, db.reviewCards, db.progress, async () => {
    await db.attempts.add({ ...attempt });

    const existing = await db.reviewCards.get(input.item.id);
    const card = schedule(existing ?? newCard(input.item.id, now), input.correct, now);
    await db.reviewCards.put(card);

    const prev = await getProgress();
    progress = {
      id: PROGRESS_ID,
      xp: prev.xp + xpGained,
      streak: updateStreak(prev.streak, prev.lastActive, now),
      lastActive: now,
    };
    await db.progress.put(progress);
  });

  return { xpGained, progress };
}

export async function getReviewCards(): Promise<ReviewCard[]> {
  return db.reviewCards.toArray();
}

// Cuaderno de errores: ítems fallados agrupados por misconcepción elegida.
export interface ErrorEntry {
  itemId: string;
  lastAt: number;
  timesWrong: number;
  chosenMisconception?: string;
}

export async function getErrorLog(): Promise<ErrorEntry[]> {
  const attempts = await db.attempts.toArray();
  const byItem = new Map<string, ErrorEntry>();
  for (const a of attempts) {
    if (a.correct) {
      byItem.delete(a.itemId); // un acierto posterior lo saca del cuaderno
      continue;
    }
    const prev = byItem.get(a.itemId);
    byItem.set(a.itemId, {
      itemId: a.itemId,
      lastAt: a.at,
      timesWrong: (prev?.timesWrong ?? 0) + 1,
      chosenMisconception: a.chosenMisconception ?? prev?.chosenMisconception,
    });
  }
  return [...byItem.values()].sort((a, b) => b.lastAt - a.lastAt);
}
