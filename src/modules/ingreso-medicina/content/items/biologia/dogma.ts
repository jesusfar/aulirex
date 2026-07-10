import type { Item } from '../../../../../types/content';

// Dogma central. La guía insiste: "lo que más se toma son las enzimas que
// participan en cada etapa". Contenido original.
export const items: Item[] = [
  {
    id: 'bio-dog-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_molecular',
    topic: 'dogma_central',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿Qué enzima sintetiza una cadena de ARN mensajero usando el ADN como molde (transcripción)?',
    choices: [
      {
        id: 'a',
        text: 'ADN polimerasa, que recorre el molde en dirección 3′→5′.',
        correct: false,
        misconception: 'mc-enzimas-dogma',
        feedback:
          'La ADN polimerasa actúa en la duplicación del ADN, no en la transcripción a ARN.',
      },
      {
        id: 'b',
        text: 'ARN polimerasa, que agrega ribonucleótidos complementarios.',
        correct: true,
      },
      {
        id: 'c',
        text: 'ADN ligasa, que une fragmentos durante el copiado del molde.',
        correct: false,
        misconception: 'mc-enzimas-dogma',
        feedback:
          'La ligasa une fragmentos de Okazaki en la duplicación; no transcribe ARN.',
      },
      {
        id: 'd',
        text: 'Primasa, que traduce el mensaje del ARN a una proteína.',
        correct: false,
        misconception: 'mc-enzimas-dogma',
        feedback:
          'La primasa fabrica cebadores de ARN en la duplicación; la traducción la hacen los ribosomas.',
      },
    ],
    explanation:
      'La transcripción (ADN → ARN) está catalizada por la ARN polimerasa, que lee el molde de ADN y polimeriza ribonucleótidos. La duplicación (ADN → ADN) usa ADN polimerasa; la traducción (ARN → proteína) ocurre en el ribosoma.',
    processMapId: 'pmap-dogma',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-dog-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_molecular',
    topic: 'dogma_central',
    track: 'teorico',
    type: 'ordering',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Ordená los procesos del dogma central según el flujo de la información genética:',
    steps: [
      'Duplicación del ADN (ADN → ADN)',
      'Transcripción (ADN → ARNm)',
      'Traducción (ARNm → proteína)',
    ],
    explanation:
      'El dogma central describe el flujo: el ADN se duplica para transmitirse, se transcribe a ARNm y este se traduce a proteína en el ribosoma. Cada etapa tiene su enzima característica.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-dog-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_molecular',
    topic: 'dogma_central',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿Dónde ocurre la traducción y qué estructura la lleva a cabo?',
    choices: [
      {
        id: 'a',
        text: 'En el núcleo, catalizada por la ARN polimerasa sobre el molde.',
        correct: false,
        misconception: 'mc-enzimas-dogma',
        feedback:
          'En el núcleo ocurre la transcripción (ARN polimerasa). La traducción es citoplasmática, en el ribosoma.',
      },
      {
        id: 'b',
        text: 'En el nucléolo, por acción directa de la ADN polimerasa.',
        correct: false,
        misconception: 'mc-enzimas-dogma',
        feedback:
          'En el nucléolo se arman subunidades ribosómicas; la ADN polimerasa no traduce.',
      },
      {
        id: 'c',
        text: 'En el citoplasma, por el ribosoma que lee el ARN mensajero.',
        correct: true,
      },
      {
        id: 'd',
        text: 'En la mitocondria, mediante la enzima transcriptasa inversa.',
        correct: false,
        feedback:
          'La transcriptasa inversa hace ARN → ADN (retrovirus); no es la enzima de la traducción.',
      },
    ],
    explanation:
      'La traducción ocurre en los ribosomas del citoplasma (libres o en el RER). El ribosoma lee los codones del ARNm y, con los ARNt, ensambla los aminoácidos en la proteína.',
    processMapId: 'pmap-dogma',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
