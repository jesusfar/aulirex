import { useEffect, useRef } from 'react';

type ViewerLike = {
  addModel: (molBlock: string, format: string) => void;
  clear?: () => void;
  render: () => void;
  setStyle: (selection: object, style: object) => void;
  spin: (axis: 'x' | 'y' | 'z' | false) => void;
  zoomTo: () => void;
};

const ELEMENT_STYLES = [
  { elem: 'C', color: '#3f3f3f', stickRadius: 0.14, stickScale: 0.31, sphereScale: 0.34 },
  { elem: 'H', color: '#ffffff', stickRadius: 0.1, stickScale: 0.2, sphereScale: 0.24 },
  { elem: 'O', color: '#ff0d0d', stickRadius: 0.14, stickScale: 0.31, sphereScale: 0.34 },
  { elem: 'N', color: '#3050f8', stickRadius: 0.14, stickScale: 0.31, sphereScale: 0.34 },
];

function applyCpkStyle(viewer: ViewerLike, style: 'stick' | 'sphere') {
  if (style === 'sphere') {
    viewer.setStyle({}, { sphere: { scale: 0.32 } });
    for (const element of ELEMENT_STYLES) {
      viewer.setStyle(
        { elem: element.elem },
        { sphere: { scale: element.sphereScale, color: element.color } },
      );
    }
    return;
  }

  viewer.setStyle({}, { stick: { radius: 0.14 }, sphere: { scale: 0.28 } });
  for (const element of ELEMENT_STYLES) {
    viewer.setStyle(
      { elem: element.elem },
      {
        stick: { radius: element.stickRadius, color: element.color },
        sphere: { scale: element.stickScale, color: element.color },
      },
    );
  }
}

// Visor 3D de moleculas (3Dmol.js, cargado en forma dinamica -> chunk aparte).
// Usa CPK/Jmol: H blanco, C gris oscuro/negro, O rojo, N azul.
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
      const create = ($3Dmol as { createViewer: (el: HTMLElement, cfg: object) => ViewerLike }).createViewer;
      const v = create(ref.current, { backgroundColor: '#0b1220' });
      viewer = v;
      v.addModel(molBlock, 'mol');
      applyCpkStyle(v, style);
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
