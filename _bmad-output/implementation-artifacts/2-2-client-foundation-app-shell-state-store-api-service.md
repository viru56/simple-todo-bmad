# Story 2.2: Client Foundation — App Shell, State Store & API Service

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer building the frontend,
I want the application shell, Zustand store, and API service layer scaffolded,
So that all feature UI components have a consistent foundation to build on.

## Acceptance Criteria

1. **Given** the client app is loaded in the browser **When** the page renders **Then** the app shell (`AppShell.tsx`) renders with a header and the main content area, and the browser tab displays a meaningful title
2. **Given** the client app loads **When** Tailwind CSS and shadcn/ui are configured **Then** the base stylesheet applies correctly and shadcn/ui components render as expected
3. **Given** the Zustand store is initialized **When** I inspect `apps/client/src/store/todoStore.ts` **Then** it holds a canonical `todos` array, active view state, and per-operation loading/error state — no duplicate derived arrays
4. **Given** the API service is configured **When** I inspect `apps/client/src/services/todoApi.ts` **Then** it is the only module that references API endpoint URLs, and all calls go through `apiClient.ts`
5. **Given** the client loads **When** the initial page load completes on localhost **Then** the page is interactive within 1 second (NFR2) **And** time to interactive does not exceed 2 seconds (NFR4)

## Tasks / Subtasks

- [x] Create AppShell.tsx with header and content area (AC: 1)
- [x] Set browser tab title (AC: 1)
- [x] Add Tailwind and shadcn/ui (AC: 2)
- [x] Create todoStore.ts: todos, view state, loading/error (AC: 3)
- [x] Create todoApi.ts and apiClient.ts (AC: 4)
- [x] Verify TTI within 2s (AC: 5)

## Dev Notes

- Zustand 5.0.11 for canonical todos, view state, loading/error (architecture). No duplicate derived arrays
- Feature-first structure: capture, todos, filters, edit-todo, feedback (architecture)
- todoApi.ts is sole owner of API URLs; apiClient for HTTP. NFR2/NFR4: 1s load, 2s TTI
- [Source: _bmad-output/planning-artifacts/architecture.md — Frontend state, structure]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.2]

### References

- Architecture: _bmad-output/planning-artifacts/architecture.md
- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
