# How BMAD Guided Implementation

**Project:** simple-todo-bmad  
**Framework:** BMAD (Brainstorming → PRD → Architecture → UX → Epics & Stories → Implementation).

---

## Flow

1. **Brainstorming** produced tech and UX directions (e.g. React, Fastify, “It Just Works”).
2. **PRD** (Product Requirements Document) captured 40 FRs and 17 NFRs with clear success criteria and out-of-scope.
3. **Architecture** defined stack (Nx, React, Vite, Fastify, Prisma, PostgreSQL, Zustand, Tailwind), API contract (REST, camelCase, error envelope), data model, security (Helmet, CORS, rate limit), and Docker.
4. **UX design** specified two-stage capture/enrich, views (All, Important, Expiring, Completed), and component patterns (edit drawer, optimistic UI).
5. **Epics & stories** broke work into three epics (Epic 1: Setup; Epic 2: Core todo UX; Epic 3: Enrichment) with Given/When/Then acceptance criteria.
6. **Implementation readiness** validated FR coverage and story quality; no blocking gaps.
7. **Implementation** followed story order: project setup → server foundation → data model → Docker → API → client foundation → capture → list → actions → views → edit drawer → enrichment → a11y.

---

## Traceability

- **Requirements → Stories:** Every FR maps to at least one story (see implementation-readiness-report and epics.md).
- **Stories → Code:** Each implementation artifact (e.g. `1-2-configure-fastify-server-foundation-with-health-endpoint.md`, `2-1-todo-crud-api-endpoints.md`) links to architecture and AC; code (routes, components, tests) implements those AC.
- **Tests:** Unit and integration tests derived from AC; E2E tests from user journeys (create, complete, delete, empty state, error handling).

---

## Decisions Locked by BMAD

- **Schema-first:** Same Todo shape in Prisma, API schemas, and client store.  
- **Error contract:** `{ error: { code, message } }`; no stack in production.  
- **Single-command run:** Docker Compose with wait-for-postgres and migrate on startup.  
- **No auth in v1:** Architecture preserves path to add `user_id` and auth later.  
- **Test strategy:** Vitest for unit/integration; Playwright for E2E; coverage and QA reports as deliverables.

---

## Artifacts

| Artifact | Location |
|----------|----------|
| Project brief | `_bmad-output/planning-artifacts/project-brief.md` |
| PRD | `_bmad-output/planning-artifacts/prd.md` |
| Architecture | `_bmad-output/planning-artifacts/architecture.md` |
| UX design | `_bmad-output/planning-artifacts/ux-design-specification.md` |
| Epics & stories | `_bmad-output/planning-artifacts/epics.md` |
| Story files | `_bmad-output/implementation-artifacts/*.md` |
| Implementation readiness | `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-14.md` |
| Test summary | `_bmad-output/implementation-artifacts/tests/test-summary.md` |
| QA reports | `docs/qa/` (coverage, accessibility, security, performance) |

---

## Summary

BMAD provided a single chain from vision → requirements → architecture → UX → stories → code and tests. Implementation stayed aligned with the PRD and architecture by following the story AC and reusing the same error and data contracts across server and client.
