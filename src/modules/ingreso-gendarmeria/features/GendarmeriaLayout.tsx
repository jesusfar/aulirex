import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { isInCrt, ejectFromCrt } from '../../../lib/embed';
import { useModuleDatabase } from '../../../lib/storage/db';

const SLUG = '/ingreso-gendarmeria';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `aulirex-header-tab inline-flex min-h-9 min-w-0 items-center justify-center rounded-md px-1.5 py-1.5 text-[11px] font-semibold leading-tight transition-all duration-200 sm:min-h-10 sm:px-3 sm:py-2 sm:text-sm md:grow md:shrink-0 ${
    isActive ? 'aulirex-header-tab--active' : 'text-slate-300'
  }`;

export function GendarmeriaLayout() {
  const { pathname } = useLocation();
  const embedded = isInCrt();

  // El progreso (XP, racha, repaso) de Gendarmería vive en su propia base Dexie,
  // separada de Medicina. Se activa en render (antes de que monten las páginas
  // hijas y corran sus efectos) para que siempre consulten la base correcta.
  useModuleDatabase('ingreso-gendarmeria');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Tiñe de verde el fondo de <html> (overscroll/bordes) mientras el módulo está
  // montado; al salir se restaura el azul por defecto de la plataforma.
  useEffect(() => {
    document.documentElement.classList.add('gendarmeria-bg');
    return () => document.documentElement.classList.remove('gendarmeria-bg');
  }, []);

  // Efecto de sangre en la punta del sable al mantener presionado (click).
  useEffect(() => {
    const show = () => document.documentElement.classList.add('sabre-clicked');
    const hide = () => document.documentElement.classList.remove('sabre-clicked');
    window.addEventListener('pointerdown', show);
    window.addEventListener('pointerup', hide);
    window.addEventListener('pointercancel', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointerdown', show);
      window.removeEventListener('pointerup', hide);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('blur', hide);
      hide();
    };
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className="theme-gendarmeria gendarmeria-shell relative min-h-screen overflow-x-clip text-slate-100">
      <img src="/cursors/sable-cursor.png" alt="" aria-hidden="true" className="aulirex-cursor-preload" />
      <img src="/cursors/sable-cursor-blood.png" alt="" aria-hidden="true" className="aulirex-cursor-preload" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.22),transparent_58%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/78 px-2.5 py-2 backdrop-blur-xl sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {embedded ? (
            <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 md:w-auto md:flex-none md:shrink-0">
              <img
                src="/brand/aulirex-mark.png"
                alt="Aulirex"
                className="size-9 rounded-full object-contain shadow-[0_0_22px_rgba(16,185,129,0.32)] sm:size-12"
              />
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:block">
                <img
                  src="/brand/aulirex-wordmark.png?v=corrected-20260703"
                  alt="Aulirex"
                  className="h-5 w-auto max-w-[7.5rem] object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] sm:h-8 sm:max-w-[10.5rem]"
                />
                <button
                  type="button"
                  onClick={ejectFromCrt}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-emerald-200 transition hover:bg-emerald-400/20 sm:text-[11px] md:mt-1.5"
                >
                  ▲ Expulsar
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/"
              className="flex w-full min-w-0 items-center gap-2 sm:gap-3 md:w-auto md:flex-none md:shrink-0"
            >
              <img
                src="/brand/aulirex-mark.png"
                alt="Aulirex"
                className="size-9 rounded-full object-contain shadow-[0_0_22px_rgba(16,185,129,0.32)] sm:size-12"
              />
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:block">
                <img
                  src="/brand/aulirex-wordmark.png?v=corrected-20260703"
                  alt="Aulirex"
                  className="h-5 w-auto max-w-[7.5rem] object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] sm:h-8 sm:max-w-[10.5rem]"
                />
                <span className="hidden text-xs font-medium text-slate-400 sm:block">
                  Ingreso a Gendarmería Nacional
                </span>
              </div>
            </Link>
          )}

          <div className="order-3 flex w-full min-w-0 flex-col gap-1.5 md:order-none md:w-auto md:flex-1 md:gap-2">
            <nav
              aria-label="Navegacion principal"
              className="grid w-full min-w-0 grid-cols-4 gap-1 rounded-lg border border-white/10 bg-black/24 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [scrollbar-width:none] md:flex md:overflow-x-auto md:overscroll-x-contain md:whitespace-nowrap"
            >
              {!embedded && (
                <NavLink to="/" end className={linkClass}>
                  ← Módulos
                </NavLink>
              )}
              <NavLink to={SLUG} end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to={`${SLUG}/practica`} className={linkClass}>
                Práctica
              </NavLink>
              <NavLink to={`${SLUG}/repaso`} className={linkClass}>
                Repaso
              </NavLink>
              <NavLink to={`${SLUG}/comprension`} className={linkClass}>
                Comprensión
              </NavLink>
              <NavLink to={`${SLUG}/institucional`} className={linkClass}>
                Institucional
              </NavLink>
              <NavLink to={`${SLUG}/requisitos`} className={linkClass}>
                Requisitos
              </NavLink>
              <NavLink to={`${SLUG}/formulario`} className={linkClass}>
                Fórmulas
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

