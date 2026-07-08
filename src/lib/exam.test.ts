import { describe, expect, it } from 'vitest';
import type { Institution, Item, Track } from '../types/content';
import { buildSimulacro, profileById, scoreExam } from './exam';

function item(id: string, track: Track, inst: Institution[]): Item {
  return {
    id,
    institutions: inst,
    subject: track === 'teorico' ? 'biologia' : 'fisica',
    block: id,
    topic: id,
    track,
    type: 'single_choice',
    frequency: 'alta',
    difficulty: 2,
    stem: id,
    choices: [{ id: 'a', text: 'A', correct: true }],
    explanation: 'x',
    source: 'original',
    version: 1,
    status: 'active',
  };
}

function bank(n: number, inst: Institution[]): Item[] {
  const items: Item[] = [];
  for (let i = 0; i < n; i++) items.push(item(`t${i}`, 'teorico', inst));
  for (let i = 0; i < n; i++) items.push(item(`p${i}`, 'practico', inst));
  return items;
}

function aauItem(id: string): Item {
  return { ...item(id, 'teorico', ['UNSa']), subject: 'alfabetizacion' };
}

describe('simulacro por perfil', () => {
  it('UNC aprueba solo si ambos tracks pasan el umbral', () => {
    const sim = buildSimulacro(bank(25, ['UNC']), profileById('unc'));
    const correct: Record<string, boolean> = {};
    // 100% teórico, 0% práctico
    for (const id of sim.teoricoIds) correct[id] = true;
    const res = scoreExam(sim, correct);
    expect(res.teorico.pct).toBe(100);
    expect(res.practico.pct).toBe(0);
    expect(res.passed).toBe(false); // un track reprobado → reprueba
  });

  it('UNSa usa umbral global de 80% (no por track)', () => {
    const sim = buildSimulacro(bank(20, ['UNSa']), profileById('unsa'));
    expect(sim.profile.splitByTrack).toBe(false);
    expect(sim.profile.passThreshold).toBe(80);
    const correct: Record<string, boolean> = {};
    // 100% teórico, 65% práctico → global ~83% ≥ 80 → aprueba pese al track flojo
    for (const id of sim.teoricoIds) correct[id] = true;
    let k = 0;
    for (const id of sim.practicoIds) correct[id] = k++ < 13; // 13/20 = 65%
    const res = scoreExam(sim, correct);
    expect(res.practico.passed).toBe(false); // 65% < 80% por track
    expect(res.overall.pct).toBeGreaterThanOrEqual(80);
    expect(res.passed).toBe(true); // pero global ≥ 80 → aprobado
  });

  it('cae al banco completo si faltan ítems de la institución', () => {
    const sim = buildSimulacro(bank(25, ['UNC']), profileById('unsa'));
    expect(sim.fellBack).toBe(true);
    expect(sim.items.length).toBeGreaterThan(0);
  });

  it('UNSa incluye la sección AAU (Alfabetización) separada de ciencias', () => {
    const all = [
      ...bank(30, ['UNSa']),
      ...Array.from({ length: 10 }, (_, i) => aauItem(`a${i}`)),
    ];
    const sim = buildSimulacro(all, profileById('unsa'));
    expect(sim.aauIds.size).toBe(5); // perfil UNSa: aau 5
    // los ítems AAU no se cuentan como teóricos ni prácticos de ciencias
    for (const id of sim.aauIds) {
      expect(sim.teoricoIds.has(id)).toBe(false);
      expect(sim.practicoIds.has(id)).toBe(false);
    }
    // el global suma ciencias + AAU
    const correct: Record<string, boolean> = {};
    for (const id of sim.aauIds) correct[id] = true;
    const res = scoreExam(sim, correct);
    expect(res.aau.total).toBe(5);
    expect(res.aau.correct).toBe(5);
    expect(res.overall.total).toBe(
      sim.teoricoIds.size + sim.practicoIds.size + sim.aauIds.size,
    );
  });
});
