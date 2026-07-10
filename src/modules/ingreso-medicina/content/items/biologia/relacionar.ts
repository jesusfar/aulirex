import type { Item } from '../../../../../types/content';

// Relacionar (matching): emparejar cada elemento de la izquierda con su par.
// Formato clásico del ingreso ("una con flechas"). Contenido original.
export const items: Item[] = [
  {
    id: 'bio-rel-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'mitocondria_atp',
    track: 'teorico',
    type: 'matching',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Relacioná cada parte de la mitocondria con lo que le corresponde:',
    pairs: [
      ['Membrana externa', 'Lisa y permeable, con porinas'],
      ['Membrana interna (crestas)', 'Cadena respiratoria y ATP sintasa'],
      ['Matriz', 'Ciclo de Krebs y ADN circular'],
      ['Espacio intermembrana', 'Acumulación de protones (H⁺)'],
    ],
    explanation:
      'La membrana externa es lisa y permeable por sus porinas; la interna se pliega en crestas que alojan la cadena respiratoria y la ATP sintasa; la matriz contiene el ciclo de Krebs y el ADN mitocondrial; el espacio intermembrana acumula H⁺ para la síntesis de ATP.',
    processMapId: 'pmap-mitocondria',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-rel-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'biologia_celular',
    topic: 'organelas',
    track: 'teorico',
    type: 'matching',
    frequency: 'alta',
    difficulty: 1,
    stem: 'Relacioná cada organela con su función principal:',
    pairs: [
      ['Ribosoma', 'Síntesis de proteínas'],
      ['Lisosoma', 'Digestión intracelular'],
      ['Mitocondria', 'Producción de ATP'],
      ['Aparato de Golgi', 'Empaque y distribución de proteínas'],
    ],
    explanation:
      'El ribosoma sintetiza proteínas; el lisosoma degrada material con hidrolasas; la mitocondria produce ATP; el aparato de Golgi modifica, empaca y distribuye las proteínas en vesículas.',
    source: 'original',
    version: 1,
    status: 'active',
  },
  {
    id: 'bio-rel-0003',
    institutions: ['UNC', 'UNSa'],
    subject: 'biologia',
    block: 'sistemas_humanos',
    topic: 'sistema_nervioso_autonomo',
    track: 'teorico',
    type: 'matching',
    frequency: 'media',
    difficulty: 2,
    stem: 'Relacioná cada efecto con la división del sistema nervioso autónomo que lo produce:',
    pairs: [
      ['Taquicardia (acelera el corazón)', 'Simpático'],
      ['Midriasis (dilata la pupila)', 'Simpático'],
      ['Aumento del peristaltismo', 'Parasimpático'],
      ['Broncoconstricción', 'Parasimpático'],
    ],
    explanation:
      'El simpático prepara para "luchar o huir" (taquicardia, midriasis, broncodilatación); el parasimpático rige "reposo y digestión" (más peristaltismo, miosis, broncoconstricción).',
    source: 'original',
    version: 1,
    status: 'active',
  },
];
