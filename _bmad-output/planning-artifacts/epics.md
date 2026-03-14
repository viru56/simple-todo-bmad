---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation]
workflow_completed: true
completedAt: '2026-03-10'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# simple-todo-bmad - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for simple-todo-bmad, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: User can create a todo with text as the only required field
FR2: User can view and edit all fields of an existing todo through a single edit interaction
FR3: User can mark an active todo as complete
FR4: User can reopen a completed todo (mark it active again)
FR5: User can delete a todo permanently
FR6: The system surfaces any persistence failure to the user and rolls back the UI change — no silent write failures
FR7: User can view the timestamp when a todo was created
FR8: User can view the timestamp when a todo was completed
FR9: User can assign a category to a todo from a predefined category list
FR10: User can remove the category from a todo
FR11: User can set a due date on a todo
FR12: User can remove the due date from a todo
FR13: User can flag a todo as important
FR14: User can unflag a todo as important
FR15: User can add a free-text description to a todo
FR16: User can remove the description from a todo
FR17: User can view all active (incomplete) todos in the All view
FR18: User can view all active todos flagged as important in the Important view
FR19: User can view all active todos with an approaching due date in the Expiring view
FR20: User can view all completed todos with their completion timestamps in the Completed view
FR21: User can filter the active todo list by category
FR22: Completed todos are excluded from the All, Important, and Expiring views
FR23: User can create a todo using the Enter key on desktop or a submit action on mobile
FR24: User can navigate all interactive elements using keyboard (Tab, Enter, Escape)
FR25: The application provides sufficient visual contrast for all text and interactive elements
FR26: The application displays a visual completion indicator when a todo is marked complete
FR27: The application renders a fully functional layout on both desktop and mobile viewports
FR28: The application displays a meaningful title in the browser tab
FR29: The application displays a loading indicator for every async operation
FR30: The application displays an error message when any async operation fails
FR31: The application displays an empty state when no todos exist in the current view
FR32: The application updates the UI immediately on user action before server confirmation (optimistic UI)
FR33: The application preserves user input when a create or edit operation fails
FR34: User can retry a failed operation without re-entering data
FR35: The application displays specific inline validation errors for invalid enrichment field inputs
FR36: The complete application stack starts with a single command
FR37: The database schema is applied automatically on application startup
FR38: The application server waits for the database service to be ready before starting
FR39: The application exposes a health check endpoint
FR40: All required environment variables are provided with working defaults in a documented example file

### NonFunctional Requirements

NFR1: API endpoints (GET, POST, PATCH, DELETE /todos) respond within 200ms at the 95th percentile under normal single-user load
NFR2: Initial page load completes within 1 second on localhost
NFR3: UI reflects user actions within one animation frame (< 16ms) via optimistic updates — perceived latency is zero for successful operations
NFR4: Time to interactive on first load is under 2 seconds
NFR5: No todo data is silently lost — every write failure is surfaced to the user with the UI rolled back to its previous state
NFR6: The application recovers gracefully from a temporary database connection failure — user sees an error, can retry, data is not corrupted
NFR7: Database migrations run idempotently on startup — restarting the application stack does not corrupt or duplicate data
NFR8: The application stack returns to a healthy state after `docker compose restart` without manual intervention
NFR9: Todo text and descriptions are not logged at debug level in production mode
NFR10: Database credentials are supplied via environment variables only — never hardcoded in source code
NFR11: The API does not expose internal error stack traces in production error responses
NFR12: All interactive elements are reachable and operable via keyboard (Tab to focus, Enter/Space to activate, Escape to dismiss)
NFR13: All text content meets WCAG 2.1 AA color contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text)
NFR14: All form inputs have associated visible labels or descriptive placeholder text
NFR15: Focus indicators are visible on all focusable elements
NFR16: The data schema, API route validation schemas, and client store shape remain structurally consistent — changes to the Todo data model propagate across all three layers
NFR17: The codebase passes lint and format checks with no errors

### Additional Requirements

#### From Architecture

