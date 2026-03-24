# Copilot Instructions — lily-combest-website

## Big picture architecture
- This is a single Next.js 14 App Router app (no monorepo inside this folder): public pages in `app/*`, admin UI in `app/admin/*`, API routes in `app/api/*`.
- Data boundary is Supabase via service-role client `lib/supabaseAdmin.ts`; most reads/writes happen in route handlers (example: `app/api/contact/route.ts`, `app/api/admin/blog/save/route.ts`).
- AI features are server API routes that call Gemini directly via REST (`generativelanguage.googleapis.com`) and return parsed JSON (examples in `app/api/admin/ai/*/route.ts`).
- Email flows use Resend in API routes (`app/api/contact/route.ts`, `app/api/admin/meal-plans/send/route.ts`).

## Runtime/data flows to preserve
- Public blog UI is client-rendered and fetches `/api/blog` + `/api/blog/[slug]` (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`).
- Admin dashboard is mostly client pages calling admin APIs; one exception is server-side Supabase query in `app/admin/blog/page.tsx`.
- Contact form flow: `app/contact/page.tsx` -> `/api/contact` -> write `contacts` row -> send notification + confirmation emails.
- Meal-plan flow: `app/admin/ai/meal-plans/page.tsx` -> `/api/admin/ai/meal-plans` (Gemini) -> optional `/api/admin/meal-plans/save` (DB) and `/api/admin/meal-plans/send` (email).

## Auth and security conventions (project-specific)
- Admin auth is a simple cookie check, not Supabase Auth: `/api/admin/auth/login` sets `admin_auth`; `/api/admin/auth/check` trusts cookie presence.
- There is no middleware gate in this project; admin pages enforce auth in client layout (`app/admin/layout.tsx`) by calling `/api/admin/auth/check`.
- Keep auth route paths aligned when editing: current redirects target `/admin/login`, while login UI currently lives at `/login`.

## Developer workflows
- Use npm scripts from this folder only: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
- There is no automated test script here; validate changes with lint + manual route checks.
- Netlify deploy config is in `netlify.toml` (Node 20 + `@netlify/plugin-nextjs`).

## Environment dependencies
- Required for boot/runtime: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (missing values throw during import in `lib/supabaseAdmin.ts`).
- Required for AI routes: `GEMINI_API_KEY`.
- Required for email routes: `RESEND_API_KEY`.
- Optional UX integration: `NEXT_PUBLIC_CALENDLY_URL` (controls Booking modal fallback behavior in `app/components/Booking.tsx`).

## Code patterns to follow
- Use `@/*` import alias from `tsconfig.json`.
- Route handlers generally return `NextResponse.json(...)` and use defensive try/catch with explicit error payloads.
- AI routes expect JSON-only model output and strip markdown fences before `JSON.parse`; keep this parsing hardening when modifying prompts.
- Localization uses key-path lookups via `useLocale().t('section.key')`; update both `locales/en.json` and `locales/es.json` when adding user-facing strings.
- Styling relies on Tailwind plus CSS variables in `app/globals.css` (`rgb(var(--color-primary))` style pattern).

## Important gotcha
- `app/sitemap.ts` currently reads markdown posts via `lib/blog.ts` (`content/blog/*.md`), while live blog pages read from Supabase APIs. If changing blog source-of-truth, update both paths or intentionally deprecate one.
