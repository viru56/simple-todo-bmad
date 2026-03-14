stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/validation-report-prd.md
  - _bmad-output/brainstorming/brainstorming-session-2026-03-09-1200.md
workflowType: 'architecture'
project_name: 'simple-todo-bmad'
user_name: 'Virender'
date: '2026-03-10'
lastStep: 8
status: 'complete'
completedAt: '2026-03-10'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The product defines 40 functional requirements across six areas: todo management, enrichment, filtering/views, interface behavior, feedback/system states, and infrastructure/setup.

Architecturally, these imply a compact but behaviorally strict system:
- A persistent todo domain model supporting text, completion state, created/completed timestamps, category, due date, importance, and description
- CRUD flows for create, update, complete/reopen, and delete
- Deterministic derived views for All, Important, Expiring, and Completed
- Category-based filtering on active todos
- A split interaction model: frictionless capture plus progressive enrichment through an edit surface that preserves list context
- Infrastructure support for local startup, health checks, environment configuration, and automatic schema application

Although the feature set is modest, the behavior contract is strong: capture must stay frictionless, state changes must feel instant, and failures must be explicit, recoverable, and non-destructive.

**Non-Functional Requirements:**

The 17 non-functional requirements are the primary architectural drivers.

Most influential NFRs:
- Performance: API responses under 200ms p95, initial page load under 1 second on localhost, immediate-feeling UI updates
- Reliability: no silent data loss, graceful recovery from temporary backend/database failures, idempotent startup migrations, healthy restart behavior
- Security: credentials only through environment variables, no internal stack traces in production responses, avoid logging todo content in production
- Accessibility: keyboard operability, visible focus states, WCAG 2.1 AA contrast, labeled or clearly described inputs
- Maintainability: structural consistency across data schema, API validation, and client state shape, plus clean lint/format compliance

These NFRs indicate that consistency, validation, and failure handling are architectural priorities equal to the CRUD feature set itself.

**Scale & Complexity:**

This is a low-complexity product in business/domain terms, but it has medium implementation-discipline requirements because the UX and reliability promises are strict and highly testable.

- Primary domain: full-stack web application
- Complexity level: low domain complexity / medium implementation-discipline complexity
- Estimated architectural components: 8

Likely component areas:
- Client application shell and routing-free view composition
- Todo list and derived-view/query logic
- Edit/enrichment interaction layer
- Application state orchestration for optimistic updates and rollback
- API layer
- Validation/request handling layer
- Persistence/data access layer
- Local environment/runtime infrastructure

### Technical Constraints & Dependencies

Known constraints and dependencies from the loaded documents:
- Web app only; no native app and no offline mode in v1
- Local Docker Compose startup is a required operating model for v1
- Automatic database readiness handling and schema application are expected
- The architecture should preserve a clean path to future authentication and multi-user support
- Mobile and desktop require different interaction patterns while preserving the same product behavior
- The product must maintain a minimal, no-friction capture flow at all times
- Existing planning artifacts strongly suggest a schema-first, consistency-oriented implementation approach
- Time-based behavior for the Expiring view must be defined clearly enough to remain predictable and testable

### Cross-Cutting Concerns Identified

The following concerns affect multiple architectural areas and will need explicit decisions later:
- Data model consistency across persistence, API contracts, and client state
- Optimistic UI updates with safe rollback on failure
- Input preservation and retry behavior for failed create/edit actions
- Deterministic derived-view behavior, especially for Important, Expiring, and Completed
- Validation at both interaction and API boundaries
- Responsive behavior with mobile-specific interaction adaptations
- Accessibility baked into navigation, focus management, and form behavior
- Local developer experience and startup reliability
- Clear separation between fast capture flows and richer enrichment flows
- Failure-path testability for create, update, delete, and completion actions

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application with a monorepo structure, based on the project requirements analysis.

The project is not best served by an all-in-one full-stack framework starter because the planning artifacts already point to a separated architecture:
- React SPA frontend
- Fastify REST API backend
- PostgreSQL persistence
- Docker Compose local environment

That makes this primarily a **monorepo foundation selection** problem rather than a search for a batteries-included app framework.

### Starter Options Considered