- **Starter Template (Epic 1 Story 1 impact):** Use Nx React Monorepo initialized with `npx create-nx-workspace@latest simple-todo-bmad --preset=react-monorepo --bundler=vite`. Project initialization is the first implementation story — all other stories depend on it.
- **Monorepo structure:** `apps/client` (React + Vite), `apps/server` (Fastify), `libs/shared` (shared types and contracts)
- **Technology versions:** Node.js 24.x LTS, React 19.2, Fastify 5.8.2, Prisma 7.4.2, Zustand 5.0.11, Tailwind CSS 4.2.1, shadcn/ui
- **Database:** PostgreSQL via Prisma with schema-first consistency across persistence, API validation, and client state shape
- **Prisma migrations:** Checked-in migrations auto-applied on startup; supports one-command local startup
- **API contracts:** REST-style `/todos` resource endpoints; standardized JSON error envelope (`error.code`, `error.message`, optional `error.details`) on all non-2xx responses; `camelCase` JSON fields; ISO 8601 dates
- **Fastify security middleware:** CORS (restrictive to local frontend origins), Helmet security headers, request/body size limits, baseline rate limiting
- **OpenAPI documentation:** Derived from Fastify route schemas
- **Frontend state:** Zustand for canonical todos, active view/filter state, request/loading/error state. Component-local state for transient UI (drawer open/close, unsaved form edits, temporary input text). Derived views computed from canonical `todos` array via selectors/helpers, not stored as separate arrays.
- **CI/CD:** Lightweight CI for lint, tests, and build validation (`.github/workflows/ci.yml`)
- **Naming conventions:** `PascalCase` React components, `camelCase` functions/variables/types, `snake_case` DB columns, plural REST endpoints (`/todos`), verb-first Zustand actions (`fetchTodos`, `createTodo`, `updateTodo`)
- **Project structure:** Feature-first frontend (`capture`, `todos`, `filters`, `edit-todo`, `feedback`); layered backend (`routes`, `schemas`, `services`, `repositories`, `errors`, `lib`)
- **Expiring view rule:** Needs to be explicitly defined during implementation (currently identified as a non-blocking gap)

#### From UX Design Specification

- **Responsive design:** True mobile-equal — desktop and mobile receive identical design attention; different patterns are intentional (not compromises)
- **Design system:** Tailwind CSS + shadcn/ui (Radix UI primitives) — provides accessibility (focus management, keyboard navigation, ARIA) out of the box
- **Edit drawer interaction:** Bottom sheet on mobile, side panel on desktop — progressive disclosure, list context always preserved
- **Mobile-specific patterns:** No input auto-focus on load (prevents keyboard jank), native `<input type="date">` for due date picker, minimum 44×44px tap targets, thumb-reachable actions
- **Desktop-specific patterns:** Input auto-focused on load (cursor in input, no click needed), hover-reveal secondary actions (complete/delete appear on hover only)
- **Capture UX:** Always-visible create input (permanently present, zero navigational cost), todos prepend to top of list
- **Optimistic UI detail:** New/updated todo appears in a subtle pending state (slightly muted) during in-flight period; snaps to full opacity on server confirmation; no spinner on happy path
- **Completion micro-interaction:** Strikethrough animation + clean exit from active list; satisfying, instant response
- **Failure UX:** Specific inline error copy (e.g., "Couldn't save. Check your connection."), input fully preserved, retry is one action away; empty input is silent no-op (no error, no scolding)
- **Visual direction:** Clean white/light background, high-contrast text, muted secondary text for metadata, distinct accent color for importance flag, system font stack, 4px base unit spacing, subtle border radius
- **Accessibility:** All interactive elements keyboard-accessible; visible focus indicators; WCAG 2.1 AA contrast; form inputs have labels or descriptive placeholders

### FR Coverage Map

