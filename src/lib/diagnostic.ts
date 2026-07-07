import type { Item, Subject } from '../types/content';

// Diagnóstico adaptativo: por cada materia hace rondas de preguntas ajustando la
// dificultad según cómo venís respondiendo (acertás → sube, fallás → baja) y
// estima una habilidad 0..1 por materia. No es IRT completo, pero da una foto
// honesta de dónde arrancás (plan §Fase 4).

export interface DiagnosticResponse {
  itemId: string;
  subject: Subject;
  difficulty: 1 | 2 | 3;
  correct: boolean;
}

export interface DiagnosticState {
  subjects: Subject[];
  perSubject: number;
  asked: string[];
  responses: DiagnosticResponse[];
  theta: Record<string, number>; // habilidad en curso por materia (0..1)
}

const STEP = 0.18; // cuánto mueve cada respuesta la estimación en curso

export function initDiagnostic(
  subjects: Subject[],
  perSubject = 5,
): DiagnosticState {
  const theta: Record<string, number> = {};
  for (const s of subjects) theta[s] = 0.5;
  return { subjects, perSubject, asked: [], responses: [], theta };
}

export function totalQuestions(state: DiagnosticState): number {
  return state.subjects.length * state.perSubject;
}

export function isDone(state: DiagnosticState): boolean {
  return state.responses.length >= totalQuestions(state);
}

// Materia activa: la primera (en orden) que aún no completó su cupo.
export function currentSubject(state: DiagnosticState): Subject | null {
  for (const s of state.subjects) {
    const done = state.responses.filter((r) => r.subject === s).length;
    if (done < state.perSubject) return s;
  }
  return null;
}

function targetDifficulty(theta: number): 1 | 2 | 3 {
  if (theta < 0.4) return 1;
  if (theta < 0.7) return 2;
  return 3;
}

// Elige el siguiente ítem: de la materia activa, sin repetir, lo más cerca
// posible de la dificultad objetivo según la habilidad estimada.
export function pickNext(state: DiagnosticState, pool: Item[]): Item | null {
  const subject = currentSubject(state);
  if (!subject) return null;
  const asked = new Set(state.asked);
  const candidates = pool.filter(
    (i) => i.subject === subject && !asked.has(i.id),
  );
  if (candidates.length === 0) return null;

  const target = targetDifficulty(state.theta[subject] ?? 0.5);
  let best = candidates[0];
  let bestDist = Math.abs(best.difficulty - target);
  for (const item of candidates) {
    const dist = Math.abs(item.difficulty - target);
    if (dist < bestDist) {
      best = item;
      bestDist = dist;
    }
  }
  return best;
}

export function applyResponse(
  state: DiagnosticState,
  item: Item,
  correct: boolean,
): DiagnosticState {
  const dir = correct ? 1 : -1;
  const move = STEP * (item.difficulty / 2); // acertar difíciles pesa más
  const theta = {
    ...state.theta,
    [item.subject]: clamp01((state.theta[item.subject] ?? 0.5) + dir * move),
  };
  return {
    ...state,
    asked: [...state.asked, item.id],
    responses: [
      ...state.responses,
      {
        itemId: item.id,
        subject: item.subject,
        difficulty: item.difficulty,
        correct,
      },
    ],
    theta,
  };
}

export interface DiagnosticResult {
  at: number;
  overall: number; // 0..1
  ability: Partial<Record<Subject, number>>; // 0..1 por materia
}

// Habilidad final por materia: proporción de dificultad acertada (un acierto en
// difícil vale más; un error en fácil resta más). Robusto y explicable.
export function estimateAbility(state: DiagnosticState): DiagnosticResult {
  const ability: Partial<Record<Subject, number>> = {};
  for (const subject of state.subjects) {
    const rs = state.responses.filter((r) => r.subject === subject);
    if (rs.length === 0) continue;
    let got = 0;
    let max = 0;
    for (const r of rs) {
      max += r.difficulty;
      if (r.correct) got += r.difficulty;
    }
    ability[subject] = max ? got / max : 0;
  }
  const vals = Object.values(ability) as number[];
  const overall = vals.length
    ? vals.reduce((a, b) => a + b, 0) / vals.length
    : 0;
  return { at: Date.now(), overall, ability };
}

export function abilityLabel(v: number): string {
  if (v < 0.35) return 'Inicial';
  if (v < 0.6) return 'En desarrollo';
  if (v < 0.8) return 'Sólido';
  return 'Avanzado';
}

const STORAGE_KEY = 'aulirex.diagnostic';

export function saveDiagnostic(result: DiagnosticResult): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function loadDiagnostic(): DiagnosticResult | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DiagnosticResult;
  } catch {
    return null;
  }
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}
