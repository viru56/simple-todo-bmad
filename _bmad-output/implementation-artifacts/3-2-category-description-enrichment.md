# Story 3.2: Category & Description Enrichment

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user who wants to organize my todos,
I want to assign a category and add a description to any todo via the edit drawer,
So that I can add context and grouping information after capturing the todo.

## Acceptance Criteria

1. **Given** the edit drawer is open for a todo **When** I interact with the category field **Then** a dropdown (`Radix Select`) shows a predefined list of categories to choose from
2. **Given** I select a category from the dropdown **When** I save the todo **Then** the todo's `category` field is updated via `PATCH /todos/:id` and the updated todo reflects the selection
3. **Given** a todo already has a category assigned **When** I open the edit drawer **Then** the category dropdown shows the current value pre-selected
4. **Given** I want to remove a category from a todo **When** I clear/deselect the category field and save **Then** the todo's `category` is set to `null` and the field shows as unset
5. **Given** the edit drawer is open for a todo **When** I type in the description textarea **Then** I can enter free-form text of any length
6. **Given** I save a todo with a description **When** the save completes successfully **Then** the todo's `description` field is updated and reflected in the drawer on next open
7. **Given** I clear the description field and save **When** the save completes **Then** the todo's `description` is set to `null`

## Tasks / Subtasks

- [x] Category: Radix Select, predefined list (AC: 1, 2, 3, 4)
- [x] Description: textarea, free-form (AC: 5, 6, 7)
- [x] PATCH /todos/:id for category and description

## Dev Notes

- Predefined category list (source: architecture/PRD). Radix Select per AC
- Description optional; clear sets null. Same edit drawer shell as 3.1
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Edit drawer]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.2]

### References

- UX: _bmad-output/planning-artifacts/ux-design-specification.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

-

### Completion Notes List

- Story implemented as part of full codebase implementation

### File List
