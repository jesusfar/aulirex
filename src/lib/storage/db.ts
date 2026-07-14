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

export type AulirexDB = Dexie & {
  attempts: EntityTable<StoredAttempt, 'id'>;
  reviewCards: EntityTable<ReviewCard, 'itemId'>;
  progress: EntityTable<PlayerProgress, 'id'>;
};

// Offline-first: cada módulo tiene su PROPIA base, así el progreso (XP, racha,
// repaso, intentos) NO se comparte entre módulos. Las tablas se agregan versión
// a versión (NUNCA reusar un número de versión ya publicado: Dexie no re-migra).
function createDb(name: string): AulirexDB {
  const instance = new Dexie(name) as AulirexDB;

  instance.version(1).stores({
    // índices para consultar por ítem y por fecha (los booleanos no se indexan)
    attempts: '++id, itemId, at',
  });

  // v2 (Fase 2): repaso espaciado Leitner + progreso de gamificación.
  instance.version(2).stores({
    attempts: '++id, itemId, at',
    reviewCards: 'itemId, box, dueAt', // clave primaria = itemId
    progress: 'id',
  });

  return instance;
}

// Nombre de la base según el módulo. Medicina conserva el nombre histórico
// 'aulirex' para no perder el progreso ya guardado por usuarios existentes; el
// resto de los módulos usan una base propia con su slug.
function dbNameForModule(slug: string): string {
  return slug === 'ingreso-medicina' ? 'aulirex' : `aulirex-${slug}`;
}

const instances = new Map<string, AulirexDB>();
function getDb(slug: string): AulirexDB {
  const name = dbNameForModule(slug);
  let inst = instances.get(name);
  if (!inst) {
    inst = createDb(name);
    instances.set(name, inst);
  }
  return inst;
}

// Base activa. `let` + binding vivo de ES modules: al reasignarla con
// useModuleDatabase, todos los que importan `db` ven la base nueva (siempre que
// la usen al llamar, que es el caso: `db.attempts...` dentro de funciones).
// Por defecto la de Medicina, para mantener compatibilidad con datos previos.
export let db: AulirexDB = getDb('ingreso-medicina');

// Cambia la base de progreso al módulo indicado. Cada Layout de módulo la llama
// en render, antes de que monten sus páginas hijas.
export function useModuleDatabase(slug: string): void {
  db = getDb(slug);
}
