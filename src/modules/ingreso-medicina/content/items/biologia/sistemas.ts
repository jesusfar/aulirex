import type { Item } from '../../../../../types/content';

// Sistemas humanos: hematosis, nefrona, ciclo cardíaco y sistema nervioso
// autónomo. La guía marca estos como los puntos clave de cada sistema. Original.
export const items: Item[] = [
  {
    id: 'bio-sis-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'sistemas_humanos',
    topic: 'hematosis',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Durante la hematosis (intercambio gaseoso alvéolo-capilar), ¿en qué dirección se mueven los gases?',
    choices: [
      {
        id: 'a',
        text: 'El O₂ pasa de la sangre al alvéolo y el CO₂ del alvéolo a la sangre.',
        correct: false,
        misconception: 'mc-hematosis-direccion',
        feedback:
          'Está invertido: el O₂ ENTRA a la sangre desde el alvéolo y el CO₂ SALE hacia el alvéolo.',
      },
      {
        id: 'b',
        text: 'El O₂ pasa del alvéolo a la sangre y el CO₂ de la sangre al alvéolo.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Ambos gases pasan del alvéolo a la sangre de forma simultánea.',
        correct: false,
        feedback:
          'Cada gas va a favor de SU gradiente: el O₂ entra a la sangre, el CO₂ sale de ella.',
      },
      {
        id: 'd',
        text: 'Ambos gases se mueven por transporte activo con gasto de ATP.',
        correct: false,
        feedback:
          'El intercambio gaseoso es difusión simple a favor del gradiente de presiones, sin ATP.',
      },
    ],
    explanation:
      'En el alvéolo la presión parcial de O₂ es alta y la de CO₂ baja respecto de la sangre venosa. Por difusión, el O₂ pasa a la sangre y el CO₂ pasa al alvéolo para ser espirado. Todo a favor del gradiente de presiones parciales.',
    processMapId: 'pmap-hematosis',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-sis-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'sistemas_humanos',
    topic: 'nefrona',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿En qué estructura de la nefrona ocurre la **filtración glomerular** del plasma?',
    choices: [
      {
        id: 'a',
        text: 'En el túbulo contorneado proximal, tras la cápsula de Bowman.',
        correct: false,
        feedback:
          'En el proximal ocurre la reabsorción de la mayoría de solutos, no la filtración inicial.',
      },
      {
        id: 'b',
        text: 'En el asa de Henle, por su gradiente de concentración medular.',
        correct: false,
        feedback:
          'El asa de Henle concentra la orina por contracorriente; la filtración es en el glomérulo.',
      },
      {
        id: 'c',
        text: 'En el corpúsculo renal: glomérulo dentro de la cápsula de Bowman.',
        correct: true,
      },
      {
        id: 'd',
        text: 'En el túbulo colector, donde actúa la hormona antidiurética.',
        correct: false,
        feedback:
          'El colector ajusta la reabsorción de agua por la ADH; la filtración es glomerular.',
      },
    ],
    explanation:
      'La filtración ocurre en el corpúsculo renal, donde el glomérulo (ovillo capilar) filtra el plasma hacia la cápsula de Bowman. Luego los túbulos reabsorben y secretan para formar la orina definitiva.',
    processMapId: 'pmap-nefrona',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-sis-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'sistemas_humanos',
    topic: 'ciclo_cardiaco',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'La sangre que llega a la **aurícula izquierda** del corazón proviene de:',
    choices: [
      {
        id: 'a',
        text: 'Las venas pulmonares, con sangre oxigenada desde los pulmones.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Las venas cavas, con sangre no oxigenada desde el cuerpo.',
        correct: false,
        misconception: 'mc-hematosis-direccion',
        feedback:
          'Las cavas llegan a la aurícula DERECHA con sangre venosa. La izquierda recibe las pulmonares.',
      },
      {
        id: 'c',
        text: 'La arteria aorta, que distribuye sangre a todo el organismo.',
        correct: false,
        feedback:
          'La aorta SALE del ventrículo izquierdo; no trae sangre a la aurícula. Las arterias no entran al corazón.',
      },
      {
        id: 'd',
        text: 'La arteria pulmonar, que lleva sangre hacia los pulmones.',
        correct: false,
        feedback:
          'La arteria pulmonar sale del ventrículo derecho hacia el pulmón; no entra a la aurícula izquierda.',
      },
    ],
    explanation:
      'La aurícula izquierda recibe sangre oxigenada por las cuatro venas pulmonares y la pasa al ventrículo izquierdo, que la impulsa por la aorta. La aurícula derecha recibe sangre venosa por las cavas.',
    hint: 'Las venas ENTRAN al corazón; las arterias SALEN.',
    processMapId: 'pmap-ciclo-cardiaco',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-sis-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'sistemas_humanos',
    topic: 'sistema_nervioso_autonomo',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Ante una situación de estrés agudo, el sistema nervioso **simpático** produce, entre otros efectos:',
    choices: [
      {
        id: 'a',
        text: 'Bradicardia, miosis y aumento del peristaltismo intestinal.',
        correct: false,
        misconception: 'mc-simpatico-parasimpatico',
        feedback:
          'Esos son efectos del parasimpático (reposo). El simpático hace lo contrario.',
      },
      {
        id: 'b',
        text: 'Taquicardia, midriasis y broncodilatación para la acción.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Descenso de la presión arterial y mayor secreción salival.',
        correct: false,
        misconception: 'mc-simpatico-parasimpatico',
        feedback:
          'El simpático sube la presión y reduce secreciones digestivas; esos efectos son parasimpáticos.',
      },
      {
        id: 'd',
        text: 'Contracción de la vejiga y estímulo de la digestión gástrica.',
        correct: false,
        misconception: 'mc-simpatico-parasimpatico',
        feedback:
          'La micción y la digestión son funciones de "reposo": las promueve el parasimpático.',
      },
    ],
    explanation:
      'El simpático prepara para "luchar o huir": acelera el corazón (taquicardia), dilata la pupila (midriasis), dilata los bronquios y sube la presión. El parasimpático rige el "reposo y digestión", con efectos opuestos.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
