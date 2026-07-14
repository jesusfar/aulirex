import type { Institution, Item, Subject, Track } from '../../../types/content';

// Banco semilla curado del módulo Ingreso a Gendarmería. A diferencia de
// Medicina, todavía no hay bancos JSON pesados ni generadores: todos los ítems
// son curados y se cargan de forma sincrónica.
import { items as matematica } from './items/matematica';
import { items as fisica } from './items/fisica';
import { items as lengua } from './items/lengua';
import { items as historia } from './items/historia';
import { items as civica } from './items/instruccion-civica';
import { items as institucional } from './institucional';

import { fetchRemoteItems } from './remote';
import { isSupabaseConfigured } from '../../../lib/supabase';

export { allMisconceptions, misconceptionById } from './misconceptions';

export const curatedItems: Item[] = [
  ...matematica,
  ...fisica,
  ...lengua,
  ...historia,
  ...civica,
  ...institucional,
].filter((i) => i.status === 'active');

export const subjectsInBank = [
  ...new Set<Subject>(curatedItems.map((i) => i.subject)),
];

export const BANK_TOTAL = curatedItems.length;

export function blocksForSubject(subject: Subject): string[] {
  return [
    ...new Set(
      curatedItems.filter((i) => i.subject === subject).map((i) => i.block),
    ),
  ];
}

export function topicsForBlock(subject: Subject, block: string): string[] {
  return [
    ...new Set(
      curatedItems
        .filter((i) => i.subject === subject && i.block === block)
        .map((i) => i.topic),
    ),
  ];
}

// --- Carga de ítems -----------------------------------------------------------
export interface ItemFilters {
  institution?: Institution;
  subject?: Subject;
  block?: string;
  topic?: string;
  track?: Track;
}

async function allItems(): Promise<Item[]> {
  // Si Supabase está configurado, se mergean las preguntas remotas (gestionadas
  // por admin). Una remota con el mismo id PISA a la local. Sin Supabase, no-op.
  if (!isSupabaseConfigured) return curatedItems;
  const remote = (await fetchRemoteItems()).filter((i) => i.status === 'active');
  if (remote.length === 0) return curatedItems;
  const byId = new Map<string, Item>();
  for (const it of curatedItems) byId.set(it.id, it);
  for (const it of remote) byId.set(it.id, it);
  return [...byId.values()];
}

export async function loadItems(filters: ItemFilters): Promise<Item[]> {
  const items = await allItems();
  return items.filter((item) => {
    if (filters.institution && !item.institutions.includes(filters.institution))
      return false;
    if (filters.subject && item.subject !== filters.subject) return false;
    if (filters.block && item.block !== filters.block) return false;
    if (filters.topic && item.topic !== filters.topic) return false;
    if (filters.track && item.track !== filters.track) return false;
    return true;
  });
}

let idMapPromise: Promise<Map<string, Item>> | null = null;
export async function loadItemMap(): Promise<Map<string, Item>> {
  if (!idMapPromise) {
    idMapPromise = allItems().then(
      (items) => new Map(items.map((i) => [i.id, i])),
    );
  }
  return idMapPromise;
}

export async function loadItemById(id: string): Promise<Item | undefined> {
  return (await loadItemMap()).get(id);
}
