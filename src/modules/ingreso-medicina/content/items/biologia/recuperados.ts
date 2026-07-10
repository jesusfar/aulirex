import type { Item } from '../../../../../types/content';

// Ítem reescrito a partir de un ejercicio del preguntero que dependía de un
// esquema (reference/EJERCITACION-BIOLOGIA.pdf). Se reformula como pregunta
// conceptual autónoma sobre replicación del ADN. Reemplaza al bio-imp-0252
// deprecado.
export const items: Item[] = [
  {
    id: 'bio-rec-0252',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'ciclo_celular_mitosis_meiosis',
    topic: 'ciclo_celular_mitosis_meiosis',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Durante la replicación del ADN, la cadena que se sintetiza de forma **discontinua**, en fragmentos de Okazaki, se denomina:',
    choices: [
      { id: 'a', text: 'Cadena rezagada (retrasada).', correct: true },
      {
        id: 'b',
        text: 'Cadena adelantada (continua).',
        correct: false,
        feedback:
          'La cadena adelantada se sintetiza de manera continua, no en fragmentos de Okazaki.',
      },
      {
        id: 'c',
        text: 'Cadena molde de ARN mensajero.',
        correct: false,
        feedback:
          'El ARN mensajero corresponde a la transcripción, no a la replicación del ADN.',
      },
      {
        id: 'd',
        text: 'Cadena de cebadores (primers).',
        correct: false,
        feedback:
          'Los primers son cebadores de ARN que inician la síntesis; no son una de las cadenas.',
      },
    ],
    explanation:
      'La ADN polimerasa sintetiza solo en sentido 5’→3’. En la cadena rezagada, orientada al revés respecto del avance de la horquilla, la síntesis ocurre de forma discontinua en fragmentos de Okazaki, que luego une la ADN ligasa. La cadena adelantada se sintetiza de manera continua.',
    source: 'original',
    version: 1,
    status: 'active',
    authorNote: 'Reescrito del preguntero (nº 313, "Ciclo celular"), originalmente dependía de un esquema.',
  },
];
