# Test Coverage Report

**Date:** 2026-03-16  
**Target:** Minimum 70% meaningful coverage (statements, branches, functions, lines).

## Summary

| Project | Statements | Branches | Functions | Lines | Status |
|---------|------------|----------|-----------|-------|--------|
| **Server** | 100% | 77.77% | 100% | 100% | Meets target |
| **Client** | 97.33% | 91.66% | 98.36% | 99.15% | Meets target |

**Overall:** Both client and server exceed the 70% target. Client has Vitest thresholds configured in `apps/client/vite.config.mts` (e.g. statements 90%, branches 75%); server has no enforced thresholds.

## How to Generate

```bash
npm run test:coverage
```

Coverage output is written to:
- `apps/client/test-output/vitest/coverage/`
- `apps/server/test-output/vitest/coverage/` (if configured)

## Gaps (minor)

- **Server:** Some branches in `toErrorResponse.ts` (error envelope formatting) not covered.
- **Client:** A few branches in CreateTodoInput (mobile detection), TodoItem, sortTodos, selectors, and date.ts; one line in TodoItem (174) uncovered.

No critical gaps; coverage is sufficient for maintainability and regression safety.
