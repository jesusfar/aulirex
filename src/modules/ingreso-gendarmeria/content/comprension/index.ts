import type { Item } from '../../../../types/content';

// Comprensión lectora (materia Lengua del temario de Gendarmería). Cada pasaje
// trae un texto y preguntas de opción única sobre idea principal, inferencia,
// vocabulario en contexto, cohesión/referencia y tipo de secuencia textual.
//
// REGLA de redacción: la opción correcta NO debe distinguirse a simple vista por
// ser más larga, más detallada o "la más coherente". Distractores plausibles y
// de longitud pareja.

export interface ReadingPassage {
  id: string;
  title: string;
  genre: 'expositivo' | 'argumentativo' | 'divulgacion';
  intro: string;
  text: string;
  items: Item[];
}

function q(opts: {
  id: string;
  topic: string;
  difficulty: 1 | 2 | 3;
  stem: string;
  choices: { t: string; ok?: boolean }[];
  explanation: string;
}): Item {
  return {
    id: opts.id,
    institutions: ['GNA'],
    subject: 'lengua',
    block: 'comprension',
    topic: opts.topic,
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: opts.difficulty,
    stem: opts.stem,
    choices: opts.choices.map((c, i) => ({
      id: String.fromCharCode(97 + i),
      text: c.t,
      correct: Boolean(c.ok),
    })),
    explanation: opts.explanation,
    source: 'original',
    version: 1,
    status: 'active',
  };
}

const seguridadVial: ReadingPassage = {
  id: 'lec-seguridad-vial',
  title: 'La seguridad vial en las rutas',
  genre: 'expositivo',
  intro: 'Leé el texto y respondé las preguntas de comprensión.',
  text: `El control del tránsito en las rutas nacionales cumple una función que excede la simple aplicación de multas. Cada operativo de prevención busca, ante todo, reducir la cantidad de siniestros y proteger la vida de quienes circulan.

La mayoría de los accidentes graves no responde a una única causa, sino a la combinación de varios factores: el exceso de velocidad, el consumo de alcohol, la fatiga del conductor y el mal estado del vehículo. Por eso, los controles no se limitan a medir la velocidad, sino que verifican documentación, estado de neumáticos y condiciones del conductor.

La experiencia demuestra que la presencia visible de la autoridad en la vía modifica la conducta: los conductores moderan la velocidad y extreman precauciones. Prevenir, en este campo, resulta siempre más eficaz que sancionar una vez ocurrido el daño.`,
  items: [
    q({
      id: 'lec-seguridad-vial-1',
      topic: 'idea_principal',
      difficulty: 2,
      stem: '¿Cuál es la idea central del texto?',
      choices: [
        { t: 'El control vial busca sobre todo prevenir siniestros y proteger la vida.', ok: true },
        { t: 'La finalidad principal de los operativos es recaudar mediante multas.' },
        { t: 'Los accidentes de ruta responden siempre a una sola causa evitable.' },
        { t: 'La velocidad es el único factor que los controles deben verificar.' },
      ],
      explanation:
        'El texto sostiene que el control excede la multa y apunta a reducir siniestros y proteger vidas. Las demás contradicen (b, c, d) lo afirmado.',
    }),
    q({
      id: 'lec-seguridad-vial-2',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Del segundo párrafo se puede inferir que los accidentes graves…',
      choices: [
        { t: 'suelen originarse por varios factores combinados.', ok: true },
        { t: 'dependen exclusivamente del estado del vehículo.' },
        { t: 'ocurren solo cuando falta la autoridad en la vía.' },
        { t: 'no guardan relación con la conducta del conductor.' },
      ],
      explanation:
        'El texto enumera velocidad, alcohol, fatiga y estado del vehículo como factores que se combinan: la causa es múltiple.',
    }),
    q({
      id: 'lec-seguridad-vial-3',
      topic: 'vocabulario_en_contexto',
      difficulty: 2,
      stem: 'En el texto, la palabra "siniestros" se usa como sinónimo de…',
      choices: [
        { t: 'accidentes de tránsito.', ok: true },
        { t: 'infracciones administrativas.' },
        { t: 'operativos de control.' },
        { t: 'sanciones económicas.' },
      ],
      explanation:
        'El párrafo asocia "siniestros" con los accidentes graves que se busca reducir.',
    }),
    q({
      id: 'lec-seguridad-vial-4',
      topic: 'secuencia_textual',
      difficulty: 1,
      stem: 'La intención predominante del texto es…',
      choices: [
        { t: 'explicar el sentido de los controles viales de forma objetiva.', ok: true },
        { t: 'narrar un accidente ocurrido en una ruta nacional.' },
        { t: 'convencer de que las multas deberían eliminarse.' },
        { t: 'describir en detalle un modelo de vehículo.' },
      ],
      explanation:
        'Es un texto expositivo: informa y explica la función de los controles sin defender una tesis polémica.',
    }),
  ],
};

