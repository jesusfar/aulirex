import type { Item, ItemTemplate } from '../../types/content';
import { generateVariants } from '../../lib/templates';

const sup = (n: number | string) =>
  String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]);
const round = (x: number, d = 3) => Math.round(x * 10 ** d) / 10 ** d;

// Plantillas: generan variantes numéricas reproducibles (misma semilla → mismo
// ítem). El foco es la práctica "infinita" de los cálculos más tomados.
export const templates: ItemTemplate[] = [
  {
    id: 'tpl-ph',
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 1,
    params: { exp: { min: 1, max: 6, step: 1 } },
    render: (p) => ({
      stem: `Una solución tiene una concentración de protones [H⁺] = 1×10⁻${sup(p.exp)} M. ¿Cuál es su pH?`,
      numeric: { value: p.exp, tolerance: 0.05, toleranceMode: 'abs' },
      explanation: `pH = −log[H⁺] = −log(1×10⁻${sup(p.exp)}) = ${p.exp}.`,
      hint: 'pH = −log[H⁺].',
      formulaIds: ['for-ph'],
    }),
  },
  {
    id: 'tpl-dilucion',
    subject: 'quimica',
    block: 'soluciones',
    topic: 'diluciones',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    params: {
      c1: { min: 0.2, max: 2, step: 0.2 },
      v1: { min: 10, max: 100, step: 10 },
      vf: { min: 200, max: 1000, step: 100 },
    },
    render: (p) => {
      const c2 = round((p.c1 * p.v1) / p.vf);
      return {
        stem: `Se toman ${p.v1} mL de una solución ${p.c1} M y se diluyen con agua hasta ${p.vf} mL. ¿Cuál es la concentración final, en mol/L?`,
        numeric: { value: c2, unit: 'mol/L', tolerance: 0.005, toleranceMode: 'abs' },
        explanation: `Los moles se conservan: C₁·V₁ = C₂·V₂ → C₂ = (${p.c1}·${p.v1})/${p.vf} = ${c2} M.`,
        hint: 'C₁·V₁ = C₂·V₂.',
        formulaIds: ['for-dilucion'],
      };
    },
  },
  {
    id: 'tpl-mruv',
    subject: 'fisica',
    block: 'cinematica',
    topic: 'cinematica',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    params: {
      vi: { min: 0, max: 20, step: 5 },
      a: { min: 1, max: 5, step: 1 },
      t: { min: 2, max: 10, step: 1 },
    },
    render: (p) => {
      const vf = round(p.vi + p.a * p.t, 2);
      return {
        stem: `Un móvil parte con velocidad inicial de ${p.vi} m/s y acelera a ${p.a} m/s² durante ${p.t} s. ¿Cuál es su velocidad final, en m/s?`,
        numeric: { value: vf, unit: 'm/s', tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `MRUV: v = v₀ + a·t = ${p.vi} + ${p.a}·${p.t} = ${vf} m/s.`,
        hint: 'v = v₀ + a·t.',
        formulaIds: ['for-mruv'],
      };
    },
  },
];

// Variantes concretas incorporadas al banco (6 por plantilla, deterministas).
export const generatedItems: Item[] = templates.flatMap((t) => generateVariants(t, 6));
