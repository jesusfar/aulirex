import type { Formula } from '../../../../types/content';

// Formulario: fórmulas clave con sus variables y —lo más importante para el
// examen— las relaciones de proporcionalidad directa/inversa entre variables.
export const formulas: Formula[] = [
  // ---------------- Química ----------------
  {
    id: 'for-ph',
    subject: 'quimica',
    name: 'pH',
    latex: 'pH = -\\log[H^+]',
    variables: [
      { symbol: 'pH', name: 'acidez', unit: '—' },
      { symbol: '[H⁺]', name: 'concentración de protones', unit: 'mol/L' },
    ],
    relations: [
      { a: 'pH', b: '[H⁺]', kind: 'inversa', note: 'escala logarítmica: a más H⁺, menor pH' },
    ],
  },
  {
    id: 'for-henderson',
    subject: 'quimica',
    name: 'Henderson-Hasselbalch (buffer)',
    latex: 'pH = pK_a + \\log\\dfrac{[\\text{base}]}{[\\text{ácido}]}',
    variables: [
      { symbol: 'pH', name: 'pH del buffer', unit: '—' },
      { symbol: 'pKa', name: 'fuerza del ácido', unit: '—' },
      { symbol: '[base]/[ácido]', name: 'relación conjugada', unit: '—' },
    ],
    relations: [
      { a: 'pH', b: '[base]/[ácido]', kind: 'directa', note: 'si relación = 1, pH = pKa' },
    ],
  },
  {
    id: 'for-molaridad',
    subject: 'quimica',
    name: 'Molaridad',
    latex: 'M = \\dfrac{n}{V}',
    variables: [
      { symbol: 'M', name: 'molaridad', unit: 'mol/L' },
      { symbol: 'n', name: 'moles de soluto', unit: 'mol' },
      { symbol: 'V', name: 'volumen de solución', unit: 'L' },
    ],
    relations: [
      { a: 'M', b: 'n', kind: 'directa', hold: 'V' },
      { a: 'M', b: 'V', kind: 'inversa', hold: 'n' },
    ],
  },
  {
    id: 'for-dilucion',
    subject: 'quimica',
    name: 'Dilución',
    latex: 'C_1 \\cdot V_1 = C_2 \\cdot V_2',
    variables: [
      { symbol: 'C', name: 'concentración', unit: 'mol/L' },
      { symbol: 'V', name: 'volumen', unit: 'L' },
    ],
    relations: [
      { a: 'C', b: 'V', kind: 'inversa', note: 'los moles de soluto se conservan' },
    ],
  },
  {
    id: 'for-gases',
    subject: 'quimica',
    name: 'Ley general de los gases',
    latex: 'P \\cdot V = n \\cdot R \\cdot T',
    variables: [
      { symbol: 'P', name: 'presión', unit: 'atm' },
      { symbol: 'V', name: 'volumen', unit: 'L' },
      { symbol: 'T', name: 'temperatura', unit: 'K' },
      { symbol: 'n', name: 'moles', unit: 'mol' },
    ],
    relations: [
      { a: 'P', b: 'V', kind: 'inversa', hold: 'T', note: 'Boyle' },
      { a: 'V', b: 'T', kind: 'directa', hold: 'P', note: 'Charles' },
      { a: 'P', b: 'T', kind: 'directa', hold: 'V', note: 'Gay-Lussac' },
    ],
  },
  // ---------------- Física ----------------
  {
    id: 'for-velocidad',
    subject: 'fisica',
    name: 'Velocidad (MRU)',
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
    id: 'for-mruv',
    subject: 'fisica',
    name: 'Velocidad final (MRUV)',
    latex: 'v_f = v_i + a \\cdot t',
    variables: [
      { symbol: 'vf', name: 'velocidad final', unit: 'm/s' },
      { symbol: 'vi', name: 'velocidad inicial', unit: 'm/s' },
      { symbol: 'a', name: 'aceleración', unit: 'm/s²' },
      { symbol: 't', name: 'tiempo', unit: 's' },
    ],
    relations: [
      { a: 'vf', b: 'a', kind: 'directa', hold: 't' },
      { a: 'vf', b: 't', kind: 'directa', hold: 'a' },
    ],
  },
  {
    id: 'for-newton2',
    subject: 'fisica',
    name: 'Segunda ley de Newton',
    latex: 'F = m \\cdot a',
    variables: [
      { symbol: 'F', name: 'fuerza', unit: 'N' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'a', name: 'aceleración', unit: 'm/s²' },
    ],
    relations: [
      { a: 'F', b: 'm', kind: 'directa', hold: 'a' },
      { a: 'F', b: 'a', kind: 'directa', hold: 'm' },
      { a: 'a', b: 'm', kind: 'inversa', hold: 'F' },
    ],
  },
  {
    id: 'for-peso',
    subject: 'fisica',
    name: 'Peso',
    latex: 'P = m \\cdot g',
    variables: [
      { symbol: 'P', name: 'peso', unit: 'N' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'g', name: 'gravedad', unit: 'm/s²' },
    ],
    relations: [{ a: 'P', b: 'm', kind: 'directa', hold: 'g' }],
  },
  {
    id: 'for-gravitacion',
    subject: 'fisica',
    name: 'Gravitación universal',
    latex: 'F = G\\,\\dfrac{m_1 \\cdot m_2}{d^2}',
    variables: [
      { symbol: 'F', name: 'fuerza gravitatoria', unit: 'N' },
      { symbol: 'm₁·m₂', name: 'producto de masas', unit: 'kg²' },
      { symbol: 'd', name: 'distancia', unit: 'm' },
    ],
    relations: [
      { a: 'F', b: 'm₁·m₂', kind: 'directa' },
      { a: 'F', b: 'd', kind: 'inversa', note: 'inversa al cuadrado (1/d²)' },
    ],
  },
  {
    id: 'for-trabajo',
    subject: 'fisica',
    name: 'Trabajo',
    latex: 'W = F \\cdot d \\cdot \\cos\\theta',
    variables: [
      { symbol: 'W', name: 'trabajo', unit: 'J' },
      { symbol: 'F', name: 'fuerza', unit: 'N' },
      { symbol: 'd', name: 'desplazamiento', unit: 'm' },
    ],
    relations: [
      { a: 'W', b: 'F', kind: 'directa', hold: 'd' },
      { a: 'W', b: 'd', kind: 'directa', hold: 'F' },
    ],
  },
  {
    id: 'for-ecinetica',
    subject: 'fisica',
    name: 'Energía cinética',
    latex: 'E_c = \\tfrac{1}{2}\\,m\\,v^2',
    variables: [
      { symbol: 'Ec', name: 'energía cinética', unit: 'J' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'v', name: 'velocidad', unit: 'm/s' },
    ],
    relations: [
      { a: 'Ec', b: 'm', kind: 'directa', hold: 'v' },
      { a: 'Ec', b: 'v', kind: 'directa', note: 'con el cuadrado (v²)' },
    ],
  },
  {
    id: 'for-epotencial',
    subject: 'fisica',
    name: 'Energía potencial',
    latex: 'E_p = m \\cdot g \\cdot h',
    variables: [
      { symbol: 'Ep', name: 'energía potencial', unit: 'J' },
      { symbol: 'm', name: 'masa', unit: 'kg' },
      { symbol: 'h', name: 'altura', unit: 'm' },
    ],
    relations: [
      { a: 'Ep', b: 'h', kind: 'directa', hold: 'm' },
      { a: 'Ep', b: 'm', kind: 'directa', hold: 'h' },
    ],
  },
  {
    id: 'for-ohm',
    subject: 'fisica',
    name: 'Ley de Ohm',
    latex: 'V = I \\cdot R',
    variables: [
      { symbol: 'V', name: 'tensión', unit: 'V' },
      { symbol: 'I', name: 'corriente', unit: 'A' },
      { symbol: 'R', name: 'resistencia', unit: 'Ω' },
    ],
    relations: [
      { a: 'V', b: 'I', kind: 'directa', hold: 'R' },
      { a: 'V', b: 'R', kind: 'directa', hold: 'I' },
      { a: 'I', b: 'R', kind: 'inversa', hold: 'V' },
    ],
  },
  {
    id: 'for-presion',
    subject: 'fisica',
    name: 'Presión',
    latex: 'P = \\dfrac{F}{A}',
    variables: [
      { symbol: 'P', name: 'presión', unit: 'Pa' },
      { symbol: 'F', name: 'fuerza', unit: 'N' },
      { symbol: 'A', name: 'área', unit: 'm²' },
    ],
    relations: [
      { a: 'P', b: 'F', kind: 'directa', hold: 'A' },
      { a: 'P', b: 'A', kind: 'inversa', hold: 'F' },
    ],
  },
  {
    id: 'for-phidrostatica',
    subject: 'fisica',
    name: 'Presión hidrostática',
    latex: 'P = \\delta \\cdot g \\cdot h',
    variables: [
      { symbol: 'P', name: 'presión', unit: 'Pa' },
      { symbol: 'δ', name: 'densidad del líquido', unit: 'kg/m³' },
      { symbol: 'h', name: 'profundidad', unit: 'm' },
    ],
    relations: [
      { a: 'P', b: 'h', kind: 'directa', hold: 'δ' },
      { a: 'P', b: 'δ', kind: 'directa', hold: 'h' },
    ],
  },
  {
    id: 'for-densidad',
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
    id: 'for-caudal',
    subject: 'fisica',
    name: 'Caudal',
    latex: 'Q = v \\cdot A',
    variables: [
      { symbol: 'Q', name: 'caudal', unit: 'm³/s' },
      { symbol: 'v', name: 'velocidad', unit: 'm/s' },
      { symbol: 'A', name: 'área', unit: 'm²' },
    ],
    relations: [
      { a: 'Q', b: 'v', kind: 'directa', hold: 'A' },
      { a: 'Q', b: 'A', kind: 'directa', hold: 'v' },
    ],
  },
];

export const formulaById = new Map(formulas.map((f) => [f.id, f]));
