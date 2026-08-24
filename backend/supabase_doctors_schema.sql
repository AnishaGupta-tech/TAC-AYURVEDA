-- FIFTH script: run this in the same Supabase SQL Editor after the previous four.
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new)
-- Moves doctors from the Express backend's in-memory array to Supabase, so the
-- Doctor Consultation page no longer depends on the Railway backend being up.

create table if not exists public.doctors (
  id bigint generated always as identity primary key,
  name text not null,
  specialization text not null,
  location text,
  experience_years int,
  photo text,
  available_date date,
  available_slots text[] default '{}',
  booked boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.doctors enable row level security;

create policy "Anyone can read doctors"
  on public.doctors for select
  using (true);

-- Any signed-in user can mark a doctor as booked when they complete a booking.
-- (This is a shared demo resource, not per-user data — appointments themselves
-- are tracked privately per-user in public.appointments.)
create policy "Authenticated users can update doctor booking status"
  on public.doctors for update
  using (auth.role() = 'authenticated');

insert into public.doctors (name, specialization, location, experience_years, photo, available_date, available_slots) values
  ('Dr. Meenakshi Dawangave', 'Panchakarma', 'Kochi, Kerala', 14, 'https://randomuser.me/api/portraits/women/39.jpg', current_date + 1, array['10:00 AM','11:00 AM']),
  ('Dr. Chandresh Padmanabha', 'Nadi Pariksha', 'Rishikesh, Uttarakhand', 19, 'https://randomuser.me/api/portraits/men/23.jpg', current_date + 2, array['09:00 AM','02:00 PM']),
  ('Dr. Savitha Shroff', 'Women''s Ayurvedic Health', 'Bengaluru, Karnataka', 11, 'https://randomuser.me/api/portraits/women/87.jpg', current_date + 3, array['01:00 PM','03:00 PM']),
  ('Dr. Guneet Shet', 'Kayachikitsa', 'Pune, Maharashtra', 16, 'https://randomuser.me/api/portraits/men/35.jpg', current_date + 4, array['04:00 PM','05:00 PM']),
  ('Dr. Gopika Banerjee', 'Rasayana Therapy', 'Jaipur, Rajasthan', 9, 'https://randomuser.me/api/portraits/women/3.jpg', current_date + 5, array['08:00 AM','12:00 PM']),
  ('Dr. Aloke Shroff', 'Stress & Sleep Disorders', 'Chennai, Tamil Nadu', 13, 'https://randomuser.me/api/portraits/men/17.jpg', current_date + 6, array['10:00 AM','11:00 AM']),
  ('Dr. Manasa Jain', 'Ayurvedic Dermatology', 'Delhi NCR', 8, 'https://randomuser.me/api/portraits/women/29.jpg', current_date + 7, array['11:00 AM','03:00 PM']),
  ('Dr. Donita Nand', 'Prakriti Analysis', 'Ahmedabad, Gujarat', 20, 'https://randomuser.me/api/portraits/women/31.jpg', current_date + 8, array['09:00 AM','01:00 PM'])
on conflict do nothing;

-- ============================================================================
-- HUMAN: this is a FIFTH script. Run order so far:
--   1. supabase_schema.sql (profiles/products)
--   2. supabase_cart_orders_schema.sql (cart_items/orders/order_items)
--   3. supabase_appointments_schema.sql (appointments)
--   4. supabase_more_products.sql (14 more products)
--   5. supabase_doctors_schema.sql (this file — doctors table + seed)
-- Paste this file into the same Supabase SQL Editor and run it once.
-- ============================================================================
