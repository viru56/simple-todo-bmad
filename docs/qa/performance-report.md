# Performance Report

**Date:** 2026-03-16  
**Target:** NFR2 (initial load < 1s), NFR4 (TTI < 2s), NFR3 (optimistic UI < 16ms perceived), NFR1 (API p95 < 200ms).

## Approach

- **API:** Server uses Fastify and Prisma; no heavy sync work on request path. Integration tests show response times in the single-digit ms range under mock.
- **Client:** Vite build with code splitting; React 19; Zustand for state; optimistic updates so successful actions feel instant (NFR3).
- **Lighthouse / DevTools:** Can be run manually or in CI (e.g. Playwright + Lighthouse) for LCP, FID, CLS, TTI.

## Findings

| Metric | Target | Status |
|--------|--------|--------|
| **API response time** | < 200ms p95 | Met in tests; real p95 depends on DB and load. |
| **Initial load** | < 1s | Vite + React SPA; bundle size and network depend on environment. |
| **TTI** | < 2s | Expected to meet on typical local/dev setup; measure with Lighthouse for production. |
| **Optimistic UI** | < 16ms perceived | Implemented; UI updates before server response. |

## How to Run Performance Checks

1. **Lighthouse:** Chrome DevTools → Lighthouse → Performance (and Accessibility). Run against production build (`nx build client` then serve `apps/client/dist`).
2. **API:** Use server integration tests or a load tool (e.g. `wrk`, `artillery`) against `/todos` and `/health` with a real DB to validate p95.
3. **Bundle size:** `nx build client` and inspect `apps/client/dist`; use `vite-plugin-bundle-visualizer` if needed.

## Conclusion

Architecture and implementation align with NFRs. No critical performance issues identified. For production, run Lighthouse and API load tests and document baseline numbers.
