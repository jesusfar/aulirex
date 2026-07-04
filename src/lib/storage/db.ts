import Dexie, { type EntityTable } from 'dexie';
import type { Attempt, ReviewCard } from '../../types/progress';

// Registro persistido de un intento (con id autoincremental para Dexie).
export interface StoredAttempt extends Attempt {
  id?: number;
}

// Progreso del jugador: una única fila (id fijo = 'me') con XP, racha y nivel.
export interface PlayerProgress {
  id: string; // siempre 'me'
  xp: number;
  streak: number;
  lastActive: number;
}

// Offline-first: todo el progreso vive acá. Las tablas se agregan versión a
// versión (NUNCA reusar un número de versión ya publicado: Dexie no re-migra).
export const db = new Dexie('aulirex') as Dexie & {
  attempts: EntityTable<StoredAttempt, 'id'>;
  reviewCards: EntityTable<ReviewCard, 'itemId'>;
  progress: EntityTable<PlayerProgress, 'id'>;
};

db.version(1).stores({
  // índices para consultar por ítem y por fecha (booleanos no se indexan en IndexedDB)
  attempts: '++id, itemId, at',
});

// v2 (Fase 2): repaso espaciado Leitner + progreso de gamificación.
db.version(2).stores({
  attempts: '++id, itemId, at',
  reviewCards: 'itemId, box, dueAt', // clave primaria = itemId
  progress: 'id',
});
