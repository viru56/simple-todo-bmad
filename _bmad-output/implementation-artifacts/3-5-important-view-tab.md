# Story 3.5: Important View Tab

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user who flags priority todos,
I want a dedicated Important view that shows only active todos I've flagged as important,
So that I can focus on my priorities without manually scanning the full list.

## Acceptance Criteria

1. **Given** the app renders with existing views **When** I view the tab navigation **Then** an `Important` tab is visible alongside `All` and `Completed`
2. **Given** I click/tap the `Important` tab **When** the view renders **Then** only active todos with `important = true` are shown — completed todos are excluded
3. **Given** a todo is flagged as important via the edit drawer **When** I switch to the Important view **Then** that todo appears in the Important view automatically
4. **Given** a todo in the Important view is marked complete **When** the completion is confirmed **Then** the todo is immediately removed from the Important view
5. **Given** there are no important active todos **When** the Important view renders **Then** a contextually appropriate empty state is shown

## Tasks / Subtasks

- [x] Add Important tab to navigation (AC: 1)
- [x] Filter: active todos with important === true (AC: 2, 3)
- [x] Complete removes from Important view (AC: 4)
- [x] Empty state for Important (AC: 5)

## Dev Notes

- Derived view from canonical todos (filter important + active). No separate storage
- Smart views surface right todos automatically (UX)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Smart views]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.5]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
