-- Aulirex — esquema inicial (Supabase / Postgres).
-- Correr en el SQL editor del proyecto, o con `supabase db push`.
-- Toda la seguridad es por RLS: el frontend usa solo la anon key + el JWT del
-- usuario. La service_role key NUNCA se expone en el cliente.

-- ============================================================================
-- profiles: 1:1 con auth.users. `role` gobierna el acceso al modo admin.
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'student' check (role in ('student', 'admin')),
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Helper: ¿el usuario actual es admin? (SECURITY DEFINER evita recursión de RLS)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Cada usuario lee/edita su propio perfil; los admin ven y editan todos.
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

-- Alta automática del perfil al registrarse un usuario en auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- questions: banco de preguntas gestionado por admin. Refleja el tipo `Item`
-- del frontend (src/types/content.ts). Se mergea con el banco in-repo.
-- ============================================================================
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  module_slug text not null default 'ingreso-medicina',
  subject text not null,
  block text not null,
  topic text not null,
  track text not null check (track in ('teorico', 'practico')),
  type text not null,
  difficulty int not null default 1 check (difficulty between 1 and 3),
  frequency text not null default 'media' check (frequency in ('alta', 'media', 'baja')),
  institutions text[] not null default array['UNC', 'UNSa'],
  stem text not null,
  choices jsonb,
  numeric jsonb,
  statements jsonb,
  explanation text not null default '',
  hint text,
  status text not null default 'active' check (status in ('active', 'deprecated', 'retired')),
  version int not null default 1,
  author_note text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists questions_module_status_idx
  on public.questions (module_slug, status);

alter table public.questions enable row level security;

-- Lectura: pública (el banco de preguntas no es secreto; los alumnos sin cuenta
-- también deben verlas). Escritura: solo admin.
drop policy if exists "questions_select_authenticated" on public.questions;
drop policy if exists "questions_select_public" on public.questions;
create policy "questions_select_public" on public.questions
  for select using (true);

drop policy if exists "questions_write_admin" on public.questions;
create policy "questions_write_admin" on public.questions
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- progress_events: append-only para sync multi-dispositivo (uso futuro).
-- ============================================================================
create table if not exists public.progress_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  module_slug text not null default 'ingreso-medicina',
  kind text not null,
  payload jsonb not null,
  device_id text,
  created_at timestamptz not null default now()
);

create index if not exists progress_events_user_idx
  on public.progress_events (user_id, created_at);

alter table public.progress_events enable row level security;

-- Cada usuario solo ve y escribe sus propios eventos.
drop policy if exists "progress_events_own" on public.progress_events;
create policy "progress_events_own" on public.progress_events
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ============================================================================
-- Bootstrap del primer admin: tras registrarte, corré (una vez) con tu email:
--   update public.profiles set role = 'admin' where email = 'tu-email@ejemplo.com';
-- ============================================================================
