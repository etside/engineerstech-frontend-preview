# engineersTech — Full Company Website & Admin Panel

## Project Overview
A complete company website for **engineersTech**, a Bangladesh-based software engineering firm. Currently built with React + Vite + Supabase. This document serves as a **complete blueprint to convert the project to Laravel 11 + MySQL + Blade/Inertia**.

---

## Current Stack (Lovable)
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, RLS)

## Target Stack (Laravel)
- **Backend**: Laravel 11, PHP 8.2+, MySQL 8
- **Frontend**: Blade templates + Inertia.js + Vue/React OR Blade + Livewire
- **CSS**: Tailwind CSS 3
- **Auth**: Laravel Breeze or Jetstream
- **File Uploads**: Laravel Storage (local/S3)
- **Admin Panel**: Laravel Filament (recommended) or custom

---

## Step 1: Laravel Project Setup

```bash
composer create-project laravel/laravel engineerstech
cd engineerstech
php artisan install:api  # If you need API routes
composer require laravel/breeze --dev
php artisan breeze:install blade  # or inertia
npm install && npm run build
```

### .env Configuration
```env
APP_NAME=engineersTech
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=engineerstech
DB_USERNAME=root
DB_PASSWORD=your_password
```

---

## Step 2: MySQL Database Migrations

### Create all migrations:
```bash
php artisan make:migration create_services_table
php artisan make:migration create_products_table
php artisan make:migration create_blog_posts_table
php artisan make:migration create_team_members_table
php artisan make:migration create_testimonials_table
php artisan make:migration create_client_logos_table
php artisan make:migration create_contact_submissions_table
php artisan make:migration create_site_settings_table
```

### Migration: `create_services_table`
```php
Schema::create('services', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('title');
    $table->text('description')->nullable();
    $table->string('icon')->nullable()->comment('Lucide icon name e.g. Code, Smartphone');
    $table->integer('display_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### Migration: `create_products_table`
```php
Schema::create('products', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('name');
    $table->text('description')->nullable();
    $table->string('icon')->nullable()->comment('Lucide icon name');
    $table->string('external_url')->nullable();
    $table->integer('display_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### Migration: `create_blog_posts_table`
```php
Schema::create('blog_posts', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('slug')->unique();
    $table->string('title');
    $table->text('excerpt')->nullable();
    $table->longText('content')->nullable();
    $table->string('category')->nullable();
    $table->string('cover_image')->nullable()->comment('URL or file path');
    $table->boolean('is_published')->default(false);
    $table->timestamp('published_at')->nullable();
    $table->foreignUuid('author_id')->nullable()->constrained('users')->nullOnDelete();
    $table->timestamps();
});
```

### Migration: `create_team_members_table`
```php
Schema::create('team_members', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('name');
    $table->string('designation')->nullable();
    $table->text('bio')->nullable();
    $table->string('photo_url')->nullable()->comment('URL or file path');
    $table->string('linkedin_url')->nullable();
    $table->string('whatsapp_number')->nullable();
    $table->integer('display_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### Migration: `create_testimonials_table`
```php
Schema::create('testimonials', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('name');
    $table->string('role')->nullable();
    $table->string('company')->nullable();
    $table->text('quote');
    $table->string('photo_url')->nullable()->comment('URL or file path');
    $table->integer('rating')->default(5);
    $table->integer('display_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### Migration: `create_client_logos_table`
```php
Schema::create('client_logos', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('name');
    $table->string('logo_url')->nullable()->comment('URL or file path');
    $table->string('website_url')->nullable();
    $table->integer('display_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### Migration: `create_contact_submissions_table`
```php
Schema::create('contact_submissions', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('name');
    $table->string('email');
    $table->string('phone')->nullable();
    $table->string('subject')->nullable();
    $table->text('message');
    $table->boolean('is_read')->default(false);
    $table->timestamps();
});
```

### Migration: `create_site_settings_table`
```php
Schema::create('site_settings', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->string('key')->unique();
    $table->json('value')->default('{}');
    $table->timestamps();
});
```

### User Roles (add to existing users migration or create new)
```php
// Add role enum to users table OR create separate roles table (recommended)
Schema::create('user_roles', function (Blueprint $table) {
    $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
    $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
    $table->enum('role', ['admin', 'moderator', 'user']);
    $table->timestamps();
    $table->unique(['user_id', 'role']);
});
```

Run all: `php artisan migrate`

---

## Step 3: Eloquent Models

Create models:
```bash
php artisan make:model Service
php artisan make:model Product
php artisan make:model BlogPost
php artisan make:model TeamMember
php artisan make:model Testimonial
php artisan make:model ClientLogo
php artisan make:model ContactSubmission
php artisan make:model SiteSetting
php artisan make:model UserRole
```

### Example Model: `app/Models/Service.php`
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'description', 'icon', 'display_order', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];

    public function scopeActive($query) {
        return $query->where('is_active', true)->orderBy('display_order');
    }
}
```

### Example Model: `app/Models/BlogPost.php`
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasUuids;

    protected $fillable = [
        'slug', 'title', 'excerpt', 'content', 'category',
        'cover_image', 'is_published', 'published_at', 'author_id'
    ];
    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function scopePublished($query) {
        return $query->where('is_published', true)->orderByDesc('published_at');
    }
}
```

### User Model (add role relationship)
```php
// In app/Models/User.php, add:
public function roles() {
    return $this->hasMany(UserRole::class);
}

public function hasRole(string $role): bool {
    return $this->roles()->where('role', $role)->exists();
}

public function isAdmin(): bool {
    return $this->hasRole('admin');
}
```

**Repeat similar pattern for all models.** All models use `HasUuids` trait and have `$fillable` arrays.

---

## Step 4: Controllers

```bash
# Public controllers
php artisan make:controller HomeController
php artisan make:controller ServiceController
php artisan make:controller ProductController
php artisan make:controller BlogController
php artisan make:controller AboutController
php artisan make:controller ContactController

# Admin controllers
php artisan make:controller Admin/DashboardController
php artisan make:controller Admin/ServiceController --resource
php artisan make:controller Admin/ProductController --resource
php artisan make:controller Admin/BlogPostController --resource
php artisan make:controller Admin/TeamMemberController --resource
php artisan make:controller Admin/TestimonialController --resource
php artisan make:controller Admin/ClientLogoController --resource
php artisan make:controller Admin/SubmissionController
php artisan make:controller Admin/SettingController
```

### Example: `app/Http/Controllers/HomeController.php`
```php
<?php
namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ClientLogo;
use App\Models\Testimonial;

class HomeController extends Controller
{
    public function index()
    {
        return view('home', [
            'services' => Service::active()->take(4)->get(),
            'logos' => ClientLogo::where('is_active', true)->orderBy('display_order')->get(),
            'testimonials' => Testimonial::where('is_active', true)->orderBy('display_order')->get(),
        ]);
    }
}
```

### Example: `app/Http/Controllers/ContactController.php`
```php
<?php
namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function show()
    {
        return view('contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactSubmission::create($validated);

        return back()->with('success', 'Message sent successfully!');
    }
}
```

### Example: `app/Http/Controllers/Admin/ServiceController.php`
```php
<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index() {
        return view('admin.services.index', [
            'services' => Service::orderBy('display_order')->get()
        ]);
    }

    public function create() {
        return view('admin.services.create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ]);
        Service::create($validated);
        return redirect()->route('admin.services.index')->with('success', 'Service created');
    }

    public function edit(Service $service) {
        return view('admin.services.edit', compact('service'));
    }

    public function update(Request $request, Service $service) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ]);
        $service->update($validated);
        return redirect()->route('admin.services.index')->with('success', 'Service updated');
    }

    public function destroy(Service $service) {
        $service->delete();
        return redirect()->route('admin.services.index')->with('success', 'Service deleted');
    }
}
```

**Repeat same CRUD pattern for Products, BlogPosts, TeamMembers, Testimonials, ClientLogos.**

---

## Step 5: Routes

### `routes/web.php`
```php
<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Auth routes (provided by Breeze)
require __DIR__.'/auth.php';