**1. Nx React Monorepo**
- Current research shows an actively maintained `create-nx-workspace@latest` flow, with current documentation/search results aligned to Nx v21
- Supports a React monorepo foundation with `Vite`
- Provides strong workspace conventions, project graph tooling, generators, task orchestration, and good long-term monorepo ergonomics
- Better aligned than generic full-stack starters because it supports a clean separation between frontend and backend apps

**Assessment:** Best fit for this project's planned structure and future growth.

**2. Turborepo with Vite Example**
- Officially maintained through `create-turbo@latest`
- Good monorepo foundation and task pipeline
- Strong for package/workspace management, but less opinionated about backend application structure
- Would require more manual setup to establish consistent conventions for the Fastify API and related tooling

**Assessment:** Viable alternative, but more manual architectural assembly than Nx for this project.

**3. Create T3 App / T3 Turbo**
- Actively maintained and modern
- Strong developer experience
- Built around Next.js and the T3 stack, which does not match the documented target architecture
- Would push the project toward a framework-centered full-stack model rather than the planned React SPA + Fastify REST split

**Assessment:** Not a good fit for the architecture already established in the planning artifacts.

### Selected Starter: Nx React Monorepo

**Rationale for Selection:**

Nx is the strongest fit because it gives us a maintained, current monorepo foundation without forcing the project into an incompatible framework shape.

Why this starter fits the project:
- Matches the planned monorepo architecture
- Supports the desired React + Vite frontend direction
- Leaves room to generate and organize the Fastify backend cleanly
- Improves developer productivity through consistent workspace tooling
- Scales cleanly if authentication, shared libraries, or additional apps are introduced later
- Avoids the mismatch of Next.js-centric starters while being more structured than a bare Turborepo setup

This is also consistent with the project's broader architectural theme: choose boring, reliable foundations that preserve clarity and consistency.

**Initialization Command:**

