import { useEffect, useMemo, useState } from 'react';
import type { Item, ItemType, Subject, Track } from '../../types/content';
import { ItemCard } from '../../components/ItemCard';
import { supabase } from '../../lib/supabase';
import { useAppStore } from '../../store';

const MODULE = 'ingreso-medicina';

const SUBJECTS: Subject[] = [
  'biologia', 'quimica', 'fisica', 'matematica',
  'comprension_textos', 'alfabetizacion', 'introduccion',
];
// Tipos soportados por este editor (los de opción y numérico cubren el grueso).
const TYPES: ItemType[] = ['single_choice', 'true_false', 'multiple_response', 'numeric'];

interface ChoiceForm { text: string; correct: boolean }
interface FormState {
  id?: string;
  subject: Subject;
  block: string;
  topic: string;
  track: Track;
  type: ItemType;
  difficulty: 1 | 2 | 3;
  frequency: Item['frequency'];
  institutions: Item['institutions'];
  stem: string;
  choices: ChoiceForm[];
  numValue: string;
  numUnit: string;
  numTolerance: string;
  explanation: string;
  hint: string;
  status: Item['status'];
}

const EMPTY: FormState = {
  subject: 'biologia', block: '', topic: '', track: 'teorico', type: 'single_choice',
  difficulty: 1, frequency: 'media', institutions: ['UNC', 'UNSa'],
  stem: '', choices: [{ text: '', correct: true }, { text: '', correct: false }],
  numValue: '', numUnit: '', numTolerance: '0.01', explanation: '', hint: '', status: 'active',
};

// Fila DB → FormState (para editar).
function rowToForm(r: Record<string, unknown>): FormState {
  const choices = (r.choices as { text: string; correct: boolean }[] | null) ?? [];
  const numeric = (r.numeric as { value: number; unit?: string; tolerance: number } | null) ?? null;
  return {
    id: r.id as string,
    subject: r.subject as Subject,
    block: (r.block as string) ?? '',
    topic: (r.topic as string) ?? '',
    track: r.track as Track,
    type: r.type as ItemType,
    difficulty: (r.difficulty as 1 | 2 | 3) ?? 1,
    frequency: (r.frequency as Item['frequency']) ?? 'media',
    institutions: (r.institutions as Item['institutions']) ?? ['UNC', 'UNSa'],
    stem: (r.stem as string) ?? '',
    choices: choices.length ? choices.map((c) => ({ text: c.text, correct: c.correct })) : EMPTY.choices,
    numValue: numeric ? String(numeric.value) : '',
    numUnit: numeric?.unit ?? '',
    numTolerance: numeric ? String(numeric.tolerance) : '0.01',
    explanation: (r.explanation as string) ?? '',
    hint: (r.hint as string) ?? '',
    status: (r.status as Item['status']) ?? 'active',
  };
}

// FormState → Item (para previsualizar con ItemCard).
function formToItem(f: FormState): Item {
  const isChoice = f.type !== 'numeric';
  return {
    id: f.id ?? 'preview',
    institutions: f.institutions,
    subject: f.subject,
    block: f.block || 'sin_bloque',
    topic: f.topic || 'sin_tema',
    track: f.track,
    type: f.type,
    frequency: f.frequency,
    difficulty: f.difficulty,
    stem: f.stem,
    choices: isChoice
      ? f.choices.map((c, i) => ({ id: String.fromCharCode(97 + i), text: c.text, correct: c.correct }))
      : undefined,
    numeric: f.type === 'numeric'
      ? { value: Number(f.numValue.replace(',', '.')), unit: f.numUnit || undefined, tolerance: Number(f.numTolerance.replace(',', '.')) || 0, toleranceMode: 'abs' }
      : undefined,
    explanation: f.explanation,
    hint: f.hint || undefined,
    source: 'original',
    version: 1,
    status: f.status,
  };
}

// FormState → payload DB.
function formToRow(f: FormState, userId?: string) {
  const item = formToItem(f);
  return {
    module_slug: MODULE,
    subject: item.subject,
    block: item.block,
    topic: item.topic,
    track: item.track,
    type: item.type,
    difficulty: item.difficulty,
    frequency: item.frequency,
    institutions: item.institutions,
    stem: item.stem,
    choices: item.choices ?? null,
    numeric: item.numeric ?? null,
    statements: null,
    explanation: item.explanation,
    hint: item.hint ?? null,
    status: item.status,
    ...(f.id ? {} : { created_by: userId ?? null }),
    updated_at: new Date().toISOString(),
  };
}

