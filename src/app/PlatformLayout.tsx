import { Link, Outlet } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabase';
import { useAppStore, useIsAdmin } from '../store';
import { signOut } from '../lib/auth';

// Shell neutro de la plataforma: se usa en la pantalla de Inicio y en los
// placeholders de módulos. No incluye la nav ni la ambientación (bisturí/ECG)
// del módulo de Medicina.
export function PlatformLayout() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.22),transparent_58%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/78 px-3 py-2 backdrop-blur-xl sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src="/brand/aulirex-mark.png"
              alt="Aulirex"
              className="size-10 rounded-full object-contain shadow-[0_0_22px_rgba(34,211,238,0.32)] sm:size-12"
            />
            <img
              src="/brand/aulirex-wordmark.png?v=corrected-20260703"
              alt="Aulirex"
              className="h-6 w-auto max-w-[8.25rem] object-contain drop-shadow-[0_0_10px_rgba(125,211,252,0.35)] sm:h-8 sm:max-w-[10.5rem]"
            />
          </Link>
          <AccountControls />
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <Outlet />
      </main>
    </div>
  );
}

// Controles de cuenta del header. Solo se muestran si Supabase está configurado;
// si no, la app es local-only y no hay nada que mostrar.
function AccountControls() {
  const session = useAppStore((s) => s.session);
  const isAdmin = useIsAdmin();
  if (!isSupabaseConfigured) return null;
  return (
    <div className="ml-auto flex items-center gap-3 text-sm">
      {isAdmin && (
        <Link to="/admin" className="font-semibold text-sky-300 hover:text-sky-200">
          Admin
        </Link>
      )}
      {session ? (
        <button
          type="button"
          onClick={() => void signOut()}
          className="rounded-md border border-white/10 px-3 py-1.5 font-semibold text-slate-300 hover:border-white/25"
        >
          Salir
        </button>
      ) : (
        <Link
          to="/login"
          className="rounded-md border border-white/10 px-3 py-1.5 font-semibold text-slate-300 hover:border-white/25"
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
}
