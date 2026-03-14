# Story 3.4: Edit Save, Failure Recovery & Inline Validation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user editing a todo,
I want save feedback, inline validation errors, and full input recovery on failure,
So that I can trust the drawer will never lose my changes silently and I always know how to fix validation issues.

## Acceptance Criteria

1. **Given** the edit drawer has unsaved changes **When** I tap/click the Save button **Then** a loading indicator is shown on the Save button while the `PATCH /todos/:id` request is in-flight
2. **Given** the save request completes successfully **When** the response is received **Then** the drawer closes, the todo in the list reflects the updated values, and no error is shown
3. **Given** the save request fails due to a network or server error **When** the error response is received **Then** the drawer remains open, all entered values are preserved exactly as typed, and a specific error message is shown (e.g., "Couldn't save. Check your connection.")
4. **Given** a validation error occurs (e.g., past due date) **When** the invalid field is identified **Then** the specific field is highlighted with an inline error message, the drawer stays open, and all other field values are preserved
5. **Given** a save fails and an error is shown **When** the user addresses the issue **Then** they can retry the save with one action without re-entering any data

## Tasks / Subtasks

- [x] Save button loading state during PATCH (AC: 1)
- [x] Success: close drawer, update list (AC: 2)
- [x] Network/server error: preserve values, show message (AC: 3)
- [x] Validation errors: inline per field, preserve others (AC: 4)
- [x] Retry without re-entering (AC: 5)

## Dev Notes

- Failure UX first-class: preserve input, specific error, retry (UX — Sam's moment). FR35: inline validation
- No silent loss; drawer stays open on failure with values intact
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Failure UX]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.4]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
