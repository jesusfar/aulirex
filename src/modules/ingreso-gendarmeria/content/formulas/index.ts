import type { Formula } from '../../../../types/content';

// Formulario del examen de ingreso a Gendarmería: fórmulas clave de Matemática y
// Física con sus variables y las relaciones de proporcionalidad directa/inversa.
export const formulas: Formula[] = [
  // ---------------- Matemática ----------------
  {
    id: 'gna-for-cuadratica',
    subject: 'matematica',
    name: 'Ecuación de segundo grado',
    latex: 'x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    variables: [
      { symbol: 'a, b, c', name: 'coeficientes', unit: '—' },
      { symbol: 'x', name: 'raíces', unit: '—' },
    ],
    relations: [
      { a: 'b²−4ac', b: 'nº de raíces reales', kind: 'directa', note: 'discriminante: >0 dos raíces, =0 una, <0 ninguna real' },
    ],
  },
  {
    id: 'gna-for-recta',
    subject: 'matematica',
    name: 'Ecuación de la recta',
    latex: 'y = m\\,x + b',
    variables: [
      { symbol: 'm', name: 'pendiente', unit: '—' },
      { symbol: 'b', name: 'ordenada al origen', unit: '—' },
    ],
    relations: [
      { a: 'm', b: 'inclinación', kind: 'directa', note: 'rectas paralelas: igual m; perpendiculares: m₁·m₂ = −1' },
    ],
  },
  {
    id: 'gna-for-pitagoras',
    subject: 'matematica',
    name: 'Teorema de Pitágoras',
    latex: 'a^2 + b^2 = c^2',
    variables: [
      { symbol: 'a, b', name: 'catetos', unit: '—' },
      { symbol: 'c', name: 'hipotenusa', unit: '—' },
    ],
    relations: [
      { a: 'catetos', b: 'hipotenusa', kind: 'directa', note: 'solo en triángulos rectángulos' },
    ],
  },
  {
    id: 'gna-for-log',
    subject: 'matematica',
    name: 'Logaritmo (propiedades)',
    latex: '\\log(x\\cdot y) = \\log x + \\log y',
    variables: [
      { symbol: 'x, y', name: 'argumentos', unit: '—' },
    ],
    relations: [
      { a: 'producto', b: 'suma de logs', kind: 'directa', note: 'log(x/y)=log x − log y; log(xⁿ)=n·log x' },
    ],
  },
  // ---------------- Física ----------------
  {
    id: 'gna-for-mru',
    subject: 'fisica',
    name: 'MRU — velocidad',
    latex: 'v = \\dfrac{\\Delta x}{\\Delta t}',
    variables: [
      { symbol: 'v', name: 'velocidad', unit: 'm/s' },
      { symbol: 'Δx', name: 'desplazamiento', unit: 'm' },
      { symbol: 'Δt', name: 'tiempo', unit: 's' },
    ],
    relations: [
      { a: 'v', b: 'Δx', kind: 'directa', hold: 'Δt' },
      { a: 'v', b: 'Δt', kind: 'inversa', hold: 'Δx' },
    ],
  },
  {
    id: 'gna-for-mruv',
    subject: 'fisica',
    name: 'MRUV — aceleración',
    latex: 'v_f = v_0 + a\\,t',
    variables: [
      { symbol: 'a', name: 'aceleración', unit: 'm/s²' },
      { symbol: 't', name: 'tiempo', unit: 's' },
      { symbol: 'v', name: 'velocidad', unit: 'm/s' },
    ],
    relations: [
      { a: 'v_f', b: 'a', kind: 'directa', hold: 't' },
    ],
  },
  {
    id: 'gna-for-newton',
    subject: 'fisica',
    name: 'Segunda ley de Newton',
    latex: 'F = m\\,a',
    variables: [
      { symbol: 'F', name: 'fuerza', unit: 'N' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'a', name: 'aceleración', unit: 'm/s²' },
    ],
    relations: [
      { a: 'a', b: 'F', kind: 'directa', hold: 'm' },
      { a: 'a', b: 'm', kind: 'inversa', hold: 'F' },
    ],
  },
  {
    id: 'gna-for-ec',
    subject: 'fisica',
    name: 'Energía cinética',
    latex: 'E_c = \\tfrac{1}{2}\\,m\\,v^2',
    variables: [
      { symbol: 'Ec', name: 'energía cinética', unit: 'J' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'v', name: 'velocidad', unit: 'm/s' },
    ],
    relations: [
      { a: 'Ec', b: 'v', kind: 'directa', note: 'crece con el cuadrado de la velocidad' },
    ],
  },
  {
    id: 'gna-for-presion',
    subject: 'fisica',
    name: 'Presión hidrostática',
    latex: 'p = \\rho\\,g\\,h',
    variables: [
      { symbol: 'p', name: 'presión', unit: 'Pa' },
      { symbol: 'ρ', name: 'densidad', unit: 'kg/m³' },
      { symbol: 'h', name: 'profundidad', unit: 'm' },
    ],
    relations: [
      { a: 'p', b: 'h', kind: 'directa', hold: 'ρ' },
    ],
  },
  {
    id: 'gna-for-ohm',
    subject: 'fisica',
    name: 'Ley de Ohm',
    latex: 'V = I\\,R',
    variables: [
      { symbol: 'V', name: 'tensión', unit: 'V' },
      { symbol: 'I', name: 'intensidad', unit: 'A' },
      { symbol: 'R', name: 'resistencia', unit: 'Ω' },
    ],
    relations: [
      { a: 'I', b: 'V', kind: 'directa', hold: 'R' },
      { a: 'I', b: 'R', kind: 'inversa', hold: 'V' },
    ],
  },

  // ---------------- Matemática (agregadas del anexo HQ/Quantum) ----------------
  {
    id: 'gna-for-trigonometria',
    subject: 'matematica',
    name: 'Razones trigonométricas',
    latex: '\\sin\\theta = \\dfrac{CO}{H},\\ \\cos\\theta = \\dfrac{CA}{H},\\ \\tan\\theta = \\dfrac{CO}{CA}',
    variables: [
      { symbol: 'CO', name: 'cateto opuesto', unit: '—' },
      { symbol: 'CA', name: 'cateto adyacente', unit: '—' },
      { symbol: 'H', name: 'hipotenusa', unit: '—' },
    ],
  },
  {
    id: 'gna-for-teorema-coseno',
    subject: 'matematica',
    name: 'Teorema del coseno',
    latex: 'a^2 = b^2 + c^2 - 2\\,b\\,c\\,\\cos\\alpha',
    variables: [
      { symbol: 'a, b, c', name: 'lados del triángulo', unit: '—' },
      { symbol: 'α', name: 'ángulo opuesto al lado a', unit: '°' },
    ],
  },
  // ---------------- Física (mecánica, fluidos y electricidad básicos) ----------------
  {
    id: 'gna-for-peso',
    subject: 'fisica',
    name: 'Peso',
    latex: 'P = m\\,g',
    variables: [
      { symbol: 'P', name: 'peso', unit: 'N' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'g', name: 'gravedad', unit: 'm/s²' },
    ],
    relations: [{ a: 'P', b: 'm', kind: 'directa', hold: 'g' }],
  },
  {
    id: 'gna-for-posicion',
    subject: 'fisica',
    name: 'Posición en MRUV',
    latex: 'd = v_0\\,t + \\tfrac{1}{2}\\,a\\,t^2',
    variables: [
      { symbol: 'd', name: 'distancia', unit: 'm' },
      { symbol: 'v₀', name: 'velocidad inicial', unit: 'm/s' },
      { symbol: 'a', name: 'aceleración', unit: 'm/s²' },
      { symbol: 't', name: 'tiempo', unit: 's' },
    ],
    relations: [{ a: 'd', b: 't', kind: 'directa', note: 'crece con el cuadrado del tiempo' }],
  },
  {
    id: 'gna-for-torricelli',
    subject: 'fisica',
    name: 'Ecuación de Torricelli',
    latex: 'v_f^{\\,2} = v_0^{\\,2} + 2\\,a\\,d',
    variables: [
      { symbol: 'v_f', name: 'velocidad final', unit: 'm/s' },
      { symbol: 'v₀', name: 'velocidad inicial', unit: 'm/s' },
      { symbol: 'a', name: 'aceleración', unit: 'm/s²' },
      { symbol: 'd', name: 'distancia', unit: 'm' },
    ],
    relations: [{ a: 'v_f', b: 'd', kind: 'directa', note: 'no depende del tiempo' }],
  },
  {
    id: 'gna-for-trabajo',
    subject: 'fisica',
    name: 'Trabajo',
    latex: 'W = F\\,d\\,\\cos\\alpha',
    variables: [
      { symbol: 'W', name: 'trabajo', unit: 'J' },
      { symbol: 'F', name: 'fuerza', unit: 'N' },
      { symbol: 'd', name: 'desplazamiento', unit: 'm' },
      { symbol: 'α', name: 'ángulo fuerza-desplazamiento', unit: '°' },
    ],
    relations: [
      { a: 'W', b: 'F', kind: 'directa', hold: 'd' },
      { a: 'W', b: 'd', kind: 'directa', hold: 'F' },
    ],
  },
  {
    id: 'gna-for-potencia',
    subject: 'fisica',
    name: 'Potencia mecánica',
    latex: 'Pot = \\dfrac{W}{t} = F \\cdot v',
    variables: [
      { symbol: 'Pot', name: 'potencia', unit: 'W' },
      { symbol: 'W', name: 'trabajo', unit: 'J' },
      { symbol: 't', name: 'tiempo', unit: 's' },
    ],
    relations: [
      { a: 'Pot', b: 'W', kind: 'directa', hold: 't' },
      { a: 'Pot', b: 't', kind: 'inversa', hold: 'W' },
    ],
  },
  {
    id: 'gna-for-ep',
    subject: 'fisica',
    name: 'Energía potencial',
    latex: 'E_p = m\\,g\\,h',
    variables: [
      { symbol: 'Ep', name: 'energía potencial', unit: 'J' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'g', name: 'gravedad', unit: 'm/s²' },
      { symbol: 'h', name: 'altura', unit: 'm' },
    ],
    relations: [{ a: 'Ep', b: 'h', kind: 'directa', hold: 'm' }],
  },
  {
    id: 'gna-for-em',
    subject: 'fisica',
    name: 'Energía mecánica',
    latex: 'E_m = E_c + E_p',
    variables: [
      { symbol: 'E_m', name: 'energía mecánica', unit: 'J' },
      { symbol: 'E_c', name: 'energía cinética', unit: 'J' },
      { symbol: 'E_p', name: 'energía potencial', unit: 'J' },
    ],
    relations: [{ a: 'E_m', b: 'E_c', kind: 'directa', note: 'se conserva con fuerzas conservativas' }],
  },
  {
    id: 'gna-for-momento',
    subject: 'fisica',
    name: 'Cantidad de movimiento',
    latex: 'p = m \\cdot v',
    variables: [
      { symbol: 'p', name: 'cantidad de movimiento', unit: 'kg·m/s' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'v', name: 'velocidad', unit: 'm/s' },
    ],
    relations: [{ a: 'p', b: 'v', kind: 'directa', hold: 'm' }],
  },
  {
    id: 'gna-for-plano-inclinado',
    subject: 'fisica',
    name: 'Aceleración en plano inclinado',
    latex: 'a = g \\cdot \\sin\\alpha',
    variables: [
      { symbol: 'a', name: 'aceleración', unit: 'm/s²' },
      { symbol: 'g', name: 'gravedad', unit: 'm/s²' },
      { symbol: 'α', name: 'ángulo de inclinación', unit: '°' },
    ],
    relations: [{ a: 'a', b: 'α', kind: 'directa', note: 'sin rozamiento' }],
  },
  {
    id: 'gna-for-densidad',
    subject: 'fisica',
    name: 'Densidad',
    latex: '\\delta = \\dfrac{m}{V}',
    variables: [
      { symbol: 'δ', name: 'densidad', unit: 'kg/m³' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'V', name: 'volumen', unit: 'm³' },
    ],
    relations: [
      { a: 'δ', b: 'm', kind: 'directa', hold: 'V' },
      { a: 'δ', b: 'V', kind: 'inversa', hold: 'm' },
    ],
  },
  {
    id: 'gna-for-empuje',
    subject: 'fisica',
    name: 'Empuje (Arquímedes)',
    latex: 'E = \\delta_{fluido} \\cdot V_{sum} \\cdot g',
    variables: [
      { symbol: 'E', name: 'empuje', unit: 'N' },
      { symbol: 'δ', name: 'densidad del fluido', unit: 'kg/m³' },
      { symbol: 'V_sum', name: 'volumen sumergido', unit: 'm³' },
      { symbol: 'g', name: 'gravedad', unit: 'm/s²' },
    ],
    relations: [{ a: 'E', b: 'V_sum', kind: 'directa', hold: 'δ' }],
  },
  {
    id: 'gna-for-potencia-electrica',
    subject: 'fisica',
    name: 'Potencia eléctrica',
    latex: 'Pot = V \\cdot I = I^2 R',
    variables: [
      { symbol: 'Pot', name: 'potencia', unit: 'W' },
      { symbol: 'V', name: 'tensión', unit: 'V' },
      { symbol: 'I', name: 'intensidad', unit: 'A' },
      { symbol: 'R', name: 'resistencia', unit: 'Ω' },
    ],
    relations: [{ a: 'Pot', b: 'I', kind: 'directa', hold: 'V' }],
  },
  {
    id: 'gna-for-resistencias',
    subject: 'fisica',
    name: 'Resistencias en serie y paralelo',
    latex: 'R_s = R_1 + R_2, \\quad \\dfrac{1}{R_p} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}',
    variables: [
      { symbol: 'R_s', name: 'resistencia en serie', unit: 'Ω' },
      { symbol: 'R_p', name: 'resistencia en paralelo', unit: 'Ω' },
      { symbol: 'R₁, R₂', name: 'resistencias', unit: 'Ω' },
    ],
    relations: [{ a: 'R_s', b: 'R₁, R₂', kind: 'directa', note: 'en serie se suman; en paralelo baja' }],
  },
];

export const formulaById = new Map(formulas.map((f) => [f.id, f]));
