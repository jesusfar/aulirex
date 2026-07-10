import type { Item } from '../../../../../types/content';

// Biomoléculas: hidratos de carbono, lípidos, proteínas, enzimas y ácidos
// nucleicos. Temario UNSa (Módulo Química, Unidad 9). Original.
export const items: Item[] = [
  {
    id: 'qui-biom-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'hidratos_de_carbono',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Los polisacáridos de **reserva** energética en animales y en vegetales son, respectivamente:',
    choices: [
      {
        id: 'a',
        text: 'Glucógeno en animales y almidón en vegetales.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Almidón en animales y glucógeno en vegetales.',
        correct: false,
        feedback:
          'Están invertidos: el glucógeno es la reserva animal y el almidón la vegetal.',
      },
      {
        id: 'c',
        text: 'Celulosa en animales y quitina en vegetales.',
        correct: false,
        feedback:
          'Celulosa y quitina son estructurales, no de reserva, y la asignación no corresponde.',
      },
      {
        id: 'd',
        text: 'Glucosa en animales y sacarosa en vegetales.',
        correct: false,
        feedback:
          'Glucosa y sacarosa no son polisacáridos de reserva (son mono y disacárido).',
      },
    ],
    explanation:
      'El glucógeno (hígado y músculo) es el polisacárido de reserva animal; el almidón lo es en los vegetales. Ambos son polímeros de glucosa; la celulosa, también de glucosa, cumple función estructural.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-biom-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'hidratos_de_carbono',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La sacarosa es un disacárido que se forma por la unión de:',
    choices: [
      {
        id: 'a',
        text: 'Dos moléculas de glucosa mediante un enlace peptídico.',
        correct: false,
        feedback:
          'El enlace entre monosacáridos es glucosídico, no peptídico; y la sacarosa no es glucosa + glucosa.',
      },
      {
        id: 'b',
        text: 'Glucosa y fructosa mediante un enlace glucosídico.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Glucosa y galactosa mediante un enlace glucosídico.',
        correct: false,
        feedback:
          'Glucosa + galactosa forman lactosa; la sacarosa es glucosa + fructosa.',
      },
      {
        id: 'd',
        text: 'Dos moléculas de fructosa mediante un puente de hidrógeno.',
        correct: false,
        feedback:
          'La sacarosa no es fructosa + fructosa, y la unión es un enlace glucosídico covalente.',
      },
    ],
    explanation:
      'La sacarosa = glucosa + fructosa, unidas por enlace glucosídico. Lactosa = glucosa + galactosa; maltosa = glucosa + glucosa.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-biom-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'lipidos',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Un triglicérido (grasa) está formado por:',
    choices: [
      {
        id: 'a',
        text: 'Glicerol unido a tres ácidos grasos por enlaces éster.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Glicerol unido a tres aminoácidos por enlaces peptídicos.',
        correct: false,
        feedback:
          'Los aminoácidos y el enlace peptídico son propios de las proteínas, no de las grasas.',
      },
      {
        id: 'c',
        text: 'Tres moléculas de glucosa unidas por enlaces glucosídicos.',
        correct: false,
        feedback:
          'Eso sería un glúcido; un triglicérido combina glicerol con ácidos grasos.',
      },
      {
        id: 'd',
        text: 'Una base nitrogenada unida a un azúcar y un fosfato.',
        correct: false,
        feedback:
          'Esa es la estructura de un nucleótido (ácidos nucleicos), no de un lípido.',
      },
    ],
    explanation:
      'Los triglicéridos son ésteres de glicerol con tres ácidos grasos. La reacción con una base los hidroliza dando jabón (saponificación).',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-biom-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'lipidos',
    track: 'teorico',
    type: 'true_false',
    frequency: 'media',
    difficulty: 1,
    stem: 'Un ácido graso **insaturado** posee uno o más dobles enlaces entre carbonos en su cadena.',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'Los ácidos grasos insaturados tienen al menos un doble enlace C=C; los saturados no tienen dobles enlaces. La insaturación baja el punto de fusión (por eso los aceites son líquidos).',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-biom-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'proteinas',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: 'El monómero de las proteínas y el enlace que une a esos monómeros son:',
    choices: [
      {
        id: 'a',
        text: 'Nucleótido y enlace fosfodiéster, respectivamente.',
        correct: false,
        feedback:
          'Nucleótido y enlace fosfodiéster corresponden a los ácidos nucleicos.',
      },
      {
        id: 'b',
        text: 'Monosacárido y enlace glucosídico, respectivamente.',
        correct: false,
        feedback:
          'Esos son propios de los hidratos de carbono, no de las proteínas.',
      },
      {
        id: 'c',
        text: 'Aminoácido y enlace peptídico, respectivamente.',
        correct: true,
      },
      {
        id: 'd',
        text: 'Ácido graso y enlace éster, respectivamente.',
        correct: false,
        feedback:
          'Ácido graso y enlace éster forman parte de los lípidos, no de las proteínas.',
      },
    ],
    explanation:
      'Las proteínas son polímeros de aminoácidos unidos por enlaces peptídicos (entre el grupo carboxilo de uno y el amino del siguiente).',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-biom-0006',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'proteinas',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 3,
    stem: 'Cuando una proteína se **desnaturaliza** (por calor o pH extremo):',
    choices: [
      {
        id: 'a',
        text: 'Pierde su estructura tridimensional y su función, pero conserva la secuencia de aminoácidos.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Se rompen los enlaces peptídicos y se separan todos sus aminoácidos.',
        correct: false,
        feedback:
          'La desnaturalización afecta la forma (estructuras 2ª a 4ª), no rompe los enlaces peptídicos de la estructura primaria.',
      },
      {
        id: 'c',
        text: 'Aumenta su actividad porque queda más expuesto el sitio activo.',
        correct: false,
        feedback:
          'Al perder su forma, la proteína suele perder función, no aumentarla.',
      },
      {
        id: 'd',
        text: 'Se transforma en un ácido nucleico al cambiar su plegamiento.',
        correct: false,
        feedback:
          'Una proteína no se convierte en otra clase de biomolécula; solo pierde su plegamiento.',
      },
    ],
    explanation:
      'La desnaturalización altera las estructuras secundaria, terciaria y cuaternaria (pierde forma y función), pero no rompe los enlaces peptídicos: la estructura primaria (secuencia de aminoácidos) se mantiene.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-biom-0007',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'enzimas',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Las enzimas aceleran las reacciones biológicas porque:',
    choices: [
      {
        id: 'a',
        text: 'Aportan la energía necesaria para que la reacción ocurra.',
        correct: false,
        feedback:
          'Las enzimas no aportan energía; reducen la barrera energética (energía de activación).',
      },
      {
        id: 'b',
        text: 'Disminuyen la energía de activación sin consumirse en el proceso.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Desplazan el equilibrio hacia los productos de la reacción.',
        correct: false,
        feedback:
          'Un catalizador no cambia la posición del equilibrio, solo la velocidad para alcanzarlo.',
      },
      {
        id: 'd',
        text: 'Se consumen por completo al finalizar cada reacción catalizada.',
        correct: false,
        feedback:
          'Los catalizadores no se consumen: quedan disponibles para volver a actuar.',
      },
    ],
    explanation:
      'Las enzimas son catalizadores biológicos: bajan la energía de activación, aumentan la velocidad y no se consumen ni modifican el equilibrio. Actúan sobre un sustrato específico en su sitio activo.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-biom-0008',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'biomoleculas',
    topic: 'acidos_nucleicos',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Un **nucleótido**, unidad de los ácidos nucleicos, está compuesto por:',
    choices: [
      {
        id: 'a',
        text: 'Una base nitrogenada, un azúcar (pentosa) y un grupo fosfato.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Un aminoácido, un grupo amino y un grupo carboxilo.',
        correct: false,
        feedback:
          'Esa descripción corresponde a un aminoácido (proteínas), no a un nucleótido.',
      },
      {
        id: 'c',
        text: 'Glicerol, un ácido graso y un grupo fosfato.',
        correct: false,
        feedback:
          'Glicerol + ácido graso + fosfato describe un fosfolípido, no un nucleótido.',
      },
      {
        id: 'd',
        text: 'Dos monosacáridos unidos por un enlace glucosídico.',
        correct: false,
        feedback:
          'Eso es un disacárido; el nucleótido combina base, pentosa y fosfato.',
      },
    ],
    explanation:
      'Cada nucleótido = base nitrogenada (púrica o pirimídica) + pentosa (desoxirribosa en ADN, ribosa en ARN) + fosfato. Los nucleótidos se unen por enlaces fosfodiéster.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
