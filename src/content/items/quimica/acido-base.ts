import type { Item } from '../../../types/content';

// Equilibrio ácido-base: pH y buffers. Alta frecuencia en teórico y práctico.
// Contenido original; distractores parejos.
export const items: Item[] = [
  {
    id: 'qui-phb-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Una solución tiene una concentración de protones $[H^+] = 1\\times10^{-4}\\,M$. ¿Cuál es su pH?',
    numeric: { value: 4, tolerance: 0.05, toleranceMode: 'abs' },
    explanation:
      'pH = −log[H⁺] = −log(1×10⁻⁴) = 4. Al ser menor que 7, la solución es ácida.',
    hint: 'pH = −log[H⁺].',
    formulaIds: ['for-ph'],
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-phb-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Una solución tiene $[OH^-] = 1\\times10^{-3}\\,M$ a 25 °C. ¿Cuál es su pH?',
    numeric: { value: 11, tolerance: 0.05, toleranceMode: 'abs' },
    explanation:
      'pOH = −log[OH⁻] = −log(1×10⁻³) = 3. Como pH + pOH = 14, entonces pH = 14 − 3 = 11 (solución básica).',
    hint: 'Calculá el pOH y usá pH + pOH = 14.',
    formulaIds: ['for-ph'],
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-phb-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Si la concentración de H⁺ de una solución **aumenta**, su pH:',
    choices: [
      {
        id: 'a',
        text: 'Aumenta, porque el pH crece junto con la concentración de H⁺.',
        correct: false,
        misconception: 'mc-ph-mas-alto-mas-acido',
        feedback:
          'Como pH = −log[H⁺], al subir [H⁺] el pH BAJA. Más H⁺ significa más ácido y menor pH.',
      },
      {
        id: 'b',
        text: 'Disminuye, porque el pH es el logaritmo negativo de [H⁺].',
        correct: true,
      },
      {
        id: 'c',
        text: 'No cambia, porque el pH depende solo de la temperatura.',
        correct: false,
        feedback:
          'El pH depende directamente de [H⁺]. Si esta cambia, el pH cambia.',
      },
      {
        id: 'd',
        text: 'Se vuelve neutro, porque toda solución concentrada llega a 7.',
        correct: false,
        misconception: 'mc-ph-mas-alto-mas-acido',
        feedback:
          'Al aumentar [H⁺] la solución se hace MÁS ácida (pH < 7), no neutra.',
      },
    ],
    explanation:
      'El pH es −log[H⁺]: por el signo negativo, cuando [H⁺] aumenta el pH disminuye. Soluciones más ácidas tienen mayor [H⁺] y menor pH.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-phb-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿Cuál de los siguientes pares constituye una solución buffer (amortiguadora) eficaz?',
    choices: [
      {
        id: 'a',
        text: 'HCl / NaCl, un ácido fuerte junto con una de sus sales.',
        correct: false,
        misconception: 'mc-buffer-fuerte',
        feedback:
          'El HCl es un ácido fuerte: se disocia por completo y no amortigua. Un buffer usa un ácido débil.',
      },
      {
        id: 'b',
        text: 'NaOH / NaCl, una base fuerte junto con una de sus sales.',
        correct: false,
        misconception: 'mc-buffer-fuerte',
        feedback:
          'El NaOH es una base fuerte: no forma un par amortiguador. Falta un ácido/base débil.',
      },
      {
        id: 'c',
        text: 'CH₃COOH / CH₃COONa, un ácido débil con su base conjugada.',
        correct: true,
      },
      {
        id: 'd',
        text: 'HCl / NaOH, un ácido fuerte junto con una base fuerte.',
        correct: false,
        misconception: 'mc-buffer-fuerte',
        feedback:
          'Dos electrolitos fuertes se neutralizan pero no amortiguan cambios de pH.',
      },
    ],
    explanation:
      'Un buffer necesita un ácido débil y su base conjugada (o una base débil y su ácido conjugado). El par ácido acético / acetato de sodio cumple: absorbe agregados de ácido o base manteniendo el pH casi estable.',
    processMapId: 'pmap-buffer',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-phb-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'teorico',
    type: 'true_false',
    frequency: 'media',
    difficulty: 2,
    stem: 'Una diferencia de 2 unidades de pH (por ejemplo, de pH 5 a pH 3) equivale a una concentración de H⁺ 100 veces mayor.',
    choices: [
      { id: 'v', text: 'Verdadero', correct: true },
      {
        id: 'f',
        text: 'Falso',
        correct: false,
        misconception: 'mc-ph-lineal',
        feedback:
          'La escala es logarítmica: cada unidad de pH es un factor 10. Dos unidades → 10 × 10 = 100 veces.',
      },
    ],
    explanation:
      'La escala de pH es logarítmica en base 10. Bajar el pH en 2 unidades multiplica [H⁺] por 10² = 100. De pH 5 a pH 3 hay 100 veces más protones.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-phb-0006',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Un buffer contiene acetato y ácido acético en **igual concentración** (relación 1:1). Si el pKa del ácido acético es 4,74, ¿cuál es el pH del buffer?',
    numeric: { value: 4.74, tolerance: 0.05, toleranceMode: 'abs' },
    explanation:
      'Por Henderson-Hasselbalch: pH = pKa + log([base]/[ácido]). Como la relación es 1:1, log(1) = 0, así que pH = pKa = 4,74.',
    hint: 'pH = pKa + log([base]/[ácido]); si la relación es 1:1, el log vale 0.',
    formulaIds: ['for-henderson'],
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-phb-0007',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'acidos_bases',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿Qué distingue a un ácido **fuerte** de un ácido **débil** en solución acuosa?',
    choices: [
      {
        id: 'a',
        text: 'El fuerte se disocia por completo; el débil, solo parcialmente.',
        correct: true,
      },
      {
        id: 'b',
        text: 'El fuerte se disocia parcialmente; el débil, en su totalidad.',
        correct: false,
        feedback:
          'Está invertido: el ácido fuerte se disocia del todo; el débil solo en parte.',
      },
      {
        id: 'c',
        text: 'El fuerte siempre está más concentrado que el ácido débil.',
        correct: false,
        feedback:
          'La fuerza no es la concentración: depende del grado de disociación, no de cuántos moles haya.',
      },
      {
        id: 'd',
        text: 'El fuerte tiene un pKa alto; el débil, un pKa muy bajo.',
        correct: false,
        feedback:
          'Es al revés: el ácido fuerte tiene pKa bajo (muy disociado); el débil, pKa más alto.',
      },
    ],
    explanation:
      'La fuerza de un ácido se define por su grado de disociación: un ácido fuerte (HCl) se ioniza completamente en agua, mientras que uno débil (ácido acético) se disocia solo parcialmente y establece un equilibrio. Es independiente de la concentración.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
