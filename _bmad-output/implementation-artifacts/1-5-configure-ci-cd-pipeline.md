# Story 1.5: Configure CI/CD Pipeline

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer contributing to the codebase,
I want automated CI checks to run on every push and pull request,
So that lint errors, test failures, and build regressions are caught before they reach the main branch.

## Acceptance Criteria

1. **Given** code is pushed to the repository **When** the CI workflow is triggered **Then** lint checks run via Nx and the pipeline fails if any lint errors are present
2. **Given** code is pushed to the repository **When** the CI workflow is triggered **Then** build validation runs for both the `client` and `server` apps via Nx targets
3. **Given** I inspect `.github/workflows/ci.yml` **When** I review its steps **Then** it defines sequential jobs for lint, test, and build using Nx task orchestration

## Tasks / Subtasks

- [x] Create .github/workflows/ci.yml (AC: 3)
- [x] Add lint job using Nx (AC: 1)
- [x] Add build jobs for client and server via Nx (AC: 2)
- [x] Wire workflow to push/PR triggers

## Dev Notes

- Lightweight CI: lint, tests, build validation (architecture). Nx task orchestration.
- NFR17: codebase passes lint and format with no errors
- [Source: _bmad-output/planning-artifacts/architecture.md — CI/CD]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.5]

### References

- Architecture: _bmad-output/planning-artifacts/architecture.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

claude-4.6-opus

### Completion Notes List

GitHub Actions CI workflow with lint, build, and test jobs using Nx task orchestration. Triggers on push/PR to main.

### File List

.github/workflows/ci.yml
