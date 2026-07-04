import { db } from './db';
import type { Attempt } from '../../types/progress';

// Persiste un intento del alumno (offline-first).
export async function saveAttempt(attempt: Attempt): Promise<void> {
  await db.attempts.add({ ...attempt });
}

export async function getAllAttempts(): Promise<Attempt[]> {
  return db.attempts.orderBy('at').toArray();
}

export async function countAttempts(): Promise<number> {
  return db.attempts.count();
}

// Ids de ítems ya respondidos correctamente al menos una vez.
export async function solvedItemIds(): Promise<Set<string>> {
  const all = await db.attempts.toArray();
  return new Set(all.filter((a) => a.correct).map((a) => a.itemId));
}
