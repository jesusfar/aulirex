import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../lib/storage/db';
import { useAppStore } from '../../store';
import { BANK_TOTAL, loadItemMap } from '../../content';
import { getAllAttempts } from '../../lib/storage/attempts';
import { getProgress, getReviewCards } from '../../lib/storage/progress';
import { dueQueue } from '../../lib/spaced-repetition/scheduler';
import { levelProgress, rankForLevel } from '../../lib/gamification';
import { buildForecast, type Forecast, type TrackForecast } from '../../lib/forecast';
import { masteryByTopic, masteryBySubject } from '../../lib/mastery';
import { buildStudyPlan, type TopicStatus } from '../../lib/planner';
import { prerequisiteGraph } from '../../content/prerequisites';
import {
  abilityLabel,
  loadDiagnostic,
  type DiagnosticResult,
} from '../../lib/diagnostic';
import type { ReviewCard } from '../../types/progress';
import type { Subject } from '../../types/content';
import {
  buildReviewInsights,
  humanizeTopic,
  subjectLabel,
  type ReviewInsights,
} from '../review/reviewInsights';
import { ForgettingCurve } from './ForgettingCurve';

const CORE_SUBJECTS: Subject[] = ['biologia', 'fisica', 'quimica'];

interface SubjectStat {
  subject: Subject;
  mastery: number;
  attempts: number;
  total: number;
  ready: number;
  blocked: number;
  mastered: number;
}

const EXAM_DATE_STORAGE_KEY = 'aulirex.examDate';

