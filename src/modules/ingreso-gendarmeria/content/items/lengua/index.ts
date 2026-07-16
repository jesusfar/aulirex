import type { Item } from '../../../../../types/content';
import { mc } from '../_build';

const S = 'lengua' as const;

// Nota: la comprensión lectora vive en content/comprension. Acá van los ítems de
// normativa gramatical, ortografía y cohesión léxica.
export const items: Item[] = [
  mc({
    id: 'gna-len-gram-1',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'sujeto_y_predicado',
    difficulty: 2,
    stem: 'En la oración "Los gendarmes custodian la frontera", el sujeto es:',
    choices: [
      { t: '"Los gendarmes"', ok: true },
      { t: '"custodian la frontera"' },
      { t: '"la frontera"' },
      { t: '"custodian"' },
    ],
    explanation:
      'El sujeto es de quién se dice algo y concuerda con el verbo: "Los gendarmes". El resto es el predicado.',
  }),
  mc({
    id: 'gna-len-gram-2',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'categorias_gramaticales',
    difficulty: 2,
    stem: 'En "El soldado corrió rápidamente", la palabra "rápidamente" es un:',
    choices: [
      { t: 'adverbio', ok: true },
      { t: 'adjetivo' },
      { t: 'sustantivo' },
      { t: 'pronombre' },
    ],
    explanation:
      'Modifica al verbo "corrió" indicando modo y termina en -mente: es un adverbio.',
  }),
  mc({
    id: 'gna-len-gram-3',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'oracion_compuesta',
    difficulty: 3,
    stem: 'La oración "Estudió mucho, pero no aprobó" es compuesta por:',
    choices: [
      { t: 'coordinación (dos proposiciones unidas por "pero").', ok: true },
      { t: 'subordinación sustantiva.' },
      { t: 'subordinación adjetiva.' },
      { t: 'una única proposición unimembre.' },
    ],
    explanation:
      '"Pero" es un nexo coordinante adversativo que une dos proposiciones independientes: hay coordinación.',
  }),
  mc({
    id: 'gna-len-ort-1',
    subject: S,
    block: 'ortografia',
    topic: 'acentuacion',
    difficulty: 2,
    stem: '¿Cuál de las siguientes palabras está correctamente tildada?',
    choices: [
      { t: 'exámenes', ok: true },
      { t: 'examenes' },
      { t: 'examénes' },
      { t: 'exámene' },
    ],
    explanation:
      '"Exámenes" es esdrújula (e-xá-me-nes): todas las esdrújulas llevan tilde.',
  }),
  mc({
    id: 'gna-len-ort-2',
    subject: S,
    block: 'ortografia',
    topic: 'uso_de_letras',
    difficulty: 2,
    stem: 'Elegí la opción escrita correctamente:',
    choices: [
      { t: 'Tuvo que ir a la guardia.', ok: true },
      { t: 'Tubo que ir a la guardia.' },
      { t: 'Tuvo que hir a la guardia.' },
      { t: 'Tubo que hir a la guardia.' },
    ],
    explanation:
      '"Tuvo" viene del verbo tener (con v); "ir" no lleva h. "Tubo" es un caño.',
  }),
  mc({
    id: 'gna-len-lex-1',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'sinonimos',
    difficulty: 1,
    stem: 'Un sinónimo de "vigilar" es:',
    choices: [
      { t: 'custodiar', ok: true },
      { t: 'abandonar' },
      { t: 'ignorar' },
      { t: 'destruir' },
    ],
    explanation:
      '"Custodiar" y "vigilar" comparten significado (cuidar, controlar). Los demás son antónimos o no relacionados.',
  }),
  mc({
    id: 'gna-len-lex-2',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'antonimos',
    difficulty: 1,
    stem: 'El antónimo de "permitir" es:',
    choices: [
      { t: 'prohibir', ok: true },
      { t: 'autorizar' },
      { t: 'consentir' },
      { t: 'habilitar' },
    ],
    explanation:
      '"Prohibir" es lo opuesto a "permitir". Las otras tres son sinónimos de permitir.',
  }),
  mc({
    id: 'gna-len-lex-3',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'homonimos_y_paronimos',
    difficulty: 3,
    stem: 'Las palabras "vasto" (extenso) y "basto" (grosero) son un ejemplo de:',
    choices: [
      { t: 'homófonos (suenan igual, se escriben distinto).', ok: true },
      { t: 'sinónimos.' },
      { t: 'hipónimos.' },
      { t: 'antónimos.' },
    ],
    explanation:
      'Se pronuncian igual pero se escriben y significan distinto: son homófonos (un tipo de homónimos).',
  }),

  // ---- Normativa gramatical ----
  mc({
    id: 'gna-len-gram-4',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'tipos_oracion',
    difficulty: 2,
    stem: '¿Cuál de las siguientes es una oración unimembre?',
    choices: [
      { t: '¡Fuego!', ok: true },
      { t: 'El perro ladra.' },
      { t: 'Los aspirantes rindieron el examen.' },
      { t: 'La bandera flamea.' },
    ],
    explanation:
      'La oración unimembre no se divide en sujeto y predicado. "¡Fuego!" es unimembre; las demás son bimembres.',
  }),
  mc({
    id: 'gna-len-gram-5',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'modificadores_del_sujeto',
    difficulty: 3,
    stem: 'En "San Martín, el Libertador, cruzó los Andes", la construcción "el Libertador" es:',
    choices: [
      { t: 'una aposición.', ok: true },
      { t: 'el núcleo del predicado.' },
      { t: 'un objeto directo.' },
      { t: 'un circunstancial de lugar.' },
    ],
    explanation:
      'La aposición es una construcción entre comas que aclara o explica al núcleo del sujeto ("San Martín").',
  }),
  mc({
    id: 'gna-len-gram-6',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'subordinadas',
    difficulty: 3,
    stem: 'En "El documento que firmaron es oficial", la proposición "que firmaron" es una subordinada:',
    choices: [
      { t: 'adjetiva.', ok: true },
      { t: 'sustantiva.' },
      { t: 'adverbial de tiempo.' },
      { t: 'coordinada adversativa.' },
    ],
    explanation:
      'Encabezada por el relativo "que", modifica al sustantivo "documento" como lo haría un adjetivo: es subordinada adjetiva.',
  }),
  mc({
    id: 'gna-len-gram-7',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'predicado',
    difficulty: 2,
    stem: 'La oración "El cielo está nublado" tiene predicado:',
    choices: [
      { t: 'nominal (verbo copulativo + predicativo).', ok: true },
      { t: 'verbal con objeto directo.' },
      { t: 'unimembre.' },
      { t: 'subordinado adverbial.' },
    ],
    explanation:
      'Con verbos copulativos (ser, estar, parecer) el predicado es nominal y "nublado" funciona como predicativo del sujeto.',
  }),
  mc({
    id: 'gna-len-gram-8',
    subject: S,
    block: 'normativa_gramatical',
    topic: 'categorias_gramaticales',
    difficulty: 1,
    stem: 'En "El informe de la comisión", la palabra "de" es:',
    choices: [
      { t: 'una preposición.', ok: true },
      { t: 'un pronombre.' },
      { t: 'un adverbio.' },
      { t: 'una conjunción.' },
    ],
    explanation:
      '"De" es una preposición: relaciona palabras e introduce, en este caso, un complemento del sustantivo "informe".',
  }),

  // ---- Ortografía ----
  mc({
    id: 'gna-len-ort-3',
    subject: S,
    block: 'ortografia',
    topic: 'acentuacion',
    difficulty: 2,
    stem: '¿Cuál de estas palabras agudas lleva tilde correctamente?',
    choices: [
      { t: 'corazón', ok: true },
      { t: 'corazon' },
      { t: 'reloj (relój)' },
      { t: 'pared (paréd)' },
    ],
    explanation:
      'Las agudas llevan tilde cuando terminan en n, s o vocal: "corazón" (termina en n). "Reloj" y "pared" no llevan tilde.',
  }),
  mc({
    id: 'gna-len-ort-4',
    subject: S,
    block: 'ortografia',
    topic: 'tilde_diacritica',
    difficulty: 3,
    stem: 'Elegí la oración con el uso correcto de la tilde diacrítica:',
    choices: [
      { t: 'Quiero más café, mas no tengo tiempo.', ok: true },
      { t: 'Quiero mas café, más no tengo tiempo.' },
      { t: 'Quiero mas café, mas no tengo tiempo.' },
      { t: 'Quiero más café, más no tengo tiempo.' },
    ],
    explanation:
      '"Más" (cantidad/adverbio) lleva tilde; "mas" (equivale a "pero") no la lleva.',
  }),
  mc({
    id: 'gna-len-ort-5',
    subject: S,
    block: 'ortografia',
    topic: 'uso_de_letras',
    difficulty: 3,
    stem: 'Elegí la forma correcta: "Espero que no ____ problemas".',
    choices: [
      { t: 'haya', ok: true },
      { t: 'halla' },
      { t: 'aya' },
      { t: 'allá' },
    ],
    explanation:
      '"Haya" es del verbo haber. "Halla" es de hallar (encontrar) y "allá" indica lugar.',
  }),
  mc({
    id: 'gna-len-ort-6',
    subject: S,
    block: 'ortografia',
    topic: 'mayusculas',
    difficulty: 2,
    stem: '¿Cuál de las siguientes oraciones respeta el uso de mayúsculas?',
    choices: [
      { t: 'Los ciudadanos argentinos votan en octubre.', ok: true },
      { t: 'Los ciudadanos Argentinos votan en Octubre.' },
      { t: 'Los ciudadanos argentinos votan en Octubre.' },
      { t: 'Los Ciudadanos Argentinos votan en octubre.' },
    ],
    explanation:
      'Los gentilicios ("argentinos") y los meses ("octubre") se escriben con minúscula inicial en español.',
  }),
  mc({
    id: 'gna-len-ort-7',
    subject: S,
    block: 'ortografia',
    topic: 'puntuacion',
    difficulty: 2,
    stem: '¿Cuál oración usa correctamente la coma?',
    choices: [
      { t: 'Gendarme, presente su documentación.', ok: true },
      { t: 'Gendarme presente, su documentación.' },
      { t: 'Gendarme presente su, documentación.' },
      { t: 'Gendarme, presente, su documentación.' },
    ],
    explanation:
      'El vocativo (a quien se dirige el mensaje) se separa con coma: "Gendarme, presente su documentación".',
  }),

  // ---- Cohesión léxica ----
  mc({
    id: 'gna-len-lex-4',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'hiponimos_e_hiperonimos',
    difficulty: 3,
    stem: 'En la relación entre "flor" y "rosa", la palabra "rosa" es:',
    choices: [
      { t: 'un hipónimo de "flor".', ok: true },
      { t: 'un hiperónimo de "flor".' },
      { t: 'un sinónimo de "flor".' },
      { t: 'un antónimo de "flor".' },
    ],
    explanation:
      '"Rosa" es un tipo de "flor": es hipónimo. "Flor" es el término más general, el hiperónimo.',
  }),
  mc({
    id: 'gna-len-lex-5',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'homonimos_y_paronimos',
    difficulty: 3,
    stem: 'Las palabras "aptitud" (capacidad) y "actitud" (disposición) son:',
    choices: [
      { t: 'parónimos (se parecen pero no son iguales).', ok: true },
      { t: 'sinónimos exactos.' },
      { t: 'homófonos (suenan igual).' },
      { t: 'antónimos.' },
    ],
    explanation:
      'Son parónimos: se escriben y suenan de forma parecida pero tienen significados distintos.',
  }),
  mc({
    id: 'gna-len-lex-6',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'sinonimos',
    difficulty: 1,
    stem: 'Un sinónimo de "veloz" es:',
    choices: [
      { t: 'rápido', ok: true },
      { t: 'lento' },
      { t: 'pesado' },
      { t: 'quieto' },
    ],
    explanation:
      '"Veloz" y "rápido" comparten significado. "Lento" y "quieto" son antónimos.',
  }),
  mc({
    id: 'gna-len-lex-7',
    subject: S,
    block: 'cohesion_lexica',
    topic: 'antonimos',
    difficulty: 2,
    stem: 'El antónimo de "ascender" es:',
    choices: [
      { t: 'descender', ok: true },
      { t: 'subir' },
      { t: 'elevar' },
      { t: 'trepar' },
    ],
    explanation:
      '"Descender" es lo opuesto a "ascender". Las otras tres opciones son sinónimos de ascender.',
  }),

  // ======== Tanda 2: Normativa gramatical ========
  mc({
    id: 'gna-len-gram-9', subject: S, block: 'normativa_gramatical', topic: 'objeto_directo', difficulty: 2,
    stem: 'En "El sargento leyó el informe", el objeto directo es:',
    choices: [{ t: '"el informe"', ok: true }, { t: '"El sargento"' }, { t: '"leyó"' }, { t: '"leyó el informe"' }],
    explanation: 'El objeto directo recibe la acción del verbo y responde "¿qué?": leyó ¿qué? → "el informe". Se reemplaza por "lo": lo leyó.',
  }),
  mc({
    id: 'gna-len-gram-10', subject: S, block: 'normativa_gramatical', topic: 'objeto_indirecto', difficulty: 3,
    stem: 'En "Entregó el arma al oficial", el objeto indirecto es:',
    choices: [{ t: '"al oficial"', ok: true }, { t: '"el arma"' }, { t: '"Entregó"' }, { t: '"Entregó el arma"' }],
    explanation: 'El objeto indirecto responde "¿a quién?": entregó ¿a quién? → "al oficial". Se reemplaza por "le".',
  }),
  mc({
    id: 'gna-len-gram-11', subject: S, block: 'normativa_gramatical', topic: 'circunstanciales', difficulty: 2,
    stem: 'En "Los reclutas entrenan en el campo", la expresión "en el campo" es un circunstancial de:',
    choices: [{ t: 'lugar', ok: true }, { t: 'tiempo' }, { t: 'modo' }, { t: 'cantidad' }],
    explanation: 'Indica dónde ocurre la acción, respondiendo "¿dónde?": es un circunstancial de lugar.',
  }),
  mc({
    id: 'gna-len-gram-12', subject: S, block: 'normativa_gramatical', topic: 'nucleo_del_sujeto', difficulty: 2,
    stem: 'En "Los viejos soldados descansaban", el núcleo del sujeto es:',
    choices: [{ t: '"soldados"', ok: true }, { t: '"viejos"' }, { t: '"Los"' }, { t: '"descansaban"' }],
    explanation: 'El núcleo del sujeto es el sustantivo principal: "soldados". "Los" y "viejos" son modificadores.',
  }),
  mc({
    id: 'gna-len-gram-13', subject: S, block: 'normativa_gramatical', topic: 'clases_de_palabras', difficulty: 1,
    stem: 'En "Buenos Aires es la capital", "Buenos Aires" es un sustantivo:',
    choices: [{ t: 'propio', ok: true }, { t: 'común' }, { t: 'abstracto' }, { t: 'colectivo' }],
    explanation: 'Nombra a un lugar particular y se escribe con mayúscula: es un sustantivo propio.',
  }),
  mc({
    id: 'gna-len-gram-14', subject: S, block: 'normativa_gramatical', topic: 'clases_de_palabras', difficulty: 2,
    stem: 'En "Ellos cumplieron la orden", la palabra "Ellos" es un:',
    choices: [{ t: 'pronombre personal', ok: true }, { t: 'sustantivo' }, { t: 'adjetivo' }, { t: 'adverbio' }],
    explanation: '"Ellos" reemplaza a un sustantivo y señala a la 3.ª persona del plural: es un pronombre personal.',
  }),
  mc({
    id: 'gna-len-gram-15', subject: S, block: 'normativa_gramatical', topic: 'clases_de_palabras', difficulty: 2,
    stem: '¿Cuál de las siguientes palabras es una conjunción?',
    choices: [{ t: 'aunque', ok: true }, { t: 'rápido' }, { t: 'mesa' }, { t: 'correr' }],
    explanation: '"Aunque" une proposiciones (conjunción subordinante concesiva). Las demás son adjetivo/adverbio, sustantivo y verbo.',
  }),
  mc({
    id: 'gna-len-gram-16', subject: S, block: 'normativa_gramatical', topic: 'oracion_compuesta', difficulty: 3,
    stem: 'En "Quiero que estudies", la proposición "que estudies" es una subordinada:',
    choices: [{ t: 'sustantiva (objeto directo)', ok: true }, { t: 'adjetiva' }, { t: 'adverbial de lugar' }, { t: 'coordinada copulativa' }],
    explanation: 'Cumple la función de objeto directo (quiero ¿qué? → "que estudies"): es subordinada sustantiva.',
  }),
  mc({
    id: 'gna-len-gram-17', subject: S, block: 'normativa_gramatical', topic: 'oracion_compuesta', difficulty: 3,
    stem: 'En "Cuando suene la alarma, saldremos", la proposición "Cuando suene la alarma" es subordinada adverbial de:',
    choices: [{ t: 'tiempo', ok: true }, { t: 'modo' }, { t: 'causa' }, { t: 'lugar' }],
    explanation: 'Introducida por "cuando", indica el momento de la acción: subordinada adverbial de tiempo.',
  }),
  mc({
    id: 'gna-len-gram-18', subject: S, block: 'normativa_gramatical', topic: 'coordinacion', difficulty: 2,
    stem: 'En "No estudió ni practicó", las proposiciones están unidas por coordinación:',
    choices: [{ t: 'copulativa (negativa)', ok: true }, { t: 'adversativa' }, { t: 'disyuntiva' }, { t: 'consecutiva' }],
    explanation: '"Ni" es un nexo copulativo negativo: suma dos proposiciones en forma negativa.',
  }),
  mc({
    id: 'gna-len-gram-19', subject: S, block: 'normativa_gramatical', topic: 'conjugacion_verbal', difficulty: 2,
    stem: 'La forma verbal "¡Formen filas!" está en modo:',
    choices: [{ t: 'imperativo', ok: true }, { t: 'indicativo' }, { t: 'subjuntivo' }, { t: 'condicional' }],
    explanation: 'Expresa una orden o mandato: es el modo imperativo.',
  }),
  mc({
    id: 'gna-len-gram-20', subject: S, block: 'normativa_gramatical', topic: 'conjugacion_verbal', difficulty: 2,
    stem: 'El verbo "corrió" está conjugado en:',
    choices: [{ t: 'pretérito perfecto simple del indicativo', ok: true }, { t: 'presente del indicativo' }, { t: 'futuro del indicativo' }, { t: 'presente del subjuntivo' }],
    explanation: 'Indica una acción pasada y terminada: pretérito perfecto simple (o pretérito) del modo indicativo.',
  }),
  mc({
    id: 'gna-len-gram-21', subject: S, block: 'normativa_gramatical', topic: 'voz_verbal', difficulty: 3,
    stem: 'La oración "El delincuente fue detenido por la patrulla" está en voz:',
    choices: [{ t: 'pasiva', ok: true }, { t: 'activa' }, { t: 'reflexiva' }, { t: 'impersonal' }],
    explanation: 'El sujeto ("El delincuente") recibe la acción; el agente va con "por". Es voz pasiva.',
  }),
  mc({
    id: 'gna-len-gram-22', subject: S, block: 'normativa_gramatical', topic: 'concordancia', difficulty: 2,
    stem: '¿Cuál oración respeta la concordancia entre sujeto y verbo?',
    choices: [{ t: 'La mayoría de los aspirantes aprobó el examen.', ok: true }, { t: 'Los aspirante aprobaron el examen.' }, { t: 'La aspirante aprobaron el examen.' }, { t: 'Los aspirantes aprobó el examen.' }],
    explanation: 'El verbo concuerda con el núcleo del sujeto en número y persona. "La mayoría… aprobó" es correcto.',
  }),

  // ======== Tanda 2: Ortografía ========
  mc({
    id: 'gna-len-ort-8', subject: S, block: 'ortografia', topic: 'acentuacion', difficulty: 3,
    stem: 'La palabra "árbol" lleva tilde porque es:',
    choices: [{ t: 'grave y no termina en n, s ni vocal.', ok: true }, { t: 'aguda terminada en vocal.' }, { t: 'esdrújula.' }, { t: 'monosílaba.' }],
    explanation: 'Las palabras graves (o llanas) llevan tilde cuando NO terminan en n, s o vocal. "Árbol" termina en "l".',
  }),
  mc({
    id: 'gna-len-ort-9', subject: S, block: 'ortografia', topic: 'acentuacion', difficulty: 3,
    stem: 'La palabra "día" lleva tilde porque:',
    choices: [{ t: 'hay un hiato: la vocal cerrada tónica se tilda.', ok: true }, { t: 'es esdrújula.' }, { t: 'es aguda terminada en consonante.' }, { t: 'es un monosílabo.' }],
    explanation: 'En "dí-a" hay hiato; la "í" cerrada tónica lleva tilde para romper el diptongo (regla del hiato).',
  }),
  mc({
    id: 'gna-len-ort-10', subject: S, block: 'ortografia', topic: 'uso_de_letras', difficulty: 2,
    stem: 'Según la regla, después de "m" siempre se escribe:',
    choices: [{ t: 'b (por ejemplo, "cambio", "hombre").', ok: true }, { t: 'v (por ejemplo, "camvio").' }, { t: 'indistintamente b o v.' }, { t: 'ninguna consonante.' }],
    explanation: 'Regla ortográfica: después de "m" va "b" (cambio, hombre); después de "n" va "v" (invierno).',
  }),
  mc({
    id: 'gna-len-ort-11', subject: S, block: 'ortografia', topic: 'uso_de_letras', difficulty: 2,
    stem: 'Elegí la palabra escrita correctamente:',
    choices: [{ t: 'invierno', ok: true }, { t: 'imvierno' }, { t: 'inbierno' }, { t: 'imbierno' }],
    explanation: 'Después de "n" se escribe "v": "invierno". Después de "m" iría "b".',
  }),
  mc({
    id: 'gna-len-ort-12', subject: S, block: 'ortografia', topic: 'uso_de_letras', difficulty: 3,
    stem: '¿Cuál de estas palabras se escribe con "j"?',
    choices: [{ t: 'jirafa', ok: true }, { t: 'girafa' }, { t: 'jente' }, { t: 'jeneral' }],
    explanation: '"Jirafa" va con j. En cambio "gente" y "general" van con g (aunque suenen parecido ante e/i).',
  }),
  mc({
    id: 'gna-len-ort-13', subject: S, block: 'ortografia', topic: 'uso_de_letras', difficulty: 2,
    stem: 'El plural de "luz" es:',
    choices: [{ t: 'luces', ok: true }, { t: 'luzes' }, { t: 'luses' }, { t: 'lus' }],
    explanation: 'Las palabras terminadas en "z" cambian la z por c ante e: luz → luces.',
  }),
  mc({
    id: 'gna-len-ort-14', subject: S, block: 'ortografia', topic: 'uso_de_letras', difficulty: 2,
    stem: 'Elegí la forma correcta:',
    choices: [{ t: 'hueso', ok: true }, { t: 'ueso' }, { t: 'hgueso' }, { t: 'weso' }],
    explanation: 'Las palabras que empiezan con el diptongo "ue" llevan h: hueso, huevo, hueco.',
  }),
  mc({
    id: 'gna-len-ort-15', subject: S, block: 'ortografia', topic: 'homofonos', difficulty: 3,
    stem: 'Elegí la opción correcta: "Vamos ____ qué sucede".',
    choices: [{ t: 'a ver', ok: true }, { t: 'haber' }, { t: 'a haber' }, { t: 'aver' }],
    explanation: '"A ver" (preposición + verbo ver) se usa para mirar/averiguar. "Haber" es el verbo (auxiliar o impersonal).',
  }),
  mc({
    id: 'gna-len-ort-16', subject: S, block: 'ortografia', topic: 'puntuacion', difficulty: 2,
    stem: 'En español, los signos de interrogación se colocan:',
    choices: [{ t: 'al principio (¿) y al final (?) de la pregunta.', ok: true }, { t: 'solo al final de la pregunta.' }, { t: 'solo al principio de la pregunta.' }, { t: 'de manera optativa.' }],
    explanation: 'El español exige signos de apertura y de cierre: "¿Cómo estás?".',
  }),
  mc({
    id: 'gna-len-ort-17', subject: S, block: 'ortografia', topic: 'puntuacion', difficulty: 3,
    stem: '¿Qué signo separa dos oraciones estrechamente relacionadas sin llegar al punto?',
    choices: [{ t: 'el punto y coma (;)', ok: true }, { t: 'la coma (,)' }, { t: 'los dos puntos (:)' }, { t: 'el guion (-)' }],
    explanation: 'El punto y coma marca una pausa mayor que la coma y menor que el punto, entre ideas vinculadas.',
  }),
  mc({
    id: 'gna-len-ort-18', subject: S, block: 'ortografia', topic: 'acentuacion', difficulty: 2,
    stem: '¿Cuál palabra es esdrújula (y por lo tanto lleva tilde)?',
    choices: [{ t: 'brújula', ok: true }, { t: 'camion' }, { t: 'pared' }, { t: 'reloj' }],
    explanation: 'En "brú-ju-la" el acento cae en la antepenúltima sílaba: es esdrújula y todas llevan tilde.',
  }),

  // ======== Tanda 2: Cohesión léxica ========
  mc({
    id: 'gna-len-lex-8', subject: S, block: 'cohesion_lexica', topic: 'sinonimos', difficulty: 2,
    stem: 'Un sinónimo de "valiente" es:',
    choices: [{ t: 'audaz', ok: true }, { t: 'cobarde' }, { t: 'temeroso' }, { t: 'débil' }],
    explanation: '"Audaz" comparte significado con "valiente". Las otras opciones son antónimos.',
  }),
  mc({
    id: 'gna-len-lex-9', subject: S, block: 'cohesion_lexica', topic: 'antonimos', difficulty: 2,
    stem: 'El antónimo de "legal" es:',
    choices: [{ t: 'ilegal', ok: true }, { t: 'lícito' }, { t: 'permitido' }, { t: 'autorizado' }],
    explanation: '"Ilegal" es lo opuesto a "legal"; las demás son sinónimos.',
  }),
  mc({
    id: 'gna-len-lex-10', subject: S, block: 'cohesion_lexica', topic: 'homonimos_y_paronimos', difficulty: 3,
    stem: 'La palabra "banco" puede significar "asiento" o "entidad financiera". Este fenómeno se llama:',
    choices: [{ t: 'homonimia (una forma, varios significados).', ok: true }, { t: 'sinonimia.' }, { t: 'antonimia.' }, { t: 'hiperonimia.' }],
    explanation: 'Una misma palabra con significados distintos es un caso de homonimia (o polisemia).',
  }),
  mc({
    id: 'gna-len-lex-11', subject: S, block: 'cohesion_lexica', topic: 'homonimos_y_paronimos', difficulty: 3,
    stem: 'Los verbos "infligir" (causar un daño) e "infringir" (violar una norma) son:',
    choices: [{ t: 'parónimos.', ok: true }, { t: 'sinónimos.' }, { t: 'antónimos.' }, { t: 'homógrafos.' }],
    explanation: 'Se parecen en forma y sonido pero significan cosas distintas: son parónimos.',
  }),
  mc({
    id: 'gna-len-lex-12', subject: S, block: 'cohesion_lexica', topic: 'hiponimos_e_hiperonimos', difficulty: 2,
    stem: '¿Cuál palabra funciona como hiperónimo de las demás?',
    choices: [{ t: 'vehículo', ok: true }, { t: 'auto' }, { t: 'moto' }, { t: 'camión' }],
    explanation: '"Vehículo" es el término general que incluye a auto, moto y camión (sus hipónimos).',
  }),
  mc({
    id: 'gna-len-lex-13', subject: S, block: 'cohesion_lexica', topic: 'campo_semantico', difficulty: 2,
    stem: '¿Cuál palabra NO pertenece al mismo campo semántico que las otras?',
    choices: [{ t: 'martillo', ok: true }, { t: 'fusil' }, { t: 'pistola' }, { t: 'escopeta' }],
    explanation: '"Fusil", "pistola" y "escopeta" son armas de fuego; "martillo" es una herramienta: queda fuera del campo.',
  }),
  mc({
    id: 'gna-len-lex-14', subject: S, block: 'cohesion_lexica', topic: 'denotacion_connotacion', difficulty: 3,
    stem: 'La frase "tiene un corazón de oro" usa el lenguaje en sentido:',
    choices: [{ t: 'connotativo (figurado).', ok: true }, { t: 'denotativo (literal).' }, { t: 'técnico.' }, { t: 'numérico.' }],
    explanation: 'No significa que el corazón sea de oro; expresa bondad. Es un uso connotativo o figurado del lenguaje.',
  }),
  mc({
    id: 'gna-len-lex-15', subject: S, block: 'cohesion_lexica', topic: 'sinonimos', difficulty: 1,
    stem: 'Un sinónimo de "iniciar" es:',
    choices: [{ t: 'comenzar', ok: true }, { t: 'terminar' }, { t: 'finalizar' }, { t: 'concluir' }],
    explanation: '"Comenzar" es sinónimo de "iniciar"; las demás son antónimos.',
  }),
];
