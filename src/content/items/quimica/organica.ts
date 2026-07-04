import type { Item } from '../../../types/content';

// Química orgánica: grupos funcionales e hibridación (sp, sp², sp³).
// Teórico de alta frecuencia ("moléculas gigantes", grupos, enlaces). Original.
export const items: Item[] = [
  {
    id: 'qui-org-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'quimica_organica',
    topic: 'hibridacion',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Un átomo de carbono unido por **cuatro enlaces simples** (cuatro sigma) presenta hibridación:',
    choices: [
      {
        id: 'a',
        text: 'sp², con geometría plana y ángulos de enlace de 120°.',
        correct: false,
        misconception: 'mc-hibridacion-enlaces',
        feedback:
          'sp² corresponde a un carbono con un doble enlace (3 σ + 1 π), no a cuatro enlaces simples.',
      },
      {
        id: 'b',
        text: 'sp³, con geometría tetraédrica y ángulos de enlace de 109,5°.',
        correct: true,
      },
      {
        id: 'c',
        text: 'sp, con geometría lineal y ángulos de enlace de 180°.',
        correct: false,
        misconception: 'mc-hibridacion-enlaces',
        feedback:
          'sp es un carbono con triple enlace o dos dobles (2 σ + 2 π), no cuatro simples.',
      },
      {
        id: 'd',
        text: 'sp³d, con geometría bipiramidal y cinco pares de electrones.',
        correct: false,
        feedback:
          'El carbono no expande su octeto; con cuatro enlaces simples es sp³ tetraédrico.',
      },
    ],
    explanation:
      'Un carbono con cuatro enlaces simples forma cuatro orbitales híbridos sp³, dispuestos en tetraedro (109,5°). El doble enlace da sp² (120°, plano) y el triple da sp (180°, lineal).',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-org-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'quimica_organica',
    topic: 'hibridacion',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'El carbono de un grupo carbonilo (**C=O**), como el de una cetona, tiene hibridación:',
    choices: [
      {
        id: 'a',
        text: 'sp³, porque forma cuatro enlaces sigma a su alrededor.',
        correct: false,
        misconception: 'mc-hibridacion-enlaces',
        feedback:
          'El doble enlace C=O reduce a 3 los enlaces σ del carbono: es sp², no sp³.',
      },
      {
        id: 'b',
        text: 'sp, porque el oxígeno impone una geometría lineal al carbono.',
        correct: false,
        misconception: 'mc-hibridacion-enlaces',
        feedback:
          'sp requiere dos enlaces π (triple o dos dobles). El carbonilo tiene un solo doble enlace: sp².',
      },
      {
        id: 'c',
        text: 'sp², porque presenta tres enlaces sigma y un enlace pi.',
        correct: true,
      },
      {
        id: 'd',
        text: 'sp²d, por combinar orbitales d en el doble enlace con oxígeno.',
        correct: false,
        feedback:
          'El carbono no usa orbitales d. Con un doble enlace su hibridación es sp².',
      },
    ],
    explanation:
      'En el grupo carbonilo el carbono forma 3 enlaces σ (dos a sustituyentes y uno al O) y 1 enlace π (segundo enlace del C=O). Esa combinación 3σ + 1π corresponde a hibridación sp², plana, con ángulos cercanos a 120°.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-org-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'quimica_organica',
    topic: 'grupos_funcionales',
    track: 'teorico',
    type: 'matching',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Relacioná cada grupo funcional con su estructura característica:',
    pairs: [
      ['Alcohol', '−OH unido a un carbono'],
      ['Aldehído', '−CHO en un carbono terminal'],
      ['Cetona', 'C=O entre dos carbonos'],
      ['Ácido carboxílico', '−COOH'],
    ],
    explanation:
      'El grupo hidroxilo (−OH) define los alcoholes; el carbonilo terminal (−CHO) los aldehídos; el carbonilo interno (C=O) las cetonas; y el carboxilo (−COOH) los ácidos carboxílicos.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-org-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'quimica_organica',
    topic: 'grupos_funcionales',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿Cuál es el grupo funcional que caracteriza a los **ácidos carboxílicos**?',
    choices: [
      {
        id: 'a',
        text: 'El grupo hidroxilo (−OH) unido a un carbono saturado.',
        correct: false,
        misconception: 'mc-grupo-funcional-alcohol-vs-acido',
        feedback:
          'Solo −OH define a un alcohol. El ácido carboxílico tiene −COOH (carbonilo + hidroxilo juntos).',
      },
      {
        id: 'b',
        text: 'El grupo carbonilo (C=O) ubicado en un carbono terminal.',
        correct: false,
        misconception: 'mc-grupo-funcional-alcohol-vs-acido',
        feedback:
          'Un carbonilo terminal solo es un aldehído (−CHO). El ácido suma un −OH sobre ese carbono.',
      },
      {
        id: 'c',
        text: 'El grupo carboxilo (−COOH), con carbonilo e hidroxilo en el mismo carbono.',
        correct: true,
      },
      {
        id: 'd',
        text: 'El grupo amino (−NH₂) enlazado a la cadena carbonada.',
        correct: false,
        feedback:
          'El grupo amino (−NH₂) define a las aminas, no a los ácidos carboxílicos.',
      },
    ],
    explanation:
      'El ácido carboxílico se caracteriza por el grupo carboxilo −COOH, que combina un carbonilo (C=O) y un hidroxilo (−OH) sobre el mismo carbono terminal. Esa estructura le da su acidez.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'qui-org-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'quimica_organica',
    topic: 'hibridacion',
    track: 'teorico',
    type: 'true_false',
    frequency: 'media',
    difficulty: 2,
    stem: 'En una molécula con un triple enlace carbono-carbono, los dos carbonos del triple enlace tienen hibridación sp y disposición lineal.',
    choices: [
      { id: 'v', text: 'Verdadero', correct: true },
      {
        id: 'f',
        text: 'Falso',
        correct: false,
        misconception: 'mc-hibridacion-enlaces',
        feedback:
          'Un triple enlace son 1 σ + 2 π: eso deja 2 enlaces σ en cada carbono, es decir hibridación sp (lineal, 180°).',
      },
    ],
    explanation:
      'El triple enlace consta de 1 enlace σ y 2 enlaces π. Cada carbono queda con 2 enlaces σ, lo que corresponde a hibridación sp, geometría lineal y ángulos de 180°.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