FR1:  Epic 2 — Text-only todo creation
FR2:  Epic 3 — Edit all fields via edit drawer
FR3:  Epic 2 — Mark todo complete
FR4:  Epic 2 — Reopen completed todo
FR5:  Epic 2 — Delete todo permanently
FR6:  Epic 2 — Surface persistence failures + UI rollback
FR7:  Epic 2 — View created timestamp
FR8:  Epic 2 — View completed timestamp
FR9:  Epic 3 — Assign category from predefined list
FR10: Epic 3 — Remove category
FR11: Epic 3 — Set due date
FR12: Epic 3 — Remove due date
FR13: Epic 3 — Flag as important
FR14: Epic 3 — Unflag as important
FR15: Epic 3 — Add free-text description
FR16: Epic 3 — Remove description
FR17: Epic 2 — All view (active todos)
FR18: Epic 3 — Important view (flagged active todos)
FR19: Epic 3 — Expiring view (approaching due date; threshold = 3 days, defined in todo.constants.ts)
FR20: Epic 2 — Completed view (with timestamps)
FR21: Epic 3 — Category filter on active todos
FR22: Epic 2 — Completed todos excluded from All/Important/Expiring
FR23: Epic 2 — Enter/Submit to create
FR24: Epic 2 — Full keyboard navigation
FR25: Epic 2 — Visual contrast (WCAG 2.1 AA)
FR26: Epic 2 — Visual completion indicator (strikethrough animation)
FR27: Epic 2 — Desktop + mobile responsive layout
FR28: Epic 2 — Meaningful browser tab title
FR29: Epic 2 — Loading indicators for all async ops
FR30: Epic 2 — Error messages for all async failures
FR31: Epic 2 — Empty states per view
FR32: Epic 2 — Optimistic UI (immediate update before server confirmation)
FR33: Epic 2 — Input preservation on failure
FR34: Epic 2 — Retry failed operation without re-entering data
FR35: Epic 3 — Inline validation errors on enrichment fields
FR36: Epic 1 — Single-command stack startup
FR37: Epic 1 — Auto-migration on startup
FR38: Epic 1 — Server waits for DB readiness
FR39: Epic 1 — Health check endpoint
FR40: Epic 1 — Pre-filled .env.example

## Epic List

### Epic 1: One-Command Setup — Developer Can Clone, Run, and Verify the App in Under 2 Minutes
A developer (or evaluator) can clone the repo, run a single command, and have a fully operational app stack with a connected database, automatic migrations, and a passing health check — all within 2 minutes.
**FRs covered:** FR36, FR37, FR38, FR39, FR40

### Epic 2: Core Todo Capture & Management
A user can instantly capture todos (text-only, Enter to submit), view their active list, mark todos complete, reopen them, delete them — all with optimistic UI, full feedback states (loading, error, empty), and a responsive layout that works equally well on desktop and mobile.
**FRs covered:** FR1, FR3, FR4, FR5, FR6, FR7, FR8, FR17, FR20, FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34

### Epic 3: Todo Enrichment & Smart Filtered Views
A user can enrich any existing todo with a category, due date, importance flag, and description through the edit drawer — and smart filtered views (Important, Expiring, category filter) surface the right todos automatically, with no manual sorting required.
**FRs covered:** FR2, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR18, FR19, FR21, FR35

## Epic 1: One-Command Setup — Developer Can Clone, Run, and Verify the App in Under 2 Minutes

A developer (or evaluator) can clone the repo, run a single command, and have a fully operational app stack with a connected database, automatic migrations, and a passing health check — all within 2 minutes.

### Story 1.1: Initialize Nx Monorepo Workspace & App Structure

As a developer setting up the project for the first time,
I want the Nx monorepo initialized with the correct apps and shared library structure,
So that all future development follows consistent workspace conventions and benefits from Nx tooling.

**Acceptance Criteria:**

**Given** I am in the project directory
**When** I run `npx create-nx-workspace@latest simple-todo-bmad --preset=react-monorepo --bundler=vite`
**Then** the workspace is created with `apps/client`, `apps/server`, and `libs/shared` directory scaffolding

**Given** the workspace is initialized
**When** I run `nx lint` for the client app
**Then** the lint check passes with no errors

**Given** the workspace is initialized
**When** I run `nx build client`
**Then** the Vite build completes successfully with no errors

