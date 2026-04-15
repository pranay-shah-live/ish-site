# ISH Website Revamp - PRD

## Original Problem Statement
Revamp www.indiasigninghands.com to make it sleek, Gen Z but also accessibility-focused with WCAG 2.1 compliance.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Lucide React icons
- **Backend**: FastAPI + MongoDB (contact form storage)
- **Fonts**: Oswald (headings) + Lexend (body) — hyper-legible body font
- **Design**: Accessible Neo-Brutalist — flat colors, black borders, block shadows, no gradients

## User Personas
1. **Deaf/HoH community** — Primary audience seeking accessible content
2. **Corporate clients** — Looking for ISL interpretation services
3. **Broadcasters** — Star Sports, Disney+ Hotstar seeking ISL partnerships
4. **Gen Z** — Values accessibility, inclusion, bold design

## Core Requirements
- 3 pages: Home, Our Work, Our Team
- Video hero banner with YouTube embed
- Logo wall marquee of clients
- Services grid (6 services)
- Testimonials section
- Contact CTA at bottom of EVERY page (form + email/phone)
- Accessibility widget with 8 controls
- WCAG 2.1 AA compliance
- No AI-generated images — only real ISH assets
- Bold flat colors, no gradients

## What's Been Implemented (Jan 2026)
- [x] Home page: Video hero, stats bar, logo wall, services, testimonials, contact CTA
- [x] Our Work page: Portfolio grid with filters, real ISH images
- [x] Our Team page: Group photo, team member grid
- [x] Navbar: Fixed, responsive, skip-to-content link
- [x] Contact form: Full form with backend API + MongoDB storage
- [x] Accessibility widget: Text size, spacing, reduce motion, screen reader, high contrast, underline links, enhanced focus, color blindness filters (5 modes)
- [x] SVG color blindness filters (protanopia, deuteranopia, tritanopia, monochrome)
- [x] LocalStorage persistence for accessibility settings
- [x] All data-testid attributes on interactive elements
- [x] Mobile responsive design
- [x] Testing: 100% backend, 98% frontend (19/19 features + 1 minor fix applied)

## Prioritized Backlog
### P0 (Done)
- All 3 pages built and functional
- Contact form + backend API
- Accessibility widget with 8 controls

### P1 (Next)
- SEO meta tags and Open Graph for each page
- Add ISH's actual logo image (replace text logo)
- Replace team member initials with real team photos
- Add more portfolio items / case studies

### P2 (Future)
- Blog/News section with ISH News articles
- Multilingual support (Hindi, regional languages)
- Dark mode toggle (separate from high contrast)
- Service inquiry tracking in admin dashboard
- Newsletter/subscription feature

## Next Tasks
1. Get real team photos from ISH and replace colored initials
2. Add ISH logo image to navbar
3. SEO optimization (meta tags, structured data)
4. Add more testimonials and portfolio case studies
5. Admin dashboard for contact form submissions
