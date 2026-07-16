import type { Item } from '../../../../../types/content';
import { mc, num } from '../_build';

const S = 'matematica' as const;

export const items: Item[] = [
  mc({
    id: 'gna-mat-cn-1',
    subject: S,
    block: 'campo_numerico',
    topic: 'notacion_cientifica',
    difficulty: 2,
    stem: 'El número 0,00042 expresado en notación científica es:',
    choices: [
      { t: '$4{,}2 \\times 10^{-4}$', ok: true },
      { t: '$4{,}2 \\times 10^{-3}$' },
      { t: '$42 \\times 10^{-4}$' },
      { t: '$4{,}2 \\times 10^{4}$' },
    ],
    explanation:
      'Se corre la coma 4 lugares a la derecha para obtener 4,2, por lo que el exponente es −4.',
  }),
  num({
    id: 'gna-mat-cn-2',
    subject: S,
    block: 'campo_numerico',
    topic: 'regla_de_tres',
    difficulty: 1,
    stem: 'Si 3 kg de yerba cuestan $2400, ¿cuánto cuestan 5 kg al mismo precio? (en pesos)',
    value: 4000,
    unit: '$',
    tolerance: 0,
    explanation: 'Regla de tres directa: 2400 ÷ 3 = 800 por kg; 800 × 5 = 4000.',
  }),
  mc({
    id: 'gna-mat-cn-3',
    subject: S,
    block: 'campo_numerico',
    topic: 'potencias_y_radicales',
    difficulty: 2,
    stem: 'El valor de $2^{-3}$ es:',
    choices: [
      { t: '$\\dfrac{1}{8}$', ok: true },
      { t: '$-8$' },
      { t: '$-6$' },
      { t: '$\\dfrac{1}{6}$' },
    ],
    explanation:
      'Un exponente negativo invierte la base: $2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8}$.',
  }),
  num({
    id: 'gna-mat-fe-1',
    subject: S,
    block: 'funciones_y_ecuaciones',
    topic: 'ecuacion_primer_grado',
    difficulty: 1,
    stem: 'Resolvé para x: $3x - 7 = 11$.',
    value: 6,
    tolerance: 0,
    explanation: 'Sumando 7: $3x = 18$; dividiendo por 3: $x = 6$.',
  }),
  mc({
    id: 'gna-mat-fe-2',
    subject: S,
    block: 'funciones_y_ecuaciones',
    topic: 'funcion_cuadratica',
    difficulty: 3,
    stem: 'Las raíces de $x^2 - 5x + 6 = 0$ son:',
    choices: [
      { t: '$x = 2$ y $x = 3$', ok: true },
      { t: '$x = -2$ y $x = -3$' },
      { t: '$x = 1$ y $x = 6$' },
      { t: '$x = -1$ y $x = -6$' },
    ],
    explanation:
      'Se buscan dos números que sumen 5 y multipliquen 6: son 2 y 3. También sale por la fórmula resolvente.',
  }),
  mc({
    id: 'gna-mat-fe-3',
    subject: S,
    block: 'funciones_y_ecuaciones',
    topic: 'funcion_lineal',
    difficulty: 2,
    stem: 'En la recta $y = 2x + 1$, la pendiente y la ordenada al origen son, respectivamente:',
    choices: [
      { t: 'pendiente 2 y ordenada al origen 1', ok: true },
      { t: 'pendiente 1 y ordenada al origen 2' },
      { t: 'pendiente −2 y ordenada al origen 1' },
      { t: 'pendiente 2 y ordenada al origen −1' },
    ],
    explanation:
      'En $y = mx + b$, $m$ es la pendiente (2) y $b$ la ordenada al origen (1).',
  }),
  num({
    id: 'gna-mat-geo-1',
    subject: S,
    block: 'geometria_plana',
    topic: 'teorema_de_pitagoras',
    difficulty: 2,
    stem: 'En un triángulo rectángulo los catetos miden 3 y 4. ¿Cuánto mide la hipotenusa?',
    value: 5,
    tolerance: 0,
    explanation: '$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
  }),
  num({
    id: 'gna-mat-geo-2',
    subject: S,
    block: 'geometria_plana',
    topic: 'perimetros_y_areas',
    difficulty: 1,
    stem: 'El área de un rectángulo de base 8 cm y altura 5 cm es (en cm²):',
    value: 40,
    unit: 'cm²',
    tolerance: 0,
    explanation: 'Área del rectángulo = base × altura = 8 × 5 = 40 cm².',
  }),
  mc({
    id: 'gna-mat-geo-3',
    subject: S,
    block: 'geometria_plana',
    topic: 'angulos',
    difficulty: 2,
    stem: 'Dos ángulos son complementarios. Si uno mide 35°, ¿cuánto mide el otro?',
    choices: [
      { t: '55°', ok: true },
      { t: '145°' },
      { t: '65°' },
      { t: '35°' },
    ],
    explanation:
      'Los ángulos complementarios suman 90°: 90° − 35° = 55°.',
  }),

  // ---- Teoría (conceptos del temario que no requieren cálculo variable) ----
  mc({
    id: 'gna-mat-cn-4',
    subject: S,
    block: 'campo_numerico',
    topic: 'clasificacion_numeros',
    difficulty: 2,
    stem: '¿A qué conjunto pertenece el número $\\sqrt{2}$?',
    choices: [
      { t: 'A los irracionales.', ok: true },
      { t: 'A los naturales.' },
      { t: 'A los enteros.' },
      { t: 'A los racionales.' },
    ],
    explanation:
      '$\\sqrt{2}$ tiene infinitas cifras decimales no periódicas: no puede escribirse como fracción, por eso es irracional.',
  }),
  mc({
    id: 'gna-mat-cn-5',
    subject: S,
    block: 'campo_numerico',
    topic: 'numeros_complejos',
    difficulty: 3,
    stem: 'En el conjunto de los números complejos, la unidad imaginaria $i$ se define de modo que:',
    choices: [
      { t: '$i^2 = -1$.', ok: true },
      { t: '$i^2 = 1$.' },
      { t: '$i = 0$.' },
      { t: '$i = \\sqrt{2}$.' },
    ],
    explanation:
      'La unidad imaginaria cumple $i = \\sqrt{-1}$, por lo tanto $i^2 = -1$. Permite resolver ecuaciones sin solución real.',
  }),
  mc({
    id: 'gna-mat-alg-1',
    subject: S,
    block: 'operaciones_algebraicas',
    topic: 'teorema_del_resto',
    difficulty: 3,
    stem: 'Según el teorema del resto, el resto de dividir un polinomio $P(x)$ por $(x - a)$ es igual a:',
    choices: [
      { t: '$P(a)$.', ok: true },
      { t: '$P(0)$.' },
      { t: '$0$ siempre.' },
      { t: 'el coeficiente principal de $P(x)$.' },
    ],
    explanation:
      'El teorema del resto afirma que el resto de $P(x) \\div (x-a)$ es el valor numérico $P(a)$.',
  }),
  mc({
    id: 'gna-mat-alg-2',
    subject: S,
    block: 'operaciones_algebraicas',
    topic: 'factoreo',
    difficulty: 2,
    stem: 'La factorización de $x^2 - 9$ es:',
    choices: [
      { t: '$(x - 3)(x + 3)$.', ok: true },
      { t: '$(x - 3)^2$.' },
      { t: '$(x + 3)^2$.' },
      { t: '$(x - 9)(x + 1)$.' },
    ],
    explanation:
      'Es una diferencia de cuadrados: $a^2 - b^2 = (a-b)(a+b)$, con $a = x$ y $b = 3$.',
  }),
  mc({
    id: 'gna-mat-fe-4',
    subject: S,
    block: 'funciones_y_ecuaciones',
    topic: 'paralelismo_y_perpendicularidad',
    difficulty: 3,
    stem: 'Dos rectas son perpendiculares cuando el producto de sus pendientes es:',
    choices: [
      { t: '$-1$.', ok: true },
      { t: '$1$.' },
      { t: '$0$.' },
      { t: 'igual a la ordenada al origen.' },
    ],
    explanation:
      'Rectas paralelas tienen igual pendiente; perpendiculares cumplen $m_1 \\cdot m_2 = -1$.',
  }),
  mc({
    id: 'gna-mat-fe-5',
    subject: S,
    block: 'funciones_y_ecuaciones',
    topic: 'inecuaciones',
    difficulty: 3,
    stem: 'Al resolver la inecuación $-2x > 6$, se obtiene:',
    choices: [
      { t: '$x < -3$.', ok: true },
      { t: '$x > -3$.' },
      { t: '$x > 3$.' },
      { t: '$x < 3$.' },
    ],
    explanation:
      'Al dividir por un número negativo se invierte el sentido de la desigualdad: $x < 6/(-2) = -3$.',
  }),
  mc({
    id: 'gna-mat-tr-1',
    subject: S,
    block: 'funciones_trascendentes',
    topic: 'funcion_exponencial',
    difficulty: 2,
    stem: 'La función $y = 2^x$ es una función exponencial. ¿Qué valor toma cuando $x = 0$?',
    choices: [
      { t: '$1$.', ok: true },
      { t: '$0$.' },
      { t: '$2$.' },
      { t: 'no está definida.' },
    ],
    explanation:
      'Toda potencia de exponente 0 vale 1: $2^0 = 1$. La gráfica corta al eje y en (0, 1).',
  }),
  mc({
    id: 'gna-mat-geo-4',
    subject: S,
    block: 'geometria_plana',
    topic: 'teorema_de_tales',
    difficulty: 3,
    stem: 'El teorema de Tales se aplica cuando:',
    choices: [
      { t: 'un haz de rectas paralelas corta a dos transversales, generando segmentos proporcionales.', ok: true },
      { t: 'dos ángulos suman 180°.' },
      { t: 'un triángulo tiene sus tres lados iguales.' },
      { t: 'una recta pasa por el origen de coordenadas.' },
    ],
    explanation:
      'El teorema de Tales establece que rectas paralelas cortadas por dos transversales determinan segmentos proporcionales.',
  }),
];