const revolucionMayo: ReadingPassage = {
  id: 'lec-revolucion-mayo',
  title: 'La Revolución de Mayo',
  genre: 'expositivo',
  intro: 'Leé el texto y respondé las preguntas de comprensión.',
  text: `En mayo de 1810, las noticias sobre la caída de la Junta Central de Sevilla ante las tropas de Napoleón llegaron a Buenos Aires y precipitaron los acontecimientos. Si el rey estaba cautivo y el gobierno español se había disuelto, ¿en quién recaía la autoridad en estas tierras?

Un grupo de vecinos y milicianos exigió un cabildo abierto para discutir la situación. Tras varios días de debate, el 25 de mayo se conformó la Primera Junta de Gobierno, que asumió el poder en nombre del rey Fernando VII, aunque en los hechos abría un camino propio.

Aquella decisión no significó una independencia inmediata —esta se declararía recién en 1816—, pero marcó el inicio de un proceso irreversible. Por primera vez, un gobierno local reemplazaba a la autoridad designada desde España.`,
  items: [
    q({
      id: 'lec-revolucion-mayo-1',
      topic: 'idea_principal',
      difficulty: 2,
      stem: '¿Cuál es la idea principal del texto?',
      choices: [
        { t: 'La Revolución de Mayo inició un proceso propio de gobierno, sin ser aún la independencia.', ok: true },
        { t: 'En mayo de 1810 se declaró formalmente la independencia argentina.' },
        { t: 'La Primera Junta rechazó desde el inicio toda relación con el rey.' },
        { t: 'La caída de Sevilla fortaleció el dominio español en el Río de la Plata.' },
      ],
      explanation:
        'El texto aclara que 1810 abre un proceso propio pero que la independencia se declara recién en 1816. Las otras opciones contradicen fechas o hechos.',
    }),
    q({
      id: 'lec-revolucion-mayo-2',
      topic: 'inferencia',
      difficulty: 3,
      stem: 'Que la Junta asumiera "en nombre del rey Fernando VII" sugiere que…',
      choices: [
        { t: 'buscaba legitimarse sin romper abiertamente con la Corona todavía.', ok: true },
        { t: 'pretendía devolver el poder a las tropas de Napoleón.' },
        { t: 'reconocía la autoridad de la Junta de Sevilla ya disuelta.' },
        { t: 'renunciaba a todo proyecto de gobierno autónomo.' },
      ],
      explanation:
        'Gobernar "en nombre del rey" era una fórmula de legitimidad (la "máscara de Fernando") que evitaba una ruptura abierta inmediata.',
    }),
    q({
      id: 'lec-revolucion-mayo-3',
      topic: 'cohesion_y_referencia',
      difficulty: 2,
      stem: 'En "esta se declararía recién en 1816", la palabra "esta" se refiere a…',
      choices: [
        { t: 'la independencia.', ok: true },
        { t: 'la Primera Junta.' },
        { t: 'la caída de Sevilla.' },
        { t: 'la autoridad del rey.' },
      ],
      explanation:
        'El referente más cercano y coherente es "independencia", que efectivamente se declara en 1816.',
    }),
    q({
      id: 'lec-revolucion-mayo-4',
      topic: 'secuencia_textual',
      difficulty: 1,
      stem: 'El texto organiza la información principalmente según…',
      choices: [
        { t: 'un orden temporal de los hechos.', ok: true },
        { t: 'una comparación entre dos países.' },
        { t: 'una lista de instrucciones a seguir.' },
        { t: 'la descripción física de un lugar.' },
      ],
      explanation:
        'Los hechos se presentan en secuencia cronológica: mayo de 1810, el cabildo, el 25 de mayo, 1816.',
    }),
  ],
};

