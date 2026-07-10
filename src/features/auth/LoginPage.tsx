import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPassword, signUpWithPassword } from '../../lib/auth';
import { isSupabaseConfigured } from '../../lib/supabase';

interface LoginPageProps {
  // Texto opcional que explica por qué se pide iniciar sesión (p.ej. admin).
  reason?: string;
}

export function LoginPage({ reason }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-2xl font-black text-white">Cuentas no disponibles</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Supabase no está configurado en esta instalación. La app funciona igual
          de forma local; las cuentas y el modo admin se habilitan cuando se
          configuran las variables de entorno.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-slate-400 hover:text-slate-200">
          ← Volver
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === 'login') {
        await signInWithPassword(email.trim(), password);
      } else {
        await signUpWithPassword(email.trim(), password, displayName.trim() || undefined);
        setInfo('Cuenta creada. Si tu proyecto pide confirmar el email, revisá tu correo antes de entrar.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo completar la operación.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-2xl font-black text-white">
        {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
      </h2>
      {reason && <p className="mt-2 text-sm leading-6 text-slate-400">{reason}</p>}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        {mode === 'signup' && (
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Nombre (opcional)"
            className="h-11 w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          />
        )}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="h-11 w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          className="h-11 w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        />

        {error && (
          <p className="rounded-md border border-rose-300/25 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </p>
        )}
        {info && (
          <p className="rounded-md border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="aulirex-primary-button h-11 w-full rounded-md text-sm font-black transition disabled:opacity-50"
        >
          {busy ? 'Procesando…' : mode === 'login' ? 'Entrar' : 'Registrarme'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode((m) => (m === 'login' ? 'signup' : 'login'));
          setError(null);
          setInfo(null);
        }}
        className="mt-4 text-sm font-semibold text-sky-300 hover:text-sky-200"
      >
        {mode === 'login' ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Iniciá sesión'}
      </button>
    </div>
  );
}
