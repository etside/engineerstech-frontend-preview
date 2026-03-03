# engineersTech — Full Company Website & Admin Panel

## Project Overview
A complete company website for **engineersTech**, a Bangladesh-based software engineering firm. Built with React + Vite + Tailwind CSS + TypeScript, powered by Lovable Cloud (Supabase) for backend.

---

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: Lovable Cloud (Supabase) — PostgreSQL, Auth, RLS
- **Routing**: React Router v6
- **State**: React Query, React Context (Auth)
- **Styling**: Dark theme with blue gradient accent (#0052CC → #2684FF)
- **Font**: Poppins (all weights)

---

## Database Schema (Supabase/PostgreSQL)

### Tables
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `services` | Service offerings | title, description, icon (lucide name), display_order, is_active |
| `products` | SaaS products | name, description, icon (lucide name), external_url, display_order, is_active |
| `blog_posts` | Blog content | slug, title, excerpt, content (text), category, cover_image (URL), is_published, published_at |
| `team_members` | Leadership team | name, designation, bio, photo_url (URL), linkedin_url, whatsapp_number, display_order, is_active |
| `testimonials` | Client testimonials | name, role, company, quote, photo_url (URL), rating, display_order, is_active |
| `client_logos` | Client logo carousel | name, logo_url (URL), website_url, display_order, is_active |
| `contact_submissions` | Contact form entries | name, email, phone, subject, message, is_read |
| `site_settings` | Key-value site config | key, value (JSONB) |
| `profiles` | User profiles | id (FK auth.users), full_name, avatar_url |
| `user_roles` | RBAC roles | user_id (FK auth.users), role (enum: admin, moderator, user) |

### Auth & Roles
- Authentication via Supabase Auth (email/password)
- Roles stored in `user_roles` table (NOT on profiles)
- `has_role()` security definer function for RLS policies
- Auto-confirm email enabled

### RLS Policies
- All content tables: Public SELECT, Admin-only INSERT/UPDATE/DELETE
- `contact_submissions`: Anyone can INSERT, Admin-only SELECT/UPDATE
- `user_roles`: Users can read own roles, Admins can manage all
- `profiles`: Users can read/update own profile only

---

## ⚠️ IMPORTANT: Image Fields Use URLs, Not File Uploads

The following fields accept **image URLs** (not file uploads):
- `team_members.photo_url` — Team member photos
- `testimonials.photo_url` — Testimonial author photos
- `client_logos.logo_url` — Client logo images
- `blog_posts.cover_image` — Blog post cover images
- `profiles.avatar_url` — User avatar images

**For production**: These should be replaced with a proper file upload system (e.g., Supabase Storage buckets) that uploads files and stores the resulting URL. Currently, admins must paste external image URLs manually in the admin panel.

---

## Frontend Pages

### Public Pages
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index.tsx` | Home — Hero, Services overview, Client logos carousel, Stats, GlowUp spotlight, Testimonials, CTA |
| `/services` | `Services.tsx` | 4 service categories with tech stacks and capabilities |
| `/products` | `Products.tsx` | 7 SaaS products grid with status badges and links |
| `/about` | `About.tsx` | Company story timeline, Mission/Vision, Values, Leadership team |
| `/contact` | `Contact.tsx` | Contact form (saves to DB), Company info, Map placeholder |
| `/blog` | `Blog.tsx` | Blog listing with cards |
| `/blog/:id` | `BlogPost.tsx` | Individual blog post |

### Admin Pages (Protected: `/admin/*`)
| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/login` | `AdminLogin.tsx` | Login/Signup form |
| `/admin` | `AdminDashboard.tsx` | Overview stats |
| `/admin/services` | `AdminServices.tsx` | CRUD for services |
| `/admin/products` | `AdminProducts.tsx` | CRUD for products |
| `/admin/blog` | `AdminBlog.tsx` | CRUD for blog posts |
| `/admin/team` | `AdminTeam.tsx` | CRUD for team members |
| `/admin/testimonials` | `AdminTestimonials.tsx` | CRUD for testimonials |
| `/admin/logos` | `AdminLogos.tsx` | CRUD for client logos |
| `/admin/submissions` | `AdminSubmissions.tsx` | View contact form submissions |
| `/admin/settings` | `AdminSettings.tsx` | Site settings management |

### Global Components
- **Navbar**: Logo, nav links (Home, Services, Products, About, Contact), mobile hamburger menu
- **Footer**: Logo, quick links, services, contact info, e-CAB badge, social links. Collapsible accordion on mobile.
- **FloatingWidgets**: WhatsApp button, AI chat widget placeholder

---

## Key Architecture Decisions

### Authentication Flow
1. User visits `/admin/login` → signs in with email/password
2. `useAuth` context checks `user_roles` table for admin role
3. `AdminLayout` redirects to login if no user, shows "Access Denied" if not admin
4. Navigation uses `<Navigate>` component (not imperative `navigate()`)
5. `onAuthStateChange` uses `setTimeout` for `checkAdmin` to avoid blocking

### Design System
- All colors use CSS custom properties (HSL) defined in `index.css`
- Tailwind semantic tokens: `--background`, `--foreground`, `--primary`, `--accent`, etc.
- Glass card effect: `glass-card` utility class
- Gradient backgrounds: `gradient-bg` and `gradient-text` utility classes

### Layout
- Standardized hero heights with uniform responsive padding
- Section spacing: `py-12` mobile, `py-20` desktop
- Home hero capped at 70-80% viewport height
- Admin layout: Fixed sidebar (desktop), overlay sidebar (mobile), fixed header

---

## Current Data (Seeded)
- **4 Services**: Enterprise & SaaS, Web & Mobile, UI/UX & Motion, Consultation
- **7 Products**: GlowUp, Restaurant POS, Tour Booking, HRM, Hotel Booking, CRM, Staff Tracking
- **3 Testimonials**: Jeremy Nathan, Freda Lin, Mynul Hasan
- **3 Team Members**: Nazmul Alom Sakib (CEO), Al Shahriar (COO), Sheikh Md. Junaeid (CMO)
- **6 Blog Posts**: All published with full content
- **6 Client Logos**: Placeholder names (need actual logo URLs)

---

## What's Still Static (Not Yet Connected to DB)
The public-facing pages currently render from **hardcoded static arrays** in each component file. To make them fully dynamic:
- `ServicesOverview.tsx`, `Services.tsx` → fetch from `services` table
- `Products.tsx` → fetch from `products` table
- `About.tsx` (team section) → fetch from `team_members` table
- `Testimonials.tsx` → fetch from `testimonials` table
- `ClientLogos.tsx` → fetch from `client_logos` table
- `Blog.tsx`, `BlogPost.tsx` → fetch from `blog_posts` table

The admin panel CRUD pages already read/write to the database.

---

## Company Info (Hardcoded in Footer/Contact)
- **Email**: info@engineerstechbd.com
- **Phone**: +880-18737-22228, 01689877007
- **Address**: Dhaka, Bangladesh
- **Registration**: TRAD/DNCC/025495/2025
- **e-CAB Member**: https://e-cab.net/

---

## Mobile-First Design
- Every section responsive with Tailwind breakpoints
- Hamburger navigation on mobile
- Touch-friendly cards, buttons, forms
- Footer uses collapsible accordions on mobile
- Floating widgets properly positioned on all screen sizes
- Admin sidebar collapses to overlay on mobile
