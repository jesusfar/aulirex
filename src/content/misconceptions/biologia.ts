import type { Misconception } from '../../types/content';

// Errores conceptuales frecuentes en Biología. El feedback de cada distractor
// referencia estos ids para agrupar el Cuaderno de errores por "idea mal
// entendida", no por pregunta suelta. Contenido original.
export const misconceptions: Misconception[] = [
  {
    id: 'mc-transporte-activo-sin-atp',
    subject: 'biologia',
    name: 'Cree que el transporte activo no gasta energía',
    remedy:
      'El transporte activo mueve solutos EN CONTRA del gradiente y por eso consume ATP. Solo el transporte pasivo (difusión simple y facilitada) va a favor del gradiente sin gasto de energía.',
    processMapId: 'pmap-transporte',
  },
  {
    id: 'mc-difusion-facilitada-gasta-atp',
    subject: 'biologia',
    name: 'Cree que la difusión facilitada gasta ATP por usar proteína',
    remedy:
      'Usar una proteína transportadora no implica gastar energía: la difusión facilitada sigue el gradiente, así que es transporte pasivo aunque intervenga una proteína.',
    processMapId: 'pmap-transporte',
  },
  {
    id: 'mc-membrana-solo-fosfolipidos',
    subject: 'biologia',
    name: 'Cree que la membrana es solo fosfolípidos',
    remedy:
      'La membrana es un mosaico fluido: bicapa de fosfolípidos PERO también colesterol, proteínas (integrales y periféricas) y glúcidos (glucocáliz) en la cara externa.',
  },
  {
    id: 'mc-mitocondria-membrana-externa-crestas',
    subject: 'biologia',
    name: 'Confunde qué membrana mitocondrial forma las crestas',
    remedy:
      'Las crestas son pliegues de la membrana INTERNA, donde está la cadena respiratoria y la ATP sintasa. La externa es lisa y permeable por las porinas.',
    processMapId: 'pmap-mitocondria',
  },
  {
    id: 'mc-aceptor-final-electrones',
    subject: 'biologia',
    name: 'Cree que el aceptor final de electrones es el CO₂',
    remedy:
      'En la respiración aeróbica el aceptor FINAL de electrones en la cadena respiratoria es el O₂, que se reduce a agua. El CO₂ es un producto del ciclo de Krebs, no el aceptor.',
    processMapId: 'pmap-mitocondria',
  },
  {
    id: 'mc-enzimas-dogma',
    subject: 'biologia',
    name: 'Confunde las enzimas del dogma central',
    remedy:
      'ADN polimerasa duplica el ADN; ARN polimerasa transcribe ADN→ARN; los ribosomas (con ARNt) traducen ARN→proteína. No mezcles la enzima de cada etapa.',
    processMapId: 'pmap-dogma',
  },
  {
    id: 'mc-homocigota-heterocigota',
    subject: 'biologia',
    name: 'Confunde homocigota con heterocigota',
    remedy:
      'Homocigota = dos alelos IGUALES (AA o aa). Heterocigota = dos alelos DISTINTOS (Aa). El heterocigota expresa el dominante pero porta el recesivo.',
  },
  {
    id: 'mc-proporcion-mendel',
    subject: 'biologia',
    name: 'Se equivoca con las proporciones de un cruce monohíbrido',
    remedy:
      'Aa × Aa da 3:1 fenotípico (3 dominante : 1 recesivo) y 1:2:1 genotípico (AA:Aa:aa). No confundas la proporción de fenotipos con la de genotipos.',
  },
  {
    id: 'mc-grupo-sanguineo-dominancia',
    subject: 'biologia',
    name: 'Cree que el grupo AB es por dominancia simple',
    remedy:
      'A y B son codominantes: en el genotipo IAIB ambos se expresan (grupo AB). El 0 (ii) es recesivo frente a A y a B.',
  },
  {
    id: 'mc-hematosis-direccion',
    subject: 'biologia',
    name: 'Invierte la dirección del intercambio gaseoso',
    remedy:
      'En la hematosis (alvéolo-capilar) el O₂ pasa del alvéolo a la sangre y el CO₂ de la sangre al alvéolo, siempre a favor del gradiente de presión parcial.',
    processMapId: 'pmap-hematosis',
  },
  {
    id: 'mc-simpatico-parasimpatico',
    subject: 'biologia',
    name: 'Invierte los efectos de simpático y parasimpático',
    remedy:
      'El simpático prepara para "luchar o huir" (taquicardia, midriasis, broncodilatación). El parasimpático es de "reposo y digestión" (bradicardia, miosis, más peristaltismo).',
  },
];
