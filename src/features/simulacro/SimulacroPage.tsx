import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemCard } from '../../components/ItemCard';
import { loadItems } from '../../content';
import { recordAttempt } from '../../lib/storage/progress';
import { useAppStore } from '../../store';
import {
  buildSimulacro,
  scoreExam,
  EXAM_PROFILES,
  type ExamProfile,
  type ExamResult,
  type Simulacro,
} from '../../lib/exam';

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export function SimulacroPage() {
  const [phase, setPhase] = useState<'setup' | 'running' | 'done'>('setup');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ExamProfile>(EXAM_PROFILES[0]);
  const [sim, setSim] = useState<Simulacro | null>(null);
  const [index, setIndex] = useState(0);
  const [correctById, setCorrectById] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);

  async function start() {
    setLoading(true);
    const all = await loadItems({});
    const s = buildSimulacro(all, profile);
    setSim(s);
    setIndex(0);
    setCorrectById({});
    setSecondsLeft(profile.durationMin * 60);
    setPhase('running');
    setLoading(false);
  }

  useEffect(() => {
    if (phase !== 'running') return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setPhase('done');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const current = sim?.items[index];
  const total = sim?.items.length ?? 0;
  const section = !current
    ? null
    : sim!.aauIds.has(current.id)
      ? { label: 'Comprensión', tone: 'text-emerald-300' }
      : sim!.teoricoIds.has(current.id)
        ? { label: 'Teórica', tone: 'text-sky-300' }
        : { label: 'Práctica', tone: 'text-amber-300' };
  const result: ExamResult | null =
    phase === 'done' && sim ? scoreExam(sim, correctById) : null;

  const answeredCount = useMemo(
    () => Object.keys(correctById).length,
    [correctById],
  );

  // ---------------- Setup ----------------
  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-black text-white">Simulacro de examen</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Elegí el examen que estás preparando. Se responde sin feedback hasta el
          final, con tiempo límite.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {EXAM_PROFILES.map((p) => {
            const active = p.id === profile.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setProfile(p)}
                className={`rounded-lg border p-4 text-left transition ${
                  active
                    ? 'border-sky-400/60 bg-sky-400/10'
                    : 'border-white/10 bg-slate-900/72 hover:border-white/25'
                }`}
              >
                <p className="text-sm font-black text-white">{p.label}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {p.teorico} teóricas + {p.practico} prácticas · {p.durationMin} min
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Aprueba con {p.passThreshold}%{' '}
                  {p.splitByTrack ? 'en cada track' : 'global'}
                </p>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={start}
          className="aulirex-primary-button mt-6 rounded-md px-6 py-3 text-sm font-black transition"
        >
          {loading ? 'Preparando…' : `Comenzar ${profile.label}`}
        </button>
      </div>
    );
  }

  // ---------------- Resultados ----------------
  if (phase === 'done' && result) {
    return (
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-black text-white">
          Resultado · {sim!.profile.label}
        </h2>
        <p
          className={`mt-2 text-lg font-black ${
            result.passed ? 'text-emerald-300' : 'text-rose-300'
          }`}
        >
          {result.passed ? '✅ Aprobado' : '❌ No aprobado'}
          {!result.passed &&
            (sim!.profile.splitByTrack
              ? ' (hay que aprobar ambos tracks)'
              : ` (necesitás ${sim!.profile.passThreshold}% global)`)}
        </p>
        {sim!.fellBack && (
          <p className="mt-1 text-xs text-amber-300/80">
            No hay ítems específicos de {sim!.profile.institution}; se usó el banco
            general de ciencias.
          </p>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <TrackCard title="Global" s={result.overall} />
          <TrackCard title="Teórico" s={result.teorico} />
          <TrackCard title="Práctico" s={result.practico} />
          {result.aau.total > 0 && (
            <TrackCard title="Comprensión" s={result.aau} />
          )}
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setPhase('setup')}
            className="aulirex-primary-button rounded-md px-5 py-2.5 text-sm font-black"
          >
            Otro simulacro
          </button>
          <Link
            to="/errores"
            className="rounded-md border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-200 hover:border-white/25"
          >
            Ver mis errores
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- Running ----------------
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">
            Pregunta {Math.min(index + 1, total)} de {total}
            {section && (
              <>
                {' · '}
                <span className={section.tone}>{section.label}</span>
              </>
            )}
          </p>
          <p className="text-xs text-slate-500">{answeredCount} respondidas</p>
        </div>
        <div
          className={`rounded-md border px-3 py-1.5 font-mono text-lg font-black ${
            secondsLeft < 60
              ? 'border-rose-400/40 text-rose-300'
              : 'border-white/10 text-slate-200'
          }`}
        >
          ⏱ {fmt(secondsLeft)}
        </div>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-400 transition-all"
          style={{ width: `${total ? (index / total) * 100 : 0}%` }}
        />
      </div>

      {current && (
        <ItemCard
          key={current.id}
          item={current}
          exam
          onAnswered={({ item, correct, given, grade, timeMs }) => {
            setCorrectById((prev) => ({ ...prev, [item.id]: correct }));
            void recordAttempt({
              item,
              correct,
              givenAnswer: given,
              chosenMisconception: grade.chosenMisconception,
              timeMs,
            }).then(({ progress }) => useAppStore.getState().setProgress(progress));
          }}
          onNext={() => {
            if (index + 1 >= total) setPhase('done');
            else setIndex((i) => i + 1);
          }}
        />
      )}

      <button
        type="button"
        onClick={() => setPhase('done')}
        className="mt-4 text-sm font-semibold text-slate-500 hover:text-slate-300"
      >
        Terminar ahora
      </button>
    </div>
  );
}

function TrackCard({
  title,
  s,
}: {
  title: string;
  s: ExamResult['teorico'];
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        s.passed
          ? 'border-emerald-400/40 bg-emerald-400/5'
          : 'border-rose-400/40 bg-rose-400/5'
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-3xl font-black text-white">{s.pct}%</p>
      <p className="text-sm text-slate-400">
        {s.correct}/{s.total} correctas ·{' '}
        <span className={s.passed ? 'text-emerald-300' : 'text-rose-300'}>
          {s.passed ? 'aprobado' : 'no aprobado'}
        </span>
      </p>
    </div>
  );
}
