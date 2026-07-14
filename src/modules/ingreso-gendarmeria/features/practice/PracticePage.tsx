import { useEffect, useMemo, useRef, useState } from 'react';
import type { Institution, Item, Subject, Track } from '../../../../types/content';
import {
  blocksForSubject,
  loadItems,
  subjectsInBank,
  topicsForBlock,
  type ItemFilters,
} from '../../content';
import { ItemCard } from '../../../../components/ItemCard';
import { recordAttempt } from '../../../../lib/storage/progress';
import { buildTestDeck } from '../../../../lib/deck';
import { formatContentLabel } from '../../../../lib/contentLabels';
import { useAppStore } from '../../../../store';

const SUBJECT_LABEL: Record<Subject, string> = {
  introduccion: 'Introduccion',
  biologia: 'Biologia',
  quimica: 'Quimica',
  fisica: 'Fisica',
  matematica: 'Matematica',
  comprension_textos: 'Comprension de textos',
  alfabetizacion: 'Alfabetizacion',
  lengua: 'Lengua',
  historia: 'Historia',
  instruccion_civica: 'Instruccion Civica',
  conocimientos_institucionales: 'Conocimientos institucionales',
};

const SIZES = [10, 20, 50, 100, 250];

export function PracticePage() {
  const [institution, setInstitution] = useState<Institution | ''>('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [block, setBlock] = useState('');
  const [topic, setTopic] = useState('');
  const [track, setTrack] = useState<Track | ''>('');
  const [testSize, setTestSize] = useState(20);

  // deck = null → pantalla de setup; deck = [] tras cargar → test en curso.
  const [deck, setDeck] = useState<Item[] | null>(null);
  const [index, setIndex] = useState(0);
  const [session, setSession] = useState({ answered: 0, correct: 0 });
  const [starting, setStarting] = useState(false);

  const filters: ItemFilters = useMemo(
    () => ({
      institution: institution || undefined,
      subject: subject || undefined,
      block: block || undefined,
      topic: topic || undefined,
      track: track || undefined,
    }),
    [institution, subject, block, topic, track],
  );

  async function startTest() {
    setStarting(true);
    const list = await loadItems(filters);
    setDeck(buildTestDeck(list, testSize));
    setIndex(0);
    setSession({ answered: 0, correct: 0 });
    setStarting(false);
  }

  const current = deck?.[index];
  const sessionAccuracy = session.answered
    ? Math.round((session.correct / session.answered) * 100)
    : 0;

  const blocks = subject ? blocksForSubject(subject) : [];
  const topics = subject && block ? topicsForBlock(subject, block) : [];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="flex flex-col gap-4 rounded-lg border border-white/10 bg-slate-900/68 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
            Practica guiada
          </div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">Mazo de entrenamiento</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Elegí el foco y la cantidad; las preguntas salen al azar y, si vas por
            todo, con al menos una de cada tema.
          </p>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-black/24 text-center">
          <SessionStat label="Preguntas" value={deck ? deck.length : testSize} />
          <SessionStat label="Sesion" value={`${session.correct}/${session.answered}`} />
          <SessionStat label="Precision" value={`${sessionAccuracy}%`} />
        </div>
      </section>

      {deck === null ? (
        <>
          <section className="rounded-lg border border-white/10 bg-black/24 p-4 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-3 text-sm lg:grid-cols-5">
              <Select
                label="Fuerza"
                value={institution}
                onChange={(v) => setInstitution(v as Institution | '')}
                options={[
                  ['', 'Todas'],
                  ['GNA', 'Gendarmería'],
                ]}
              />
              <Select
                label="Materia"
                value={subject}
                onChange={(v) => {
                  setSubject(v as Subject | '');
                  setBlock('');
                  setTopic('');
                }}
                options={[
                  ['', 'Todas'],
                  ...subjectsInBank.map((s) => [s, SUBJECT_LABEL[s]] as [string, string]),
                ]}
              />
              <Select
                label="Track"
                value={track}
                onChange={(v) => setTrack(v as Track | '')}
                options={[
                  ['', 'Ambos'],
                  ['teorico', 'Teorico'],
                  ['practico', 'Practico'],
                ]}
              />
              <Select
                label="Bloque"
                value={block}
                disabled={!subject}
                onChange={(v) => {
                  setBlock(v);
                  setTopic('');
                }}
                options={[
                  ['', 'Todos'],
                  ...blocks.map((b) => [b, formatContentLabel(b)] as [string, string]),
                ]}
              />
              <Select
                label="Tema"
                value={topic}
                disabled={!block}
                onChange={(v) => setTopic(v)}
                options={[
                  ['', 'Todos'],
                  ...topics.map((t) => [t, formatContentLabel(t)] as [string, string]),
                ]}
              />
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-black/24 p-4 backdrop-blur-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Cantidad de preguntas
            </p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setTestSize(n)}
                  className={`h-10 min-w-16 rounded-md border px-4 text-sm font-black transition ${
                    testSize === n
                      ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-100'
                      : 'border-slate-700 bg-slate-950/70 text-slate-300 hover:border-emerald-400/50'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={startTest}
              disabled={starting}
              className="aulirex-primary-button mt-5 h-12 w-full rounded-md text-sm font-black transition disabled:opacity-50 sm:w-auto sm:px-8"
            >
              {starting ? 'Preparando…' : 'Empezar Test'}
            </button>
          </section>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
            <p>
              {current
                ? `Item ${Math.min(index + 1, deck.length)} de ${deck.length}`
                : 'Test finalizado'}
            </p>
            <div className="flex items-center gap-3">
              <div className="hidden h-2 w-40 overflow-hidden rounded-full bg-slate-800 sm:block">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${Math.min(100, (index / deck.length) * 100)}%` }}
                />
              </div>
              <button
                type="button"
                onClick={() => setDeck(null)}
                className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-emerald-400/50"
              >
                Nuevo test
              </button>
            </div>
          </div>

          {current ? (
            <ItemCard
              key={current.id}
              item={current}
              onAnswered={({ item, correct, given, grade, timeMs }) => {
                setSession((s) => ({
                  answered: s.answered + 1,
                  correct: s.correct + (correct ? 1 : 0),
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
          ) : (
            <div className="rounded-lg border border-white/10 bg-slate-900/70 px-6 py-12 text-center shadow-xl shadow-black/20">
              <p className="text-2xl font-black text-white">Test completado</p>
              <p className="mt-2 text-slate-400">
                {session.correct} de {session.answered} correctas ({sessionAccuracy}%).
              </p>
              <button
                type="button"
                onClick={() => setDeck(null)}
                className="aulirex-primary-button mt-5 rounded-md px-5 py-2.5 text-sm font-black transition"
              >
                Nuevo test
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SessionStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-24 px-4 py-3">
      <div className="aulirex-gradient-number aulirex-gradient-number--emerald text-lg font-black">{value}</div>
      <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectedLabel = options.find(([optionValue]) => optionValue === value)?.[1] ?? options[0]?.[1] ?? '';

  useEffect(() => {
    if (!open) return;

    const closeFromOutside = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('keydown', closeWithKeyboard);

    return () => {
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('keydown', closeWithKeyboard);
    };
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="aulirex-control-button flex h-10 w-full items-center justify-between gap-3 rounded-md border border-slate-700 bg-slate-950/80 px-3 text-left text-sm font-semibold text-slate-100 outline-none transition hover:border-emerald-400/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 disabled:opacity-35"
      >
        <span className="min-w-0 truncate">{selectedLabel}</span>
        <span className={`h-2 w-2 flex-none rotate-45 border-b-2 border-r-2 border-emerald-200/80 transition ${open ? '-translate-y-0 rotate-[225deg]' : '-translate-y-0.5'}`} />
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-1 max-h-64 overflow-auto rounded-md border border-emerald-400/45 bg-slate-950 py-1 text-sm shadow-[0_18px_45px_rgba(2,6,23,0.72),0_0_22px_rgba(16, 185, 129,0.2)]"
        >
          {options.map(([optionValue, optionLabel]) => {
            const selected = optionValue === value;

            return (
              <button
                key={optionValue}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(optionValue);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-3 py-2 text-left font-semibold transition ${
                  selected
                    ? 'bg-emerald-400/22 text-emerald-100'
                    : 'text-slate-100 hover:bg-emerald-400/14 hover:text-white'
                }`}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
