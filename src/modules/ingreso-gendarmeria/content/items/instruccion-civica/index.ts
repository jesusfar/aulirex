import type { Item } from '../../../../../types/content';
import { mc } from '../_build';

const S = 'instruccion_civica' as const;

// Basado en la Constitución Nacional Argentina (reforma de 1994).
export const items: Item[] = [
  mc({
    id: 'gna-civ-der-1',
    subject: S,
    block: 'derechos_y_garantias',
    topic: 'habeas_corpus',
    difficulty: 2,
    stem: 'La garantía constitucional que protege la libertad física de una persona detenida ilegalmente es:',
    choices: [
      { t: 'el hábeas corpus.', ok: true },
      { t: 'el amparo.' },
      { t: 'el hábeas data.' },
      { t: 'el juicio político.' },
    ],
    explanation:
      'El hábeas corpus (art. 43) protege la libertad física. El amparo tutela otros derechos; el hábeas data, los datos personales.',
  }),
  mc({
    id: 'gna-civ-der-2',
    subject: S,
    block: 'derechos_y_garantias',
    topic: 'articulo_14',
    difficulty: 2,
    stem: 'Los derechos de trabajar, enseñar, aprender y peticionar a las autoridades están reconocidos, principalmente, en el artículo:',
    choices: [
      { t: '14 de la Constitución Nacional.', ok: true },
      { t: '1 de la Constitución Nacional.' },
      { t: '99 de la Constitución Nacional.' },
      { t: '75 de la Constitución Nacional.' },
    ],
    explanation:
      'El art. 14 enumera los derechos civiles de todos los habitantes. El art. 75 fija atribuciones del Congreso.',
  }),
  mc({
    id: 'gna-civ-leg-1',
    subject: S,
    block: 'poder_legislativo',
    topic: 'composicion_congreso',
    difficulty: 1,
    stem: 'El Poder Legislativo nacional está compuesto por:',
    choices: [
      { t: 'la Cámara de Diputados y la Cámara de Senadores.', ok: true },
      { t: 'la Corte Suprema y los tribunales inferiores.' },
      { t: 'el Presidente y el Jefe de Gabinete.' },
      { t: 'los gobernadores de provincia.' },
    ],
    explanation:
      'El Congreso Nacional es bicameral: Diputados (representan al pueblo) y Senadores (representan a las provincias y la CABA).',
  }),
  mc({
    id: 'gna-civ-leg-2',
    subject: S,
    block: 'poder_legislativo',
    topic: 'senadores',
    difficulty: 2,
    stem: 'Según la Constitución, cada provincia y la Ciudad de Buenos Aires eligen un número de senadores igual a:',
    choices: [
      { t: 'tres.', ok: true },
      { t: 'dos.' },
      { t: 'cinco.' },
      { t: 'uno.' },
    ],
    explanation:
      'Desde 1994 cada provincia y la CABA eligen 3 senadores (dos por la mayoría y uno por la primera minoría).',
  }),
  mc({
    id: 'gna-civ-eje-1',
    subject: S,
    block: 'poder_ejecutivo',
    topic: 'duracion_mandato',
    difficulty: 2,
    stem: 'El Presidente y el Vicepresidente de la Nación duran en sus funciones:',
    choices: [
      { t: 'cuatro años, con posibilidad de una reelección inmediata.', ok: true },
      { t: 'seis años, sin reelección.' },
      { t: 'cinco años, con reelección indefinida.' },
      { t: 'ocho años, sin reelección.' },
    ],
    explanation:
      'La reforma de 1994 fijó el mandato en 4 años, con una sola reelección inmediata (art. 90).',
  }),
  mc({
    id: 'gna-civ-eje-2',
    subject: S,
    block: 'poder_ejecutivo',
    topic: 'jefe_de_gabinete',
    difficulty: 3,
    stem: 'La figura que ejerce la administración general del país y es responsable ante el Congreso es:',
    choices: [
      { t: 'el Jefe de Gabinete de Ministros.', ok: true },
      { t: 'el Vicepresidente de la Nación.' },
      { t: 'el Presidente de la Corte Suprema.' },
      { t: 'el Defensor del Pueblo.' },
    ],
    explanation:
      'El Jefe de Gabinete (art. 100), incorporado en 1994, ejerce la administración general y responde políticamente ante el Congreso.',
  }),
  mc({
    id: 'gna-civ-jud-1',
    subject: S,
    block: 'poder_judicial',
    topic: 'corte_suprema',
    difficulty: 1,
    stem: 'El máximo órgano del Poder Judicial de la Nación es:',
    choices: [
      { t: 'la Corte Suprema de Justicia.', ok: true },
      { t: 'el Congreso de la Nación.' },
      { t: 'el Ministerio de Justicia.' },
      { t: 'el Consejo de la Magistratura.' },
    ],
    explanation:
      'La Corte Suprema es el tribunal de mayor jerarquía. El Consejo de la Magistratura selecciona y administra, pero no es el máximo tribunal.',
  }),
  mc({
    id: 'gna-civ-pro-1',
    subject: S,
    block: 'provincias_y_caba',
    topic: 'autonomia',
    difficulty: 2,
    stem: 'Respecto de las provincias, la Constitución establece que estas:',
    choices: [
      { t: 'conservan todo el poder no delegado al Gobierno Federal.', ok: true },
      { t: 'dependen en todo del Poder Ejecutivo Nacional.' },
      { t: 'no pueden dictar su propia constitución.' },
      { t: 'eligen al Presidente de la Nación por sí solas.' },
    ],
    explanation:
      'El art. 121 dispone que las provincias conservan todo el poder no delegado a la Nación: son autónomas y dictan su propia constitución.',
  }),
];
