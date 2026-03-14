# Story 3.7: Category Filter on Active Todos

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user with todos across multiple categories,
I want to filter the active todo list by category,
So that I can focus on a specific area of my life without seeing unrelated todos.

## Acceptance Criteria

1. **Given** the app renders with the `All` view active **When** I view the category filter area (`CategoryFilter.tsx`) **Then** a filter control is visible showing the available categories derived from todos that have a category assigned
2. **Given** I select a category from the filter **When** the filter is applied **Then** only active todos matching that category are shown in the current view
3. **Given** a category filter is active **When** I clear the filter **Then** all active todos are shown again (unfiltered)
4. **Given** no todos have a category assigned **When** I view the category filter **Then** the filter control is empty or hidden — it does not show categories with zero todos
5. **Given** a category filter is active and I switch views (e.g., to Important) **When** the new view renders **Then** the category filter applies within that view as well

## Tasks / Subtasks

- [x] CategoryFilter.tsx: categories from todos with category (AC: 1, 4)
- [x] Apply filter: show only matching active todos (AC: 2)
- [x] Clear filter (AC: 3)
- [x] Filter applies across All/Important/Expiring (AC: 5)

## Dev Notes

- Categories derived from todos that have category assigned (no empty categories)
- Filter state in Zustand; applies to current view (All, Important, Expiring)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Filtering]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.7]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
