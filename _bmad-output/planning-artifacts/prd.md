---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
workflow_completed: true
completed_at: '2026-03-09'
inputDocuments:
  - _bmad-output/brainstorming/brainstorming-session-2026-03-09-1200.md
workflowType: 'prd'
brainstormingCount: 1
briefCount: 0
researchCount: 0
projectDocsCount: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - simple-todo-bmad

**Author:** Virender
**Date:** 2026-03-09

## Executive Summary

A focused, personal todo app for individual users who need to stop forgetting things — not manage a productivity system. Core product contract: capture a task in under five seconds, trust it will be there tomorrow, enrich it later if needed. Every architectural and UX decision flows from this contract.

The app uses a two-stage interaction model. Creation is a single text input with Enter to submit — no fields, no decisions, no friction. Enrichment is opt-in at edit time: users add category, due date, importance flag, and description after the fact. This preserves capture speed without sacrificing organizational power.

Four smart filtered views — **All** (active), **Important** (flagged), **Expiring** (approaching due date), **Completed** (history) — surface the right todos automatically. Users never drag, sort, or manually bucket. Completed todos are hidden from active views, keeping the working list clean.

### What Makes This Special

The "It Just Works" principle is the product contract, not a UX guideline: the cursor is in the right place, the action is obvious, the response is instant, the data is always there. Every feature request must pass this test before entering scope.

Schema-first coherence enforces this promise technically: the Prisma schema, Fastify route validation schemas, and Zustand store shape all mirror the same `Todo` model. Empty states, error states, loading states, and optimistic updates fall naturally from a disciplined, coherent data model. Predefined categories eliminate tag sprawl. Docker Compose delivers a one-command local environment with zero manual database setup. The architecture is extensible: `user_id` for multi-user support and auth middleware are non-breaking additions.

## Project Classification

| Dimension | Value |
|---|---|
| **Project Type** | Web App — SPA (React + Vite frontend, Node/Fastify REST API) |
| **Domain** | General productivity |
| **Complexity** | Low — standard CRUD, no regulated domain concerns |
| **Project Context** | Greenfield |
| **Architecture** | Monorepo (`client/` + `server/`), Docker Compose for local dev |
| **Mobile** | True mobile-equal — both breakpoints receive the same design attention in v1 |

## Success Criteria

### User Success

- A first-time user adds their first todo within 10 seconds of opening the app — no instructions, tooltips, or onboarding required
- A returning user's todos are exactly where they left them — no data loss across sessions or browser refreshes
- A user enriches a todo (category, due date, importance, description) without leaving context or navigating to a separate page
- Important and Expiring filtered views surface the correct todos with no false positives or omissions

### Business Success

- App functions as both a daily-use personal productivity tool and a portfolio demonstration of full-stack JavaScript architecture
- App is deployable with a single `docker compose up` — zero manual environment setup
- Codebase demonstrates schema-first coherence, monorepo structure, REST API design, and ORM usage in a reviewable, well-structured form
- Architecture supports adding user authentication without restructuring the data model or API surface

### Measurable Outcomes

| Outcome | Target |
|---|---|
| Time to first todo (first-time user) | < 10 seconds |
| API response time | < 200ms p95 |
| Data loss | Zero — every write failure surfaced to user with UI rollback |
| Docker Compose setup time | Single command, < 2 minutes to running |
| Async operation state coverage | 100% of operations have loading, error, and empty states |

## Product Scope

### MVP Strategy

**Approach:** Experience MVP — complete, polished user experience for personal task management with no compromises on quality, reliability, or mobile parity. Appropriate because the product is both a daily-use personal tool and a portfolio piece.

**Resources:** Solo developer, single sprint. No external dependencies beyond Docker Compose services.

**Filter:** Every MVP feature must pass the "It Just Works" test. Friction, complexity, or instability moves a feature to Phase 2 regardless of apparent usefulness.

### MVP Feature Set