export function DashboardPage() {
  const hydrated = useAppStore((s) => s.hydrated);
  const setHydrated = useAppStore((s) => s.setHydrated);
  const progress = useAppStore((s) => s.progress);
  const setProgress = useAppStore((s) => s.setProgress);
  const [stats, setStats] = useState({ total: 0, correct: 0, solved: 0 });
  const [dueCount, setDueCount] = useState(0);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [insights, setInsights] = useState<ReviewInsights | null>(null);
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>([]);
  const [subjectStats, setSubjectStats] = useState<SubjectStat[]>([]);
  const [recommended, setRecommended] = useState<TopicStatus[]>([]);
  const [diagnostic] = useState<DiagnosticResult | null>(() => loadDiagnostic());
  const [examDate, setExamDate] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(EXAM_DATE_STORAGE_KEY) ?? '';
  });

  useEffect(() => {
    db.open().then(async () => {
      setHydrated(true);
      const [attempts, reviewCards] = await Promise.all([
        getAllAttempts(),
        getReviewCards(),
      ]);
      const correct = attempts.filter((a) => a.correct);
      setStats({
        total: attempts.length,
        correct: correct.length,
        solved: new Set(correct.map((a) => a.itemId)).size,
      });
      setProgress(await getProgress());

      // Pronóstico + plan: necesitan el track/tema de cada ítem → mapa del banco
      // (lazy y cacheado; se comparte con la pantalla de Repaso).
      const byId = await loadItemMap();

      // "Para repasar" cuenta solo cards del banco de ciencias (comprensión
      // lectora no entra a Repaso), consistente con la pantalla de Repaso.
      const scienceCards = reviewCards.filter((c) => byId.has(c.itemId));
      setReviewCards(scienceCards);
      setDueCount(dueQueue(scienceCards).length);
      setForecast(buildForecast(attempts, byId));
      setInsights(buildReviewInsights({ attempts, reviewCards, byId }));

      const mastery = masteryByTopic(attempts, byId);
      const bySubject = masteryBySubject(mastery);
      const plan = buildStudyPlan(prerequisiteGraph, mastery);
      setRecommended(plan.recommended);
      setSubjectStats(
        CORE_SUBJECTS.map((subject) => {
          const sm = bySubject.get(subject);
          const statuses = plan.statuses.filter((s) => s.subject === subject);
          return {
            subject,
            mastery: sm?.mastery ?? 0,
            attempts: sm?.attempts ?? 0,
            total: statuses.length,
            ready: statuses.filter((s) => s.state === 'ready').length,
            blocked: statuses.filter((s) => s.state === 'blocked').length,
            mastered: statuses.filter((s) => s.state === 'mastered').length,
          };
        }),
      );
    });
  }, [setHydrated, setProgress]);

  const xp = progress?.xp ?? 0;
  const streak = progress?.streak ?? 0;
  const lvl = useMemo(() => levelProgress(xp), [xp]);
  const rank = rankForLevel(lvl.level);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (examDate) {
      window.localStorage.setItem(EXAM_DATE_STORAGE_KEY, examDate);
    } else {
      window.localStorage.removeItem(EXAM_DATE_STORAGE_KEY);
    }
  }, [examDate]);

  const countdown = useMemo(() => getExamCountdown(examDate), [examDate]);
  const todayPlan = useMemo(
    () => buildTodayPlan(insights, recommended, stats.total),
    [insights, recommended, stats.total],
  );
  const accuracy =
    stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const bankProgress = BANK_TOTAL
    ? Math.round((stats.solved / BANK_TOTAL) * 100)
    : 0;

  return (
    <section className="space-y-6">
      <div className="exam-countdown-panel overflow-hidden rounded-lg border border-cyan-200/20 px-5 py-5 shadow-[0_0_42px_rgba(14,165,233,0.18)] sm:px-8 sm:py-6">
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/80">
              Cuenta regresiva ingreso
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-white sm:text-5xl">
              {countdown.headline}
            </h1>
            {countdown.detail && (
              <p className="mt-2 text-sm font-semibold text-cyan-100/75">
                {countdown.detail}
              </p>
            )}
          </div>

          <label className="shrink-0">
            <span className="sr-only">Fecha del ingreso</span>
            <input
              type="date"
              value={examDate}
              onChange={(event) => setExamDate(event.target.value)}
              onInput={(event) => setExamDate(event.currentTarget.value)}
              className="exam-countdown-input h-12 w-full min-w-44 rounded-md border border-cyan-100/30 bg-slate-950/72 px-4 text-sm font-black text-cyan-50 outline-none transition focus:border-cyan-100 focus:ring-4 focus:ring-cyan-300/18 sm:w-48"
            />
          </label>
        </div>
      </div>

      {/* Rango médico + nivel + racha + repaso pendiente */}
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-slate-900/72 p-4 sm:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Rango
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {rank.emoji} {rank.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Nivel
              </p>
              <p className="aulirex-gradient-number aulirex-gradient-number--sky text-3xl font-black">
                {lvl.level}
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-sky-400 transition-all"
              style={{ width: `${Math.round(lvl.ratio * 100)}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            {lvl.intoLevel}/{lvl.levelSpan} XP · {xp} XP total
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/72 p-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Racha
          </p>
          <p className="mt-1 text-3xl font-black text-amber-300">🔥 {streak}</p>
          <p className="text-xs text-slate-400">
            {streak === 1 ? 'día' : 'días'} seguidos
          </p>
        </div>
        <Link
          to="/repaso"
          className="rounded-lg border border-white/10 bg-slate-900/72 p-4 text-center transition hover:border-sky-400/40"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Para repasar
          </p>
          <p className="mt-1 text-3xl font-black text-cyan-300">{dueCount}</p>
          <p className="text-xs text-slate-400">
            {dueCount === 1 ? 'ítem listo' : 'ítems listos'}
          </p>
        </Link>
      </div>

      {/* Fila 1: Pronóstico + Diagnóstico */}
      <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
        <div className="rounded-lg border border-white/10 bg-slate-900/72 p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
              Si rindieras hoy
            </h2>
            <Link to="/simulacro" className="text-xs font-bold text-sky-300 hover:text-sky-200">
              Simulacro →
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ForecastCard title="Teórico" f={forecast?.teorico} />
            <ForecastCard title="Práctico" f={forecast?.practico} />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Estimación sobre lo que practicaste, con curva de olvido. Aprobar el
            CONEUM pide 60% en cada track.
          </p>
        </div>

        <DiagnosticPanel diagnostic={diagnostic} />
      </div>

      {/* Fila 2: Curva de olvido + Plan de hoy */}
      <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
        <ForgettingCurve cards={reviewCards} />

        <div className="rounded-lg border border-white/10 bg-slate-900/72 p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
            Plan de hoy
          </h2>
          <ul className="mt-4 space-y-2.5">
            {todayPlan.map((step) => (
              <li key={step.title}>
                <Link
                  to={step.to}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-950/40 px-3 py-2.5 transition hover:border-sky-400/40"
                >
                  <span className="text-lg">{step.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-white">
                      {step.title}
                    </span>
                    <span className="block truncate text-xs text-slate-400">
                      {step.detail}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fila 3: Dominio por materia */}
      <div className="rounded-lg border border-white/10 bg-slate-900/72 p-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
            Dominio por materia
          </h2>
          <span className="text-xs text-slate-500">
            temas listos · a reforzar · bloqueados
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {subjectStats.map((s) => (
            <SubjectMasteryCard key={s.subject} stat={s} />
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          Un tema se desbloquea cuando dominás sus prerrequisitos. Los bloqueados
          esperan a que reforcés lo anterior.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="rounded-lg border border-white/10 bg-slate-900/72 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className="mb-7 max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-md border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
              Banco activo
            </div>
            <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
              Practica con foco y converti tus errores en ventaja.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Aulirex organiza preguntas, intentos y progreso local para que cada
              sesion de estudio tenga direccion.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Intentos" value={stats.total} accent="sky" />
            <Stat label="Aciertos" value={`${accuracy}%`} accent="emerald" />
            <Stat
              label="Items dominados"
              value={`${stats.solved}/${BANK_TOTAL}`}
              accent="amber"
            />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/practica"
              className="aulirex-primary-button inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-black transition"
            >
              Empezar practica
            </Link>
            <span className="text-sm text-slate-400">
              Base local {hydrated ? 'lista' : 'iniciando...'} - {BANK_TOTAL}{' '}
              items disponibles
            </span>
          </div>
        </div>

        <aside className="rounded-lg border border-white/10 bg-black/28 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
                Progreso del banco
              </h2>
              <p className="aulirex-gradient-number aulirex-gradient-number--sky mt-1 text-3xl font-black">{bankProgress}%</p>
            </div>
            <div className="grid size-16 place-items-center rounded-full border border-sky-300/30 bg-sky-400/10 text-sm font-black text-sky-200 shadow-[0_0_28px_rgba(14,165,233,0.18)]">
              <span className="aulirex-gradient-number aulirex-gradient-number--sky">{stats.solved}</span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <ProgressRow label="Dominados" value={bankProgress} tone="bg-sky-400" />
            <ProgressRow label="Precision" value={accuracy} tone="bg-emerald-400" />
          </div>

          <div className="mt-6 rounded-lg border border-slate-700/70 bg-slate-950/70 p-4">
            <p className="text-sm font-semibold text-white">Modo recomendado</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Filtra por materia y trabaja mazos cortos. La repeticion con feedback
              inmediato suele rendir mejor que sesiones largas sin cierre.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

interface PlanStep {
  icon: string;
  title: string;
  detail: string;
  to: string;
}

function buildTodayPlan(
  insights: ReviewInsights | null,
  recommended: TopicStatus[],
  totalAttempts: number,
): PlanStep[] {
  if (!insights) {
    return [
      {
        icon: '⏳',
        title: 'Cargando tu plan…',
        detail: 'Analizando intentos y repaso',
        to: '/practica',
      },
    ];
  }

  const steps: PlanStep[] = [];

  if (totalAttempts < 8) {
    steps.push({
      icon: '🧭',
      title: 'Hacé el diagnóstico',
      detail: 'Medí tu nivel por materia para orientar el plan',
      to: '/diagnostico',
    });
  }

  if (insights.dueCount > 0) {
    steps.push({
      icon: '🔁',
      title: `Repasá ${insights.dueCount} ${insights.dueCount === 1 ? 'ítem' : 'ítems'} de hoy`,
      detail: 'Toca repasarlos antes de que se olviden',
      to: '/repaso',
    });
  }

  if (insights.activeErrorCount > 0) {
    steps.push({
      icon: '🩹',
      title: `Cerrá ${insights.activeErrorCount} ${insights.activeErrorCount === 1 ? 'error abierto' : 'errores abiertos'}`,
      detail: 'Preguntas que fallaste y aún no recuperaste',
      to: '/repaso',
    });
  }

  for (const topic of recommended) {
    if (steps.length >= 4) break;
    const unlocks =
      topic.unlocks > 0 ? ` · desbloquea ${topic.unlocks}` : '';
    steps.push({
      icon: topic.started ? '🎯' : '🚀',
      title: `${topic.started ? 'Reforzá' : 'Empezá'} ${humanizeTopic(topic.topic)}`,
      detail: `${subjectLabel(topic.subject)} · ${Math.round(topic.mastery * 100)}% dominio${unlocks}`,
      to: '/practica',
    });
  }

  if (steps.length === 0) {
    steps.push({
      icon: '✅',
      title: 'Vas al día',
      detail: 'Sin repasos vencidos ni errores abiertos. Sumá práctica nueva.',
      to: '/practica',
    });
  }

  return steps.slice(0, 4);
}

function DiagnosticPanel({
  diagnostic,
}: {
  diagnostic: DiagnosticResult | null;
}) {
  if (!diagnostic) {
    return (
      <div className="flex flex-col rounded-lg border border-white/10 bg-slate-900/72 p-5">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
          Nivel de partida
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
          Todavía no hiciste el diagnóstico. Son 15 preguntas que se adaptan a tu
          nivel y estiman tu habilidad por materia.
        </p>
        <Link
          to="/diagnostico"
          className="aulirex-primary-button mt-4 inline-flex w-fit items-center justify-center rounded-md px-5 py-2.5 text-sm font-black"
        >
          Hacer diagnóstico
        </Link>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/72 p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
          Nivel de partida
        </h2>
        <Link
          to="/diagnostico"
          className="text-xs font-bold text-sky-300 hover:text-sky-200"
        >
          Rehacer →
        </Link>
      </div>
      <div className="mt-4 space-y-2.5">
        {CORE_SUBJECTS.map((s) => {
          const v = diagnostic.ability[s] ?? 0;
          const pct = Math.round(v * 100);
          return (
            <div key={s}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  {subjectLabel(s)}
                </span>
                <span className="text-slate-400">
                  {pct}% · {abilityLabel(v)}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${masteryTone(v)}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubjectMasteryCard({ stat }: { stat: SubjectStat }) {
  const pct = Math.round(stat.mastery * 100);
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-black text-white">
          {subjectLabel(stat.subject)}
        </span>
        <span className="text-sm font-black text-slate-300">
          {stat.attempts > 0 ? `${pct}%` : '—'}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${masteryTone(stat.mastery)}`}
          style={{ width: `${stat.attempts > 0 ? pct : 0}%` }}
        />
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-emerald-300">
          {stat.mastered} dom.
        </span>
        <span className="rounded border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 text-sky-300">
          {stat.ready} listos
        </span>
        <span className="rounded border border-slate-500/30 bg-slate-500/10 px-1.5 py-0.5 text-slate-400">
          {stat.blocked} bloq.
        </span>
      </div>
    </div>
  );
}

function masteryTone(v: number): string {
  if (v >= 0.8) return 'bg-emerald-400';
  if (v >= 0.6) return 'bg-sky-400';
  if (v >= 0.35) return 'bg-amber-400';
  return 'bg-rose-400';
}

function ForecastCard({ title, f }: { title: string; f?: TrackForecast }) {
  if (!f || f.practiced === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {title}
        </p>
        <p className="mt-1 text-2xl font-black text-slate-500">—</p>
        <p className="text-xs text-slate-500">Sin práctica todavía</p>
      </div>
    );
  }
  const tone =
    f.expectedPct >= 60
      ? 'text-emerald-300 border-emerald-400/30'
      : f.expectedPct >= 40
        ? 'text-amber-300 border-amber-400/30'
        : 'text-rose-300 border-rose-400/30';
  return (
    <div className={`rounded-lg border bg-slate-950/40 p-4 ${tone}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-3xl font-black">~{f.expectedPct}%</p>
      <p className="text-xs text-slate-400">
        cobertura {f.coverage}% · confianza {f.confidence}
      </p>
    </div>
  );
}

function getExamCountdown(value: string): { headline: string; detail?: string } {
  if (!value) return { headline: 'Configura tu fecha' };

  const targetDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(targetDate.getTime())) return { headline: 'Configura tu fecha' };

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetStart = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );
  const days = Math.ceil(
    (targetStart.getTime() - todayStart.getTime()) / (1000 * 60 * 60 * 24),
  );
  const detail = formatExamDate(targetDate);

  if (days < 0) return { headline: 'Actualiza tu fecha', detail };
  if (days === 0) return { headline: 'Es hoy', detail };
  if (days === 1) return { headline: 'Falta 1 dia', detail };
  return { headline: `Faltan ${days} dias`, detail };
}

function formatExamDate(date: Date): string {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: 'sky' | 'emerald' | 'amber';
}) {
  const accentClass = {
    sky: 'bg-sky-400/10 border-sky-300/20 shadow-[0_0_26px_rgba(14,165,233,0.12)]',
    emerald: 'bg-emerald-400/10 border-emerald-300/20 shadow-[0_0_26px_rgba(45,212,191,0.12)]',
    amber: 'bg-amber-400/10 border-amber-300/20 shadow-[0_0_26px_rgba(251,191,36,0.11)]',
  }[accent];
  const numberClass = {
    sky: 'aulirex-gradient-number--sky',
    emerald: 'aulirex-gradient-number--emerald',
    amber: 'aulirex-gradient-number--amber',
  }[accent];

  return (
    <div className={`rounded-lg border p-4 ${accentClass}`}>
      <div className={`aulirex-gradient-number ${numberClass} text-3xl font-black`}>{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-300">{label}</span>
        <span className="font-bold text-white">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${tone}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}