```bash
npx create-nx-workspace@latest simple-todo-bmad --preset=react-monorepo --bundler=vite
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
Nx establishes a modern JavaScript/TypeScript-friendly monorepo foundation on Node.js tooling. In practice, the workspace is TypeScript-first by default, which is beneficial for schema consistency across layers even if some implementation remains JavaScript-leaning initially.

**Styling Solution:**
The selected starter does not force the final UI system. This is a benefit here, because the UX specification already identifies `Tailwind CSS` + `shadcn/ui` as the desired design-system foundation. Those can be added intentionally rather than inherited accidentally from a mismatched starter.

**Build Tooling:**
The selected starter uses `Vite` for the frontend path, which aligns directly with the planning artifacts and supports the fast local feedback loop required by the product's development goals.

**Testing Framework:**
Nx provides a structured testing foundation and workspace-level task orchestration, even though exact test tooling choices for frontend and backend can still be finalized in later architectural decisions.

**Code Organization:**
Nx establishes a clear monorepo structure and conventions for apps and shared code. This supports the intended split between `client/` and `server/` responsibilities, even if the final folder naming is adjusted during implementation.

**Development Experience:**
Nx provides strong developer ergonomics for a growing monorepo:
- consistent task running
- project graph visibility
- generators for adding applications and libraries
- good long-term maintainability for shared code and future expansion

**Note:** Project initialization using this command should be the first implementation story. The Fastify backend, Tailwind CSS, shadcn/ui, Prisma, and Docker Compose setup should be added immediately after workspace initialization as the next foundational tasks.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Monorepo foundation: `Nx` with a `React` + `Vite` frontend path and separately organized backend application structure
- Runtime baseline: `Node.js 24.x LTS`
- Data architecture: `PostgreSQL` + `Prisma 7.4.2` with schema-first consistency across persistence, API validation, and client state
- Validation strategy: boundary validation at client UX layer, API schema layer, and database constraint layer
- Migration workflow: checked-in Prisma migrations, auto-applied on startup for local/dev workflow
- API style: REST-based `/todos` resource API
- Error contract: standardized JSON error envelope across all non-2xx responses
- Frontend state approach: `Zustand 5.0.11` for shared app/data state, local component state for transient UI state
- Runtime model: local `Docker Compose` as the official MVP environment

**Important Decisions (Shape Architecture):**
- Frontend library: `React 19.2`
- API framework: `Fastify 5.8.2`
- Styling foundation: `Tailwind CSS 4.2.1` plus `shadcn/ui`
- UI architecture: single-screen SPA with tab/view state rather than route-heavy navigation
- Component organization: feature-oriented structure around capture, list, item, filters, and edit flows
- API documentation: OpenAPI derived from Fastify route schemas
- Security baseline: standard Fastify hardening middleware, sanitized production errors, env-only secrets
- Rate limiting: baseline rate limiting, with tighter rules optional on write endpoints
- Monitoring/logging: structured logs plus a health check endpoint
- CI approach: lightweight CI for lint, tests, and build validation

**Deferred Decisions (Post-MVP):**
- Authentication method, intentionally deferred from MVP
- Authorization model, intentionally deferred from MVP
- Field-level encryption, not required for MVP
- Dedicated caching layer, deferred because MVP scale does not justify it
- Distributed/background processing patterns, deferred because the product does not require them
- Horizontal scaling infrastructure, deferred until real usage requires it

### Data Architecture

- **Database:** `PostgreSQL`
  - Chosen because it fits the relational domain cleanly and preserves a straightforward path to future `user_id`-based multi-user support
- **ORM and schema source:** `Prisma 7.4.2`
  - Prisma is the canonical persistence model and source of truth for the domain schema
- **Data modeling approach:** schema-first coherence
  - The database schema, API contracts, and client state shape should remain structurally aligned around the same `Todo` model
- **Validation strategy:** layered boundary validation
  - Client validates for user experience and immediate feedback
  - Fastify validates request and response payloads at the API boundary
  - Database constraints protect persisted integrity
- **Migration strategy:** checked-in migrations applied automatically on startup in local/dev
  - Supports the product requirement of one-command startup
- **Caching strategy:** no dedicated cache in MVP
  - Query volume and usage pattern do not justify cache complexity yet

### Authentication & Security

- **Authentication:** deferred from MVP
  - Architecture should preserve a clean extension path for future auth without restructuring the app
- **Authorization:** deferred from MVP
  - Schema and request handling should remain ready for future ownership semantics such as `user_id`
- **Security middleware:** standard Fastify hardening defaults
  - Restrictive CORS for local frontend origins
  - Security headers
  - Request/body size limits
- **Encryption approach:** no field-level encryption in MVP
  - Secrets remain environment-driven; no hardcoded credentials in source
- **API security strategy:** validation-first API with sanitized errors and baseline rate limiting
  - Protects reliability and reduces the chance of fragile or inconsistent failure modes

### API & Communication Patterns

- **API design:** REST
  - Resource-oriented `/todos` endpoints match the product scope and keep the contract explicit
- **Primary communication pattern:** direct frontend-to-backend HTTP only
  - No event bus, worker topology, or distributed messaging in MVP
- **Documentation approach:** OpenAPI generated from Fastify route schemas
  - Keeps implementation and documentation close together
- **Error handling standard:** uniform JSON error envelope
  - Responses should use a consistent structure such as `error.code`, `error.message`, and optional `error.details`
- **Rate limiting:** baseline rate limiting enabled
  - Can be tightened for write endpoints later if needed

### Frontend Architecture

- **Frontend framework:** `React 19.2`
- **Shared state management:** `Zustand 5.0.11`
  - Used for canonical todo data, loading/error status, and server-backed UI coordination
- **Local UI state:** component-local state for transient interactions
  - Especially important for edit drawer form state and temporary UI behavior
- **Routing strategy:** single-screen SPA with tab/view switching
  - Filtered views are part of one interaction canvas, not separate pages
- **Component architecture:** feature-oriented organization
  - Capture flow
  - Todo list and item rendering
  - Filter/view switching
  - Edit drawer and enrichment flow
- **Performance strategy:** simplicity-first optimization
  - Small dependency surface
  - Minimal rerenders
  - Optimistic updates
  - No premature virtualization or advanced rendering complexity
- **Bundle strategy:** rely on Vite defaults plus dependency discipline

### Infrastructure & Deployment

- **Workspace/runtime baseline:** `Node.js 24.x LTS`
- **Monorepo tooling:** `Nx`
- **Official MVP runtime:** local `Docker Compose`
  - This is the supported first-run path and should remain the canonical local environment
- **Environment configuration:** environment-variable driven setup with a working `.env.example`
- **Startup orchestration:** backend startup must wait for database readiness before migration and server boot
- **Health monitoring:** `GET /health` endpoint plus structured logs
- **CI/CD approach:** lightweight CI for lint, tests, and build checks
- **Scaling strategy:** single-instance assumptions in MVP, with modular boundaries preserved for future scaling

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize the Nx monorepo foundation
2. Add the frontend and backend app structure
3. Establish environment configuration and Docker Compose services
4. Define the Prisma schema and checked-in migrations
5. Implement Fastify route schemas and standardized error handling
6. Build the canonical client state layer in Zustand
7. Implement the capture flow and derived-view logic
8. Add edit/enrichment interactions and failure-recovery behavior
9. Add health checks, structured logging, and CI quality gates

**Cross-Component Dependencies:**
- The Prisma schema drives both persistence and the canonical todo shape used by API and client
- API schema validation and standardized error envelopes are required for optimistic UI rollback and reliable failure handling
- Frontend state boundaries depend on the API contract staying stable and predictable
- Docker Compose startup behavior depends on environment configuration and migration strategy
- Deferred authentication is only safe because the data model and API are being kept future-compatible from the start

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 major areas where AI agents could make different choices and create incompatibilities:
- Naming
- Structure
- Format
- Communication
- Process

### Naming Patterns

**Database Naming Conventions:**
- Database tables use lowercase singular model naming in Prisma models and Prisma-managed table mapping unless a later migration requires explicit mapping
- Database columns use `snake_case`
- Primary keys use `id`
- Foreign keys use `<entity>_id`
- Timestamp columns use `created_at`, `updated_at`, `completed_at` at the database layer if mapped explicitly
- Example:
  - table/model concept: `Todo`
  - columns: `id`, `created_at`, `completed_at`, `user_id`

**API Naming Conventions:**
- REST endpoints use plural resource naming
  - `/todos`
- Route parameters use `:id` in framework route definitions
- Query parameters use `camelCase`
  - `category`, `view`, `dueBefore`
- Custom headers should be avoided unless required
- Health endpoint is `GET /health`

**Code Naming Conventions:**
- React components use `PascalCase`
  - `TodoItem`, `EditTodoDrawer`
- Component filenames use `PascalCase.tsx`
- Utility, hook, and store filenames use `kebab-case.ts` only when they represent modules, otherwise align with existing workspace conventions
- Functions and variables use `camelCase`
  - `createTodo`, `todoId`, `isSaving`
- Types/interfaces/schema objects use `PascalCase`
  - `Todo`, `CreateTodoInput`, `TodoResponse`

### Structure Patterns

**Project Organization:**
- Organize frontend code by feature first, not by generic type buckets
- Keep backend code layered by responsibility
- Tests should be co-located with the unit they validate where practical
- Shared types/contracts belong in a shared library only when genuinely used by multiple apps
- Avoid premature shared-package extraction

**File Structure Patterns:**
- Frontend feature areas should map to user flows:
  - capture
  - todo-list
  - filters
  - edit-drawer
- Backend should separate:
  - routes
  - schemas
  - services
  - repositories/data access
- Configuration should live close to the app that owns it, with root-level workspace config only for monorepo-wide concerns
- Environment examples live at the root as `.env.example`

### Format Patterns

**API Response Formats:**
- Successful reads may return direct resource data for simple endpoints
- Mutation endpoints should return the canonical saved todo resource
- Error responses must always use a consistent JSON envelope:
  - `error.code`
  - `error.message`
  - optional `error.details`
- Validation failures should be machine-readable and field-specific where possible

**Data Exchange Formats:**
- API JSON fields use `camelCase`
- Dates in API payloads use ISO 8601 strings
- Booleans use native JSON `true` / `false`
- Missing optional values use `null`, not empty strings or omitted semantics that vary by endpoint
- Collections return arrays, even when empty

### Communication Patterns

**Event System Patterns:**
- No distributed event bus in MVP
- Frontend-to-backend communication is synchronous HTTP only
- Client-side action names should be verb-first and explicit:
  - `fetchTodos`
  - `createTodo`
  - `updateTodo`
  - `completeTodo`
  - `deleteTodo`
- Avoid ambiguous action names like `save` or `submit` at the store layer

**State Management Patterns:**
- Zustand holds canonical shared app state:
  - todos
  - active view/filter state
  - request/loading/error state that affects multiple components
- Local component state holds transient UI state:
  - drawer open/close
  - unsaved form edits
  - temporary input text
- State updates must be immutable in style, even if helper libraries are introduced later
- Derived views should be computed from a canonical todo collection, not stored as separate duplicated arrays

### Process Patterns

**Error Handling Patterns:**
- Never fail silently
- User-facing errors must be specific enough to support retry or correction
- Logging detail and user-facing messaging must be separated
- Optimistic UI changes must have a defined rollback path on failure
- Validation errors keep the user in context and preserve entered data

**Loading State Patterns:**
- Every async operation has an explicit loading state
- Use local loading indicators for local actions and shared loading state only when multiple components need awareness
- Initial page load, create, update, complete, reopen, and delete each need explicit loading/error handling behavior
- Loading UI should preserve layout stability where possible

### Enforcement Guidelines

**All AI Agents MUST:**
- Preserve schema-first consistency across database model, API contract, and client state
- Use the standardized error envelope for all non-2xx API responses
- Keep derived todo views computed from canonical state rather than duplicating source data
- Follow the feature-oriented frontend structure and layered backend structure
- Use ISO date strings in API contracts and `camelCase` JSON fields
- Preserve user input on failed create or edit flows

**Pattern Enforcement:**
- Verify patterns during story implementation review and before marking a story complete
- Treat deviations in naming, API shape, or state duplication as architectural issues, not stylistic preferences
- Update the architecture document before intentionally changing a pattern

### Pattern Examples

**Good Examples:**
- `POST /todos` returns the saved todo object in canonical API shape
- `PATCH /todos/:id` returns the updated todo object, not a custom confirmation wrapper
- `TodoItem.tsx` renders a single todo row; `TodoList.tsx` owns list rendering; `EditTodoDrawer.tsx` owns enrichment editing UI
- Zustand store keeps one canonical `todos` array and computes `importantTodos` or `expiringTodos` via selectors/helpers

**Anti-Patterns:**
- Mixing `snake_case` and `camelCase` in API payloads
- Returning one error shape for validation and another for persistence failures
- Storing separate arrays for `allTodos`, `importantTodos`, and `expiringTodos` as independent sources of truth
- Putting all frontend components into a single generic `components/` bucket with no feature boundaries
- Hiding write failures behind generic toast messages without preserving user input

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
simple-todo-bmad/
├── README.md
├── package.json
├── nx.json
├── tsconfig.base.json
├── .gitignore
├── .env.example
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── client/
│   │   ├── project.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── index.html
│   │   ├── public/
│   │   │   └── favicon.ico
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── styles/
│   │       │   └── globals.css
│   │       ├── app/
│   │       │   ├── providers/
│   │       │   │   └── AppProviders.tsx
│   │       │   └── layout/
│   │       │       ├── AppShell.tsx
│   │       │       └── MainHeader.tsx
│   │       ├── features/
│   │       │   ├── capture/
│   │       │   │   ├── components/
│   │       │   │   │   └── CreateTodoInput.tsx
│   │       │   │   └── hooks/
│   │       │   │       └── useCreateTodo.ts
│   │       │   ├── todos/
│   │       │   │   ├── components/
│   │       │   │   │   ├── TodoItem.tsx
│   │       │   │   │   ├── TodoList.tsx
│   │       │   │   │   └── TodoTimestamp.tsx
│   │       │   │   ├── hooks/
│   │       │   │   │   └── useVisibleTodos.ts
│   │       │   │   └── utils/
│   │       │   │       ├── isTodoExpiring.ts
│   │       │   │       └── sortTodos.ts
│   │       │   ├── filters/
│   │       │   │   ├── components/
│   │       │   │   │   ├── ViewTabs.tsx
│   │       │   │   │   └── CategoryFilter.tsx
│   │       │   │   └── utils/
│   │       │   │       └── getFilteredTodos.ts
│   │       │   ├── edit-todo/
│   │       │   │   ├── components/
│   │       │   │   │   ├── EditTodoDrawer.tsx
│   │       │   │   │   ├── EditTodoForm.tsx
│   │       │   │   │   └── ImportanceToggle.tsx
│   │       │   │   └── hooks/
│   │       │   │       └── useEditTodoDraft.ts
│   │       │   └── feedback/
│   │       │       ├── components/
│   │       │       │   ├── EmptyState.tsx
│   │       │       │   ├── ErrorBanner.tsx
│   │       │       │   └── LoadingState.tsx
│   │       │       └── utils/
│   │       │           └── getUserFacingError.ts
│   │       ├── store/
│   │       │   ├── todoStore.ts
│   │       │   ├── selectors.ts
│   │       │   └── types.ts
│   │       ├── services/
│   │       │   ├── apiClient.ts
│   │       │   └── todoApi.ts
│   │       ├── lib/
│   │       │   ├── constants.ts
│   │       │   ├── date.ts
│   │       │   └── utils.ts
│   │       └── test/
│   │           ├── setup.ts
│   │           └── utils.tsx
│   └── server/
│       ├── project.json
│       ├── tsconfig.json
│       ├── src/
│       │   ├── main.ts
│       │   ├── app/
│       │   │   ├── buildServer.ts
│       │   │   ├── registerPlugins.ts
│       │   │   └── registerRoutes.ts
│       │   ├── config/
│       │   │   ├── env.ts
│       │   │   └── constants.ts
│       │   ├── plugins/
│       │   │   ├── cors.ts
│       │   │   ├── helmet.ts
│       │   │   ├── rateLimit.ts
│   │       │   └── sensible.ts
│       │   ├── routes/
│       │   │   ├── health/
│       │   │   │   ├── health.route.ts
│       │   │   │   └── health.schema.ts
│       │   │   └── todos/
│       │   │       ├── todos.route.ts
│       │   │       └── todos.schema.ts
│       │   ├── services/
│       │   │   └── todo.service.ts
│       │   ├── repositories/
│       │   │   └── todo.repository.ts
│       │   ├── mappers/
│       │   │   └── todo.mapper.ts
│       │   ├── errors/
│       │   │   ├── appError.ts
│       │   │   ├── errorCodes.ts
│       │   │   └── toErrorResponse.ts
│       │   ├── lib/
│       │   │   ├── logger.ts
│       │   │   ├── prisma.ts
│       │   │   └── dates.ts
│       │   └── test/
│       │       ├── setup.ts
│       │       └── helpers.ts
│       └── prisma/
│           ├── schema.prisma
│           ├── migrations/
│           └── seed.ts
├── libs/
│   └── shared/
│       ├── project.json
│       ├── tsconfig.json
│       └── src/
│           ├── todo/
│           │   ├── todo.types.ts
│           │   ├── todo.constants.ts
│           │   └── todo.schemas.ts
│           ├── api/
│           │   ├── error.types.ts
│           │   └── response.types.ts
│           └── index.ts
├── scripts/
│   └── wait-for-postgres.sh
└── tests/
    └── e2e/
        ├── client/
        │   └── todo-flow.spec.ts
        └── server/
            └── todos-api.spec.ts
```

