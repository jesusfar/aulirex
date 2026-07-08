import type { Item } from '../../../types/content';

// Biofísica de fluidos: densidad, peso específico, viscosidad, tensión
// superficial, capilaridad y Ley de Laplace. Temario UNSa (Módulo Biofísica,
// Unidad 9). Original.
export const items: Item[] = [
  {
    id: 'fis-bfl-0001',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'biofisica_fluidos',
    topic: 'densidad',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Un cuerpo tiene una masa de 240 g y ocupa un volumen de 30 cm³. ¿Cuál es su densidad, en g/cm³?',
    numeric: { value: 8, unit: 'g/cm³', tolerance: 0.1, toleranceMode: 'abs' },
    explanation:
      'La densidad es masa sobre volumen: ρ = m / V = 240 g / 30 cm³ = 8 g/cm³.',
    hint: 'ρ = m / V.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-bfl-0002',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'biofisica_fluidos',
    topic: 'peso_especifico',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La diferencia entre el **peso específico** y la **densidad** de una sustancia es que el peso específico:',
    choices: [
      {
        id: 'a',
        text: 'Relaciona el peso con el volumen, por lo que depende de la gravedad.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Relaciona la masa con el volumen, sin depender de la gravedad.',
        correct: false,
        feedback:
          'Esa es la definición de densidad; el peso específico usa el peso, no la masa.',
      },
      {
        id: 'c',
        text: 'Es siempre igual a la densidad multiplicada por el volumen.',
        correct: false,
        feedback:
          'El peso específico es densidad × gravedad (ρ·g), no densidad × volumen.',
      },
      {
        id: 'd',
        text: 'Se mide en kg/m³, igual que la densidad, y son equivalentes.',
        correct: false,
        feedback:
          'El peso específico se mide en N/m³ (peso/volumen) y no equivale a la densidad.',
      },
    ],
    explanation:
      'Densidad ρ = masa/volumen (kg/m³). Peso específico = peso/volumen = ρ·g (N/m³): al depender del peso, depende de la gravedad del lugar.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-bfl-0003',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'biofisica_fluidos',
    topic: 'viscosidad',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La **viscosidad** de un fluido es una medida de:',
    choices: [
      {
        id: 'a',
        text: 'Su resistencia interna a fluir o a deformarse.',
        correct: true,
      },
      {
        id: 'b',
        text: 'La cantidad de masa que contiene por unidad de volumen.',
        correct: false,
        feedback:
          'Eso es la densidad; la viscosidad describe la resistencia a fluir.',
      },
      {
        id: 'c',
        text: 'La presión que ejerce sobre las paredes del recipiente.',
        correct: false,
        feedback:
          'Esa presión depende de otros factores; la viscosidad mide la resistencia al flujo.',
      },
      {
        id: 'd',
        text: 'La temperatura a la que el fluido comienza a hervir.',
        correct: false,
        feedback:
          'La viscosidad no es una temperatura; sí depende de ella, pero mide la fricción interna.',
      },
    ],
    explanation:
      'La viscosidad es la resistencia interna de un fluido a fluir (fricción entre sus capas). La miel es más viscosa que el agua. En los líquidos, la viscosidad disminuye al aumentar la temperatura.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-bfl-0004',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'biofisica_fluidos',
    topic: 'viscosidad',
    track: 'teorico',
    type: 'true_false',
    frequency: 'baja',
    difficulty: 2,
    stem: 'En los **líquidos**, al aumentar la temperatura la viscosidad disminuye (fluyen con más facilidad).',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'Al calentar un líquido, sus moléculas se mueven más y las fuerzas de cohesión pierden efecto: la viscosidad baja. (En los gases ocurre lo contrario: la viscosidad aumenta con la temperatura.)',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-bfl-0005',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'biofisica_fluidos',
    topic: 'tension_superficial',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La **tensión superficial** explica por qué:',
    choices: [
      {
        id: 'a',
        text: 'Una gota de agua tiende a adoptar forma esférica.',
        correct: true,
      },
      {
        id: 'b',
        text: 'El agua caliente se evapora más rápido que la fría.',
        correct: false,
        feedback:
          'La evaporación se relaciona con la temperatura y la presión de vapor, no con la tensión superficial.',
      },
      {
        id: 'c',
        text: 'Los objetos más densos que el agua se hunden en ella.',
        correct: false,
        feedback:
          'Que un objeto se hunda depende de la densidad y el empuje (Arquímedes), no de la tensión superficial.',
      },
      {
        id: 'd',
        text: 'El hielo flota sobre el agua líquida a 0 °C.',
        correct: false,
        feedback:
          'El hielo flota por ser menos denso que el agua, no por la tensión superficial.',
      },
    ],
    explanation:
      'En la superficie de un líquido las moléculas sufren una fuerza neta hacia el interior (cohesión), que tiende a minimizar el área: por eso las gotas se vuelven esféricas y algunos insectos caminan sobre el agua.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-bfl-0006',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'biofisica_fluidos',
    topic: 'ley_de_laplace',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'baja',
    difficulty: 3,
    stem: 'Según la **Ley de Laplace**, la presión en el interior de una burbuja o gota, respecto de su radio, es:',
    choices: [
      {
        id: 'a',
        text: 'Inversamente proporcional al radio: a menor radio, mayor presión.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Directamente proporcional al radio: a menor radio, menor presión.',
        correct: false,
        feedback:
          'Es al revés: cuanto más pequeña la burbuja, mayor es su presión interna.',
      },
      {
        id: 'c',
        text: 'Independiente del radio: la presión es la misma en toda burbuja.',
        correct: false,
        feedback:
          'La presión sí depende del radio (relación inversa) y de la tensión superficial.',
      },
      {
        id: 'd',
        text: 'Proporcional al cuadrado del radio de la burbuja.',
        correct: false,
        feedback:
          'La relación de Laplace es inversa con el radio (1/r), no cuadrática.',
      },
    ],
    explanation:
      'La Ley de Laplace indica que la sobrepresión dentro de una burbuja es proporcional a la tensión superficial e inversamente proporcional al radio (P ∝ 1/r). Por eso las alvéolos pequeños tenderían a colapsar sin el surfactante pulmonar.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
