# Story 1.4: Docker Compose Local Development Environment

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer or evaluator cloning the repository,
I want to start the complete application stack with a single command,
So that I have a fully operational app with database, server, and client running locally within 2 minutes — no manual environment setup required.

## Acceptance Criteria

1. **Given** Docker is installed and `.env.example` has been copied to `.env` **When** I run `docker compose up` **Then** all three services (PostgreSQL, server, client) start and reach a healthy state
2. **Given** the stack is starting **When** the server container initializes **Then** `wait-for-postgres.sh` prevents the server from starting until PostgreSQL accepts connections
3. **Given** the server container starts after PostgreSQL is ready **When** the server boots **Then** `prisma migrate deploy` runs automatically and applies all pending migrations before Fastify starts
4. **Given** the stack is running **When** I make a `GET` request to `http://localhost:3001/health` **Then** I receive HTTP 200 `{ "status": "ok" }`
5. **Given** I inspect `.env.example` **When** I review its contents **Then** `DATABASE_URL` points to the Docker PostgreSQL service by hostname with working default credentials, and all required env vars have pre-filled working defaults
6. **Given** I inspect the project `README.md` **When** I read the setup instructions **Then** it contains the exact single command (`docker compose up`) to start the stack, the prerequisite (Docker), and how to verify the app is running

## Tasks / Subtasks

- [x] Add docker-compose.yml with PostgreSQL, server, client (AC: 1)
- [x] Add wait-for-postgres.sh and wire server to wait for DB (AC: 2)
- [x] Run prisma migrate deploy on server startup (AC: 3)
- [x] Verify /health returns 200 (AC: 4)
- [x] Create .env.example with DATABASE_URL and defaults (AC: 5)
- [x] Update README with single command and verification (AC: 6)

## Dev Notes

- One-command startup: `docker compose up`. FR36, FR37, FR38, FR39, FR40.
- Server must wait for PostgreSQL before starting (wait-for-postgres or equivalent)
- Migrations applied on startup; idempotent (NFR7). NFR8: stack recovers after `docker compose restart`
- [Source: _bmad-output/planning-artifacts/architecture.md — Runtime model, Docker]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.4]

### References

- Architecture: _bmad-output/planning-artifacts/architecture.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

claude-4.6-opus

### Completion Notes List

Docker Compose with PostgreSQL, server, and client services. wait-for-postgres.sh script, auto-migration on startup, .env.example with working defaults, README with setup instructions.

### File List

docker-compose.yml, Dockerfile.server, Dockerfile.client, nginx.conf, scripts/wait-for-postgres.sh, .env.example, README.md
