import type { Item } from '../../../types/content';

// Magnetismo: polos, campo magnético, la Tierra como imán y relación con la
// corriente eléctrica. Temario UNSa (Módulo Biofísica, Unidad 12). Original.
export const items: Item[] = [
  {
    id: 'fis-mag-0001',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'magnetismo',
    topic: 'polos_magneticos',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 1,
    stem: 'Respecto de los polos de un imán, es correcto afirmar que:',
    choices: [
      {
        id: 'a',
        text: 'Polos iguales se repelen y polos distintos se atraen.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Polos iguales se atraen y polos distintos se repelen.',
        correct: false,
        feedback:
          'Es al revés: iguales se repelen, distintos se atraen (como en las cargas eléctricas).',
      },
      {
        id: 'c',
        text: 'Todos los polos se atraen entre sí sin excepción.',
        correct: false,
        feedback:
          'No todos se atraen: los polos iguales se repelen.',
      },
      {
        id: 'd',
        text: 'Un imán puede tener un solo polo si se lo corta al medio.',
        correct: false,
        feedback:
          'Al cortar un imán aparecen dos nuevos imanes con ambos polos: no existe el monopolo magnético.',
      },
    ],
    explanation:
      'En los imanes, polos iguales se repelen y polos distintos se atraen. Además, los polos no pueden aislarse: al partir un imán se obtienen imanes más pequeños, cada uno con polo norte y sur.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-mag-0002',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'magnetismo',
    topic: 'campo_magnetico',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'La aguja de una brújula se orienta porque:',
    choices: [
      {
        id: 'a',
        text: 'La Tierra se comporta como un gran imán con un campo magnético.',
        correct: true,
      },
      {
        id: 'b',
        text: 'El peso de la aguja la inclina siempre hacia el norte geográfico.',
        correct: false,
        feedback:
          'No es un efecto del peso: la aguja responde al campo magnético terrestre.',
      },
      {
        id: 'c',
        text: 'La rotación de la Tierra la empuja mecánicamente en una dirección.',
        correct: false,
        feedback:
          'La orientación no se debe a la rotación, sino al magnetismo terrestre.',
      },
      {
        id: 'd',
        text: 'La gravedad atrae la punta metálica hacia los polos del planeta.',
        correct: false,
        feedback:
          'La gravedad no distingue direcciones horizontales; lo que orienta la aguja es el campo magnético.',
      },
    ],
    explanation:
      'La Tierra genera un campo magnético (como un imán gigante). La aguja imantada de la brújula se alinea con ese campo, señalando aproximadamente el norte.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-mag-0003',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'magnetismo',
    topic: 'campo_magnetico',
    track: 'teorico',
    type: 'true_false',
    frequency: 'baja',
    difficulty: 2,
    stem: 'Una corriente eléctrica que circula por un conductor genera a su alrededor un campo magnético.',
    choices: [
      { id: 'a', text: 'Verdadero', correct: true },
      { id: 'b', text: 'Falso', correct: false },
    ],
    explanation:
      'Toda corriente eléctrica crea un campo magnético a su alrededor (experiencia de Oersted). Es el principio de los electroimanes: electricidad y magnetismo están vinculados.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'fis-mag-0004',
    institutions: ['UNSa'],
    subject: 'fisica',
    block: 'magnetismo',
    topic: 'polos_magneticos',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'baja',
    difficulty: 2,
    stem: '¿Cuál de estas afirmaciones distingue correctamente el campo eléctrico del magnético?',
    choices: [
      {
        id: 'a',
        text: 'El eléctrico actúa sobre cargas; el magnético, sobre imanes y cargas en movimiento.',
        correct: true,
      },
      {
        id: 'b',
        text: 'El eléctrico actúa solo sobre imanes; el magnético, solo sobre cargas en reposo.',
        correct: false,
        feedback:
          'Está cruzado: el eléctrico actúa sobre cargas y el magnético sobre cargas en movimiento e imanes.',
      },
      {
        id: 'c',
        text: 'Ambos actúan únicamente sobre cuerpos sin carga eléctrica.',
        correct: false,
        feedback:
          'Ambos se relacionan con cargas; no actúan sobre cuerpos neutros del mismo modo.',
      },
      {
        id: 'd',
        text: 'El magnético solo existe si no hay ninguna carga presente.',
        correct: false,
        feedback:
          'El campo magnético se origina justamente por cargas en movimiento (corrientes) o imanes.',
      },
    ],
    explanation:
      'El campo eléctrico ejerce fuerza sobre cargas (en reposo o en movimiento). El campo magnético actúa sobre imanes y sobre cargas en movimiento (corrientes), pero no sobre una carga en reposo.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
