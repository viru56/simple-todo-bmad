# Story 1.1: Initialize Nx Monorepo Workspace & App Structure

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer setting up the project for the first time,
I want the Nx monorepo initialized with the correct apps and shared library structure,
So that all future development follows consistent workspace conventions and benefits from Nx tooling.

## Acceptance Criteria

1. **Given** I am in the project directory **When** I run the Nx workspace creation command (see Dev Notes) **Then** the workspace is created and contains `apps/client`, `apps/server`, and `libs/shared` (the preset may create one app and `libs/`; add server app and shared lib and ensure the React app is named `client` so the layout matches the architecture)
2. **Given** the workspace is initialized **When** I run `nx lint` for the client app **Then** the lint check passes with no errors
3. **Given** the workspace is initialized **When** I run `nx build client` **Then** the Vite build completes successfully with no errors

## Tasks / Subtasks

- [x] Run Nx workspace creation command (AC: 1)
- [x] Ensure `apps/client`, `apps/server`, and `libs/shared` exist — add server app and shared lib via Nx generators if the preset did not create them; ensure the React app is named `client` (AC: 1)
- [x] Run `nx lint client` (or the client app’s project name) and fix any issues (AC: 2)
- [x] Run `nx build client` (or the client app’s project name) and fix any issues (AC: 3)

## Dev Notes

- Use exact command from architecture: `npx create-nx-workspace@latest simple-todo-bmad --preset=react-monorepo --bundler=vite`. Workspace name must match repo (simple-todo-bmad). Nx docs align with Nx v21.
- Use **npm** for install and Nx commands (e.g. `npm install`, `npm exec nx build client`, `npm exec nx lint client`). This workspace uses npm-style workspaces; pnpm may fail with "externalDependency could not be found".
- The react-monorepo preset typically creates one React app and `libs/`. Target layout is `apps/client`, `apps/server`, `libs/shared`. If the preset does not create all three, add the server app and shared library via Nx generators (e.g. `@nx/node:application` for server, `@nx/js:library` for shared) and ensure the React app is named `client`.
- Monorepo structure: `apps/client` (React + Vite), `apps/server` (Fastify, added in this or next story), `libs/shared` (shared types/contracts).
- [Source: _bmad-output/planning-artifacts/architecture.md — Starter Template, Nx React Monorepo]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.1]

### References

- Architecture: _bmad-output/planning-artifacts/architecture.md
- Epics: _bmad-output/planning-artifacts/epics.md

## Dev Agent Record

### Agent Model Used

claude-4.6-opus

### Completion Notes List

Nx workspace initialized with react-monorepo preset. apps/client (React+Vite), apps/server (Fastify+esbuild), libs/shared created. Package naming fixed to @simple-todo-bmad. Lint and build pass.

### Senior Developer Review (AI)

Code review (adversarial) completed. All ACs and tasks verified. Fixes applied: (1) File List expanded with root config files for traceability, (2) Dev Notes updated with npm as package manager for Nx commands, (3) AGENTS.md updated to state npm for this workspace, (4) Root package.json convenience scripts added (lint, build). Story status set to done.

### File List

Root: package.json, nx.json, tsconfig.base.json, tsconfig.json, eslint.config.mjs, .editorconfig, .gitignore, vitest.workspace.ts. Apps: apps/client/* (e.g. vite.config.mts, eslint.config.mjs, src/, index.html), apps/server/*, libs/shared/*

### Change Log

- Code review (AI): File List and Dev Notes updated; AGENTS.md and root scripts updated. Status → done.
