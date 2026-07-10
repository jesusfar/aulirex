import { Link, useLocation } from 'react-router-dom';
import { moduleBySlug } from '../../modules/registry';

// Placeholder para módulos aún no construidos. Toma el slug del path actual.
export function ComingSoonPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, '').split('/')[0];
  const mod = moduleBySlug(slug);

  return (
    <div className="mx-auto max-w-xl text-center">
      <span className="text-6xl" aria-hidden>
        {mod?.emoji ?? '🚧'}
      </span>
      <h2 className="mt-4 text-2xl font-black text-white">
        {mod?.name ?? 'Módulo'}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {mod?.tagline}
      </p>
      <p className="mt-6 rounded-lg border border-white/10 bg-slate-900/72 px-5 py-4 text-sm text-slate-300">
        Este módulo está <span className="font-bold text-white">en construcción</span>.
        Volvé pronto.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block text-sm font-semibold text-slate-400 hover:text-slate-200"
      >
        ← Volver a los módulos
      </Link>
    </div>
  );
}