| Capability | Justification |
|---|---|
| Todo CRUD (text-only create, read list, update all fields, delete) | Core product existence |
| Enrichment fields: category, due date, importance flag, description, completedAt | Progressive disclosure model |
| Four filtered views: All, Important, Expiring, Completed | Differentiating UX — each view has a distinct purpose |
| Completed todos hidden from All/Important/Expiring | Clean list promise |
| Empty, loading, error states on all async operations | "Trustworthy" product contract |
| True mobile-equal responsive layout | v1 commitment |
| Optimistic UI with rollback on failure | "Instant response" product contract |
| Docker Compose (3 services + wait-for-postgres + auto-migration) | First-run success criterion — implement first |
| `.env.example` with pre-filled working defaults | First-run journey requirement |

**Filtered View Queries:**

| View | Query | Purpose |
|---|---|---|
| All | `completed = false` | Active todos — clean working list |
| Important | `completed = false AND important = true` | User-flagged priority items |
| Expiring | `completed = false AND dueDate <= [threshold]` | Todos with approaching due dates |
| Completed | `completed = true` | History with completedAt timestamps |

**Out of MVP:** User authentication, drag-to-reorder, keyboard shortcuts, dark mode, external integrations.

### Out of Scope

- User authentication (planned for Phase 2)
- Drag-to-reorder, keyboard shortcuts, dark mode (planned for Phase 2)
- External integrations, multi-user shared lists, recurring todos, mobile app (planned for Phase 3)
- Offline mode, local cache, and sync queue — not supported; failures are surfaced and retry is available (see Journey 3)

### Post-MVP Roadmap

**Phase 2 — Growth:**
- User authentication (JWT or session-based) — `user_id` column addition is non-breaking
- Keyboard shortcuts for power users
- Dark mode
- Drag-to-reorder todos

**Phase 3 — Expansion:**
- Multi-user support with shared lists
- Recurring todos
- Mobile app (React Native, reusing data model and API)
- Integrations (calendar capture, email-to-todo)

### Risk Mitigation

**Technical:** Low risk — mature, well-documented stack. Primary Docker Compose startup ordering risk mitigated by `wait-for-postgres` script. Docker Compose + database setup is Story 1; all other stories depend on it.

**Scope creep:** Medium risk. Every addition must pass the "It Just Works" filter before implementation. The Expiring view (requires due date enrichment) is the first Phase 2 candidate if timeline pressure emerges.

**Resource:** Minimal — solo developer, no coordination overhead.

## User Journeys

### Journey 1: The Capture Reflex (Primary User — Happy Path)

**Meet Alex.** It's 9:14am. Mid-meeting, a follow-up task surfaces. No time for a project management tool. Alex opens the always-pinned tab.

**On desktop:** Cursor is already in the input field. Alex types "follow up with Sarah re: contract" and hits Enter. The todo appears instantly. The meeting continues.

**On mobile:** The input field is prominent with a large tap target. Tapping it opens the keyboard naturally — no auto-focus on load to avoid keyboard jank. Alex types and taps Submit. The todo appears instantly.

At 5pm, Alex opens the app. The todo is there exactly as typed. One click/tap marks it complete — a strikethrough animates and the todo moves to the Completed view.

**Requirements revealed:** Auto-focus on desktop (not mobile), Enter/Submit to create, optimistic UI, single-tap completion with animation, large mobile tap targets, session persistence.

---

### Journey 2: The Organizer (Primary User — Progressive Enrichment)

**Meet Jordan.** The All view is accumulating todos. Three have due dates this week; two are work, two personal.

Jordan taps "renew car insurance." An edit drawer opens — bottom sheet on mobile, panel on desktop. Jordan sets a due date (Friday), picks "Personal" from the category dropdown, flags it Important, and adds a description: "Need policy number from email." Saves.

The **Expiring** view now shows the car insurance todo. **Important** shows it too. The **Personal** category filter isolates personal todos. Tomorrow morning, Expiring immediately surfaces what needs attention — no mental overhead.

