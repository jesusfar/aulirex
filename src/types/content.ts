// Contrato canónico del contenido de Aulirex (plan §6.1).
// Los campos marcados "(v2)" son opcionales: la Fase 1 compila sin ellos.

export type Institution = 'UNC' | 'UNSa';

export type Subject =
  | 'introduccion'
  | 'biologia'
  | 'quimica'
  | 'fisica'
  | 'matematica'
  | 'comprension_textos'
  | 'alfabetizacion';

export type Track = 'teorico' | 'practico';
export type Frequency = 'alta' | 'media' | 'baja';
export type ItemStatus = 'active' | 'deprecated' | 'retired';

export type ItemType =
  | 'single_choice'
  | 'multiple_response'
  | 'true_false'
  | 'numeric'
  | 'ordering'
  | 'matching'
  | 'label_diagram'
  | 'annotate_molecule'
  | 'read_graph'
  | 'composite';

export interface Choice {
  id: string;
  text: string;
  correct: boolean;
  misconception?: string; // (v2) id de Misconception
  feedback?: string; // (v2) explicación dirigida al elegir esta opción
}

export interface NumericAnswer {
  value: number;
  unit?: string;
  tolerance: number;
  toleranceMode: 'abs' | 'rel';
}

export interface Media {
  kind: 'svg' | 'image' | 'mermaid' | 'chart';
  src: string;
}

export interface ClickRegion {
  id: string;
  label: string;
  shape: string;
  correct: boolean;
}

export interface Item {
  id: string;
  institutions: Institution[];
  subject: Subject;
  block: string;
  topic: string;
  track: Track;
  type: ItemType;
  frequency: Frequency;
  difficulty: 1 | 2 | 3;
  stem: string; // Markdown + KaTeX $...$
  media?: Media[];
  choices?: Choice[]; // choice / true_false / multiple_response
  numeric?: NumericAnswer; // numeric
  steps?: string[]; // ordering
  pairs?: [string, string][]; // matching
  regions?: ClickRegion[]; // label_diagram / annotate_molecule
  explanation: string;
  hint?: string;
  processMapId?: string;
  formulaIds?: string[];
  source: 'original';
  version: number; // (v2) migración
  status: ItemStatus; // (v2)
  authorNote?: string;
}

export interface CompositeItem extends Omit<Item, 'type'> {
  type: 'composite';
  figure: { kind: 'svg' | 'image'; src: string; regions?: ClickRegion[] };
  parts: Item[]; // sub-preguntas sobre la misma figura
}

export interface ItemTemplate {
  // (v2) banco "infinito"
  id: string;
  subject: Subject;
  block: string;
  topic: string;
  track: Track;
  type: ItemType;
  frequency: Frequency;
  difficulty: 1 | 2 | 3;
  params: Record<string, { min: number; max: number; step: number }>;
  render: (
    p: Record<string, number>,
  ) => Pick<Item, 'stem' | 'explanation'> & Partial<Item>;
}

export interface Misconception {
  // (v2)
  id: string;
  subject: Subject;
  name: string;
  remedy: string;
  processMapId?: string;
}

export interface ProcessMap {
  id: string;
  title: string;
  subject: Subject;
  format: 'mermaid' | 'svg';
  diagram: string;
  steps: { id: string; label: string; detail: string }[];
}

export interface Formula {
  id: string;
  subject: Subject;
  name: string;
  latex: string;
  variables: { symbol: string; name: string; unit: string }[];
  proportionality?: string;
}

export interface TopicNode {
  // (v2) grafo de prerrequisitos
  topic: string;
  subject: Subject;
  frequency: Frequency;
  prereqs: string[];
}
