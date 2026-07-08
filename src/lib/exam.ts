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
  aau: number; // preguntas de Alfabetización Académica (comprensión/teoría)
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
    aau: 0,
    durationMin: 50,
    passThreshold: 60,
    splitByTrack: true,
  },
  {
    id: 'unsa',
    label: 'UNSa',
    institution: 'UNSa',
    // Programa oficial (Res. 089-20): régimen promocional, cada parcial se
    // aprueba con 80/100. El parcial combina Bio+Quí+Fís (~45) + AAU (5,
    // Alfabetización Académica) = 50 preguntas.
    teorico: 23,
    practico: 22,
    aau: 5,
    durationMin: 50,
    passThreshold: 80,
    splitByTrack: false,
  },
];

export function profileById(id: string): ExamProfile {
  return EXAM_PROFILES.find((p) => p.id === id) ?? EXAM_PROFILES[0];
}

// Materias de Alfabetización Académica (sección AAU del examen UNSa).
const AAU_SUBJECTS = new Set(['alfabetizacion', 'comprension_textos']);
const isScience = (i: Item) => !AAU_SUBJECTS.has(i.subject);

export interface Simulacro {
  items: Item[]; // teóricas, luego prácticas, luego AAU
  teoricoIds: Set<string>;
  practicoIds: Set<string>;
  aauIds: Set<string>;
  profile: ExamProfile;
  fellBack: boolean; // true si no había ítems suficientes de la institución
}

// Arma el examen del perfil: filtra por institución (con fallback al banco
// completo si no alcanza), estratifica por tema y no repite. La sección AAU
// (Alfabetización) se toma aparte del bloque de ciencias.
export function buildSimulacro(all: Item[], profile: ExamProfile): Simulacro {
  const forInstitution = all.filter((i) =>
    i.institutions.includes(profile.institution),
  );
  const scienceNeeded = profile.teorico + profile.practico;
  const fellBack = forInstitution.filter(isScience).length < scienceNeeded;
  const pool = fellBack ? all : forInstitution;

  const teorico = buildTestDeck(
    pool.filter((i) => isScience(i) && i.track === 'teorico'),
    profile.teorico,
  );
  const practico = buildTestDeck(
    pool.filter((i) => isScience(i) && i.track === 'practico'),
    profile.practico,
  );
  const aau =
    profile.aau > 0
      ? buildTestDeck(
          forInstitution.filter((i) => i.subject === 'alfabetizacion'),
          profile.aau,
        )
      : [];

  return {
    items: [...teorico, ...practico, ...aau],
    teoricoIds: new Set(teorico.map((i) => i.id)),
    practicoIds: new Set(practico.map((i) => i.id)),
    aauIds: new Set(aau.map((i) => i.id)),
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
  aau: TrackScore;
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
  const aau = tally(sim.aauIds);
  const overall = tally(
    new Set([...sim.teoricoIds, ...sim.practicoIds, ...sim.aauIds]),
  );
  const passed = sim.profile.splitByTrack
    ? teorico.passed && practico.passed
    : overall.passed;
  return { teorico, practico, aau, overall, passed };
}
