# Story 3.3: Due Date & Importance Enrichment

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user who wants to prioritize and time-box my todos,
I want to set a due date and flag a todo as important via the edit drawer,
So that the smart filtered views can surface the right todos automatically.

## Acceptance Criteria

1. **Given** the edit drawer is open **When** I interact with the due date field **Then** a native `<input type="date">` is rendered — using the mobile-native date picker on mobile and the browser default on desktop
2. **Given** I select a due date and save **When** the save completes **Then** the todo's `dueDate` is updated via `PATCH /todos/:id` using an ISO 8601 date string
3. **Given** a todo already has a due date **When** I open the edit drawer **Then** the date input shows the current due date pre-filled
4. **Given** I clear the due date field and save **When** the save completes **Then** the todo's `dueDate` is set to `null`
5. **Given** the edit drawer is open **When** I view the importance toggle (`ImportanceToggle.tsx`) **Then** it shows a distinct visual state indicating whether the todo is currently flagged as important
6. **Given** I toggle the importance flag and save **When** the save completes **Then** the todo's `important` field is updated via `PATCH /todos/:id` and the toggle reflects the new state

## Tasks / Subtasks

- [x] Due date: native input type="date" (AC: 1, 2, 3, 4)
- [x] ImportanceToggle.tsx with distinct visual state (AC: 5, 6)
- [x] PATCH for dueDate and important; ISO 8601 for date

## Dev Notes

- UX: native date input (mobile-friendly). Importance = distinct accent (UX spec)
- ISO 8601 for API (architecture). Clear due date → null
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.3]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
