import { useMemo, useState, type ReactNode } from 'react';
import type { Item } from '../types/content';
import { gradeItem, type GivenAnswer, type GradeResult } from '../lib/scoring';
import { shuffle } from '../lib/deck';
import { misconceptionById } from '../content/misconceptions';
import { MathText } from './MathText';
import { ProcessMapView } from './ProcessMapView';
import { processMapById } from '../content/process-maps';
import { FormulaCard } from './FormulaCard';
import { formulaById } from '../content/formulas';

interface ItemCardProps {
  item: Item;
  onAnswered?: (result: {
    item: Item;
    correct: boolean;
    given: GivenAnswer;
    grade: GradeResult;
    timeMs: number;
  }) => void;
  onNext?: () => void;
}

const FREQ_LABEL: Record<Item['frequency'], string> = {
  alta: 'Muy tomado',
  media: 'Frecuente',
  baja: 'Ocasional',
};

export function ItemCard({ item, onAnswered, onNext }: ItemCardProps) {
  const startedAt = useMemo(() => Date.now(), [item.id]);
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [multi, setMulti] = useState<Set<string>>(new Set());
  const [numeric, setNumeric] = useState('');
  // ordering: orden propuesto (arranca barajado). matching: izq→der.
  // tf_series: V/F por afirmación (null = sin responder).
  const [order, setOrder] = useState<string[]>(() => shuffle(item.steps ?? []));
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [tf, setTf] = useState<(boolean | null)[]>(() =>
    (item.statements ?? []).map(() => null),
  );
  const [result, setResult] = useState<GradeResult | null>(null);
  const answered = result !== null;

  // Opciones (derecha) barajadas para matching, estables por ítem.
  const matchRights = useMemo(
    () => shuffle((item.pairs ?? []).map((p) => p[1])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.id],
  );

  function moveStep(i: number, delta: number) {
    setOrder((prev) => {
      const j = i + delta;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function buildGiven(): GivenAnswer | null {
    switch (item.type) {
      case 'single_choice':
      case 'true_false':
        return choiceId ? { kind: 'choice', choiceId } : null;
      case 'multiple_response':
        return multi.size > 0 ? { kind: 'multi', choiceIds: [...multi] } : null;
      case 'numeric': {
        const value = parseFloat(numeric.replace(',', '.'));
        return Number.isNaN(value) ? null : { kind: 'numeric', value };
      }
      case 'ordering':
        return order.length > 0 ? { kind: 'ordering', order } : null;
      case 'matching':
        return Object.keys(assignments).length === (item.pairs?.length ?? 0)
          ? { kind: 'matching', assignments }
          : null;
      case 'true_false_series':
        return tf.every((v) => v !== null)
          ? { kind: 'tf_series', answers: tf as boolean[] }
          : null;
      default:
        return null;
    }
  }

  function handleCheck() {
    const given = buildGiven();
    if (!given) return;
    const grade = gradeItem(item, given);
    setResult(grade);
    onAnswered?.({
      item,
      correct: grade.correct,
      given,
      grade,
      timeMs: Date.now() - startedAt,
    });
  }

  const canCheck = !answered && buildGiven() !== null;

  const isSupported =
    item.type === 'single_choice' ||
    item.type === 'true_false' ||
    item.type === 'multiple_response' ||
    item.type === 'numeric' ||
    item.type === 'ordering' ||
    item.type === 'matching' ||
    item.type === 'true_false_series';

  const misconception = result?.chosenMisconception
    ? misconceptionById.get(result.chosenMisconception)
    : undefined;

  // Mapa de proceso del ítem o, si no tiene, el de la misconcepción elegida.
  const processMap = answered
    ? processMapById.get(item.processMapId ?? '') ??
      (misconception?.processMapId
        ? processMapById.get(misconception.processMapId)
        : undefined)
    : undefined;

  // Fórmulas relevantes al ítem (para reforzar la proporcionalidad en el feedback).
  const formulas = answered
    ? (item.formulaIds ?? [])
        .map((id) => formulaById.get(id))
        .filter((f) => f !== undefined)
    : [];

  return (
    <article className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-slate-900/82 text-left shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="border-b border-white/10 bg-black/20 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge>{item.subject.replaceAll('_', ' ')}</Badge>
          <Badge>{item.topic.replaceAll('_', ' ')}</Badge>
          <Badge>{item.track}</Badge>
          <Badge tone="freq">{FREQ_LABEL[item.frequency]}</Badge>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xl font-bold leading-8 text-white">
          <MathText>{item.stem}</MathText>
        </p>

        {item.media
          ?.filter((m) => m.kind === 'image')
          .map((m) => (
            <figure
              key={m.src}
              className="mt-4 flex justify-center rounded-lg border border-white/10 bg-white p-3"
            >
              <img
                src={m.src}
                alt="Figura de la pregunta"
                loading="lazy"
                className="max-h-80 w-auto object-contain"
              />
            </figure>
          ))}

        {!isSupported && (
          <p className="mt-4 rounded-md border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            Este tipo de item ({item.type}) se implementa en una fase posterior.
          </p>
        )}

        {(item.type === 'single_choice' || item.type === 'true_false') && (
          <ul className="mt-5 space-y-3">
            {item.choices?.map((c, idx) => (
              <li key={c.id}>
                <button
                  type="button"
                  disabled={answered}
                  onClick={() => setChoiceId(c.id)}
                  className={optionClass(
                    choiceId === c.id,
                    answered,
                    c.correct,
                    choiceId === c.id,
                  )}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-xs font-black text-slate-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-6">
                    <MathText>{c.text}</MathText>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {item.type === 'multiple_response' && (
          <ul className="mt-5 space-y-3">
            {item.choices?.map((c) => {
              const picked = multi.has(c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    disabled={answered}
                    onClick={() =>
                      setMulti((prev) => {
                        const next = new Set(prev);
                        next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                        return next;
                      })
                    }
                    className={optionClass(picked, answered, c.correct, picked)}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-xs font-black text-slate-300">
                      {picked ? 'OK' : '--'}
                    </span>
                    <span className="leading-6">
                      <MathText>{c.text}</MathText>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {item.type === 'numeric' && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <input
              type="text"
              inputMode="decimal"
              disabled={answered}
              value={numeric}
              onChange={(e) => setNumeric(e.target.value)}
              placeholder="Tu respuesta"
              className="h-11 w-44 rounded-md border border-slate-700 bg-slate-950/80 px-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 disabled:opacity-50"
            />
            {item.numeric?.unit && (
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-slate-300">
                {item.numeric.unit}
              </span>
            )}
          </div>
        )}

        {item.type === 'ordering' && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              Ordená con las flechas
            </p>
            <ol className="space-y-2">
              {order.map((step, i) => {
                const ok = answered && item.steps?.[i] === step;
                return (
                  <li
                    key={step}
                    className={`flex items-center gap-3 rounded-md border px-3 py-2 ${
                      answered
                        ? ok
                          ? 'border-emerald-500/50 bg-emerald-400/10'
                          : 'border-rose-500/40 bg-rose-400/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-sky-500/20 text-xs font-black text-sky-100">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm leading-6 text-slate-100">
                      <MathText>{step}</MathText>
                    </span>
                    {!answered && (
                      <span className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          aria-label="Subir"
                          disabled={i === 0}
                          onClick={() => moveStep(i, -1)}
                          className="grid size-7 place-items-center rounded border border-white/10 text-slate-300 transition hover:border-sky-400/60 disabled:opacity-25"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          aria-label="Bajar"
                          disabled={i === order.length - 1}
                          onClick={() => moveStep(i, 1)}
                          className="grid size-7 place-items-center rounded border border-white/10 text-slate-300 transition hover:border-sky-400/60 disabled:opacity-25"
                        >
                          ↓
                        </button>
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {item.type === 'matching' && (
          <ul className="mt-5 space-y-2">
            {(item.pairs ?? []).map(([left, right]) => {
              const chosen = assignments[left];
              const ok = answered && chosen === right;
              return (
                <li
                  key={left}
                  className={`flex flex-col gap-2 rounded-md border px-3 py-2 sm:flex-row sm:items-center ${
                    answered
                      ? ok
                        ? 'border-emerald-500/50 bg-emerald-400/10'
                        : 'border-rose-500/40 bg-rose-400/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <span className="flex-1 text-sm font-semibold text-slate-100">
                    <MathText>{left}</MathText>
                  </span>
                  <span className="hidden text-slate-500 sm:inline">→</span>
                  <select
                    disabled={answered}
                    value={chosen ?? ''}
                    onChange={(e) =>
                      setAssignments((a) => ({ ...a, [left]: e.target.value }))
                    }
                    className="h-9 rounded-md border border-slate-700 bg-slate-950/80 px-2 text-sm text-slate-100 outline-none focus:border-sky-400 disabled:opacity-70 sm:w-64"
                  >
                    <option value="" disabled>
                      Elegí…
                    </option>
                    {matchRights.map((r) => (
                      <option key={r} value={r} className="text-black">
                        {r}
                      </option>
                    ))}
                  </select>
                  {answered && !ok && (
                    <span className="text-xs font-bold text-emerald-300">✓ {right}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {item.type === 'true_false_series' && (
          <ul className="mt-5 space-y-2">
            {(item.statements ?? []).map((s, i) => {
              const val = tf[i];
              const ok = answered && val === s.correct;
              return (
                <li
                  key={i}
                  className={`flex items-center gap-3 rounded-md border px-3 py-2 ${
                    answered
                      ? ok
                        ? 'border-emerald-500/50 bg-emerald-400/10'
                        : 'border-rose-500/40 bg-rose-400/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <span className="flex-1 text-sm leading-6 text-slate-100">
                    <MathText>{s.text}</MathText>
                  </span>
                  <span className="flex shrink-0 gap-1">
                    {([['V', true], ['F', false]] as const).map(([letter, bv]) => (
                      <button
                        key={letter}
                        type="button"
                        disabled={answered}
                        onClick={() =>
                          setTf((prev) => {
                            const n = [...prev];
                            n[i] = bv;
                            return n;
                          })
                        }
                        className={`grid size-8 place-items-center rounded-md border text-sm font-black transition ${
                          val === bv
                            ? 'border-sky-400 bg-sky-400/20 text-sky-100'
                            : 'border-white/10 text-slate-300 hover:border-sky-400/50'
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </span>
                  {answered && (
                    <span className="w-4 shrink-0 text-xs font-black text-emerald-300">
                      {s.correct ? 'V' : 'F'}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {item.hint && !answered && (
          <p className="mt-4 rounded-md border border-sky-300/15 bg-sky-400/8 px-4 py-3 text-sm leading-6 text-sky-100">
            <span className="font-bold text-sky-300">Pista:</span> {item.hint}
          </p>
        )}

        {answered && result && (
          <div
            className={`mt-5 rounded-lg border p-4 text-sm leading-6 ${
              result.correct
                ? 'border-emerald-200/45 bg-emerald-300/14 text-emerald-50 shadow-[0_0_28px_rgba(52,211,153,0.18)]'
                : 'border-rose-300/25 bg-rose-400/10 text-rose-50'
            }`}
          >
            <p className="mb-2 text-base font-black text-white">
              {result.correct ? 'Correcto' : 'Incorrecto'}
            </p>
            {result.feedback && (
              <p className="mb-3">
                <MathText>{result.feedback}</MathText>
              </p>
            )}
            {misconception && (
              <p className="mb-3 rounded-md bg-black/18 p-3">
                <span className="font-bold">Confusion frecuente:</span>{' '}
                {misconception.name}. {misconception.remedy}
              </p>
            )}
            <p>
              <span className="font-bold">Explicacion:</span>{' '}
              <MathText>{item.explanation}</MathText>
            </p>
            {processMap && <ProcessMapView map={processMap} />}
            {formulas.length > 0 && (
              <div className="mt-3 space-y-2">
                {formulas.map((f) => (
                  <FormulaCard key={f.id} formula={f} compact />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          {!answered ? (
            <button
              type="button"
              disabled={!canCheck}
              onClick={handleCheck}
              className="aulirex-primary-button rounded-md px-5 py-2.5 text-sm font-black transition"
            >
              Comprobar
            </button>
          ) : (
            onNext && (
              <button
                type="button"
                onClick={onNext}
                className="aulirex-primary-button rounded-md px-5 py-2.5 text-sm font-black transition"
              >
                Siguiente
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
}

function optionClass(
  selected: boolean,
  answered: boolean,
  correct: boolean,
  wasPicked: boolean,
): string {
  const base =
    'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-slate-100 transition disabled:cursor-default';
  if (!answered) {
    return `${base} ${
      selected
        ? 'border-sky-300/70 bg-sky-400/12 shadow-[0_0_0_1px_rgba(56,189,248,0.16)]'
        : 'border-slate-700 bg-slate-950/45 hover:border-sky-400/70 hover:bg-slate-900'
    }`;
  }
  if (correct) {
    return `${base} border-emerald-200/70 bg-emerald-300/14 text-emerald-50 shadow-[0_0_24px_rgba(52,211,153,0.22)]`;
  }
  if (wasPicked) {
    return `${base} border-rose-300/60 bg-rose-400/12`;
  }
  return `${base} border-slate-800 bg-slate-950/35 text-slate-500 opacity-70`;
}

function Badge({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: 'freq';
}) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-bold capitalize ${
        tone === 'freq'
          ? 'border-amber-300/20 bg-amber-400/10 text-amber-200'
          : 'border-sky-300/15 bg-slate-800 text-slate-300'
      }`}
    >
      {children}
    </span>
  );
}
