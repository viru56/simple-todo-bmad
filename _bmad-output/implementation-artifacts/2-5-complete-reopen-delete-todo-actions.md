# Story 2.5: Complete, Reopen & Delete Todo Actions

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user managing my todo list,
I want to mark todos complete, reopen them, and delete them with instant visual feedback and safe error recovery,
So that my list stays accurate and I never silently lose a change.

## Acceptance Criteria

1. **Given** a user clicks/taps the complete control on an active todo **When** the action is triggered **Then** the todo immediately shows a strikethrough animation and transitions out of the active list (optimistic) **And** if the server confirms success, the todo moves to the Completed view
2. **Given** a complete action fails on the server **When** the error response is received **Then** the todo is restored to the active list in its previous state and an error message is shown with a retry affordance
3. **Given** a user clicks/taps reopen on a completed todo **When** the action is triggered **Then** the todo immediately moves back to the active list (optimistic) and is removed from the Completed view on server confirmation
4. **Given** a user clicks/taps delete on a todo **When** the action is triggered **Then** the todo is immediately removed from the list (optimistic) and permanently deleted on server confirmation
5. **Given** a delete or reopen action fails **When** the error response is received **Then** the todo is restored to its previous state and a specific error message is displayed
6. **Given** any complete, reopen, or delete action is in-flight **When** the operation is pending **Then** a loading indicator is shown scoped to that item

## Tasks / Subtasks

- [x] Complete: optimistic strikethrough + move to Completed; rollback + error on failure (AC: 1, 2)
- [x] Reopen: optimistic move to active; rollback + error on failure (AC: 3, 5)
- [x] Delete: optimistic remove; rollback + error on failure (AC: 4, 5)
- [x] Per-item loading indicator during in-flight (AC: 6)

## Dev Notes

- Optimistic UI for complete, reopen, delete; rollback and specific error on failure (FR6, NFR5)
- Completion micro-interaction: strikethrough + clean exit (UX). Retry without re-entering (FR34)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Completion, failure]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.5]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
