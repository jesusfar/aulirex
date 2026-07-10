import type { Item } from '../../../../../types/content';

// Biología humana: histología (tejidos), matriz extracelular y uniones
// intercelulares. Temario UNSa (Módulo Biología, Unidad 4). Original.
export const items: Item[] = [
  {
    id: 'bio-hist-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'matriz_extracelular',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Respecto de la **matriz extracelular**, ¿cuál de las siguientes afirmaciones es correcta?',
    choices: [
      {
        id: 'a',
        text: 'Presenta glicoproteínas, como la fibronectina, que favorecen la adhesión celular.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Está formada únicamente por agua y sales, sin componentes proteicos.',
        correct: false,
        feedback:
          'La matriz tiene proteínas fibrosas (colágeno, elastina) y glicoproteínas, además de la sustancia fundamental.',
      },
      {
        id: 'c',
        text: 'Se encuentra dentro del núcleo y organiza la cromatina celular.',
        correct: false,
        feedback:
          'La matriz extracelular está fuera de la célula, no dentro del núcleo.',
      },
      {
        id: 'd',
        text: 'Es exclusiva del tejido nervioso y no aparece en otros tejidos.',
        correct: false,
        feedback:
          'La matriz extracelular es abundante sobre todo en los tejidos conectivos, no en el nervioso.',
      },
    ],
    explanation:
      'La matriz extracelular combina una sustancia fundamental (con proteoglucanos), proteínas fibrosas (colágeno, elastina) y glicoproteínas de adhesión (fibronectina, laminina) que anclan las células y les dan sostén.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-hist-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'tejido_epitelial',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Una característica típica del **tejido epitelial** es que:',
    choices: [
      {
        id: 'a',
        text: 'Sus células están muy unidas entre sí, con escasa matriz extracelular.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Sus células están muy separadas, con abundante matriz entre ellas.',
        correct: false,
        feedback:
          'Esa descripción corresponde al tejido conectivo, no al epitelial.',
      },
      {
        id: 'c',
        text: 'Está formado por células contráctiles que generan movimiento.',
        correct: false,
        feedback:
          'Las células contráctiles son propias del tejido muscular.',
      },
      {
        id: 'd',
        text: 'Conduce impulsos eléctricos a través de prolongaciones largas.',
        correct: false,
        feedback:
          'La conducción de impulsos es función del tejido nervioso.',
      },
    ],
    explanation:
      'El tejido epitelial reviste superficies y cavidades: sus células están muy juntas (con uniones intercelulares), tiene poca matriz extracelular y suele ser avascular.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-hist-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'tejido_conectivo',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: '¿Cuál de los siguientes es un tejido conectivo **especializado**?',
    choices: [
      {
        id: 'a',
        text: 'El tejido óseo, con matriz mineralizada.',
        correct: true,
      },
      {
        id: 'b',
        text: 'El tejido epitelial de revestimiento.',
        correct: false,
        feedback:
          'El epitelial no es un tejido conectivo; recubre superficies.',
      },
      {
        id: 'c',
        text: 'El tejido muscular liso de las vísceras.',
        correct: false,
        feedback:
          'El muscular es contráctil, no es un tejido conectivo.',
      },
      {
        id: 'd',
        text: 'El tejido nervioso del encéfalo.',
        correct: false,
        feedback:
          'El nervioso conduce impulsos; no es un tejido conectivo.',
      },
    ],
    explanation:
      'Los tejidos conectivos especializados incluyen el óseo (matriz mineralizada), el cartilaginoso, el adiposo y la sangre. Todos derivan del tejido conectivo y se caracterizan por abundante matriz extracelular.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-hist-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'tejido_muscular',
    track: 'teorico',
    type: 'true_false',
    frequency: 'media',
    difficulty: 1,
    stem: 'El tejido muscular se caracteriza por su capacidad de **contraerse** y generar movimiento.',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'El tejido muscular está formado por células contráctiles (con actina y miosina). Se clasifica en liso, estriado esquelético y estriado cardíaco.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-hist-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'tejido_nervioso',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'El tejido nervioso está formado principalmente por:',
    choices: [
      {
        id: 'a',
        text: 'Neuronas y células gliales que sostienen y nutren a las neuronas.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Fibras de colágeno y elastina inmersas en una matriz abundante.',
        correct: false,
        feedback:
          'Colágeno y elastina son de los tejidos conectivos, no del nervioso.',
      },
      {
        id: 'c',
        text: 'Células planas muy unidas que revisten cavidades del cuerpo.',
        correct: false,
        feedback:
          'Esa es la descripción de un epitelio, no del tejido nervioso.',
      },
      {
        id: 'd',
        text: 'Células con gran cantidad de lípidos para reservar energía.',
        correct: false,
        feedback:
          'Las células cargadas de lípidos son los adipocitos (tejido adiposo).',
      },
    ],
    explanation:
      'El tejido nervioso está formado por neuronas (que generan y conducen el impulso nervioso) y células gliales o de la neuroglía (que las sostienen, aíslan y nutren).',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-hist-0006',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'uniones_intercelulares',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 3,
    stem: 'La **unión estrecha** (zonula occludens) entre células epiteliales sirve principalmente para:',
    choices: [
      {
        id: 'a',
        text: 'Sellar el espacio entre células e impedir el paso de sustancias.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Formar canales que comunican el citoplasma de células vecinas.',
        correct: false,
        feedback:
          'Los canales que comunican citoplasmas son las uniones comunicantes (gap), no las estrechas.',
      },
      {
        id: 'c',
        text: 'Anclar las células a la matriz extracelular subyacente.',
        correct: false,
        feedback:
          'El anclaje a la matriz lo realizan uniones de tipo hemidesmosoma, no la unión estrecha.',
      },
      {
        id: 'd',
        text: 'Aumentar la superficie de absorción de la célula.',
        correct: false,
        feedback:
          'Aumentar la superficie de absorción es función de las microvellosidades.',
      },
    ],
    explanation:
      'La unión estrecha sella el espacio entre células adyacentes formando una barrera que impide el paso libre de sustancias entre ellas (por ejemplo, en el epitelio intestinal).',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-hist-0007',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'uniones_intercelulares',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'baja',
    difficulty: 2,
    stem: 'Las **uniones comunicantes** (gap o nexo) permiten:',
    choices: [
      {
        id: 'a',
        text: 'El paso de iones y moléculas pequeñas entre células vecinas.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Sellar por completo el espacio entre células contiguas.',
        correct: false,
        feedback:
          'Sellar el espacio es propio de la unión estrecha, no de la comunicante.',
      },
      {
        id: 'c',
        text: 'Sintetizar proteínas de exportación en el epitelio.',
        correct: false,
        feedback:
          'La síntesis de proteínas ocurre en los ribosomas, no en una unión intercelular.',
      },
      {
        id: 'd',
        text: 'Unir la célula a las fibras de colágeno de la matriz.',
        correct: false,
        feedback:
          'Esa función de anclaje la cumplen otras uniones, no la comunicante.',
      },
    ],
    explanation:
      'Las uniones comunicantes forman canales (conexones) que conectan los citoplasmas de células vecinas, permitiendo el paso de iones y pequeñas moléculas: coordinan, por ejemplo, la contracción del músculo cardíaco.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-hist-0008',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'histologia',
    topic: 'uniones_intercelulares',
    track: 'teorico',
    type: 'true_false',
    frequency: 'baja',
    difficulty: 1,
    stem: 'Las **microvellosidades** son prolongaciones de la membrana que aumentan la superficie de absorción de la célula.',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'Las microvellosidades son repliegues digitiformes de la membrana apical (por ejemplo, en el epitelio intestinal) que amplían enormemente la superficie disponible para la absorción.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
