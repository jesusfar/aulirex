import type { Item } from '../../../types/content';

// Soluciones: concentración, diluciones, propiedades coligativas e isótopos.
// Foco práctico de química inorgánica (guía UNC). Contenido original.
export const items: Item[] = [
  {
    id: 'qui-sol-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'soluciones',
    topic: 'concentracion',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Se disuelven 0,5 mol de NaCl en agua hasta obtener 2 litros de solución. ¿Cuál es la molaridad (mol/L)?',
    numeric: { value: 0.25, unit: 'mol/L', tolerance: 0.01, toleranceMode: 'abs' },
    explanation:
      'Molaridad = moles de soluto / litros de solución = 0,5 mol / 2 L = 0,25 M.',
    hint: 'M = n / V (en litros).',
    formulaIds: ['for-molaridad'],
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-sol-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'soluciones',
    topic: 'diluciones',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Se toman 50 mL de una solución 0,8 M y se diluyen con agua hasta un volumen final de 200 mL. ¿Cuál es la concentración final, en mol/L?',
    numeric: { value: 0.2, unit: 'mol/L', tolerance: 0.01, toleranceMode: 'abs' },
    explanation:
      'En una dilución los moles no cambian: C₁·V₁ = C₂·V₂. Entonces C₂ = (0,8 M × 50 mL) / 200 mL = 0,2 M.',
    hint: 'Usá C₁·V₁ = C₂·V₂; los moles de soluto se conservan.',
    formulaIds: ['for-dilucion'],
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-sol-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'soluciones',
    topic: 'diluciones',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Al **diluir** una solución agregándole agua (sin agregar soluto), ¿qué ocurre con los moles de soluto y la concentración?',
    choices: [
      {
        id: 'a',
        text: 'Los moles de soluto no cambian y la concentración disminuye.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Los moles de soluto aumentan y la concentración también sube.',
        correct: false,
        misconception: 'mc-dilucion-cambia-moles',
        feedback:
          'No agregaste soluto: los moles se mantienen. Solo aumenta el volumen, por eso baja la concentración.',
      },
      {
        id: 'c',
        text: 'Los moles de soluto disminuyen y la concentración se mantiene.',
        correct: false,
        misconception: 'mc-dilucion-cambia-moles',
        feedback:
          'Al diluir no desaparece soluto; los moles quedan igual y la concentración baja.',
      },
      {
        id: 'd',
        text: 'Tanto los moles como la concentración permanecen constantes.',
        correct: false,
        feedback:
          'El volumen aumenta, así que la concentración (moles/volumen) necesariamente disminuye.',
      },
    ],
    explanation:
      'Diluir es agregar solvente. La cantidad de soluto (moles) se conserva, pero al aumentar el volumen la concentración baja. De ahí la relación C₁·V₁ = C₂·V₂.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-sol-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'soluciones',
    topic: 'propiedades_coligativas',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Las propiedades coligativas (como el ascenso ebulloscópico) dependen principalmente de:',
    choices: [
      {
        id: 'a',
        text: 'La identidad química del soluto disuelto en el solvente.',
        correct: false,
        misconception: 'mc-coligativas-dependen-identidad',
        feedback:
          'No importa qué soluto sea, sino cuántas partículas aporta. Por eso se llaman "coligativas".',
      },
      {
        id: 'b',
        text: 'El número de partículas de soluto presentes en la solución.',
        correct: true,
      },
      {
        id: 'c',
        text: 'El color y el olor que el soluto le confiere a la mezcla.',
        correct: false,
        feedback:
          'Color y olor no son propiedades coligativas; estas dependen de la cantidad de partículas.',
      },
      {
        id: 'd',
        text: 'La masa molar del solvente utilizado para disolver el soluto.',
        correct: false,
        misconception: 'mc-coligativas-dependen-identidad',
        feedback:
          'Dependen de las partículas de SOLUTO, no de la masa molar del solvente.',
      },
    ],
    explanation:
      'Las propiedades coligativas (descenso crioscópico, ascenso ebulloscópico, presión osmótica, descenso de la presión de vapor) dependen de la cantidad de partículas de soluto, no de su naturaleza. Un electrolito que se disocia aporta más partículas (factor i de van’t Hoff) y afecta más.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-sol-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'estructura_atomica',
    topic: 'isotopos',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 1,
    stem: 'Dos isótopos de un mismo elemento se diferencian entre sí en:',
    choices: [
      {
        id: 'a',
        text: 'El número de protones, lo que cambia su número atómico.',
        correct: false,
        misconception: 'mc-isotopos-cambian-elemento',
        feedback:
          'Si cambiaran los protones sería otro elemento. Los isótopos tienen igual Z y distinto número de neutrones.',
      },
      {
        id: 'b',
        text: 'El número de electrones de su configuración en estado neutro.',
        correct: false,
        feedback:
          'En estado neutro los electrones igualan a los protones; lo que varía en isótopos son los neutrones.',
      },
      {
        id: 'c',
        text: 'El número de neutrones, lo que cambia su número másico.',
        correct: true,
      },
      {
        id: 'd',
        text: 'El tipo de enlaces químicos que forman con otros átomos.',
        correct: false,
        feedback:
          'Los isótopos comparten propiedades químicas (mismos electrones de valencia); difieren en neutrones.',
      },
    ],
    explanation:
      'Los isótopos de un elemento tienen el mismo número atómico (Z = protones) pero distinto número de neutrones, y por lo tanto distinto número másico (A). Siguen siendo el mismo elemento con casi idénticas propiedades químicas.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-sol-0006',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'estructura_atomica',
    topic: 'isotopos',
    track: 'practico',
    type: 'numeric',
    frequency: 'baja',
    difficulty: 2,
    stem: 'El isótopo carbono-14 tiene número atómico Z = 6 y número másico A = 14. ¿Cuántos **neutrones** posee en su núcleo?',
    numeric: { value: 8, unit: 'neutrones', tolerance: 0, toleranceMode: 'abs' },
    explanation:
      'Número de neutrones = A − Z = 14 − 6 = 8. El carbono-14 tiene 6 protones y 8 neutrones.',
    hint: 'Neutrones = número másico − número atómico.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
