import type { Item } from '../../../../../types/content';
import { mc } from '../_build';

const S = 'lengua' as const;

// Nota: la comprensión lectora vive en content/comprension. Acá van los ítems de
// normativa gramatical, ortografía y cohesión léxica.
export const items: Item[] = [
  mc({
    id: 'gna-len-gram-1',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'sujeto_y_predicado',
    difficulty: 2,
    stem: 'En la oración "Los gendarmes custodian la frontera", el sujeto es:',
    choices: [
      { t: '"Los gendarmes"', ok: true },
      { t: '"custodian la frontera"' },
      { t: '"la frontera"' },
      { t: '"custodian"' },
    ],
    explanation:
      'El sujeto es de quién se dice algo y concuerda con el verbo: "Los gendarmes". El resto es el predicado.',
  }),
  mc({
    id: 'gna-len-gram-2',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'categorias_gramaticales',
    difficulty: 2,
    stem: 'En "El soldado corrió rápidamente", la palabra "rápidamente" es un:',
    choices: [
      { t: 'adverbio', ok: true },
      { t: 'adjetivo' },
      { t: 'sustantivo' },
      { t: 'pronombre' },
    ],
    explanation:
      'Modifica al verbo "corrió" indicando modo y termina en -mente: es un adverbio.',
  }),
  mc({
    id: 'gna-len-gram-3',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'oracion_compuesta',
    difficulty: 3,
    stem: 'La oración "Estudió mucho, pero no aprobó" es compuesta por:',
    choices: [
      { t: 'coordinación (dos proposiciones unidas por "pero").', ok: true },
      { t: 'subordinación sustantiva.' },
      { t: 'subordinación adjetiva.' },
      { t: 'una única proposición unimembre.' },
    ],
    explanation:
      '"Pero" es un nexo coordinante adversativo que une dos proposiciones independientes: hay coordinación.',
  }),
  mc({
    id: 'gna-len-ort-1',
    subject: S,
    block: 'ortografia',
    topic: 'acentuacion',
    difficulty: 2,
    stem: '¿Cuál de las siguientes palabras está correctamente tildada?',
    choices: [
      { t: 'exámenes', ok: true },
      { t: 'examenes' },
      { t: 'examénes' },
      { t: 'exámene' },
    ],
    explanation:
      '"Exámenes" es esdrújula (e-xá-me-nes): todas las esdrújulas llevan tilde.',
  }),
  mc({
    id: 'gna-len-ort-2',
    subject: S,
    block: 'ortografia',
    topic: 'uso_de_letras',
    difficulty: 2,
    stem: 'Elegí la opción escrita correctamente:',
    choices: [
      { t: 'Tuvo que ir a la guardia.', ok: true },
      { t: 'Tubo que ir a la guardia.' },
      { t: 'Tuvo que hir a la guardia.' },
      { t: 'Tubo que hir a la guardia.' },
    ],
    explanation:
      '"Tuvo" viene del verbo tener (con v); "ir" no lleva h. "Tubo" es un caño.',
  }),
  mc({
    id: 'gna-len-lex-1',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'sinonimos',
    difficulty: 1,
    stem: 'Un sinónimo de "vigilar" es:',
    choices: [
      { t: 'custodiar', ok: true },
      { t: 'abandonar' },
      { t: 'ignorar' },
      { t: 'destruir' },
    ],
    explanation:
      '"Custodiar" y "vigilar" comparten significado (cuidar, controlar). Los demás son antónimos o no relacionados.',
  }),
  mc({
    id: 'gna-len-lex-2',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'antonimos',
    difficulty: 1,
    stem: 'El antónimo de "permitir" es:',
    choices: [
      { t: 'prohibir', ok: true },
      { t: 'autorizar' },
      { t: 'consentir' },
      { t: 'habilitar' },
    ],
    explanation:
      '"Prohibir" es lo opuesto a "permitir". Las otras tres son sinónimos de permitir.',
  }),
  mc({
    id: 'gna-len-lex-3',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'homonimos_y_paronimos',
    difficulty: 3,
    stem: 'Las palabras "vasto" (extenso) y "basto" (grosero) son un ejemplo de:',
    choices: [
      { t: 'homófonos (suenan igual, se escriben distinto).', ok: true },
      { t: 'sinónimos.' },
      { t: 'hipónimos.' },
      { t: 'antónimos.' },
    ],
    explanation:
      'Se pronuncian igual pero se escriben y significan distinto: son homófonos (un tipo de homónimos).',
  }),
];
