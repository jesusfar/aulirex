import type { Item, ItemTemplate } from '../../../../types/content';
import { generateVariants } from '../../../../lib/templates';

// Módulo Matemática básica (UNSa). Son plantillas que generan ejercicios con
// NÚMEROS ALEATORIOS por sesión → el alumno practica el método sin memorizar el
// resultado. Se incorporan al banco como ítems catalogados de la UNSa: aparecen
// en Práctica (materia "Matemática") y en el Simulacro UNSa igual que el resto.

const r = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
// Muestra números con coma decimal (convención local); entero → sin cambios.
const es = (x: number) => String(x).replace('.', ',');
// Término "± b" para una ecuación (vacío si b = 0).
const term = (b: number) => (b === 0 ? '' : b > 0 ? `+ ${b}` : `- ${-b}`);

const base = {
  subject: 'matematica' as const,
  track: 'practico' as const,
  type: 'numeric' as const,
};

export const mathTemplates: ItemTemplate[] = [
  // ================= Despeje de ecuaciones =================
  {
    ...base, id: 'mat-despeje-lineal', block: 'algebra', topic: 'despeje',
    frequency: 'alta', difficulty: 2,
    params: { a: { min: 2, max: 9, step: 1 }, x: { min: -6, max: 9, step: 1 }, b: { min: -9, max: 9, step: 1 } },
    render: (p) => {
      const c = p.a * p.x + p.b;
      return {
        stem: `Resolvé para $x$:  $${p.a}x ${term(p.b)} = ${c}$`,
        numeric: { value: p.x, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Pasás el término independiente y dividís por el coeficiente: $x = \\dfrac{${c} - (${p.b})}{${p.a}} = ${p.x}$.`,
        hint: 'Dejá el término con x de un lado y después dividí por su coeficiente.',
      };
    },
  },
  {
    ...base, id: 'mat-despeje-producto', block: 'algebra', topic: 'despeje',
    frequency: 'alta', difficulty: 1,
    params: { a: { min: 2, max: 9, step: 1 }, x: { min: -6, max: 12, step: 1 } },
    render: (p) => ({
      stem: `Resolvé para $x$:  $${p.a}x = ${p.a * p.x}$`,
      numeric: { value: p.x, tolerance: 0, toleranceMode: 'abs' },
      explanation: `Dividís ambos lados por ${p.a}: $x = \\dfrac{${p.a * p.x}}{${p.a}} = ${p.x}$.`,
      hint: 'El coeficiente que multiplica a x pasa dividiendo.',
    }),
  },
  {
    ...base, id: 'mat-despeje-cociente', block: 'algebra', topic: 'despeje',
    frequency: 'media', difficulty: 1,
    params: { a: { min: 2, max: 9, step: 1 }, q: { min: 2, max: 12, step: 1 } },
    render: (p) => ({
      stem: `Resolvé para $x$:  $\\dfrac{x}{${p.a}} = ${p.q}$`,
      numeric: { value: p.a * p.q, tolerance: 0, toleranceMode: 'abs' },
      explanation: `Lo que divide pasa multiplicando: $x = ${p.q} \\cdot ${p.a} = ${p.a * p.q}$.`,
      hint: 'Lo que está dividiendo pasa al otro lado multiplicando.',
    }),
  },
  {
    ...base, id: 'mat-despeje-parentesis', block: 'algebra', topic: 'despeje',
    frequency: 'media', difficulty: 2,
    params: { a: { min: 2, max: 6, step: 1 }, x: { min: -4, max: 9, step: 1 }, b: { min: 1, max: 9, step: 1 } },
    render: (p) => {
      const c = p.a * (p.x + p.b);
      return {
        stem: `Resolvé para $x$:  $${p.a}(x + ${p.b}) = ${c}$`,
        numeric: { value: p.x, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Dividís por ${p.a} y después restás ${p.b}: $x = \\dfrac{${c}}{${p.a}} - ${p.b} = ${p.x}$.`,
        hint: 'Podés dividir por el número de afuera primero, o aplicar la distributiva.',
      };
    },
  },
  {
    ...base, id: 'mat-despeje-dos-lados', block: 'algebra', topic: 'despeje',
    frequency: 'media', difficulty: 3,
    params: { a: { min: 6, max: 9, step: 1 }, g: { min: 1, max: 4, step: 1 }, x: { min: -5, max: 8, step: 1 }, b: { min: -6, max: 6, step: 1 } },
    render: (p) => {
      const c = p.a - p.g; // coeficiente de x del otro lado (c < a)
      const d = p.g * p.x + p.b; // término independiente del otro lado
      return {
        stem: `Resolvé para $x$:  $${p.a}x ${term(p.b)} = ${c}x ${term(d)}$`,
        numeric: { value: p.x, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Agrupás las x de un lado: $${p.a}x - ${c}x = ${d} - (${p.b})$ → $${p.g}x = ${d - p.b}$ → $x = ${p.x}$.`,
        hint: 'Llevá todas las x a un lado y los números al otro.',
      };
    },
  },
  {
    ...base, id: 'mat-despeje-proporcion', block: 'algebra', topic: 'despeje',
    frequency: 'media', difficulty: 2,
    params: { b: { min: 2, max: 6, step: 1 }, m: { min: 2, max: 6, step: 1 }, d: { min: 2, max: 9, step: 1 } },
    render: (p) => {
      const a = p.b * p.m;
      return {
        stem: `Resolvé la proporción para $x$:  $\\dfrac{${a}}{${p.b}} = \\dfrac{x}{${p.d}}$`,
        numeric: { value: p.m * p.d, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Multiplicás en cruz: $x = \\dfrac{${a} \\cdot ${p.d}}{${p.b}} = ${p.m * p.d}$.`,
        hint: 'En una proporción, el producto en cruz es igual: a·d = b·x.',
      };
    },
  },
  {
    ...base, id: 'mat-despeje-formula-v', block: 'algebra', topic: 'despeje',
    frequency: 'media', difficulty: 2,
    params: { t: { min: 2, max: 10, step: 1 }, v: { min: 1, max: 12, step: 1 } },
    render: (p) => {
      const d = p.v * p.t;
      return {
        stem: `Despejá $v$ de $v = \\dfrac{d}{t}$ y calculá para $d = ${d}$ m y $t = ${p.t}$ s.`,
        numeric: { value: p.v, unit: 'm/s', tolerance: 0, toleranceMode: 'abs' },
        explanation: `$v = \\dfrac{d}{t} = \\dfrac{${d}}{${p.t}} = ${p.v}$ m/s.`,
        hint: 'La fórmula ya está despejada para v: dividí d entre t.',
      };
    },
  },
  {
    ...base, id: 'mat-despeje-formula-t', block: 'algebra', topic: 'despeje',
    frequency: 'media', difficulty: 3,
    params: { v: { min: 2, max: 10, step: 1 }, t: { min: 2, max: 12, step: 1 } },
    render: (p) => {
      const d = p.v * p.t;
      return {
        stem: `Despejá $t$ de $v = \\dfrac{d}{t}$ y calculá para $d = ${d}$ m y $v = ${p.v}$ m/s.`,
        numeric: { value: p.t, unit: 's', tolerance: 0, toleranceMode: 'abs' },
        explanation: `Despejás $t = \\dfrac{d}{v} = \\dfrac{${d}}{${p.v}} = ${p.t}$ s.`,
        hint: 'Multiplicá en cruz: v·t = d, entonces t = d/v.',
      };
    },
  },

  // ================= Regla de tres =================
  {
    ...base, id: 'mat-r3-directa', block: 'proporcionalidad', topic: 'regla_de_tres',
    frequency: 'alta', difficulty: 1,
    params: { p: { min: 2, max: 15, step: 1 }, u: { min: 2, max: 9, step: 1 }, z: { min: 2, max: 12, step: 1 } },
    render: (p) => {
      const total = p.p * p.u;
      return {
        stem: `Si ${p.u} unidades cuestan ${total} pesos, ¿cuánto cuestan ${p.z} unidades?`,
        numeric: { value: p.p * p.z, unit: 'pesos', tolerance: 0, toleranceMode: 'abs' },
        explanation: `Precio unitario = ${total} ÷ ${p.u} = ${p.p}. Entonces ${p.z} × ${p.p} = ${p.p * p.z} pesos.`,
        hint: 'Directa: a más unidades, más costo. Buscá primero el valor de una unidad.',
      };
    },
  },
  {
    ...base, id: 'mat-r3-inversa', block: 'proporcionalidad', topic: 'regla_de_tres',
    frequency: 'media', difficulty: 2,
    params: { v1: { min: 2, max: 12, step: 1 }, t1: { min: 2, max: 12, step: 1 }, v2: { min: 2, max: 12, step: 1 } },
    render: (p) => {
      const dist = p.v1 * p.t1;
      const t2 = r(dist / p.v2);
      return {
        stem: `Un móvil tarda ${p.t1} h a ${p.v1} km/h. ¿Cuánto tardaría a ${p.v2} km/h en el mismo recorrido?`,
        numeric: { value: t2, unit: 'h', tolerance: 0.02, toleranceMode: 'abs' },
        explanation: `Distancia = ${p.v1} × ${p.t1} = ${dist} km. Tiempo = ${dist} ÷ ${p.v2} = ${es(t2)} h.`,
        hint: 'Inversa: a más velocidad, menos tiempo. El producto velocidad × tiempo se mantiene.',
      };
    },
  },

  // ================= Porcentajes =================
  {
    ...base, id: 'mat-pct-de', block: 'proporcionalidad', topic: 'porcentajes',
    frequency: 'alta', difficulty: 1,
    params: { pct: { min: 5, max: 90, step: 5 }, n: { min: 20, max: 500, step: 10 } },
    render: (p) => {
      const val = r((p.pct * p.n) / 100);
      return {
        stem: `¿Cuánto es el ${p.pct}% de ${p.n}?`,
        numeric: { value: val, tolerance: 0.005, toleranceMode: 'abs' },
        explanation: `${p.pct}% de ${p.n} = (${p.pct} ÷ 100) × ${p.n} = ${es(val)}.`,
        hint: 'El P% de N es (P/100)·N.',
      };
    },
  },
  {
    ...base, id: 'mat-pct-descuento', block: 'proporcionalidad', topic: 'porcentajes',
    frequency: 'alta', difficulty: 2,
    params: { pct: { min: 5, max: 50, step: 5 }, n: { min: 100, max: 900, step: 50 } },
    render: (p) => {
      const desc = r((p.pct * p.n) / 100);
      const final = r(p.n - desc);
      return {
        stem: `Un producto cuesta ${p.n} pesos y tiene ${p.pct}% de descuento. ¿Cuál es el precio final?`,
        numeric: { value: final, unit: 'pesos', tolerance: 0.005, toleranceMode: 'abs' },
        explanation: `Descuento = ${p.pct}% de ${p.n} = ${es(desc)}. Precio final = ${p.n} − ${es(desc)} = ${es(final)} pesos.`,
        hint: 'Calculá el descuento y restalo al precio original.',
      };
    },
  },
  {
    ...base, id: 'mat-pct-cual', block: 'proporcionalidad', topic: 'porcentajes',
    frequency: 'media', difficulty: 2,
    params: { a: { min: 10, max: 90, step: 10 }, b: { min: 100, max: 500, step: 50 } },
    render: (p) => {
      const val = r((p.a / p.b) * 100, 1);
      return {
        stem: `¿Qué porcentaje representa ${p.a} de ${p.b}?`,
        numeric: { value: val, unit: '%', tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `(${p.a} ÷ ${p.b}) × 100 = ${es(val)}%.`,
        hint: 'Dividí la parte por el total y multiplicá por 100.',
      };
    },
  },

  // ================= Potencias y raíces =================
  {
    ...base, id: 'mat-pot-producto', block: 'aritmetica', topic: 'potencias',
    frequency: 'alta', difficulty: 1,
    params: { m: { min: 2, max: 6, step: 1 }, n: { min: 2, max: 6, step: 1 } },
    render: (p) => ({
      stem: `Al simplificar $a^{${p.m}} \\cdot a^{${p.n}}$, ¿cuál es el exponente del resultado?`,
      numeric: { value: p.m + p.n, tolerance: 0, toleranceMode: 'abs' },
      explanation: `Producto de potencias de igual base: se suman los exponentes. $a^{${p.m}} \\cdot a^{${p.n}} = a^{${p.m + p.n}}$.`,
      hint: 'Igual base multiplicando → se suman los exponentes.',
    }),
  },
  {
    ...base, id: 'mat-pot-potencia', block: 'aritmetica', topic: 'potencias',
    frequency: 'media', difficulty: 2,
    params: { m: { min: 2, max: 5, step: 1 }, n: { min: 2, max: 5, step: 1 } },
    render: (p) => ({
      stem: `¿Cuál es el exponente al resolver $\\left(a^{${p.m}}\\right)^{${p.n}}$?`,
      numeric: { value: p.m * p.n, tolerance: 0, toleranceMode: 'abs' },
      explanation: `Potencia de otra potencia: se multiplican los exponentes. $\\left(a^{${p.m}}\\right)^{${p.n}} = a^{${p.m * p.n}}$.`,
      hint: 'Potencia de potencia → se multiplican los exponentes.',
    }),
  },
  {
    ...base, id: 'mat-pot-valor', block: 'aritmetica', topic: 'potencias',
    frequency: 'alta', difficulty: 1,
    params: { b: { min: 2, max: 5, step: 1 }, e: { min: 2, max: 4, step: 1 } },
    render: (p) => ({
      stem: `¿Cuánto vale $${p.b}^{${p.e}}$?`,
      numeric: { value: p.b ** p.e, tolerance: 0, toleranceMode: 'abs' },
      explanation: `$${p.b}^{${p.e}}$ = multiplicar ${p.b} por sí mismo ${p.e} veces = ${p.b ** p.e}.`,
      hint: 'La base se multiplica por sí misma tantas veces como indica el exponente.',
    }),
  },
  {
    ...base, id: 'mat-raiz', block: 'aritmetica', topic: 'radicacion',
    frequency: 'media', difficulty: 1,
    params: { k: { min: 2, max: 20, step: 1 } },
    render: (p) => ({
      stem: `¿Cuánto vale $\\sqrt{${p.k * p.k}}$?`,
      numeric: { value: p.k, tolerance: 0, toleranceMode: 'abs' },
      explanation: `Buscamos el número que elevado al cuadrado da ${p.k * p.k}: $\\sqrt{${p.k * p.k}} = ${p.k}$ porque $${p.k}^2 = ${p.k * p.k}$.`,
      hint: 'La raíz cuadrada deshace el cuadrado.',
    }),
  },

  // ================= Logaritmos =================
  {
    ...base, id: 'mat-log10', block: 'aritmetica', topic: 'logaritmos',
    frequency: 'alta', difficulty: 2,
    params: { e: { min: 1, max: 6, step: 1 } },
    render: (p) => {
      const arg = 10 ** p.e;
      return {
        stem: `Calculá $\\log(${arg})$ (logaritmo en base 10).`,
        numeric: { value: p.e, tolerance: 0, toleranceMode: 'abs' },
        explanation: `$\\log(10^{${p.e}}) = ${p.e}$, porque $10^{${p.e}} = ${arg}$.`,
        hint: 'log en base 10 de una potencia de 10 es su exponente.',
      };
    },
  },
  {
    ...base, id: 'mat-log2', block: 'aritmetica', topic: 'logaritmos',
    frequency: 'media', difficulty: 2,
    params: { e: { min: 1, max: 6, step: 1 } },
    render: (p) => {
      const arg = 2 ** p.e;
      return {
        stem: `Calculá $\\log_{2}(${arg})$.`,
        numeric: { value: p.e, tolerance: 0, toleranceMode: 'abs' },
        explanation: `$\\log_{2}(2^{${p.e}}) = ${p.e}$, porque $2^{${p.e}} = ${arg}$.`,
        hint: 'Preguntate: ¿a qué exponente elevo 2 para obtener ese número?',
      };
    },
  },
  {
    ...base, id: 'mat-log-regla', block: 'aritmetica', topic: 'logaritmos',
    frequency: 'baja', difficulty: 3,
    params: { n: { min: 2, max: 6, step: 1 } },
    render: (p) => ({
      stem: `Por la propiedad del logaritmo, ¿cuánto vale $\\log_{b}\\!\\left(b^{${p.n}}\\right)$?`,
      numeric: { value: p.n, tolerance: 0, toleranceMode: 'abs' },
      explanation: `$\\log_{b}(b^{n}) = n$ para cualquier base $b$, así que el resultado es ${p.n}.`,
      hint: 'El log y la potencia de la misma base se cancelan.',
    }),
  },

  // ================= Notación científica =================
  {
    ...base, id: 'mat-notcie-grande', block: 'aritmetica', topic: 'notacion_cientifica',
    frequency: 'alta', difficulty: 1,
    params: { c: { min: 1, max: 9, step: 1 }, z: { min: 2, max: 6, step: 1 } },
    render: (p) => {
      const num = p.c * 10 ** p.z;
      return {
        stem: `Escribí ${num} en notación científica. ¿Cuál es el exponente de 10?`,
        numeric: { value: p.z, tolerance: 0, toleranceMode: 'abs' },
        explanation: `${num} = $${p.c} \\times 10^{${p.z}}$, así que el exponente es ${p.z}.`,
        hint: 'Contá cuántos lugares corrés la coma hasta dejar una sola cifra entera.',
      };
    },
  },
  {
    ...base, id: 'mat-notcie-chico', block: 'aritmetica', topic: 'notacion_cientifica',
    frequency: 'media', difficulty: 2,
    params: { c: { min: 1, max: 9, step: 1 }, k: { min: 2, max: 6, step: 1 } },
    render: (p) => {
      const numStr = es(r(p.c / 10 ** p.k, 8));
      return {
        stem: `Escribí ${numStr} en notación científica. ¿Cuál es el exponente de 10? (puede ser negativo)`,
        numeric: { value: -p.k, tolerance: 0, toleranceMode: 'abs' },
        explanation: `${numStr} = $${p.c} \\times 10^{-${p.k}}$, así que el exponente es −${p.k}.`,
        hint: 'Para números menores que 1 el exponente de 10 es negativo.',
      };
    },
  },
  {
    ...base, id: 'mat-notcie-producto', block: 'aritmetica', topic: 'notacion_cientifica',
    frequency: 'media', difficulty: 2,
    params: { m: { min: 1, max: 6, step: 1 }, n: { min: 1, max: 6, step: 1 } },
    render: (p) => ({
      stem: `Al multiplicar $(2 \\times 10^{${p.m}}) \\cdot (3 \\times 10^{${p.n}})$ se obtiene $6 \\times 10^{?}$. ¿Cuál es ese exponente?`,
      numeric: { value: p.m + p.n, tolerance: 0, toleranceMode: 'abs' },
      explanation: `Se multiplican los coeficientes (2 × 3 = 6) y se SUMAN los exponentes: ${p.m} + ${p.n} = ${p.m + p.n}.`,
      hint: 'Coeficientes se multiplican; potencias de 10 se suman los exponentes.',
    }),
  },

  // ================= Proporcionalidad y gráficos =================
  {
    ...base, id: 'mat-prop-directa', block: 'proporcionalidad', topic: 'proporcionalidad',
    frequency: 'alta', difficulty: 2,
    params: { k: { min: 2, max: 9, step: 1 }, x1: { min: 2, max: 8, step: 1 }, x2: { min: 2, max: 12, step: 1 } },
    render: (p) => {
      const y1 = p.k * p.x1;
      return {
        stem: `$y$ es directamente proporcional a $x$. Si $y = ${y1}$ cuando $x = ${p.x1}$, ¿cuánto vale $y$ cuando $x = ${p.x2}$?`,
        numeric: { value: p.k * p.x2, tolerance: 0, toleranceMode: 'abs' },
        explanation: `La constante es $k = ${y1} ÷ ${p.x1} = ${p.k}$. Entonces $y = ${p.k} × ${p.x2} = ${p.k * p.x2}$.`,
        hint: 'En proporcionalidad directa el cociente y/x es constante.',
      };
    },
  },
  {
    ...base, id: 'mat-recta', block: 'proporcionalidad', topic: 'funcion_lineal',
    frequency: 'media', difficulty: 2,
    params: { m: { min: 1, max: 6, step: 1 }, b: { min: 0, max: 10, step: 1 }, x: { min: 2, max: 10, step: 1 } },
    render: (p) => ({
      stem: `Una recta tiene pendiente ${p.m} y ordenada al origen ${p.b}. ¿Cuánto vale $y$ cuando $x = ${p.x}$?`,
      numeric: { value: p.m * p.x + p.b, tolerance: 0, toleranceMode: 'abs' },
      explanation: `$y = m\\,x + b = ${p.m} × ${p.x} + ${p.b} = ${p.m * p.x + p.b}$.`,
      hint: 'Usá la ecuación de la recta: y = m·x + b.',
    }),
  },
  {
    ...base, id: 'mat-tendencia', block: 'proporcionalidad', topic: 'funcion_lineal',
    frequency: 'media', difficulty: 1,
    params: { rate: { min: 1, max: 5, step: 1 }, t1: { min: 1, max: 5, step: 1 }, dt: { min: 5, max: 10, step: 1 }, T1: { min: 20, max: 30, step: 1 } },
    render: (p) => {
      const t2 = p.t1 + p.dt;
      const val = p.T1 + p.rate * p.dt;
      return {
        stem: `A los ${p.t1} min la temperatura es ${p.T1} °C y sube de forma constante ${p.rate} °C por minuto. ¿Qué temperatura habrá a los ${t2} min?`,
        numeric: { value: val, unit: '°C', tolerance: 0, toleranceMode: 'abs' },
        explanation: `En ${p.dt} min sube ${p.rate} × ${p.dt} = ${p.rate * p.dt} °C. Entonces ${p.T1} + ${p.rate * p.dt} = ${val} °C.`,
        hint: 'Multiplicá la tasa por el tiempo transcurrido y sumalo al valor inicial.',
      };
    },
  },
];

// Semilla base aleatoria por sesión → los números cambian en cada visita (no se
// memoriza el resultado), pero quedan fijos dentro de la sesión para que el
// simulacro sea consistente.
const sessionSeed = Math.floor(Math.random() * 1_000_000) + 1;

// Variantes concretas incorporadas al banco, catalogadas SOLO para UNSa.
export const mathGeneratedItems: Item[] = mathTemplates
  .flatMap((t, i) => generateVariants(t, 6, sessionSeed + i * 1000))
  .map((it) => ({ ...it, institutions: ['UNSa'] as const }));
