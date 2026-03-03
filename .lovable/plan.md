

# engineersTech — Full Company Website & Admin Panel

## Design System & Theme
- **Dark theme** (primary background: near-black #0A0E1A) with blue gradient accent (#0052CC → #2684FF from your logo)
- **Font**: Poppins (all weights)
- Consistent component library: buttons, cards, section headers, badges, inputs — all built first for reuse
- Gradient icon accent matching the eticon SVG colors
- Both logo variants (dark/light background) embedded as assets

---

## Frontend Pages

### 1. Home Page
- **Hero Section**: Bold headline with "drivenByEngineers" slogan, animated gradient text, CTA buttons (Get Started / Our Services), subtle background pattern/animation
- **Services Overview**: 4 service cards (Enterprise & SaaS, Web & Mobile Apps, UI/UX & Design, Consultation & Strategy) with icons and brief descriptions
- **Client Logos Carousel**: Auto-scrolling logos pulled from the existing site (client-1 through client-6 images)
- **Stats/Numbers Section**: Years of experience, projects delivered, team members, clients served
- **Featured SaaS Product**: GlowUp spotlight card with description and link
- **Testimonials Carousel**: 3 testimonials from existing site (Jeremy Nathan, Freda Lin, Mynul Hasan) with photos, names, roles, quotes
- **CTA Section**: Contact prompt with gradient background

### 2. Services Page
- **Service Categories**: Detailed cards for each of the 4 service areas with expanded descriptions, key technologies, and icons
- **SaaS Products Section**: Dynamic grid of products (GlowUp, Restaurant POS, Tour Booking, HRM, Hotel Booking, CRM, Staff Tracking, etc.) — each with name, short description, icon, and external link. Designed to be dynamically managed from admin panel

### 3. About Us Page
- **Company Story**: Founded as a freelance agency on Upwork in 2017, transitioned to Bangladesh operations in 2023. Team of engineers — like Telegram's lean philosophy, keeping costs affordable. AI-driven approach offering more value at lower cost
- **Mission & Vision**: Written compellingly (will be generated during implementation)
- **Management Team**: 3 cards with photo placeholder, name, designation, short bio, LinkedIn & WhatsApp icons
  1. Nazmul Alom Sakib — Founder & CEO, 10+ years product management & development
  2. Al Shahriar — Co-Founder & COO, 8+ years DevOps experience
  3. Sheikh Md. Junaeid — Co-Founder & CMO, 10+ years marketing experience
- **Why engineersTech**: The name story — all team members are software engineers

### 4. Blog Page
- Blog listing with cards (thumbnail, title, excerpt, date, category)
- Individual blog post page with full content rendering
- All content managed dynamically from admin

### 5. Contact Page
- **Contact Form**: Name, email, phone, subject, message — with validation
- **Company Info**: Address, phone numbers, email displayed alongside
- **Embedded Map** placeholder for Dhaka location

### 6. Footer (Global)
- Logo + slogan "drivenByEngineers"
- Quick links to all pages
- Contact info: info@engineerstechbd.com, +880-18737-22228, 01689877007, Dhaka, Bangladesh
- Registration: TRAD/DNCC/025495/2025
- e-CAB member badge with link to https://e-cab.net/
- Social media links

### 7. Floating Widgets (Global)
- **WhatsApp Popup**: Always-visible floating WhatsApp button linking to chat
- **AI Chat Widget**: Floating chat bubble that opens a chatbot answering questions about engineersTech services (using static FAQ-style responses for frontend, can be connected to AI API later)

---

## Admin Panel (Separate Route /admin)
Full CRUD dashboard to manage all dynamic content:
- **Dashboard**: Overview stats
- **Hero Section**: Edit headline, subtext, CTA links
- **Services**: Add/edit/delete service categories
- **SaaS Products**: Add/edit/delete products with name, description, link, icon
- **Team Members**: Manage management team profiles
- **Client Logos**: Upload/manage client logos
- **Testimonials**: Add/edit/delete testimonials with photo, name, role, quote
- **Blog Posts**: Full blog management with rich text
- **Company Info**: Edit about us content, contact details, registration info
- **Contact Submissions**: View form submissions

---

## PHP Laravel Backend (as .txt files with documentation)
Since Lovable can't run PHP, all backend files will be saved as `.txt` with a comprehensive `BACKEND_README.md` that maps every file, explains the API structure, and provides setup instructions so Claude AI can instantly understand and work with them:

- **Database Migrations**: All MySQL tables (services, products, team_members, client_logos, testimonials, blog_posts, blog_categories, contact_submissions, site_settings, users)
- **Models**: Eloquent models for each table
- **Controllers**: API controllers with full CRUD for each resource
- **Routes**: API route definitions (api.php)
- **API Documentation**: Complete endpoint reference in the README
- **Auth**: Laravel Sanctum setup for admin authentication
- **File Upload**: Image upload handling for logos, team photos, testimonials

---

## Mobile-First Design
- Every section designed mobile-first with responsive breakpoints
- Hamburger navigation menu on mobile
- Touch-friendly cards, buttons, and forms
- Optimized image loading
- Floating widgets properly positioned on all screen sizes

