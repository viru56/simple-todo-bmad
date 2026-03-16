# Simple Todo

A focused, personal todo app. Capture tasks in under five seconds, trust they'll be there tomorrow, enrich them later if needed.

## Quick Start

**Prerequisites:** [Docker](https://www.docker.com/) installed and running.

```bash
# 1. Clone the repo
git clone <repo-url>
cd simple-todo-bmad

# 2. Set up environment
cp .env.example .env

# 3. Start everything
docker compose up
```

The app will be available at:
- **Frontend:** http://localhost:5173
- **API:** http://localhost:3001
- **Health check:** http://localhost:3001/health

## Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start PostgreSQL (or use Docker for just the DB)
docker compose up db -d

# In .env use localhost (not db) so the server can reach Postgres from your machine
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todos

# Run Prisma migrations
npx prisma migrate deploy --schema=apps/server/prisma/schema.prisma

# Start server
npx nx serve server

# Start client (in another terminal)
npx nx dev client
```

## Project Structure

```
apps/client/    - React + Vite frontend
apps/server/    - Fastify REST API
libs/shared/    - Shared types and constants
```

## Testing

- **Unit & integration:** `npm test` or `npm exec nx run-many -t test`
- **Coverage:** `npm run test:coverage`
- **E2E (Playwright):** Start the app (`npm run dev` or `docker compose up`), then `npm run e2e`

See [_bmad-output/implementation-artifacts/tests/test-summary.md](_bmad-output/implementation-artifacts/tests/test-summary.md) for details.

## Documentation

- **Project brief & BMAD:** [_bmad-output/planning-artifacts/project-brief.md](_bmad-output/planning-artifacts/project-brief.md), [docs/BMAD-IMPLEMENTATION.md](docs/BMAD-IMPLEMENTATION.md)
- **QA reports:** [docs/qa/](docs/qa/) (coverage, accessibility, security, performance)
- **AI integration log:** [docs/AI-INTEGRATION-LOG.md](docs/AI-INTEGRATION-LOG.md)

## Tech Stack

- **Frontend:** React 19, Zustand, Tailwind CSS 4, Vite
- **Backend:** Fastify 5, Prisma, PostgreSQL
- **Infrastructure:** Docker Compose, Nx monorepo
