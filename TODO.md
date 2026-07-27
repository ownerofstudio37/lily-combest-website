# Lilly Combest Website TODO

Last updated: 2026-07-27

## Completed In This Audit Pass

- [x] Confirmed active project is `lily-combest-website`; do not modify sibling `websitefors37`.
- [x] Added an authenticated admin SEO audit tool at `/admin/seo`.
- [x] Added `/api/admin/seo/audit` for route, blog, robots, schema, and local SEO checks.
- [x] Added SEO Audit links to the admin sidebar and dashboard.
- [x] Hardened admin session cookies so the cookie stores an HMAC signature instead of the raw admin secret.
- [x] Changed production admin login behavior so a missing `ADMIN_PASSWORD` fails closed instead of falling back to `admin123`.
- [x] Started a small UI facelift by aligning admin chrome with the Lilly wellness palette and replacing viewport-scaled hero typography.
- [x] Confirmed production environment variables are set in Netlify: `ADMIN_PASSWORD`, `GEMINI_API_KEY`, `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `RESEND_API_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
- [x] Made admin navigation responsive with a mobile horizontal tool rail and desktop sidebar.
- [x] Added shared `btn-primary`, `btn-secondary`, and `btn-quiet` UI classes.
- [x] Improved blog index layout with category chips, featured post treatment, and stronger empty/error states.
- [x] Added clearer post-submit next-step messaging on the contact form.
- [x] Replaced hard-coded placeholder analytics/settings values with honest setup and status panels.
- [x] Refreshed service detail pages with a shared polished homepage-style template.
- [x] Reduced service detail wave divider noise by replacing repeated dividers with clean visual bands.
- [x] Improved English/Español toggle clarity, persistence, accessibility state, and document language updates.
- [x] Replaced the one-on-one wellness coaching service card stock image with a cleaner coaching-session image.
- [x] Polished About, Contact, Blog article, Privacy, Private Card, and Services hub pages toward the homepage/service-detail visual system.
- [x] Restored homepage-style wave transitions on service detail pages and upgraded the Services hub hero to match the homepage polish.
- [x] Added wave continuity across About, Blog index, Blog article templates, Contact, and Privacy pages.
- [x] Added local SEO content, wellness scope language, service FAQs/schema, expanded starter blog content, service sitemap coverage, and robots.txt crawl fix.
- [x] Added launch fundamentals: `.env.example`, smoke script, contact/admin-login rate limiting, duplicate blog slug handling, server-rendered blog pages, BlogPosting schema, basic blog HTML sanitization, and admin blog editor/preview workflow.
- [x] Generated `package-lock.json` and ran `npm audit`; current high-severity findings are in `next`, bundled `postcss`, and `resend`'s email-rendering dependency chain.

## Critical / High Priority

- [x] Add real production `ADMIN_PASSWORD` in Netlify.
- [x] Add `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `GEMINI_API_KEY`, and `NEXT_PUBLIC_CALENDLY_URL` in production.
- [ ] Add optional `ADMIN_SESSION_SECRET` in Netlify so session signing can rotate independently from the login password.
- [ ] Verify every production admin/API route with the configured Netlify environment variables.
- [ ] Move the project folder or build through a path without an apostrophe; local `next build` fails under `Momma's New Website` because Next's generated metadata loader does not escape that path.
- [ ] Initialize ESLint non-interactively and add a clean `npm run lint` baseline.
- [x] Decide whether public blog source of truth is Supabase or markdown; public pages, APIs, and sitemap now use Supabase with markdown fallback.
- [x] Convert `/blog/[slug]` from a client-only page to a server-rendered page with `generateMetadata` for per-post title, description, canonical, Open Graph, and Article schema.
- [x] Sanitize or strictly validate generated/stored blog HTML before rendering with `dangerouslySetInnerHTML`.
- [x] Add rate limiting and basic spam protection to `/api/contact` and admin login.
- [x] Remove or hide `/api/test-gemini` from production, or require admin authentication.

