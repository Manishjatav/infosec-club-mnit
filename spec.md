# Infosec Club MNIT

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full-stack website for Infosec Club of MNIT Jaipur
- Dark cyber theme with neon green/blue glow effects and glassmorphism UI
- Fully responsive (mobile-first), smooth Framer Motion animations

**Pages:**
1. **Home** — Hero with club intro, animated cyber background, CTA buttons (Join Us, Explore Events), featured events preview
2. **About** — Club mission, what is cybersecurity, achievements
3. **Team** — Member cards (image, name, role, LinkedIn/GitHub), dynamic data
4. **Events** — Upcoming events list, past events archive, event detail pages
5. **Event Registration** — Form (name, email, branch, year), store in backend, success toast
6. **Blog** — Cybersecurity articles, admin can add posts, markdown support
7. **Gallery** — Image grid with modal preview, data from blob storage
8. **Contact** — Contact form (stored in backend), social links
9. **Authentication** — Login/Signup (email), role-based access (admin/user)
10. **Admin Panel** — Add/edit/delete events, manage blogs, upload gallery images, view registrations

**Features:**
- Smooth scrolling, loading animations
- Toast notifications
- Error handling
- SEO basics (page titles, meta descriptions)
- Role-based access control (admin vs user)

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- Actor with stable storage for: events, blog posts, team members, gallery items, contact messages, event registrations
- CRUD operations for all data types
- Role-based authorization (admin principal can manage content)
- Blob storage integration for gallery image uploads

### Frontend (React + Tailwind + Framer Motion)
- Dark cyber color palette: deep black/navy background, neon green (#00ff88) and electric blue (#00d4ff) accents
- Glassmorphism cards with backdrop blur
- Animated gradient backgrounds and grid patterns on hero
- React Router for all pages
- Framer Motion page transitions and scroll animations
- shadcn/ui for forms and toasts
- Authorization component wired for login/signup and role checks
- Blob-storage component wired for gallery image uploads
- Admin panel restricted to admin role
- Event registration form with backend submission
- Blog with markdown rendering
- Gallery grid with lightbox modal
- Contact form with backend submission
- SEO via document title + meta tags per page
