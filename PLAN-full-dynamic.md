# Plan: Make EngineersTech Website Fully Dynamic

## Current State
- Services, Products, Blog, Testimonials, Team, Client Logos — **already have API endpoints** (public + admin CRUD)
- Hero, Industries, Process, Tech Stack, AI Metrics, Delivery Banner, Case Studies, Announcement Bar, Footer, Navigation — **all hardcoded**

## Goal
Every section on the frontend reads from the backend API. Admin panel controls all content. No hardcoded data in React components.

---

## Phase A: Backend Fixes (Laravel)

### A1. Add Public Settings Endpoint
**File:** `routes/api.php` + `app/Http/Controllers/PublicController.php`

Add `GET /api/settings` — returns all `site_settings` as a public key/value map (no auth needed).

### A2. Fix Products Schema Mismatch
**File:** `database/migrations/` — add missing columns

Add to `products` table:
- `category` (string, nullable)
- `image_url` (string, nullable)
- `price` (string, nullable)
- `features` (JSON, nullable)

### A3. Seed Dynamic Settings
**File:** `database/seeders/` — add settings seeder

Seed `site_settings` with:
```
hero_slides        → JSON array of {badge, headline, highlight, subtext, ctaPrimary, ctaSecondary, stats[]}
industries         → JSON array of {name, description, icon, color, link}
process_steps      → JSON array of {title, subtitle, points[], icon}
tech_stack         → JSON array of {category, items[]}
ai_metrics         → JSON array of {value, suffix, label, subtitle, description, icon, color}
delivery_stats     → JSON array of {value, suffix, label, icon}
case_studies       → JSON array of {id, title, industry, tags[], summary, metrics[], color}
announcement       → JSON {visible, text, ctaLabel, ctaLink}
company_info       → JSON {name, tagline, email, phone, address, socialLinks{}, registration}
footer_services    → JSON array of {label, to}
navigation         → JSON array of nav items (mega menu structure)
```

### A4. Verify CORS
**File:** `config/cors.php`

Ensure `allowed_origins` includes `http://localhost:5173`, `http://localhost:8081`, and production domain.

---

## Phase B: Frontend — Connect Existing Sections to API

### B1. Services Section → `GET /api/services`
**File:** `src/components/home/ServicesOverview.tsx`
- Fetch from `api.services()` on mount
- Map `title` → display, `description` → subtitle, `icon` → Lucide icon
- Keep skeleton/fallback while loading

### B2. Products Section → `GET /api/products`
**File:** `src/components/home/ProductsSection.tsx`
- Fetch from `api.products()` on mount
- Map fields to card display

### B3. Client Logos → `GET /api/logos`
**File:** `src/components/home/ClientLogos.tsx`
- Fetch from `api.logos()` on mount
- Display `logo_url` images, fallback to placeholder

### B4. Team → `GET /api/team` (for About page)
**File:** `src/pages/About.tsx`
- Fetch from `api.team()` on mount

### B5. Testimonials — Already connected ✅
Just verify fallback handling for null `photo_url`.

---

## Phase C: Frontend — Dynamic Sections via Settings API

Create a **site settings hook** that fetches `GET /api/settings` once and provides data to all components.

### C1. Create Settings Hook
**File:** `src/hooks/useSettings.ts`

```ts
// Fetches /api/settings once, caches in context
// Provides: getSetting(key) → parsed JSON value
// Used by all dynamic sections
```

### C2. Hero Carousel → `hero_slides` setting
**File:** `src/components/home/HeroSection.tsx`
- Read slides from `hero_slides` setting
- Fallback to current hardcoded slides if setting is empty

### C3. Industries Section → `industries` setting
**File:** `src/components/home/IndustriesSection.tsx`
- Read from `industries` setting
- Fallback to current hardcoded data

### C4. Process Section → `process_steps` setting
**File:** `src/components/home/ProcessSection.tsx`
- Read from `process_steps` setting
- Fallback to current hardcoded data

### C5. Tech Stack → `tech_stack` setting
**File:** `src/components/home/TechStackSection.tsx`
- Read from `tech_stack` setting
- Fallback to current hardcoded data

### C6. AI Excellence → `ai_metrics` setting
**File:** `src/components/home/AIExcellenceSection.tsx`
- Read from `ai_metrics` setting
- Fallback to current hardcoded data

