import { useEffect, useRef } from 'react';

// Visor 3D de moléculas (3Dmol.js, cargado en forma dinámica → chunk aparte).
// Ball-and-stick con colores CPK por elemento (C gris, O rojo, N azul, H blanco).
// Interactivo: arrastrar para rotar, rueda para zoom.
export function MoleculeViewer({
  molBlock,
  style = 'stick',
  spin = false,
  height = 320,
}: {
  molBlock: string;
  style?: 'stick' | 'sphere';
  spin?: boolean;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let viewer: { clear?: () => void } | null = null;

    (async () => {
      const mod = await import('3dmol');
      const $3Dmol = (mod as unknown as { default?: unknown }).default ?? mod;
      if (cancelled || !ref.current) return;
      ref.current.innerHTML = '';
      const create = ($3Dmol as { createViewer: (el: HTMLElement, cfg: object) => any }).createViewer;
      const v = create(ref.current, { backgroundColor: '#0b1220' });
      viewer = v;
      v.addModel(molBlock, 'mol');
      if (style === 'sphere') {
        v.setStyle({}, { sphere: { scale: 0.32 } });
      } else {
        v.setStyle({}, { stick: { radius: 0.14 }, sphere: { scale: 0.28 } });
      }
      v.zoomTo();
      v.render();
      v.spin(spin ? 'y' : false);
    })();

    return () => {
      cancelled = true;
      try {
        viewer?.clear?.();
      } catch {
        /* noop */
      }
    };
  }, [molBlock, style, spin]);

  return (
    <div
      ref={ref}
      style={{ height, width: '100%', position: 'relative' }}
      className="overflow-hidden rounded-lg border border-white/10 bg-slate-950"
    />
  );
}
