// XP, niveles, rangos médicos y racha diaria (plan §Fase 2).

// XP por intento según dificultad y frecuencia (los temas más tomados premian
// un poco más). Un error igual otorga algo de XP: practicar siempre suma.
export function xpForAttempt(opts: {
  correct: boolean;
  difficulty: 1 | 2 | 3;
  frequency: 'alta' | 'media' | 'baja';
}): number {
  if (!opts.correct) return 2;
  const base = 10 + (opts.difficulty - 1) * 5; // 10 / 15 / 20
  const freqBonus = opts.frequency === 'alta' ? 5 : opts.frequency === 'media' ? 2 : 0;
  return base + freqBonus;
}

// Nivel a partir del XP acumulado, con curva creciente (cada nivel cuesta más).
// XP necesario para alcanzar el nivel n: 50 * n * (n - 1) / 2 aprox. → usamos
// una fórmula simple e invertible.
export function levelForXp(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

export function xpForLevel(level: number): number {
  return 50 * (level - 1) * (level - 1);
}

export function levelProgress(xp: number): {
  level: number;
  intoLevel: number;
  levelSpan: number;
  ratio: number;
} {
  const level = levelForXp(xp);
  const cur = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const span = next - cur;
  const into = xp - cur;
  return { level, intoLevel: into, levelSpan: span, ratio: span ? into / span : 0 };
}

// Rangos médicos por nivel. Da identidad y sensación de progreso clínico.
const RANKS: { minLevel: number; name: string; emoji: string }[] = [
  { minLevel: 1, name: 'Aspirante', emoji: '🩹' },
  { minLevel: 3, name: 'Practicante', emoji: '💉' },
  { minLevel: 6, name: 'Interno', emoji: '🩺' },
  { minLevel: 10, name: 'Residente', emoji: '🏥' },
  { minLevel: 15, name: 'Médico/a', emoji: '⚕️' },
  { minLevel: 22, name: 'Especialista', emoji: '🧠' },
  { minLevel: 30, name: 'Jefe/a de Servicio', emoji: '👑' },
];

export function rankForLevel(level: number): { name: string; emoji: string } {
  let rank = RANKS[0];
  for (const r of RANKS) if (level >= r.minLevel) rank = r;
  return { name: rank.name, emoji: rank.emoji };
}

// Racha diaria: cuenta días calendario consecutivos con al menos una práctica.
// Devuelve la racha nueva a partir de la anterior y la última fecha activa.
const dayNumber = (ts: number) => Math.floor(ts / (24 * 60 * 60 * 1000));

export function updateStreak(
  prevStreak: number,
  lastActive: number,
  now = Date.now(),
): number {
  if (!lastActive) return 1;
  const diff = dayNumber(now) - dayNumber(lastActive);
  if (diff === 0) return Math.max(1, prevStreak); // mismo día: sin cambio
  if (diff === 1) return prevStreak + 1; // día siguiente: +1
  return 1; // se cortó la racha
}
