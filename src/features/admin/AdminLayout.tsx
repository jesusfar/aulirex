import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAppStore, useIsAdmin } from '../../store';
import { isSupabaseConfigured } from '../../lib/supabase';
import { signOut } from '../../lib/auth';
import { LoginPage } from '../auth/LoginPage';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-9 items-center rounded-md px-3 py-1.5 text-sm font-semibold transition ${
    isActive ? 'bg-sky-400/15 text-sky-100' : 'text-slate-300 hover:text-white'
  }`;

// Layout + gate del modo admin. Protege TODAS las rutas hijas: sin sesión →
// login; con sesión sin rol admin → sin permisos.
export function AdminLayout() {
  const authReady = useAppStore((s) => s.authReady);
  const session = useAppStore((s) => s.session);
  const profile = useAppStore((s) => s.profile);
  const isAdmin = useIsAdmin();

  let gate: React.ReactNode = null;
  if (!isSupabaseConfigured) {
    gate = <Notice title="Modo admin no disponible" body="Supabase no está configurado en esta instalación." />;
  } else if (!authReady) {
    gate = <Notice title="Cargando…" body="Verificando tu sesión." />;
  } else if (!session) {
    gate = <LoginPage reason="El modo admin requiere iniciar sesión." />;
  } else if (!isAdmin) {
    gate = (
      <Notice
        title="Sin permisos"
        body={`Tu cuenta (${profile?.email ?? ''}) no tiene rol de administrador.`}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <Link to="/" className="text-sm font-black text-white">
            Aulirex <span className="text-slate-500">/ admin</span>
          </Link>
          {!gate && (
            <nav className="flex items-center gap-1">
              <NavLink to="/admin/preguntas" className={linkClass}>
                Preguntas
              </NavLink>
              <NavLink to="/admin/usuarios" className={linkClass}>
                Usuarios
              </NavLink>
            </nav>
          )}
          <div className="ml-auto flex items-center gap-3 text-xs text-slate-400">
            {session && <span className="hidden sm:inline">{profile?.email}</span>}
            {session && (
              <button
                type="button"
                onClick={() => void signOut()}
                className="rounded-md border border-white/10 px-2.5 py-1 font-semibold text-slate-300 hover:border-white/25"
              >
                Salir
              </button>
            )}
            <Link to="/" className="font-semibold text-slate-300 hover:text-white">
              ← Módulos
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {gate ?? <Outlet />}
      </main>
    </div>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-md text-center">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
    </div>
  );
}
