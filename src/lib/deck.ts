import type { Item } from '../types/content';

// Barajado Fisher-Yates (inmutable).
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Arma un mazo de `size` preguntas AL AZAR. Cuando el filtro abarca varios temas
// (materia/todas), reparte proporcionalmente a la cantidad de cada tema y
// garantiza al menos una de CADA tema (si el tamaño lo permite). Con un único
// tema, simplemente baraja y corta.
export function buildTestDeck(items: Item[], size: number): Item[] {
  const pool = shuffle(items);
  if (size >= pool.length) return pool;

  const byTopic = new Map<string, Item[]>();
  for (const it of pool) {
    const key = `${it.subject}/${it.topic}`;
    const arr = byTopic.get(key);
    if (arr) arr.push(it);
    else byTopic.set(key, [it]);
  }
  const topics = [...byTopic.keys()];
  if (topics.length <= 1) return pool.slice(0, size);

  const total = pool.length;
  const alloc = new Map<string, number>(topics.map((t) => [t, 0]));
  let assigned = 0;

  // al menos 1 por tema, si el tamaño alcanza
  if (size >= topics.length) {
    for (const t of topics) {
      alloc.set(t, 1);
      assigned++;
    }
  }

  // repartir el resto proporcional (método del resto mayor)
  const remaining = size - assigned;
  if (remaining > 0) {
    const shares = topics.map((t) => ({
      t,
      exact: (byTopic.get(t)!.length / total) * remaining,
    }));
    for (const s of shares) alloc.set(s.t, alloc.get(s.t)! + Math.floor(s.exact));
    let left = size - [...alloc.values()].reduce((a, b) => a + b, 0);
    shares.sort((a, b) => (b.exact % 1) - (a.exact % 1));
    for (let i = 0; left > 0 && i < shares.length; i++, left--) {
      alloc.set(shares[i].t, alloc.get(shares[i].t)! + 1);
    }
  }

  // muestrear de cada tema (respetando lo disponible) y rellenar si quedó corto
  const picked: Item[] = [];
  const leftover: Item[] = [];
  for (const t of topics) {
    const list = byTopic.get(t)!;
    const n = Math.min(alloc.get(t)!, list.length);
    picked.push(...list.slice(0, n));
    leftover.push(...list.slice(n));
  }
  if (picked.length < size) {
    picked.push(...shuffle(leftover).slice(0, size - picked.length));
  }
  return shuffle(picked).slice(0, size);
}