**Requirements revealed:** Edit drawer (bottom sheet mobile / panel desktop), predefined category picker, due date picker (mobile-native), importance toggle, four filtered views, category filter, thumb-reachable mobile actions.

---

### Journey 3: The Frustrated User (Primary User — Error & Recovery)

**Meet Sam.** On a train with intermittent connection. Sam hits Enter to create a todo — the network request fails.

**What happens:** A brief loading indicator, then an inline error: "Couldn't save. Check your connection." Input text is preserved exactly as typed. A retry button is visible. When signal returns, Sam retries — the todo saves and appears.

**Scope boundary:** This app does not support offline mode. No service workers, no local cache, no sync queue. Guarantee: no silent failures, no lost input, clear retry path.

Edit enrichment path: Sam opens the edit drawer, fills all fields, hits Save — sees an inline validation error (e.g., past due date). The drawer stays open, the invalid field is highlighted, all other changes are preserved.

**Requirements revealed:** Error states (all async ops), input preservation on failed create, inline field validation, no silent failures, retry affordance, loading indicators. Offline mode explicitly out of scope.

---

### Journey 4: The First Run (Developer/Operator)

**Meet the developer** — Virender, a recruiter, or a future collaborator — who just cloned the repo.

README says: `docker compose up`.

Under the hood: `wait-for-postgres` ensures the server doesn't attempt Prisma migrations until PostgreSQL accepts connections. `prisma migrate deploy` runs automatically. Fastify starts on port 3001. Vite serves the React client on port 5173.

`.env.example` is pre-filled: `DATABASE_URL=postgresql://postgres:postgres@db:5432/todos` points to the Docker service by name. Copy to `.env` — everything connects. Browser opens to `localhost:5173`, the input is focused, "test todo" + Enter works.

**Requirements revealed:** `docker-compose.yml` (3 services), `wait-for-postgres` script, auto-migration on start, pre-filled `.env.example`, README with single-command setup, `GET /health` endpoint.

---

### Journey Requirements Summary

| Journey | Capabilities Required |
|---|---|
| Capture Reflex | Auto-focus (desktop only), Enter/Submit to create, optimistic UI, single-tap complete, mobile tap targets, session persistence |
| Organizer | Edit drawer (bottom sheet mobile / panel desktop), category picker, due date picker, importance toggle, four filtered views, category filter |
| Frustrated User | Error states (all ops), input preservation on failure, inline validation, no silent failures, retry affordance, loading indicators |
| First Run | Docker Compose (3 services), wait-for-postgres, auto-migration, pre-filled `.env.example`, README, health check endpoint |

## Web App Requirements

### Browser Matrix

| Target | Support Level |
|---|---|
| Chrome / Edge (latest 2 versions) | Full support |
| Firefox (latest 2 versions) | Full support |
| Safari (latest 2 versions) | Full support |
| Mobile Chrome (Android) | Full support |
| Mobile Safari (iOS) | Full support |
| IE / legacy browsers | Not supported |

### Responsive Design

Mobile-equal implementation — desktop and mobile receive identical design attention. Key mobile constraints:

- No input auto-focus on mobile (prevents keyboard jank on load)
- Edit drawer renders as bottom sheet on mobile, panel on desktop
- All tap targets minimum 44×44px
- Mobile-native date input for due date picker
- Touch-friendly list interactions throughout

### Deployment Context

Local Docker Compose only in v1 — not publicly deployed. No SEO requirements; no meta tags beyond a meaningful `<title>`. No real-time/WebSocket layer — standard REST with optimistic UI.

## Functional Requirements

### Todo Management

- **FR1:** User can create a todo with text as the only required field
- **FR2:** User can view and edit all fields of an existing todo through a single edit interaction
- **FR3:** User can mark an active todo as complete
- **FR4:** User can reopen a completed todo (mark it active again)
- **FR5:** User can delete a todo permanently
- **FR6:** The system surfaces any persistence failure to the user and rolls back the UI change — no silent write failures
- **FR7:** User can view the timestamp when a todo was created
- **FR8:** User can view the timestamp when a todo was completed

