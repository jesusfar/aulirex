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
];

export const formulaById = new Map(formulas.map((f) => [f.id, f]));
