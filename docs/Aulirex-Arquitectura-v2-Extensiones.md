# Aulirex — Extensiones de arquitectura (v2)

> Complemento del documento base. Aquí se profundizan las seis dimensiones que llevan a Aulirex de "entrenador funcional" a "producto completo": **pedagogía adaptativa, escala de contenido, motivación/retención, calidad y autoría, robustez técnica y alcance de producto**. Cada sección trae contrato de tipos, algoritmo o esquema, no solo la idea.

---

## 1. Pedagogía adaptativa

La v1 corrige y repasa. La v2 **entiende al alumno**: mide su nivel, detecta *por qué* se equivoca y decide qué mostrarle después.

### 1.1 Diagnóstico adaptativo (CAT-lite)

En vez de un test fijo, el diagnóstico ajusta la dificultad según cómo responde: si acierta, sube; si falla, baja. Con ~8–12 preguntas por materia estima un nivel inicial sin aburrir.

```ts
// src/lib/adaptive/ability.ts
// Estimación de habilidad simple (logística, sin IRT completo).
// ability y difficulty viven en la misma escala [-3, 3].

export function updateAbility(ability: number, itemDifficulty: 1|2|3, correct: boolean): number {
  const d = itemDifficulty - 2;                 // 1→-1, 2→0, 3→+1
  const p = 1 / (1 + Math.exp(-(ability - d))); // prob. esperada de acierto
  const K = 0.6;                                 // tasa de aprendizaje
  return ability + K * ((correct ? 1 : 0) - p);
}

// Selección del próximo ítem: el más informativo ≈ difficulty ≈ ability actual,
// filtrando por tema no visto y frecuencia alta primero.
export function pickNextDiagnostic(pool: Item[], ability: number, seen: Set<string>): Item {
  return pool
    .filter(i => !seen.has(i.id))
    .sort((a, b) =>
      Math.abs((a.difficulty - 2) - ability) - Math.abs((b.difficulty - 2) - ability))[0];
}
```

Salida del diagnóstico: un `masteryByTopic` inicial y un **nivel por materia**, que alimenta el planificador (§3.1) y el dashboard.

### 1.2 Distractores con misconcepción etiquetada

El cambio de mayor impacto pedagógico y de bajo costo: cada opción incorrecta se **etiqueta con el error conceptual** que representa. El feedback deja de ser "incorrecto" y pasa a nombrar la confusión.

```ts
export interface Choice {
  id: string; text: string; correct: boolean;
  misconception?: string;      // id del error conceptual
  feedback?: string;           // "Confundiste transporte activo con difusión facilitada…"
}

export interface Misconception {
  id: string; subject: Subject;
  name: string;                // "Cree que el transporte activo no gasta ATP"
  remedy: string;              // qué repasar
  processMapId?: string;       // link al mapa donde se ve claro
}
```

Beneficio en cascada: el **Cuaderno de errores** agrupa por misconcepción, no por ítem suelto, y el motor de repaso puede insistir en la *idea* mal entendida, no solo en la pregunta puntual.

### 1.3 Grafo de prerrequisitos y "próximo tema"

Los temas no son independientes: no tiene sentido dar dogma central si la persona no domina núcleo/ADN. Un grafo dirigido de prerrequisitos habilita la recomendación "qué estudiar ahora".

```ts
export interface TopicNode {
  topic: string; subject: Subject; frequency: Frequency;
  prereqs: string[];           // topics que conviene dominar antes
}

// Recomendación: el tema desbloqueado (prereqs con mastery ≥ 0.7),
// no dominado aún, de mayor frecuencia. Desempata por menor mastery.
export function nextTopic(graph: TopicNode[], mastery: Record<string, number>): TopicNode | null {
  const ready = graph.filter(n =>
    (mastery[n.topic] ?? 0) < 0.7 &&
    n.prereqs.every(p => (mastery[p] ?? 0) >= 0.7));
  const w = { alta: 3, media: 2, baja: 1 } as const;
  return ready.sort((a, b) =>
    (w[b.frequency] - w[a.frequency]) ||
    ((mastery[a.topic] ?? 0) - (mastery[b.topic] ?? 0)))[0] ?? null;
}
```

