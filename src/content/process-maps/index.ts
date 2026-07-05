import type { ProcessMap } from '../../types/content';

// Mapas de proceso: secuencias de pasos que explican un mecanismo. Se muestran
// en el feedback de un ítem (o de su misconcepción) para reforzar el "cómo
// funciona", no solo el "qué respuesta". Render liviano por pasos (sin Mermaid).
export const processMaps: ProcessMap[] = [
  {
    id: 'pmap-transporte',
    title: 'Transporte a través de la membrana',
    subject: 'biologia',
    format: 'svg',
    diagram: '',
    steps: [
      { id: '1', label: '¿A favor o en contra del gradiente?', detail: 'Definí primero la dirección respecto de la concentración: eso decide todo.' },
      { id: '2', label: 'A favor → transporte PASIVO', detail: 'Difusión simple, difusión facilitada (con proteína) u ósmosis. No gasta ATP.' },
      { id: '3', label: 'En contra → transporte ACTIVO', detail: 'Requiere energía (ATP). Ej.: bomba Na⁺/K⁺ (saca 3 Na⁺, mete 2 K⁺).' },
      { id: '4', label: 'Transporte en masa', detail: 'Endocitosis/exocitosis mueven grandes cantidades con vesículas y gasto de energía.' },
    ],
  },
  {
    id: 'pmap-mitocondria',
    title: 'Respiración celular en la mitocondria',
    subject: 'biologia',
    format: 'svg',
    diagram: '',
    steps: [
      { id: '1', label: 'Glucólisis (citoplasma)', detail: 'La glucosa se parte en 2 piruvatos; se obtiene poco ATP y NADH.' },
      { id: '2', label: 'Descarboxilación → acetil-CoA', detail: 'El piruvato entra a la matriz y se convierte en acetil-CoA (libera CO₂).' },
      { id: '3', label: 'Ciclo de Krebs (matriz)', detail: 'Genera NADH y FADH₂, y libera CO₂.' },
      { id: '4', label: 'Cadena respiratoria (membrana interna/crestas)', detail: 'Los electrones fluyen hasta el O₂ (aceptor final → agua) y la ATP sintasa produce la mayor parte del ATP.' },
    ],
  },
  {
    id: 'pmap-dogma',
    title: 'Dogma central de la biología molecular',
    subject: 'biologia',
    format: 'svg',
    diagram: '',
    steps: [
      { id: '1', label: 'Duplicación (ADN → ADN)', detail: 'Enzima: ADN polimerasa. Copia el material genético antes de dividirse.' },
      { id: '2', label: 'Transcripción (ADN → ARNm)', detail: 'Enzima: ARN polimerasa. Ocurre en el núcleo.' },
      { id: '3', label: 'Traducción (ARNm → proteína)', detail: 'En el ribosoma (citoplasma), con ARNt. Cada etapa tiene su enzima: no las mezcles.' },
    ],
  },
  {
    id: 'pmap-hematosis',
    title: 'Hematosis (intercambio gaseoso alvéolo-capilar)',
    subject: 'biologia',
    format: 'svg',
    diagram: '',
    steps: [
      { id: '1', label: 'En el alvéolo: mucho O₂, poco CO₂', detail: 'La sangre venosa llega con lo contrario.' },
      { id: '2', label: 'El O₂ difunde del alvéolo → sangre', detail: 'A favor del gradiente de presión parcial, sin gasto de energía.' },
      { id: '3', label: 'El CO₂ difunde de la sangre → alvéolo', detail: 'Se elimina en la espiración. Cada gas va a favor de SU gradiente.' },
    ],
  },
  {
    id: 'pmap-nefrona',
    title: 'Formación de orina en la nefrona',
    subject: 'biologia',
    format: 'svg',
    diagram: '',
    steps: [
      { id: '1', label: 'Filtración (corpúsculo renal)', detail: 'El glomérulo filtra el plasma hacia la cápsula de Bowman.' },
      { id: '2', label: 'Reabsorción (túbulos)', detail: 'Se recuperan agua, glucosa, iones y nutrientes útiles.' },
      { id: '3', label: 'Secreción (túbulos)', detail: 'Se agregan desechos desde la sangre al túbulo.' },
      { id: '4', label: 'Excreción (túbulo colector)', detail: 'La ADH ajusta la reabsorción de agua; se forma la orina definitiva.' },
    ],
  },
  {
    id: 'pmap-ciclo-cardiaco',
    title: 'Circulación por el corazón',
    subject: 'biologia',
    format: 'svg',
    diagram: '',
    steps: [
      { id: '1', label: 'Venas cavas → aurícula derecha', detail: 'Llega sangre desoxigenada del cuerpo. Las VENAS entran al corazón.' },
      { id: '2', label: 'Ventrículo derecho → arteria pulmonar → pulmón', detail: 'La sangre se oxigena en los pulmones (hematosis).' },
      { id: '3', label: 'Venas pulmonares → aurícula izquierda', detail: 'Regresa sangre oxigenada al corazón.' },
      { id: '4', label: 'Ventrículo izquierdo → aorta → cuerpo', detail: 'La aorta SALE del corazón y distribuye sangre oxigenada.' },
    ],
  },
  {
    id: 'pmap-buffer',
    title: '¿Es un buffer? Cómo reconocerlo',
    subject: 'quimica',
    format: 'svg',
    diagram: '',
    steps: [
      { id: '1', label: '¿Hay un ácido/base DÉBIL?', detail: 'Si el ácido o la base es fuerte (HCl, NaOH), NO amortigua: no es buffer.' },
      { id: '2', label: '¿Está su par conjugado?', detail: 'Ácido débil + su base conjugada (o base débil + su ácido conjugado).' },
      { id: '3', label: 'Ejemplo: CH₃COOH / CH₃COONa', detail: 'Ácido acético + acetato de sodio: absorbe agregados de ácido o base.' },
      { id: '4', label: 'pH del buffer', detail: 'Henderson-Hasselbalch: pH = pKa + log([base]/[ácido]). Si 1:1, pH = pKa.' },
    ],
  },
];

export const processMapById = new Map(processMaps.map((p) => [p.id, p]));
