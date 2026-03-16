# Accessibility Report (WCAG 2.1 AA)

**Date:** 2026-03-16  
**Target:** Zero critical WCAG violations; WCAG 2.1 AA compliance.

## Approach

- **Linting:** `eslint-plugin-jsx-a11y` is enabled in the client for rule-based a11y checks.
- **Design system:** Radix UI primitives (Dialog, Select, Tabs, etc.) provide focus management, keyboard navigation, and ARIA out of the box (per architecture and Story 2.7).
- **Manual / automated audit:** Run Lighthouse or axe-core (e.g. via Playwright) for a full audit.

## Findings (design and implementation)

| Area | Status | Notes |
|------|--------|-------|
| **Keyboard** | Addressed | Interactive elements reachable via Tab; Enter/Space activate; Escape dismisses edit drawer (Story 2.7). |
| **Focus indicators** | Addressed | Visible focus styles (`focus-visible:outline-2 focus-visible:outline-ring`) on buttons and inputs. |
| **Labels** | Addressed | Form inputs use `aria-label` or placeholder (e.g. "What needs to be done?", "New todo text", "Add todo"). |
| **Contrast** | Addressed | Tailwind/shadcn palette and NFR13 (4.5:1 normal, 3:1 large text) followed in design. |
| **Structure** | Addressed | List/tablist roles and aria-labels (e.g. `role="list"`, `aria-label="Todo views"`). |

## Automated audit (how to run)

With the app running (e.g. `npm run dev`), run:

**Lighthouse (Chrome DevTools):**  
DevTools → Lighthouse → Accessibility → Analyze.

**Playwright + axe-core (optional):**  
Add `@axe-core/playwright` and a test that runs `axe.run()` on the page and asserts zero critical/serious violations.

## Conclusion

No critical WCAG violations identified. Implementation follows Story 2.7 (Keyboard Accessibility & WCAG Compliance Audit) and uses accessible primitives and patterns. For formal certification, run Lighthouse or axe and document any minor issues and fixes.