Ejemplo de dependencias en Biología:

```
membrana_plasmatica → transporte_celular → potencial_de_accion
nucleo_adn_arn → duplicacion → transcripcion → traduccion
respiracion_celular ← mitocondria ← membrana_plasmatica
```

### 1.4 Repetición espaciada mejorada

La v1 usa Leitner (5 cajas), simple y robusto. La v2 deja una **interfaz de scheduler** para poder cambiar el motor sin tocar el resto de la app, y ofrece un algoritmo tipo SM-2/FSRS que espacia por *dificultad real* de cada ítem, no por caja fija.

```ts
export interface Scheduler {
  schedule(card: ReviewCard, grade: 0|1|2|3): ReviewCard; // 0=fallo … 3=fácil
}
// Implementaciones intercambiables: LeitnerScheduler (default) | Sm2Scheduler.
```

---

## 2. Escala de contenido

Un examen que "toma de todo" y es práctico exige **volumen**. Escribir miles de ítems a mano no escala; hay que generarlos y versionarlos.

### 2.1 Motor de plantillas paramétricas (banco "infinito")

Ideal para Física y Química práctica: una plantilla define rangos de parámetros y calcula la respuesta; genera cientos de variantes reproducibles con una semilla.

```ts
// src/content/templates/ph.ts
export const phTemplate: ItemTemplate = {
  id: 'tpl-ph',
  subject: 'quimica', block: 'equilibrio_acido_base', topic: 'ph_buffers',
  track: 'practico', type: 'numeric', frequency: 'alta',
  params: { exp: { min: 2, max: 12, step: 1 } },        // [H+] = 1e-exp
  render: ({ exp }) => ({
    stem: `Una solución tiene $[H^+] = 1\\times10^{-${exp}}\\,M$. ¿Cuál es su pH?`,
    numeric: { value: exp, tolerance: 0.1, toleranceMode: 'abs' },
    explanation: `pH = -log(1×10⁻${exp}) = ${exp}. ${exp < 7 ? 'Ácida' : exp > 7 ? 'Básica' : 'Neutra'}.`,
  }),
};

// Una semilla determinística → la misma variante en simulacros compartibles.
export function instantiate(t: ItemTemplate, seed: number): Item { /* … */ }
```

Reglas: cada plantilla declara sus parámetros, garantiza que la respuesta sea única y correcta, y marca `source: 'original'`. El validador de CI (§4.1) corre la plantilla con varias semillas y verifica que ninguna variante quede sin respuesta válida.

### 2.2 Ítems integradores

El material advierte que en el teórico aparecen **moléculas grandes** donde hay que identificar estructura, grupos funcionales, enlaces e hibridación a la vez. La v2 modela ítems multi-consigna sobre una misma figura:

```ts
export interface CompositeItem extends Omit<Item, 'type'> {
  type: 'composite';
  figure: { kind: 'svg' | 'image'; src: string; regions?: ClickRegion[] };
  parts: Item[];               // sub-preguntas sobre la misma molécula/gráfico
}
```

Sirve igual para gráficos de cinemática/gases con varias preguntas encadenadas.

### 2.3 Versionado y migración de contenido

Cuando un ítem se corrige o se retira, el progreso del alumno no debe romperse.

- Cada `Item` lleva `version` y estado `active | deprecated | retired`.
- Los intentos guardan `itemVersion`; si un ítem cambia de respuesta, los intentos viejos se marcan como "sobre versión anterior" y no contaminan la métrica actual.
- Un `contentManifest.json` (hash + versión del banco) permite al cliente detectar si hay contenido nuevo y refrescar el service worker.

---

## 3. Motivación y retención

Aprobar a la primera es tanto constancia como conocimiento. Estas piezas sostienen el hábito y hacen visible el avance.

### 3.1 Planificador adaptativo