### Todo Enrichment

- **FR9:** User can assign a category to a todo from a predefined category list
- **FR10:** User can remove the category from a todo
- **FR11:** User can set a due date on a todo
- **FR12:** User can remove the due date from a todo
- **FR13:** User can flag a todo as important
- **FR14:** User can unflag a todo as important
- **FR15:** User can add a free-text description to a todo
- **FR16:** User can remove the description from a todo

### Filtering & Views

- **FR17:** User can view all active (incomplete) todos in the All view
- **FR18:** User can view all active todos flagged as important in the Important view
- **FR19:** User can view all active todos with an approaching due date in the Expiring view
- **FR20:** User can view all completed todos with their completion timestamps in the Completed view
- **FR21:** User can filter the active todo list by category
- **FR22:** Completed todos are excluded from the All, Important, and Expiring views

### User Interface & Experience

- **FR23:** User can create a todo using the Enter key on desktop or a submit action on mobile
- **FR24:** User can navigate all interactive elements using keyboard (Tab, Enter, Escape)
- **FR25:** The application provides sufficient visual contrast for all text and interactive elements
- **FR26:** The application displays a visual completion indicator when a todo is marked complete
- **FR27:** The application renders a fully functional layout on both desktop and mobile viewports
- **FR28:** The application displays a meaningful title in the browser tab

### Feedback & System States

- **FR29:** The application displays a loading indicator for every async operation
- **FR30:** The application displays an error message when any async operation fails
- **FR31:** The application displays an empty state when no todos exist in the current view
- **FR32:** The application updates the UI immediately on user action before server confirmation (optimistic UI)
- **FR33:** The application preserves user input when a create or edit operation fails
- **FR34:** User can retry a failed operation without re-entering data
- **FR35:** The application displays specific inline validation errors for invalid enrichment field inputs

### Infrastructure & Setup

- **FR36:** The complete application stack starts with a single command
- **FR37:** The database schema is applied automatically on application startup
- **FR38:** The application server waits for the database service to be ready before starting
- **FR39:** The application exposes a health check endpoint
- **FR40:** All required environment variables are provided with working defaults in a documented example file

## Non-Functional Requirements

### Performance

- **NFR1:** API endpoints (`GET`, `POST`, `PATCH`, `DELETE` `/todos`) respond within 200ms at the 95th percentile under normal single-user load
- **NFR2:** Initial page load completes within 1 second on localhost
- **NFR3:** UI reflects user actions within one animation frame (< 16ms) via optimistic updates — perceived latency is zero for successful operations
- **NFR4:** Time to interactive on first load is under 2 seconds

### Reliability & Data Integrity

- **NFR5:** No todo data is silently lost — every write failure is surfaced to the user with the UI rolled back to its previous state
- **NFR6:** The application recovers gracefully from a temporary database connection failure — user sees an error, can retry, data is not corrupted
- **NFR7:** Database migrations run idempotently on startup — restarting the application stack does not corrupt or duplicate data
- **NFR8:** The application stack returns to a healthy state after `docker compose restart` without manual intervention

### Security

- **NFR9:** Todo text and descriptions are not logged at debug level in production mode
- **NFR10:** Database credentials are supplied via environment variables only — never hardcoded in source code
- **NFR11:** The API does not expose internal error stack traces in production error responses

### Accessibility

- **NFR12:** All interactive elements are reachable and operable via keyboard (Tab to focus, Enter/Space to activate, Escape to dismiss)
- **NFR13:** All text content meets WCAG 2.1 AA color contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text)
- **NFR14:** All form inputs have associated visible labels or descriptive placeholder text
- **NFR15:** Focus indicators are visible on all focusable elements

### Maintainability

- **NFR16:** The data schema, API route validation schemas, and client store shape remain structurally consistent — changes to the `Todo` data model propagate across all three layers
- **NFR17:** The codebase passes lint and format checks with no errors
