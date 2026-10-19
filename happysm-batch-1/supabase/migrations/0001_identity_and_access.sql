-- happysm Phase 3 foundation: identity, profile ownership, and creator authorization.
-- Apply only to a new Supabase project after reviewing the migration.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  date_of_birth date,
  height_m numeric(4,2) check (height_m is null or (height_m >= 0.5 and height_m <= 2.8)),
  weight_kg numeric(6,2) check (weight_kg is null or (weight_kg > 0 and weight_kg <= 500)),
  activity_minutes_per_day integer check (activity_minutes_per_day is null or activity_minutes_per_day between 0 and 1440),
  monthly_food_budget numeric(12,2) check (monthly_food_budget is null or monthly_food_budget >= 0),
  budget_currency char(3) not null default 'BDT',
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Privileged identities are managed by trusted operators only. There is no public role field.
create table if not exists public.creator_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now(),
  granted_by text not null,
  note text
);

alter table public.profiles enable row level security;
alter table public.creator_access enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- No user-facing policies for creator_access: ordinary clients cannot read or mutate grants.
-- Trusted server code may check creator access using a server-only service role, or a future
-- narrowly scoped SECURITY DEFINER helper after its privileges are audited.
revoke all on public.creator_access from anon, authenticated;
revoke all on public.profiles from anon;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

-- Deliberately no automatic profile trigger with elevated privileges. Profile creation is handled
-- by authenticated server code or a carefully scoped trigger added in a later migration.
