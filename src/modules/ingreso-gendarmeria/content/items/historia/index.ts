import type { Item } from '../../../../../types/content';
import { mc } from '../_build';

const S = 'historia' as const;

export const items: Item[] = [
  mc({
    id: 'gna-his-ind-1',
    subject: S,
    block: 'independencia_y_anarquia',
    topic: 'revolucion_de_mayo',
    difficulty: 1,
    stem: 'La Primera Junta de Gobierno se conformó el:',
    choices: [
      { t: '25 de mayo de 1810.', ok: true },
      { t: '9 de julio de 1816.' },
      { t: '20 de junio de 1820.' },
      { t: '25 de mayo de 1853.' },
    ],
    explanation:
      'La Primera Junta se formó el 25 de mayo de 1810. El 9 de julio de 1816 se declaró la Independencia.',
  }),
  mc({
    id: 'gna-his-ind-2',
    subject: S,
    block: 'independencia_y_anarquia',
    topic: 'congreso_de_tucuman',
    difficulty: 2,
    stem: 'En el Congreso de Tucumán de 1816 se declaró:',
    choices: [
      { t: 'la Independencia de las Provincias Unidas.', ok: true },
      { t: 'la primera Constitución Nacional.' },
      { t: 'la caída de Juan Manuel de Rosas.' },
      { t: 'la federalización de Buenos Aires.' },
    ],
    explanation:
      'El 9 de julio de 1816 el Congreso de Tucumán declaró la Independencia. La Constitución llegaría en 1853.',
  }),
  mc({
    id: 'gna-his-org-1',
    subject: S,
    block: 'rosas_y_organizacion_nacional',
    topic: 'constitucion_1853',
    difficulty: 2,
    stem: 'La Constitución Nacional Argentina fue sancionada por primera vez en el año:',
    choices: [
      { t: '1853.', ok: true },
      { t: '1810.' },
      { t: '1816.' },
      { t: '1880.' },
    ],
    explanation:
      'Tras la caída de Rosas (1852), el Congreso Constituyente sancionó la Constitución en 1853.',
  }),
  mc({
    id: 'gna-his-org-2',
    subject: S,
    block: 'rosas_y_organizacion_nacional',
    topic: 'caida_de_rosas',
    difficulty: 2,
    stem: 'Juan Manuel de Rosas fue derrotado en la batalla de Caseros (1852) por las fuerzas de:',
    choices: [
      { t: 'Justo José de Urquiza.', ok: true },
      { t: 'Bartolomé Mitre.' },
      { t: 'Domingo F. Sarmiento.' },
      { t: 'Julio A. Roca.' },
    ],
    explanation:
      'Urquiza encabezó el Ejército Grande que venció a Rosas en Caseros, abriendo la etapa de organización nacional.',
  }),
  mc({
    id: 'gna-his-est-1',
    subject: S,
    block: 'estado_nacional',
    topic: 'ley_saenz_pena',
    difficulty: 3,
    stem: 'La Ley Sáenz Peña (1912) estableció el voto:',
    choices: [
      { t: 'universal, secreto y obligatorio (masculino).', ok: true },
      { t: 'universal, incluyendo a las mujeres.' },
      { t: 'calificado según la renta del votante.' },
      { t: 'optativo y a viva voz.' },
    ],
    explanation:
      'La Ley 8871 instauró el sufragio universal (masculino), secreto y obligatorio. El voto femenino llegó en 1947.',
  }),
  mc({
    id: 'gna-his-rad-1',
    subject: S,
    block: 'radicales_y_conservadores',
    topic: 'primer_presidente_radical',
    difficulty: 2,
    stem: 'El primer presidente argentino elegido con la Ley Sáenz Peña, en 1916, fue:',
    choices: [
      { t: 'Hipólito Yrigoyen.', ok: true },
      { t: 'Marcelo T. de Alvear.' },
      { t: 'Juan D. Perón.' },
      { t: 'Roque Sáenz Peña.' },
    ],
    explanation:
      'Hipólito Yrigoyen (UCR) asumió en 1916, primer presidente electo por voto universal, secreto y obligatorio.',
  }),
  mc({
    id: 'gna-his-per-1',
    subject: S,
    block: 'peronismo_y_posperonismo',
    topic: 'voto_femenino',
    difficulty: 2,
    stem: 'El voto femenino se estableció en Argentina en 1947, durante la presidencia de:',
    choices: [
      { t: 'Juan Domingo Perón.', ok: true },
      { t: 'Hipólito Yrigoyen.' },
      { t: 'Arturo Frondizi.' },
      { t: 'Juan Carlos Onganía.' },
    ],
    explanation:
      'La Ley 13.010 (1947), impulsada durante el primer gobierno de Perón, reconoció los derechos políticos de la mujer.',
  }),
  mc({
    id: 'gna-his-dem-1',
    subject: S,
    block: 'proceso_y_democracia',
    topic: 'retorno_democratico',
    difficulty: 1,
    stem: 'La democracia se restableció en Argentina en 1983 con la presidencia de:',
    choices: [
      { t: 'Raúl Alfonsín.', ok: true },
      { t: 'Carlos Menem.' },
      { t: 'Fernando de la Rúa.' },
      { t: 'Arturo Illia.' },
    ],
    explanation:
      'Raúl Alfonsín (UCR) asumió el 10 de diciembre de 1983, tras el último gobierno militar.',
  }),
];
