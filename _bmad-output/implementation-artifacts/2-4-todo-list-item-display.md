# Story 2.4: Todo List & Item Display

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user viewing my todos,
I want to see my active todos in a clean list with relevant metadata and quick-action controls,
So that I can scan and act on my tasks without navigating away from the list.

## Acceptance Criteria

1. **Given** the store has todos **When** the `TodoList.tsx` renders **Then** all active (incomplete) todos are displayed in a list, each showing the todo text and `createdAt` timestamp
2. **Given** the user is on desktop and hovers over a todo item **When** the hover state activates **Then** the complete and delete action controls become visible (hover-reveal pattern)
3. **Given** the user is on mobile **When** viewing a todo item **Then** the complete and delete controls are always visible with minimum 44×44px tap targets
4. **Given** a todo has a `completedAt` timestamp **When** it renders in the Completed view **Then** the completion timestamp is displayed alongside the todo text
5. **Given** the active todo list is empty **When** the `All` view renders **Then** a contextually appropriate empty state message is displayed

## Tasks / Subtasks

- [x] Create TodoList.tsx rendering active todos with text + createdAt (AC: 1)
- [x] Desktop: hover-reveal for complete/delete (AC: 2)
- [x] Mobile: always-visible complete/delete, 44×44px min (AC: 3)
- [x] Completed view: show completedAt (AC: 4)
- [x] Empty state for All view (AC: 5)

## Dev Notes

- UX: hover-reveal on desktop; always-visible 44×44px on mobile (thumb-reachable)
- Empty states: contextually appropriate per view (FR31)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — List, mobile/desktop]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.4]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
