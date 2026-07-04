import type {
  Institution,
  Item,
  Subject,
  Track,
} from '../types/content';

// Biología
import { items as bioMembrana } from './items/biologia/membrana';
import { items as bioOrganelas } from './items/biologia/organelas';
import { items as bioDogma } from './items/biologia/dogma';
import { items as bioGenetica } from './items/biologia/genetica';
import { items as bioSistemas } from './items/biologia/sistemas';

// Química
import { items as quiOrganica } from './items/quimica/organica';
import { items as quiAcidoBase } from './items/quimica/acido-base';
import { items as quiSoluciones } from './items/quimica/soluciones';

// Banco importado de los prengunteros (Biología, Física, Química).
import { importedItems } from './imported';

export { allMisconceptions, misconceptionById } from './misconceptions';

// Banco completo: ítems originales curados + banco importado.
// En fases futuras esto se carga por materia (code-splitting).
export const allItems: Item[] = [
  ...bioMembrana,
  ...bioOrganelas,
  ...bioDogma,
  ...bioGenetica,
  ...bioSistemas,
  ...quiOrganica,
  ...quiAcidoBase,
  ...quiSoluciones,
  ...importedItems,
].filter((i) => i.status === 'active');

export const itemById = new Map(allItems.map((i) => [i.id, i]));

export interface ItemFilters {
  institution?: Institution;
  subject?: Subject;
  block?: string;
  topic?: string;
  track?: Track;
}

export function filterItems(filters: ItemFilters): Item[] {
  return allItems.filter((item) => {
    if (filters.institution && !item.institutions.includes(filters.institution))
      return false;
    if (filters.subject && item.subject !== filters.subject) return false;
    if (filters.block && item.block !== filters.block) return false;
    if (filters.topic && item.topic !== filters.topic) return false;
    if (filters.track && item.track !== filters.track) return false;
    return true;
  });
}

// Utilidades para poblar los selects de filtros.
export const subjectsInBank = [...new Set(allItems.map((i) => i.subject))];

export function blocksForSubject(subject: Subject): string[] {
  return [
    ...new Set(
      allItems.filter((i) => i.subject === subject).map((i) => i.block),
    ),
  ];
}

export function topicsForBlock(subject: Subject, block: string): string[] {
  return [
    ...new Set(
      allItems
        .filter((i) => i.subject === subject && i.block === block)
        .map((i) => i.topic),
    ),
  ];
}
