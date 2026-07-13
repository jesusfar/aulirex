import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MODULES, ACCENT_CLASSES } from '../../modules/registry';

// Inicio de la plataforma: el selector VHS (escena Three.js en /vhs/index.html)
// a pantalla completa. Si el dispositivo no soporta WebGL, cae a la grilla de
// tarjetas simple.
export function InicioPage() {
  const [noWebGL, setNoWebGL] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      if (!(c.getContext('webgl2') || c.getContext('webgl'))) setNoWebGL(true);
    } catch {
      setNoWebGL(true);
    }
  }, []);

  if (noWebGL) return <ModuleCards />;

  return (
    <iframe
      title="Aulirex — selector de módulos"
      src="/vhs/index.html"
      allow="fullscreen"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 0,
        background: '#050b16',
        zIndex: 100,
      }}
    />
  );
}

// Fallback: grilla de tarjetas de módulos (sin WebGL).
function ModuleCards() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white sm:text-4xl">Elegí tu módulo</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
          Aulirex es una plataforma de entrenamiento por módulos. Seleccioná en qué
          querés prepararte y entrá a su sección.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MODULES.map((m) => {
          const accent = ACCENT_CLASSES[m.accent] ?? ACCENT_CLASSES.sky;
          const available = m.status === 'available';
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl" aria-hidden>{m.emoji}</span>
                {available ? (
                  <span className={`text-xs font-bold uppercase tracking-wide ${accent.text}`}>Disponible</span>
                ) : (
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-400">Próximamente</span>
                )}
              </div>
              <p className="mt-4 text-lg font-black text-white">{m.name}</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">{m.tagline}</p>
              {available && <p className={`mt-4 text-sm font-bold ${accent.text}`}>Entrar →</p>}
            </>
          );
          const cardBase = 'block rounded-xl border border-white/10 bg-slate-900/72 p-5 text-left shadow-xl transition';
          return available ? (
            <Link key={m.slug} to={`/${m.slug}`} className={`${cardBase} ${accent.ring} ${accent.glow} hover:bg-slate-900`}>
              {inner}
            </Link>
          ) : (
            <div key={m.slug} aria-disabled className={`${cardBase} cursor-not-allowed opacity-60`}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
