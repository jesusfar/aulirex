import type { Item } from '../../../../../types/content';

// Membrana plasmática y transporte a través de membrana.
// Temas de alta frecuencia según la guía de "lo que más se toma". Contenido original.
// Distractores parejos en longitud y forma: la correcta no se delata a simple vista.
export const items: Item[] = [
  {
    id: 'bio-mem-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'membrana_plasmatica',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: '¿Cuál de las siguientes afirmaciones describe correctamente a la membrana plasmática?',
    choices: [
      {
        id: 'a',
        text: 'Es una bicapa de fosfolípidos exclusivamente, sin proteínas ni glúcidos.',
        correct: false,
        misconception: 'mc-membrana-solo-fosfolipidos',
        feedback:
          'Además de fosfolípidos tiene colesterol, proteínas y glúcidos (glucocáliz). Es un mosaico fluido.',
      },
      {
        id: 'b',
        text: 'Es un mosaico fluido de lípidos y proteínas, con glúcidos en la cara externa.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Es una capa proteica rígida que impide todo intercambio con el medio.',
        correct: false,
        feedback:
          'La membrana es de permeabilidad selectiva: regula el intercambio, no lo bloquea.',
      },
      {
        id: 'd',
        text: 'Es una bicapa con las colas polares orientadas hacia el medio acuoso.',
        correct: false,
        feedback:
          'Las colas son apolares (hidrofóbicas) y quedan hacia el interior; las cabezas polares miran al agua.',
      },
    ],
    explanation:
      'El modelo de mosaico fluido describe la membrana como una bicapa de fosfolípidos anfipáticos con colesterol, proteínas integrales y periféricas, y un glucocáliz de glúcidos hacia el exterior. Su permeabilidad es selectiva.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-mem-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'membrana_plasmatica',
    track: 'teorico',
    type: 'true_false',
    frequency: 'media',
    difficulty: 1,
    stem: 'Los fosfolípidos de la membrana son moléculas anfipáticas: tienen una cabeza polar (hidrofílica) y colas apolares (hidrofóbicas).',
    choices: [
      { id: 'v', text: 'Verdadero', correct: true },
      {
        id: 'f',
        text: 'Falso',
        correct: false,
        misconception: 'mc-membrana-solo-fosfolipidos',
        feedback:
          'Sí son anfipáticos: esa doble naturaleza es la que permite que se organicen en bicapa en medio acuoso.',
      },
    ],
    explanation:
      'Anfipático significa que una parte de la molécula interactúa con el agua (cabeza polar) y otra la rechaza (colas de ácidos grasos). Por eso los fosfolípidos forman espontáneamente una bicapa.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-mem-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'transporte_celular',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Una célula bombea iones **en contra** de su gradiente de concentración. ¿Cómo se clasifica este proceso?',
    choices: [
      {
        id: 'a',
        text: 'Es transporte activo y requiere gasto de ATP para concretarse.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Es difusión simple y ocurre sin ningún gasto de energía celular.',
        correct: false,
        misconception: 'mc-transporte-activo-sin-atp',
        feedback:
          'Mover algo en contra del gradiente siempre requiere energía: es transporte activo, no difusión.',
      },
      {
        id: 'c',
        text: 'Es transporte activo pero se produce sin gasto de energía alguna.',
        correct: false,
        misconception: 'mc-transporte-activo-sin-atp',
        feedback:
          'El transporte activo, por definición, va en contra del gradiente y por eso gasta ATP.',
      },
      {
        id: 'd',
        text: 'Es difusión facilitada porque intervienen proteínas de membrana.',
        correct: false,
        misconception: 'mc-difusion-facilitada-gasta-atp',
        feedback:
          'La difusión facilitada usa proteína pero va a FAVOR del gradiente. Ir en contra exige transporte activo.',
      },
    ],
    explanation:
      'El transporte activo mueve solutos en contra del gradiente electroquímico y por eso consume energía (ATP), como en la bomba Na⁺/K⁺. El transporte pasivo (difusión simple y facilitada) va a favor del gradiente sin gasto de energía.',
    hint: '¿En qué dirección va el soluto respecto del gradiente?',
    processMapId: 'pmap-transporte',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-mem-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'transporte_celular',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿Cuál es el funcionamiento correcto de la bomba Na⁺/K⁺ (Na⁺/K⁺-ATPasa)?',
    choices: [
      {
        id: 'a',
        text: 'Ingresa 3 Na⁺ y expulsa 2 K⁺ a favor del gradiente, sin usar ATP.',
        correct: false,
        misconception: 'mc-transporte-activo-sin-atp',
        feedback:
          'La bomba es transporte activo: mueve ambos iones en contra de su gradiente y por eso hidroliza ATP.',
      },
      {
        id: 'b',
        text: 'Expulsa 3 Na⁺ e ingresa 2 K⁺ en contra del gradiente, gastando ATP.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Ingresa 3 Na⁺ y expulsa 2 K⁺ mediante difusión facilitada pasiva.',
        correct: false,
        feedback:
          'Invertiste las direcciones y el mecanismo: saca 3 Na⁺, mete 2 K⁺, y es transporte activo.',
      },
      {
        id: 'd',
        text: 'Expulsa 2 Na⁺ e ingresa 3 K⁺ solo mientras la célula se despolariza.',
        correct: false,
        feedback:
          'La proporción es 3 Na⁺ afuera por 2 K⁺ adentro, y la bomba trabaja de forma continua.',
      },
    ],
    explanation:
      'La Na⁺/K⁺-ATPasa saca 3 Na⁺ e ingresa 2 K⁺ por cada ATP hidrolizado, ambos en contra de su gradiente. Mantiene el Na⁺ alto afuera y el K⁺ alto adentro, base del potencial de reposo.',
    processMapId: 'pmap-transporte',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-mem-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'transporte_celular',
    track: 'teorico',
    type: 'multiple_response',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Seleccioná **todos** los mecanismos que corresponden a **transporte pasivo** (sin gasto de ATP):',
    choices: [
      { id: 'a', text: 'Difusión simple', correct: true },
      { id: 'b', text: 'Difusión facilitada', correct: true },
      { id: 'c', text: 'Ósmosis', correct: true },
      {
        id: 'd',
        text: 'Bomba Na⁺/K⁺',
        correct: false,
        misconception: 'mc-transporte-activo-sin-atp',
        feedback:
          'La bomba Na⁺/K⁺ es transporte activo: va en contra del gradiente y consume ATP.',
      },
      {
        id: 'e',
        text: 'Endocitosis',
        correct: false,
        feedback:
          'La endocitosis es transporte en masa y requiere energía; no es pasivo.',
      },
    ],
    explanation:
      'El transporte pasivo va a favor del gradiente sin energía: difusión simple, difusión facilitada (con proteína) y ósmosis (difusión de agua). La bomba Na⁺/K⁺ y la endocitosis requieren energía.',
    processMapId: 'pmap-transporte',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-mem-0006',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'transporte_celular',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 2,
    stem: 'Un glóbulo rojo se coloca en una solución **hipotónica** respecto de su citoplasma. ¿Qué ocurre?',
    choices: [
      {
        id: 'a',
        text: 'El agua egresa de la célula y provoca su crenación (arrugado).',
        correct: false,
        feedback:
          'Eso pasa en medio hipertónico. En hipotónico hay menos soluto afuera, así que el agua ENTRA.',
      },
      {
        id: 'b',
        text: 'No se produce movimiento neto de agua a través de la membrana.',
        correct: false,
        feedback:
          'Solo en un medio isotónico no hay movimiento neto. En hipotónico el agua entra.',
      },
      {
        id: 'c',
        text: 'El agua ingresa a la célula y puede provocar su hemólisis.',
        correct: true,
      },
      {
        id: 'd',
        text: 'La célula expulsa agua activamente mediante gasto de ATP.',
        correct: false,
        feedback:
          'La ósmosis es pasiva: el agua se mueve por gradiente, sin gasto de energía.',
      },
    ],
    explanation:
      'En una solución hipotónica hay menor concentración de solutos afuera, por lo que el agua difunde (ósmosis) hacia el interior, más concentrado. El glóbulo rojo se hincha y puede sufrir hemólisis.',
    hint: 'El agua va hacia donde hay MÁS soluto.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
