# EngineersTech Website

Frontend for [engineerstechbd.com](https://engineerstechbd.com) — a modern, responsive company website built with React and TypeScript.

## Tech Stack

- **React** + **TypeScript**
- **Vite** — fast dev server & build
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — accessible component library
- **Framer Motion** — animations
- **React Router** — client-side routing
- **TanStack Query** — data fetching

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/          # Images, logos, icons
├── components/      # Reusable UI components
│   ├── admin/       # Admin panel components
│   ├── home/        # Homepage sections
│   └── ui/          # shadcn/ui components
├── data/            # Static data (blog posts, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utilities & API helpers
├── pages/           # Route pages
│   └── admin/       # Admin dashboard pages
└── test/            # Test setup
```

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL="/api"
VITE_STORAGE_URL="/storage"
VITE_API_TARGET="http://127.0.0.1:8000"
```

For production deployments, set `VITE_API_URL` and `VITE_STORAGE_URL` to your public CDN or reverse-proxy paths, and set `VITE_API_TARGET` only for local Vite dev proxying.

## Backend

The backend is a Laravel API located at `../eT-website-backend/`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