---

### Story 1.2: Configure Fastify Server Foundation with Health Endpoint

As a developer running the backend server,
I want Fastify configured with security plugins, structured logging, environment config, and a health endpoint,
So that the server is secure, observable, and ready for route development.

**Acceptance Criteria:**

**Given** the server is started with valid environment configuration
**When** a `GET` request is made to `/health`
**Then** the response is HTTP 200 with `{ "status": "ok" }`

**Given** the server returns a non-2xx response for any reason
**When** the response body is inspected
**Then** it follows the standardized error envelope: `{ "error": { "code": "...", "message": "..." } }`
**And** no internal stack trace is present in the response body

**Given** a request is made to the server from an allowed frontend origin
**When** the CORS headers are inspected
**Then** only the configured local frontend origin is permitted

**Given** any response from the server
**When** the response headers are inspected
**Then** Helmet security headers are present

**Given** the server is configured with environment variables
**When** I inspect `apps/server/src/config/env.ts`
**Then** all required environment variables are declared and validated — none are hardcoded in source

**Given** the server is running in production mode (`NODE_ENV=production`)
**When** a todo is created, updated, or retrieved
**Then** the todo's `text` and `description` field values are not present in any log output at debug or info level (NFR9)

---

### Story 1.3: Define Todo Data Model with Prisma

As a developer implementing todo features,
I want the Prisma schema to define the complete Todo model with all required fields,
So that the database schema, API contracts, and client state can all align around the same canonical model.

**Acceptance Criteria:**

**Given** the Prisma schema is defined at `apps/server/prisma/schema.prisma`
**When** I inspect the `Todo` model
**Then** it contains: `id` (UUID, auto-generated), `text` (String, required), `completed` (Boolean, default false), `important` (Boolean, default false), `category` (String, optional), `dueDate` (DateTime, optional), `description` (String, optional), `createdAt` (DateTime, auto-set), `completedAt` (DateTime, optional)

**Given** the Prisma schema is defined
**When** I run `prisma migrate dev --name init`
**Then** the initial migration file is created under `prisma/migrations/` and applied without errors

**Given** the migration exists
**When** I run `prisma generate`
**Then** the Prisma client is generated without errors and reflects the Todo model

---

### Story 1.4: Docker Compose Local Development Environment

As a developer or evaluator cloning the repository,
I want to start the complete application stack with a single command,
So that I have a fully operational app with database, server, and client running locally within 2 minutes — no manual environment setup required.

**Acceptance Criteria:**

**Given** Docker is installed and `.env.example` has been copied to `.env`
**When** I run `docker compose up`
**Then** all three services (PostgreSQL, server, client) start and reach a healthy state

**Given** the stack is starting
**When** the server container initializes
**Then** `wait-for-postgres.sh` prevents the server from starting until PostgreSQL accepts connections

**Given** the server container starts after PostgreSQL is ready
**When** the server boots
**Then** `prisma migrate deploy` runs automatically and applies all pending migrations before Fastify starts

**Given** the stack is running
**When** I make a `GET` request to `http://localhost:3001/health`
**Then** I receive HTTP 200 `{ "status": "ok" }`

**Given** I inspect `.env.example`
**When** I review its contents
**Then** `DATABASE_URL` points to the Docker PostgreSQL service by hostname with working default credentials, and all required env vars have pre-filled working defaults

**Given** I inspect the project `README.md`
**When** I read the setup instructions
**Then** it contains the exact single command (`docker compose up`) to start the stack, the prerequisite (Docker), and how to verify the app is running

---

### Story 1.5: Configure CI/CD Pipeline

As a developer contributing to the codebase,
I want automated CI checks to run on every push and pull request,
So that lint errors, test failures, and build regressions are caught before they reach the main branch.

**Acceptance Criteria:**

**Given** code is pushed to the repository
**When** the CI workflow is triggered
**Then** lint checks run via Nx and the pipeline fails if any lint errors are present

**Given** code is pushed to the repository
**When** the CI workflow is triggered
**Then** build validation runs for both the `client` and `server` apps via Nx targets

