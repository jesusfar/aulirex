import type { Item, ItemTemplate } from '../../types/content';
import { generateVariants } from '../../lib/templates';

const sup = (n: number | string) =>
  String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]);
const r = (x: number, d = 3) => Math.round(x * 10 ** d) / 10 ** d;

// Plantillas: generan variantes numéricas de los cálculos más tomados. Con
// semilla aleatoria por sesión (abajo), los números cambian cada vez → el
// alumno practica el método sin memorizar el resultado.
export const templates: ItemTemplate[] = [
  // ---------------- Química ----------------
  {
    id: 'tpl-ph', subject: 'quimica', block: 'equilibrio_acido_base', topic: 'ph_buffers',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { exp: { min: 1, max: 6, step: 1 } },
    render: (p) => ({
      stem: `Una solución tiene [H⁺] = 1×10⁻${sup(p.exp)} M. ¿Cuál es su pH?`,
      numeric: { value: p.exp, tolerance: 0.05, toleranceMode: 'abs' },
      explanation: `pH = −log[H⁺] = −log(1×10⁻${sup(p.exp)}) = ${p.exp}.`,
      hint: 'pH = −log[H⁺].', formulaIds: ['for-ph'],
    }),
  },
  {
    id: 'tpl-poh', subject: 'quimica', block: 'equilibrio_acido_base', topic: 'ph_buffers',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { exp: { min: 1, max: 6, step: 1 } },
    render: (p) => ({
      stem: `Una solución tiene [OH⁻] = 1×10⁻${sup(p.exp)} M a 25 °C. ¿Cuál es su pH?`,
      numeric: { value: 14 - p.exp, tolerance: 0.05, toleranceMode: 'abs' },
      explanation: `pOH = −log[OH⁻] = ${p.exp}. Como pH + pOH = 14 → pH = 14 − ${p.exp} = ${14 - p.exp}.`,
      hint: 'pOH = −log[OH⁻]; pH = 14 − pOH.', formulaIds: ['for-ph'],
    }),
  },
  {
    id: 'tpl-molaridad', subject: 'quimica', block: 'soluciones', topic: 'concentracion',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { n: { min: 0.5, max: 4, step: 0.5 }, v: { min: 1, max: 5, step: 0.5 } },
    render: (p) => {
      const m = r(p.n / p.v);
      return {
        stem: `Se disuelven ${p.n} mol de soluto hasta obtener ${p.v} L de solución. ¿Cuál es la molaridad (mol/L)?`,
        numeric: { value: m, unit: 'mol/L', tolerance: 0.005, toleranceMode: 'abs' },
        explanation: `M = n/V = ${p.n}/${p.v} = ${m} M.`,
        hint: 'M = n / V.', formulaIds: ['for-molaridad'],
      };
    },
  },
  {
    id: 'tpl-moles', subject: 'quimica', block: 'soluciones', topic: 'concentracion',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { m: { min: 10, max: 200, step: 10 }, pm: { min: 20, max: 100, step: 10 } },
    render: (p) => {
      const n = r(p.m / p.pm);
      return {
        stem: `¿Cuántos moles hay en ${p.m} g de una sustancia cuyo peso molecular es ${p.pm} g/mol?`,
        numeric: { value: n, unit: 'mol', tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `n = masa / PM = ${p.m}/${p.pm} = ${n} mol.`,
        hint: 'n = masa / peso molecular.',
      };
    },
  },
  {
    id: 'tpl-avogadro', subject: 'quimica', block: 'estructura_atomica', topic: 'unidades_quimicas',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { n: { min: 1, max: 9, step: 1 } },
    render: (p) => {
      const val = r(p.n * 6.02, 2);
      return {
        stem: `¿Cuántas moléculas hay en ${p.n} mol de una sustancia? Respondé el coeficiente que multiplica a 10²³ (usá N_A = 6,02×10²³).`,
        numeric: { value: val, tolerance: 0.02, toleranceMode: 'abs' },
        explanation: `nº moléculas = n × N_A = ${p.n} × 6,02×10²³ = ${val}×10²³.`,
        hint: 'nº = moles × 6,02×10²³.',
      };
    },
  },
  {
    id: 'tpl-neutrones', subject: 'quimica', block: 'estructura_atomica', topic: 'isotopos',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 1,
    params: { z: { min: 3, max: 30, step: 1 }, extra: { min: 0, max: 12, step: 1 } },
    render: (p) => {
      const a = p.z + p.extra;
      return {
        stem: `Un isótopo tiene número atómico Z = ${p.z} y número másico A = ${a}. ¿Cuántos neutrones tiene?`,
        numeric: { value: p.extra, unit: 'neutrones', tolerance: 0, toleranceMode: 'abs' },
        explanation: `Neutrones = A − Z = ${a} − ${p.z} = ${p.extra}.`,
        hint: 'Neutrones = A − Z.',
      };
    },
  },
  {
    id: 'tpl-dilucion', subject: 'quimica', block: 'soluciones', topic: 'diluciones',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { c1: { min: 0.2, max: 2, step: 0.2 }, v1: { min: 10, max: 100, step: 10 }, vf: { min: 200, max: 1000, step: 100 } },
    render: (p) => {
      const c2 = r((p.c1 * p.v1) / p.vf);
      return {
        stem: `Se toman ${p.v1} mL de una solución ${p.c1} M y se diluyen con agua hasta ${p.vf} mL. ¿Cuál es la concentración final, en mol/L?`,
        numeric: { value: c2, unit: 'mol/L', tolerance: 0.005, toleranceMode: 'abs' },
        explanation: `C₁·V₁ = C₂·V₂ → C₂ = (${p.c1}·${p.v1})/${p.vf} = ${c2} M.`,
        hint: 'C₁·V₁ = C₂·V₂.', formulaIds: ['for-dilucion'],
      };
    },
  },
  {
    id: 'tpl-pv', subject: 'quimica', block: 'soluciones', topic: 'concentracion',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { pct: { min: 2, max: 20, step: 2 }, v: { min: 100, max: 500, step: 50 } },
    render: (p) => {
      const g = r((p.pct * p.v) / 100, 1);
      return {
        stem: `¿Cuántos gramos de soluto hay en ${p.v} mL de una solución al ${p.pct} % P/V?`,
        numeric: { value: g, unit: 'g', tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `% P/V = g/100 mL → g = (${p.pct}·${p.v})/100 = ${g} g.`,
        hint: '% P/V = gramos de soluto por 100 mL.',
      };
    },
  },
  {
    id: 'tpl-ebullo', subject: 'quimica', block: 'propiedades_coligativas', topic: 'propiedades_coligativas',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 3,
    params: { m: { min: 0.5, max: 3, step: 0.5 } },
    render: (p) => {
      const dt = r(0.52 * p.m, 2);
      return {
        stem: `Una solución acuosa tiene molalidad ${p.m} m (soluto no volátil). Con Kb = 0,52 °C/m, ¿cuál es la temperatura de ebullición (°C)?`,
        numeric: { value: r(100 + dt, 2), unit: '°C', tolerance: 0.02, toleranceMode: 'abs' },
        explanation: `ΔTeb = Kb·m = 0,52·${p.m} = ${dt} °C → Teb = 100 + ${dt} = ${r(100 + dt, 2)} °C.`,
        hint: 'ΔTeb = Kb·m; Teb = 100 + ΔTeb.',
      };
    },
  },
  // ---------------- Física ----------------
  {
    id: 'tpl-mruv-vf', subject: 'fisica', block: 'cinematica', topic: 'cinematica',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { vi: { min: 0, max: 20, step: 5 }, a: { min: 1, max: 5, step: 1 }, t: { min: 2, max: 10, step: 1 } },
    render: (p) => {
      const vf = r(p.vi + p.a * p.t, 2);
      return {
        stem: `Un móvil parte con velocidad inicial de ${p.vi} m/s y acelera a ${p.a} m/s² durante ${p.t} s. ¿Cuál es su velocidad final (m/s)?`,
        numeric: { value: vf, unit: 'm/s', tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `v = v₀ + a·t = ${p.vi} + ${p.a}·${p.t} = ${vf} m/s.`,
        hint: 'v = v₀ + a·t.', formulaIds: ['for-mruv'],
      };
    },
  },
  {
    id: 'tpl-mruv-x', subject: 'fisica', block: 'cinematica', topic: 'cinematica',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 3,
    params: { vi: { min: 0, max: 15, step: 5 }, a: { min: 2, max: 6, step: 2 }, t: { min: 2, max: 8, step: 1 } },
    render: (p) => {
      const x = r(p.vi * p.t + 0.5 * p.a * p.t * p.t, 2);
      return {
        stem: `Un móvil con velocidad inicial ${p.vi} m/s acelera a ${p.a} m/s². ¿Qué distancia recorre en ${p.t} s (m)?`,
        numeric: { value: x, unit: 'm', tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `x = v₀·t + ½·a·t² = ${p.vi}·${p.t} + ½·${p.a}·${p.t}² = ${x} m.`,
        hint: 'x = v₀·t + ½·a·t².',
      };
    },
  },
  {
    id: 'tpl-caida', subject: 'fisica', block: 'cinematica', topic: 'cinematica',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { t: { min: 1, max: 6, step: 1 } },
    render: (p) => {
      const vf = r(10 * p.t, 1);
      return {
        stem: `Un objeto se deja caer desde el reposo (g = 10 m/s²). ¿Qué velocidad tiene a los ${p.t} s (m/s)?`,
        numeric: { value: vf, unit: 'm/s', tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `Caída libre: v = g·t = 10·${p.t} = ${vf} m/s.`,
        hint: 'v = g·t, con g = 10 m/s².',
      };
    },
  },
  {
    id: 'tpl-fuerza', subject: 'fisica', block: 'dinamica', topic: 'dinamica',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { m: { min: 1, max: 20, step: 1 }, a: { min: 1, max: 10, step: 1 } },
    render: (p) => ({
      stem: `¿Qué fuerza neta se necesita para que una masa de ${p.m} kg acelere a ${p.a} m/s² (en N)?`,
      numeric: { value: p.m * p.a, unit: 'N', tolerance: 0.01, toleranceMode: 'abs' },
      explanation: `F = m·a = ${p.m}·${p.a} = ${p.m * p.a} N.`,
      hint: 'F = m·a.', formulaIds: ['for-newton2'],
    }),
  },
  {
    id: 'tpl-peso', subject: 'fisica', block: 'dinamica', topic: 'dinamica',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 1,
    params: { m: { min: 1, max: 50, step: 1 } },
    render: (p) => ({
      stem: `¿Cuál es el peso de un cuerpo de ${p.m} kg (g = 10 m/s²), en N?`,
      numeric: { value: p.m * 10, unit: 'N', tolerance: 0.01, toleranceMode: 'abs' },
      explanation: `P = m·g = ${p.m}·10 = ${p.m * 10} N.`,
      hint: 'P = m·g.', formulaIds: ['for-peso'],
    }),
  },
  {
    id: 'tpl-ec', subject: 'fisica', block: 'trabajo_y_energia', topic: 'trabajo_y_energia',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { m: { min: 1, max: 10, step: 1 }, v: { min: 2, max: 10, step: 2 } },
    render: (p) => {
      const ec = r(0.5 * p.m * p.v * p.v, 1);
      return {
        stem: `¿Cuál es la energía cinética de un cuerpo de ${p.m} kg que se mueve a ${p.v} m/s (en J)?`,
        numeric: { value: ec, unit: 'J', tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `Ec = ½·m·v² = ½·${p.m}·${p.v}² = ${ec} J.`,
        hint: 'Ec = ½·m·v².', formulaIds: ['for-ecinetica'],
      };
    },
  },
  {
    id: 'tpl-ep', subject: 'fisica', block: 'trabajo_y_energia', topic: 'trabajo_y_energia',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { m: { min: 1, max: 10, step: 1 }, h: { min: 1, max: 20, step: 1 } },
    render: (p) => ({
      stem: `¿Cuál es la energía potencial de un cuerpo de ${p.m} kg a ${p.h} m de altura (g = 10 m/s²), en J?`,
      numeric: { value: p.m * 10 * p.h, unit: 'J', tolerance: 0.01, toleranceMode: 'abs' },
      explanation: `Ep = m·g·h = ${p.m}·10·${p.h} = ${p.m * 10 * p.h} J.`,
      hint: 'Ep = m·g·h.', formulaIds: ['for-epotencial'],
    }),
  },
  {
    id: 'tpl-potencia', subject: 'fisica', block: 'trabajo_y_energia', topic: 'trabajo_y_energia',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { w: { min: 100, max: 1000, step: 100 }, t: { min: 2, max: 20, step: 2 } },
    render: (p) => {
      const pw = r(p.w / p.t, 1);
      return {
        stem: `Si se realiza un trabajo de ${p.w} J en ${p.t} s, ¿cuál es la potencia (en W)?`,
        numeric: { value: pw, unit: 'W', tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `P = W/t = ${p.w}/${p.t} = ${pw} W.`,
        hint: 'P = trabajo / tiempo.',
      };
    },
  },
  {
    id: 'tpl-ohm-v', subject: 'fisica', block: 'electrodinamica', topic: 'electrodinamica',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { i: { min: 1, max: 10, step: 1 }, res: { min: 2, max: 20, step: 2 } },
    render: (p) => ({
      stem: `Por una resistencia de ${p.res} Ω circula una corriente de ${p.i} A. ¿Cuál es la tensión (en V)?`,
      numeric: { value: p.i * p.res, unit: 'V', tolerance: 0.01, toleranceMode: 'abs' },
      explanation: `V = I·R = ${p.i}·${p.res} = ${p.i * p.res} V.`,
      hint: 'Ley de Ohm: V = I·R.', formulaIds: ['for-ohm'],
    }),
  },
  {
    id: 'tpl-ohm-i', subject: 'fisica', block: 'electrodinamica', topic: 'electrodinamica',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { v: { min: 6, max: 60, step: 6 }, res: { min: 2, max: 12, step: 2 } },
    render: (p) => {
      const i = r(p.v / p.res, 2);
      return {
        stem: `Se aplica una tensión de ${p.v} V a una resistencia de ${p.res} Ω. ¿Cuál es la corriente (en A)?`,
        numeric: { value: i, unit: 'A', tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `I = V/R = ${p.v}/${p.res} = ${i} A.`,
        hint: 'I = V / R.', formulaIds: ['for-ohm'],
      };
    },
  },
  {
    id: 'tpl-phidro', subject: 'fisica', block: 'hidrostatica', topic: 'hidrostatica',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { delta: { min: 800, max: 1200, step: 100 }, h: { min: 1, max: 10, step: 1 } },
    render: (p) => {
      const pr = r(p.delta * 10 * p.h, 0);
      return {
        stem: `¿Cuál es la presión hidrostática a ${p.h} m de profundidad en un líquido de densidad ${p.delta} kg/m³ (g = 10 m/s²), en Pa?`,
        numeric: { value: pr, unit: 'Pa', tolerance: 1, toleranceMode: 'abs' },
        explanation: `P = δ·g·h = ${p.delta}·10·${p.h} = ${pr} Pa.`,
        hint: 'P = δ·g·h.', formulaIds: ['for-phidrostatica'],
      };
    },
  },
  {
    id: 'tpl-densidad', subject: 'fisica', block: 'hidrostatica', topic: 'hidrostatica',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 1,
    params: { m: { min: 10, max: 200, step: 10 }, v: { min: 2, max: 20, step: 2 } },
    render: (p) => {
      const d = r(p.m / p.v, 2);
      return {
        stem: `Un cuerpo tiene masa ${p.m} g y volumen ${p.v} cm³. ¿Cuál es su densidad (g/cm³)?`,
        numeric: { value: d, unit: 'g/cm³', tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `δ = m/V = ${p.m}/${p.v} = ${d} g/cm³.`,
        hint: 'δ = masa / volumen.', formulaIds: ['for-densidad'],
      };
    },
  },
  {
    id: 'tpl-caudal', subject: 'fisica', block: 'hidrodinamica', topic: 'hidrodinamica',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { v: { min: 1, max: 10, step: 1 }, a: { min: 2, max: 20, step: 2 } },
    render: (p) => ({
      stem: `Un líquido circula a ${p.v} m/s por un caño de sección ${p.a} cm². ¿Cuál es el caudal (en cm³/s)? (1 m/s = 100 cm/s)`,
      numeric: { value: p.v * 100 * p.a, unit: 'cm³/s', tolerance: 0.5, toleranceMode: 'abs' },
      explanation: `Q = v·A = (${p.v}·100 cm/s)·${p.a} cm² = ${p.v * 100 * p.a} cm³/s.`,
      hint: 'Q = velocidad × área.', formulaIds: ['for-caudal'],
    }),
  },
  {
    id: 'tpl-kmh', subject: 'fisica', block: 'pasaje_de_unidades', topic: 'pasaje_de_unidades',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { k: { min: 1, max: 8, step: 1 } },
    render: (p) => {
      const kmh = p.k * 18;
      return {
        stem: `Un móvil se mueve a ${kmh} km/h. ¿Cuál es su velocidad en m/s?`,
        numeric: { value: r(kmh / 3.6, 2), unit: 'm/s', tolerance: 0.02, toleranceMode: 'abs' },
        explanation: `Se divide por 3,6: ${kmh} / 3,6 = ${r(kmh / 3.6, 2)} m/s.`,
        hint: 'km/h → m/s: dividir por 3,6.',
      };
    },
  },
  // ---------------- Biología ----------------
  {
    id: 'tpl-mendel', subject: 'biologia', block: 'genetica_mendeliana', topic: 'leyes_mendel',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { k: { min: 4, max: 40, step: 4 } },
    render: (p) => ({
      stem: `De un cruce Aa × Aa nacen ${p.k} descendientes. ¿Cuántos se espera que presenten el fenotipo recesivo?`,
      numeric: { value: p.k / 4, unit: 'individuos', tolerance: 0, toleranceMode: 'abs' },
      explanation: `En Aa × Aa el recesivo (aa) es 1/4: ${p.k}/4 = ${p.k / 4}.`,
      hint: 'El recesivo aparece en 1 de cada 4.',
    }),
  },
];

// Semilla base aleatoria por sesión → los números cambian en cada visita.
const sessionSeed = Math.floor(Math.random() * 1_000_000) + 1;

// Variantes concretas incorporadas al banco (varias por plantilla).
export const generatedItems: Item[] = templates.flatMap((t, i) =>
  generateVariants(t, 6, sessionSeed + i * 1000),
);
