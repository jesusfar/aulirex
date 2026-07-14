import type { Item } from '../../../../../types/content';
import { mc, num, tf } from '../_build';

const S = 'fisica' as const;

export const items: Item[] = [
  mc({
    id: 'gna-fis-est-1',
    subject: S,
    block: 'estatica',
    topic: 'fuerzas',
    difficulty: 2,
    stem: 'La fuerza es una magnitud vectorial. Esto significa que, para quedar definida, necesita:',
    choices: [
      { t: 'módulo, dirección y sentido.', ok: true },
      { t: 'únicamente un valor numérico.' },
      { t: 'solamente una unidad de medida.' },
      { t: 'nada más que un punto de aplicación.' },
    ],
    explanation:
      'Una magnitud vectorial queda definida por módulo, dirección y sentido (y su punto de aplicación).',
  }),
  num({
    id: 'gna-fis-cin-1',
    subject: S,
    block: 'cinematica',
    topic: 'mru',
    difficulty: 2,
    stem: 'Un móvil recorre 150 m en 10 s a velocidad constante. ¿Cuál es su velocidad (en m/s)?',
    value: 15,
    unit: 'm/s',
    tolerance: 0,
    explanation: 'En MRU, $v = \\dfrac{\\Delta x}{\\Delta t} = \\dfrac{150}{10} = 15$ m/s.',
  }),
  mc({
    id: 'gna-fis-cin-2',
    subject: S,
    block: 'cinematica',
    topic: 'caida_libre',
    difficulty: 2,
    stem: 'En caída libre (sin rozamiento), dos cuerpos de distinta masa soltados desde la misma altura:',
    choices: [
      { t: 'llegan al suelo al mismo tiempo.', ok: true },
      { t: 'llega antes el más pesado.' },
      { t: 'llega antes el más liviano.' },
      { t: 'quedan flotando por su peso.' },
    ],
    explanation:
      'Sin rozamiento, la aceleración de la gravedad es la misma para todos; la masa no influye en el tiempo de caída.',
  }),
  num({
    id: 'gna-fis-din-1',
    subject: S,
    block: 'dinamica',
    topic: 'segunda_ley_newton',
    difficulty: 2,
    stem: 'Una fuerza neta de 20 N actúa sobre un cuerpo de 4 kg. ¿Qué aceleración adquiere (en m/s²)?',
    value: 5,
    unit: 'm/s²',
    tolerance: 0,
    explanation: 'Por la 2ª ley de Newton, $a = \\dfrac{F}{m} = \\dfrac{20}{4} = 5$ m/s².',
  }),
  tf({
    id: 'gna-fis-din-2',
    subject: S,
    block: 'dinamica',
    topic: 'accion_y_reaccion',
    difficulty: 1,
    stem: 'Según el principio de acción y reacción, a toda fuerza se le opone otra de igual módulo y sentido contrario.',
    answer: true,
    explanation:
      'Es la 3ª ley de Newton: las fuerzas aparecen de a pares, iguales en módulo y opuestas en sentido, sobre cuerpos distintos.',
  }),
  mc({
    id: 'gna-fis-ene-1',
    subject: S,
    block: 'trabajo_y_energia',
    topic: 'energia_cinetica',
    difficulty: 3,
    stem: 'Si la velocidad de un cuerpo se duplica, su energía cinética:',
    choices: [
      { t: 'se cuadruplica.', ok: true },
      { t: 'se duplica.' },
      { t: 'no cambia.' },
      { t: 'se reduce a la mitad.' },
    ],
    explanation:
      'Como $E_c = \\tfrac{1}{2}mv^2$, la energía depende del cuadrado de la velocidad: al duplicar $v$, $E_c$ crece ×4.',
  }),
  num({
    id: 'gna-fis-hid-1',
    subject: S,
    block: 'hidrostatica',
    topic: 'presion',
    difficulty: 2,
    stem: 'Una fuerza de 100 N se aplica sobre una superficie de 2 m². ¿Cuál es la presión (en Pa)?',
    value: 50,
    unit: 'Pa',
    tolerance: 0,
    explanation: 'Presión $= \\dfrac{F}{A} = \\dfrac{100}{2} = 50$ Pa.',
  }),
  mc({
    id: 'gna-fis-cal-1',
    subject: S,
    block: 'calor_y_temperatura',
    topic: 'escalas',
    difficulty: 2,
    stem: '¿A cuántos kelvin equivalen 0 °C?',
    choices: [
      { t: '273 K', ok: true },
      { t: '0 K' },
      { t: '100 K' },
      { t: '−273 K' },
    ],
    explanation: 'La conversión es $K = °C + 273$; por lo tanto $0 °C = 273$ K.',
  }),
  mc({
    id: 'gna-fis-ele-1',
    subject: S,
    block: 'electricidad',
    topic: 'ley_de_ohm',
    difficulty: 2,
    stem: 'Según la ley de Ohm, si aumenta la resistencia y la tensión se mantiene constante, la intensidad de corriente:',
    choices: [
      { t: 'disminuye.', ok: true },
      { t: 'aumenta.' },
      { t: 'no cambia.' },
      { t: 'se vuelve negativa.' },
    ],
    explanation:
      'De $V = I\\,R$ surge $I = \\dfrac{V}{R}$: con V constante, la corriente es inversamente proporcional a la resistencia.',
  }),
];
