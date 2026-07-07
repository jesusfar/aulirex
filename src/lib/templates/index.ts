import type { Item, ItemTemplate } from '../../types/content';

// PRNG determinista (mulberry32): misma semilla → misma secuencia → misma
// variante. Permite variantes "infinitas" pero reproducibles.
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Muestrea cada parámetro dentro de su rango [min, max] en pasos de `step`.
export function sampleParams(
  params: ItemTemplate['params'],
  rng: () => number,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, { min, max, step }] of Object.entries(params)) {
    const steps = Math.max(0, Math.round((max - min) / step));
    const n = Math.floor(rng() * (steps + 1));
    out[k] = Math.round((min + n * step) * 1e6) / 1e6;
  }
  return out;
}

// Genera un Item concreto a partir de una plantilla y una semilla.
export function instantiate(tpl: ItemTemplate, seed: number): Item {
  const rng = mulberry32(seed);
  const params = sampleParams(tpl.params, rng);
  const rendered = tpl.render(params);
  return {
    institutions: ['UNC', 'UNSa'],
    subject: tpl.subject,
    block: tpl.block,
    topic: tpl.topic,
    track: tpl.track,
    type: tpl.type,
    frequency: tpl.frequency,
    difficulty: tpl.difficulty,
    source: 'original',
    version: 1,
    status: 'active',
    authorNote: `Generado por plantilla ${tpl.id} (semilla ${seed}).`,
    ...rendered,
    id: `${tpl.id}-s${seed}`,
  } as Item;
}

// Genera `count` variantes distintas. Con `baseSeed` aleatorio (por sesión), los
// números cambian en cada visita → el alumno no memoriza el resultado. El engine
// sigue siendo determinista (mismo baseSeed → mismas variantes) para el simulacro.
export function generateVariants(
  tpl: ItemTemplate,
  count: number,
  baseSeed = 1,
): Item[] {
  const seen = new Set<string>();
  const items: Item[] = [];
  let seed = baseSeed;
  const limit = seed + count * 40;
  while (items.length < count && seed < limit) {
    const it = instantiate(tpl, seed++);
    if (!seen.has(it.stem)) {
      seen.add(it.stem);
      items.push(it);
    }
  }
  return items;
}
