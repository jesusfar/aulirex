import type { Item, Subject, Track } from '../../../../types/content';

// Helpers para redactar el banco semilla de Gendarmería de forma compacta.
// Todos los ítems se etiquetan con la institución 'GNA'. Distractores
// balanceados (regla del usuario): la opción correcta no debe delatarse por
// longitud, detalle ni "coherencia".

interface Common {
  id: string;
  subject: Subject;
  block: string;
  topic: string;
  difficulty?: 1 | 2 | 3;
  track?: Track;
  explanation: string;
  hint?: string;
}

// Opción única (single_choice). La primera opción marcada con ok:true es la correcta.
export function mc(
  o: Common & { stem: string; choices: { t: string; ok?: boolean }[] },
): Item {
  return {
    id: o.id,
    institutions: ['GNA'],
    subject: o.subject,
    block: o.block,
    topic: o.topic,
    track: o.track ?? 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: o.difficulty ?? 2,
    stem: o.stem,
    choices: o.choices.map((c, i) => ({
      id: String.fromCharCode(97 + i),
      text: c.t,
      correct: Boolean(c.ok),
    })),
    explanation: o.explanation,
    hint: o.hint,
    source: 'original',
    version: 1,
    status: 'active',
  };
}

// Verdadero / Falso.
export function tf(
  o: Common & { stem: string; answer: boolean },
): Item {
  return {
    id: o.id,
    institutions: ['GNA'],
    subject: o.subject,
    block: o.block,
    topic: o.topic,
    track: o.track ?? 'teorico',
    type: 'true_false',
    frequency: 'alta',
    difficulty: o.difficulty ?? 1,
    stem: o.stem,
    choices: [
      { id: 'v', text: 'Verdadero', correct: o.answer === true },
      { id: 'f', text: 'Falso', correct: o.answer === false },
    ],
    explanation: o.explanation,
    hint: o.hint,
    source: 'original',
    version: 1,
    status: 'active',
  };
}

// Respuesta numérica.
export function num(
  o: Common & {
    stem: string;
    value: number;
    unit?: string;
    tolerance?: number;
    track?: Track;
  },
): Item {
  return {
    id: o.id,
    institutions: ['GNA'],
    subject: o.subject,
    block: o.block,
    topic: o.topic,
    track: o.track ?? 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: o.difficulty ?? 2,
    stem: o.stem,
    numeric: {
      value: o.value,
      unit: o.unit,
      tolerance: o.tolerance ?? 0.01,
      toleranceMode: 'abs',
    },
    explanation: o.explanation,
    hint: o.hint,
    source: 'original',
    version: 1,
    status: 'active',
  };
}