## SEO / Blog Tooling

- [x] Add a real blog editor for title, slug, excerpt, content, featured image, publish state, keywords, and meta description.
- [x] Add an SEO score/checklist to the blog editor before saving: title length, slug quality, excerpt/meta length, H2 usage, internal links, local relevance, CTA, and image presence.
- [x] Add duplicate slug handling in `/api/admin/blog/save`.
- [x] Add post preview before publish and draft edit/update flows from `/admin/blog`.
- [x] Add BlogPosting structured data for each article.
- [ ] Add FAQ schema where blog posts answer common wellness questions.
- [ ] Add an internal-link suggestion tool for service pages, blog posts, and contact CTAs.
- [ ] Add an image picker/uploader workflow for featured blog images.
- [x] Add Search Console launch checklist into `/admin/seo`: verify property, submit sitemap, inspect homepage, inspect top service pages, inspect newest posts.
- [ ] Track blog post freshness and flag posts older than 6-12 months for review.

## SEO Content / Local SEO

- [ ] Add Lilly's real credentials, certifications, professional background, and scope-of-practice language to `/about`.
- [x] Add a wellness disclaimer clarifying coaching is not emergency, diagnostic, or medical treatment.
- [x] Add phone number or remove empty telephone schema until the phone number is public.
- [ ] Add sameAs links to verified social profiles and Google Business Profile once available.
- [x] Expand local content for Pinehurst, The Woodlands, Magnolia, Tomball, Spring, Conroe, and North Houston.
- [ ] Create dedicated local landing pages only where there is useful, unique local content.
- [x] Expand thin starter blog posts with specific examples, Lilly's perspective, FAQs, and consult CTAs.
- [x] Add service-specific FAQs to every service detail page.
- [ ] Add stronger homepage proof: credentials, testimonials, client-fit criteria, and a short process section above the long visual gallery.
- [ ] Submit `https://lillycombest.com/sitemap.xml` in Google Search Console after launch.

## UX / UI Facelift

- [x] Make admin navigation responsive; current sidebar is desktop-first and can crowd smaller screens.
- [x] Refresh public service detail pages so they match the homepage's richer section rhythm instead of feeling like framed article cards.
- [x] Reduce repeated wave dividers where they create visual noise on long pages.
- [x] Add consistent button styles in `globals.css` for primary, secondary, and quiet actions.
- [x] Add visible focus states for all nav links, buttons, forms, and admin actions.
- [ ] Add mobile QA for hero text wrapping, three-stat row, nav menu, contact form, and blog cards.
- [x] Improve blog index layout with category filters, featured post treatment, and stronger empty/error states.
- [ ] Replace stock-like imagery over time with real Lilly photos and branded wellness assets.
- [x] Add clearer "what happens next" messaging after contact form submission.
- [x] Remove hard-coded placeholder analytics/settings values or replace them with environment/status checks.

## Technical / Launch

- [x] Add `.env.example` with all required variables and safe placeholders.
- [x] Configure `next-env.d.ts` and required Next TypeScript settings intentionally rather than through the interactive lint prompt.
- [x] Add a basic smoke script for homepage, services, blog, contact, login, admin auth check, and SEO audit API.
- [x] Add sitemap coverage for all service pages.
- [x] Add sitemap coverage for future Supabase-published blog posts.
- [x] Remove `Disallow: /_next/` from `robots.txt` so crawlers can fetch rendering assets.
- [x] Run `npm audit` and plan dependency upgrades for the current high-severity findings.
- [ ] Upgrade Next.js/PostCSS after compatibility testing; `npm audit fix --force` wants a breaking Next major upgrade.
- [ ] Upgrade Resend after checking the current API surface; `npm audit fix --force` wants a breaking Resend major upgrade.
- [ ] Verify Netlify build with production env vars.
- [ ] Test contact email delivery in Resend logs after domain verification.
- [ ] Verify Core Web Vitals after the final image/content pass.
