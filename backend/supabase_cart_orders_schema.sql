-- SECOND script: run this in the same Supabase SQL Editor AFTER supabase_schema.sql
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new)
-- Adds per-account cart persistence and real order history/tracking.

-- Cart items: one row per (user, product) pair
create table if not exists public.cart_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete cascade,
  quantity int not null default 1,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.cart_items enable row level security;

create policy "Users can view their own cart items"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can insert their own cart items"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cart items"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "Users can delete their own cart items"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- Orders: one row per placed order
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  total numeric(10,2) not null,
  status text not null default 'processing' check (status in ('processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Order items: line items for an order, denormalized so history stays accurate
-- even if a product is later renamed, repriced, or deleted.
create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,
  product_name text not null,
  quantity int not null,
  price_at_purchase numeric(10,2) not null
);

alter table public.order_items enable row level security;

create policy "Users can view their own order items"
  on public.order_items for select
  using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

create policy "Users can insert their own order items"
  on public.order_items for insert
  with check (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

-- Realtime on orders (nice-to-have so tracking status updates live if changed in the dashboard)
alter publication supabase_realtime add table public.orders;

-- ============================================================================
-- HUMAN: this is a SECOND script, separate from supabase_schema.sql which you
-- already ran. Paste this whole file into the same Supabase SQL Editor
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new) and run
-- it once. It has not been run yet as of this commit.
--
-- To test the order-tracking UI, manually flip an order's status via SQL, e.g.:
--   update public.orders set status = 'shipped' where id = 1;
--   update public.orders set status = 'delivered' where id = 1;
-- ============================================================================
