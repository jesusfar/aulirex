// Registro de módulos de la plataforma Aulirex. Fuente única para la pantalla
// de Inicio y el ruteo. Agregar un módulo nuevo = agregar una entrada acá (y su
// subtree de rutas en src/app/router.tsx cuando esté disponible).

export interface PlatformModule {
  slug: string; // segmento de URL, p.ej. 'ingreso-medicina'
  name: string; // 'Ingreso a Medicina'
  tagline: string; // descripción corta
  status: 'available' | 'coming_soon';
  accent: string; // color Tailwind base (sky, emerald, rose, violet…)
  emoji: string; // ícono simple para la card
}

export const MODULES: PlatformModule[] = [
  {
    slug: 'ingreso-medicina',
    name: 'Ingreso a Medicina',
    tagline: 'CONEUM UNC · UNSa — banco, simulacros y repaso espaciado.',
    status: 'available',
    accent: 'sky',
    emoji: '🩺',
  },
  {
    slug: 'ingreso-gendarmeria',
    name: 'Ingreso a Gendarmería',
    tagline: 'Escuela de Gendarmería Nacional — banco, simulacros e institucional.',
    status: 'available',
    accent: 'emerald',
    emoji: '🛡️',
  },
  {
    slug: 'anatomia',
    name: 'Anatomía',
    tagline: 'Estudio por regiones y sistemas.',
    status: 'coming_soon',
    accent: 'rose',
    emoji: '🦴',
  },
  {
    slug: 'residencia',
    name: 'Examen de Residencia',
    tagline: 'Entrenamiento para el examen único.',
    status: 'coming_soon',
    accent: 'violet',
    emoji: '🏥',
  },
];

export const moduleBySlug = (slug: string): PlatformModule | undefined =>
  MODULES.find((m) => m.slug === slug);

// Clases de acento por módulo (Tailwind necesita clases literales, no
// interpoladas, para no purgarlas en build).
export const ACCENT_CLASSES: Record<
  string,
  { ring: string; text: string; glow: string }
> = {
  sky: { ring: 'hover:border-sky-400/50', text: 'text-sky-300', glow: 'shadow-sky-500/10' },
  emerald: { ring: 'hover:border-emerald-400/50', text: 'text-emerald-300', glow: 'shadow-emerald-500/10' },
  rose: { ring: 'hover:border-rose-400/50', text: 'text-rose-300', glow: 'shadow-rose-500/10' },
  violet: { ring: 'hover:border-violet-400/50', text: 'text-violet-300', glow: 'shadow-violet-500/10' },
};
