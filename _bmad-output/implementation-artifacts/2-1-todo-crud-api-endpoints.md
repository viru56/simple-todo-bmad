# Story 2.1: Todo CRUD API Endpoints

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer building the frontend,
I want complete REST API endpoints for todo create, read, update, and delete,
So that the client has a reliable, validated, and consistently structured backend to integrate with.

## Acceptance Criteria

1. **Given** a `POST /todos` request with a valid `{ text: "..." }` body **When** the request is processed **Then** the todo is persisted and the response is HTTP 201 with the canonical todo object (all fields, `camelCase`, ISO 8601 dates)
2. **Given** a `GET /todos` request **When** the request is processed **Then** the response is HTTP 200 with an array of all todos (empty array when none exist)
3. **Given** a `PATCH /todos/:id` request with valid fields **When** the request is processed **Then** only the provided fields are updated and the response is HTTP 200 with the full updated todo object
4. **Given** a `DELETE /todos/:id` request for an existing todo **When** the request is processed **Then** the todo is removed and the response is HTTP 204
5. **Given** any request with invalid or missing required fields **When** the request is processed **Then** the response is HTTP 400 with a machine-readable error envelope `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }`
6. **Given** a request targeting a non-existent todo ID **When** the request is processed **Then** the response is HTTP 404 with the standardized error envelope
7. **Given** the API responds to any request **When** the response time is measured under normal single-user load **Then** it completes within 200ms at the 95th percentile (NFR1)

## Tasks / Subtasks

- [x] Implement POST /todos with validation and 201 response (AC: 1)
- [x] Implement GET /todos (AC: 2)
- [x] Implement PATCH /todos/:id (AC: 3)
- [x] Implement DELETE /todos/:id (AC: 4)
- [x] Add validation and 400 envelope (AC: 5)
- [x] Add 404 for missing todo (AC: 6)
- [x] Ensure response performance (AC: 7)

## Dev Notes

- REST-style `/todos` resource; camelCase JSON; ISO 8601 dates (architecture)
- Error envelope: `{ "error": { "code": "...", "message": "...", "details": [...] } }` for validation
- NFR1: 200ms p95 under normal load. Use Prisma + Fastify route schemas for validation
- [Source: _bmad-output/planning-artifacts/architecture.md — API Patterns]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.1]

### References

- Architecture: _bmad-output/planning-artifacts/architecture.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
