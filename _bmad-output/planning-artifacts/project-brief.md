# Project Brief: simple-todo-bmad

**Version:** 1.0  
**Date:** 2026-03-16  
**Source:** Refined from [PRD](prd.md), [Architecture](architecture.md), and [Implementation Readiness Report](implementation-readiness-report-2026-03-14.md).

---

## Vision

A focused, personal todo app for individual users. **Product contract:** capture a task in under five seconds, trust it will be there tomorrow, enrich it later if needed ("It Just Works").

## Scope (MVP)

- **Create:** Single text input, Enter to submit; no extra fields at creation.
- **Enrich (opt-in):** Category, due date, importance flag, description — all at edit time.
- **Views:** All (active), Important, Expiring, Completed — filtered automatically.
- **Quality:** Empty, loading, error states on every async operation; optimistic UI with rollback on failure.
- **Platform:** Desktop and mobile-equal; one-command run via Docker Compose.

## Out of Scope (v1)

Authentication, drag-to-reorder, keyboard shortcuts, dark mode, offline mode, multi-user.

## Success Criteria

| Outcome | Target |
|--------|--------|
| Time to first todo (first-time user) | < 10 seconds |
| API response time | < 200ms p95 |
| Data loss | Zero — write failures surfaced with UI rollback |
| Docker setup | Single `docker compose up`, < 2 minutes to running |

## Technical Summary

- **Stack:** Nx monorepo; React 19 + Vite (client); Fastify 5 (server); PostgreSQL + Prisma; Zustand; Tailwind CSS.
- **Deliverables:** Working app, unit + integration + E2E tests, Docker Compose, QA reports, documentation.

## Key Artifacts

- **Requirements:** [prd.md](prd.md) (FRs/NFRs)  
- **Architecture:** [architecture.md](architecture.md)  
- **Stories:** [epics.md](epics.md) + implementation-artifacts/*.md  
- **Readiness:** [implementation-readiness-report-2026-03-14.md](implementation-readiness-report-2026-03-14.md)
