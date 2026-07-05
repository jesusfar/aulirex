import type { Formula } from '../types/content';
import { MathText } from './MathText';

// Tarjeta de fórmula: la ecuación (KaTeX), sus variables y las relaciones de
// proporcionalidad directa/inversa (el foco del examen). `compact` la usa el
// feedback del ItemCard; sin él, la sección Formulario.
export function FormulaCard({
  formula,
  compact = false,
}: {
  formula: Formula;
  compact?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-white">{formula.name}</p>
        <span className="text-xs uppercase tracking-wide text-slate-500">
          {formula.subject}
        </span>
      </div>

      <div className="mb-3 flex justify-center rounded-md bg-slate-950/50 px-3 py-3 text-lg text-sky-100">
        <MathText>{`$${formula.latex}$`}</MathText>
      </div>

      {!compact && (
        <ul className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
          {formula.variables.map((v) => (
            <li key={v.symbol} className="text-xs text-slate-400">
              <span className="font-bold text-slate-200">{v.symbol}</span>{' '}
              {v.name}
              {v.unit !== '—' && ` (${v.unit})`}
            </li>
          ))}
        </ul>
      )}

      {formula.relations && formula.relations.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
            Proporcionalidad
          </p>
          <ul className="space-y-1.5">
            {formula.relations.map((r, i) => {
              const directa = r.kind === 'directa';
              return (
                <li
                  key={i}
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
                >
                  <span className="font-mono text-slate-100">
                    {r.a} ∝ {directa ? '' : '1/'}
                    {r.b}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      directa
                        ? 'bg-emerald-400/15 text-emerald-300'
                        : 'bg-amber-400/15 text-amber-300'
                    }`}
                  >
                    {directa ? '↑↑ directa' : '↑↓ inversa'}
                  </span>
                  {r.hold && (
                    <span className="text-xs text-slate-500">
                      a {r.hold} constante
                    </span>
                  )}
                  {r.note && (
                    <span className="text-xs text-slate-500">· {r.note}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
