import type { Item } from '../../../types/content';

// Óptica: reflexión, refracción, espejos, lentes y el ojo humano.
// Temario UNSa (Módulo Biofísica, Unidad 11). Original.
export const items: Item[] = [
  {
    id: 'fis-opt-0001',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'optica',
    topic: 'reflexion',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 1,
    stem: 'La ley de reflexión de la luz establece que:',
    choices: [
      {
        id: 'a',
        text: 'El ángulo de incidencia es igual al ángulo de reflexión.',
        correct: true,
      },
      {
        id: 'b',
        text: 'El ángulo de incidencia es siempre mayor al de reflexión.',
        correct: false,
        feedback:
          'Ambos ángulos, medidos respecto de la normal, son iguales.',
      },
      {
        id: 'c',
        text: 'El rayo reflejado siempre sale perpendicular a la superficie.',
        correct: false,
        feedback:
          'Solo sale perpendicular si incide perpendicularmente; en general iguala al de incidencia.',
      },
      {
        id: 'd',
        text: 'El ángulo de reflexión depende del color de la luz incidente.',
        correct: false,
        feedback:
          'La reflexión no depende del color; esa dependencia aparece en la refracción (dispersión).',
      },
    ],
    explanation:
      'En la reflexión, el ángulo de incidencia y el de reflexión —medidos respecto de la normal a la superficie— son iguales, y el rayo incidente, el reflejado y la normal están en un mismo plano.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-opt-0002',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'optica',
    topic: 'espejos',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La imagen que forma un **espejo plano** de un objeto es:',
    choices: [
      {
        id: 'a',
        text: 'Real, invertida y de mayor tamaño que el objeto.',
        correct: false,
        feedback:
          'Un espejo plano no forma imágenes reales ni invertidas ni agrandadas.',
      },
      {
        id: 'b',
        text: 'Virtual, derecha y del mismo tamaño que el objeto.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Real, derecha y de menor tamaño que el objeto.',
        correct: false,
        feedback:
          'La imagen de un espejo plano es virtual (detrás del espejo) y del mismo tamaño, no menor ni real.',
      },
      {
        id: 'd',
        text: 'Virtual, invertida y de mayor tamaño que el objeto.',
        correct: false,
        feedback:
          'Es virtual, pero derecha y del mismo tamaño, no invertida ni agrandada.',
      },
    ],
    explanation:
      'El espejo plano forma una imagen virtual (se ve "detrás" del espejo), derecha y del mismo tamaño, ubicada a la misma distancia que el objeto.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-opt-0003',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'optica',
    topic: 'refraccion',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La refracción de la luz consiste en que un rayo:',
    choices: [
      {
        id: 'a',
        text: 'Cambia de dirección al pasar de un medio a otro por variar su velocidad.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Rebota en la superficie sin ingresar al segundo medio.',
        correct: false,
        feedback:
          'Ese es el fenómeno de reflexión; en la refracción el rayo sí ingresa al otro medio.',
      },
      {
        id: 'c',
        text: 'Se separa en sus colores por la forma de la superficie.',
        correct: false,
        feedback:
          'La separación de colores (dispersión) es una consecuencia, no la definición de refracción.',
      },
      {
        id: 'd',
        text: 'Se apaga al atravesar un material transparente distinto.',
        correct: false,
        feedback:
          'La luz no se "apaga"; se desvía al cambiar de medio y de velocidad.',
      },
    ],
    explanation:
      'La refracción es el cambio de dirección de la luz al pasar de un medio a otro, causado por el cambio de velocidad de propagación. Si la luz entra a un medio más denso, se acerca a la normal.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-opt-0004',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'optica',
    topic: 'lentes',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Una lente **convergente** se caracteriza porque:',
    choices: [
      {
        id: 'a',
        text: 'Es más gruesa en el centro y hace converger los rayos en un foco.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Es más delgada en el centro y dispersa los rayos que la atraviesan.',
        correct: false,
        feedback:
          'Esa descripción corresponde a una lente divergente, no a una convergente.',
      },
      {
        id: 'c',
        text: 'Tiene igual espesor en todos sus puntos y no desvía la luz.',
        correct: false,
        feedback:
          'Una lente de espesor uniforme sería una lámina; las lentes convergentes son más gruesas al centro.',
      },
      {
        id: 'd',
        text: 'Refleja los rayos hacia un mismo punto llamado foco.',
        correct: false,
        feedback:
          'Las lentes refractan (no reflejan) la luz; reflejar es propio de los espejos.',
      },
    ],
    explanation:
      'La lente convergente (más gruesa en el centro) hace que los rayos paralelos se junten en el foco. La divergente (más delgada en el centro) los separa.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-opt-0005',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'optica',
    topic: 'ojo_humano',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 3,
    stem: 'La **miopía** (dificultad para ver de lejos) se corrige con lentes:',
    choices: [
      {
        id: 'a',
        text: 'Divergentes, que alejan la imagen hasta la retina.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Convergentes, que acercan la imagen hasta la retina.',
        correct: false,
        feedback:
          'Las convergentes corrigen la hipermetropía; la miopía se corrige con divergentes.',
      },
      {
        id: 'c',
        text: 'Planas, que solo protegen el ojo sin desviar la luz.',
        correct: false,
        feedback:
          'Una lente plana no corrige el defecto porque no modifica la convergencia de los rayos.',
      },
      {
        id: 'd',
        text: 'Bifocales, que eliminan por completo el defecto del cristalino.',
        correct: false,
        feedback:
          'Los bifocales combinan graduaciones, pero la miopía en sí se corrige con lentes divergentes.',
      },
    ],
    explanation:
      'En el ojo miope la imagen se forma delante de la retina. Una lente divergente abre los rayos antes de entrar al ojo, desplazando la imagen hasta la retina.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-opt-0006',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'optica',
    topic: 'reflexion',
    track: 'teorico',
    type: 'true_false',
    frequency: 'baja',
    difficulty: 2,
    stem: 'La fibra óptica transmite luz a lo largo de su interior gracias al fenómeno de **reflexión total interna**.',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'En la fibra óptica la luz incide sobre las paredes con un ángulo mayor al crítico y se refleja totalmente hacia adentro, avanzando sin escapar del material.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
