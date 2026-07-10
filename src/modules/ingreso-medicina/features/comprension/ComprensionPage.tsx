import { useMemo, useState } from 'react';
import { ItemCard } from '../../../../components/ItemCard';
import { readingPassages, type ReadingPassage } from '../../content/comprension';
import { recordAttempt } from '../../../../lib/storage/progress';
import { useAppStore } from '../../../../store';

const GENRE_LABEL: Record<ReadingPassage['genre'], string> = {
  expositivo: 'Expositivo',
  argumentativo: 'Argumentativo',
  divulgacion: 'Divulgación científica',
};

export function ComprensionPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  const passage = useMemo(
    () => readingPassages.find((p) => p.id === openId) ?? null,
    [openId],
  );

  // ---------------- Lista de textos ----------------
  if (!passage) {
    return (
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-black text-white">Comprensión lectora</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Módulo de Alfabetización Académica (UNSa). Leé cada texto y respondé las
          preguntas: idea principal, inferencias, vocabulario, cohesión y tipo de
          secuencia.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {readingPassages.map((p) => {
            const done = p.items.filter((it) => it.id in answered).length;
            const ok = p.items.filter((it) => answered[it.id]).length;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setOpenId(p.id)}
                className="rounded-lg border border-white/10 bg-slate-900/72 p-4 text-left transition hover:border-sky-400/40"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-sky-300">
                  {GENRE_LABEL[p.genre]}
                </span>
                <p className="mt-1 text-base font-black text-white">{p.title}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {p.items.length} preguntas
                  {done > 0 && ` · ${ok}/${done} correctas`}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- Texto + preguntas ----------------
  const paragraphs = passage.text.split('\n\n');
  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => setOpenId(null)}
        className="text-sm font-semibold text-slate-400 hover:text-slate-200"
      >
        ← Todos los textos
      </button>

      <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-sky-300">
        {GENRE_LABEL[passage.genre]}
      </span>
      <h2 className="text-2xl font-black text-white">{passage.title}</h2>

      <article className="mt-4 space-y-3 rounded-lg border border-white/10 bg-slate-900/72 p-5 text-[15px] leading-7 text-slate-200">
        {paragraphs.map((par, i) => (
          <p key={i}>{par}</p>
        ))}
      </article>

      <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
        Preguntas
      </p>
      <div className="mt-3 space-y-4">
        {passage.items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onAnswered={({ item: it, correct, given, grade, timeMs }) => {
              setAnswered((prev) => ({ ...prev, [it.id]: correct }));
              void recordAttempt({
                item: it,
                correct,
                givenAnswer: given,
                chosenMisconception: grade.chosenMisconception,
                timeMs,
              }).then(({ progress }) =>
                useAppStore.getState().setProgress(progress),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
