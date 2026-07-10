import type { Misconception } from '../../../../types/content';

// Errores conceptuales frecuentes en Química. Contenido original.
export const misconceptions: Misconception[] = [
  {
    id: 'mc-buffer-fuerte',
    subject: 'quimica',
    name: 'Cree que un ácido o base fuerte forma buffer',
    remedy:
      'Un buffer necesita un ácido débil + su base conjugada (o una base débil + su ácido conjugado). Los electrolitos fuertes (HCl, NaOH) se disocian del todo y no amortiguan.',
    processMapId: 'pmap-buffer',
  },
  {
    id: 'mc-ph-mas-alto-mas-acido',
    subject: 'quimica',
    name: 'Cree que a mayor pH la solución es más ácida',
    remedy:
      'Es al revés: pH bajo (<7) = ácido, pH alto (>7) = básico. Como pH = −log[H⁺], más [H⁺] da MENOR pH.',
  },
  {
    id: 'mc-ph-lineal',
    subject: 'quimica',
    name: 'Trata la escala de pH como lineal',
    remedy:
      'La escala de pH es logarítmica: cada unidad de pH es un factor 10 en [H⁺]. De pH 3 a pH 5 hay 100 veces menos H⁺, no "2 veces menos".',
  },
  {
    id: 'mc-hibridacion-enlaces',
    subject: 'quimica',
    name: 'Confunde la hibridación con el número de enlaces',
    remedy:
      'La hibridación depende de los enlaces σ (sigma) y pares libres alrededor del carbono: sp³ = 4 σ (simples), sp² = 3 σ + 1 π (doble), sp = 2 σ + 2 π (triple o dos dobles).',
  },
  {
    id: 'mc-grupo-funcional-alcohol-vs-acido',
    subject: 'quimica',
    name: 'Confunde grupos funcionales oxigenados',
    remedy:
      'Alcohol = −OH; aldehído = −CHO (extremo); cetona = C=O (interno); ácido carboxílico = −COOH. Fíjate en la estructura completa, no solo en el oxígeno.',
  },
  {
    id: 'mc-dilucion-cambia-moles',
    subject: 'quimica',
    name: 'Cree que al diluir cambian los moles de soluto',
    remedy:
      'Al diluir agregás solvente: los moles de soluto NO cambian, solo baja la concentración. Por eso vale C₁·V₁ = C₂·V₂.',
  },
  {
    id: 'mc-coligativas-dependen-identidad',
    subject: 'quimica',
    name: 'Cree que las coligativas dependen del tipo de soluto',
    remedy:
      'Las propiedades coligativas dependen de la CANTIDAD de partículas de soluto, no de su identidad química. Por eso un electrolito que se disocia afecta más (factor i de van’t Hoff).',
  },
  {
    id: 'mc-isotopos-cambian-elemento',
    subject: 'quimica',
    name: 'Cree que cambiar el número de neutrones cambia el elemento',
    remedy:
      'Los isótopos tienen el mismo número atómico (Z, protones) y distinto número másico (A). Siguen siendo el mismo elemento; solo cambia la masa.',
  },
];