// Admin routes — protected by auth + admin middleware
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('services', Admin\ServiceController::class);
    Route::resource('products', Admin\ProductController::class);
    Route::resource('blog', Admin\BlogPostController::class);
    Route::resource('team', Admin\TeamMemberController::class);
    Route::resource('testimonials', Admin\TestimonialController::class);
    Route::resource('logos', Admin\ClientLogoController::class);
    Route::get('submissions', [Admin\SubmissionController::class, 'index'])->name('submissions.index');
    Route::patch('submissions/{submission}', [Admin\SubmissionController::class, 'markRead'])->name('submissions.markRead');
    Route::get('settings', [Admin\SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [Admin\SettingController::class, 'update'])->name('settings.update');
});
```

---

## Step 6: Admin Middleware

### Create: `app/Http/Middleware/AdminMiddleware.php`
```php
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            abort(403, 'Access Denied');
        }
        return $next($request);
    }
}
```

### Register in `bootstrap/app.php` (Laravel 11):
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'admin' => \App\Http\Middleware\AdminMiddleware::class,
    ]);
})
```

---

## Step 7: Blade Views Structure

```
resources/views/
├── layouts/
│   ├── app.blade.php          (public layout: navbar + footer)
│   └── admin.blade.php        (admin layout: sidebar + header)
├── components/
│   ├── navbar.blade.php
│   ├── footer.blade.php
│   └── floating-widgets.blade.php
├── home.blade.php             (hero, services overview, logos, stats, testimonials, CTA)
├── services.blade.php
├── products.blade.php
├── about.blade.php
├── contact.blade.php
├── blog/
│   ├── index.blade.php
│   └── show.blade.php
├── admin/
│   ├── dashboard.blade.php
│   ├── services/
│   │   ├── index.blade.php
│   │   ├── create.blade.php
│   │   └── edit.blade.php
│   ├── products/         (same CRUD pattern)
│   ├── blog/             (same CRUD pattern)
│   ├── team/             (same CRUD pattern)
│   ├── testimonials/     (same CRUD pattern)
│   ├── logos/            (same CRUD pattern)
│   ├── submissions/
│   │   └── index.blade.php
│   └── settings/
│       └── index.blade.php
└── auth/                 (provided by Breeze)
    ├── login.blade.php
    └── register.blade.php
```