### Architectural Boundaries

**API Boundaries:**
- The backend exposes only:
  - `GET /health`
  - `GET /todos`
  - `POST /todos`
  - `PATCH /todos/:id`
  - `DELETE /todos/:id`
- Route registration lives in `apps/server/src/routes`
- Request/response schemas are defined at the route boundary
- The repository layer is never imported directly by the frontend
- Authentication middleware is not active in MVP, but the route registration structure should allow it to be inserted later

**Component Boundaries:**
- `apps/client/src/features/capture` owns fast-create behavior only
- `apps/client/src/features/todos` owns canonical list rendering and item display
- `apps/client/src/features/filters` owns view switching and category filtering UI
- `apps/client/src/features/edit-todo` owns enrichment interactions and draft edit state
- `apps/client/src/features/feedback` owns reusable empty/loading/error states
- Shared app state lives in `store/`; transient drawer/input state stays in feature-local hooks/components

**Service Boundaries:**
- `todoApi.ts` is the only frontend module that knows endpoint details
- `todoStore.ts` coordinates optimistic state transitions and rollback
- `todo.service.ts` contains business rules on the backend
- `todo.repository.ts` is the only backend layer that talks directly to Prisma
- `todo.mapper.ts` controls translation between persistence objects and API output shapes

**Data Boundaries:**
- Prisma schema in `apps/server/prisma/schema.prisma` is the persistence source of truth
- Shared domain types and contract helpers live in `libs/shared`
- API payloads use `camelCase`; DB persistence may use mapped `snake_case`
- No cache layer exists in MVP
- No third-party data integrations exist in MVP

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
- Todo Management
  - Client: `apps/client/src/features/capture`, `apps/client/src/features/todos`
  - Server: `apps/server/src/routes/todos`, `services/todo.service.ts`, `repositories/todo.repository.ts`
  - Database: `apps/server/prisma/schema.prisma`, `migrations/`
  - Tests: `tests/e2e/client/todo-flow.spec.ts`, `tests/e2e/server/todos-api.spec.ts`
