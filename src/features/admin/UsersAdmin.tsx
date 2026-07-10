import { useEffect, useState } from 'react';
import { supabase, type Profile } from '../../lib/supabase';
import { useAppStore } from '../../store';

export function UsersAdmin() {
  const [rows, setRows] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const myId = useAppStore((s) => s.session?.user.id);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, role, display_name')
      .order('created_at', { ascending: true });
    if (error) setError(error.message);
    else setRows((data as Profile[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleRole(p: Profile) {
    if (!supabase) return;
    const next = p.role === 'admin' ? 'student' : 'admin';
    setBusyId(p.id);
    const { error } = await supabase.from('profiles').update({ role: next }).eq('id', p.id);
    setBusyId(null);
    if (error) setError(error.message);
    else setRows((rs) => rs.map((r) => (r.id === p.id ? { ...r, role: next } : r)));
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-white">Usuarios</h1>
      <p className="mt-1 text-sm text-slate-400">
        Gestión de roles. Un administrador puede promover o quitar el rol admin.
      </p>

      {error && (
        <p className="mt-4 rounded-md border border-rose-300/25 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-6 text-sm text-slate-400">Cargando…</p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Nombre</th>
                <th className="px-4 py-2.5">Rol</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-2.5 text-slate-200">{p.email}</td>
                  <td className="px-4 py-2.5 text-slate-400">{p.display_name ?? '—'}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                        p.role === 'admin'
                          ? 'bg-sky-400/15 text-sky-200'
                          : 'bg-white/5 text-slate-300'
                      }`}
                    >
                      {p.role}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      disabled={busyId === p.id || p.id === myId}
                      onClick={() => void toggleRole(p)}
                      title={p.id === myId ? 'No podés cambiar tu propio rol' : ''}
                      className="rounded-md border border-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:border-white/25 disabled:opacity-40"
                    >
                      {p.role === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                    No hay usuarios todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
