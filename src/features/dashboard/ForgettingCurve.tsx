import { useMemo } from 'react';
import type { ReviewCard } from '../../types/progress';
import { BOX_INTERVAL_DAYS, type Box } from '../../lib/spaced-repetition/scheduler';
import { DAY, projectedRetention } from '../../lib/retention';

// Curva de olvido personal: proyecta la retención media de tu mazo de repaso
// durante los próximos 30 días SI NO repasás. Cada card decae según su caja
// Leitner (las de caja alta se olvidan más lento). El repaso "reinicia" la curva
// — por eso importa hacer los pendientes.

const HORIZON = 30; // días proyectados
const W = 320;
const H = 130;
const PAD = { l: 34, r: 10, t: 12, b: 22 };
const chartW = W - PAD.l - PAD.r;
const chartH = H - PAD.t - PAD.b;

function halfLifeDays(box: Box): number {
  return Math.max(1, BOX_INTERVAL_DAYS[box]);
}

export function ForgettingCurve({ cards }: { cards: ReviewCard[] }) {
  const { points, todayPct, day30Pct } = useMemo(() => {
    const now = Date.now();
    const series: number[] = [];
    for (let d = 0; d <= HORIZON; d++) {
      if (cards.length === 0) {
        // Curva genérica de Ebbinghaus (una memoria sin repaso, semivida ~2 días).
        series.push(Math.pow(0.5, d / 2));
        continue;
      }
      let sum = 0;
      for (const c of cards) {
        const interval = halfLifeDays(c.box);
        const reviewedAt = c.dueAt - interval * DAY;
        const daysSince = Math.max(0, (now - reviewedAt) / DAY);
        sum += projectedRetention(daysSince + d, interval);
      }
      series.push(sum / cards.length);
    }
    return {
      points: series,
      todayPct: Math.round(series[0] * 100),
      day30Pct: Math.round(series[HORIZON] * 100),
    };
  }, [cards]);

  const x = (d: number) => PAD.l + (d / HORIZON) * chartW;
  const y = (r: number) => PAD.t + (1 - r) * chartH;
  const line = points.map((r, d) => `${x(d)},${y(r)}`).join(' ');
  const area = `${PAD.l},${y(0)} ${line} ${x(HORIZON)},${y(0)}`;

  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/72 p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
          Curva de olvido
        </h2>
        <span className="text-xs text-slate-500">próximos {HORIZON} días</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full"
        role="img"
        aria-label={`Retención proyectada: hoy ${todayPct}%, en 30 días ${day30Pct}%`}
      >
        {/* grid horizontal a 50% y 100% */}
        {[0, 0.5, 1].map((r) => (
          <g key={r}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(r)}
              y2={y(r)}
              stroke="rgba(148,163,184,0.15)"
              strokeWidth="1"
            />
            <text x={PAD.l - 6} y={y(r) + 3} textAnchor="end" fontSize="9" fill="#64748b">
              {Math.round(r * 100)}
            </text>
          </g>
        ))}
        <polygon points={area} fill="rgba(56,189,248,0.14)" />
        <polyline
          points={line}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx={x(0)} cy={y(points[0])} r="3" fill="#e0f2fe" />
        {/* etiquetas eje x */}
        {[0, 15, 30].map((d) => (
          <text key={d} x={x(d)} y={H - 6} textAnchor="middle" fontSize="9" fill="#64748b">
            {d === 0 ? 'hoy' : `+${d}d`}
          </text>
        ))}
      </svg>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {cards.length === 0 ? (
          <>Practicá para ver tu curva real: cada repaso frena el olvido.</>
        ) : (
          <>
            De lo que sabés hoy (~{todayPct}%), sin repasar te quedaría{' '}
            <strong className="text-slate-200">~{day30Pct}%</strong> en 30 días.
            Hacé los repasos para aplanar la caída.
          </>
        )}
      </p>
    </div>
  );
}
