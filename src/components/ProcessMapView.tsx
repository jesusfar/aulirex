import type { ProcessMap } from '../types/content';
import { MathText } from './MathText';

// Render liviano de un mapa de proceso como flujo vertical numerado. Evita la
// dependencia de Mermaid (pesada) y encaja con el tema oscuro de la app.
export function ProcessMapView({ map }: { map: ProcessMap }) {
  return (
    <details className="mt-3 rounded-md border border-sky-300/15 bg-sky-400/5">
      <summary className="cursor-pointer select-none px-3 py-2 text-sm font-semibold text-sky-200">
        🧭 Cómo funciona: {map.title}
      </summary>
      <ol className="space-y-0 px-3 pb-3">
        {map.steps.map((s, i) => (
          <li key={s.id} className="relative flex gap-3 pb-4 last:pb-0">
            {/* línea vertical del flujo */}
            {i < map.steps.length - 1 && (
              <span className="absolute left-[11px] top-6 h-full w-px bg-sky-300/25" />
            )}
            <span className="z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sky-500/25 text-xs font-black text-sky-100">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                <MathText>{s.label}</MathText>
              </p>
              <p className="text-sm text-slate-400">
                <MathText>{s.detail}</MathText>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}