function validate(f: FormState): string | null {
  if (!f.stem.trim()) return 'El enunciado no puede estar vacío.';
  if (f.type === 'numeric') {
    if (f.numValue.trim() === '' || Number.isNaN(Number(f.numValue.replace(',', '.'))))
      return 'La respuesta numérica no es válida.';
  } else {
    if (f.choices.filter((c) => c.text.trim()).length < 2) return 'Cargá al menos 2 opciones.';
    if (!f.choices.some((c) => c.correct)) return 'Marcá al menos una opción correcta.';
  }
  return null;
}

export function QuestionsAdmin() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [busy, setBusy] = useState(false);
  const userId = useAppStore((s) => s.session?.user.id);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('module_slug', MODULE)
      .order('updated_at', { ascending: false })
      .limit(200);
    if (error) setError(error.message);
    else setRows((data as Record<string, unknown>[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preview = useMemo(() => (form ? formToItem(form) : null), [form]);

  async function save() {
    if (!supabase || !form) return;
    const problem = validate(form);
    if (problem) { setError(problem); return; }
    setBusy(true);
    setError(null);
    const payload = formToRow(form, userId);
    const res = form.id
      ? await supabase.from('questions').update(payload).eq('id', form.id)
      : await supabase.from('questions').insert(payload);
    setBusy(false);
    if (res.error) { setError(res.error.message); return; }
    setForm(null);
    void load();
  }

  async function remove(id: string) {
    if (!supabase) return;
    const { error } = await supabase.from('questions').delete().eq('id', id);
    if (error) setError(error.message);
    else void load();
  }

  // ---------------- Editor ----------------
  if (form) {
    const set = (patch: Partial<FormState>) => setForm((f) => (f ? { ...f, ...patch } : f));
    const isChoice = form.type !== 'numeric';
    const single = form.type === 'single_choice' || form.type === 'true_false';

    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-white">
              {form.id ? 'Editar pregunta' : 'Nueva pregunta'}
            </h1>
            <button type="button" onClick={() => setForm(null)} className="text-sm text-slate-400 hover:text-slate-200">
              Cancelar
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-md border border-rose-300/25 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">{error}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label="Materia">
              <Select value={form.subject} onChange={(v) => set({ subject: v as Subject })} options={SUBJECTS} />
            </Field>
            <Field label="Tipo">
              <Select value={form.type} onChange={(v) => set({ type: v as ItemType })} options={TYPES} />
            </Field>
            <Field label="Bloque">
              <Input value={form.block} onChange={(v) => set({ block: v })} placeholder="p.ej. celula" />
            </Field>
            <Field label="Tema">
              <Input value={form.topic} onChange={(v) => set({ topic: v })} placeholder="p.ej. membrana" />
            </Field>
            <Field label="Track">
              <Select value={form.track} onChange={(v) => set({ track: v as Track })} options={['teorico', 'practico']} />
            </Field>
            <Field label="Frecuencia">
              <Select value={form.frequency} onChange={(v) => set({ frequency: v as Item['frequency'] })} options={['alta', 'media', 'baja']} />
            </Field>
            <Field label="Dificultad">
              <Select value={String(form.difficulty)} onChange={(v) => set({ difficulty: Number(v) as 1 | 2 | 3 })} options={['1', '2', '3']} />
            </Field>
            <Field label="Estado">
              <Select value={form.status} onChange={(v) => set({ status: v as Item['status'] })} options={['active', 'deprecated', 'retired']} />
            </Field>
          </div>

          <Field label="Instituciones" className="mt-3">
            <div className="flex gap-4 text-sm text-slate-200">
              {(['UNC', 'UNSa'] as const).map((inst) => (
                <label key={inst} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.institutions.includes(inst)}
                    onChange={(e) =>
                      set({
                        institutions: e.target.checked
                          ? [...new Set([...form.institutions, inst])]
                          : form.institutions.filter((x) => x !== inst),
                      })
                    }
                  />
                  {inst}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Enunciado (Markdown + $KaTeX$)" className="mt-3">
            <Textarea value={form.stem} onChange={(v) => set({ stem: v })} rows={3} />
          </Field>

          {isChoice && (
            <div className="mt-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Opciones</p>
              <div className="space-y-2">
                {form.choices.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type={single ? 'radio' : 'checkbox'}
                      name="correct"
                      checked={c.correct}
                      onChange={(e) =>
                        set({
                          choices: form.choices.map((x, j) =>
                            single
                              ? { ...x, correct: j === i }
                              : j === i ? { ...x, correct: e.target.checked } : x,
                          ),
                        })
                      }
                    />
                    <Input
                      value={c.text}
                      onChange={(v) => set({ choices: form.choices.map((x, j) => (j === i ? { ...x, text: v } : x)) })}
                      placeholder={`Opción ${String.fromCharCode(65 + i)}`}
                    />
                    <button
                      type="button"
                      onClick={() => set({ choices: form.choices.filter((_, j) => j !== i) })}
                      className="text-slate-500 hover:text-rose-300"
                    >✕</button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => set({ choices: [...form.choices, { text: '', correct: false }] })}
                className="mt-2 text-sm font-semibold text-sky-300 hover:text-sky-200"
              >+ Agregar opción</button>
            </div>
          )}

          {form.type === 'numeric' && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              <Field label="Valor"><Input value={form.numValue} onChange={(v) => set({ numValue: v })} placeholder="42" /></Field>
              <Field label="Unidad"><Input value={form.numUnit} onChange={(v) => set({ numUnit: v })} placeholder="mol/L" /></Field>
              <Field label="Tolerancia"><Input value={form.numTolerance} onChange={(v) => set({ numTolerance: v })} placeholder="0.01" /></Field>
            </div>
          )}

          <Field label="Explicación" className="mt-3">
            <Textarea value={form.explanation} onChange={(v) => set({ explanation: v })} rows={2} />
          </Field>
          <Field label="Pista (opcional)" className="mt-3">
            <Input value={form.hint} onChange={(v) => set({ hint: v })} />
          </Field>

          <button
            type="button"
            disabled={busy}
            onClick={() => void save()}
            className="aulirex-primary-button mt-5 h-11 w-full rounded-md text-sm font-black disabled:opacity-50"
          >
            {busy ? 'Guardando…' : form.id ? 'Guardar cambios' : 'Crear pregunta'}
          </button>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Vista previa</p>
          {preview && <ItemCard key={JSON.stringify(preview)} item={preview} />}
        </div>
      </div>
    );
  }

  // ---------------- Lista ----------------
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Preguntas</h1>
          <p className="mt-1 text-sm text-slate-400">
            Banco del módulo Ingreso a Medicina (Supabase). Se mergea con el banco base de la app.
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setError(null); setForm({ ...EMPTY }); }}
          className="aulirex-primary-button rounded-md px-4 py-2 text-sm font-black"
        >
          + Nueva
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-rose-300/25 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">{error}</p>
      )}

      {loading ? (
        <p className="mt-6 text-sm text-slate-400">Cargando…</p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-2.5">Materia</th>
                <th className="px-4 py-2.5">Tema</th>
                <th className="px-4 py-2.5">Enunciado</th>
                <th className="px-4 py-2.5">Estado</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r) => (
                <tr key={r.id as string}>
                  <td className="px-4 py-2.5 capitalize text-slate-300">{String(r.subject).replaceAll('_', ' ')}</td>
                  <td className="px-4 py-2.5 text-slate-400">{String(r.topic)}</td>
                  <td className="max-w-xs truncate px-4 py-2.5 text-slate-200">{String(r.stem)}</td>
                  <td className="px-4 py-2.5">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${r.status === 'active' ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/5 text-slate-400'}`}>
                      {String(r.status)}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button type="button" onClick={() => { setError(null); setForm(rowToForm(r)); }} className="mr-2 text-xs font-semibold text-sky-300 hover:text-sky-200">Editar</button>
                    <button type="button" onClick={() => { if (confirm('¿Eliminar esta pregunta?')) void remove(r.id as string); }} className="text-xs font-semibold text-rose-300 hover:text-rose-200">Eliminar</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-500">No hay preguntas en Supabase todavía. Creá la primera.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ---------------- Campos reutilizables ----------------
function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-400">{label}</span>
      {children}
    </label>
  );
}
const inputCls = 'h-10 w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-100 outline-none focus:border-sky-400';
function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />;
}
function Textarea({ value, onChange, rows }: { value: string; onChange: (v: string) => void; rows: number }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${inputCls} h-auto py-2`} />;
}
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
      {options.map((o) => (
        <option key={o} value={o} className="text-black">{o.replaceAll('_', ' ')}</option>
      ))}
    </select>
  );
}
