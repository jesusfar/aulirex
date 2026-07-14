import type { Subject, TopicNode } from '../../../../types/content';

// Grafo de prerrequisitos (DAG) entre temas del banco de Gendarmería. Marca qué
// conviene dominar antes de otra cosa. Los slugs coinciden con `item.block`.
// Es conocimiento pedagógico, no un dato textual del temario; se ajusta a mano.

function n(
  topic: string,
  subject: Subject,
  frequency: TopicNode['frequency'],
  prereqs: string[],
): TopicNode {
  return { topic, subject, frequency, prereqs };
}

const matematica: TopicNode[] = [
  n('campo_numerico', 'matematica', 'alta', []),
  n('operaciones_algebraicas', 'matematica', 'alta', ['campo_numerico']),
  n('funciones_y_ecuaciones', 'matematica', 'alta', ['operaciones_algebraicas']),
  n('funciones_trascendentes', 'matematica', 'media', ['funciones_y_ecuaciones']),
  n('geometria_plana', 'matematica', 'alta', ['campo_numerico']),
];

const fisica: TopicNode[] = [
  n('estatica', 'fisica', 'media', []),
  n('cinematica', 'fisica', 'alta', []),
  n('dinamica', 'fisica', 'alta', ['cinematica', 'estatica']),
  n('trabajo_y_energia', 'fisica', 'alta', ['dinamica']),
  n('hidrostatica', 'fisica', 'media', ['dinamica']),
  n('calor_y_temperatura', 'fisica', 'media', []),
  n('electricidad', 'fisica', 'media', []),
];

const lengua: TopicNode[] = [
  n('normativa_gramatical', 'lengua', 'alta', []),
  n('ortografia', 'lengua', 'alta', []),
  n('cohesion_lexica', 'lengua', 'media', ['normativa_gramatical']),
  n('comprension', 'lengua', 'alta', []),
];

const historia: TopicNode[] = [
  n('independencia_y_anarquia', 'historia', 'alta', []),
  n('rosas_y_organizacion_nacional', 'historia', 'alta', ['independencia_y_anarquia']),
  n('estado_nacional', 'historia', 'media', ['rosas_y_organizacion_nacional']),
  n('radicales_y_conservadores', 'historia', 'media', ['estado_nacional']),
  n('peronismo_y_posperonismo', 'historia', 'media', ['radicales_y_conservadores']),
  n('proceso_y_democracia', 'historia', 'media', ['peronismo_y_posperonismo']),
];

const civica: TopicNode[] = [
  n('derechos_y_garantias', 'instruccion_civica', 'alta', []),
  n('poder_legislativo', 'instruccion_civica', 'alta', ['derechos_y_garantias']),
  n('poder_ejecutivo', 'instruccion_civica', 'alta', ['derechos_y_garantias']),
  n('poder_judicial', 'instruccion_civica', 'media', ['derechos_y_garantias']),
  n('provincias_y_caba', 'instruccion_civica', 'baja', ['poder_ejecutivo']),
];

const institucional: TopicNode[] = [
  n('mision_y_funciones', 'conocimientos_institucionales', 'alta', []),
  n('dependencia_y_encuadre_legal', 'conocimientos_institucionales', 'media', ['mision_y_funciones']),
  n('estructura_y_jerarquias', 'conocimientos_institucionales', 'media', ['mision_y_funciones']),
];

export const prerequisiteGraph: TopicNode[] = [
  ...matematica,
  ...fisica,
  ...lengua,
  ...historia,
  ...civica,
  ...institucional,
];

export function nodesForSubject(subject: Subject): TopicNode[] {
  return prerequisiteGraph.filter((node) => node.subject === subject);
}

const byTopic = new Map(prerequisiteGraph.map((node) => [node.topic, node]));
export function prereqNode(topic: string): TopicNode | undefined {
  return byTopic.get(topic);
}
