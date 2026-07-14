import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemCard } from '../../../../components/ItemCard';
import { MathText } from '../../../../components/MathText';
import { loadItemMap } from '../../content';
import { getAllAttempts } from '../../../../lib/storage/attempts';
import { getReviewCards, recordAttempt } from '../../../../lib/storage/progress';
import { useAppStore } from '../../../../store';
import {
  buildReviewInsights,
  humanizeTopic,
  subjectLabel,
  type ReviewInsights,
  type ReviewMisconceptionGroup,
  type ReviewTopicInsight,
} from './reviewInsights';

export function ReviewPage() {
  const [data, setData] = useState<ReviewInsights | null>(null);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState({ answered: 0, correct: 0 });

  useEffect(() => {
    Promise.all([getReviewCards(), getAllAttempts(), loadItemMap()]).then(
      ([reviewCards, attempts, byId]) => {
        setData(buildReviewInsights({ attempts, reviewCards, byId }));
      },
    );
  }, []);

  const current = data?.dueItems[index];
  const total = data?.dueItems.length ?? 0;
  const topTopic = data?.weakTopics[0];
  const finishedQueue = Boolean(data && total > 0 && !current);

  const header = useMemo(() => {
    if (!data) return 'Cargando diagnostico...';
    if (total === 0) return 'No hay items vencidos ahora';
    return `Repaso ${Math.min(index + 1, total)} de ${total} - ${done.correct}/${done.answered} correctas`;
  }, [data, done, index, total]);

  if (data === null) {
    return <p className="text-slate-400">Cargando repaso...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-lg border border-emerald-300/15 bg-slate-900/68 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
              Repaso inteligente
            </div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Repaso</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Priorizamos lo vencido y los temas donde mas fallas para que cada
              vuelta tenga una accion clara.
            </p>
          </div>

          <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-black/24 text-center">
            <HeaderStat label="Ahora" value={data.dueCount} />
            <HeaderStat label="Errores" value={data.activeErrorCount} />
            <HeaderStat label="Precision" value={`${data.accuracy}%`} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="rounded-lg border border-white/10 bg-black/24 p-5 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Que conviene hacer ahora
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">{recommendedTitle(data, finishedQueue)}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{recommendedDetail(data, finishedQueue)}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {data.dueCount > 0 && !finishedQueue ? (
              <button
                type="button"
                onClick={() => scrollToSection('repaso-activo')}
                className="aulirex-primary-button inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-black transition"
              >
                Empezar repaso
              </button>
            ) : (
              <Link
                to="/ingreso-gendarmeria/practica"
                className="aulirex-primary-button inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-black transition"
              >
                Ir a practicar
              </Link>
            )}
            {data.activeErrorCount > 0 && (
              <button
                type="button"
                onClick={() => scrollToSection('errores-conceptuales')}
                className="inline-flex h-11 items-center justify-center rounded-md border border-rose-300/25 bg-rose-400/10 px-5 text-sm font-black text-rose-100 transition hover:border-rose-200/50"
              >
                Ver errores activos
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <MetricCard
            label="Tema mas fragil"
            value={topTopic ? topTopic.label : 'Sin datos'}
            detail={topTopic ? `${topTopic.wrong} fallos - ${topTopic.accuracy}% precision` : 'Responde preguntas para medirlo'}
            tone="rose"
          />
          <MetricCard
            label="Cola Leitner"
            value={`${data.dueCount}`}
            detail={data.dueCount === 1 ? 'item listo' : 'items listos'}
            tone="sky"
          />
          <MetricCard
            label="Historial"
            value={`${data.totalCorrect}/${data.totalAttempts}`}
            detail="correctas sobre intentos"
            tone="emerald"
          />
        </div>
      </section>

      {current ? (
        <section id="repaso-activo" className="space-y-3 scroll-mt-28">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Sesion de repaso
              </p>
              <h2 className="text-xl font-black text-white">{header}</h2>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800 sm:w-56">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${Math.min(100, (index / Math.max(1, total)) * 100)}%` }}
              />
            </div>
          </div>
          <ItemCard
            key={current.id}
            item={current}
            onAnswered={({ item, correct, given, grade, timeMs }) => {
              setDone((d) => ({
                answered: d.answered + 1,
                correct: d.correct + (correct ? 1 : 0),
              }));
              void recordAttempt({
                item,
                correct,
                givenAnswer: given,
                chosenMisconception: grade.chosenMisconception,
                timeMs,
              }).then(({ progress }) => useAppStore.getState().setProgress(progress));
            }}
            onNext={() => setIndex((i) => i + 1)}
          />
        </section>
      ) : (
        total > 0 && (
          <section className="rounded-lg border border-white/10 bg-slate-900/70 px-6 py-12 text-center shadow-xl shadow-black/20">
            <p className="text-2xl font-black text-white">Repaso completo</p>
            <p className="mt-2 text-slate-400">
              {done.correct} de {done.answered} correctas. Los proximos items
              aparecen cuando vuelva a tocar repasarlos.
            </p>
          </section>
        )
      )}

      <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <WeakTopicsPanel topics={data.weakTopics} />
        <MisconceptionsPanel groups={data.misconceptionGroups} />
      </section>
    </div>
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function recommendedTitle(data: ReviewInsights, finishedQueue: boolean) {
  if (finishedQueue) return 'Cerraste la cola de hoy';
  if (data.dueCount > 0) return 'Empeza por lo vencido';
  if (data.activeErrorCount > 0) return 'No hay cola vencida: mira tus errores';
  if (data.totalAttempts === 0) return 'Todavia no hay diagnostico';
  return 'Estas al dia';
}

function recommendedDetail(data: ReviewInsights, finishedQueue: boolean) {
  if (finishedQueue) {
    return 'Buen cierre: ahora conviene mirar los temas fragiles o sumar una practica corta.';
  }
  if (data.dueCount > 0) {
    return 'La cola Leitner trae primero lo mas fragil y atrasado. Resolverla mantiene fresco lo que ya practicaste.';
  }
  if (data.activeErrorCount > 0) {
    return 'Aunque no haya items vencidos, hay conceptos confundidos que siguen activos hasta que los aciertes.';
  }
  if (data.totalAttempts === 0) {
    return 'Practica algunos items y Aulirex va a detectar que temas conviene reforzar primero.';
  }
  return 'No hay pendientes urgentes. Una practica focalizada mantiene la racha y mejora el diagnostico.';
}

function HeaderStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-24 px-4 py-3">
      <div className="aulirex-gradient-number aulirex-gradient-number--emerald text-xl font-black">{value}</div>
      <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: 'sky' | 'rose' | 'emerald';
}) {
  const toneClass = {
    sky: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-200',
    rose: 'border-rose-300/20 bg-rose-400/10 text-rose-200',
    emerald: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-200',
  }[tone];

  return (
    <div className={`rounded-lg border p-4 shadow-lg shadow-black/15 ${toneClass}`}>
      <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-80">{label}</p>
      <p className="mt-1 line-clamp-2 text-xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  );
}

function WeakTopicsPanel({ topics }: { topics: ReviewTopicInsight[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/68 p-5 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Temas donde mas fallas</h2>
          <p className="mt-1 text-sm text-slate-400">
            Ordenados por errores activos, fallos historicos y repaso pendiente.
          </p>
        </div>
      </div>

      {topics.length === 0 ? (
        <EmptyState
          title="Sin temas fragiles todavia"
          detail="Cuando respondas preguntas, aca aparece el mapa de prioridades."
        />
      ) : (
        <div className="space-y-3">
          {topics.map((topic, position) => (
            <TopicRow key={topic.key} topic={topic} position={position + 1} />
          ))}
        </div>
      )}
    </section>
  );
}

function TopicRow({ topic, position }: { topic: ReviewTopicInsight; position: number }) {
  const severity = Math.min(100, Math.max(8, Math.round(topic.score * 8)));

  return (
    <article className="rounded-lg border border-white/10 bg-black/24 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            #{position} - {subjectLabel(topic.subject)}
          </p>
          <h3 className="mt-1 truncate text-base font-black text-white">{topic.label}</h3>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {humanizeTopic(topic.block)}
          </p>
        </div>
        <span className="shrink-0 rounded-md border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-xs font-black text-rose-200">
          {topic.wrong} fallos
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-rose-400" style={{ width: `${severity}%` }} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <MiniStat label="Precision" value={`${topic.accuracy}%`} />
        <MiniStat label="Activos" value={topic.activeErrors} />
        <MiniStat label="Vencidos" value={topic.dueCards} />
      </div>
    </article>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/60 px-2 py-2">
      <p className="font-black text-white">{value}</p>
      <p className="mt-0.5 uppercase tracking-[0.12em] text-slate-500">{label}</p>
    </div>
  );
}

function MisconceptionsPanel({ groups }: { groups: ReviewMisconceptionGroup[] }) {
  return (
    <section id="errores-conceptuales" className="scroll-mt-28 rounded-lg border border-white/10 bg-black/24 p-5 shadow-xl shadow-black/20">
      <h2 className="text-xl font-black text-white">Errores conceptuales</h2>
      <p className="mt-1 text-sm text-slate-400">
        Son los errores que siguen abiertos. Un acierto posterior los saca de esta lista.
      </p>

      {groups.length === 0 ? (
        <EmptyState
          title="Sin errores activos"
          detail="Cuando falles una pregunta, aca vas a ver el concepto a corregir."
        />
      ) : (
        <div className="mt-4 space-y-3">
          {groups.map((group) => (
            <MisconceptionCard key={group.key} group={group} />
          ))}
        </div>
      )}
    </section>
  );
}

function MisconceptionCard({ group }: { group: ReviewMisconceptionGroup }) {
  return (
    <article className="rounded-lg border border-white/10 bg-slate-950/58 p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-black text-white">{group.name}</h3>
        <span className="shrink-0 rounded-md bg-rose-500/15 px-2 py-1 text-xs font-black text-rose-300">
          {group.totalWrong} fallos
        </span>
      </div>

      {group.remedy && (
        <p className="mt-3 rounded-md border border-green-300/15 bg-green-400/5 px-3 py-2 text-sm leading-6 text-green-100">
          <span className="font-bold">Como corregirlo: </span>
          <MathText>{group.remedy}</MathText>
        </p>
      )}

      <ul className="mt-3 space-y-2">
        {group.entries.slice(0, 4).map((entry) => (
          <li key={entry.itemId} className="text-sm leading-5 text-slate-300">
            <span className="mr-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              {subjectLabel(entry.item.subject)}
            </span>
            <MathText>{entry.item.stem.slice(0, 120)}</MathText>
            {entry.timesWrong > 1 && (
              <span className="ml-1 text-xs font-bold text-rose-400">x{entry.timesWrong}</span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="mt-4 rounded-lg border border-dashed border-white/10 bg-slate-950/45 px-4 py-8 text-center">
      <p className="font-bold text-white">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{detail}</p>
    </div>
  );
}
