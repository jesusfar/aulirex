import type { Misconception } from '../../../../types/content';

// El módulo de Gendarmería todavía no cataloga errores conceptuales (misconceptions).
// Se conserva el mismo contrato que Medicina para reutilizar las features sin cambios.
export const allMisconceptions: Misconception[] = [];

export const misconceptionById = new Map<string, Misconception>();
