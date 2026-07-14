import type { Item } from '../../../../types/content';
import { mc, tf } from '../items/_build';

// Nociones institucionales de la Gendarmería Nacional Argentina, basadas en su
// Estatuto (Fuerza Federal de Seguridad militarizada dependiente del Ministerio
// de Seguridad Nacional). Incluye fichas de estudio + preguntas para el banco.

export interface InstitutionalCard {
  id: string;
  title: string;
  body: string[]; // párrafos
}

export const institutionalCards: InstitutionalCard[] = [
  {
    id: 'ic-que-es',
    title: '¿Qué es la Gendarmería Nacional?',
    body: [
      'La Gendarmería Nacional Argentina (GNA) es una Fuerza Federal de Seguridad de naturaleza militarizada, dependiente del Ministerio de Seguridad Nacional.',
      'Está estructurada para cumplir sus misiones principalmente en la zona de Seguridad de Fronteras y en los demás lugares donde se le ordene actuar. Posee capacidad para operar en un amplio espectro de situaciones, de forma dinámica y flexible según la intensidad de las amenazas.',
    ],
  },
  {
    id: 'ic-mision',
    title: 'Misión',
    body: [
      'Su misión principal es satisfacer las necesidades del servicio de policía que le compete en la zona de Seguridad de Fronteras y demás lugares que se determinen, en materia de Policía de Seguridad y Judicial en el Fuero Federal, y de prevención y represión de infracciones a las leyes.',
      'Como misión complementaria, participa en el restablecimiento y la preservación del orden público.',
    ],
  },
  {
    id: 'ic-funciones',
    title: 'Funciones de la fuerza',
    body: [
      'Entre sus funciones se destacan: Policía de Seguridad de Frontera (control y vigilancia en pasos, puentes y túneles internacionales); Policía de Seguridad Vial en rutas nacionales; Policía Científica (Criminalística y estudios forenses); y Policía Auxiliar Aduanera, Migratoria y Sanitaria.',
      'También actúa en la protección del ambiente y el patrimonio cultural, integra el Sistema Nacional para la Gestión Integral del Riesgo (protección civil) y, en caso de conflicto bélico, puede emplearse como instrumento militar terrestre según lo disponga el Poder Ejecutivo Nacional.',
    ],
  },
  {
    id: 'ic-dependencia',
    title: 'Dependencia y encuadre',
    body: [
      'La GNA depende del Ministerio de Seguridad Nacional. Junto con la Prefectura Naval, la Policía Federal y la Policía de Seguridad Aeroportuaria, integra las Fuerzas Federales de Seguridad.',
      'Como integrante del Sistema de Inteligencia Nacional (Subsistema de Inteligencia Criminal), colabora en la prevención y neutralización del crimen organizado y el terrorismo.',
    ],
  },
];

const S = 'conocimientos_institucionales' as const;
const B = 'mision_y_funciones';

export const items: Item[] = [
  mc({
    id: 'gna-ins-1',
    subject: S,
    block: 'dependencia_y_encuadre_legal',
    topic: 'dependencia',
    difficulty: 1,
    stem: 'La Gendarmería Nacional Argentina depende del:',
    choices: [
      { t: 'Ministerio de Seguridad Nacional.', ok: true },
      { t: 'Ministerio de Defensa.' },
      { t: 'Ministerio del Interior.' },
      { t: 'Estado Mayor Conjunto de las Fuerzas Armadas.' },
    ],
    explanation:
      'Según su Estatuto, la GNA es una Fuerza Federal de Seguridad dependiente del Ministerio de Seguridad Nacional.',
  }),
  mc({
    id: 'gna-ins-2',
    subject: S,
    block: 'mision_y_funciones',
    topic: 'caracter',
    difficulty: 2,
    stem: 'La Gendarmería Nacional se define como una:',
    choices: [
      { t: 'Fuerza Federal de Seguridad de naturaleza militarizada.', ok: true },
      { t: 'Fuerza Armada de carácter naval.' },
      { t: 'Policía provincial de la Ciudad de Buenos Aires.' },
      { t: 'Fuerza de defensa exclusivamente civil.' },
    ],
    explanation:
      'El Estatuto la define como Fuerza Federal de Seguridad militarizada, distinta de las Fuerzas Armadas.',
  }),
  mc({
    id: 'gna-ins-3',
    subject: S,
    block: B,
    topic: 'zona_de_frontera',
    difficulty: 2,
    stem: 'La misión principal de la GNA se desarrolla, ante todo, en:',
    choices: [
      { t: 'la zona de Seguridad de Fronteras y demás lugares que se determinen.', ok: true },
      { t: 'exclusivamente el espacio marítimo argentino.' },
      { t: 'únicamente la Ciudad Autónoma de Buenos Aires.' },
      { t: 'solo las bases militares del país.' },
    ],
    explanation:
      'La misión se centra en la zona de Seguridad de Fronteras y en los lugares donde se le ordene actuar.',
  }),
  mc({
    id: 'gna-ins-4',
    subject: S,
    block: B,
    topic: 'funciones',
    difficulty: 2,
    stem: '¿Cuál de las siguientes NO es una función típica de la Gendarmería Nacional?',
    choices: [
      { t: 'Conducir la política monetaria del país.', ok: true },
      { t: 'Policía de Seguridad de Frontera.' },
      { t: 'Policía de Seguridad Vial en rutas nacionales.' },
      { t: 'Policía Auxiliar Aduanera, Migratoria y Sanitaria.' },
    ],
    explanation:
      'La política monetaria corresponde al Banco Central, no a la GNA. Las otras tres son funciones propias de la fuerza.',
  }),
  tf({
    id: 'gna-ins-5',
    subject: S,
    block: B,
    topic: 'orden_publico',
    difficulty: 1,
    stem: 'Es misión complementaria de la Gendarmería Nacional participar en el restablecimiento y la preservación del orden público.',
    answer: true,
    explanation:
      'El Estatuto establece como misión complementaria participar en el restablecimiento y preservación del orden público.',
  }),
  tf({
    id: 'gna-ins-6',
    subject: S,
    block: B,
    topic: 'instrumento_militar',
    difficulty: 2,
    stem: 'En caso de conflicto bélico, la Gendarmería puede emplearse como instrumento militar terrestre, según lo disponga el Poder Ejecutivo Nacional.',
    answer: true,
    explanation:
      'El Estatuto prevé que, ante un conflicto bélico, la GNA actúe como instrumento militar terrestre conforme a la Ley de Defensa Nacional.',
  }),
];
