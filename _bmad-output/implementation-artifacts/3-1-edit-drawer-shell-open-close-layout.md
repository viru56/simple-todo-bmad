# Story 3.1: Edit Drawer Shell — Open, Close & Layout

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user who wants to enrich a todo,
I want to open a drawer for any todo that shows its details without leaving the list,
So that I can access the edit surface while keeping my list context intact.

## Acceptance Criteria

1. **Given** a user clicks/taps on a todo item (not on the complete or delete controls) **When** the interaction is triggered **Then** the edit drawer opens — as a bottom sheet on mobile and as a side panel on desktop
2. **Given** the edit drawer is open on mobile **When** I inspect the layout **Then** it renders as a bottom sheet anchored to the bottom of the screen, sliding up from below
3. **Given** the edit drawer is open on desktop **When** I inspect the layout **Then** it renders as a side panel alongside the todo list — the list remains visible and interactive
4. **Given** the edit drawer is open **When** the user presses `Escape` or taps outside the drawer (on mobile overlay) **Then** the drawer closes without saving any changes
5. **Given** the edit drawer is open **When** the drawer closes **Then** focus returns to the todo item that triggered the open

## Tasks / Subtasks

- [x] Open drawer on todo click (not complete/delete) (AC: 1)
- [x] Mobile: bottom sheet (AC: 2)
- [x] Desktop: side panel, list visible (AC: 3)
- [x] Escape / tap outside closes without save (AC: 4)
- [x] Focus return to todo item on close (AC: 5)

## Dev Notes

- Edit drawer = signature interaction (UX): bottom sheet on mobile, side panel on desktop
- Progressive disclosure; list context always preserved. Radix/shadcn for sheet/dialog
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Edit drawer]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.1]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
