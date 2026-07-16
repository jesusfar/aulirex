import type { Institution, Item, ItemTemplate } from '../../../../types/content';
import { generateVariants } from '../../../../lib/templates';

// Plantillas de MATEMÁTICA para Gendarmería (tronco base, Unidades 1 a 5 del
// temario). Cada una genera variantes con NÚMEROS ALEATORIOS por sesión, así el
// aspirante practica el método sin memorizar el resultado. La calificación es
// numérica con tolerancia.
const r = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
const sup = (n: number | string) =>
  String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]);

export const templates: ItemTemplate[] = [
  // ---------------- Unidad 1: Campo numérico ----------------
  {
    id: 'gna-tpl-regla3', subject: 'matematica', block: 'campo_numerico', topic: 'regla_de_tres',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { kg: { min: 2, max: 6, step: 1 }, precio: { min: 600, max: 3000, step: 300 }, pedido: { min: 7, max: 15, step: 1 } },
    render: (p) => {
      const val = r((p.precio / p.kg) * p.pedido, 0);
      return {
        stem: `Si ${p.kg} kg de un producto cuestan $${p.precio}, ¿cuánto cuestan ${p.pedido} kg al mismo precio? (en pesos)`,
        numeric: { value: val, unit: '$', tolerance: 1, toleranceMode: 'abs' },
        explanation: `Regla de tres directa: $${p.precio} ÷ ${p.kg} = $${r(p.precio / p.kg, 2)} por kg; × ${p.pedido} = $${val}.`,
        hint: 'Sacá el precio por unidad y multiplicá por la cantidad pedida.',
      };
    },
  },
  {
    id: 'gna-tpl-porcentaje', subject: 'matematica', block: 'campo_numerico', topic: 'porcentaje',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { pct: { min: 5, max: 90, step: 5 }, base: { min: 40, max: 800, step: 20 } },
    render: (p) => {
      const val = r((p.pct / 100) * p.base, 2);
      return {
        stem: `¿Cuánto es el ${p.pct}% de ${p.base}?`,
        numeric: { value: val, tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `${p.pct}% de ${p.base} = (${p.pct}/100) × ${p.base} = ${val}.`,
        hint: 'Porcentaje = (pct ÷ 100) × base.',
      };
    },
  },
  {
    id: 'gna-tpl-potencia', subject: 'matematica', block: 'campo_numerico', topic: 'potencias_y_radicales',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { base: { min: 2, max: 9, step: 1 }, exp: { min: 2, max: 4, step: 1 } },
    render: (p) => {
      const val = Math.pow(p.base, p.exp);
      return {
        stem: `Calculá el valor de $${p.base}^{${p.exp}}$.`,
        numeric: { value: val, tolerance: 0, toleranceMode: 'abs' },
        explanation: `${p.base}${sup(p.exp)} = ${p.base} multiplicado ${p.exp} veces = ${val}.`,
        hint: 'Multiplicá la base por sí misma tantas veces como indique el exponente.',
      };
    },
  },
  {
    id: 'gna-tpl-notacion', subject: 'matematica', block: 'campo_numerico', topic: 'notacion_cientifica',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { a: { min: 2, max: 9, step: 1 }, n: { min: 2, max: 5, step: 1 } },
    render: (p) => {
      const val = p.a * Math.pow(10, p.n);
      return {
        stem: `Escribí como número entero: $${p.a} \\times 10^{${p.n}}$.`,
        numeric: { value: val, tolerance: 0, toleranceMode: 'abs' },
        explanation: `${p.a}×10${sup(p.n)} = ${p.a} seguido de ${p.n} ceros = ${val}.`,
        hint: 'El exponente indica cuántos lugares se corre la coma a la derecha.',
      };
    },
  },
  // ---------------- Unidad 2: Operaciones algebraicas ----------------
  {
    id: 'gna-tpl-valor-num', subject: 'matematica', block: 'operaciones_algebraicas', topic: 'valor_numerico',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { a: { min: 1, max: 4, step: 1 }, b: { min: 1, max: 6, step: 1 }, c: { min: 1, max: 9, step: 1 }, x: { min: 2, max: 5, step: 1 } },
    render: (p) => {
      const val = p.a * p.x * p.x + p.b * p.x + p.c;
      return {
        stem: `Dado el polinomio $P(x) = ${p.a}x^2 + ${p.b}x + ${p.c}$, calculá $P(${p.x})$.`,
        numeric: { value: val, tolerance: 0, toleranceMode: 'abs' },
        explanation: `P(${p.x}) = ${p.a}·${p.x}² + ${p.b}·${p.x} + ${p.c} = ${p.a * p.x * p.x} + ${p.b * p.x} + ${p.c} = ${val}.`,
        hint: 'Reemplazá la x por el número y resolvé.',
      };
    },
  },
  {
    id: 'gna-tpl-binomio', subject: 'matematica', block: 'operaciones_algebraicas', topic: 'cuadrado_de_binomio',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { a: { min: 1, max: 9, step: 1 }, b: { min: 1, max: 9, step: 1 } },
    render: (p) => {
      const val = (p.a + p.b) * (p.a + p.b);
      return {
        stem: `Usando $(a+b)^2 = a^2 + 2ab + b^2$, calculá $(${p.a} + ${p.b})^2$.`,
        numeric: { value: val, tolerance: 0, toleranceMode: 'abs' },
        explanation: `${p.a}² + 2·${p.a}·${p.b} + ${p.b}² = ${p.a * p.a} + ${2 * p.a * p.b} + ${p.b * p.b} = ${val}.`,
        hint: 'Cuadrado del primero, más el doble producto, más cuadrado del segundo.',
      };
    },
  },
  // ---------------- Unidad 3: Funciones y ecuaciones ----------------
  {
    id: 'gna-tpl-ec1', subject: 'matematica', block: 'funciones_y_ecuaciones', topic: 'ecuacion_primer_grado',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { a: { min: 2, max: 9, step: 1 }, x: { min: 2, max: 9, step: 1 }, b: { min: 1, max: 12, step: 1 } },
    render: (p) => {
      const c = p.a * p.x + p.b;
      return {
        stem: `Resolvé para x: $${p.a}x + ${p.b} = ${c}$.`,
        numeric: { value: p.x, tolerance: 0, toleranceMode: 'abs' },
        explanation: `${p.a}x = ${c} − ${p.b} = ${p.a * p.x}; x = ${p.a * p.x} ÷ ${p.a} = ${p.x}.`,
        hint: 'Pasá el término independiente y después dividí por el coeficiente de x.',
      };
    },
  },
  {
    id: 'gna-tpl-pendiente', subject: 'matematica', block: 'funciones_y_ecuaciones', topic: 'funcion_lineal',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { x1: { min: 1, max: 4, step: 1 }, x2: { min: 5, max: 9, step: 1 }, m: { min: 1, max: 5, step: 1 }, b: { min: 0, max: 6, step: 1 } },
    render: (p) => {
      const y1 = p.m * p.x1 + p.b;
      const y2 = p.m * p.x2 + p.b;
      return {
        stem: `Una recta pasa por los puntos $(${p.x1},\\,${y1})$ y $(${p.x2},\\,${y2})$. ¿Cuál es su pendiente?`,
        numeric: { value: p.m, tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `m = (y₂ − y₁)/(x₂ − x₁) = (${y2} − ${y1})/(${p.x2} − ${p.x1}) = ${y2 - y1}/${p.x2 - p.x1} = ${p.m}.`,
        hint: 'Pendiente = diferencia de y sobre diferencia de x.',
      };
    },
  },
  {
    id: 'gna-tpl-vertice', subject: 'matematica', block: 'funciones_y_ecuaciones', topic: 'funcion_cuadratica',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 3,
    params: { a: { min: 1, max: 3, step: 1 }, r1: { min: 1, max: 4, step: 1 }, r2: { min: 5, max: 9, step: 1 } },
    render: (p) => {
      const b = -(p.r1 + p.r2) * p.a;
      const xv = r(-b / (2 * p.a), 2);
      return {
        stem: `La parábola $y = ${p.a}x^2 ${b < 0 ? '−' : '+'} ${Math.abs(b)}x + ${p.a * p.r1 * p.r2}$ tiene su vértice en $x_v = \\dfrac{-b}{2a}$. ¿Cuánto vale $x_v$?`,
        numeric: { value: xv, tolerance: 0.02, toleranceMode: 'abs' },
        explanation: `x_v = −b/(2a) = ${-b}/(2·${p.a}) = ${xv}. (Es el punto medio entre las raíces ${p.r1} y ${p.r2}.)`,
        hint: 'x del vértice = −b / (2a).',
      };
    },
  },
  {
    id: 'gna-tpl-sistema', subject: 'matematica', block: 'funciones_y_ecuaciones', topic: 'sistemas',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 3,
    params: { x: { min: 2, max: 7, step: 1 }, y: { min: 1, max: 6, step: 1 } },
    render: (p) => {
      const s = p.x + p.y;
      const d = p.x - p.y;
      return {
        stem: `En el sistema $\\begin{cases} x + y = ${s} \\\\ x - y = ${d} \\end{cases}$, ¿cuánto vale x?`,
        numeric: { value: p.x, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Sumando ambas ecuaciones: 2x = ${s} + ${d} = ${s + d}; x = ${p.x}.`,
        hint: 'Sumá las dos ecuaciones para eliminar la y.',
      };
    },
  },
  // ---------------- Unidad 4: Funciones trascendentes ----------------
  {
    id: 'gna-tpl-log', subject: 'matematica', block: 'funciones_trascendentes', topic: 'logaritmos',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { base: { min: 2, max: 5, step: 1 }, k: { min: 2, max: 4, step: 1 } },
    render: (p) => {
      const arg = Math.pow(p.base, p.k);
      return {
        stem: `Calculá $\\log_{${p.base}}(${arg})$.`,
        numeric: { value: p.k, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Se busca el exponente al que hay que elevar ${p.base} para obtener ${arg}: ${p.base}${sup(p.k)} = ${arg}, así que el logaritmo es ${p.k}.`,
        hint: 'log_b(x) pregunta: ¿a qué exponente elevo b para obtener x?',
      };
    },
  },
  {
    id: 'gna-tpl-exponencial', subject: 'matematica', block: 'funciones_trascendentes', topic: 'ecuacion_exponencial',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { base: { min: 2, max: 5, step: 1 }, x: { min: 2, max: 4, step: 1 } },
    render: (p) => {
      const n = Math.pow(p.base, p.x);
      return {
        stem: `Resolvé la ecuación exponencial: $${p.base}^{\\,x} = ${n}$.`,
        numeric: { value: p.x, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Como ${n} = ${p.base}${sup(p.x)}, entonces x = ${p.x}.`,
        hint: 'Expresá el segundo miembro como potencia de la misma base.',
      };
    },
  },
  // ---------------- Unidad 5: Geometría plana ----------------
  {
    id: 'gna-tpl-pitagoras', subject: 'matematica', block: 'geometria_plana', topic: 'teorema_de_pitagoras',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { k: { min: 1, max: 6, step: 1 } },
    render: (p) => {
      const a = 3 * p.k, b = 4 * p.k, c = 5 * p.k;
      return {
        stem: `En un triángulo rectángulo los catetos miden ${a} y ${b}. ¿Cuánto mide la hipotenusa?`,
        numeric: { value: c, tolerance: 0, toleranceMode: 'abs' },
        explanation: `h = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${c}.`,
        hint: 'Hipotenusa = √(cateto₁² + cateto₂²).',
      };
    },
  },
  {
    id: 'gna-tpl-area-triangulo', subject: 'matematica', block: 'geometria_plana', topic: 'perimetros_y_areas',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { base: { min: 4, max: 20, step: 2 }, altura: { min: 3, max: 15, step: 1 } },
    render: (p) => {
      const val = r((p.base * p.altura) / 2, 2);
      return {
        stem: `¿Cuál es el área de un triángulo de base ${p.base} cm y altura ${p.altura} cm? (en cm²)`,
        numeric: { value: val, unit: 'cm²', tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `Área = (base × altura) / 2 = (${p.base} × ${p.altura}) / 2 = ${val} cm².`,
        hint: 'Área del triángulo = base × altura ÷ 2.',
      };
    },
  },
  {
    id: 'gna-tpl-area-circulo', subject: 'matematica', block: 'geometria_plana', topic: 'perimetros_y_areas',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { rad: { min: 2, max: 12, step: 1 } },
    render: (p) => {
      const val = r(Math.PI * p.rad * p.rad, 2);
      return {
        stem: `¿Cuál es el área de un círculo de radio ${p.rad} cm? Usá π = 3,14. (en cm²)`,
        numeric: { value: r(3.14 * p.rad * p.rad, 2), unit: 'cm²', tolerance: 0.5, toleranceMode: 'abs' },
        explanation: `Área = π·r² = 3,14 × ${p.rad}² = 3,14 × ${p.rad * p.rad} = ${r(3.14 * p.rad * p.rad, 2)} cm² (≈ ${val} con π completo).`,
        hint: 'Área del círculo = π × radio².',
      };
    },
  },
  {
    id: 'gna-tpl-complemento', subject: 'matematica', block: 'geometria_plana', topic: 'angulos',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 1,
    params: { ang: { min: 10, max: 80, step: 5 } },
    render: (p) => ({
      stem: `Dos ángulos son complementarios. Si uno mide ${p.ang}°, ¿cuánto mide el otro? (en grados)`,
      numeric: { value: 90 - p.ang, unit: '°', tolerance: 0, toleranceMode: 'abs' },
      explanation: `Los ángulos complementarios suman 90°: 90° − ${p.ang}° = ${90 - p.ang}°.`,
      hint: 'Complementarios suman 90°.',
    }),
  },
  {
    id: 'gna-tpl-trig', subject: 'matematica', block: 'geometria_plana', topic: 'trigonometria',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 3,
    params: { ang: { min: 0, max: 2, step: 1 }, hip: { min: 2, max: 20, step: 2 } },
    render: (p) => {
      const angs = [30, 45, 60];
      const sines = [0.5, 0.707, 0.866];
      const ang = angs[p.ang];
      const val = r(sines[p.ang] * p.hip, 2);
      return {
        stem: `En un triángulo rectángulo la hipotenusa mide ${p.hip} y uno de los ángulos agudos es ${ang}°. ¿Cuánto mide el cateto opuesto a ese ángulo? (usá sen 30°=0,5; sen 45°=0,707; sen 60°=0,866)`,
        numeric: { value: val, tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `cateto opuesto = hipotenusa × sen(${ang}°) = ${p.hip} × ${sines[p.ang]} = ${val}.`,
        hint: 'Cateto opuesto = hipotenusa × seno del ángulo.',
      };
    },
  },
  {
    id: 'gna-tpl-radicacion', subject: 'matematica', block: 'campo_numerico', topic: 'potencias_y_radicales',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { base: { min: 2, max: 20, step: 1 } },
    render: (p) => {
      const arg = p.base * p.base;
      return {
        stem: `Calculá $\\sqrt{${arg}}$.`,
        numeric: { value: p.base, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Se busca el número que elevado al cuadrado da ${arg}: ${p.base}² = ${arg}, así que $\\sqrt{${arg}} = ${p.base}$.`,
        hint: 'La raíz cuadrada pregunta qué número al cuadrado da ese valor.',
      };
    },
  },
  {
    id: 'gna-tpl-regla3-inversa', subject: 'matematica', block: 'campo_numerico', topic: 'regla_de_tres',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 3,
    params: { obr: { min: 2, max: 6, step: 1 }, dias: { min: 12, max: 60, step: 6 }, obr2: { min: 8, max: 12, step: 2 } },
    render: (p) => {
      const val = r((p.obr * p.dias) / p.obr2, 2);
      return {
        stem: `Si ${p.obr} obreros terminan una obra en ${p.dias} días, ¿en cuántos días la terminan ${p.obr2} obreros (al mismo ritmo)?`,
        numeric: { value: val, unit: 'días', tolerance: 0.05, toleranceMode: 'abs' },
        explanation: `Regla de tres inversa: más obreros, menos días. ${p.obr}×${p.dias} = ${p.obr * p.dias}; ${p.obr * p.dias} ÷ ${p.obr2} = ${val} días.`,
        hint: 'Es proporcionalidad inversa: multiplicá las dos cantidades conocidas del mismo tipo y dividí.',
      };
    },
  },
  {
    id: 'gna-tpl-descuento', subject: 'matematica', block: 'campo_numerico', topic: 'porcentaje',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 2,
    params: { precio: { min: 500, max: 5000, step: 500 }, desc: { min: 10, max: 50, step: 5 } },
    render: (p) => {
      const val = r(p.precio * (1 - p.desc / 100), 2);
      return {
        stem: `Un artículo cuesta $${p.precio} y tiene un ${p.desc}% de descuento. ¿Cuánto se paga? (en pesos)`,
        numeric: { value: val, unit: '$', tolerance: 0.5, toleranceMode: 'abs' },
        explanation: `Descuento = ${p.desc}% de ${p.precio} = ${r(p.precio * p.desc / 100, 2)}; precio final = ${p.precio} − ${r(p.precio * p.desc / 100, 2)} = ${val}.`,
        hint: 'Precio final = precio × (1 − descuento/100).',
      };
    },
  },
  {
    id: 'gna-tpl-interes', subject: 'matematica', block: 'campo_numerico', topic: 'porcentaje',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 3,
    params: { cap: { min: 1000, max: 10000, step: 1000 }, tasa: { min: 2, max: 12, step: 2 }, meses: { min: 3, max: 12, step: 3 } },
    render: (p) => {
      const val = r((p.cap * p.tasa * p.meses) / 100, 2);
      return {
        stem: `Un capital de $${p.cap} se coloca al ${p.tasa}% mensual de interés simple durante ${p.meses} meses. ¿Cuánto interés genera? (en pesos)`,
        numeric: { value: val, unit: '$', tolerance: 0.5, toleranceMode: 'abs' },
        explanation: `Interés simple = capital × tasa × tiempo = ${p.cap} × ${p.tasa/100} × ${p.meses} = ${val}.`,
        hint: 'Interés simple = capital × (tasa/100) × tiempo.',
      };
    },
  },
  {
    id: 'gna-tpl-proporcion', subject: 'matematica', block: 'campo_numerico', topic: 'proporcionalidad',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { a: { min: 2, max: 9, step: 1 }, b: { min: 2, max: 6, step: 1 }, k: { min: 2, max: 6, step: 1 } },
    render: (p) => {
      const d = p.b * p.k;
      const x = p.a * p.k;
      return {
        stem: `Resolvé la proporción: $\\dfrac{${p.a}}{${p.b}} = \\dfrac{x}{${d}}$.`,
        numeric: { value: x, tolerance: 0, toleranceMode: 'abs' },
        explanation: `Multiplicando en cruz: ${p.b}·x = ${p.a}·${d}; x = ${p.a * d} ÷ ${p.b} = ${x}.`,
        hint: 'Producto de medios = producto de extremos (multiplicá en cruz).',
      };
    },
  },
  {
    id: 'gna-tpl-promedio', subject: 'matematica', block: 'campo_numerico', topic: 'promedio',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 1,
    params: { a: { min: 2, max: 10, step: 1 }, b: { min: 2, max: 10, step: 1 }, c: { min: 2, max: 10, step: 1 } },
    render: (p) => {
      const val = r((p.a + p.b + p.c) / 3, 2);
      return {
        stem: `¿Cuál es el promedio de ${p.a}, ${p.b} y ${p.c}?`,
        numeric: { value: val, tolerance: 0.02, toleranceMode: 'abs' },
        explanation: `Promedio = (${p.a} + ${p.b} + ${p.c}) / 3 = ${p.a + p.b + p.c} / 3 = ${val}.`,
        hint: 'Sumá los valores y dividí por la cantidad de datos.',
      };
    },
  },
  {
    id: 'gna-tpl-ec2paso', subject: 'matematica', block: 'funciones_y_ecuaciones', topic: 'ecuacion_primer_grado',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { a: { min: 2, max: 6, step: 1 }, x: { min: 2, max: 8, step: 1 }, b: { min: 1, max: 9, step: 1 } },
    render: (p) => {
      const c = p.x / p.a + p.b;
      return {
        stem: `Resolvé para x: $\\dfrac{x}{${p.a}} + ${p.b} = ${r(c, 3)}$.`,
        numeric: { value: p.x, tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `x/${p.a} = ${r(c, 3)} − ${p.b} = ${r(c - p.b, 3)}; x = ${r(c - p.b, 3)} × ${p.a} = ${p.x}.`,
        hint: 'Primero restá el término independiente, después multiplicá por el denominador.',
      };
    },
  },
  {
    id: 'gna-tpl-area-cuadrado', subject: 'matematica', block: 'geometria_plana', topic: 'perimetros_y_areas',
    track: 'practico', type: 'numeric', frequency: 'alta', difficulty: 1,
    params: { lado: { min: 2, max: 20, step: 1 } },
    render: (p) => ({
      stem: `¿Cuál es el área de un cuadrado de lado ${p.lado} cm? (en cm²)`,
      numeric: { value: p.lado * p.lado, unit: 'cm²', tolerance: 0, toleranceMode: 'abs' },
      explanation: `Área del cuadrado = lado² = ${p.lado}² = ${p.lado * p.lado} cm².`,
      hint: 'Área del cuadrado = lado × lado.',
    }),
  },
  {
    id: 'gna-tpl-perimetro-rect', subject: 'matematica', block: 'geometria_plana', topic: 'perimetros_y_areas',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 1,
    params: { base: { min: 3, max: 20, step: 1 }, altura: { min: 2, max: 15, step: 1 } },
    render: (p) => ({
      stem: `¿Cuál es el perímetro de un rectángulo de base ${p.base} cm y altura ${p.altura} cm? (en cm)`,
      numeric: { value: 2 * (p.base + p.altura), unit: 'cm', tolerance: 0, toleranceMode: 'abs' },
      explanation: `Perímetro = 2 × (base + altura) = 2 × (${p.base} + ${p.altura}) = ${2 * (p.base + p.altura)} cm.`,
      hint: 'Perímetro del rectángulo = 2 × (base + altura).',
    }),
  },
  {
    id: 'gna-tpl-volumen-caja', subject: 'matematica', block: 'geometria_plana', topic: 'volumen',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { a: { min: 2, max: 10, step: 1 }, b: { min: 2, max: 10, step: 1 }, c: { min: 2, max: 10, step: 1 } },
    render: (p) => ({
      stem: `¿Cuál es el volumen de un prisma rectangular de aristas ${p.a}, ${p.b} y ${p.c} cm? (en cm³)`,
      numeric: { value: p.a * p.b * p.c, unit: 'cm³', tolerance: 0, toleranceMode: 'abs' },
      explanation: `Volumen = largo × ancho × alto = ${p.a} × ${p.b} × ${p.c} = ${p.a * p.b * p.c} cm³.`,
      hint: 'Volumen del prisma = producto de sus tres aristas.',
    }),
  },
  {
    id: 'gna-tpl-suplemento', subject: 'matematica', block: 'geometria_plana', topic: 'angulos',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 1,
    params: { ang: { min: 15, max: 165, step: 5 } },
    render: (p) => ({
      stem: `Dos ángulos son suplementarios. Si uno mide ${p.ang}°, ¿cuánto mide el otro? (en grados)`,
      numeric: { value: 180 - p.ang, unit: '°', tolerance: 0, toleranceMode: 'abs' },
      explanation: `Los ángulos suplementarios suman 180°: 180° − ${p.ang}° = ${180 - p.ang}°.`,
      hint: 'Suplementarios suman 180°.',
    }),
  },
  {
    id: 'gna-tpl-tales', subject: 'matematica', block: 'geometria_plana', topic: 'teorema_de_tales',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 3,
    params: { a: { min: 2, max: 6, step: 1 }, b: { min: 3, max: 9, step: 1 }, k: { min: 2, max: 5, step: 1 } },
    render: (p) => {
      const c = p.a * p.k;
      const x = p.b * p.k;
      return {
        stem: `Por el teorema de Tales, si $\\dfrac{${p.a}}{${p.b}} = \\dfrac{${c}}{x}$, ¿cuánto vale x?`,
        numeric: { value: x, tolerance: 0.01, toleranceMode: 'abs' },
        explanation: `Segmentos proporcionales: x = (${p.b}·${c}) ÷ ${p.a} = ${p.b * c} ÷ ${p.a} = ${x}.`,
        hint: 'Planteá la proporción y despejá multiplicando en cruz.',
      };
    },
  },
  {
    id: 'gna-tpl-cateto', subject: 'matematica', block: 'geometria_plana', topic: 'teorema_de_pitagoras',
    track: 'practico', type: 'numeric', frequency: 'media', difficulty: 2,
    params: { k: { min: 1, max: 6, step: 1 } },
    render: (p) => {
      const cat = 3 * p.k, hip = 5 * p.k, otro = 4 * p.k;
      return {
        stem: `En un triángulo rectángulo la hipotenusa mide ${hip} y un cateto mide ${cat}. ¿Cuánto mide el otro cateto?`,
        numeric: { value: otro, tolerance: 0, toleranceMode: 'abs' },
        explanation: `cateto = √(hipotenusa² − cateto²) = √(${hip}² − ${cat}²) = √(${hip * hip} − ${cat * cat}) = √${hip * hip - cat * cat} = ${otro}.`,
        hint: 'Despejá de Pitágoras: cateto = √(hipotenusa² − cateto conocido²).',
      };
    },
  },
];

// Semilla base aleatoria por sesión → los números cambian en cada visita.
const sessionSeed = Math.floor(Math.random() * 1_000_000) + 1;
const GNA: Institution[] = ['GNA'];

// Variantes concretas para el banco (varias por plantilla). Se sobreescribe la
// institución a GNA (el generador compartido asume las de Medicina).
export const generatedItems: Item[] = templates
  .flatMap((t, i) => generateVariants(t, 7, sessionSeed + i * 1000))
  .map((it) => ({ ...it, institutions: GNA }));