El plan de 16 semanas de la v1 es fijo. La v2 lo **replanifica** según rendimiento y días restantes: prioriza temas de **alta frecuencia con bajo mastery**, comprime si queda poco tiempo, y siempre reserva las últimas semanas para simulacros.

```ts
export function todaysPlan(
  mastery: Record<string, number>, graph: TopicNode[],
  daysToExam: number, minutesAvailable: number
): PlanBlock[] {
  const focus = weakHighFrequency(mastery, graph);            // §1.3 ordenado por urgencia
  const reviewShare = daysToExam < 21 ? 0.5 : 0.3;            // más repaso cerca del examen
  return allocate(focus, minutesAvailable, { reviewShare });  // teoría/práctica/repaso/simulacro
}
```

### 3.2 Pronóstico de nota y curva de olvido

Dos analíticas que motivan porque son accionables:

- **Readiness forecast:** proyecta el puntaje esperado en un simulacro CONEUM combinando mastery por tema × frecuencia real, por track. Muestra "hoy sacarías ~68% en teórico / ~54% en práctico" y qué temas suben más la nota si los reforzás.
- **Curva de olvido por tema:** modela el decaimiento de retención desde el último repaso (`retención ≈ e^(-Δt/τ)`, con `τ` dependiente de la caja Leitner) y avisa qué se está por "caer" antes del examen.

```ts
export function projectedScore(mastery: Record<string, number>, bank: Item[], track: Track): number {
  const items = bank.filter(i => i.track === track);
  const w = { alta: 3, media: 2, baja: 1 } as const;
  const num = items.reduce((s, i) => s + w[i.frequency] * (mastery[i.topic] ?? 0), 0);
  const den = items.reduce((s, i) => s + w[i.frequency], 0);
  return den ? num / den : 0;   // 0..1
}
```

### 3.3 Modos activos: "explicá el proceso" y ping-pong

Tomados de EFIPER y adaptados al dominio:

- **Explicá el proceso (defensa):** la app muestra un proceso (dogma central, ciclo cardíaco, nefrona) y pide explicarlo en voz alta o por escrito sin mirar; luego revela una **rúbrica/checklist** de puntos clave para auto-evaluarse. Refuerza el recuerdo activo que el material recomienda ("explicar sin mirar").
- **Ping-pong grupal:** dos o más personas se turnan preguntas del banco (modo local, sin cuentas); ideal para grupos de estudio.

### 3.4 Recordatorios

PWA con notificaciones para sostener la racha ("hoy toca Química — 30 min") y avisos de repaso vencido. Todo opcional y sin depender del backend.

---

## 4. Calidad y autoría

Un banco grande solo sirve si es confiable. Esto es lo que separa un proyecto de fin de semana de un producto.

### 4.1 Pipeline de autoría + validación en CI

```
Autor escribe ítem (en src/content, tipado)
   │
   ▼
validate-content.ts   →  ¿tipos ok? ¿single_choice con 1 correcta? ¿numeric con tolerancia?
   │                     ¿plantilla con respuesta única en N semillas? ¿source:'original'?
   ▼
Revisión por pares (PR en GitHub)  →  otro autor verifica exactitud médica/física
   │
   ▼
Merge → build → deploy en Pages
```

El gate de CI **bloquea** cualquier ítem malformado antes de que llegue al alumno. Este es el mismo espíritu del `scripts/validate-content.ts` de la v1, ampliado a plantillas y a ítems compuestos.

### 4.2 Analítica de ítems (depuración del banco)

Con los intentos anonimizados se calculan, por ítem:

- **Dificultad real (p-value):** % de acierto. Si un ítem "fácil" lo falla el 90%, probablemente está mal redactado o su clave es incorrecta.
- **Discriminación:** ¿los que van bien en general aciertan este ítem más que los que van mal? Discriminación negativa = ítem sospechoso.
- **Distractores muertos:** opciones que nadie elige (poco realistas) o el distractor que se lleva a todos (posible ambigüedad).

Un panel de autor marca en rojo los ítems a revisar. Así el banco mejora con el uso.