**Given** I inspect `.github/workflows/ci.yml`
**When** I review its steps
**Then** it defines sequential jobs for lint, test, and build using Nx task orchestration

## Epic 2: Core Todo Capture & Management

A user can instantly capture todos (text-only, Enter to submit), view their active list, mark todos complete, reopen them, delete them — all with optimistic UI, full feedback states (loading, error, empty), and a responsive layout that works equally well on desktop and mobile.

### Story 2.1: Todo CRUD API Endpoints

As a developer building the frontend,
I want complete REST API endpoints for todo create, read, update, and delete,
So that the client has a reliable, validated, and consistently structured backend to integrate with.

**Acceptance Criteria:**

**Given** a `POST /todos` request with a valid `{ text: "..." }` body
**When** the request is processed
**Then** the todo is persisted and the response is HTTP 201 with the canonical todo object (all fields, `camelCase`, ISO 8601 dates)

**Given** a `GET /todos` request
**When** the request is processed
**Then** the response is HTTP 200 with an array of all todos (empty array when none exist)

**Given** a `PATCH /todos/:id` request with valid fields
**When** the request is processed
**Then** only the provided fields are updated and the response is HTTP 200 with the full updated todo object

**Given** a `DELETE /todos/:id` request for an existing todo
**When** the request is processed
**Then** the todo is removed and the response is HTTP 204

**Given** any request with invalid or missing required fields
**When** the request is processed
**Then** the response is HTTP 400 with a machine-readable error envelope `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }`

**Given** a request targeting a non-existent todo ID
**When** the request is processed
**Then** the response is HTTP 404 with the standardized error envelope

**Given** the API responds to any request
**When** the response time is measured under normal single-user load
**Then** it completes within 200ms at the 95th percentile

---

### Story 2.2: Client Foundation — App Shell, State Store & API Service

As a developer building the frontend,
I want the application shell, Zustand store, and API service layer scaffolded,
So that all feature UI components have a consistent foundation to build on.

**Acceptance Criteria:**

**Given** the client app is loaded in the browser
**When** the page renders
**Then** the app shell (`AppShell.tsx`) renders with a header and the main content area, and the browser tab displays a meaningful title

**Given** the client app loads
**When** Tailwind CSS and shadcn/ui are configured
**Then** the base stylesheet applies correctly and shadcn/ui components render as expected

**Given** the Zustand store is initialized
**When** I inspect `apps/client/src/store/todoStore.ts`
**Then** it holds a canonical `todos` array, active view state, and per-operation loading/error state — no duplicate derived arrays

**Given** the API service is configured
**When** I inspect `apps/client/src/services/todoApi.ts`
**Then** it is the only module that references API endpoint URLs, and all calls go through `apiClient.ts`

**Given** the client loads
**When** the initial page load completes on localhost
**Then** the page is interactive within 1 second (NFR2)
**And** time to interactive does not exceed 2 seconds (NFR4)

---

### Story 2.3: Todo Capture Input with Optimistic UI

As a user who wants to capture a thought quickly,
I want an always-visible text input that creates a todo on Enter or Submit with immediate visual feedback,
So that I can capture tasks in under 5 seconds with zero friction and zero doubt it was saved.

**Acceptance Criteria:**

**Given** the app loads on desktop
**When** the page finishes rendering
**Then** the text input (`CreateTodoInput.tsx`) is auto-focused — the cursor is in the input without any click

**Given** the app loads on mobile
**When** the page finishes rendering
**Then** the text input is prominent and tappable but NOT auto-focused (no keyboard jank on load)

**Given** a user has typed text in the input
**When** they press Enter (desktop) or tap the Submit button (mobile)
**Then** the new todo prepends to the top of the active list immediately in a visually pending (slightly muted) state before server confirmation

**Given** the server confirms the create successfully
**When** the response is received
**Then** the pending todo snaps to full opacity and the input field clears and refocuses ready for the next capture

