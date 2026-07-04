import type { Item } from '../../types/content';
import { scoreNumeric } from './numeric';

// Respuesta del alumno según el tipo de ítem soportado en la Fase 1.
export type GivenAnswer =
  | { kind: 'choice'; choiceId: string } // single_choice / true_false
  | { kind: 'multi'; choiceIds: string[] } // multiple_response
  | { kind: 'numeric'; value: number };

export interface GradeResult {
  correct: boolean;
  // Misconcepción detectada según la(s) opción(es) elegida(s) (v2 1.2).
  chosenMisconception?: string;
  // Feedback dirigido a la opción marcada, si existe.
  feedback?: string;
}

export function gradeItem(item: Item, given: GivenAnswer): GradeResult {
  switch (given.kind) {
    case 'choice': {
      const chosen = item.choices?.find((c) => c.id === given.choiceId);
      return {
        correct: chosen?.correct ?? false,
        chosenMisconception: chosen?.correct ? undefined : chosen?.misconception,
        feedback: chosen?.correct ? undefined : chosen?.feedback,
      };
    }
    case 'multi': {
      const chosen = new Set(given.choiceIds);
      const correct = (item.choices ?? []).every(
        (c) => c.correct === chosen.has(c.id),
      );
      // Reportamos la primera misconcepción de una opción incorrecta marcada.
      const wrongPicked = (item.choices ?? []).find(
        (c) => !c.correct && chosen.has(c.id),
      );
      return {
        correct,
        chosenMisconception: correct ? undefined : wrongPicked?.misconception,
        feedback: correct ? undefined : wrongPicked?.feedback,
      };
    }
    case 'numeric': {
      if (!item.numeric) return { correct: false };
      return { correct: scoreNumeric(given.value, item.numeric) };
    }
  }
}
