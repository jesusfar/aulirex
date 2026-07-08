import type { Institution, Item, Subject, Track } from '../types/content';

// Ítems curados (hechos a mano): pocos y livianos → carga sincrónica.
import { items as bioMembrana } from './items/biologia/membrana';
import { items as bioOrganelas } from './items/biologia/organelas';
import { items as bioDogma } from './items/biologia/dogma';
import { items as bioGenetica } from './items/biologia/genetica';
import { items as bioSistemas } from './items/biologia/sistemas';
import { items as bioVF } from './items/biologia/verdadero-falso';
import { items as bioRel } from './items/biologia/relacionar';
import { items as bioHistologia } from './items/biologia/histologia';
import { items as aauTeoria } from './items/alfabetizacion/teoria';
import { items as quiOrganica } from './items/quimica/organica';
import { items as quiAcidoBase } from './items/quimica/acido-base';
import { items as quiSoluciones } from './items/quimica/soluciones';
import { items as quiTermo } from './items/quimica/termoquimica';
import { items as quiBiomoleculas } from './items/quimica/biomoleculas';
import { items as fisOndas } from './items/fisica/ondas';
import { items as fisOptica } from './items/fisica/optica';
import { items as fisBiofluidos } from './items/fisica/biofisica-fluidos';
import { items as fisMagnetismo } from './items/fisica/magnetismo';

import { generatedItems } from './templates';
import bankMeta from './bank-meta.json';
import { IMPORTED_SUBJECTS, loadImportedSubject } from './imported';

export { allMisconceptions, misconceptionById } from './misconceptions';
export { processMaps, processMapById } from './process-maps';

export const curatedItems: Item[] = [
  ...bioMembrana,
  ...bioOrganelas,
  ...bioDogma,
  ...bioGenetica,
  ...bioSistemas,
  ...bioVF,
  ...bioRel,
  ...bioHistologia,
  ...aauTeoria,
  ...quiOrganica,
  ...quiAcidoBase,
  ...quiSoluciones,
  ...quiTermo,
  ...quiBiomoleculas,
  ...fisOndas,
  ...fisOptica,
  ...fisBiofluidos,
  ...fisMagnetismo,
  ...generatedItems,
].filter((i) => i.status === 'active');

// --- Metadata sincrónica (para filtros y contadores sin cargar los bancos) ---
type BankMeta = Record<string, { count: number; blocks: Record<string, string[]> }>;
const meta = bankMeta as BankMeta;

export const subjectsInBank = [
  ...new Set<Subject>([
    ...(IMPORTED_SUBJECTS as Subject[]),
    ...curatedItems.map((i) => i.subject),
  ]),
];

// Total del banco (importado + curado) sin descargar los JSON pesados.
export const BANK_TOTAL =
  Object.values(meta).reduce((s, m) => s + m.count, 0) + curatedItems.length;

export function blocksForSubject(subject: Subject): string[] {
  const fromMeta = meta[subject] ? Object.keys(meta[subject].blocks) : [];
  const fromCurated = curatedItems
    .filter((i) => i.subject === subject)
    .map((i) => i.block);
  return [...new Set([...fromMeta, ...fromCurated])];
}

export function topicsForBlock(subject: Subject, block: string): string[] {
  const fromMeta = meta[subject]?.blocks[block] ?? [];
  const fromCurated = curatedItems
    .filter((i) => i.subject === subject && i.block === block)
    .map((i) => i.topic);
  return [...new Set([...fromMeta, ...fromCurated])];
}

// --- Carga async de ítems (code-splitting por materia) -----------------------
export interface ItemFilters {
  institution?: Institution;
  subject?: Subject;
  block?: string;
  topic?: string;
  track?: Track;
}

async function itemsForSubjects(subjects: Subject[]): Promise<Item[]> {
  const imported = (
    await Promise.all(
      subjects
        .filter((s) => IMPORTED_SUBJECTS.includes(s))
        .map(loadImportedSubject),
    )
  ).flat();
  const curated = curatedItems.filter((i) => subjects.includes(i.subject));
  return [...curated, ...imported].filter((i) => i.status === 'active');
}

// Carga (lazy) y filtra. Si hay materia elegida, solo baja ese chunk.
export async function loadItems(filters: ItemFilters): Promise<Item[]> {
  const subjects = filters.subject ? [filters.subject] : subjectsInBank;
  const items = await itemsForSubjects(subjects);
  return items.filter((item) => {
    if (filters.institution && !item.institutions.includes(filters.institution))
      return false;
    if (filters.block && item.block !== filters.block) return false;
    if (filters.topic && item.topic !== filters.topic) return false;
    if (filters.track && item.track !== filters.track) return false;
    return true;
  });
}

// Mapa id→ítem del banco completo (para Repaso y Cuaderno de errores). Cachea
// la promesa para no rehacer el trabajo.
let idMapPromise: Promise<Map<string, Item>> | null = null;
export async function loadItemMap(): Promise<Map<string, Item>> {
  if (!idMapPromise) {
    idMapPromise = itemsForSubjects(subjectsInBank).then(
      (items) => new Map(items.map((i) => [i.id, i])),
    );
  }
  return idMapPromise;
}

export async function loadItemById(id: string): Promise<Item | undefined> {
  return (await loadItemMap()).get(id);
}
