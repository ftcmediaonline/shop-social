# AGENTS.md

## Cursor Cloud specific instructions

This is a React SPA (Vite + TypeScript + Tailwind CSS + shadcn/ui) with a hosted Supabase backend. There is no local backend server to run.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 8080) |
| Lint | `npm run lint` |
| Test | `npm run test` |
| Build | `npm run build` |

### Notes

- The Vite dev server listens on port **8080** (configured in `vite.config.ts`).
- Lint has pre-existing warnings and errors in the repo (7 errors, 14 warnings) — these are upstream and not caused by agent changes.
- All data comes from a hosted Supabase instance; credentials are in `.env`. Auth, cart, orders, reviews, and shop management features require a valid Supabase connection and user authentication.
- Supabase edge functions (e.g. `send-shop-confirmation`) are optional and require separate deployment plus a `RESEND_API_KEY` secret.
