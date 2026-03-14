# Story 1.2: Configure Fastify Server Foundation with Health Endpoint

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer running the backend server,
I want Fastify configured with security plugins, structured logging, environment config, and a health endpoint,
So that the server is secure, observable, and ready for route development.

## Acceptance Criteria

1. **Given** the server is started with valid environment configuration **When** a `GET` request is made to `/health` **Then** the response is HTTP 200 with `{ "status": "ok" }`
2. **Given** the server returns a non-2xx response for any reason **When** the response body is inspected **Then** it follows the standardized error envelope: `{ "error": { "code": "...", "message": "..." } }` **And** no internal stack trace is present in the response body
3. **Given** a request is made to the server from an allowed frontend origin **When** the CORS headers are inspected **Then** only the configured local frontend origin is permitted
4. **Given** any response from the server **When** the response headers are inspected **Then** Helmet security headers are present
5. **Given** the server is configured with environment variables **When** I inspect `apps/server/src/config/env.ts` **Then** all required environment variables are declared and validated — none are hardcoded in source
6. **Given** the server is running in production mode (`NODE_ENV=production`) **When** a todo is created, updated, or retrieved **Then** the todo's `text` and `description` field values are not present in any log output at debug or info level (NFR9)

## Tasks / Subtasks

- [x] Add Fastify server app and configure /health (AC: 1)
- [x] Implement standardized error envelope and no stack traces in body (AC: 2)
- [x] Configure CORS for local frontend origin only (AC: 3)
- [x] Add Helmet and security middleware (AC: 4)
- [x] Create env.ts with validation (AC: 5)
- [x] Ensure no todo content in logs in production (AC: 6)

## Dev Notes

- Fastify 5.8.2 per architecture. Error envelope: `{ "error": { "code": "...", "message": "..." } }`
- CORS restrictive to local frontend origins; Helmet for security headers
- Environment config in `apps/server/src/config/env.ts` — no hardcoded credentials (NFR10)
- [Source: _bmad-output/planning-artifacts/architecture.md — API, Security]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.2]

### References

- Architecture: _bmad-output/planning-artifacts/architecture.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

claude-4.6-opus

### Completion Notes List

Fastify server configured with /health endpoint, CORS (restricted to frontend origin), Helmet security headers, rate limiting, structured logging, env validation in config/env.ts, standardized error envelope, no stack traces in prod responses.

### File List

apps/server/src/main.ts, apps/server/src/app/buildServer.ts, apps/server/src/config/env.ts, apps/server/src/config/constants.ts, apps/server/src/lib/logger.ts, apps/server/src/lib/prisma.ts, apps/server/src/plugins/cors.ts, apps/server/src/plugins/helmet.ts, apps/server/src/plugins/rateLimit.ts, apps/server/src/errors/appError.ts, apps/server/src/errors/errorCodes.ts, apps/server/src/errors/toErrorResponse.ts, apps/server/src/routes/health/health.route.ts, apps/server/src/routes/health/health.schema.ts
