import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemCard } from '../../components/ItemCard';
import { loadItemMap } from '../../content';
import { getReviewCards, recordAttempt } from '../../lib/storage/progress';
import { dueQueue } from '../../lib/spaced-repetition/scheduler';
import { useAppStore } from '../../store';
import type { Item } from '../../types/content';

export function ReviewPage() {
  const [queue, setQueue] = useState<Item[] | null>(null);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState({ answered: 0, correct: 0 });

  useEffect(() => {
    Promise.all([getReviewCards(), loadItemMap()]).then(([cards, byId]) => {
      const items = dueQueue(cards)
        .map((c) => byId.get(c.itemId))
        .filter((i): i is Item => Boolean(i));
      setQueue(items);
    });
  }, []);

  const current = queue?.[index];
  const total = queue?.length ?? 0;

  const header = useMemo(
    () =>
      total === 0
        ? 'No hay ítems para repasar ahora'
        : `Repaso ${Math.min(index + 1, total)} de ${total} · ${done.correct}/${done.answered} correctas`,
    [index, total, done],
  );

  if (queue === null) {
    return <p className="text-slate-400">Cargando repaso…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-white">Repaso espaciado</h2>
        <p className="mt-1 text-sm text-slate-400">{header}</p>
      </div>

      {total === 0 && (
        <div className="rounded-lg border border-white/10 bg-slate-900/70 px-6 py-12 text-center">
          <p className="text-lg font-bold text-white">Estás al día 🎉</p>
          <p className="mt-2 text-slate-400">
            El repaso se llena con los ítems que vas practicando; cada uno vuelve
            cuando toca según cómo te fue.
          </p>
          <Link
            to="/practica"
            className="aulirex-primary-button mt-5 inline-block rounded-md px-5 py-2.5 text-sm font-black"
          >
            Ir a practicar
          </Link>
        </div>
      )}

      {current ? (
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
      ) : (
        total > 0 && (
          <div className="rounded-lg border border-white/10 bg-slate-900/70 px-6 py-12 text-center">
            <p className="text-2xl font-black text-white">Repaso completo</p>
            <p className="mt-2 text-slate-400">
              {done.correct} de {done.answered} correctas. Volvé mañana por los
              próximos.
            </p>
          </div>
        )
      )}
    </div>
  );
}
