import type { Institution, Item } from '../types/content';
import { buildTestDeck } from './deck';

// Perfiles de examen. UNC (CONEUM) puntúa por track y aprueba con 60% en cada
// uno; la variante UNSa usa un umbral global sobre el examen combinado. El
// contenido de ciencias se comparte entre ambas instituciones (plan §Fase 4).
export const PASS_THRESHOLD = 60;

export interface ExamProfile {
  id: 'unc' | 'unsa';
  label: string;
  institution: Institution;
  teorico: number;
  practico: number;
  durationMin: number;
  passThreshold: number;
  splitByTrack: boolean; // true = aprueba por track; false = umbral global
}

export const EXAM_PROFILES: ExamProfile[] = [
  {
    id: 'unc',
    label: 'UNC · CONEUM',
    institution: 'UNC',
    teorico: 25,
    practico: 25,
    durationMin: 50,
    passThreshold: 60,
    splitByTrack: true,
  },
  {
    id: 'unsa',
    label: 'UNSa',
    institution: 'UNSa',
    // Programa oficial (Res. 089-20): régimen promocional, cada parcial se
    // aprueba con 80/100. El parcial real combina Bio+Quí+Fís (~45) + AAU
    // (comprensión lectora, aún no integrada al simulacro).
    teorico: 23,
    practico: 22,
    durationMin: 50,
    passThreshold: 80,
    splitByTrack: false,
  },
];

export function profileById(id: string): ExamProfile {
  return EXAM_PROFILES.find((p) => p.id === id) ?? EXAM_PROFILES[0];
}

export interface Simulacro {
  items: Item[]; // teóricas primero, luego prácticas
  teoricoIds: Set<string>;
  practicoIds: Set<string>;
  profile: ExamProfile;
  fellBack: boolean; // true si no había ítems suficientes de la institución
}

// Arma el examen del perfil: filtra por institución (con fallback al banco
// completo si no alcanza), estratifica por tema y no repite.
export function buildSimulacro(all: Item[], profile: ExamProfile): Simulacro {
  const forInstitution = all.filter((i) =>
    i.institutions.includes(profile.institution),
  );
  const needed = profile.teorico + profile.practico;
  const fellBack = forInstitution.length < needed;
  const pool = fellBack ? all : forInstitution;

  const teorico = buildTestDeck(
    pool.filter((i) => i.track === 'teorico'),
    profile.teorico,
  );
  const practico = buildTestDeck(
    pool.filter((i) => i.track === 'practico'),
    profile.practico,
  );
  return {
    items: [...teorico, ...practico],
    teoricoIds: new Set(teorico.map((i) => i.id)),
    practicoIds: new Set(practico.map((i) => i.id)),
    profile,
    fellBack,
  };
}

export interface TrackScore {
  correct: number;
  total: number;
  pct: number;
  passed: boolean;
}
export interface ExamResult {
  teorico: TrackScore;
  practico: TrackScore;
  overall: TrackScore;
  passed: boolean;
}

export function scoreExam(
  sim: Simulacro,
  correctById: Record<string, boolean>,
): ExamResult {
  const threshold = sim.profile.passThreshold;
  const tally = (ids: Set<string>): TrackScore => {
    let correct = 0;
    for (const id of ids) if (correctById[id]) correct++;
    const total = ids.size;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    return { correct, total, pct, passed: pct >= threshold };
  };
  const teorico = tally(sim.teoricoIds);
  const practico = tally(sim.practicoIds);
  const overall = tally(new Set([...sim.teoricoIds, ...sim.practicoIds]));
  const passed = sim.profile.splitByTrack
    ? teorico.passed && practico.passed
    : overall.passed;
  return { teorico, practico, overall, passed };
}
