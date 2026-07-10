import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemCard } from '../../components/ItemCard';
import { loadItems } from '../../content';
import { recordAttempt } from '../../lib/storage/progress';
import { useAppStore } from '../../store';
import type { Item, Subject } from '../../types/content';
import {
  abilityLabel,
  applyResponse,
  currentSubject,
  estimateAbility,
  initDiagnostic,
  isDone,
  pickNext,
  saveDiagnostic,
  totalQuestions,
  type DiagnosticResult,
  type DiagnosticState,
} from '../../lib/diagnostic';
import { subjectLabel } from '../review/reviewInsights';

const SUBJECTS: Subject[] = ['biologia', 'fisica', 'quimica'];
const PER_SUBJECT = 5;

export function DiagnosticoPage() {
  const [phase, setPhase] = useState<'setup' | 'running' | 'done'>('setup');
  const [loading, setLoading] = useState(false);
  const [pool, setPool] = useState<Item[]>([]);
  const [state, setState] = useState<DiagnosticState | null>(null);
  const [current, setCurrent] = useState<Item | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  async function start() {
    setLoading(true);
    const all = await loadItems({});
    const usable = all.filter((i) => SUBJECTS.includes(i.subject));
    const initial = initDiagnostic(SUBJECTS, PER_SUBJECT);
    setPool(usable);
    setState(initial);
    setCurrent(pickNext(initial, usable));
    setResult(null);
    setPhase('running');
    setLoading(false);
  }

  function answer(item: Item, correct: boolean) {
    if (!state) return;
    const next = applyResponse(state, item, correct);
    setState(next);
    if (isDone(next)) {
      const res = estimateAbility(next);
      saveDiagnostic(res);
      setResult(res);
      setCurrent(null);
      setPhase('done');
    } else {
      setCurrent(pickNext(next, pool));
    }
  }

  const answered = state?.responses.length ?? 0;
  const total = state ? totalQuestions(state) : SUBJECTS.length * PER_SUBJECT;
  const activeSubject = state ? currentSubject(state) : null;

  // ---------------- Setup ----------------
  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-black text-white">Diagnóstico adaptativo</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {SUBJECTS.length * PER_SUBJECT} preguntas que se ajustan a tu nivel: si
          acertás, suben de dificultad; si fallás, bajan. Al final estimamos tu
          <strong> habilidad por materia</strong> para orientar el plan de estudio.
        </p>
        <button
          type="button"
          disabled={loading}
          onClick={start}
          className="aulirex-primary-button mt-6 rounded-md px-6 py-3 text-sm font-black transition"
        >
          {loading ? 'Preparando…' : 'Empezar diagnóstico'}
        </button>
      </div>
    );
  }

  // ---------------- Resultados ----------------
  if (phase === 'done' && result) {
    return (
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-black text-white">Tu punto de partida</h2>
        <p className="mt-1 text-sm text-slate-400">
          Habilidad global estimada:{' '}
          <strong className="text-white">
            {Math.round(result.overall * 100)}%
          </strong>{' '}
          · {abilityLabel(result.overall)}
        </p>
        <div className="mt-5 space-y-3">
          {SUBJECTS.map((s) => (
            <AbilityBar key={s} subject={s} value={result.ability[s] ?? 0} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/"
            className="aulirex-primary-button rounded-md px-5 py-2.5 text-sm font-black"
          >
            Ver mi plan
          </Link>
          <Link
            to="/ingreso-medicina/practica"
            className="rounded-md border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-200 hover:border-white/25"
          >
            Practicar
          </Link>
          <button
            type="button"
            onClick={() => setPhase('setup')}
            className="rounded-md border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-200 hover:border-white/25"
          >
            Repetir
          </button>
        </div>
      </div>
    );
  }

  // ---------------- Running ----------------
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          Pregunta {Math.min(answered + 1, total)} de {total}
          {activeSubject && (
            <>
              {' · '}
              <span className="text-sky-300">{subjectLabel(activeSubject)}</span>
            </>
          )}
        </p>
        {current && (
          <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs font-bold text-slate-300">
            dificultad {current.difficulty}/3
          </span>
        )}
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-400 transition-all"
          style={{ width: `${total ? (answered / total) * 100 : 0}%` }}
        />
      </div>

      {current && (
        <ItemCard
          key={current.id}
          item={current}
          exam
          onAnswered={({ item, correct, given, grade, timeMs }) => {
            void recordAttempt({
              item,
              correct,
              givenAnswer: given,
              chosenMisconception: grade.chosenMisconception,
              timeMs,
            }).then(({ progress }) =>
              useAppStore.getState().setProgress(progress),
            );
            answer(item, correct);
          }}
        />
      )}
    </div>
  );
}

function AbilityBar({ subject, value }: { subject: Subject; value: number }) {
  const pct = Math.round(value * 100);
  const tone =
    pct >= 80
      ? 'bg-emerald-400'
      : pct >= 60
        ? 'bg-sky-400'
        : pct >= 35
          ? 'bg-amber-400'
          : 'bg-rose-400';
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/72 p-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-bold text-white">{subjectLabel(subject)}</span>
        <span className="text-slate-400">
          {pct}% · {abilityLabel(value)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${tone}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
