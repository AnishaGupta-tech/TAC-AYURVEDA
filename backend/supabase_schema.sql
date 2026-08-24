-- Run this once in the Supabase SQL Editor for project dflogjvuikxsmezqjbej
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new)

-- Profiles: one row per authenticated user, auto-created on signup
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Products: publicly readable, writable only by admins (service role bypasses RLS)
create table if not exists public.products (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  price numeric(10,2) not null,
  image text,
  category text,
  concerns text[] default '{}',
  bestseller boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Anyone can read products"
  on public.products for select
  using (true);

create policy "Admins can insert products"
  on public.products for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update products"
  on public.products for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete products"
  on public.products for delete
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Enable realtime on products so the storefront updates live when admins add items
alter publication supabase_realtime add table public.products;

-- Seed the existing demo catalog
insert into public.products (name, description, price, image, category, concerns, bestseller) values
  ('Ashwagandha', 'Boosts immunity and reduces stress.', 20, 'https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=800&auto=format&fit=crop', 'herbs', array['hairfall','stress'], true),
  ('Turmeric', 'Anti-inflammatory and antioxidant.', 15, 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop', 'herbs', array['acne','allergy'], false),
  ('Coconut Oil', 'Great for skin and hair.', 10, 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop', 'oils', array['hairfall','dandruff'], true),
  ('Tulsi Tea', 'Improves digestion and immunity.', 12, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop', 'teas', array['allergy','stress'], false),
  ('Aloe Vera Gel', 'Soothes skin and promotes hair growth.', 18, 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=800&auto=format&fit=crop', 'oils', array['acne','hairfall'], true),
  ('Neem Capsules', 'Purifies blood and improves skin health.', 25, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop', 'supplements', array['acne','allergy'], true),
  ('Brahmi Powder', 'Supports memory, focus, and calm nerves.', 22, 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop', 'herbs', array['stress'], false),
  ('Triphala Churna', 'Classic blend for digestion and detox.', 18, 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop', 'herbs', array['acne','stress'], true),
  ('Sandalwood Oil', 'Cooling, fragrant oil for skin and mind.', 28, 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800&auto=format&fit=crop', 'oils', array['acne','stress'], false),
  ('Neem Oil', 'Purifying oil for troubled, blemish-prone skin.', 16, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop', 'oils', array['acne'], false),
  ('Ginger Lemon Tea', 'Warming blend that eases digestion and colds.', 13, 'https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?q=80&w=800&auto=format&fit=crop', 'teas', array['allergy'], false),
  ('Chamomile Tea', 'Gentle herbal tea to unwind and sleep better.', 14, 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=800&auto=format&fit=crop', 'teas', array['stress'], true),
  ('Moringa Capsules', 'Nutrient-dense superfood for daily vitality.', 24, 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop', 'supplements', array['stress'], false),
  ('Amla Juice', 'Vitamin C-rich tonic for immunity and skin glow.', 19, 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop', 'supplements', array['acne','hairfall'], true),
  ('Shatavari Capsules', 'Traditional herb supporting hormonal balance.', 26, 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop', 'supplements', array['stress'], false),
  ('Multani Mitti Face Pack', 'Clay mask that draws out impurities and oil.', 15, 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop', 'skincare', array['acne'], false),
  ('Rose Water Toner', 'Alcohol-free toner to hydrate and refresh skin.', 12, 'https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=800&auto=format&fit=crop', 'skincare', array['acne'], true),
  ('Saffron Face Serum', 'Brightening serum for an even, radiant complexion.', 32, 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=800&auto=format&fit=crop', 'skincare', array['acne'], false),
  ('Bhringraj Hair Oil', 'Ayurvedic oil traditionally used to reduce hairfall.', 21, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop', 'haircare', array['hairfall','dandruff'], true),
  ('Amla Hair Cleanser', 'Gentle, herb-infused cleanser for scalp health.', 17, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop', 'haircare', array['dandruff','hairfall'], false)
on conflict do nothing;
