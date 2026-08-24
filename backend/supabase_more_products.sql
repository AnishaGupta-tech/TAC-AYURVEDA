-- FOURTH script: run this in the same Supabase SQL Editor AFTER supabase_schema.sql,
-- supabase_cart_orders_schema.sql, and supabase_appointments_schema.sql
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new)
-- Adds MORE products to the catalog beyond the original 6 seeded by
-- supabase_schema.sql (which was already run and should not be re-run).
-- All image URLs below were curl-verified to return HTTP 200 before inclusion.

insert into public.products (name, description, price, image, category, concerns, bestseller) values
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

-- ============================================================================
-- HUMAN: this is a FOURTH script. Run order so far:
--   1. supabase_schema.sql (already run — creates profiles/products, seeds 6 products)
--   2. supabase_cart_orders_schema.sql (already run — cart_items/orders/order_items)
--   3. supabase_appointments_schema.sql (NOT run yet — appointments table)
--   4. supabase_more_products.sql (this file, NOT run yet — 14 more products)
-- Paste this file into the same Supabase SQL Editor
-- (https://supabase.com/dashboard/project/dflogjvuikxsmezqjbej/sql/new) and run it once.
-- ============================================================================
