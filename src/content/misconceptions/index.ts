import type { Misconception } from '../../types/content';
import { misconceptions as biologia } from './biologia';
import { misconceptions as quimica } from './quimica';

export const allMisconceptions: Misconception[] = [...biologia, ...quimica];

export const misconceptionById = new Map(
  allMisconceptions.map((m) => [m.id, m]),
);
