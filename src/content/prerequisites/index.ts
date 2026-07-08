import type { Subject, TopicNode } from '../../types/content';

// Grafo de prerrequisitos (DAG) entre temas del banco. Marca qué conviene
// dominar antes de otra cosa: no tiene sentido pelear con Dinámica si todavía
// fallás Cinemática. Los slugs coinciden con `item.topic` (== block en el banco).
// Es conocimiento pedagógico, no un dato del PDF; se ajusta a mano.

const bio: TopicNode[] = [
  n('seres_vivos_y_bioelementos', 'biologia', 'alta', []),
  n('protoplasma', 'biologia', 'media', ['seres_vivos_y_bioelementos']),
  n('difusion_osmosis_ph_teorias_biologicas', 'biologia', 'alta', ['protoplasma']),
  n('membrana_plasmatica', 'biologia', 'alta', ['protoplasma']),
  n('citosol_citoesqueleto', 'biologia', 'media', ['membrana_plasmatica']),
  n('inclusiones', 'biologia', 'baja', ['citosol_citoesqueleto']),
  n('sistema_de_endomembranas', 'biologia', 'media', ['membrana_plasmatica']),
  n('mitocondria', 'biologia', 'alta', ['sistema_de_endomembranas']),
  n('microcuerpos_cloroplastos_y_ribosomas', 'biologia', 'media', ['mitocondria']),
  n('nucleo_celular', 'biologia', 'alta', ['membrana_plasmatica']),
  n('ciclo_celular_mitosis_meiosis', 'biologia', 'alta', ['nucleo_celular']),
  n('genetica_mutaciones', 'biologia', 'alta', ['ciclo_celular_mitosis_meiosis']),
  n('herencia_leyes_de_mendel_problemas', 'biologia', 'alta', ['genetica_mutaciones']),
  n('evolucion_repaso', 'biologia', 'media', ['herencia_leyes_de_mendel_problemas']),
  n('ecologia', 'biologia', 'baja', ['seres_vivos_y_bioelementos']),
  n('sistemas_de_la_nutricion', 'biologia', 'media', ['difusion_osmosis_ph_teorias_biologicas']),
  n('sistemas_de_la_relacion', 'biologia', 'media', ['sistemas_de_la_nutricion']),
  // Histología (temario UNSa Unidad 4)
  n('histologia', 'biologia', 'media', ['membrana_plasmatica']),
];

const fis: TopicNode[] = [
  n('pasaje_de_unidades', 'fisica', 'alta', []),
  n('logaritmacion', 'fisica', 'baja', []),
  n('ecuaciones', 'fisica', 'alta', ['pasaje_de_unidades']),
  n('planteo_de_ecuaciones', 'fisica', 'alta', ['ecuaciones']),
  n('funcion_lineal', 'fisica', 'media', ['ecuaciones']),
  n('funciones_no_lineales_y_repaso', 'fisica', 'media', ['funcion_lineal']),
  n('magnitudes_fisicas_y_vectores', 'fisica', 'alta', ['pasaje_de_unidades']),
  n('estatica', 'fisica', 'media', ['magnitudes_fisicas_y_vectores']),
  n('cinematica', 'fisica', 'alta', ['magnitudes_fisicas_y_vectores', 'planteo_de_ecuaciones']),
  n('dinamica', 'fisica', 'alta', ['cinematica', 'estatica']),
  n('trabajo_y_energia', 'fisica', 'alta', ['dinamica']),
  n('hidrostatica', 'fisica', 'media', ['dinamica']),
  n('hidrodinamica', 'fisica', 'media', ['hidrostatica']),
  n('gases', 'fisica', 'media', ['hidrostatica']),
  n('electrostatica', 'fisica', 'media', ['magnitudes_fisicas_y_vectores']),
  n('electrodinamica', 'fisica', 'alta', ['electrostatica']),
  // Biofísica UNSa (temas nuevos)
  n('biofisica_fluidos', 'fisica', 'media', ['hidrostatica']),
  n('ondas', 'fisica', 'media', ['magnitudes_fisicas_y_vectores']),
  n('optica', 'fisica', 'media', ['ondas']),
  n('magnetismo', 'fisica', 'baja', ['electrodinamica']),
];

const qui: TopicNode[] = [
  n('conceptos_basicos_y_sistemas_materiales', 'quimica', 'alta', []),
  n('leyes_de_la_quimica', 'quimica', 'media', ['conceptos_basicos_y_sistemas_materiales']),
  n('unidades_quimicas', 'quimica', 'alta', ['leyes_de_la_quimica']),
  n('teoria_atomica', 'quimica', 'alta', ['conceptos_basicos_y_sistemas_materiales']),
  n('tabla_periodica', 'quimica', 'alta', ['teoria_atomica']),
  n('enlace_quimico', 'quimica', 'alta', ['tabla_periodica']),
  n('formuleo', 'quimica', 'alta', ['enlace_quimico']),
  n('estequiometria', 'quimica', 'alta', ['unidades_quimicas', 'formuleo']),
  n('redox', 'quimica', 'media', ['enlace_quimico']),
  n('soluciones', 'quimica', 'alta', ['unidades_quimicas']),
  n('propiedades_coligativas', 'quimica', 'media', ['soluciones']),
  n('equilibrio_quimico', 'quimica', 'media', ['estequiometria']),
  n('quimica_organica', 'quimica', 'media', ['enlace_quimico']),
  // Temas nuevos UNSa
  n('termoquimica', 'quimica', 'media', ['estequiometria']),
  n('biomoleculas', 'quimica', 'alta', ['quimica_organica']),
];

function n(
  topic: string,
  subject: Subject,
  frequency: TopicNode['frequency'],
  prereqs: string[],
): TopicNode {
  return { topic, subject, frequency, prereqs };
}

export const prerequisiteGraph: TopicNode[] = [...bio, ...fis, ...qui];

export function nodesForSubject(subject: Subject): TopicNode[] {
  return prerequisiteGraph.filter((node) => node.subject === subject);
}

const byTopic = new Map(prerequisiteGraph.map((node) => [node.topic, node]));
export function prereqNode(topic: string): TopicNode | undefined {
  return byTopic.get(topic);
}