- Todo Enrichment
  - Client: `apps/client/src/features/edit-todo`
  - Server: same `todos` route/service/repository flow
  - Shared contracts: `libs/shared/src/todo`
- Filtering & Views
  - Client: `apps/client/src/features/filters`, `apps/client/src/features/todos/hooks/useVisibleTodos.ts`
  - Shared logic: `getFilteredTodos.ts`, `isTodoExpiring.ts`
- User Interface & Experience
  - Client layout and feedback: `app/layout`, `features/feedback`
- Feedback & System States
  - Client: `features/feedback`, `store/todoStore.ts`
  - Server: `errors/`, standardized error mapping
- Infrastructure & Setup
  - Root: `docker-compose.yml`, `.env.example`, `.github/workflows/ci.yml`, `scripts/wait-for-postgres.sh`
  - Server: `config/env.ts`, `routes/health`

**Cross-Cutting Concerns:**
- Error handling
  - Client: `features/feedback/utils/getUserFacingError.ts`
  - Server: `errors/`, `toErrorResponse.ts`
- Schema consistency
  - Server Prisma schema + route schemas + `libs/shared/src/todo`
- Logging and observability
  - Server: `lib/logger.ts`, `routes/health`
- Future auth extension point
  - Server: `plugins/`, route registration pipeline, future middleware insertion point