---

## 5. Robustez técnica

### 5.1 Esquema D1 concreto + sync con conflictos

La v1 propone sync last-write-wins. Para no perder progreso al usar dos dispositivos, conviene un **registro de eventos** (append-only) que se fusiona por unión, en vez de pisar el snapshot entero.

```sql
-- migrations/0001_init.sql
CREATE TABLE users (
  id TEXT PRIMARY KEY, email TEXT UNIQUE, created_at INTEGER
);

CREATE TABLE progress_events (   -- append-only, se fusiona por unión
  id TEXT PRIMARY KEY,           -- uuid del evento (idempotente)
  user_id TEXT NOT NULL,
  kind TEXT NOT NULL,            -- 'attempt' | 'review' | 'xp' | 'plan'
  payload TEXT NOT NULL,         -- JSON
  device_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_events_user ON progress_events(user_id, created_at);
```

- El cliente sube solo eventos nuevos (por `id` idempotente) y baja los que le faltan.
- El estado (`Progress`) se **deriva** reproduciendo los eventos en orden. Dos dispositivos que estudiaron offline no se pisan: sus eventos se unen.
- Auth: *magic link* por email o OAuth Google; sesión firmada con `SESSION_SECRET`. Rate limiting en las Functions.

### 5.2 Testing, CI/CD y observabilidad

| Área | Herramienta | Qué cubre |
|---|---|---|
| Unit | Vitest | scoring (tolerancia numérica), scheduler, readiness. |
| Componentes | Testing Library | ItemCard, corrección, feedback. |
| E2E | Playwright | flujo completo: diagnóstico → práctica → simulacro. |
| Contenido | validate-content en CI | ningún ítem malformado se despliega. |
| Analítica de uso | Cloudflare Web Analytics | sin cookies, respeta privacidad, gratis. |
| Errores | reporte opcional | captura fallos de render (ej. KaTeX inválido). |
| Rendimiento | presupuesto de bundle | límite de KB; el banco se **carga por materia** (code-splitting) para no penalizar celulares de gama baja. |

### 5.3 Accesibilidad

Los diagramas etiquetables ofrecen alternativa por teclado y texto; contraste AA; navegación completa sin mouse; KaTeX con `aria-label` para lectores de pantalla. Importa: muchos ingresantes estudian solo desde el celular.

---

## 6. Alcance de producto

### 6.1 Modo docente / cohortes (academias de ingreso)

Muchos ingresantes preparan en academias. Un rol **docente** opcional (sobre el mismo backend D1) permite:

- Crear una cohorte y compartir un código de invitación.
- Asignar temas o simulacros con fecha.
- Ver un panel agregado y **anónimo por defecto** del avance del grupo (readiness promedio, temas más flojos de la cohorte).

Esto abre a Aulirex un uso institucional sin cambiar el núcleo: el alumno sigue siendo offline-first; el docente solo consume métricas agregadas.

---

## Priorización sugerida (qué agrega más valor primero)

| Orden | Extensión | Por qué primero |
|---|---|---|
| 1 | **Distractores con misconcepción (1.2)** | Máximo impacto pedagógico, costo bajo, solo amplía el schema. |
| 2 | **Motor de plantillas (2.1)** | Multiplica el banco práctico de Física/Química de inmediato. |
| 3 | **Pronóstico de nota + curva de olvido (3.2)** | Hace visible el progreso; sostiene la motivación. |
| 4 | **Grafo de prerrequisitos + planificador adaptativo (1.3 / 3.1)** | Convierte "estudiar" en "estudiar lo correcto ahora". |
| 5 | **Analítica de ítems + CI de contenido (4)** | Mantiene el banco confiable a medida que crece. |
| 6 | **Sync por eventos + modo docente (5.1 / 6.1)** | Escala a multi-dispositivo y a academias. |

Con esto Aulirex deja de ser un banco de preguntas y pasa a ser un tutor que mide, explica el porqué de cada error, decide qué sigue y proyecta cuánto falta para el 75% seguro.
