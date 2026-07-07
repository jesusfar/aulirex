import { useMemo, useState } from 'react';
import { formulas } from '../../content/formulas';
import { FormulaCard } from '../../components/FormulaCard';
import type { Formula } from '../../types/content';

const SUBJECTS = [
  { value: '', label: 'Todas' },
  { value: 'quimica', label: 'Qu\u00edmica' },
  { value: 'fisica', label: 'F\u00edsica' },
] as const;

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-AR')
    .trim();
}

function formulaSearchText(formula: Formula) {
  return normalizeSearch(
    [
      formula.name,
      formula.subject,
      formula.latex,
      formula.proportionality,
      ...formula.variables.flatMap((variable) => [
        variable.symbol,
        variable.name,
        variable.unit,
      ]),
      ...(formula.relations ?? []).flatMap((relation) => [
        relation.a,
        relation.b,
        relation.kind,
        relation.hold,
        relation.note,
      ]),
    ]
      .filter(Boolean)
      .join(' '),
  );
}

function formulaMatchesQuery(formula: Formula, query: string) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = formulaSearchText(formula);
  return terms.every((term) => haystack.includes(term));
}

export function FormularioPage() {
  const [subject, setSubject] = useState('');
  const [query, setQuery] = useState('');

  const list = useMemo(
    () =>
      formulas.filter(
        (formula) =>
          (!subject || formula.subject === subject) && formulaMatchesQuery(formula, query),
      ),
    [subject, query],
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-white">Formulas</h2>
        <p className="mt-1 text-sm text-slate-400">
          Cada f&oacute;rmula con sus variables y &mdash;lo que m&aacute;s se toma&mdash; qu&eacute; es{' '}
          <span className="text-emerald-300">directa</span> o{' '}
          <span className="text-amber-300">inversamente</span> proporcional.
        </p>
      </div>

      <label className="mb-4 block">
        <span className="sr-only">Buscar formulas</span>
        <span className="relative block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar formulas"
            className="h-12 w-full rounded-md border border-white/10 bg-black/70 pl-10 pr-4 text-sm font-semibold text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition placeholder:text-slate-500 focus:border-sky-400/70 focus:ring-2 focus:ring-sky-400/20"
          />
        </span>
      </label>

      <div className="mb-5 flex flex-wrap gap-2">
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

      {list.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((f) => (
            <FormulaCard key={f.id} formula={f} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-white/10 bg-slate-900/50 px-6 py-10 text-center">
          <p className="font-bold text-white">No se encontraron formulas</p>
          <p className="mt-1 text-sm text-slate-400">Proba con otra palabra.</p>
        </div>
      )}
    </div>
  );
}