### Integration Points

**Internal Communication:**
- UI components call store actions
- Store actions call `todoApi`
- `todoApi` calls Fastify endpoints over HTTP
- Fastify routes call service layer
- Service layer calls repository layer
- Repository layer uses Prisma client
- Mappers normalize API output before returning to the client

**External Integrations:**
- PostgreSQL via Prisma
- Docker Compose for local orchestration
- GitHub Actions for CI
- No other external service dependencies in MVP

**Data Flow:**
- Create flow:
  - user submits text in `CreateTodoInput`
  - store performs optimistic insert
  - `todoApi.createTodo` sends request
  - server validates input, persists todo, returns canonical todo
  - store reconciles or rolls back on failure
- Edit flow:
  - user opens `EditTodoDrawer`
  - local draft state manages unsaved form changes
  - save action triggers store update + API request
  - server persists and returns canonical todo
- Filter flow:
  - store holds canonical `todos`
  - selectors/helpers derive All, Important, Expiring, Completed views

### File Organization Patterns

**Configuration Files:**
- Root-level files own workspace, Docker, CI, and shared environment examples
- App-local config stays inside each app
- Prisma assets stay under `apps/server/prisma`

**Source Organization:**
- Frontend is feature-first
- Backend is layered by routes, schemas, services, repositories, and supporting infrastructure
- Shared contracts are extracted only into `libs/shared`

