# Story 2.3: Todo Capture Input with Optimistic UI

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user who wants to capture a thought quickly,
I want an always-visible text input that creates a todo on Enter or Submit with immediate visual feedback,
So that I can capture tasks in under 5 seconds with zero friction and zero doubt it was saved.

## Acceptance Criteria

1. **Given** the app loads on desktop **When** the page finishes rendering **Then** the text input (`CreateTodoInput.tsx`) is auto-focused — the cursor is in the input without any click
2. **Given** the app loads on mobile **When** the page finishes rendering **Then** the text input is prominent and tappable but NOT auto-focused (no keyboard jank on load)
3. **Given** a user has typed text in the input **When** they press Enter (desktop) or tap the Submit button (mobile) **Then** the new todo prepends to the top of the active list immediately in a visually pending (slightly muted) state before server confirmation
4. **Given** the server confirms the create successfully **When** the response is received **Then** the pending todo snaps to full opacity and the input field clears and refocuses ready for the next capture
5. **Given** the create request fails **When** the error response is received **Then** the optimistic todo is removed from the list, the original input text is fully restored in the field, and a specific inline error message is shown (e.g., "Couldn't save. Check your connection.")
6. **Given** a user submits an empty input **When** the form is submitted **Then** nothing happens — no error message, no shake animation; the input stays focused

## Tasks / Subtasks

- [x] Create CreateTodoInput.tsx with desktop auto-focus, mobile no auto-focus (AC: 1, 2)
- [x] Wire Enter/Submit to create; optimistic prepend with pending state (AC: 3)
- [x] On success: full opacity, clear input, refocus (AC: 4)
- [x] On failure: remove optimistic item, restore input text, show error (AC: 5)
- [x] Empty submit: no-op (AC: 6)

## Dev Notes

- Capture first, one field, Enter/Submit (UX). Optimistic UI: immediate update, then confirm (FR32, NFR3)
- Desktop: auto-focus; mobile: no auto-focus (UX — keyboard jank). Pending state: slightly muted until confirmed
- Failure: input preserved, specific error, retry (FR33, FR34). Empty submit: silent no-op (UX)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Capture UX]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.3]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
