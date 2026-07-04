// Estado del alumno persistido en IndexedDB (plan §6.2).

import type { Institution, Subject } from './content';

export interface Attempt {
  itemId: string;
  itemVersion: number;
  correct: boolean;
  givenAnswer: unknown;
  chosenMisconception?: string; // (v2)
  confidence?: 0 | 1 | 2; // (v2) calibración opcional
  timeMs: number;
  at: number;
}

export interface ReviewCard {
  itemId: string;
  box: 1 | 2 | 3 | 4 | 5;
  dueAt: number;
  lapses: number;
}

export interface Progress {
  targets: Institution[];
  examDate?: Partial<Record<Institution, number>>;
  xp: number;
  level: number;
  streak: number;
  lastActive: number;
  attempts: Attempt[];
  reviewQueue: ReviewCard[];
  errorLog: string[]; // itemIds fallados
  masteryByTopic: Record<string, number>; // 0..1
  abilityBySubject?: Record<Subject, number>; // (v2) diagnóstico
}
