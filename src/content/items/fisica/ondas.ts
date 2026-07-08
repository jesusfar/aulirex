import type { Item } from '../../../types/content';

// Ondas y sonido: clasificación, v = λ·f, características del sonido, Doppler.
// Temario UNSa (Módulo Biofísica, Unidad 10). Original.
export const items: Item[] = [
  {
    id: 'fis-onda-0001',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'ondas',
    topic: 'clasificacion_de_ondas',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: 'La diferencia fundamental entre una onda mecánica y una electromagnética es que:',
    choices: [
      {
        id: 'a',
        text: 'La mecánica necesita un medio material para propagarse y la electromagnética no.',
        correct: true,
      },
      {
        id: 'b',
        text: 'La electromagnética necesita un medio material y la mecánica viaja en el vacío.',
        correct: false,
        feedback:
          'Está invertido: la mecánica (como el sonido) requiere medio; la electromagnética (como la luz) viaja en el vacío.',
      },
      {
        id: 'c',
        text: 'La mecánica transporta materia y la electromagnética transporta energía.',
        correct: false,
        feedback:
          'Ninguna onda transporta materia: ambas transportan energía. La diferencia es el medio.',
      },
      {
        id: 'd',
        text: 'La electromagnética siempre es transversal y la mecánica siempre longitudinal.',
        correct: false,
        feedback:
          'No es un criterio válido: hay ondas mecánicas transversales y longitudinales.',
      },
    ],
    explanation:
      'Las ondas mecánicas (sonido, ondas en una cuerda o en el agua) necesitan un medio material. Las electromagnéticas (luz, radio, rayos X) pueden propagarse en el vacío.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-onda-0002',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'ondas',
    topic: 'clasificacion_de_ondas',
    track: 'teorico',
    type: 'true_false',
    frequency: 'media',
    difficulty: 1,
    stem: 'El sonido es una onda **longitudinal**: las partículas del medio vibran en la misma dirección en que se propaga la onda.',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'El sonido es una onda mecánica longitudinal: genera compresiones y rarefacciones donde el medio oscila en la dirección de propagación.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-onda-0003',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'ondas',
    topic: 'velocidad_de_onda',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Una onda tiene una frecuencia de 500 Hz y una longitud de onda de 0,68 m. ¿Cuál es su velocidad de propagación, en m/s?',
    numeric: { value: 340, unit: 'm/s', tolerance: 1, toleranceMode: 'abs' },
    explanation:
      'La velocidad de una onda es v = λ·f = 0,68 m × 500 Hz = 340 m/s (velocidad del sonido en aire).',
    hint: 'v = longitud de onda × frecuencia.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-onda-0004',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'ondas',
    topic: 'velocidad_de_onda',
    track: 'practico',
    type: 'numeric',
    frequency: 'media',
    difficulty: 2,
    stem: 'El sonido viaja a 340 m/s en el aire. ¿Cuál es la longitud de onda (en metros) de un sonido de 170 Hz?',
    numeric: { value: 2, unit: 'm', tolerance: 0.05, toleranceMode: 'abs' },
    explanation:
      'De v = λ·f se despeja λ = v / f = 340 / 170 = 2 m.',
    hint: 'Despejá λ = v / f.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-onda-0005',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'ondas',
    topic: 'sonido',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'La **altura** de un sonido (que lo hace agudo o grave) depende principalmente de:',
    choices: [
      {
        id: 'a',
        text: 'La amplitud de la onda sonora.',
        correct: false,
        feedback:
          'La amplitud determina la intensidad (volumen), no si el sonido es agudo o grave.',
      },
      {
        id: 'b',
        text: 'La frecuencia de la onda sonora.',
        correct: true,
      },
      {
        id: 'c',
        text: 'La forma o timbre de la onda sonora.',
        correct: false,
        feedback:
          'El timbre permite distinguir dos fuentes distintas, no la altura del sonido.',
      },
      {
        id: 'd',
        text: 'La velocidad de propagación en el medio.',
        correct: false,
        feedback:
          'La velocidad depende del medio; la altura la fija la frecuencia de la fuente.',
      },
    ],
    explanation:
      'La altura (tono) depende de la frecuencia: a mayor frecuencia, sonido más agudo. La intensidad depende de la amplitud y el timbre de la forma de onda.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-onda-0006',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'ondas',
    topic: 'efecto_doppler',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Por el **efecto Doppler**, cuando una ambulancia con la sirena encendida se acerca a un observador, este percibe un sonido:',
    choices: [
      {
        id: 'a',
        text: 'Más agudo, porque las ondas le llegan con mayor frecuencia.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Más grave, porque las ondas le llegan con menor frecuencia.',
        correct: false,
        feedback:
          'El sonido más grave se percibe cuando la fuente se ALEJA, no cuando se acerca.',
      },
      {
        id: 'c',
        text: 'Igual, porque la velocidad del sonido no cambia.',
        correct: false,
        feedback:
          'Aunque la velocidad del sonido no cambie, la frecuencia percibida sí varía por el movimiento relativo.',
      },
      {
        id: 'd',
        text: 'Más intenso, pero exactamente con la misma altura.',
        correct: false,
        feedback:
          'El efecto Doppler cambia la frecuencia percibida (la altura), no solo la intensidad.',
      },
    ],
    explanation:
      'Al acercarse la fuente, los frentes de onda se "comprimen" y llegan con mayor frecuencia: el sonido se percibe más agudo. Al alejarse, se percibe más grave.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
