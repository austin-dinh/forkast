# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server at localhost:3000
npm run build     # production build
npm run lint      # ESLint

# Prisma
npx prisma migrate dev        # create and apply a new migration
npx prisma migrate deploy     # apply existing migrations (CI/prod)
npx prisma generate           # regenerate the Prisma client after schema changes
npx prisma studio             # open database GUI

# Seed test data (tables 1–10)
npx ts-node prisma/seed.ts
```

## Architecture

This is a **restaurant reservation dashboard** built with Next.js 16 (App Router), Prisma 7 (SQLite), Better Auth, Tailwind CSS v4, and DaisyUI v5.

### Key conventions

- **Next.js version**: 16.x — APIs differ from earlier versions. Always read `node_modules/next/dist/docs/` before writing Next.js-specific code.
- **Prisma client location**: generated to `app/generated/prisma` (non-standard). Import from `@prisma/client` as usual; the generated output path is set in `schema.prisma`.
- **DB singleton**: `lib/db.ts` exports a single `PrismaClient` instance cached on `globalThis` to survive hot-reloads in dev. Always import `prisma` from there, never instantiate a new client elsewhere.
- **Tailwind v4**: configuration lives in `tailwind.config.ts` and PostCSS in `postcss.config.mjs`. v4 has a different config API from v3.

### Data model

| Model | Purpose |
|---|---|
| `User` | Staff accounts; Better Auth extends this with `sessions` and `accounts` relations |
| `Session` / `Account` | Managed entirely by Better Auth — don't modify directly |
| `Table` | Physical restaurant tables with a unique `number` and `capacity` |
| `Reservation` | Guest bookings linked to one `Table`; `status` is one of `pending`, `confirmed`, `cancelled`, `seated`, `completed` |

### Environment variables

Required in `.env`:
- `DATABASE_URL` — SQLite file path (e.g. `file:./dev.db`)
- `BETTER_AUTH_SECRET` — session signing secret (`openssl rand -hex 32`)
- `BETTER_AUTH_URL` — base URL (e.g. `http://localhost:3000`)
