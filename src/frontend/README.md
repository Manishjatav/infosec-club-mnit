# Infosec Club MNIT Jaipur — Frontend

A modern, production-ready cybersecurity club website built with React + TypeScript + Tailwind CSS + Framer Motion.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS (custom dark cyber theme with OKLCH color tokens)
- **Animations**: Framer Motion (Motion for React)
- **Routing**: TanStack Router v1
- **State**: TanStack React Query v5
- **UI Components**: shadcn/ui
- **Backend**: ICP Caffeine canister
- **Auth**: Internet Identity (via `@dfinity/auth-client`)

## Folder Structure

```
src/
  frontend/
    src/
      components/       # Reusable components
        Navbar.tsx       # Sticky glass navigation
        Footer.tsx       # Site footer
        CyberGrid.tsx    # Matrix rain canvas background
        EventCard.tsx    # Event card component
        BlogCard.tsx     # Blog post card
        TeamCard.tsx     # Team member card
        LoadingSpinner.tsx
        SimpleMarkdown.tsx  # Custom markdown renderer
      hooks/
        useActor.ts      # ICP actor hook (generated)
        useInternetIdentity.ts  # Auth hook (generated)
        useQueries.ts    # All React Query hooks
      layouts/
        RootLayout.tsx   # Navbar + Footer wrapper
      pages/
        HomePage.tsx     # Hero, stats, features, events
        AboutPage.tsx    # Mission, what is cybersec, achievements
        TeamPage.tsx     # Team grid from backend
        EventsPage.tsx   # Upcoming/past events with filters
        EventDetailPage.tsx  # Event details + registration form
        BlogPage.tsx     # Blog grid with search & tags
        BlogPostPage.tsx # Full blog post with markdown
        GalleryPage.tsx  # Image grid with lightbox
        ContactPage.tsx  # Contact form + social links
        AuthPage.tsx     # Internet Identity login
        AdminPage.tsx    # Admin panel (events/blog/team/gallery/messages)
      utils/
        dateUtils.ts     # Time/date helpers for bigint time values
      App.tsx
      routeTree.tsx
      index.css          # Design tokens (OKLCH), global styles
    tailwind.config.js   # Theme extensions
```

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero + stats + features + events preview |
| `/about` | About | Mission + cybersecurity topics + achievements |
| `/team` | Team | Member cards from backend |
| `/events` | Events | Upcoming/past with tab filter |
| `/events/:id` | Event Detail | Full details + registration form |
| `/blog` | Blog | Articles with search & tag filter |
| `/blog/:id` | Blog Post | Full article with markdown rendering |
| `/gallery` | Gallery | Image grid with lightbox |
| `/contact` | Contact | Form + social links |
| `/auth` | Auth | Internet Identity login |
| `/admin` | Admin | Protected management panel |

## Design System

Colors (OKLCH):
- **Background**: `#0a0a0f` — deep space black
- **Neon Green**: `oklch(0.88 0.22 155)` — primary accent
- **Electric Blue**: `oklch(0.75 0.18 214)` — secondary accent
- **Accent Purple**: `oklch(0.5 0.22 293)` — tertiary accent

Fonts:
- **Display/Body**: Bricolage Grotesque
- **Mono**: JetBrains Mono

## Backend Integration

All backend calls go through the `useActor` hook which creates an ICP actor:

```typescript
import { useActor } from "../hooks/useActor";
import { useQuery } from "@tanstack/react-query";

export function useEvents() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEvents();
    },
    enabled: !!actor && !isFetching,
  });
}
```

### Time Values

All `Time` values from the backend are `bigint` representing nanoseconds:

```typescript
// Convert bigint to milliseconds for display
const ms = Number(time) / 1_000_000;

// Create bigint timestamp for creation
const now = BigInt(Date.now()) * BigInt(1_000_000);
```

## Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Typecheck
pnpm typecheck
```

## Admin Access

1. Log in with Internet Identity at `/auth`
2. Admin role must be assigned via the backend `assignCallerUserRole` function
3. Once admin, the `/admin` route becomes accessible
4. Admin can manage events, blog posts, team members, gallery, and view messages/registrations

## Deployment

The app is deployed on the Internet Computer (ICP) via Caffeine. The Vite build outputs to `dist/` and is served via the ICP canister.

For Vercel deployment (if using as a standalone frontend):
1. Connect your Git repository to Vercel
2. Set build command: `pnpm build`
3. Set output directory: `dist`
4. Add environment variables from `env.json`
