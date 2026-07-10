import type { Item } from '../../../../../types/content';

// Verdadero/Falso en serie: varias afirmaciones sobre un mismo tema, cada una
// V o F. Muy usado en el ingreso ("marque V o F según corresponda"). Original.
export const items: Item[] = [
  {
    id: 'bio-vf-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'membrana_plasmatica',
    track: 'teorico',
    type: 'true_false_series',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Indicá si cada afirmación sobre la membrana plasmática es Verdadera o Falsa:',
    statements: [
      { text: 'Los fosfolípidos son moléculas anfipáticas.', correct: true },
      { text: 'Está formada únicamente por lípidos.', correct: false },
      { text: 'Presenta permeabilidad selectiva.', correct: true },
      { text: 'El colesterol forma parte de su composición.', correct: true },
      { text: 'Los glúcidos se ubican en la cara citosólica (interna).', correct: false },
    ],
    explanation:
      'La membrana es un mosaico fluido de lípidos, proteínas y glúcidos. Los fosfolípidos son anfipáticos, la permeabilidad es selectiva y el colesterol está presente. El glucocáliz (glúcidos) mira hacia el EXTERIOR, no al citosol.',
    processMapId: 'pmap-transporte',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-vf-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'mitocondria_atp',
    track: 'teorico',
    type: 'true_false_series',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Indicá si cada afirmación sobre la mitocondria es Verdadera o Falsa:',
    statements: [
      { text: 'La membrana interna se pliega formando las crestas.', correct: true },
      { text: 'El ciclo de Krebs ocurre en la matriz.', correct: true },
      { text: 'El aceptor final de electrones es el CO₂.', correct: false },
      { text: 'Posee ADN circular propio.', correct: true },
      { text: 'La membrana externa es la que aloja la cadena respiratoria.', correct: false },
    ],
    explanation:
      'Las crestas (membrana interna) albergan la cadena respiratoria y la ATP sintasa; el ciclo de Krebs ocurre en la matriz, que además tiene ADN circular. El aceptor final de electrones es el O₂ (no el CO₂). La membrana externa es lisa y permeable.',
    processMapId: 'pmap-mitocondria',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