**Test Organization:**
- Lightweight unit/integration tests are co-located or app-local under each app’s `test/`
- Cross-app end-to-end tests live in root `tests/e2e`
- API and UI flows both receive coverage

**Asset Organization:**
- Client static assets live in `apps/client/public`
- No complex asset pipeline is needed for MVP
- Server owns no public asset directory beyond runtime needs

### Development Workflow Integration

**Development Server Structure:**
- Nx runs client and server as separate apps
- Docker Compose runs PostgreSQL plus app dependencies needed for local development
- `wait-for-postgres.sh` gates backend startup before migrations and boot

**Build Process Structure:**
- Each app builds independently through Nx targets
- Shared code in `libs/shared` is consumed by both apps
- Prisma schema and migrations are part of the server build/runtime workflow, not the client build

**Deployment Structure:**
- The structure supports the MVP’s local-first deployment model directly
- Root-level Docker and env config make first-run setup predictable
- The app/server split leaves room for future hosted deployment without restructuring the domain

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All core technology and architecture decisions are compatible and mutually reinforcing. The selected stack (`Nx`, `React`, `Vite`, `Fastify`, `PostgreSQL`, `Prisma`, `Zustand`, `Tailwind CSS`, `shadcn/ui`) supports the product’s requirements without introducing unnecessary complexity. Deferred decisions such as authentication and caching are appropriately excluded from MVP while preserving future extension paths.

