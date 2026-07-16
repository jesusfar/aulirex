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

  // ---- Derechos y garantías ----
  mc({
    id: 'gna-civ-der-3',
    subject: S,
    block: 'derechos_y_garantias',
    topic: 'amparo',
    difficulty: 2,
    stem: 'La acción rápida y expedita para proteger derechos constitucionales cuando no hay otro medio judicial más idóneo es:',
    choices: [
      { t: 'el amparo.', ok: true },
      { t: 'el hábeas corpus.' },
      { t: 'el juicio político.' },
      { t: 'la acefalía.' },
    ],
    explanation:
      'El amparo (art. 43) protege derechos y garantías reconocidos por la Constitución frente a actos u omisiones que los lesionen.',
  }),
  mc({
    id: 'gna-civ-der-4',
    subject: S,
    block: 'derechos_y_garantias',
    topic: 'habeas_data',
    difficulty: 3,
    stem: 'La garantía que permite a una persona conocer y, en su caso, rectificar los datos referidos a ella en registros o bancos de datos es:',
    choices: [
      { t: 'el hábeas data.', ok: true },
      { t: 'el hábeas corpus.' },
      { t: 'la inmunidad de arresto.' },
      { t: 'el indulto.' },
    ],
    explanation:
      'El hábeas data, dentro del art. 43, protege la autodeterminación informativa: acceder, actualizar, rectificar o suprimir datos personales.',
  }),
  mc({
    id: 'gna-civ-der-5',
    subject: S,
    block: 'derechos_y_garantias',
    topic: 'garantias_penales',
    difficulty: 2,
    stem: 'Según el art. 18, ningún habitante puede ser penado:',
    choices: [
      { t: 'sin juicio previo fundado en ley anterior al hecho.', ok: true },
      { t: 'salvo que lo ordene el Poder Ejecutivo.' },
      { t: 'sin autorización del gobernador.' },
      { t: 'si no paga una fianza.' },
    ],
    explanation:
      'El art. 18 consagra el juicio previo, la ley anterior al hecho, la defensa en juicio y la inviolabilidad del domicilio y la correspondencia.',
  }),
  mc({
    id: 'gna-civ-der-6',
    subject: S,
    block: 'derechos_y_garantias',
    topic: 'derecho_ambiente',
    difficulty: 3,
    stem: 'El derecho a un ambiente sano y equilibrado fue incorporado como "nuevo derecho" en el artículo:',
    choices: [
      { t: '41 de la Constitución Nacional.', ok: true },
      { t: '14 bis de la Constitución Nacional.' },
      { t: '99 de la Constitución Nacional.' },
      { t: '5 de la Constitución Nacional.' },
    ],
    explanation:
      'El art. 41, incorporado en 1994, reconoce el derecho a un ambiente sano y el deber de preservarlo. El art. 42 protege a consumidores y usuarios.',
  }),
  mc({
    id: 'gna-civ-der-7',
    subject: S,
    block: 'derechos_y_garantias',
    topic: 'igualdad',
    difficulty: 1,
    stem: 'El principio de que "todos los habitantes son iguales ante la ley" está establecido en el artículo:',
    choices: [
      { t: '16 de la Constitución Nacional.', ok: true },
      { t: '75 de la Constitución Nacional.' },
      { t: '121 de la Constitución Nacional.' },
      { t: '99 de la Constitución Nacional.' },
    ],
    explanation:
      'El art. 16 consagra la igualdad ante la ley y establece que no hay fueros personales ni títulos de nobleza.',
  }),

  // ---- Poder Legislativo ----
  mc({
    id: 'gna-civ-leg-3',
    subject: S,
    block: 'poder_legislativo',
    topic: 'diputados',
    difficulty: 2,
    stem: 'Los diputados nacionales duran en su mandato:',
    choices: [
      { t: 'cuatro años y la Cámara se renueva por mitades cada dos años.', ok: true },
      { t: 'seis años y se renueva por tercios.' },
      { t: 'dos años sin renovación parcial.' },
      { t: 'ocho años sin renovación.' },
    ],
    explanation:
      'Los diputados duran 4 años y la Cámara se renueva por mitades cada 2 años. Los senadores duran 6 y se renuevan por tercios.',
  }),
  mc({
    id: 'gna-civ-leg-4',
    subject: S,
    block: 'poder_legislativo',
    topic: 'representacion',
    difficulty: 2,
    stem: 'La Cámara de Diputados representa:',
    choices: [
      { t: 'al pueblo de la Nación.', ok: true },
      { t: 'a las provincias como entidades.' },
      { t: 'al Poder Ejecutivo.' },
      { t: 'a la Corte Suprema.' },
    ],
    explanation:
      'Los diputados representan al pueblo (se eligen en proporción a la población); los senadores representan a las provincias y la CABA.',
  }),
  mc({
    id: 'gna-civ-leg-5',
    subject: S,
    block: 'poder_legislativo',
    topic: 'formacion_leyes',
    difficulty: 3,
    stem: 'En el proceso de formación de leyes, la cámara donde comienza el tratamiento de un proyecto se denomina:',
    choices: [
      { t: 'cámara de origen.', ok: true },
      { t: 'cámara de casación.' },
      { t: 'cámara revisora final.' },
      { t: 'cámara federal.' },
    ],
    explanation:
      'La cámara donde se inicia el proyecto es la de origen; la otra es la revisora. Ambas deben aprobarlo para su sanción.',
  }),
  mc({
    id: 'gna-civ-leg-6',
    subject: S,
    block: 'poder_legislativo',
    topic: 'atribuciones_congreso',
    difficulty: 2,
    stem: '¿Cuál de estas es una atribución del Congreso de la Nación?',
    choices: [
      { t: 'Sancionar el Presupuesto general y los códigos de fondo.', ok: true },
      { t: 'Nombrar por sí solo a los ministros.' },
      { t: 'Dictar las sentencias de la Corte Suprema.' },
      { t: 'Gobernar directamente las provincias.' },
    ],
    explanation:
      'El art. 75 atribuye al Congreso, entre otras, sancionar el presupuesto y dictar los códigos civil, penal, comercial, etc.',
  }),

  // ---- Órganos de control ----
  mc({
    id: 'gna-civ-ctl-1',
    subject: S,
    block: 'organos_de_control',
    topic: 'defensor_del_pueblo',
    difficulty: 3,
    stem: 'El órgano independiente cuya misión es defender los derechos de las personas frente a actos de la administración pública es:',
    choices: [
      { t: 'el Defensor del Pueblo.', ok: true },
      { t: 'la Auditoría General de la Nación.' },
      { t: 'el Jefe de Gabinete.' },
      { t: 'la Corte Suprema.' },
    ],
    explanation:
      'El Defensor del Pueblo (art. 86) protege los derechos humanos y demás garantías frente a hechos u omisiones de la administración.',
  }),
  mc({
    id: 'gna-civ-ctl-2',
    subject: S,
    block: 'organos_de_control',
    topic: 'auditoria_general',
    difficulty: 3,
    stem: 'El control externo del sector público nacional en lo patrimonial, económico y financiero corresponde a:',
    choices: [
      { t: 'la Auditoría General de la Nación.', ok: true },
      { t: 'el Defensor del Pueblo.' },
      { t: 'el Ministerio de Economía.' },
      { t: 'la Cámara de Diputados en pleno.' },
    ],
    explanation:
      'La Auditoría General de la Nación (art. 85) asiste técnicamente al Congreso en el control externo del sector público.',
  }),

  // ---- Poder Ejecutivo ----
  mc({
    id: 'gna-civ-eje-3',
    subject: S,
    block: 'poder_ejecutivo',
    topic: 'eleccion_presidente',
    difficulty: 3,
    stem: 'El Presidente y el Vicepresidente de la Nación son elegidos:',
    choices: [
      { t: 'en forma directa, con posibilidad de segunda vuelta (ballotage).', ok: true },
      { t: 'por el Congreso reunido en asamblea.' },
      { t: 'por los gobernadores de provincia.' },
      { t: 'por la Corte Suprema de Justicia.' },
    ],
    explanation:
      'Desde 1994 la elección es directa por fórmula, con doble vuelta si no se alcanzan los porcentajes que fija la Constitución (arts. 94-98).',
  }),
  mc({
    id: 'gna-civ-eje-4',
    subject: S,
    block: 'poder_ejecutivo',
    topic: 'atribuciones_ejecutivo',
    difficulty: 2,
    stem: 'Respecto de las Fuerzas Armadas, el Presidente de la Nación es:',
    choices: [
      { t: 'el comandante en jefe.', ok: true },
      { t: 'un asesor sin mando.' },
      { t: 'un integrante del Estado Mayor.' },
      { t: 'ajeno a su conducción.' },
    ],
    explanation:
      'El art. 99 establece que el Presidente es comandante en jefe de todas las Fuerzas Armadas de la Nación.',
  }),

  // ---- Poder Judicial ----
  mc({
    id: 'gna-civ-jud-2',
    subject: S,
    block: 'poder_judicial',
    topic: 'inamovilidad_jueces',
    difficulty: 3,
    stem: 'Según la Constitución, los jueces de la Nación conservan sus empleos:',
    choices: [
      { t: 'mientras dure su buena conducta.', ok: true },
      { t: 'por un mandato fijo de cuatro años.' },
      { t: 'hasta que lo decida el Presidente.' },
      { t: 'por seis años renovables.' },
    ],
    explanation:
      'El art. 110 garantiza la inamovilidad: los jueces permanecen mientras dure su buena conducta, condición de la independencia judicial.',
  }),
  mc({
    id: 'gna-civ-jud-3',
    subject: S,
    block: 'poder_judicial',
    topic: 'juicio_politico',
    difficulty: 3,
    stem: 'En el juicio político a un funcionario, la Cámara que acusa y la que juzga son, respectivamente:',
    choices: [
      { t: 'Diputados acusa y el Senado juzga.', ok: true },
      { t: 'el Senado acusa y Diputados juzga.' },
      { t: 'la Corte Suprema acusa y el Senado juzga.' },
      { t: 'el Presidente acusa y Diputados juzga.' },
    ],
    explanation:
      'La Cámara de Diputados acusa (art. 53) y el Senado juzga en juicio público (art. 59) a los funcionarios sujetos a juicio político.',
  }),

  // ======== Tanda 2 ========
  mc({
    id: 'gna-civ-org-2', subject: S, block: 'forma_de_estado', topic: 'forma_de_gobierno', difficulty: 1,
    stem: 'Según el art. 1, el gobierno de la Nación Argentina adopta la forma:',
    choices: [{ t: 'representativa, republicana y federal.', ok: true }, { t: 'monárquica y centralizada.' }, { t: 'parlamentaria y unitaria.' }, { t: 'directa y confederal.' }],
    explanation: 'El art. 1 establece la forma representativa (por medio de representantes), republicana (división de poderes) y federal.',
  }),
  mc({
    id: 'gna-civ-org-3', subject: S, block: 'forma_de_estado', topic: 'democracia_representativa', difficulty: 2,
    stem: 'El art. 22 establece que "el pueblo no delibera ni gobierna sino por medio de sus representantes". Esto define una democracia:',
    choices: [{ t: 'representativa.', ok: true }, { t: 'directa.' }, { t: 'monárquica.' }, { t: 'corporativa.' }],
    explanation: 'La regla general es la democracia representativa; la iniciativa y la consulta popular son formas semidirectas incorporadas en 1994.',
  }),
  mc({
    id: 'gna-civ-der-8', subject: S, block: 'derechos_y_garantias', topic: 'sufragio', difficulty: 2,
    stem: 'El art. 37 garantiza el pleno ejercicio de los derechos políticos y establece que el sufragio es:',
    choices: [{ t: 'universal, igual, secreto y obligatorio.', ok: true }, { t: 'calificado según la renta.' }, { t: 'optativo y a viva voz.' }, { t: 'exclusivo de los mayores de 25 años.' }],
    explanation: 'El art. 37 consagra el sufragio universal, igual, secreto y obligatorio, y la igualdad real de oportunidades entre varones y mujeres.',
  }),
  mc({
    id: 'gna-civ-der-9', subject: S, block: 'derechos_y_garantias', topic: 'estado_de_sitio', difficulty: 3,
    stem: 'El estado de sitio (art. 23) puede declararse en caso de:',
    choices: [{ t: 'conmoción interior o ataque exterior.', ok: true }, { t: 'huelga general.' }, { t: 'crisis económica.' }, { t: 'renuncia del presidente.' }],
    explanation: 'El estado de sitio procede ante conmoción interior o ataque exterior que pongan en peligro la Constitución; suspende ciertas garantías.',
  }),
  mc({
    id: 'gna-civ-der-10', subject: S, block: 'derechos_y_garantias', topic: 'participacion_ciudadana', difficulty: 3,
    stem: 'El derecho de los ciudadanos a presentar proyectos de ley ante el Congreso se denomina:',
    choices: [{ t: 'iniciativa popular.', ok: true }, { t: 'juicio político.' }, { t: 'acefalía.' }, { t: 'interpelación.' }],
    explanation: 'La iniciativa popular (art. 39), incorporada en 1994, permite a la ciudadanía presentar proyectos de ley.',
  }),
  mc({
    id: 'gna-civ-leg-7', subject: S, block: 'poder_legislativo', topic: 'requisitos_senador', difficulty: 3,
    stem: 'Para ser senador nacional se requiere, entre otras condiciones, tener como mínimo:',
    choices: [{ t: '30 años de edad.', ok: true }, { t: '18 años de edad.' }, { t: '21 años de edad.' }, { t: '45 años de edad.' }],
    explanation: 'El art. 55 exige 30 años de edad y 6 años de ciudadanía para ser senador. Para diputado, en cambio, bastan 25 años.',
  }),
  mc({
    id: 'gna-civ-leg-8', subject: S, block: 'poder_legislativo', topic: 'presidencia_senado', difficulty: 3,
    stem: 'El presidente del Senado de la Nación es:',
    choices: [{ t: 'el Vicepresidente de la Nación.', ok: true }, { t: 'el Presidente de la Nación.' }, { t: 'el Jefe de Gabinete.' }, { t: 'el senador de mayor edad.' }],
    explanation: 'El art. 57 establece que el Vicepresidente preside el Senado, pero solo vota en caso de empate.',
  }),
  mc({
    id: 'gna-civ-leg-9', subject: S, block: 'poder_legislativo', topic: 'atribuciones_congreso', difficulty: 3,
    stem: 'La distribución de los recursos coparticipables entre la Nación y las provincias es una atribución del Congreso conocida como:',
    choices: [{ t: 'régimen de coparticipación federal.', ok: true }, { t: 'presupuesto de gastos reservados.' }, { t: 'deuda externa.' }, { t: 'poder de policía.' }],
    explanation: 'El art. 75, inc. 2 prevé la coparticipación federal de impuestos mediante ley convenio entre la Nación y las provincias.',
  }),
  mc({
    id: 'gna-civ-leg-10', subject: S, block: 'poder_legislativo', topic: 'jerarquia_tratados', difficulty: 3,
    stem: 'Desde la reforma de 1994, ciertos tratados internacionales de derechos humanos tienen:',
    choices: [{ t: 'jerarquía constitucional.', ok: true }, { t: 'rango inferior a las leyes provinciales.' }, { t: 'valor solo declarativo.' }, { t: 'vigencia por un año.' }],
    explanation: 'El art. 75, inc. 22 otorga jerarquía constitucional a un conjunto de tratados de derechos humanos.',
  }),
  mc({
    id: 'gna-civ-eje-5', subject: S, block: 'poder_ejecutivo', topic: 'requisitos_presidente', difficulty: 2,
    stem: 'Para ser Presidente de la Nación se requiere, entre otras condiciones:',
    choices: [{ t: 'haber nacido en territorio argentino o ser hijo de ciudadano nativo.', ok: true }, { t: 'tener al menos 50 años.' }, { t: 'ser oriundo de la Capital Federal.' }, { t: 'pertenecer a las Fuerzas Armadas.' }],
    explanation: 'El art. 89 exige haber nacido en el territorio argentino, o ser hijo de ciudadano nativo si nació en el extranjero, entre otros requisitos.',
  }),
  mc({
    id: 'gna-civ-eje-6', subject: S, block: 'poder_ejecutivo', topic: 'ministros', difficulty: 3,
    stem: 'Los actos del Presidente necesitan, para tener validez, el refrendo (la firma) de:',
    choices: [{ t: 'los ministros del ramo o del Jefe de Gabinete.', ok: true }, { t: 'la Corte Suprema.' }, { t: 'el Defensor del Pueblo.' }, { t: 'los gobernadores.' }],
    explanation: 'El art. 100 dispone que los ministros refrendan y legalizan los actos del Presidente, sin lo cual carecen de eficacia.',
  }),
  mc({
    id: 'gna-civ-eje-7', subject: S, block: 'poder_ejecutivo', topic: 'declaracion_guerra', difficulty: 3,
    stem: 'La declaración de la guerra a otra nación:',
    choices: [{ t: 'la dispone el Presidente con autorización o aprobación del Congreso.', ok: true }, { t: 'es facultad exclusiva de la Corte Suprema.' }, { t: 'la decide cada provincia por separado.' }, { t: 'está prohibida en todos los casos.' }],
    explanation: 'El Presidente declara la guerra pero requiere autorización y aprobación del Congreso (arts. 75 inc. 25 y 99 inc. 15).',
  }),
  mc({
    id: 'gna-civ-jud-4', subject: S, block: 'poder_judicial', topic: 'consejo_magistratura', difficulty: 3,
    stem: 'El órgano encargado de seleccionar mediante concursos a los jueces y administrar el Poder Judicial es:',
    choices: [{ t: 'el Consejo de la Magistratura.', ok: true }, { t: 'la Cámara de Diputados.' }, { t: 'el Ministerio de Justicia.' }, { t: 'el Defensor del Pueblo.' }],
    explanation: 'El Consejo de la Magistratura (art. 114), incorporado en 1994, propone ternas de jueces y administra el Poder Judicial.',
  }),
  mc({
    id: 'gna-civ-jud-5', subject: S, block: 'poder_judicial', topic: 'ministerio_publico', difficulty: 3,
    stem: 'El órgano independiente que promueve la actuación de la justicia en defensa de la legalidad es:',
    choices: [{ t: 'el Ministerio Público.', ok: true }, { t: 'la Auditoría General.' }, { t: 'el Consejo Económico.' }, { t: 'la Cámara de Senadores.' }],
    explanation: 'El Ministerio Público (art. 120) es un órgano independiente que promueve la actuación de la justicia en defensa de la legalidad y los intereses generales.',
  }),
  mc({
    id: 'gna-civ-pro-2', subject: S, block: 'provincias_y_caba', topic: 'intervencion_federal', difficulty: 3,
    stem: 'La intervención federal a una provincia, en principio, es dispuesta por:',
    choices: [{ t: 'el Congreso de la Nación.', ok: true }, { t: 'la Corte Suprema.' }, { t: 'el gobernador vecino.' }, { t: 'las Fuerzas Armadas.' }],
    explanation: 'Corresponde al Congreso disponer la intervención federal (art. 75 inc. 31); el Ejecutivo puede hacerlo durante el receso, convocando luego al Congreso.',
  }),
  mc({
    id: 'gna-civ-pro-3', subject: S, block: 'provincias_y_caba', topic: 'caba', difficulty: 2,
    stem: 'Respecto de la Ciudad de Buenos Aires, la Constitución (art. 129) establece que tiene:',
    choices: [{ t: 'un régimen de gobierno autónomo, con jefe de gobierno elegido por sus habitantes.', ok: true }, { t: 'un gobernador designado por el Presidente.' }, { t: 'el mismo estatus que un municipio provincial.' }, { t: 'dependencia directa del Congreso.' }],
    explanation: 'Desde 1994 la CABA tiene un régimen autónomo, con facultades propias de legislación y jurisdicción y un jefe de gobierno electo.',
  }),
  mc({
    id: 'gna-civ-org-4', subject: S, block: 'forma_de_estado', topic: 'reforma_constitucional', difficulty: 3,
    stem: 'La Constitución solo puede reformarse:',
    choices: [{ t: 'por una Convención convocada al efecto, tras declarar el Congreso la necesidad de la reforma.', ok: true }, { t: 'por decreto del Presidente.' }, { t: 'por una sentencia de la Corte Suprema.' }, { t: 'por referéndum de una sola provincia.' }],
    explanation: 'El art. 30 exige que el Congreso declare la necesidad de la reforma (con dos tercios) y que la realice una Convención Constituyente.',
  }),
  mc({
    id: 'gna-civ-der-11', subject: S, block: 'derechos_y_garantias', topic: 'derechos_consumidor', difficulty: 2,
    stem: 'La protección de los consumidores y usuarios de bienes y servicios está reconocida en el artículo:',
    choices: [{ t: '42 de la Constitución Nacional.', ok: true }, { t: '14 de la Constitución Nacional.' }, { t: '99 de la Constitución Nacional.' }, { t: '121 de la Constitución Nacional.' }],
    explanation: 'El art. 42, incorporado en 1994, protege la salud, la seguridad y los intereses económicos de consumidores y usuarios.',
  }),
];