---

## Step 8: ⚠️ Image Handling — IMPORTANT

The current React app uses **URL text inputs** for all image fields. In Laravel, you should convert these to **file uploads** using Laravel Storage:

```php
// In controller store/update methods:
if ($request->hasFile('photo')) {
    $path = $request->file('photo')->store('team-members', 'public');
    $validated['photo_url'] = '/storage/' . $path;
}

// In blade forms:
<input type="file" name="photo" accept="image/*">

// Don't forget:
php artisan storage:link
```

### Image fields to convert from URL input → file upload:
| Table | Column | Upload Folder |
|-------|--------|---------------|
| `team_members` | `photo_url` | `team-members/` |
| `testimonials` | `photo_url` | `testimonials/` |
| `client_logos` | `logo_url` | `client-logos/` |
| `blog_posts` | `cover_image` | `blog-covers/` |

---

## Step 9: Seeder Data

```bash
php artisan make:seeder ServiceSeeder
php artisan make:seeder ProductSeeder
php artisan make:seeder TeamMemberSeeder
php artisan make:seeder TestimonialSeeder
php artisan make:seeder BlogPostSeeder
php artisan make:seeder AdminUserSeeder
```

### Example: `AdminUserSeeder.php`
```php
public function run()
{
    $user = \App\Models\User::create([
        'name' => 'Admin',
        'email' => 'admin@engineerstechbd.com',
        'password' => bcrypt('your-secure-password'),
    ]);

    \App\Models\UserRole::create([
        'user_id' => $user->id,
        'role' => 'admin',
    ]);
}
```

### Seed data (from current DB):
- **4 Services**: Enterprise & SaaS, Web & Mobile, UI/UX & Motion, Consultation
- **7 Products**: GlowUp, Restaurant POS, Tour Booking, HRM, Hotel Booking, CRM, Staff Tracking
- **3 Team Members**: Nazmul Alom Sakib (CEO), Al Shahriar (COO), Sheikh Md. Junaeid (CMO)
- **3 Testimonials**: Jeremy Nathan, Freda Lin, Mynul Hasan
- **6 Blog Posts**: All published
- **6 Client Logos**: Need actual logo image files

---

## Step 10: Optional — Use Laravel Filament for Admin

Instead of building admin CRUD views manually, use [Filament](https://filamentphp.com/):

```bash
composer require filament/filament
php artisan filament:install --panels
php artisan make:filament-resource Service
php artisan make:filament-resource Product
php artisan make:filament-resource BlogPost
php artisan make:filament-resource TeamMember
php artisan make:filament-resource Testimonial
php artisan make:filament-resource ClientLogo
php artisan make:filament-resource ContactSubmission
```

Filament auto-generates full CRUD admin panels with tables, forms, filters, and file uploads — saving significant development time.

---

## Design System (Tailwind CSS)

### Colors (copy to `tailwind.config.js`)
```js
colors: {
  primary: { DEFAULT: '#0052CC', light: '#2684FF' },
  background: '#0A0E1A',
  foreground: '#F8FAFC',
  muted: '#1E293B',
  accent: '#2684FF',
  card: '#111827',
}
```

### Font
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
```

### Key CSS Classes to Recreate
- `.glass-card` — glassmorphism card with backdrop-blur
- `.gradient-bg` — blue gradient background (#0052CC → #2684FF)
- `.gradient-text` — gradient text effect

---

## Company Info
- **Email**: info@engineerstechbd.com
- **Phone**: +880-18737-22228, 01689877007
- **Address**: Dhaka, Bangladesh
- **Registration**: TRAD/DNCC/025495/2025
- **e-CAB Member**: https://e-cab.net/

---

## Summary Checklist

- [ ] `composer create-project laravel/laravel`
- [ ] Configure `.env` with MySQL
- [ ] Run all migrations
- [ ] Create all Eloquent models with `HasUuids`
- [ ] Set up Breeze auth
- [ ] Create admin middleware
- [ ] Define all routes (public + admin)
- [ ] Build public Blade views (copy design from React components)
- [ ] Build admin CRUD views (or use Filament)
- [ ] Convert image URL fields to file uploads with Laravel Storage
- [ ] Run seeders
- [ ] Create admin user
- [ ] `php artisan storage:link`
- [ ] Deploy to server (Laravel Forge, shared hosting, VPS)
