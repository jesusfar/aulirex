import type { Item } from '../types/content';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Fila de la tabla `questions` de Supabase.
interface QuestionRow {
  id: string;
  subject: Item['subject'];
  block: string;
  topic: string;
  track: Item['track'];
  type: Item['type'];
  difficulty: Item['difficulty'];
  frequency: Item['frequency'];
  institutions: Item['institutions'];
  stem: string;
  choices: Item['choices'] | null;
  numeric: Item['numeric'] | null;
  statements: Item['statements'] | null;
  explanation: string;
  hint: string | null;
  status: Item['status'];
  version: number;
  author_note: string | null;
}

export function rowToItem(row: QuestionRow): Item {
  return {
    id: row.id,
    institutions: row.institutions,
    subject: row.subject,
    block: row.block,
    topic: row.topic,
    track: row.track,
    type: row.type,
    frequency: row.frequency,
    difficulty: row.difficulty,
    stem: row.stem,
    choices: row.choices ?? undefined,
    numeric: row.numeric ?? undefined,
    statements: row.statements ?? undefined,
    explanation: row.explanation,
    hint: row.hint ?? undefined,
    source: 'original',
    version: row.version,
    status: row.status,
    authorNote: row.author_note ?? undefined,
  };
}

// Trae las preguntas activas del módulo desde Supabase. Devuelve [] si Supabase
// no está configurado o si hay error (la app no debe romperse por el backend).
export async function fetchRemoteItems(
  moduleSlug = 'ingreso-medicina',
): Promise<Item[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(
        'id, subject, block, topic, track, type, difficulty, frequency, institutions, stem, choices, numeric, statements, explanation, hint, status, version, author_note',
      )
      .eq('module_slug', moduleSlug)
      .eq('status', 'active');
    if (error) {
      console.warn('No se pudieron cargar preguntas remotas:', error.message);
      return [];
    }
    return (data as QuestionRow[]).map(rowToItem);
  } catch (e) {
    console.warn('Error de red al cargar preguntas remotas:', e);
    return [];
  }
}
