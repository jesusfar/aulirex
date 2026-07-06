import { useMemo, useState } from 'react';
import { formulas } from '../../content/formulas';
import { FormulaCard } from '../../components/FormulaCard';

const SUBJECTS = [
  { value: '', label: 'Todas' },
  { value: 'quimica', label: 'Química' },
  { value: 'fisica', label: 'Física' },
] as const;

export function FormularioPage() {
  const [subject, setSubject] = useState('');

  const list = useMemo(
    () => (subject ? formulas.filter((f) => f.subject === subject) : formulas),
    [subject],
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-white">Formulas</h2>
        <p className="mt-1 text-sm text-slate-400">
          Cada fórmula con sus variables y —lo que más se toma— qué es{' '}
          <span className="text-emerald-300">directa</span> o{' '}
          <span className="text-amber-300">inversamente</span> proporcional.
        </p>
      </div>

      <div className="mb-5 flex gap-2">
        {SUBJECTS.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setSubject(s.value)}
            className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition ${
              subject === s.value
                ? 'border-sky-400/40 bg-sky-400/10 text-sky-200'
                : 'border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((f) => (
          <FormulaCard key={f.id} formula={f} />
        ))}
      </div>
    </div>
  );
}
