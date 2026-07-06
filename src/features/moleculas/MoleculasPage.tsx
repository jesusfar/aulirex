import { useMemo, useState } from 'react';
import moleculesData from '../../content/molecules/molecules.json';
import { MoleculeViewer } from '../../components/MoleculeViewer';

interface Molecule {
  id: string;
  name: string;
  formula: string;
  category: string;
  note: string;
  mol: string;
}
const molecules = moleculesData as Molecule[];

const CATS: [string, string][] = [
  ['', 'Todas'],
  ['inorganica', 'Inorgánicas'],
  ['hidrocarburo', 'Hidrocarburos'],
  ['grupo_funcional', 'Grupos funcionales'],
  ['biologica', 'Biológicas'],
];

const CPK: [string, string][] = [
  ['#909090', 'C'],
  ['#ffffff', 'H'],
  ['#ff0d0d', 'O'],
  ['#3050f8', 'N'],
];

// Fórmula con subíndices Unicode (H2O → H₂O).
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const prettyFormula = (f: string) => f.replace(/\d/g, (d) => SUB[+d]);

export function MoleculasPage() {
  const [cat, setCat] = useState('');
  const [style, setStyle] = useState<'stick' | 'sphere'>('stick');
  const list = useMemo(
    () => (cat ? molecules.filter((m) => m.category === cat) : molecules),
    [cat],
  );
  const [selectedId, setSelectedId] = useState(molecules[0]?.id);
  const selected = list.find((m) => m.id === selectedId) ?? list[0];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-white">Moléculas 3D</h2>
        <p className="mt-1 text-sm text-slate-400">
          Girá con el mouse, hacé zoom con la rueda. Colores por elemento (CPK).
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {CATS.map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => setCat(v)}
            className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition ${
              cat === v
                ? 'border-sky-400/40 bg-sky-400/10 text-sky-200'
                : 'border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {list.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedId(m.id)}
            className={`rounded-md border px-2.5 py-1 text-sm transition ${
              selected?.id === m.id
                ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-100'
                : 'border-white/10 text-slate-300 hover:border-white/25'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-lg font-black text-white">
                {selected.name}{' '}
                <span className="font-mono text-sky-300">{prettyFormula(selected.formula)}</span>
              </p>
              <p className="text-sm text-slate-400">{selected.note}</p>
            </div>
            <div className="flex gap-1 rounded-md border border-white/10 p-1">
              {(['stick', 'sphere'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  className={`rounded px-3 py-1 text-xs font-bold transition ${
                    style === s ? 'bg-sky-400/20 text-sky-100' : 'text-slate-400'
                  }`}
                >
                  {s === 'stick' ? 'Varillas' : 'Esferas'}
                </button>
              ))}
            </div>
          </div>

          <MoleculeViewer molBlock={selected.mol} style={style} />

          <div className="mt-3 flex flex-wrap gap-3">
            {CPK.map(([color, el]) => (
              <span key={el} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span
                  className="inline-block size-3 rounded-full border border-white/20"
                  style={{ background: color }}
                />
                {el}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
