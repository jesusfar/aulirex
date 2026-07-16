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

  // ---- Independencia y anarquía (1810-1829) ----
  mc({
    id: 'gna-his-ind-3',
    subject: S,
    block: 'independencia_y_anarquia',
    topic: 'asamblea_1813',
    difficulty: 3,
    stem: 'La Asamblea del Año XIII (1813) tomó, entre otras, la decisión de:',
    choices: [
      { t: 'aprobar el Himno y la libertad de vientres.', ok: true },
      { t: 'declarar la Independencia nacional.' },
      { t: 'sancionar la Constitución de 1853.' },
      { t: 'derrocar a Juan Manuel de Rosas.' },
    ],
    explanation:
      'La Asamblea del Año XIII aprobó el Himno, el escudo, la libertad de vientres y abolió títulos de nobleza, pero no declaró la Independencia (eso fue en 1816).',
  }),
  mc({
    id: 'gna-his-ind-4',
    subject: S,
    block: 'independencia_y_anarquia',
    topic: 'cruce_de_los_andes',
    difficulty: 2,
    stem: 'El general que organizó el Ejército de los Andes y cruzó la cordillera para liberar Chile y Perú fue:',
    choices: [
      { t: 'José de San Martín.', ok: true },
      { t: 'Manuel Belgrano.' },
      { t: 'Juan José Castelli.' },
      { t: 'Cornelio Saavedra.' },
    ],
    explanation:
      'José de San Martín formó el Ejército de los Andes en Cuyo y cruzó la cordillera en 1817 rumbo a Chile y luego Perú.',
  }),
  mc({
    id: 'gna-his-ind-5',
    subject: S,
    block: 'independencia_y_anarquia',
    topic: 'anarquia_1820',
    difficulty: 3,
    stem: 'El "año 20" (1820) se conoce como el año de la anarquía porque:',
    choices: [
      { t: 'cayó el poder central y se disolvió el Directorio.', ok: true },
      { t: 'se sancionó la Constitución unitaria.' },
      { t: 'asumió la primera presidencia constitucional.' },
      { t: 'terminó la guerra con el Brasil.' },
    ],
    explanation:
      'Tras la batalla de Cepeda (1820) se disolvieron el Directorio y el Congreso; las provincias quedaron sin poder central.',
  }),

  // ---- Rosas y organización nacional (1829-1880) ----
  mc({
    id: 'gna-his-org-3',
    subject: S,
    block: 'rosas_y_organizacion_nacional',
    topic: 'rosas_gobierno',
    difficulty: 2,
    stem: 'Juan Manuel de Rosas gobernó Buenos Aires como líder del partido:',
    choices: [
      { t: 'federal.', ok: true },
      { t: 'unitario.' },
      { t: 'radical.' },
      { t: 'conservador.' },
    ],
    explanation:
      'Rosas fue el principal referente de los federales; gobernó con la suma del poder público y el título de "Restaurador de las Leyes".',
  }),
  mc({
    id: 'gna-his-org-4',
    subject: S,
    block: 'rosas_y_organizacion_nacional',
    topic: 'presidencia_mitre',
    difficulty: 3,
    stem: 'El primer presidente de la Nación tras la unificación (1862) fue:',
    choices: [
      { t: 'Bartolomé Mitre.', ok: true },
      { t: 'Justo José de Urquiza.' },
      { t: 'Domingo F. Sarmiento.' },
      { t: 'Nicolás Avellaneda.' },
    ],
    explanation:
      'Luego de Pavón (1861) y la unificación, Bartolomé Mitre fue el primer presidente del país unificado (1862-1868).',
  }),
  mc({
    id: 'gna-his-org-5',
    subject: S,
    block: 'rosas_y_organizacion_nacional',
    topic: 'presidencia_sarmiento',
    difficulty: 2,
    stem: 'Domingo F. Sarmiento es especialmente recordado por su política de:',
    choices: [
      { t: 'expansión de la educación pública.', ok: true },
      { t: 'nacionalización de los ferrocarriles.' },
      { t: 'estatización de la industria.' },
      { t: 'reforma agraria.' },
    ],
    explanation:
      'Sarmiento (1868-1874) impulsó fuertemente la educación pública, la creación de escuelas y la formación de maestros.',
  }),

  // ---- Consolidación del Estado nacional (1880-1916) ----
  mc({
    id: 'gna-his-est-2',
    subject: S,
    block: 'estado_nacional',
    topic: 'federalizacion_bsas',
    difficulty: 2,
    stem: 'En 1880, durante la presidencia de Julio A. Roca, la ciudad de Buenos Aires fue:',
    choices: [
      { t: 'federalizada como Capital de la Nación.', ok: true },
      { t: 'separada del territorio argentino.' },
      { t: 'convertida en provincia autónoma.' },
      { t: 'cedida al gobierno del Brasil.' },
    ],
    explanation:
      'En 1880 Buenos Aires fue federalizada y declarada Capital Federal, cerrando el conflicto entre la provincia y la Nación.',
  }),
  mc({
    id: 'gna-his-est-3',
    subject: S,
    block: 'estado_nacional',
    topic: 'ley_1420',
    difficulty: 3,
    stem: 'La Ley 1420 (1884) estableció que la educación primaria fuera:',
    choices: [
      { t: 'gratuita, obligatoria y laica.', ok: true },
      { t: 'paga y optativa.' },
      { t: 'exclusivamente religiosa.' },
      { t: 'reservada a los varones.' },
    ],
    explanation:
      'La Ley 1420 instauró la educación primaria común, gratuita, obligatoria y laica, base del sistema educativo argentino.',
  }),
  mc({
    id: 'gna-his-est-4',
    subject: S,
    block: 'estado_nacional',
    topic: 'inmigracion',
    difficulty: 2,
    stem: 'Entre 1880 y 1914 Argentina recibió una gran corriente de inmigrantes provenientes principalmente de:',
    choices: [
      { t: 'Europa, sobre todo Italia y España.', ok: true },
      { t: 'Asia, sobre todo China y Japón.' },
      { t: 'América del Norte.' },
      { t: 'Oceanía.' },
    ],
    explanation:
      'La inmigración masiva fue mayoritariamente europea, con predominio de italianos y españoles, transformando la sociedad argentina.',
  }),

  // ---- Radicales y conservadores (1916-1943) ----
  mc({
    id: 'gna-his-rad-2',
    subject: S,
    block: 'radicales_y_conservadores',
    topic: 'golpe_1930',
    difficulty: 2,
    stem: 'El primer golpe de Estado del siglo XX en Argentina (1930) derrocó a:',
    choices: [
      { t: 'Hipólito Yrigoyen.', ok: true },
      { t: 'Marcelo T. de Alvear.' },
      { t: 'Juan D. Perón.' },
      { t: 'Arturo Illia.' },
    ],
    explanation:
      'El 6 de septiembre de 1930 un golpe encabezado por José F. Uriburu derrocó a Yrigoyen en su segunda presidencia.',
  }),
  mc({
    id: 'gna-his-rad-3',
    subject: S,
    block: 'radicales_y_conservadores',
    topic: 'decada_infame',
    difficulty: 3,
    stem: 'La "Década Infame" (años 30) se caracterizó por:',
    choices: [
      { t: 'el fraude electoral y el Pacto Roca-Runciman.', ok: true },
      { t: 'el sufragio universal femenino.' },
      { t: 'la reforma agraria integral.' },
      { t: 'la nacionalización de los ferrocarriles.' },
    ],
    explanation:
      'La Década Infame combinó fraude electoral sistemático con acuerdos como el Pacto Roca-Runciman (1933) con Gran Bretaña.',
  }),

  // ---- Peronismo y posperonismo (1943-1976) ----
  mc({
    id: 'gna-his-per-2',
    subject: S,
    block: 'peronismo_y_posperonismo',
    topic: 'constitucion_1949',
    difficulty: 3,
    stem: 'La reforma constitucional de 1949, durante el primer peronismo, incorporó:',
    choices: [
      { t: 'la reelección presidencial y los derechos sociales.', ok: true },
      { t: 'la abolición del voto femenino.' },
      { t: 'el sistema parlamentario.' },
      { t: 'la eliminación del Poder Judicial.' },
    ],
    explanation:
      'La Constitución de 1949 habilitó la reelección presidencial e incorporó derechos del trabajador, la ancianidad y la familia. Fue derogada en 1956.',
  }),
  mc({
    id: 'gna-his-per-3',
    subject: S,
    block: 'peronismo_y_posperonismo',
    topic: 'revolucion_libertadora',
    difficulty: 2,
    stem: 'El golpe militar de 1955 que derrocó a Juan D. Perón se autodenominó:',
    choices: [
      { t: '"Revolución Libertadora".', ok: true },
      { t: '"Proceso de Reorganización Nacional".' },
      { t: '"Revolución Argentina".' },
      { t: '"Revolución del Parque".' },
    ],
    explanation:
      'La "Revolución Libertadora" (1955) derrocó a Perón. El "Proceso" fue en 1976 y la "Revolución Argentina" en 1966.',
  }),
  mc({
    id: 'gna-his-per-4',
    subject: S,
    block: 'peronismo_y_posperonismo',
    topic: 'revolucion_argentina',
    difficulty: 3,
    stem: 'La "Revolución Argentina" (1966), que derrocó a Arturo Illia, fue encabezada por:',
    choices: [
      { t: 'Juan Carlos Onganía.', ok: true },
      { t: 'Jorge R. Videla.' },
      { t: 'Pedro E. Aramburu.' },
      { t: 'Roberto M. Levingston.' },
    ],
    explanation:
      'El golpe de 1966 llevó al poder a Juan Carlos Onganía, iniciando la llamada "Revolución Argentina".',
  }),

  // ---- Proceso y democracia (1976-actualidad) ----
  mc({
    id: 'gna-his-dem-2',
    subject: S,
    block: 'proceso_y_democracia',
    topic: 'golpe_1976',
    difficulty: 1,
    stem: 'El último golpe de Estado en Argentina se produjo el:',
    choices: [
      { t: '24 de marzo de 1976.', ok: true },
      { t: '6 de septiembre de 1930.' },
      { t: '16 de septiembre de 1955.' },
      { t: '28 de junio de 1966.' },
    ],
    explanation:
      'El 24 de marzo de 1976 una junta militar derrocó a María Estela Martínez de Perón e inició el "Proceso de Reorganización Nacional".',
  }),
  mc({
    id: 'gna-his-dem-3',
    subject: S,
    block: 'proceso_y_democracia',
    topic: 'malvinas',
    difficulty: 2,
    stem: 'La Guerra de Malvinas contra el Reino Unido se desarrolló en el año:',
    choices: [
      { t: '1982.', ok: true },
      { t: '1978.' },
      { t: '1976.' },
      { t: '1989.' },
    ],
    explanation:
      'La Guerra de Malvinas ocurrió entre abril y junio de 1982, durante la presidencia de facto de Leopoldo Galtieri.',
  }),
  mc({
    id: 'gna-his-dem-4',
    subject: S,
    block: 'proceso_y_democracia',
    topic: 'juicio_juntas',
    difficulty: 3,
    stem: 'El Juicio a las Juntas Militares, que condenó a los responsables de la dictadura, se realizó en 1985 bajo la presidencia de:',
    choices: [
      { t: 'Raúl Alfonsín.', ok: true },
      { t: 'Carlos Menem.' },
      { t: 'Néstor Kirchner.' },
      { t: 'Fernando de la Rúa.' },
    ],
    explanation:
      'El Juicio a las Juntas (1985) se realizó durante el gobierno de Alfonsín; fue inédito en la región por juzgar a excomandantes en un tribunal civil.',
  }),
  mc({
    id: 'gna-his-dem-5',
    subject: S,
    block: 'proceso_y_democracia',
    topic: 'reforma_1994',
    difficulty: 3,
    stem: 'La última reforma de la Constitución Nacional se realizó en el año:',
    choices: [
      { t: '1994.', ok: true },
      { t: '1949.' },
      { t: '1983.' },
      { t: '2001.' },
    ],
    explanation:
      'La reforma de 1994 incorporó, entre otros, nuevos derechos y garantías, el Consejo de la Magistratura y la reelección presidencial por un período.',
  }),

  // ======== Tanda 2: Independencia y anarquía ========
  mc({
    id: 'gna-his-ind-6', subject: S, block: 'independencia_y_anarquia', topic: 'creacion_bandera', difficulty: 2,
    stem: 'La bandera argentina fue creada en 1812, a orillas del río Paraná, por:',
    choices: [{ t: 'Manuel Belgrano.', ok: true }, { t: 'José de San Martín.' }, { t: 'Cornelio Saavedra.' }, { t: 'Mariano Moreno.' }],
    explanation: 'Manuel Belgrano enarboló por primera vez la bandera en Rosario, el 27 de febrero de 1812.',
  }),
  mc({
    id: 'gna-his-ind-7', subject: S, block: 'independencia_y_anarquia', topic: 'san_lorenzo', difficulty: 3,
    stem: 'En el Combate de San Lorenzo (1813), San Martín tuvo su bautismo de fuego al frente del regimiento de:',
    choices: [{ t: 'Granaderos a Caballo.', ok: true }, { t: 'Patricios.' }, { t: 'Húsares.' }, { t: 'Blandengues.' }],
    explanation: 'San Martín creó y comandó el Regimiento de Granaderos a Caballo, que actuó en San Lorenzo en 1813.',
  }),
  mc({
    id: 'gna-his-ind-8', subject: S, block: 'independencia_y_anarquia', topic: 'primera_junta', difficulty: 2,
    stem: 'El presidente de la Primera Junta de Gobierno (1810) fue:',
    choices: [{ t: 'Cornelio Saavedra.', ok: true }, { t: 'Manuel Belgrano.' }, { t: 'Juan José Paso.' }, { t: 'Bernardino Rivadavia.' }],
    explanation: 'Cornelio Saavedra presidió la Primera Junta; Mariano Moreno y Juan José Paso fueron secretarios.',
  }),
  mc({
    id: 'gna-his-ind-9', subject: S, block: 'independencia_y_anarquia', topic: 'cepeda_1820', difficulty: 3,
    stem: 'La batalla de Cepeda de 1820 tuvo como consecuencia:',
    choices: [{ t: 'la disolución del poder central (Directorio y Congreso).', ok: true }, { t: 'la declaración de la Independencia.' }, { t: 'la sanción de la Constitución.' }, { t: 'la caída de Rosas.' }],
    explanation: 'En Cepeda (1820) las fuerzas federales derrotaron al Directorio, que se disolvió, dando inicio a la anarquía.',
  }),

  // ======== Tanda 2: Rosas y organización nacional ========
  mc({
    id: 'gna-his-org-6', subject: S, block: 'rosas_y_organizacion_nacional', topic: 'bases_alberdi', difficulty: 3,
    stem: 'La obra "Bases y puntos de partida para la organización política", que inspiró la Constitución de 1853, fue escrita por:',
    choices: [{ t: 'Juan Bautista Alberdi.', ok: true }, { t: 'Domingo F. Sarmiento.' }, { t: 'Bartolomé Mitre.' }, { t: 'Juan Manuel de Rosas.' }],
    explanation: 'Alberdi escribió las "Bases", texto fundamental que orientó a los constituyentes de 1853.',
  }),
  mc({
    id: 'gna-his-org-7', subject: S, block: 'rosas_y_organizacion_nacional', topic: 'pavon_1861', difficulty: 3,
    stem: 'Tras la batalla de Pavón (1861), quien encabezó la unificación nacional fue:',
    choices: [{ t: 'Bartolomé Mitre.', ok: true }, { t: 'Justo José de Urquiza.' }, { t: 'Juan Manuel de Rosas.' }, { t: 'Nicolás Avellaneda.' }],
    explanation: 'En Pavón, Urquiza se retiró y Mitre quedó en condiciones de unificar el país, siendo luego el primer presidente (1862).',
  }),
  mc({
    id: 'gna-his-org-8', subject: S, block: 'rosas_y_organizacion_nacional', topic: 'guerra_paraguay', difficulty: 3,
    stem: 'La Guerra de la Triple Alianza (1865-1870) enfrentó a Paraguay con:',
    choices: [{ t: 'Argentina, Brasil y Uruguay.', ok: true }, { t: 'Chile, Bolivia y Perú.' }, { t: 'Brasil y Chile solamente.' }, { t: 'España y Gran Bretaña.' }],
    explanation: 'La alianza de Argentina, Brasil y Uruguay combatió contra el Paraguay de Solano López.',
  }),
  mc({
    id: 'gna-his-org-9', subject: S, block: 'rosas_y_organizacion_nacional', topic: 'confederacion', difficulty: 3,
    stem: 'Entre 1853 y 1861, mientras Buenos Aires estuvo separada, la capital de la Confederación Argentina fue:',
    choices: [{ t: 'Paraná.', ok: true }, { t: 'Córdoba.' }, { t: 'Rosario.' }, { t: 'Mendoza.' }],
    explanation: 'La Confederación, presidida por Urquiza, tuvo su capital en Paraná (Entre Ríos).',
  }),

  // ======== Tanda 2: Consolidación del Estado nacional ========
  mc({
    id: 'gna-his-est-5', subject: S, block: 'estado_nacional', topic: 'conquista_del_desierto', difficulty: 2,
    stem: 'La llamada "Conquista del Desierto" (1878-1879), que incorporó territorios patagónicos, fue dirigida por:',
    choices: [{ t: 'Julio A. Roca.', ok: true }, { t: 'Domingo F. Sarmiento.' }, { t: 'Bartolomé Mitre.' }, { t: 'Carlos Pellegrini.' }],
    explanation: 'La campaña militar al mando de Julio A. Roca extendió el dominio estatal sobre la Patagonia.',
  }),
  mc({
    id: 'gna-his-est-6', subject: S, block: 'estado_nacional', topic: 'revolucion_del_parque', difficulty: 3,
    stem: 'La Revolución del Parque (1890) dio origen a un partido que sería clave en el siglo XX:',
    choices: [{ t: 'la Unión Cívica Radical.', ok: true }, { t: 'el Partido Justicialista.' }, { t: 'el Partido Socialista.' }, { t: 'el Partido Autonomista Nacional.' }],
    explanation: 'De la Revolución del Parque y la Unión Cívica surgió luego la Unión Cívica Radical (UCR).',
  }),
  mc({
    id: 'gna-his-est-7', subject: S, block: 'estado_nacional', topic: 'modelo_agroexportador', difficulty: 2,
    stem: 'La economía argentina entre 1880 y 1916 se basó principalmente en:',
    choices: [{ t: 'la exportación de productos agropecuarios.', ok: true }, { t: 'la industria pesada.' }, { t: 'la minería del petróleo.' }, { t: 'la exportación de manufacturas.' }],
    explanation: 'El modelo agroexportador se basó en vender carnes y cereales a Europa e importar manufacturas.',
  }),
  mc({
    id: 'gna-his-est-8', subject: S, block: 'estado_nacional', topic: 'generacion_80', difficulty: 3,
    stem: 'La "Generación del 80" gobernó bajo el lema, de raíz positivista, de:',
    choices: [{ t: '"orden y progreso".', ok: true }, { t: '"paz y administración".' }, { t: '"libertad o muerte".' }, { t: '"pan y trabajo".' }],
    explanation: 'La elite dirigente de 1880 adhirió al positivismo, sintetizado en la idea de "orden y progreso".',
  }),

  // ======== Tanda 2: Radicales y conservadores ========
  mc({
    id: 'gna-his-rad-4', subject: S, block: 'radicales_y_conservadores', topic: 'reforma_universitaria', difficulty: 3,
    stem: 'La Reforma Universitaria de 1918, iniciada en Córdoba durante el gobierno de Yrigoyen, promovió:',
    choices: [{ t: 'la autonomía y el cogobierno universitario.', ok: true }, { t: 'el arancelamiento de la universidad.' }, { t: 'el cierre de las universidades.' }, { t: 'la enseñanza exclusivamente religiosa.' }],
    explanation: 'La Reforma de 1918 introdujo la autonomía, el cogobierno estudiantil y la libertad de cátedra.',
  }),
  mc({
    id: 'gna-his-rad-5', subject: S, block: 'radicales_y_conservadores', topic: 'alvear', difficulty: 2,
    stem: 'Entre las dos presidencias de Yrigoyen gobernó, también por la UCR:',
    choices: [{ t: 'Marcelo T. de Alvear.', ok: true }, { t: 'Agustín P. Justo.' }, { t: 'Roberto M. Ortiz.' }, { t: 'Ramón Castillo.' }],
    explanation: 'Marcelo T. de Alvear (UCR) gobernó entre 1922 y 1928, entre las dos presidencias de Yrigoyen.',
  }),
  mc({
    id: 'gna-his-rad-6', subject: S, block: 'radicales_y_conservadores', topic: 'pacto_roca_runciman', difficulty: 3,
    stem: 'El Pacto Roca-Runciman (1933) fue un acuerdo comercial de Argentina con:',
    choices: [{ t: 'Gran Bretaña, para asegurar la venta de carne.', ok: true }, { t: 'Estados Unidos, sobre el trigo.' }, { t: 'Brasil, sobre el café.' }, { t: 'Alemania, sobre maquinaria.' }],
    explanation: 'El pacto garantizó a Argentina una cuota de exportación de carne al Reino Unido, con fuertes concesiones.',
  }),

  // ======== Tanda 2: Peronismo y posperonismo ========
  mc({
    id: 'gna-his-per-5', subject: S, block: 'peronismo_y_posperonismo', topic: 'diecisiete_octubre', difficulty: 2,
    stem: 'El 17 de octubre de 1945, movilizaciones obreras lograron la liberación de Perón. Esa fecha se conoce como el Día de la:',
    choices: [{ t: 'Lealtad.', ok: true }, { t: 'Independencia.' }, { t: 'Soberanía.' }, { t: 'Revolución.' }],
    explanation: 'El 17 de octubre de 1945 es el Día de la Lealtad peronista, origen simbólico del movimiento.',
  }),
  mc({
    id: 'gna-his-per-6', subject: S, block: 'peronismo_y_posperonismo', topic: 'nacionalizaciones', difficulty: 3,
    stem: 'Durante el primer peronismo, en 1948, el Estado nacionalizó:',
    choices: [{ t: 'los ferrocarriles.', ok: true }, { t: 'la industria automotriz.' }, { t: 'los medios de prensa.' }, { t: 'la actividad agropecuaria.' }],
    explanation: 'En 1948 el gobierno de Perón compró y nacionalizó los ferrocarriles, hasta entonces de capitales británicos.',
  }),
  mc({
    id: 'gna-his-per-7', subject: S, block: 'peronismo_y_posperonismo', topic: 'frondizi', difficulty: 3,
    stem: 'La política de atraer inversiones para producir petróleo y acero, impulsada por Arturo Frondizi, se conoció como:',
    choices: [{ t: 'desarrollismo.', ok: true }, { t: 'liberalismo agrario.' }, { t: 'keynesianismo social.' }, { t: 'neoliberalismo.' }],
    explanation: 'El desarrollismo de Frondizi (1958-1962) buscó el crecimiento mediante inversión en industria pesada y energía.',
  }),
  mc({
    id: 'gna-his-per-8', subject: S, block: 'peronismo_y_posperonismo', topic: 'cordobazo', difficulty: 3,
    stem: 'El "Cordobazo" (1969), gran protesta obrero-estudiantil, ocurrió durante el gobierno de facto de:',
    choices: [{ t: 'Juan Carlos Onganía.', ok: true }, { t: 'Arturo Illia.' }, { t: 'Jorge R. Videla.' }, { t: 'Pedro Aramburu.' }],
    explanation: 'El Cordobazo estalló en 1969 contra la dictadura de Onganía ("Revolución Argentina").',
  }),

  // ======== Tanda 2: Proceso y democracia ========
  mc({
    id: 'gna-his-dem-6', subject: S, block: 'proceso_y_democracia', topic: 'junta_1976', difficulty: 3,
    stem: 'La primera Junta Militar del golpe de 1976 estuvo integrada, por el Ejército, por:',
    choices: [{ t: 'Jorge Rafael Videla.', ok: true }, { t: 'Leopoldo Galtieri.' }, { t: 'Roberto Viola.' }, { t: 'Reynaldo Bignone.' }],
    explanation: 'La primera Junta fue Videla (Ejército), Massera (Marina) y Agosti (Aeronáutica).',
  }),
  mc({
    id: 'gna-his-dem-7', subject: S, block: 'proceso_y_democracia', topic: 'conadep', difficulty: 3,
    stem: 'El informe "Nunca Más", que documentó las violaciones a los derechos humanos de la dictadura, fue elaborado por:',
    choices: [{ t: 'la CONADEP.', ok: true }, { t: 'la Corte Suprema.' }, { t: 'el Congreso de la Nación.' }, { t: 'las Fuerzas Armadas.' }],
    explanation: 'La CONADEP (Comisión Nacional sobre la Desaparición de Personas), creada por Alfonsín en 1983, produjo el "Nunca Más".',
  }),
  mc({
    id: 'gna-his-dem-8', subject: S, block: 'proceso_y_democracia', topic: 'convertibilidad', difficulty: 3,
    stem: 'La Ley de Convertibilidad (1991), durante el gobierno de Menem, estableció que:',
    choices: [{ t: 'un peso equivalía a un dólar.', ok: true }, { t: 'se prohibía el uso del dólar.' }, { t: 'el peso se devaluaba cada mes.' }, { t: 'volvía el austral como moneda.' }],
    explanation: 'La convertibilidad fijó la paridad 1 peso = 1 dólar, con el objetivo de frenar la hiperinflación.',
  }),
  mc({
    id: 'gna-his-dem-9', subject: S, block: 'proceso_y_democracia', topic: 'crisis_2001', difficulty: 2,
    stem: 'La grave crisis social y económica de diciembre de 2001 provocó la renuncia del presidente:',
    choices: [{ t: 'Fernando de la Rúa.', ok: true }, { t: 'Carlos Menem.' }, { t: 'Raúl Alfonsín.' }, { t: 'Néstor Kirchner.' }],
    explanation: 'En diciembre de 2001, en medio de estallidos sociales, Fernando de la Rúa (Alianza) renunció a la presidencia.',
  }),
  mc({
    id: 'gna-his-dem-10', subject: S, block: 'proceso_y_democracia', topic: 'malvinas_causas', difficulty: 2,
    stem: 'El desembarco argentino en las Islas Malvinas, en abril de 1982, fue ordenado por el gobierno de facto de:',
    choices: [{ t: 'Leopoldo Galtieri.', ok: true }, { t: 'Jorge Videla.' }, { t: 'Roberto Viola.' }, { t: 'Reynaldo Bignone.' }],
    explanation: 'El operativo sobre Malvinas fue dispuesto por la junta presidida por Leopoldo Galtieri.',
  }),
];
