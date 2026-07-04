# Aulirex — Arquitectura del entrenador de ingreso a Medicina (UNC + UNSa)

> Entrenador *offline-first* para preparar y aprobar a la primera el ingreso a Medicina en la **Universidad Nacional de Córdoba (CONEUM)** y en la **Universidad Nacional de Salta (Introducción a los Estudios de la Medicina)**. Inspirado en la arquitectura de [jesusfar/EFIPER](https://github.com/jesusfar/EFIPER), pero adaptado a un dominio STEM (fórmulas, gráficos, cálculo numérico, procesos biológicos) y a dos instituciones con temario común pero exigencias distintas.

---

## 0. Resumen ejecutivo

Aulirex es una **SPA estática, offline-first**, que se despliega en **Cloudflare Pages gratis** sin necesidad de backend para el MVP. Todo el contenido (banco de preguntas, teoría, mapas de proceso) viaja como JSON empaquetado en el build, y el progreso del alumno se guarda localmente en IndexedDB. Una segunda fase opcional agrega cuentas y sincronización entre dispositivos con **Cloudflare Pages Functions + D1**, también dentro del plan gratuito.

La filosofía pedagógica es la que recomienda el propio material de ingreso: **leer poco y practicar mucho**, convertir cada error en una tarjeta de repaso, entrenar fórmulas con unidades, y hacer simulacros con el formato real desde temprano. Cada una de esas ideas se traduce en un módulo concreto de la app.

**Decisiones clave:**

- Stack: React 18 + TypeScript + Vite + Tailwind + Zustand + Dexie/IndexedDB (idéntico núcleo que EFIPER, ya probado en Cloudflare).
- Contenido STEM: KaTeX para fórmulas, SVG/Mermaid para procesos, items numéricos con tolerancia y unidades.
- Dos "carreras" (UNC / UNSa) que comparten el 80% del banco y difieren en pesos y en módulos extra (comprensión de textos, matemática, alfabetización para UNSa).
- Formato de examen replicado: track **teórico** y track **práctico** separados, con umbral del 60% en cada uno para UNC.
- Despliegue de un solo comando; opción de exportar un `Aulirex.html` autónomo para zonas con mala conectividad.

---

## 1. Objetivo y alcance

| Aspecto | Definición |
|---|---|
| **Meta del alumno** | Aprobar a la primera el ingreso a Medicina UNC y/o UNSa. |
| **Meta de la app** | Que el alumno llegue a superar consistentemente el **75%** en simulacros (margen sobre el 60% real). |
| **Usuarios** | Ingresantes desde cero, muchos sin PC potente ni buena conexión (especialmente en el interior de Salta). |
| **No-objetivo** | No reemplaza el material oficial ni redistribuye apuntes con derechos de autor (ver §11). Aulirex aporta **ejercitación, repaso inteligente y simulacros originales**. |

---

## 2. Análisis del dominio

### 2.1 UNC — CONEUM

- Cuatro ejes: **Introducción al Estudio de la Medicina, Biología, Química, Física**.
- Examen final con **tres turnos al año** (marzo, junio/julio, octubre/noviembre).
- Dos pruebas: **teórica** y **práctica**, **25 preguntas cada una**.
- Desde 2024 se exige **≥60% en cada prueba** por separado para aprobar.

**Consecuencia de diseño:** el modelo debe distinguir `track: 'teorico' | 'practico'` en cada item y el módulo de simulacro debe evaluar los dos tracks **por separado** (no un promedio único).

### 2.2 UNSa

- No es un examen de ingreso clásico: se cursa la materia inicial intensiva **Introducción a los Estudios de la Medicina** (bimestral), correlativa para seguir.
- Contenidos 2026: **Biología, Física, Química, Matemática, y Alfabetización Universitaria y Comprensión de Textos**.

**Consecuencia de diseño:** la "carrera UNSa" reutiliza Biología/Química/Física de UNC y **suma tres áreas propias**: Matemática básica, Comprensión de textos y Alfabetización universitaria. No hay umbral 60%/60%, pero se mantiene el simulacro como práctica de retención.

### 2.3 Solapamiento

```
                 ┌─────────────── Banco compartido ───────────────┐
 UNC  ──────────┤ Biología · Química · Física                     ├────────── UNSa
 (+ Introducción)│ (mismos temas, distinto peso por institución)  │(+ Matemática,
  4 ejes         └────────────────────────────────────────────────┘ Comprensión,
  teórico+práctico                                                    Alfabetización)
```

El diseño trata "institución" como un **filtro/etiqueta transversal**, no como dos bancos separados. Un mismo item puede pertenecer a `['UNC','UNSa']` con pesos distintos.

---

## 3. Fundamento pedagógico (cómo enseñar cada cosa)

El material de ingreso da la receta explícita: *leer poco y practicar mucho; mapas de procesos; cuaderno de errores; fórmulas con unidades; simulacros desde temprano; separar teoría y práctica.* Cada principio se convierte en un módulo:

| Principio del material | Módulo de Aulirex |
|---|---|
| Leer poco, practicar mucho | UI **práctica-primero**: el banco de preguntas es la pantalla central; la teoría es de consulta, no de lectura lineal. |
| Mapas de procesos (membrana, mitocondria, dogma, ciclo cardíaco, nefrona, gases, soluciones, buffers) | **Explorador de procesos**: diagramas interactivos (SVG/Mermaid) etiquetables paso a paso. |
| Cuaderno de errores | Cada respuesta incorrecta **genera automáticamente** una tarjeta Leitner y una entrada en el **Cuaderno de Errores**. |
| Estudiar fórmulas con unidades | **Entrenador de fórmulas y unidades**: pasaje de unidades, análisis dimensional, "¿qué es directa/inversamente proporcional?". |
| Simulacros desde la semana 8 | **Modo Simulacro** con formato CONEUM real (25+25, 60%/60%, timer). |
| Separar teoría y práctica | Dos tracks por materia; el simulacro puntúa cada uno por separado. |

### 3.1 Ciencia del aprendizaje transversal

Sobre esos módulos, cinco mecanismos que la evidencia respalda y que la app implementa de fábrica:

1. **Recuerdo activo (active recall):** todo entra como pregunta, no como texto para releer.
2. **Repetición espaciada (Leitner de 5 cajas):** lo que se falla vuelve antes; lo dominado se espacia.
3. **Intercalado (interleaving):** las colas de repaso mezclan temas y materias (el material advierte que el examen toma "temas mezclados").
4. **Feedback inmediato con explicación:** cada item muestra el porqué, no solo correcto/incorrecto.
5. **Calibración:** el dashboard resalta el **tema más débil** y la **frecuencia real** de cada tema (alta/media/baja según "los que más se toman").

### 3.2 Estrategia específica por materia

**Biología** (procesos + estructura). Es la materia más grande y la que más rinde.
- *Mapas de proceso* para membrana, transporte (activo/pasivo, a favor/en contra de gradiente, gasto de ATP), sistema de endomembranas, mitocondria y ATP, dogma central (con foco en **las enzimas de cada etapa**), ciclo cardíaco, nefrona, hematosis.
- *Diagramas etiquetables* (arrastrar rótulos) para anatomía/histología.
- *Comparadores* lado a lado (simpático vs parasimpático, mitosis vs meiosis).
- *Leitner* para listas memorísticas (pares craneales, enzimas, grupos sanguíneos).
- La parte **práctica** de Biología es casi solo genética → banco de ejercicios de Mendel y excepciones (codominancia, grupos sanguíneos, árboles genealógicos).

**Química** (comprensión + cálculo). Enfoque dual:
- *Teórico:* identificación sobre moléculas grandes → **item de anotación de molécula** (marcar grupos funcionales, tipo de enlace, hibridación sp/sp²/sp³). Teoría de ácido-base, coligativas y **reconocer un buen buffer**.
- *Práctico:* soluciones, pH, buffers, coligativas, isótopos → **items numéricos** con calculadora guiada paso a paso y tolerancia de redondeo.

**Física** (cálculo + gráficos + unidades). "Te pueden tomar de todo": repaso amplio con drills.
- *Lector de gráficos:* micro-preguntas sobre gráficos de cinemática y de gases.
- *Proporcionalidad directa/inversa:* dado una fórmula, decidir qué crece/decrece.
- *Resolución por pasos con checkpoints:* MRU/MRUV, Newton, gravitación, trabajo-energía-potencia, Arquímedes, Pascal, Ohm, gases.
- *Entrenador de unidades* obligatorio antes de habilitar los problemas (el material dice que media prueba se pierde por unidades mal pasadas).

**Introducción (solo UNC)** (conceptual + lectura).
- *Flashcards conceptuales* (salud-enfermedad, niveles de prevención/atención, método científico, bioética).
- *Líneas de tiempo* (historia de la medicina, historia de la UNC/FCM).
- *Quizzes* de opción múltiple con el estilo del compendio.

**Comprensión de textos y Alfabetización (solo UNSa).**
- *Pasajes + preguntas* de idea principal, inferencia, vocabulario científico e interpretación de consignas.
- *Escritura breve* con auto-checklist (no autocorrección "dura", sino rúbrica).

**Matemática básica (solo UNSa).**
- *Drills* de despeje de fórmulas, regla de tres, potencias, logaritmos, notación científica, porcentajes e interpretación de gráficos.

---

## 4. Mapa de módulos (features)

```
Aulirex
├── Onboarding            → elegí objetivo (UNC / UNSa / ambos) + test diagnóstico → plan personalizado
├── Dashboard             → racha, XP, rango, tema más débil, cuenta regresiva al examen,
│                           % de "listo" por materia y por track (teórico/práctico)
├── Plan de estudio       → plan de 16 semanas adaptativo (el del material), marca "hoy toca…"
├── Práctica              → banco filtrable por institución/materia/bloque/tema/track, feedback inmediato
├── Repaso inteligente    → cola Leitner (vencidas), alimentada por los errores
├── Explorador de procesos→ diagramas interactivos (membrana, dogma, nefrona, ciclo cardíaco, buffers…)
├── Fórmulas y unidades   → pasaje de unidades, análisis dimensional, proporcionalidad
├── Simulacro             → formato CONEUM (25 teóricas + 25 prácticas, 60%/60%, timer) y formato UNSa
├── Comprensión de textos → (UNSa) pasajes + preguntas
├── Cuaderno de errores   → registro revisable; "rehacé lo fallado"
├── Progreso / Analítica  → evolución por tema, curvas de retención
├── Cuenta (opcional)     → login + sync D1 (Fase 2)
└── Backup                → exportar/importar progreso en JSON
```

### 4.1 Gamificación (rangos con temática médica)

Igual que EFIPER usa rangos con humor, Aulirex propone una progresión por XP:

1. Aspirante a Guardapolvo
2. Ingresante Ansioso
3. Practicante de Anatomía en Papel
4. Camillero con Ambición
5. Interno de Guardia Eterna
6. Residente Insomne
7. Médico de Cabecera
8. Eminencia CONEUM

XP por respuesta correcta en práctica, repaso y simulacro; el nivel define el rango visible y dispara la notificación de subida.

---

## 5. Modelo de datos y taxonomía de contenido

### 5.1 Taxonomía

```
Institution   : 'UNC' | 'UNSa'
Subject (eje) : 'introduccion' | 'biologia' | 'quimica' | 'fisica'
                | 'matematica' | 'comprension_textos' | 'alfabetizacion'
Block (bloque): p.ej. biologia → 'biologia_celular', 'genetica_molecular', 'sistemas_humanos'…
Topic (tema)  : p.ej. 'membrana_plasmatica', 'nefrona', 'ph_buffers'…
Track         : 'teorico' | 'practico'
Frequency     : 'alta' | 'media' | 'baja'   (según "temas que más se toman")
Difficulty    : 1 | 2 | 3
```

La jerarquía **Institución → Materia → Bloque → Tema** permite filtrar el banco a cualquier nivel y calcular el "% listo" por cualquier corte.

### 5.2 Tipos TypeScript (contrato de contenido)

```ts
// src/types/content.ts

export type Institution = 'UNC' | 'UNSa';
export type Subject =
  | 'introduccion' | 'biologia' | 'quimica' | 'fisica'
  | 'matematica' | 'comprension_textos' | 'alfabetizacion';
export type Track = 'teorico' | 'practico';
export type Frequency = 'alta' | 'media' | 'baja';

export type ItemType =
  | 'single_choice'      // 1 correcta
  | 'multiple_response'  // varias correctas
  | 'true_false'
  | 'numeric'            // respuesta numérica con tolerancia + unidad
  | 'ordering'           // ordenar pasos (ej. dogma central)
  | 'matching'           // relacionar columnas
  | 'label_diagram'      // etiquetar sobre una imagen/SVG
  | 'annotate_molecule'  // marcar grupos funcionales / enlaces
  | 'read_graph';        // leer un gráfico (cinemática, gases)

export interface Choice { id: string; text: string; correct: boolean; }

export interface NumericAnswer {
  value: number;
  unit?: string;         // 'atm', 'mol/L', 'm/s'…
  tolerance: number;     // margen absoluto o relativo
  toleranceMode: 'abs' | 'rel';
}

export interface Item {
  id: string;
  institutions: Institution[];   // ['UNC'] | ['UNSa'] | ['UNC','UNSa']
  subject: Subject;
  block: string;
  topic: string;
  track: Track;
  type: ItemType;
  frequency: Frequency;          // peso: cuánto se toma en la vida real
  difficulty: 1 | 2 | 3;
  stem: string;                  // enunciado (Markdown + KaTeX $...$)
  media?: { kind: 'svg' | 'image' | 'mermaid' | 'chart'; src: string }[];
  choices?: Choice[];            // choice / true_false / multiple_response
  numeric?: NumericAnswer;       // numeric
  steps?: string[];              // ordering
  pairs?: [string, string][];    // matching
  explanation: string;           // por qué (siempre, para feedback)
  hint?: string;
  processMapId?: string;         // link a un mapa de proceso
  formulaIds?: string[];         // fórmulas involucradas
  source: 'original';            // trazabilidad (ver §11)
  authorNote?: string;
}

export interface ProcessMap {
  id: string;
  title: string;                 // "Dogma central de la biología"
  subject: Subject;
  format: 'mermaid' | 'svg';
  diagram: string;               // código Mermaid o path a SVG
  steps: { id: string; label: string; detail: string }[];
}

export interface Formula {
  id: string;
  subject: Subject;
  name: string;                  // "Ley general de los gases"
  latex: string;                 // 'PV = nRT'
  variables: { symbol: string; name: string; unit: string }[];
  proportionality?: string;      // "P y V son inversamente proporcionales a T constante"
}
```

### 5.3 Estado del alumno (persistido en IndexedDB)

```ts
// src/types/progress.ts
export interface Attempt {
  itemId: string; correct: boolean; givenAnswer: unknown;
  timeMs: number; at: number;
}
export interface ReviewCard {          // Leitner
  itemId: string; box: 1|2|3|4|5; dueAt: number; lapses: number;
}
export interface Progress {
  targets: Institution[];              // qué prepara el alumno
  examDate?: Record<Institution, number>;
  xp: number; level: number; streak: number; lastActive: number;
  attempts: Attempt[];
  reviewQueue: ReviewCard[];
  errorLog: string[];                  // itemIds fallados
  masteryByTopic: Record<string, number>; // 0..1
}
```

### 5.4 Cálculo de "% listo"

Para cada corte (materia/track/institución) el *mastery* combina: aciertos recientes, caja Leitner promedio y **peso por frecuencia** (un tema "alta frecuencia" pesa más en la nota de preparación). El dashboard muestra `readiness = Σ(masteryTema × pesoFrecuencia) / Σ(pesoFrecuencia)`.

---

## 6. Stack técnico

Reutiliza el núcleo ya probado de EFIPER (que corre en Cloudflare) y suma lo necesario para STEM.

| Capa | Tecnología | Por qué |
|---|---|---|
| UI | **React 18 + TypeScript** | Componentización, tipado del contenido. |
| Build | **Vite** | Rápido; permite build normal y *single-file*. |
| Estilos | **Tailwind CSS** | Consistente y liviano. |
| Estado | **Zustand** | Store simple para progreso/XP. |
| Persistencia local | **Dexie / IndexedDB** + espejo en `localStorage` | Offline-first; ideal para conectividad mala. |
| Fórmulas | **KaTeX** | Render de LaTeX rápido y liviano (mejor que MathJax para móvil). |
| Diagramas de proceso | **Mermaid** + SVG propios | Flujos y mapas interactivos. |
| Gráficos (lectura) | **Chart.js** o SVG a mano | Items de "leer el gráfico". |
| PWA / offline | **vite-plugin-pwa** | Instalable, cachea todo. |
| Portable | **vite-plugin-singlefile** | Genera `Aulirex.html` autónomo (doble clic, sin internet). |
| Backend opcional | **Cloudflare Pages Functions + D1** | Cuentas y sync en Fase 2, dentro del plan gratuito. |

**Química estructural:** para no inflar el bundle, las moléculas de los items `annotate_molecule` se sirven como **SVG/PNG pre-renderizados** con zonas clicables, en vez de un motor de química en el navegador.

---

## 7. Estructura del proyecto

```
aulirex/
├── functions/api/            # (Fase 2) Pages Functions: auth, sync
├── migrations/               # (Fase 2) esquema D1
├── public/
│   ├── _redirects            # /* /index.html 200  (fallback SPA)
│   └── assets/               # SVG de moléculas, imágenes de diagramas, audio
├── scripts/
│   └── validate-content.ts   # valida el banco contra los tipos antes del build
├── src/
│   ├── app/                  # router, layout, shell
│   ├── components/           # UI reutilizable (ItemCard, Timer, KaTeXBlock…)
│   ├── content/              # ← el "libro" de Aulirex
│   │   ├── items/            # banco de preguntas por materia (JSON/TS)
│   │   │   ├── biologia/
│   │   │   ├── quimica/
│   │   │   ├── fisica/
│   │   │   ├── introduccion/
│   │   │   ├── matematica/
│   │   │   └── comprension/
│   │   ├── process-maps/     # mapas de proceso (Mermaid/SVG)
│   │   ├── formulas/         # fórmulas + unidades
│   │   └── plan/             # plan de 16 semanas
│   ├── features/
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── practice/
│   │   ├── reviews/          # Leitner
│   │   ├── process-explorer/
│   │   ├── formula-trainer/
│   │   ├── simulacro/
│   │   ├── reading/          # comprensión de textos (UNSa)
│   │   ├── error-notebook/
│   │   └── account/          # (Fase 2)
│   ├── lib/
│   │   ├── storage/          # Dexie / IndexedDB
│   │   ├── spaced-repetition # Leitner
│   │   ├── scoring/          # corrección (numeric con tolerancia, etc.)
│   │   ├── selection/        # reglas de variedad por tema/tipo/frecuencia
│   │   ├── readiness/        # cálculo de % listo
│   │   └── import-export/    # backup JSON
│   ├── store/                # Zustand
│   └── types/                # content.ts, progress.ts
├── index.html
├── vite.config.ts
├── vite.config.single.ts     # build single-file → Aulirex.html
├── tailwind.config.js
├── wrangler.toml             # (Fase 2) binding D1
└── package.json
```

**Regla de oro del contenido:** todo item nuevo se agrega en `src/content/` respetando los tipos de `src/types/`, y `scripts/validate-content.ts` corre en CI para rechazar items mal formados (opciones sin correcta, numeric sin tolerancia, etc.).

---

## 8. Arquitectura offline-first + sync opcional

### Fase 1 — 100% estática (MVP, cero backend)

```
[ Build Vite ] → empaqueta content/*.json + app  →  dist/
        │
        ▼
[ Cloudflare Pages (estático) ]  ──sirve──►  [ Navegador ]
                                                  │
                                       IndexedDB (Dexie) ← progreso
                                       Service Worker (PWA) ← offline total
                                                  │
                                       Export/Import JSON (backup manual)
```

- Sin cuentas, sin servidor, sin costo variable. El contenido es parte del build.
- El progreso vive en el dispositivo; el backup JSON evita pérdidas si se limpia el navegador.

### Fase 2 — cuentas + sync (opcional)

```
[ Navegador ] ──/api/auth──► [ Pages Functions ] ──► [ D1 (SQLite) ]
      │  (sigue funcionando offline con IndexedDB)         snapshot por usuario
      └── al loguearse: si el snapshot remoto es más nuevo, restaura; si no, sube el local
```

- Igual que EFIPER: **la app sigue siendo usable sin cuenta**; el login solo agrega sincronización entre dispositivos.
- Auth simple recomendada: *magic link* por email o OAuth (Google). Se guarda **un snapshot completo del progreso por usuario** en D1 (last-write-wins por timestamp).

---

## 9. Despliegue en Cloudflare Pages (gratis) — paso a paso

### 9.1 MVP estático (recomendado para empezar)

1. Subí el repo a GitHub.
2. En Cloudflare → **Pages → Create → Connect to Git** → elegí el repo.
3. Configuración de build:
   ```
   Framework preset:        None (o Vite)
   Build command:           npm run build
   Build output directory:  dist
   ```
4. **Routing SPA:** agregá `public/_redirects` con:
   ```
   /*  /index.html  200
   ```
   (Alternativa sin config: usar `HashRouter`, como hace EFIPER, y funciona sin reglas.)
5. Deploy. Queda en `https://aulirex.pages.dev`. **Sin backend = sin costo.**

### 9.2 Versión portable (para conectividad mala)

```
npm run build:single      # usa vite.config.single.ts + vite-plugin-singlefile
# copiá dist-single/index.html como Aulirex.html
```
Se comparte por WhatsApp/pendrive y se abre con doble clic, sin internet ni servidor. Muy útil para ingresantes del interior de Salta.

### 9.3 Activar cuentas (Fase 2)

1. Creá una base **D1** llamada `aulirex` y pegá su `database_id` en `wrangler.toml`.
2. Aplicá migraciones: `npm run db:migrate:remote`.
3. En Pages, agregá el **binding D1**: `Variable = DB`, `D1 database = aulirex`.
4. Agregá secretos: `SESSION_SECRET`, `APP_ORIGIN`, y (si usás OAuth) `GOOGLE_CLIENT_ID/SECRET`.
5. Redeploy.

> Los planes gratuitos de Cloudflare (Pages Functions y D1) cubren de sobra el uso de una app de estudio, pero conviene verificar los límites vigentes al momento de desplegar, ya que Cloudflare los ajusta con el tiempo.

---

## 10. Roadmap por fases

| Fase | Entregable | Contenido mínimo |
|---|---|---|
| **F0 — Esqueleto** | SPA + dashboard + práctica con feedback + IndexedDB + deploy en Pages | 150–200 items de alta frecuencia (Biología y Química) |
| **F1 — Núcleo pedagógico** | Leitner + Cuaderno de errores + Explorador de procesos + Entrenador de fórmulas/unidades | Física completa + mapas de proceso clave |
| **F2 — Simulacros** | Modo Simulacro CONEUM (25+25, 60%/60%, timer) + plan de 16 semanas adaptativo | Banco balanceado por track y frecuencia |
| **F3 — UNSa** | Módulos de Comprensión de textos, Alfabetización y Matemática básica | Pasajes + drills |
| **F4 — Cuentas** | Login + sync D1 + PWA instalable + `Aulirex.html` portable | — |
| **F5 — Pulido** | Analítica de retención, gamificación completa, sonidos, accesibilidad | Ampliación continua del banco |

**Meta cuantitativa por materia (para lanzar F2):** cobertura suficiente para que un simulacro no repita items dentro de una misma sesión y respete las reglas de variedad por tema/tipo.

---

## 11. Nota legal / derechos de autor (importante)

El material oficial de referencia (p. ej. los compendios QUANTUM del Prof. Cristian Quinteros) está **registrado y prohíbe expresamente su copia y redistribución**. Aulirex **no debe** empaquetar ni reproducir esos PDFs ni sus textos textuales.

En su lugar, el banco de Aulirex se construye con **contenido original**: preguntas redactadas para la plataforma, explicaciones con palabras propias y mapas de proceso dibujados desde cero. Por eso el tipo `Item` incluye `source: 'original'` como campo obligatorio de trazabilidad. El material oficial se usa solo como **guía de temario y de "qué se toma"**, no como fuente a copiar.

---

## 12. Ejemplo de item semilla

```ts
// src/content/items/quimica/ph-buffers.ts
export const items: Item[] = [
  {
    id: 'qui-phb-0001',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'practico',
    type: 'numeric',
    frequency: 'alta',
    difficulty: 2,
    stem: 'Una solución tiene $[H^+] = 1\\times10^{-4}\\,M$. ¿Cuál es su pH?',
    numeric: { value: 4, tolerance: 0.1, toleranceMode: 'abs' },
    explanation: 'pH = -log[H⁺] = -log(1×10⁻⁴) = 4. Al ser <7, la solución es ácida.',
    hint: 'pH = -log[H⁺].',
    formulaIds: ['for-ph'],
    source: 'original',
  },
  {
    id: 'qui-phb-0002',
    institutions: ['UNC', 'UNSa'],
    subject: 'quimica',
    block: 'equilibrio_acido_base',
    topic: 'ph_buffers',
    track: 'teorico',
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: '¿Cuál de estos pares constituye un buffer eficaz?',
    choices: [
      { id: 'a', text: 'HCl / NaCl', correct: false },
      { id: 'b', text: 'CH₃COOH / CH₃COONa', correct: true },
      { id: 'c', text: 'NaOH / NaCl', correct: false },
      { id: 'd', text: 'HCl / NaOH', correct: false },
    ],
    explanation:
      'Un buffer necesita un ácido débil y su base conjugada (o viceversa). El par ácido acético / acetato de sodio cumple; HCl y NaOH son fuertes y no amortiguan.',
    processMapId: 'pmap-buffer',
    source: 'original',
  },
];
```

---

### Cierre

Con este diseño, Aulirex nace como una app estática desplegable en Cloudflare Pages gratis en su primera versión, con todo el peso puesto en el mecanismo que realmente hace aprobar: **practicar, equivocarse, convertir el error en repaso y simular el examen real**. La complejidad de cuentas y sincronización queda aislada en una fase opcional que no bloquea el uso ni encarece el hosting.
