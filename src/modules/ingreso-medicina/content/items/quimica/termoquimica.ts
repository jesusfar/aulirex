import type { Item } from '../../../../../types/content';

// Termoquímica: calor de reacción, entalpía, reacciones exo/endotérmicas.
// Contenido del temario UNSa (Módulo Química, Unidad 3). Original.
export const items: Item[] = [
  {
    id: 'qui-termo-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'termoquimica',
    topic: 'reacciones_exo_endotermicas',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: 'En una reacción **exotérmica**, la variación de entalpía (ΔH) es:',
    choices: [
      {
        id: 'a',
        text: 'Negativa, porque el sistema libera calor al entorno.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Positiva, porque el sistema absorbe calor del entorno.',
        correct: false,
        feedback:
          'ΔH positivo corresponde a una reacción endotérmica (absorbe calor), no a una exotérmica.',
      },
      {
        id: 'c',
        text: 'Igual a cero, porque la energía siempre se conserva.',
        correct: false,
        feedback:
          'La energía se conserva, pero ΔH mide el calor intercambiado: en una exotérmica es distinto de cero.',
      },
      {
        id: 'd',
        text: 'Positiva, porque los productos tienen más energía.',
        correct: false,
        feedback:
          'En una exotérmica los productos tienen MENOS energía que los reactivos, por eso ΔH es negativo.',
      },
    ],
    explanation:
      'En una reacción exotérmica el sistema libera calor: los productos quedan con menor entalpía que los reactivos, por lo que ΔH = H(productos) − H(reactivos) < 0.',
    hint: 'Exo = "hacia afuera": libera calor.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-termo-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'termoquimica',
    topic: 'reacciones_exo_endotermicas',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'En un gráfico de energía en función del avance de la reacción, una reacción **endotérmica** se reconoce porque:',
    choices: [
      {
        id: 'a',
        text: 'Los productos quedan por debajo de los reactivos.',
        correct: false,
        feedback:
          'Ese perfil (productos más bajos) corresponde a una reacción exotérmica.',
      },
      {
        id: 'b',
        text: 'Los productos quedan por encima de los reactivos.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Reactivos y productos quedan a la misma altura.',
        correct: false,
        feedback:
          'Si estuvieran a la misma altura, ΔH sería cero y no habría reacción endo ni exotérmica.',
      },
      {
        id: 'd',
        text: 'No aparece energía de activación en el gráfico.',
        correct: false,
        feedback:
          'La energía de activación (la "barrera") aparece en ambos tipos de reacción.',
      },
    ],
    explanation:
      'En una endotérmica el sistema absorbe energía: los productos tienen mayor entalpía que los reactivos, así que en el gráfico quedan más arriba y ΔH > 0.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-termo-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'termoquimica',
    topic: 'calor_de_reaccion',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    stem: 'La combustión de 1 mol de metano libera 890 kJ. ¿Cuánto calor (en kJ) se libera al quemar 0,5 mol de metano?',
    numeric: { value: 445, unit: 'kJ', tolerance: 1, toleranceMode: 'abs' },
    explanation:
      'El calor es proporcional a los moles que reaccionan: 890 kJ/mol × 0,5 mol = 445 kJ.',
    hint: 'Regla de tres directa: el calor escala con la cantidad de sustancia.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-termo-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'termoquimica',
    topic: 'calor_de_reaccion',
    track: 'practico',
    type: 'numeric',
    frequency: 'media',
    difficulty: 2,
    stem: 'En una reacción se liberan 286 kJ por cada mol de agua formada. Si se forman 3 moles de agua, ¿cuánto calor se libera, en kJ?',
    numeric: { value: 858, unit: 'kJ', tolerance: 1, toleranceMode: 'abs' },
    explanation:
      'Calor liberado = 286 kJ/mol × 3 mol = 858 kJ. El calor de reacción es proporcional a los moles.',
    hint: 'Multiplicá el calor por mol por la cantidad de moles.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-termo-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'termoquimica',
    topic: 'entalpia',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La **entalpía de formación** de un compuesto es el calor involucrado al formar:',
    choices: [
      {
        id: 'a',
        text: 'Un mol del compuesto a partir de sus elementos en estado estándar.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Un gramo del compuesto a partir de cualquier reactivo disponible.',
        correct: false,
        feedback:
          'Se define por mol (no por gramo) y a partir de los elementos, no de cualquier reactivo.',
      },
      {
        id: 'c',
        text: 'Un mol de producto al quemarlo por completo con oxígeno.',
        correct: false,
        feedback:
          'Eso describe la entalpía de combustión, no la de formación.',
      },
      {
        id: 'd',
        text: 'Cualquier cantidad de sustancia sin importar su estado físico.',
        correct: false,
        feedback:
          'La cantidad (un mol) y el estado estándar sí importan en la definición.',
      },
    ],
    explanation:
      'La entalpía estándar de formación (ΔHf°) es el calor puesto en juego al formar 1 mol de un compuesto a partir de sus elementos en su estado estándar. Por convención, la de un elemento en su forma estándar es cero.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-termo-0006',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'termoquimica',
    topic: 'entalpia',
    track: 'teorico',
    type: 'true_false',
    frequency: 'baja',
    difficulty: 2,
    stem: 'La **Ley de Hess** afirma que el ΔH de una reacción depende solo de los estados inicial y final, no del camino seguido.',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'La entalpía es una función de estado: su variación depende únicamente de reactivos y productos, no de las etapas intermedias. Por eso los ΔH de reacciones parciales se pueden sumar (Ley de Hess).',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
