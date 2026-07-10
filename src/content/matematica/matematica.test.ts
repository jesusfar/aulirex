import { describe, expect, it } from 'vitest';
import { instantiate } from '../../lib/templates';
import { gradeItem } from '../../lib/scoring';
import { mathTemplates, mathGeneratedItems } from './index';

describe('matematica: plantillas', () => {
  it('cubre los temas de la guía UNSa', () => {
    const topics = new Set(mathTemplates.map((t) => t.topic));
    for (const t of [
      'despeje',
      'regla_de_tres',
      'porcentajes',
      'potencias',
      'radicacion',
      'logaritmos',
      'notacion_cientifica',
      'proporcionalidad',
      'funcion_lineal',
    ]) {
      expect(topics.has(t), t).toBe(true);
    }
    // Despeje de ecuaciones: varias variantes.
    expect(mathTemplates.filter((t) => t.topic === 'despeje').length).toBeGreaterThanOrEqual(6);
  });

  it('cada plantilla genera ítems numéricos válidos de matemática', () => {
    for (const tpl of mathTemplates) {
      for (let seed = 1; seed <= 60; seed++) {
        const it = instantiate(tpl, seed);
        expect(it.subject, tpl.id).toBe('matematica');
        expect(it.type, tpl.id).toBe('numeric');
        expect(it.status, tpl.id).toBe('active');
        expect(it.stem.length, tpl.id).toBeGreaterThan(0);
        expect(it.explanation.length, tpl.id).toBeGreaterThan(0);
        expect(Number.isFinite(it.numeric?.value), `${tpl.id}#${seed}`).toBe(true);
      }
    }
  });

  it('la respuesta declarada por cada plantilla se califica como correcta', () => {
    for (const tpl of mathTemplates) {
      for (let seed = 1; seed <= 60; seed++) {
        const it = instantiate(tpl, seed);
        const value = it.numeric!.value;
        const grade = gradeItem(it, { kind: 'numeric', value });
        expect(grade.correct, `${tpl.id}#${seed} (=${value})`).toBe(true);
      }
    }
  });

  it('una respuesta claramente errónea se califica como incorrecta', () => {
    for (const tpl of mathTemplates) {
      const it = instantiate(tpl, 7);
      const wrong = it.numeric!.value + 100;
      expect(gradeItem(it, { kind: 'numeric', value: wrong }).correct, tpl.id).toBe(
        false,
      );
    }
  });

  it('es determinista: misma semilla → mismo ejercicio', () => {
    for (const tpl of mathTemplates) {
      const a = instantiate(tpl, 123);
      const b = instantiate(tpl, 123);
      expect(a.stem).toBe(b.stem);
      expect(a.numeric?.value).toBe(b.numeric?.value);
    }
  });

  it('los ítems generados están catalogados solo para UNSa y activos', () => {
    expect(mathGeneratedItems.length).toBeGreaterThan(0);
    for (const it of mathGeneratedItems) {
      expect(it.institutions).toEqual(['UNSa']);
      expect(it.subject).toBe('matematica');
      expect(it.status).toBe('active');
    }
  });
});
