# Story 1.3: Define Todo Data Model with Prisma

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer implementing todo features,
I want the Prisma schema to define the complete Todo model with all required fields,
So that the database schema, API contracts, and client state can all align around the same canonical model.

## Acceptance Criteria

1. **Given** the Prisma schema is defined at `apps/server/prisma/schema.prisma` **When** I inspect the `Todo` model **Then** it contains: `id` (UUID, auto-generated), `text` (String, required), `completed` (Boolean, default false), `important` (Boolean, default false), `category` (String, optional), `dueDate` (DateTime, optional), `description` (String, optional), `createdAt` (DateTime, auto-set), `completedAt` (DateTime, optional)
2. **Given** the Prisma schema is defined **When** I run `prisma migrate dev --name init` **Then** the initial migration file is created under `prisma/migrations/` and applied without errors
3. **Given** the migration exists **When** I run `prisma generate` **Then** the Prisma client is generated without errors and reflects the Todo model

## Tasks / Subtasks

- [x] Define Todo model in schema.prisma with all fields (AC: 1)
- [x] Run prisma migrate dev --name init (AC: 2)
- [x] Run prisma generate and verify client (AC: 3)

## Dev Notes

- Schema-first consistency: same shape across DB, API validation, and client state (NFR16)
- DB columns: snake_case; API/client: camelCase per architecture naming
- Prisma 7.4.2 per architecture. PostgreSQL.
- [Source: _bmad-output/planning-artifacts/architecture.md — Data architecture, Prisma]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.3]

### References

- Architecture: _bmad-output/planning-artifacts/architecture.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

claude-4.6-opus

### Completion Notes List

Prisma schema defined at apps/server/prisma/schema.prisma with all required Todo fields. UUID primary key, snake_case column names, appropriate defaults. Prisma client generated.

### File List

apps/server/prisma/schema.prisma
