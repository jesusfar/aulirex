import type { Item } from '../../../../types/content';

// Módulo Alfabetización Académica / Comprensión Lectora (UNSa, Res. 089-20).
// Cada pasaje trae un texto base y varias preguntas de opción única que evalúan
// idea principal, inferencia, vocabulario en contexto, cohesión/referencia,
// tipo de secuencia y distinción hecho/opinión.
//
// REGLA de redacción (feedback del usuario): la opción correcta NO debe poder
// distinguirse a simple vista por ser más larga, más detallada o "la más
// coherente". Los distractores son plausibles y de longitud pareja.

export interface ReadingPassage {
  id: string;
  title: string;
  genre: 'expositivo' | 'argumentativo' | 'divulgacion';
  intro: string; // consigna breve
  text: string; // párrafos separados por \n\n
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
    institutions: ['UNSa'],
    subject: 'comprension_textos',
    block: 'comprension_lectora',
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

const antibioticos: ReadingPassage = {
  id: 'lec-antibioticos',
  title: 'La resistencia a los antibióticos',
  genre: 'divulgacion',
  intro: 'Leé el texto y respondé las preguntas de comprensión.',
  text: `Los antibióticos revolucionaron la medicina del siglo XX: infecciones que antes resultaban mortales pasaron a curarse en pocos días. Sin embargo, su uso masivo e indiscriminado generó un problema inesperado. Cada vez que una población de bacterias se expone a un antibiótico, la mayoría muere, pero unas pocas que portan mutaciones resistentes sobreviven y se reproducen. Con el tiempo, esas variantes resistentes se vuelven dominantes y el fármaco pierde eficacia.

El fenómeno se agrava por prácticas cotidianas: interrumpir un tratamiento antes de tiempo, exigir antibióticos para infecciones virales —contra las que no tienen ningún efecto— o emplearlos de manera rutinaria en la cría de animales. Todo ello acelera la selección de bacterias difíciles de combatir.

Los especialistas advierten que, de no cambiar estos hábitos, podríamos ingresar en una era "posantibiótica", en la que cirugías de rutina o infecciones menores vuelvan a ser peligrosas. La buena noticia es que el proceso puede frenarse: usar estos medicamentos solo cuando un profesional los indica, completar las dosis y mejorar la higiene reducen la aparición de resistencias.`,
  items: [
    q({
      id: 'lec-antibioticos-1',
      topic: 'idea_principal',
      difficulty: 2,
      stem: '¿Cuál es la idea central del texto?',
      choices: [
        { t: 'El mal uso de los antibióticos impulsa bacterias resistentes y obliga a un consumo responsable.', ok: true },
        { t: 'Los antibióticos perdieron toda su eficacia y hoy resultan inútiles frente a cualquier infección.' },
        { t: 'Las bacterias adquieren resistencia por azar, sin relación alguna con los fármacos que reciben.' },
        { t: 'La cría intensiva de animales constituye la causa exclusiva del avance de esas bacterias.' },
      ],
      explanation:
        'El texto explica que el uso indebido selecciona bacterias resistentes y cierra proponiendo un uso responsable. Las demás exageran (b, d) o niegan la relación causa-efecto que el texto afirma (c).',
    }),
    q({
      id: 'lec-antibioticos-2',
      topic: 'vocabulario_en_contexto',
      difficulty: 2,
      stem: 'En el texto, la expresión "era posantibiótica" alude a un escenario en el que…',
      choices: [
        { t: 'los antibióticos ya no bastarían para controlar infecciones hoy tratables.', ok: true },
        { t: 'se habrían inventado antibióticos capaces de vencer a todas las bacterias.' },
        { t: 'las personas dejarían por completo de enfermarse por infecciones bacterianas.' },
        { t: 'los tratamientos con antibióticos durarían apenas unas pocas horas.' },
      ],
      explanation:
        '"Posantibiótica" remite a un futuro en que los antibióticos dejan de ser eficaces y vuelven a ser peligrosas infecciones hoy controlables.',
    }),
    q({
      id: 'lec-antibioticos-3',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Se puede inferir del texto que un antibiótico recetado para una gripe…',
      choices: [
        { t: 'no ayudaría a curarla, porque la gripe es de origen viral.', ok: true },
        { t: 'aceleraría la recuperación al eliminar el virus responsable.' },
        { t: 'sería más eficaz cuanto mayor fuera la dosis administrada.' },
        { t: 'debería combinarse con otro antibiótico para potenciar su efecto.' },
      ],
      explanation:
        'El texto aclara que los antibióticos no tienen efecto contra infecciones virales; la gripe es viral, de modo que no serviría.',
    }),
    q({
      id: 'lec-antibioticos-4',
      topic: 'cohesion_y_referencia',
      difficulty: 2,
      stem: 'En "esas variantes resistentes se vuelven dominantes", la palabra "esas" se refiere a…',
      choices: [
        { t: 'las pocas bacterias con mutaciones que sobrevivieron al antibiótico.', ok: true },
        { t: 'todas las bacterias de la población expuesta al medicamento.' },
        { t: 'las infecciones que antes resultaban mortales para las personas.' },
        { t: 'las prácticas cotidianas que agravan el problema descripto.' },
      ],
      explanation:
        'El referente es el grupo de bacterias mutantes que sobrevivió: al reproducirse, esas variantes se vuelven mayoría.',
    }),
    q({
      id: 'lec-antibioticos-5',
      topic: 'secuencia_textual',
      difficulty: 1,
      stem: 'La intención predominante del texto es…',
      choices: [
        { t: 'explicar un problema de salud y orientar sobre cómo evitarlo.', ok: true },
        { t: 'narrar la historia del descubrimiento de los antibióticos.' },
        { t: 'convencer al lector de que nunca debe tomar antibióticos.' },
        { t: 'comparar distintos antibióticos según su precio y eficacia.' },
      ],
      explanation:
        'Es un texto de divulgación expositivo: presenta el fenómeno, sus causas y recomendaciones para prevenirlo.',
    }),
  ],
};

const automedicacion: ReadingPassage = {
  id: 'lec-automedicacion',
  title: 'La automedicación',
  genre: 'argumentativo',
  intro: 'Leé el texto argumentativo y respondé las preguntas.',
  text: `Cada vez es más común que las personas resuelvan sus malestares recurriendo a medicamentos sin consultar a un profesional. La automedicación puede parecer práctica y económica, pero conviene mirarla con cautela.

Quienes la defienden sostienen que permite aliviar rápidamente molestias menores y descongestionar los servicios de salud. Es cierto que un analgésico ocasional para un dolor de cabeza rara vez entraña riesgos. Sin embargo, el problema aparece cuando esta conducta se vuelve un hábito y se extiende a fármacos más delicados.

Tomar un medicamento sin diagnóstico puede enmascarar los síntomas de una enfermedad seria y retrasar su detección. Además, muchas sustancias interactúan entre sí de maneras peligrosas, y una dosis inadecuada puede dañar órganos como el hígado o el riñón. Por eso, aunque el acceso rápido a los fármacos sea valioso, sostengo que ninguna comodidad justifica poner en juego la propia salud: ante cualquier duda, la consulta profesional sigue siendo insustituible.`,
  items: [
    q({
      id: 'lec-automedicacion-1',
      topic: 'idea_principal',
      difficulty: 2,
      stem: '¿Cuál es la postura que defiende el autor?',
      choices: [
        { t: 'Que la comodidad de automedicarse no justifica los riesgos que implica.', ok: true },
        { t: 'Que la automedicación es siempre inofensiva si se usan analgésicos.' },
        { t: 'Que los servicios de salud deberían prohibir la venta libre de fármacos.' },
        { t: 'Que consultar a un profesional resulta una pérdida de tiempo y dinero.' },
      ],
      explanation:
        'La tesis se enuncia al final: ninguna comodidad justifica arriesgar la salud, por eso la consulta es insustituible.',
    }),
    q({
      id: 'lec-automedicacion-2',
      topic: 'hecho_y_opinion',
      difficulty: 3,
      stem: '¿Cuál de estos enunciados del texto expresa un hecho y no una opinión?',
      choices: [
        { t: 'Muchas sustancias interactúan entre sí y una dosis inadecuada puede dañar órganos.', ok: true },
        { t: 'Ninguna comodidad justifica poner en juego la propia salud del paciente.' },
        { t: 'La automedicación conviene mirarla siempre con bastante cautela.' },
        { t: 'El acceso rápido a los medicamentos es su aspecto más valioso.' },
      ],
      explanation:
        'La interacción entre fármacos y el daño por sobredosis son datos verificables (hecho). Las otras tres expresan valoraciones del autor.',
    }),
    q({
      id: 'lec-automedicacion-3',
      topic: 'inferencia',
      difficulty: 3,
      stem: 'Cuando el autor admite que "un analgésico ocasional rara vez entraña riesgos", lo hace para…',
      choices: [
        { t: 'reconocer un punto a favor de la otra postura antes de refutarla.', ok: true },
        { t: 'contradecirse y abandonar la tesis que venía defendiendo.' },
        { t: 'demostrar que la automedicación no tiene ningún inconveniente.' },
        { t: 'proponer que se consuman analgésicos con la mayor frecuencia.' },
      ],
      explanation:
        'Es una concesión: admite algo del punto contrario ("es cierto que…") para luego marcar sus límites con "sin embargo".',
    }),
    q({
      id: 'lec-automedicacion-4',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Del texto se desprende que el mayor peligro de la automedicación es…',
      choices: [
        { t: 'ocultar una enfermedad grave y demorar su diagnóstico.', ok: true },
        { t: 'gastar más dinero del necesario en la farmacia.' },
        { t: 'generar largas filas en los servicios de urgencia.' },
        { t: 'acostumbrar al cuerpo al sabor de los medicamentos.' },
      ],
      explanation:
        'El texto destaca que tomar fármacos sin diagnóstico "puede enmascarar los síntomas de una enfermedad seria y retrasar su detección".',
    }),
    q({
      id: 'lec-automedicacion-5',
      topic: 'secuencia_textual',
      difficulty: 1,
      stem: 'Por su organización, el texto corresponde predominantemente a una secuencia…',
      choices: [
        { t: 'argumentativa, porque sostiene una tesis con razones.', ok: true },
        { t: 'narrativa, porque relata hechos en orden cronológico.' },
        { t: 'descriptiva, porque detalla las partes de un objeto.' },
        { t: 'instruccional, porque enumera pasos a seguir.' },
      ],
      explanation:
        'El autor defiende una postura (tesis) y la respalda con argumentos y una concesión: es una secuencia argumentativa.',
    }),
  ],
};

const microbiota: ReadingPassage = {
  id: 'lec-microbiota',
  title: 'La microbiota intestinal',
  genre: 'expositivo',
  intro: 'Leé el texto y respondé las preguntas de comprensión.',
  text: `En el intestino humano habitan billones de microorganismos —en su mayoría bacterias— que en conjunto reciben el nombre de microbiota. Lejos de ser meros pasajeros, estos microorganismos cumplen funciones esenciales para el organismo que los aloja.

La microbiota participa en la digestión de fibras que el cuerpo no puede degradar por sí solo, sintetiza ciertas vitaminas y contribuye a entrenar al sistema inmunitario para que distinga entre amigos y enemigos. También ocupa espacio y recursos que, de otro modo, podrían aprovechar bacterias dañinas.

Su composición no es fija: varía con la dieta, la edad, el uso de antibióticos y el estilo de vida. Una alimentación rica en fibras vegetales tiende a favorecer una microbiota diversa, asociada con un mejor estado de salud. En cambio, ciertos desequilibrios se han vinculado con trastornos digestivos, metabólicos e incluso del estado de ánimo, aunque muchas de estas relaciones todavía se investigan.`,
  items: [
    q({
      id: 'lec-microbiota-1',
      topic: 'idea_principal',
      difficulty: 1,
      stem: '¿Cuál es la idea principal del texto?',
      choices: [
        { t: 'La microbiota cumple funciones importantes y su equilibrio influye en la salud.', ok: true },
        { t: 'Las bacterias del intestino son siempre perjudiciales y conviene eliminarlas.' },
        { t: 'La dieta no tiene ninguna influencia sobre los microorganismos intestinales.' },
        { t: 'El sistema inmunitario funciona sin ayuda alguna de la microbiota.' },
      ],
      explanation:
        'El texto detalla funciones útiles de la microbiota y señala que su equilibrio se asocia con la salud; las otras opciones contradicen el texto.',
    }),
    q({
      id: 'lec-microbiota-2',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Según el texto, una dieta rica en fibras vegetales…',
      choices: [
        { t: 'favorece una microbiota diversa, ligada a mejor salud.', ok: true },
        { t: 'elimina por completo a las bacterias del intestino.' },
        { t: 'impide la síntesis de vitaminas en el organismo.' },
        { t: 'vuelve innecesario el trabajo del sistema inmunitario.' },
      ],
      explanation:
        'El tercer párrafo asocia la alimentación rica en fibras con una microbiota diversa y un mejor estado de salud.',
    }),
    q({
      id: 'lec-microbiota-3',
      topic: 'vocabulario_en_contexto',
      difficulty: 2,
      stem: 'Al decir que los microorganismos no son "meros pasajeros", el texto quiere señalar que NO son…',
      choices: [
        { t: 'simples habitantes sin ninguna función relevante.', ok: true },
        { t: 'organismos capaces de reproducirse en el cuerpo.' },
        { t: 'seres vivos formados por una sola célula.' },
        { t: 'bacterias que provienen del ambiente exterior.' },
      ],
      explanation:
        '"Meros pasajeros" significaría habitantes sin función; el texto lo niega para destacar que sí cumplen tareas esenciales.',
    }),
    q({
      id: 'lec-microbiota-4',
      topic: 'cohesion_y_referencia',
      difficulty: 3,
      stem: 'La expresión "de otro modo", en el segundo párrafo, introduce…',
      choices: [
        { t: 'una situación hipotética contraria a la que se describe.', ok: true },
        { t: 'un ejemplo concreto de bacteria beneficiosa.' },
        { t: 'la conclusión final de todo el texto.' },
        { t: 'una definición técnica del término microbiota.' },
      ],
      explanation:
        '"De otro modo" plantea qué pasaría si la microbiota no ocupara ese espacio: es una hipótesis contraria a lo que ocurre.',
    }),
    q({
      id: 'lec-microbiota-5',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Cuando el texto aclara que ciertas relaciones "todavía se investigan", da a entender que…',
      choices: [
        { t: 'esas conclusiones aún no son definitivas.', ok: true },
        { t: 'esos vínculos ya fueron demostrados por completo.' },
        { t: 'la microbiota no influye en el estado de ánimo.' },
        { t: 'los estudios sobre el tema fueron abandonados.' },
      ],
      explanation:
        'Que algo "todavía se investiga" marca provisoriedad: los vínculos se sospechan pero no están confirmados del todo.',
    }),
  ],
};

const sueno: ReadingPassage = {
  id: 'lec-sueno',
  title: 'El sueño y la memoria',
  genre: 'expositivo',
  intro: 'Leé el texto y respondé las preguntas de comprensión.',
  text: `Dormir no es simplemente apagar el cuerpo para descansar. Durante el sueño, el cerebro realiza una intensa tarea de mantenimiento y, sobre todo, consolida lo aprendido durante el día.

Diversos experimentos muestran que, cuando una persona estudia un contenido y luego duerme bien, lo recuerda mejor que si permanece despierta el mismo lapso. Esto ocurre porque, durante ciertas etapas del sueño, el cerebro "repasa" las conexiones formadas mientras estábamos despiertos y las fija de manera más estable.

La privación de sueño, en cambio, deteriora la atención y dificulta la fijación de nuevos recuerdos. Por eso, estudiar toda la noche antes de un examen suele ser contraproducente: el cansancio resta lo que el esfuerzo pretende sumar. Un descanso adecuado, lejos de ser tiempo perdido, forma parte del propio aprendizaje.`,
  items: [
    q({
      id: 'lec-sueno-1',
      topic: 'idea_principal',
      difficulty: 1,
      stem: '¿Cuál es la idea principal del texto?',
      choices: [
        { t: 'El sueño consolida lo aprendido, por lo que descansar favorece la memoria.', ok: true },
        { t: 'Estudiar toda la noche es la mejor estrategia para aprobar un examen.' },
        { t: 'El cerebro permanece completamente inactivo mientras dormimos.' },
        { t: 'La memoria depende únicamente de la cantidad de horas de estudio.' },
      ],
      explanation:
        'El texto sostiene que durante el sueño se consolida lo aprendido y por eso el descanso ayuda a recordar.',
    }),
    q({
      id: 'lec-sueno-2',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Según el texto, ¿por qué se recuerda mejor un contenido tras dormir?',
      choices: [
        { t: 'Porque durante el sueño el cerebro repasa y fija las conexiones formadas.', ok: true },
        { t: 'Porque al dormir se olvidan los datos poco importantes del día.' },
        { t: 'Porque el descanso aumenta la cantidad de neuronas del cerebro.' },
        { t: 'Porque durante la noche no ingresa nueva información al cerebro.' },
      ],
      explanation:
        'El segundo párrafo explica que el cerebro "repasa" y fija de modo más estable las conexiones formadas al estar despiertos.',
    }),
    q({
      id: 'lec-sueno-3',
      topic: 'vocabulario_en_contexto',
      difficulty: 2,
      stem: 'La frase "el cansancio resta lo que el esfuerzo pretende sumar" sugiere que estudiar sin dormir…',
      choices: [
        { t: 'puede perjudicar el rendimiento en lugar de mejorarlo.', ok: true },
        { t: 'garantiza un mejor resultado en el examen.' },
        { t: 'no tiene ningún efecto sobre la memoria.' },
        { t: 'reemplaza por completo la necesidad de descansar.' },
      ],
      explanation:
        'La metáfora indica que lo que se gana estudiando se pierde por el cansancio: el saldo puede ser negativo.',
    }),
    q({
      id: 'lec-sueno-4',
      topic: 'secuencia_textual',
      difficulty: 2,
      stem: 'La relación que el texto establece entre privación de sueño y memoria es de…',
      choices: [
        { t: 'causa y consecuencia.', ok: true },
        { t: 'semejanza y comparación.' },
        { t: 'orden cronológico de hechos.' },
        { t: 'problema sin ninguna solución.' },
      ],
      explanation:
        'Dormir poco (causa) deteriora la atención y la fijación de recuerdos (consecuencia): es una relación causal.',
    }),
    q({
      id: 'lec-sueno-5',
      topic: 'inferencia',
      difficulty: 1,
      stem: 'Con la última oración, el autor busca…',
      choices: [
        { t: 'valorar el descanso como parte del aprendizaje.', ok: true },
        { t: 'criticar a quienes duermen demasiadas horas.' },
        { t: 'describir las etapas biológicas del sueño.' },
        { t: 'enumerar técnicas para estudiar más rápido.' },
      ],
      explanation:
        'Al decir que el descanso "no es tiempo perdido" sino parte del aprendizaje, el autor lo valora positivamente.',
    }),
  ],
};

const vacunas: ReadingPassage = {
  id: 'lec-vacunas',
  title: 'Las vacunas y el sistema inmune',
  genre: 'divulgacion',
  intro: 'Leé el texto y respondé las preguntas de comprensión.',
  text: `Las vacunas son uno de los mayores logros de la salud pública. Su principio es sencillo pero ingenioso: entrenar al sistema inmunitario para que reconozca a un agente infeccioso antes de encontrarse con él de verdad.

Una vacuna introduce en el organismo una versión inofensiva del microbio —o solo una parte de él, como una proteína—. El sistema inmune reacciona como si se tratara de una infección real: produce defensas y, sobre todo, genera células de memoria. Gracias a ellas, si más adelante el microbio verdadero ingresa al cuerpo, la respuesta es rápida y contundente.

Cuando una proporción alta de la población está vacunada, el microbio encuentra pocas personas susceptibles y le cuesta propagarse. Ese efecto, llamado inmunidad de rebaño, protege incluso a quienes no pueden vacunarse, como algunos bebés o personas inmunodeprimidas. Por eso vacunarse no es solo una decisión individual: también es un acto que cuida a la comunidad.`,
  items: [
    q({
      id: 'lec-vacunas-1',
      topic: 'idea_principal',
      difficulty: 2,
      stem: '¿Cuál es la idea central del texto?',
      choices: [
        { t: 'Las vacunas entrenan al sistema inmune y, al vacunarse muchos, protegen a la comunidad.', ok: true },
        { t: 'Las vacunas curan las infecciones una vez que la enfermedad ya se declaró.' },
        { t: 'El sistema inmune solo se activa cuando ocurre una infección real y grave.' },
        { t: 'La inmunidad de rebaño perjudica a las personas que no pueden vacunarse.' },
      ],
      explanation:
        'El texto explica el mecanismo de las vacunas (entrenar la inmunidad) y su beneficio colectivo (inmunidad de rebaño). Las demás contradicen el texto.',
    }),
    q({
      id: 'lec-vacunas-2',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Según el texto, las células de memoria sirven para que…',
      choices: [
        { t: 'la respuesta ante el microbio real sea más rápida y eficaz.', ok: true },
        { t: 'el cuerpo elimine por completo cualquier vacuna aplicada.' },
        { t: 'la persona nunca vuelva a producir defensas nuevas.' },
        { t: 'el microbio inofensivo se vuelva peligroso con el tiempo.' },
      ],
      explanation:
        'Las células de memoria permiten una respuesta rápida y contundente si el microbio verdadero ingresa más adelante.',
    }),
    q({
      id: 'lec-vacunas-3',
      topic: 'vocabulario_en_contexto',
      difficulty: 2,
      stem: 'La "inmunidad de rebaño" descrita en el texto significa que…',
      choices: [
        { t: 'al haber muchos vacunados, el microbio se propaga con dificultad.', ok: true },
        { t: 'los animales de rebaño transmiten inmunidad a las personas.' },
        { t: 'solo se inmunizan las personas que viven en grupo.' },
        { t: 'la vacuna deja de ser necesaria para toda la población.' },
      ],
      explanation:
        'Cuando gran parte de la población está vacunada, el microbio halla pocas personas susceptibles y circula con dificultad, protegiendo también a los no vacunados.',
    }),
    q({
      id: 'lec-vacunas-4',
      topic: 'inferencia',
      difficulty: 1,
      stem: 'Con la última oración, el autor destaca que vacunarse es…',
      choices: [
        { t: 'además de personal, un acto que cuida a los demás.', ok: true },
        { t: 'una obligación impuesta sin ningún beneficio real.' },
        { t: 'una decisión que solo afecta a quien se vacuna.' },
        { t: 'un riesgo que conviene evitar siempre que se pueda.' },
      ],
      explanation:
        'El cierre subraya que vacunarse no es solo individual: también protege a la comunidad.',
    }),
  ],
};

const ejercicio: ReadingPassage = {
  id: 'lec-ejercicio',
  title: 'Los beneficios del ejercicio físico',
  genre: 'expositivo',
  intro: 'Leé el texto y respondé las preguntas de comprensión.',
  text: `La actividad física regular es una de las herramientas más eficaces para cuidar la salud, y sus beneficios van mucho más allá de la estética.

A nivel cardiovascular, el ejercicio fortalece el corazón, mejora la circulación y ayuda a mantener la presión arterial en valores adecuados. En el metabolismo, favorece el uso de la glucosa y contribuye a controlar el peso corporal. Incluso el sistema nervioso se beneficia: la actividad física libera sustancias que mejoran el ánimo y reducen el estrés.

No hace falta convertirse en atleta para obtener estas ventajas. Diversos organismos de salud recomiendan acumular al menos ciento cincuenta minutos semanales de actividad moderada, como caminar a paso ligero. La clave, señalan, es la constancia: un esfuerzo sostenido en el tiempo rinde más que sesiones intensas pero aisladas.`,
  items: [
    q({
      id: 'lec-ejercicio-1',
      topic: 'idea_principal',
      difficulty: 1,
      stem: '¿Cuál es la idea principal del texto?',
      choices: [
        { t: 'El ejercicio regular beneficia la salud en varios sistemas del cuerpo.', ok: true },
        { t: 'El ejercicio sirve únicamente para mejorar la apariencia física.' },
        { t: 'Solo los atletas obtienen beneficios de la actividad física.' },
        { t: 'Las sesiones intensas y aisladas son mejores que la constancia.' },
      ],
      explanation:
        'El texto detalla beneficios cardiovasculares, metabólicos y nerviosos; las otras opciones reducen o contradicen ese mensaje.',
    }),
    q({
      id: 'lec-ejercicio-2',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Según el texto, a nivel cardiovascular el ejercicio…',
      choices: [
        { t: 'fortalece el corazón y ayuda a regular la presión arterial.', ok: true },
        { t: 'aumenta la presión arterial hasta niveles peligrosos.' },
        { t: 'debilita el corazón por el esfuerzo repetido.' },
        { t: 'no produce ningún cambio en la circulación.' },
      ],
      explanation:
        'El segundo párrafo indica que el ejercicio fortalece el corazón, mejora la circulación y ayuda a mantener la presión en valores adecuados.',
    }),
    q({
      id: 'lec-ejercicio-3',
      topic: 'inferencia',
      difficulty: 2,
      stem: 'Cuando el texto afirma que "la clave es la constancia", se puede inferir que…',
      choices: [
        { t: 'conviene ejercitarse de forma sostenida antes que esporádica.', ok: true },
        { t: 'basta con una única sesión muy intensa por mes.' },
        { t: 'el ejercicio pierde todo efecto si se repite seguido.' },
        { t: 'solo importa la intensidad y no la frecuencia.' },
      ],
      explanation:
        'El texto valora el esfuerzo sostenido por encima de las sesiones intensas pero aisladas.',
    }),
    q({
      id: 'lec-ejercicio-4',
      topic: 'secuencia_textual',
      difficulty: 1,
      stem: 'Por su propósito, el texto es predominantemente…',
      choices: [
        { t: 'expositivo, porque explica beneficios de manera objetiva.', ok: true },
        { t: 'argumentativo, porque defiende una tesis polémica.' },
        { t: 'narrativo, porque cuenta una historia personal.' },
        { t: 'instruccional, porque da una receta paso a paso.' },
      ],
      explanation:
        'El texto informa y explica beneficios del ejercicio de forma objetiva: es una secuencia expositiva.',
    }),
  ],
};

export const readingPassages: ReadingPassage[] = [
  antibioticos,
  automedicacion,
  microbiota,
  sueno,
  vacunas,
  ejercicio,
];

export const comprensionItems: Item[] = readingPassages.flatMap((p) => p.items);
