# Story 2.6: All View & Completed View with Empty States

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user navigating between my active and completed todos,
I want tab navigation between the All and Completed views with empty states for each,
So that I can quickly switch context between what I need to do and what I've already done.

## Acceptance Criteria

1. **Given** the app renders **When** I view the tab navigation **Then** tabs for `All` and `Completed` are visible and the `All` tab is active by default
2. **Given** I click/tap the `Completed` tab **When** the view switches **Then** only completed todos are shown, each with their `completedAt` timestamp, and no incomplete todos appear
3. **Given** I click/tap the `All` tab **When** the view switches **Then** only active (incomplete) todos are shown — no completed todos appear in this view
4. **Given** a todo is marked complete while viewing the `All` tab **When** the completion is confirmed **Then** the todo is no longer visible in the `All` view
5. **Given** there are no todos in the current view **When** the view renders **Then** a contextually relevant empty state message is displayed for that specific view
6. **Given** view switching occurs **When** the tab is clicked **Then** the transition is instant — no page load, no network request

## Tasks / Subtasks

- [x] Tab nav: All (default) and Completed (AC: 1)
- [x] Completed tab: only completed todos + completedAt (AC: 2)
- [x] All tab: only active todos (AC: 3)
- [x] Complete from All removes from All view (AC: 4)
- [x] Empty states per view (AC: 5)
- [x] Instant tab switch, no reload (AC: 6)

## Dev Notes

- Derived views from canonical todos (architecture); no separate stored arrays
- Empty state copy per view (FR31). View state in Zustand
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Views]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.6]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
