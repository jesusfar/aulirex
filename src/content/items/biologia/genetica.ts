import type { Item } from '../../../types/content';

// Genética mendeliana: es "lo único práctico que tiene Biología" (guía UNC).
// Mendel y sus excepciones (codominancia, grupos sanguíneos). Contenido original.
export const items: Item[] = [
  {
    id: 'bio-gen-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_mendeliana',
    topic: 'leyes_mendel',
    track: 'practico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Un individuo con genotipo **Aa** para un carácter es, respecto de ese gen:',
    choices: [
      {
        id: 'a',
        text: 'Homocigota, porque lleva el alelo dominante en el genotipo.',
        correct: false,
        misconception: 'mc-homocigota-heterocigota',
        feedback:
          'Homocigota sería AA o aa (alelos iguales). Aa tiene alelos distintos: es heterocigota.',
      },
      {
        id: 'b',
        text: 'Heterocigota, porque lleva dos alelos distintos del mismo gen.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Hemicigota, porque expresa un solo alelo del par génico.',
        correct: false,
        feedback:
          'Hemicigota es cuando hay un único alelo (ej. genes del X en varones). Aa tiene dos alelos distintos.',
      },
      {
        id: 'd',
        text: 'Recesivo puro, porque el alelo "a" queda oculto en él.',
        correct: false,
        misconception: 'mc-homocigota-heterocigota',
        feedback:
          'Que el recesivo quede oculto no lo hace "recesivo puro": el genotipo Aa es heterocigota.',
      },
    ],
    explanation:
      'Homocigota = dos alelos iguales (AA o aa); heterocigota = dos alelos distintos (Aa). El heterocigota expresa el fenotipo dominante pero porta y puede transmitir el recesivo.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-gen-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_mendeliana',
    topic: 'leyes_mendel',
    track: 'practico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Se cruzan dos plantas heterocigotas para tallo alto (Aa × Aa), siendo alto (A) dominante sobre enano (a). ¿Qué proporción **fenotípica** se espera en la descendencia?',
    choices: [
      {
        id: 'a',
        text: '1 : 2 : 1 (un alto puro, dos altos híbridos, un enano).',
        correct: false,
        misconception: 'mc-proporcion-mendel',
        feedback:
          '1:2:1 es la proporción GENOTÍPICA. La fenotípica agrupa AA y Aa como "alto": queda 3:1.',
      },
      {
        id: 'b',
        text: '3 : 1 (tres plantas altas por cada planta enana).',
        correct: true,
      },
      {
        id: 'c',
        text: '1 : 1 (mitad plantas altas y mitad plantas enanas).',
        correct: false,
        misconception: 'mc-proporcion-mendel',
        feedback:
          '1:1 aparece en un cruce de prueba (Aa × aa), no en Aa × Aa. Acá es 3:1.',
      },
      {
        id: 'd',
        text: '9 : 3 : 3 : 1 (proporción típica de dos caracteres).',
        correct: false,
        feedback:
          '9:3:3:1 corresponde a un cruce dihíbrido (dos genes). Acá hay un solo carácter.',
      },
    ],
    explanation:
      'Aa × Aa da genotipos 1 AA : 2 Aa : 1 aa. Como AA y Aa muestran el mismo fenotipo (alto), la proporción fenotípica es 3 altos : 1 enano.',
    hint: 'Agrupá AA y Aa: ambos son "alto".',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-gen-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_mendeliana',
    topic: 'leyes_mendel',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    stem: 'De un cruce Aa × Aa nacen **240** descendientes. Estadísticamente, ¿cuántos se espera que presenten el fenotipo **recesivo**?',
    numeric: { value: 60, unit: 'individuos', tolerance: 0, toleranceMode: 'abs' },
    explanation:
      'En Aa × Aa, la proporción del fenotipo recesivo (aa) es 1/4. Un cuarto de 240 = 60 individuos.',
    hint: 'El recesivo aparece en 1 de cada 4.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-gen-0004',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_mendeliana',
    topic: 'grupos_sanguineos',
    track: 'practico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Una persona de grupo sanguíneo **AB** tiene ese fenotipo porque los alelos A y B:',
    choices: [
      {
        id: 'a',
        text: 'Son codominantes y se expresan ambos al mismo tiempo.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Muestran dominancia simple del alelo A sobre el alelo B.',
        correct: false,
        misconception: 'mc-grupo-sanguineo-dominancia',
        feedback:
          'Si A dominara sobre B, el fenotipo sería A. Como ambos se expresan, son codominantes (AB).',
      },
      {
        id: 'c',
        text: 'Se comportan como recesivos frente al alelo "i" del grupo 0.',
        correct: false,
        misconception: 'mc-grupo-sanguineo-dominancia',
        feedback:
          'Es al revés: A y B son dominantes sobre i; el grupo 0 (ii) es el recesivo.',
      },
      {
        id: 'd',
        text: 'Provocan que se exprese solo uno según el sexo del individuo.',
        correct: false,
        feedback:
          'Los grupos ABO no están ligados al sexo; en AB se expresan ambos alelos por codominancia.',
      },
    ],
    explanation:
      'El sistema ABO tiene tres alelos: IA, IB e i. IA e IB son codominantes entre sí (genotipo IAIB → grupo AB) y ambos dominan sobre i. El grupo 0 es homocigota recesivo (ii).',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-gen-0005',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'genetica_mendeliana',
    topic: 'grupos_sanguineos',
    track: 'practico',
    type: 'single_choice',
    frequency: 'media',
    difficulty: 3,
    stem: 'Un padre de grupo **0** y una madre de grupo **AB** tienen hijos. ¿Qué grupos sanguíneos pueden presentar los hijos?',
    choices: [
      {
        id: 'a',
        text: 'Solo 0 o AB, repartidos en partes iguales entre los hijos.',
        correct: false,
        feedback:
          'El padre 0 aporta i; la madre aporta IA o IB. Los hijos son A (IAi) o B (IBi), nunca 0 ni AB.',
      },
      {
        id: 'b',
        text: 'Grupo A o grupo B, según qué alelo aporte la madre.',
        correct: true,
      },
      {
        id: 'c',
        text: 'Cualquiera de los cuatro grupos: A, B, AB o 0.',
        correct: false,
        feedback:
          'No es cualquiera: al recibir siempre una i del padre, los hijos solo pueden ser A o B.',
      },
      {
        id: 'd',
        text: 'Únicamente grupo AB, igual que la madre del cruce.',
        correct: false,
        feedback:
          'Para ser AB harían falta IA e IB, pero el padre solo aporta i: no puede haber hijos AB.',
      },
    ],
    explanation:
      'El padre 0 es ii (aporta i). La madre AB es IAIB (aporta IA o IB). Los hijos serán IAi (grupo A) o IBi (grupo B), en proporción 1:1. No pueden ser AB ni 0.',
    hint: 'Escribí los genotipos: ii × IAIB.',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