const trabajoEquipo: ReadingPassage = {
  id: 'lec-trabajo-equipo',
  title: 'El trabajo en equipo',
  genre: 'argumentativo',
  intro: 'Leé el texto argumentativo y respondé las preguntas.',
  text: `Suele decirse que el mérito individual es lo que define el éxito de una tarea. Sin embargo, en las actividades que exigen coordinación, sostengo que el resultado depende más del equipo que de cualquier talento aislado.

Quienes valoran ante todo la capacidad personal tienen parte de razón: una persona preparada aporta soluciones valiosas. Pero cuando esa persona no comparte información ni escucha a los demás, su talento se desperdicia y hasta puede entorpecer al grupo.

Un equipo que confía, se comunica y distribuye bien las funciones logra lo que ningún integrante alcanzaría por separado. Por eso, aunque el esfuerzo individual importe, ninguna destreza reemplaza la coordinación: es ella la que convierte a un conjunto de personas en una verdadera unidad.`,
  items: [
    q({
      id: 'lec-trabajo-equipo-1',
      topic: 'idea_principal',
      difficulty: 2,
      stem: '¿Cuál es la postura que defiende el autor?',
      choices: [
        { t: 'Que en tareas coordinadas el equipo pesa más que el talento aislado.', ok: true },
        { t: 'Que el talento individual es siempre irrelevante para el resultado.' },
        { t: 'Que la comunicación entorpece el desempeño de los más capaces.' },
        { t: 'Que el éxito depende exclusivamente del mérito de cada persona.' },
      ],
      explanation:
        'La tesis aparece al inicio y se refuerza al final: la coordinación del equipo define el resultado más que el talento aislado.',
    }),
    q({
      id: 'lec-trabajo-equipo-2',
      topic: 'inferencia',
      difficulty: 3,
      stem: 'Cuando el autor admite que "una persona preparada aporta soluciones valiosas", lo hace para…',
      choices: [
        { t: 'reconocer un punto del otro enfoque antes de matizarlo.', ok: true },
        { t: 'abandonar la tesis que venía sosteniendo.' },
        { t: 'afirmar que el talento individual basta por sí solo.' },
        { t: 'negar cualquier valor al trabajo coordinado.' },
      ],
      explanation:
        'Es una concesión: acepta algo del punto contrario para luego marcar sus límites ("pero cuando…").',
    }),
    q({
      id: 'lec-trabajo-equipo-3',
      topic: 'hecho_y_opinion',
      difficulty: 3,
      stem: '¿Cuál de estos enunciados expresa una opinión y no un hecho?',
      choices: [
        { t: 'Ninguna destreza reemplaza la coordinación del equipo.', ok: true },
        { t: 'El texto está organizado en tres párrafos.' },
        { t: 'El autor menciona la distribución de funciones.' },
        { t: 'El párrafo final cierra la argumentación.' },
      ],
      explanation:
        'Afirmar que "ninguna destreza reemplaza la coordinación" es una valoración del autor; las demás son datos verificables sobre el texto.',
    }),
    q({
      id: 'lec-trabajo-equipo-4',
      topic: 'secuencia_textual',
      difficulty: 1,
      stem: 'Por su organización, el texto corresponde a una secuencia…',
      choices: [
        { t: 'argumentativa, porque defiende una tesis con razones.', ok: true },
        { t: 'narrativa, porque relata hechos en orden temporal.' },
        { t: 'descriptiva, porque detalla partes de un objeto.' },
        { t: 'instruccional, porque enumera pasos a seguir.' },
      ],
      explanation:
        'El autor sostiene una postura y la respalda con argumentos y una concesión: es una secuencia argumentativa.',
    }),
  ],
};

export const readingPassages: ReadingPassage[] = [
  seguridadVial,
  revolucionMayo,
  trabajoEquipo,
];

export const comprensionItems: Item[] = readingPassages.flatMap((p) => p.items);