**Given** the create request fails
**When** the error response is received
**Then** the optimistic todo is removed from the list, the original input text is fully restored in the field, and a specific inline error message is shown (e.g., "Couldn't save. Check your connection.")

**Given** a user submits an empty input
**When** the form is submitted
**Then** nothing happens — no error message, no shake animation; the input stays focused

---

### Story 2.4: Todo List & Item Display

As a user viewing my todos,
I want to see my active todos in a clean list with relevant metadata and quick-action controls,
So that I can scan and act on my tasks without navigating away from the list.

**Acceptance Criteria:**

**Given** the store has todos
**When** the `TodoList.tsx` renders
**Then** all active (incomplete) todos are displayed in a list, each showing the todo text and `createdAt` timestamp

**Given** the user is on desktop and hovers over a todo item
**When** the hover state activates
**Then** the complete and delete action controls become visible (hover-reveal pattern)

**Given** the user is on mobile
**When** viewing a todo item
**Then** the complete and delete controls are always visible with minimum 44×44px tap targets

**Given** a todo has a `completedAt` timestamp
**When** it renders in the Completed view
**Then** the completion timestamp is displayed alongside the todo text

**Given** the active todo list is empty
**When** the `All` view renders
**Then** a contextually appropriate empty state message is displayed

---

### Story 2.5: Complete, Reopen & Delete Todo Actions

As a user managing my todo list,
I want to mark todos complete, reopen them, and delete them with instant visual feedback and safe error recovery,
So that my list stays accurate and I never silently lose a change.

**Acceptance Criteria:**

**Given** a user clicks/taps the complete control on an active todo
**When** the action is triggered
**Then** the todo immediately shows a strikethrough animation and transitions out of the active list (optimistic)
**And** if the server confirms success, the todo moves to the Completed view

**Given** a complete action fails on the server
**When** the error response is received
**Then** the todo is restored to the active list in its previous state and an error message is shown with a retry affordance

**Given** a user clicks/taps reopen on a completed todo
**When** the action is triggered
**Then** the todo immediately moves back to the active list (optimistic) and is removed from the Completed view on server confirmation

**Given** a user clicks/taps delete on a todo
**When** the action is triggered
**Then** the todo is immediately removed from the list (optimistic) and permanently deleted on server confirmation

**Given** a delete or reopen action fails
**When** the error response is received
**Then** the todo is restored to its previous state and a specific error message is displayed

**Given** any complete, reopen, or delete action is in-flight
**When** the operation is pending
**Then** a loading indicator is shown scoped to that item

---

### Story 2.6: All View & Completed View with Empty States

As a user navigating between my active and completed todos,
I want tab navigation between the All and Completed views with empty states for each,
So that I can quickly switch context between what I need to do and what I've already done.

**Acceptance Criteria:**

**Given** the app renders
**When** I view the tab navigation
**Then** tabs for `All` and `Completed` are visible and the `All` tab is active by default

**Given** I click/tap the `Completed` tab
**When** the view switches
**Then** only completed todos are shown, each with their `completedAt` timestamp, and no incomplete todos appear

**Given** I click/tap the `All` tab
**When** the view switches
**Then** only active (incomplete) todos are shown — no completed todos appear in this view

**Given** a todo is marked complete while viewing the `All` tab
**When** the completion is confirmed
**Then** the todo is no longer visible in the `All` view

**Given** there are no todos in the current view
**When** the view renders
**Then** a contextually relevant empty state message is displayed for that specific view

**Given** view switching occurs
**When** the tab is clicked
**Then** the transition is instant — no page load, no network request

---

### Story 2.7: Keyboard Accessibility & WCAG Compliance Audit

As a user who navigates by keyboard or relies on accessible design,
I want all interactive elements built in Epic 2 to be audited and confirmed keyboard-operable with visible focus indicators and sufficient color contrast,
So that the complete Epic 2 feature set is fully usable without a mouse and meets WCAG 2.1 AA standards across every component.

**Acceptance Criteria:**

**Given** a user navigates by keyboard only
**When** they press `Tab` through the interface
**Then** every interactive element (input, buttons, tabs, todo items) receives focus in a logical order

