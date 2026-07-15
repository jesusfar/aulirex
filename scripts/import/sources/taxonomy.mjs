// Clasificador de preguntas por CONTENIDO contra la taxonomía real del banco.
// Fuentes sin encabezados de sección limpios (Cajal, exámenes combinados) no
// permiten derivar el tema del layout; aquí se infiere subject/block/topic a
// partir de palabras clave del enunciado. Se reutiliza en TODAS las fuentes.
//
// Los slugs de topic coinciden con los ya presentes en bank-meta.json para no
// fragmentar la taxonomía. Lo que no matchea cae en `sin_clasificar` → queda
// para revisión manual (staging), nunca se importa con un tema inventado.

// Reglas: [regex, subject, block, topic]. Orden = prioridad (más específico primero).
const RULES = [
  // ---- BIOLOGÍA ----
  [/bioelement|ser(es)? vivo|caracter[ií]stica.*vida|niveles de organizaci/i, 'biologia', 'seres_vivos_y_bioelementos', 'seres_vivos_y_bioelementos'],
  [/membrana plasm|transporte.*membrana|osmosis|[oó]smosis|difusi[oó]n|bomba sodio/i, 'biologia', 'biologia_celular', 'membrana_plasmatica'],
  [/mitocondri|cloroplast|ribosom|ret[ií]culo|golgi|lisosom|organela|citoesqueleto|citosol/i, 'biologia', 'biologia_celular', 'organelas'],
  [/n[uú]cleo celular|cromatina|cromosoma|nucleol/i, 'biologia', 'biologia_celular', 'nucleo_celular'],
  [/mitosis|meiosis|ciclo celular|interfase|profase|metafase|anafase|telofase/i, 'biologia', 'genetica', 'ciclo_celular_mitosis_meiosis'],
  [/mendel|herencia|alelo|genotipo|fenotipo|dominante|recesivo|cruzamiento|dihibrid/i, 'biologia', 'genetica', 'herencia_leyes_de_mendel'],
  [/mutaci[oó]n|gen[eé]tica|adn|arn|transcripci|traducci|dogma|c[oó]digo gen/i, 'biologia', 'genetica', 'genetica_mutaciones'],
  [/evoluci[oó]n|selecci[oó]n natural|darwin|especiaci/i, 'biologia', 'evolucion', 'evolucion'],
  [/ecolog[ií]a|ecosistema|cadena tr[oó]fica|poblaci[oó]n|bioma/i, 'biologia', 'ecologia', 'ecologia'],
  [/nutrici[oó]n|digesti[oó]n|respirat|circulat|excreci[oó]n|nefr[oó]n/i, 'biologia', 'fisiologia', 'sistemas_de_la_nutricion'],
  [/sistema nervioso|neurona|hormona|endocrin|reflejo/i, 'biologia', 'fisiologia', 'sistemas_de_la_relacion'],

  // ---- QUÍMICA ----
  [/estado.*agregaci[oó]n|s[oó]lido.*l[ií]quido.*gas|sublimaci|volatilizaci|sistema material|sustancia pura|mezcla|heterog[eé]ne|homog[eé]ne|fase/i, 'quimica', 'materia', 'conceptos_basicos_y_sistemas_materiales'],
  [/n[uú]mero at[oó]mico|n[uú]mero m[aá]sico|is[oó]topo|configuraci[oó]n electr[oó]nica|nivel de energ[ií]a|orbital|teor[ií]a at[oó]mica|modelo at[oó]mico/i, 'quimica', 'estructura', 'teoria_atomica'],
  [/tabla peri[oó]dica|grupo.*per[ií]odo|electronegativ|energ[ií]a de ionizaci|metal.*no metal/i, 'quimica', 'estructura', 'tabla_periodica'],
  [/enlace (i[oó]nico|covalente|met[aá]lico)|enlace qu[ií]mico|geometr[ií]a molecular|polarid/i, 'quimica', 'estructura', 'enlace_quimico'],
  [/estequiometr|mol(es)?\b|masa molar|reactivo limitante|rendimiento|n[uú]mero de avogadro|uma\b|masa at[oó]mica/i, 'quimica', 'reacciones', 'estequiometria'],
  [/[aá]cido.*base|ph\b|p[oó]h|buffer|neutralizaci|hidr[oó]xido|arrhenius|br[oø]nsted/i, 'quimica', 'reacciones', 'acido_base'],
  [/redox|oxidaci[oó]n|reducci[oó]n|n[uú]mero de oxidaci|agente oxidante|pila|electrol/i, 'quimica', 'reacciones', 'redox'],
  [/soluci[oó]n|molarid|molalid|concentraci[oó]n|soluto|solvente|diluci[oó]n|% m\/m/i, 'quimica', 'soluciones', 'soluciones'],
  [/coligativ|presi[oó]n de vapor|ebulloscop|crioscop|[oó]smosis.*soluci/i, 'quimica', 'soluciones', 'propiedades_coligativas'],
  [/equilibrio qu[ií]mico|constante de equilibrio|le chatelier|kc\b|kp\b/i, 'quimica', 'equilibrio', 'equilibrio_quimico'],
  [/hidrocarburo|alcano|alqueno|alquino|alcohol|[aá]cido carbox|hidroxilo|grupo funcional|is[oó]mero|org[aá]nic|benceno|amina|[eé]ster|cetona|aldeh[ií]do/i, 'quimica', 'organica', 'quimica_organica'],
  [/ley de.*proust|ley de.*dalton|ley de.*lavoisier|ley de la conservaci/i, 'quimica', 'leyes', 'leyes_de_la_quimica'],

  // ---- FÍSICA / MATEMÁTICA (matemática vive dentro de física en el banco actual) ----
  [/pasaje de unidad|notaci[oó]n cient[ií]fica|conversi[oó]n de unidad|sistema (internacional|m[eé]trico)/i, 'fisica', 'herramientas', 'pasaje_de_unidades'],
  [/logaritm/i, 'fisica', 'herramientas', 'logaritmacion'],
  [/funci[oó]n lineal|recta|pendiente|ordenada al origen|perpendicular.*recta|colineal/i, 'fisica', 'funciones', 'funcion_lineal'],
  [/par[aá]bola|cuadr[aá]tica|funci[oó]n.*no lineal|exponencial|logar[ií]tmica.*funci/i, 'fisica', 'funciones', 'funciones_no_lineales_y_repaso'],
  [/ecuaci[oó]n|despej|inc[oó]gnita|planteo/i, 'fisica', 'funciones', 'ecuaciones'],
  [/vector|magnitud (escalar|vectorial)|componente.*vector|m[oó]dulo.*direcci/i, 'fisica', 'magnitudes', 'magnitudes_fisicas_y_vectores'],
  [/est[aá]tica|equilibrio de fuerza|momento de una fuerza|torque|palanca/i, 'fisica', 'mecanica', 'estatica'],
  [/cinem[aá]tica|velocidad|aceleraci[oó]n|mru|mruv|ca[ií]da libre|tiro/i, 'fisica', 'mecanica', 'cinematica'],
  [/din[aá]mica|newton|fuerza|masa.*aceleraci|rozamiento|fricci/i, 'fisica', 'mecanica', 'dinamica'],
  [/trabajo|energ[ií]a (cin[eé]tica|potencial|mec[aá]nica)|potencia|conservaci[oó]n de.*energ/i, 'fisica', 'mecanica', 'trabajo_y_energia'],
  [/hidrost[aá]tica|presi[oó]n.*fluido|empuje|arqu[ií]medes|densidad.*fluido/i, 'fisica', 'fluidos', 'hidrostatica'],
  [/hidrodin[aá]mica|caudal|bernoulli|viscosid/i, 'fisica', 'fluidos', 'hidrodinamica'],
  [/gas ideal|ley de.*(boyle|charles|gay)|ecuaci[oó]n de estado.*gas/i, 'fisica', 'fluidos', 'gases'],
  [/electrost[aá]tica|carga el[eé]ctrica|coulomb|campo el[eé]ctrico/i, 'fisica', 'electricidad', 'electrostatica'],
  [/electrodin[aá]mica|corriente el[eé]ctrica|ohm|resistencia|circuito|voltaje|amperaje/i, 'fisica', 'electricidad', 'electrodinamica'],
];

/**
 * Clasifica un texto (enunciado + opciones) contra la taxonomía.
 * @param {string} text
 * @param {string} [subjectHint] materia sugerida por la fuente si no hay match.
 * @returns {{subject:string, block:string, topic:string, matched:boolean}}
 */
export function classifyByText(text, subjectHint) {
  const t = (text || '').toString();
  for (const [re, subject, block, topic] of RULES) {
    if (re.test(t)) return { subject, block, topic, matched: true };
  }
  return {
    subject: subjectHint && subjectHint !== 'mixto' ? subjectHint : 'sin_clasificar',
    block: 'sin_clasificar',
    topic: 'sin_clasificar',
    matched: false,
  };
}
