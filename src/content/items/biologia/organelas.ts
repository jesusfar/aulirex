import type { Item } from '../../../types/content';

// Organelas: mitocondria (alta frecuencia, "fundamental") y sistema de endomembranas.
// Contenido original; distractores parejos en longitud y forma.
export const items: Item[] = [
  {
    id: 'bio-org-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'mitocondria_atp',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿En qué parte de la mitocondria se encuentran la cadena respiratoria y la ATP sintasa?',
    choices: [
      {
        id: 'a',
        text: 'En la membrana externa, lisa y atravesada por porinas.',
        correct: false,
        misconception: 'mc-mitocondria-membrana-externa-crestas',
        feedback:
          'La membrana externa es lisa y permeable; la cadena respiratoria está en la INTERNA (crestas).',
      },
      {
        id: 'b',
        text: 'En la membrana interna, plegada formando las crestas mitocondriales.',
        correct: true,
      },
      {
        id: 'c',
        text: 'En la matriz mitocondrial, disueltas junto al ADN circular.',
        correct: false,
        feedback:
          'En la matriz ocurre el ciclo de Krebs; la cadena respiratoria está anclada en la membrana interna.',
      },
      {
        id: 'd',
        text: 'En el espacio intermembrana, entre las dos membranas de la organela.',
        correct: false,
        feedback:
          'El espacio intermembrana acumula protones (H⁺), pero las enzimas están en la membrana interna.',
      },
    ],
    explanation:
      'La membrana interna se pliega en crestas para aumentar su superficie; allí se ubican los complejos de la cadena transportadora de electrones y la ATP sintasa. La matriz alberga el ciclo de Krebs, el ADN mitocondrial y ribosomas 70S.',
    processMapId: 'pmap-mitocondria',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-org-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'mitocondria_atp',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'En la respiración celular aeróbica, ¿cuál es el **aceptor final** de los electrones de la cadena respiratoria?',
    choices: [
      {
        id: 'a',
        text: 'El dióxido de carbono (CO₂), que se libera al final del proceso.',
        correct: false,
        misconception: 'mc-aceptor-final-electrones',
        feedback:
          'El CO₂ se libera en el ciclo de Krebs, no acepta los electrones de la cadena. El aceptor final es el O₂.',
      },
      {
        id: 'b',
        text: 'El NAD⁺, que transporta los electrones hacia el ciclo de Krebs.',
        correct: false,
        feedback:
          'El NAD⁺ es un transportador intermedio de electrones, no el aceptor final de la cadena.',
      },
      {
        id: 'c',
        text: 'El oxígeno molecular (O₂), que se reduce y forma agua.',
        correct: true,
      },
      {
        id: 'd',
        text: 'El ácido pirúvico, que ingresa a la matriz mitocondrial.',
        correct: false,
        feedback:
          'El piruvato es el producto de la glucólisis; no es el aceptor final de electrones.',
      },
    ],
    explanation:
      'En la fosforilación oxidativa, los electrones recorren la cadena respiratoria y son entregados finalmente al O₂, que se reduce y se combina con H⁺ para formar agua. Sin O₂ la cadena se detiene.',
    processMapId: 'pmap-mitocondria',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-org-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'mitocondria_atp',
    track: 'teorico',
    type: 'ordering',
    frequency: 'media',
    difficulty: 3,
    stem: 'Ordená las etapas del metabolismo aeróbico de la glucosa, desde la primera hasta la última:',
    steps: [
      'Glucólisis en el citoplasma',
      'Descarboxilación oxidativa del piruvato (formación de acetil-CoA)',
      'Ciclo de Krebs en la matriz mitocondrial',
      'Cadena transportadora de electrones y fosforilación oxidativa',
    ],
    explanation:
      'La glucosa se degrada primero en el citoplasma (glucólisis → piruvato). El piruvato entra a la mitocondria y se convierte en acetil-CoA, que alimenta el ciclo de Krebs. El NADH y FADH₂ generados ceden electrones a la cadena respiratoria, donde se produce la mayor parte del ATP.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-org-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'sistema_endomembranas',
    track: 'teorico',
    type: 'matching',
    frequency: 'media',
    difficulty: 2,
    stem: 'Relacioná cada organela del sistema de endomembranas con su función principal:',
    pairs: [
      ['Retículo endoplasmático rugoso', 'Síntesis de proteínas (por sus ribosomas)'],
      ['Retículo endoplasmático liso', 'Síntesis de lípidos y detoxificación'],
      ['Aparato de Golgi', 'Modificación, empaque y distribución de proteínas'],
      ['Lisosomas', 'Digestión intracelular con enzimas hidrolíticas'],
    ],
    explanation:
      'El sistema de endomembranas trabaja en cadena: el RER sintetiza proteínas, el REL lípidos, el Golgi las procesa y empaca en vesículas, y los lisosomas degradan material con sus hidrolasas.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