**Given** a user focuses an interactive element
**When** they press `Enter` or `Space`
**Then** the element activates (submit, complete, delete, tab switch)

**Given** focus is on any focusable element
**When** I visually inspect the element
**Then** a visible focus indicator (outline or ring) is present — no element has `outline: none` without an alternative

**Given** any text or interactive element is rendered
**When** I measure the color contrast ratio
**Then** normal text meets 4.5:1 minimum and large text meets 3:1 minimum (WCAG 2.1 AA)

**Given** any form input or button is rendered
**When** I inspect the element
**Then** it has an associated visible label or descriptive placeholder text

## Epic 3: Todo Enrichment & Smart Filtered Views

A user can enrich any existing todo with a category, due date, importance flag, and description through the edit drawer — and smart filtered views (Important, Expiring, category filter) surface the right todos automatically, with no manual sorting required.

### Story 3.1: Edit Drawer Shell — Open, Close & Layout

As a user who wants to enrich a todo,
I want to open a drawer for any todo that shows its details without leaving the list,
So that I can access the edit surface while keeping my list context intact.

**Acceptance Criteria:**

**Given** a user clicks/taps on a todo item (not on the complete or delete controls)
**When** the interaction is triggered
**Then** the edit drawer opens — as a bottom sheet on mobile and as a side panel on desktop

**Given** the edit drawer is open on mobile
**When** I inspect the layout
**Then** it renders as a bottom sheet anchored to the bottom of the screen, sliding up from below

**Given** the edit drawer is open on desktop
**When** I inspect the layout
**Then** it renders as a side panel alongside the todo list — the list remains visible and interactive

**Given** the edit drawer is open
**When** the user presses `Escape` or taps outside the drawer (on mobile overlay)
**Then** the drawer closes without saving any changes

**Given** the edit drawer is open
**When** the drawer closes
**Then** focus returns to the todo item that triggered the open

---

### Story 3.2: Category & Description Enrichment

As a user who wants to organize my todos,
I want to assign a category and add a description to any todo via the edit drawer,
So that I can add context and grouping information after capturing the todo.

**Acceptance Criteria:**

**Given** the edit drawer is open for a todo
**When** I interact with the category field
**Then** a dropdown (`Radix Select`) shows a predefined list of categories to choose from

**Given** I select a category from the dropdown
**When** I save the todo
**Then** the todo's `category` field is updated via `PATCH /todos/:id` and the updated todo reflects the selection

**Given** a todo already has a category assigned
**When** I open the edit drawer
**Then** the category dropdown shows the current value pre-selected

**Given** I want to remove a category from a todo
**When** I clear/deselect the category field and save
**Then** the todo's `category` is set to `null` and the field shows as unset

**Given** the edit drawer is open for a todo
**When** I type in the description textarea
**Then** I can enter free-form text of any length

**Given** I save a todo with a description
**When** the save completes successfully
**Then** the todo's `description` field is updated and reflected in the drawer on next open

**Given** I clear the description field and save
**When** the save completes
**Then** the todo's `description` is set to `null`

---

### Story 3.3: Due Date & Importance Enrichment

As a user who wants to prioritize and time-box my todos,
I want to set a due date and flag a todo as important via the edit drawer,
So that the smart filtered views can surface the right todos automatically.

**Acceptance Criteria:**

**Given** the edit drawer is open
**When** I interact with the due date field
**Then** a native `<input type="date">` is rendered — using the mobile-native date picker on mobile and the browser default on desktop

**Given** I select a due date and save
**When** the save completes
**Then** the todo's `dueDate` is updated via `PATCH /todos/:id` using an ISO 8601 date string

**Given** a todo already has a due date
**When** I open the edit drawer
**Then** the date input shows the current due date pre-filled

**Given** I clear the due date field and save
**When** the save completes
**Then** the todo's `dueDate` is set to `null`

**Given** the edit drawer is open
**When** I view the importance toggle (`ImportanceToggle.tsx`)
**Then** it shows a distinct visual state indicating whether the todo is currently flagged as important

