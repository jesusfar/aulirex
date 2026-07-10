import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadItemMap, misconceptionById } from '../../content';
import { getErrorLog, type ErrorEntry } from '../../lib/storage/progress';
import { MathText } from '../../components/MathText';
import type { Item } from '../../types/content';

interface Group {
  misconceptionId?: string;
  name: string;
  remedy?: string;
  entries: (ErrorEntry & { stem: string; subject: string })[];
}

export function ErrorNotebookPage() {
  const [entries, setEntries] = useState<ErrorEntry[] | null>(null);
  const [byId, setById] = useState<Map<string, Item> | null>(null);

  useEffect(() => {
    getErrorLog().then(setEntries);
    loadItemMap().then(setById);
  }, []);

  const groups = useMemo<Group[]>(() => {
    if (!entries || !byId) return [];
    const byMc = new Map<string, Group>();
    for (const e of entries) {
      const item = byId.get(e.itemId);
      if (!item) continue;
      const key = e.chosenMisconception ?? '__sin__';
      const mc = e.chosenMisconception
        ? misconceptionById.get(e.chosenMisconception)
        : undefined;
      if (!byMc.has(key)) {
        byMc.set(key, {
          misconceptionId: e.chosenMisconception,
          name: mc?.name ?? 'Otros errores',
          remedy: mc?.remedy,
          entries: [],
        });
      }
      byMc.get(key)!.entries.push({ ...e, stem: item.stem, subject: item.subject });
    }
    return [...byMc.values()].sort((a, b) => b.entries.length - a.entries.length);
  }, [entries, byId]);

  if (entries === null || byId === null)
    return <p className="text-slate-400">Cargando…</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-white">Cuaderno de errores</h2>
        <p className="mt-1 text-sm text-slate-400">
          Tus fallos, agrupados por la <strong>idea que se confunde</strong>, no por
          pregunta suelta. Corregí el concepto y desaparecen del cuaderno.
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-slate-900/70 px-6 py-12 text-center">
          <p className="text-lg font-bold text-white">Sin errores registrados ✨</p>
          <p className="mt-2 text-slate-400">
            Cuando falles una pregunta, acá vas a ver el concepto a reforzar.
          </p>
          <Link
            to="/ingreso-medicina/practica"
            className="aulirex-primary-button mt-5 inline-block rounded-md px-5 py-2.5 text-sm font-black"
          >
            Ir a practicar
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((g) => (
            <section
              key={g.misconceptionId ?? '__sin__'}
              className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-white">{g.name}</h3>
                <span className="shrink-0 rounded-full bg-rose-500/15 px-2.5 py-0.5 text-xs font-bold text-rose-300">
                  {g.entries.length} {g.entries.length === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>
              {g.remedy && (
                <p className="mt-2 rounded-md border border-cyan-300/15 bg-cyan-400/5 px-3 py-2 text-sm text-cyan-100">
                  <span className="font-semibold">Cómo corregirlo: </span>
                  <MathText>{g.remedy}</MathText>
                </p>
              )}
              <ul className="mt-3 space-y-1.5">
                {g.entries.slice(0, 6).map((e) => (
                  <li key={e.itemId} className="text-sm text-slate-300">
                    <span className="mr-2 text-xs uppercase tracking-wide text-slate-500">
                      {e.subject}
                    </span>
                    <MathText>{e.stem.slice(0, 110)}</MathText>
                    {e.timesWrong > 1 && (
                      <span className="ml-1 text-xs text-rose-400">
                        ×{e.timesWrong}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
