import type { Item } from '../../../types/content';

// Banco importado (Biología, Física, Química). Cada materia se carga con import
// DINÁMICO → Vite la separa en su propio chunk y solo se descarga cuando el
// alumno la necesita (code-splitting). El cast evita el ensanchamiento de tipos
// literales al leer JSON.
const loaders: Record<string, () => Promise<{ default: unknown }>> = {
  biologia: () => import('./items/biologia/banco-biologia.json'),
  fisica: () => import('./items/fisica/banco-fisica.json'),
  quimica: () => import('./items/quimica/banco-quimica.json'),
};

export const IMPORTED_SUBJECTS = Object.keys(loaders);

const cache = new Map<string, Item[]>();

export async function loadImportedSubject(subject: string): Promise<Item[]> {
  const cached = cache.get(subject);
  if (cached) return cached;
  const loader = loaders[subject];
  const items = loader
    ? (((await loader()).default as unknown) as Item[])
    : [];
  cache.set(subject, items);
  return items;
}
