import { Link } from 'react-router-dom';
import { institutionalCards } from '../../content/institucional';

export function InstitucionalPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-lg border border-white/10 bg-slate-900/68 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <div className="mb-3 inline-flex rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
          Conocimientos institucionales
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          La Gendarmería Nacional
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Nociones básicas de la fuerza según su Estatuto: qué es, cuál es su
          misión, qué funciones cumple y de quién depende. Estos temas también se
          evalúan en la Práctica y el Repaso.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {institutionalCards.map((card) => (
          <article
            key={card.id}
            className="rounded-lg border border-white/10 bg-black/24 p-5 backdrop-blur-xl transition hover:border-emerald-400/40"
          >
            <h2 className="mb-2 text-lg font-black text-emerald-200">
              {card.title}
            </h2>
            <div className="space-y-2 text-sm leading-6 text-slate-300">
              {card.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/ingreso-gendarmeria/practica"
          className="aulirex-primary-button rounded-md px-5 py-2.5 text-sm font-black transition"
        >
          Practicar estos temas
        </Link>
        <Link
          to="/ingreso-gendarmeria/requisitos"
          className="rounded-md border border-emerald-400/40 px-5 py-2.5 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/10"
        >
          Ver requisitos de ingreso
        </Link>
      </div>
    </div>
  );
}
