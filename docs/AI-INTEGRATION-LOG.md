# AI Integration Log

**Project:** simple-todo-bmad  
**Purpose:** Document how AI (and MCP) were used during implementation and what worked or didn’t.

---

## Agent Usage

| Task | AI assistance | What worked |
|------|----------------|-------------|
| BMAD workflow (PRD, architecture, epics, stories) | PM/Architect personas and BMAD workflows used to produce planning artifacts | Structured prompts and step-by-step workflows produced consistent, traceable specs. |
| Project setup (Nx, apps, libs) | Nx generators and workspace patterns | Using `nx generate` and workspace docs kept structure consistent. |
| API and validation | AI-assisted implementation from architecture and route schemas | Spec-first (schemas + error envelope) made endpoint behavior predictable. |
| Frontend components and state | Implementation from UX and component specs | Feature-first structure and Zustand store matched the architecture. |
| Tests (unit, integration, E2E) | Test generation from AC and existing patterns | Given/When/Then in stories translated well to Vitest and Playwright tests. |
| Docker and QA docs | AI-assisted Dockerfiles, compose, and report text | Clear “non-root, HEALTHCHECK, profiles” prompts produced correct edits. |

**Effective prompts:**  
- Referencing specific files and line ranges.  
- “Per architecture doc: …” or “Per story X acceptance criteria: …”.  
- Asking for one concern at a time (e.g. “add HEALTHCHECK only” then “add non-root user”).

---

## MCP Server Usage

| MCP / tool | How it was used |
|------------|------------------|
| **Nx MCP** | Workspace discovery, project/target listing, running tasks via `nx run` / `nx run-many`. Used to confirm build and test commands and project layout. |
| **Postman / API MCP** | Not used in this repo; API contract validated via Vitest integration tests (Fastify inject) and E2E. |
| **Chrome DevTools MCP** | Referenced in plan for performance and debugging; manual DevTools/Lighthouse used for a11y and performance. |
| **Playwright** | Used as a library and CLI for E2E; no separate Playwright MCP. |

---

## Test Generation

- **Unit/component:** AI generated tests from component code and RTL patterns; coverage targets (e.g. 90% in client) kept quality high.  
- **API:** Integration tests derived from route schemas and error codes; mocking the todo service allowed tests without a DB.  
- **E2E:** Playwright tests written from user journeys (create, complete, delete, empty state, error handling). Selectors used role and label (e.g. `getByRole('button', { name: 'Add todo' })`) for stability.  

**What AI missed:**  
- Edge cases in error paths (e.g. 404/500 branches) needed a second pass.  
- E2E assumptions (e.g. clean DB for “empty state”) had to be stated explicitly for CI.

---

## Debugging with AI

- **Build/test failures:** Pasted Nx or Vitest output; AI suggested fixes (e.g. env vars for tests, Prisma mock).  
- **Type errors:** Shared relevant types and imports; AI proposed fixes that kept shared types in sync.  
- **Docker:** CMD and USER changes broke script execution; AI suggested `sh -c` and postgresql-client for `pg_isready`.

---

## Limitations

| Limitation | Mitigation |
|-----------|------------|
| AI does not run the app or Docker locally | Human or CI runs `docker compose up`, `npm run dev`, and E2E. |
| Coverage and security are not fully verified by AI | QA reports (coverage, a11y, security) written from rules and code review; run real audits (Lighthouse, axe, npm audit). |
| BMAD artifacts can drift from code | Keep stories and AC as source of truth; re-sync when changing behavior. |
| E2E environment (DB state, ports) | Document BASE_URL and “start app first”; in CI, use a dedicated test stack or reset DB. |

---

## Where Human Expertise Was Critical

- Deciding scope and priorities (what’s in MVP vs Phase 2).  
- Reviewing security and a11y (interpreting NFRs and WCAG).  
- Setting up CI and local dev (choosing npm, Nx, Docker layout).  
- Final sign-off on UX and product contract (“It Just Works”).
