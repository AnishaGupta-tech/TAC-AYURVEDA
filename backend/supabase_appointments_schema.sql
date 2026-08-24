-- THIRD script: run this in the same Supabase SQL Editor AFTER supabase_schema.sql
-- and supabase_cart_orders_schema.sql
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new)
-- Adds account-linked doctor appointment bookings so they can be shown on Profile.

create table if not exists public.appointments (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  doctor_id int not null,
  doctor_name text not null,
  specialization text,
  appointment_date date not null,
  appointment_slot text not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

create policy "Users can view their own appointments"
  on public.appointments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own appointments"
  on public.appointments for insert
  with check (auth.uid() = user_id);

-- ============================================================================
-- HUMAN: this is a THIRD script, separate from supabase_schema.sql and
-- supabase_cart_orders_schema.sql which you already ran. Paste this whole file
-- into the same Supabase SQL Editor
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new) and run
-- it once. It has not been run yet as of this commit.
-- ============================================================================