### C7. Delivery Banner → `delivery_stats` setting
**File:** `src/components/home/DeliveryBanner.tsx`
- Read from `delivery_stats` setting
- Fallback to current hardcoded data

### C8. Case Studies → `case_studies` setting
**File:** `src/components/home/CaseStudiesSection.tsx`
- Read from `case_studies` setting
- Fallback to current hardcoded data

### C9. Announcement Bar → `announcement` setting
**File:** `src/components/AnnouncementBar.tsx`
- Read visibility, text, CTA from `announcement` setting
- Fallback to current hardcoded content

### C10. Footer → `company_info` + `footer_services` settings
**File:** `src/components/Footer.tsx`
- Read contact info, social links, services from settings
- Fallback to current hardcoded data

### C11. Navigation → `navigation` setting
**File:** `src/data/navigation.ts` → `src/hooks/useNavigation.ts`
- Fetch nav structure from `navigation` setting
- Fallback to current hardcoded nav array

---

## Phase D: Admin Panel Enhancements

### D1. Settings Page Sections
**File:** `src/pages/admin/AdminSettings.tsx`

Add form sections for each dynamic area:
- Hero Slides (multi-slide editor)
- Industries (list editor)
- Process Steps (list editor)
- Tech Stack (category + items editor)
- AI Metrics (list editor)
- Delivery Stats (list editor)
- Case Studies (list editor)
- Announcement Bar (toggle + text + CTA)
- Company Info (name, email, phone, address, social links)
- Footer Services (list editor)
- Navigation (nested list editor)

---

## Implementation Order

### Step 1: Backend fixes (A1–A4)
- Public settings endpoint
- Products migration fix
- Settings seeder
- CORS check

### Step 2: Settings hook (C1)
- Create `useSettings` hook + provider
- Wrap app with `SettingsProvider`

### Step 3: Connect existing API sections (B1–B5)
- Services, Products, Logos, Team → dynamic from API

### Step 4: Make sections dynamic (C2–C11)
- One by one: Hero, Industries, Process, Tech Stack, AI, Delivery, Case Studies, Announcement, Footer, Nav

### Step 5: Admin settings UI (D1)
- Build admin forms for all settings

---

## Files to Create/Modify

### Backend
| File | Action |
|------|--------|
| `routes/api.php` | Add `GET /api/settings` |
| `app/Http/Controllers/PublicController.php` | Add `settings()` method |
| `database/migrations/xxxx_add_fields_to_products.php` | Add category, image_url, price, features |
| `database/seeders/SettingsSeeder.php` | Seed all dynamic settings |
| `config/cors.php` | Verify allowed origins |

### Frontend — New Files
| File | Purpose |
|------|---------|
| `src/hooks/useSettings.ts` | Settings context + hook |
| `src/components/SettingsProvider.tsx` | Provider wrapper |

### Frontend — Modify
| File | Change |
|------|--------|
| `src/App.tsx` | Wrap with SettingsProvider |
| `src/components/home/HeroSection.tsx` | Read from settings |
| `src/components/home/ServicesOverview.tsx` | Fetch from API |
| `src/components/home/IndustriesSection.tsx` | Read from settings |
| `src/components/home/ProcessSection.tsx` | Read from settings |
| `src/components/home/TechStackSection.tsx` | Read from settings |
| `src/components/home/AIExcellenceSection.tsx` | Read from settings |
| `src/components/home/DeliveryBanner.tsx` | Read from settings |
| `src/components/home/CaseStudiesSection.tsx` | Read from settings |
| `src/components/home/ProductsSection.tsx` | Fetch from API |
| `src/components/home/ClientLogos.tsx` | Fetch from API |
| `src/components/AnnouncementBar.tsx` | Read from settings |
| `src/components/Footer.tsx` | Read from settings |
| `src/data/navigation.ts` | Read from settings |
| `src/pages/admin/AdminSettings.tsx` | Add all settings forms |

---

## Risk: Settings Payload Size
All settings in one `GET /api/settings` call = ~5–10KB JSON. Fine for initial load. Cache in React context, refetch on admin save.

## Fallback Strategy
Every component keeps its current hardcoded data as fallback. If API is down or settings are empty, the site still works with default content.
