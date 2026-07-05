import { useMemo, useState, type ReactNode } from 'react';
import type { Item } from '../types/content';
import { gradeItem, type GivenAnswer, type GradeResult } from '../lib/scoring';
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
  const [result, setResult] = useState<GradeResult | null>(null);
  const answered = result !== null;

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

  const canCheck =
    !answered &&
    ((item.type === 'numeric' && numeric.trim() !== '') ||
      (item.type === 'multiple_response' && multi.size > 0) ||
      ((item.type === 'single_choice' || item.type === 'true_false') &&
        choiceId !== null));

  const isSupported =
    item.type === 'single_choice' ||
    item.type === 'true_false' ||
    item.type === 'multiple_response' ||
    item.type === 'numeric';

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