**Pattern Consistency:**
The implementation patterns support the architectural decisions well. Naming rules, API formats, state boundaries, and error-handling patterns are aligned with the chosen technologies and with the schema-first consistency principle. The patterns are specific enough to reduce AI-agent drift while still leaving room for practical implementation details.

**Structure Alignment:**
The project structure supports the selected architecture and the implementation patterns. The `apps/client`, `apps/server`, and `libs/shared` split reflects clear responsibility boundaries, and the feature-first frontend organization plus layered backend organization aligns with the requirements and the consistency rules.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
All identified product feature areas are architecturally supported:
- Todo creation, editing, completion, reopening, and deletion
- Enrichment via category, due date, description, and importance
- Filtered views: All, Important, Expiring, Completed
- Loading, error, empty, retry, and rollback behavior
- Docker-first startup and health-check support

**Functional Requirements Coverage:**
All functional requirement categories from the PRD are covered by the architecture:
- Todo Management
- Todo Enrichment
- Filtering & Views
- User Interface & Experience
- Feedback & System States
- Infrastructure & Setup

There are no missing architectural capabilities blocking implementation of the documented features.

**Non-Functional Requirements Coverage:**
The non-functional requirements are architecturally addressed:
- Performance: lightweight SPA, direct REST API, simplicity-first design
- Reliability: rollback paths, explicit error handling, migration strategy, startup orchestration
- Security: env-only secrets, sanitized errors, security middleware baseline
- Accessibility: supported by UX decisions, component patterns, and chosen UI primitives
- Maintainability: schema-first consistency, clear boundaries, documented patterns, structured monorepo layout

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical architectural decisions are documented with versions where appropriate, and deferred decisions are clearly identified. The architecture provides enough direction for implementation stories to proceed consistently.

**Structure Completeness:**
The project structure is specific and complete enough to guide implementation. App boundaries, integration points, shared code locations, and infrastructure files are all defined.

**Pattern Completeness:**
The implementation patterns cover the main areas where AI agents could diverge:
- naming
- format
- structure
- communication
- process

This should significantly reduce incompatible implementation choices across different stories or agents.

### Gap Analysis Results

**Critical Gaps:**
- None identified

**Important Gaps:**
- The exact rule for what qualifies as an `Expiring` todo could be made more explicit during implementation planning
- The precise strategy for keeping Fastify schemas and shared contract definitions synchronized may still need one concrete implementation convention

**Nice-to-Have Gaps:**
- CI commands can be made more explicit later
- Logging format details can be refined during implementation
- A small appendix of canonical API examples could help future contributors, but is not required for MVP readiness

### Validation Issues Addressed

No critical architectural issues were found during validation.

The few remaining gaps are intentionally non-blocking and are appropriate to defer to implementation planning, where they can be resolved without changing the architecture’s overall shape.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Strong alignment between product contract, UX, and technical architecture
- Low-complexity architecture with disciplined boundaries
- Clear schema-first consistency model across persistence, API, and client
- Explicit patterns that reduce AI-agent implementation drift
- Practical project structure optimized for a solo-developer full-stack workflow

**Areas for Future Enhancement:**
- Add an authentication extension design when Phase 2 begins
- Refine Expiring-view business rules during implementation
- Expand CI and logging detail once the first implementation stories are in place

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
Initialize the Nx workspace foundation, then establish the frontend app, backend app, shared library, environment configuration, Docker Compose services, and Prisma schema before building feature-level stories.
