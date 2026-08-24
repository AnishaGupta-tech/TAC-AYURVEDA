# AyurSphere – AI-Integrated Ayurvedic Healthcare Platform

AyurSphere is a full-stack web application that blends traditional Ayurvedic wellness principles with modern AI and a real e-commerce experience — personalized health diagnostics, doctor consultations, a product shop, and lifestyle guidance, all in one platform.

---

## 🔮 Features

- **🧠 AI Wellness Assistant**
  Real-time, context-aware Ayurvedic guidance powered by Groq (LLaMA/GPT-OSS models), with a purpose-built system prompt covering diet, lifestyle, dosha balance, and herbal remedies.

- **🧬 Prakriti Analysis**
  Personalized Ayurvedic body-type (Vata, Pitta, Kapha) evaluation and guidance.

- **📋 Symptom Checker**
  Symptom-to-remedy mapping aligned with Ayurvedic principles.

- **🌦️ Live Seasonal Guidance**
  Real-time weather (via Open-Meteo, no API key required) mapped to dosha-balancing recommendations for the day.

- **👨‍⚕️ Consult a Vaidya**
  Browse real practitioner profiles (specialization, location, experience) and book appointments — bookings are tied to your account and tracked in your profile.

- **🛍️ Shop**
  20+ Ayurvedic products (herbs, oils, teas, supplements, skincare, haircare) organized into browsable sections (Bestsellers + by category), with filtering, search, star ratings, and discount badges.

- **🔐 Real Accounts & Auth**
  Email/password sign-up and sign-in via Supabase Auth, with session persistence across the app.

- **🛒 Persistent Cart & Order History**
  Cart is saved to your account (not just the browser) and synced live. Checkout creates a real order record with line items, total, and a trackable status (processing → shipped → delivered).

- **👤 Profile Dashboard**
  One place to see your saved cart, past orders with tracking status, and upcoming doctor appointments.

- **⭐ Reviews**
  A dedicated reviews page with ratings from the community, plus a homepage highlight section.

- **📘 Lifestyle Guidance**
  Ayurvedic routine, diet, and remedy articles with expandable detail.

---

## 🧰 Tech Stack

| Layer          | Technology                                               |
|----------------|------------------------------------------------------------|
| Frontend       | React 19 + Vite, React Router, plain CSS with a design-token system |
| Backend        | Node.js + Express                                          |
| Database/Auth  | Supabase (Postgres, Row Level Security, Auth, Realtime)    |
| AI             | Groq API (OpenAI-compatible)                                |
| Weather API    | Open-Meteo (free, keyless)                                  |
| Frontend Deploy| Vercel                                                      |
| Backend Deploy | Railway                                                     |

---

## 📂 Architecture Notes

- **Frontend** (`ayurveda/`): a Vite + React SPA. Auth state is provided app-wide via `AuthGate`, cart state via `CartContext` (Supabase-backed per account). All pages share a single global `Navbar`/`Footer` rendered once in `main.jsx`.
- **Backend** (`backend/`): an Express server exposing REST endpoints for doctors, appointments, guidance content, contact/newsletter forms, and the AI chat proxy (Groq). Product, cart, order, and appointment *data* lives in Supabase with Row Level Security — the Express server does not hold the source of truth for those.
- **Database**: Supabase Postgres with RLS policies scoped to `auth.uid()` so users can only read/write their own cart, orders, and appointments; products are publicly readable and admin-write-only. Schema/migration files live in `backend/*.sql` and are applied via the Supabase SQL Editor.
- **Security**: the Supabase `service_role` key (full DB access, bypasses RLS) is used only server-side and is never bundled into frontend code. The frontend uses only the public `anon` key, which is safe to expose and is subject to RLS.

---

## 🔑 Environment Variables

**`ayurveda/.env`** (frontend)
```
VITE_API_BASE_URL=<your deployed backend URL>
VITE_SUPABASE_URL=<your Supabase project URL>
VITE_SUPABASE_ANON_KEY=<your Supabase anon/public key>
```

**`backend/.env`** (backend — never commit this file)
```
GROQ_API_KEY=<your Groq API key>
SUPABASE_URL=<your Supabase project URL>
SUPABASE_SERVICE_ROLE_KEY=<your Supabase service role key — keep secret>
```

---

## 🗄️ Database Setup

Run these SQL files, in order, in your Supabase project's SQL Editor:

1. `backend/supabase_schema.sql` — core schema: `profiles`, `products`, RLS policies, auto-profile-creation trigger, realtime on products, seed catalog.
2. `backend/supabase_cart_orders_schema.sql` — `cart_items`, `orders`, `order_items`, RLS scoped to each user.
3. `backend/supabase_appointments_schema.sql` — `appointments`, RLS scoped to each user.
4. `backend/supabase_more_products.sql` — additional seed products (safe to run anytime after step 1).

---

## 🚀 Running Locally

**Backend**
```bash
cd backend
npm install
npm start        # http://localhost:5050
```

**Frontend**
```bash
cd ayurveda
npm install
npm run dev       # http://localhost:5173
```

---

## 👩‍💻 Developed By

**Anisha Gupta**
🔗 [GitHub](https://github.com/AnishaGupta-tech)
🔗 [LinkedIn](https://linkedin.com/in/anisha-gupta-33582b311)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