**Given** I toggle the importance flag and save
**When** the save completes
**Then** the todo's `important` field is updated via `PATCH /todos/:id` and the toggle reflects the new state

---

### Story 3.4: Edit Save, Failure Recovery & Inline Validation

As a user editing a todo,
I want save feedback, inline validation errors, and full input recovery on failure,
So that I can trust the drawer will never lose my changes silently and I always know how to fix validation issues.

**Acceptance Criteria:**

**Given** the edit drawer has unsaved changes
**When** I tap/click the Save button
**Then** a loading indicator is shown on the Save button while the `PATCH /todos/:id` request is in-flight

**Given** the save request completes successfully
**When** the response is received
**Then** the drawer closes, the todo in the list reflects the updated values, and no error is shown

**Given** the save request fails due to a network or server error
**When** the error response is received
**Then** the drawer remains open, all entered values are preserved exactly as typed, and a specific error message is shown (e.g., "Couldn't save. Check your connection.")

**Given** a validation error occurs (e.g., past due date)
**When** the invalid field is identified
**Then** the specific field is highlighted with an inline error message, the drawer stays open, and all other field values are preserved

**Given** a save fails and an error is shown
**When** the user addresses the issue
**Then** they can retry the save with one action without re-entering any data

---

### Story 3.5: Important View Tab

As a user who flags priority todos,
I want a dedicated Important view that shows only active todos I've flagged as important,
So that I can focus on my priorities without manually scanning the full list.

**Acceptance Criteria:**

**Given** the app renders with existing views
**When** I view the tab navigation
**Then** an `Important` tab is visible alongside `All` and `Completed`

**Given** I click/tap the `Important` tab
**When** the view renders
**Then** only active todos with `important = true` are shown — completed todos are excluded

**Given** a todo is flagged as important via the edit drawer
**When** I switch to the Important view
**Then** that todo appears in the Important view automatically

**Given** a todo in the Important view is marked complete
**When** the completion is confirmed
**Then** the todo is immediately removed from the Important view

**Given** there are no important active todos
**When** the Important view renders
**Then** a contextually appropriate empty state is shown

---

### Story 3.6: Expiring View Tab

As a user who sets due dates on todos,
I want a dedicated Expiring view that surfaces active todos with an approaching due date,
So that I can see what needs attention soon without manually checking dates.

**Acceptance Criteria:**

**Given** the app renders
**When** I view the tab navigation
**Then** an `Expiring` tab is visible alongside `All`, `Important`, and `Completed`

**Given** I click/tap the `Expiring` tab
**When** the view renders
**Then** only active todos whose `dueDate` is within 3 days from today are shown (threshold defined as `EXPIRING_THRESHOLD_DAYS = 3` in `todo.constants.ts`)
**And** completed todos are excluded regardless of due date

**Given** a todo has a due date set more than 3 days in the future
**When** I view the Expiring tab
**Then** that todo does NOT appear in the Expiring view

**Given** a todo with an approaching due date is marked complete
**When** the completion is confirmed
**Then** the todo is immediately removed from the Expiring view

**Given** there are no expiring active todos
**When** the Expiring view renders
**Then** a contextually appropriate empty state is shown

---

### Story 3.7: Category Filter on Active Todos

As a user with todos across multiple categories,
I want to filter the active todo list by category,
So that I can focus on a specific area of my life without seeing unrelated todos.

**Acceptance Criteria:**

**Given** the app renders with the `All` view active
**When** I view the category filter area (`CategoryFilter.tsx`)
**Then** a filter control is visible showing the available categories derived from todos that have a category assigned

**Given** I select a category from the filter
**When** the filter is applied
**Then** only active todos matching that category are shown in the current view

**Given** a category filter is active
**When** I clear the filter
**Then** all active todos are shown again (unfiltered)

**Given** no todos have a category assigned
**When** I view the category filter
**Then** the filter control is empty or hidden — it does not show categories with zero todos

**Given** a category filter is active and I switch views (e.g., to Important)
**When** the new view renders
**Then** the category filter applies within that view as well
