---
name: vue-style-guide
description: >-
  Frontend code organizer for Vue 3 / Nuxt 3 / React / Next.js projects.
  Auto-invoke during code review, PR review, refactor, and any "check my code" request
  to enforce script block ordering, naming conventions, component patterns, and directory
  structure rules. Also invoke when the user explicitly asks to organize / reorganize /
  restructure project layout. Scans project structure, diagnoses issues (including
  script setup variable ordering), proposes fixes, and executes after confirmation.
metadata:
  author: pancakeHub
  version: "2026.6.9"
---

Analyze, diagnose, and reorganize frontend project directory structures. Also serves as the canonical reference for coding conventions and best practices across Vue 3/Nuxt 3, React/Next.js, TypeScript, and multiple styling approaches.

> Focused on Vue 3 / Nuxt 3 projects. React / Next.js supported as reference.

## Preferences

- Always use Composition API with `<script setup lang="ts">`
- Prefer TypeScript over JavaScript — never use `any`
- Single file ≤ 500 lines, single function ≤ 50 lines
- Extract when duplicated > 3 times
- No deprecated or experimental APIs
- Pick one styling approach and stick with it

## Organization Workflow

| Topic | Description | Reference |
|-------|-------------|-----------|
| Scan & Diagnose | Detect framework, scan directory tree, produce diagnostic report | [organization-workflow](references/organization-workflow.md) |
| Standard Structures | Nuxt 3 and Vue 3 (Vite) canonical directory templates | [standard-structures](references/standard-structures.md) |
| Common Issues | Misplaced files, naming violations, excessive nesting, missing directories | [common-issues](references/common-issues.md) |

## Coding Conventions

| Topic | Description | Reference |
|-------|-------------|-----------|
| Naming Conventions | File naming, variable naming, conflict resolution (Type suffix pattern) | [naming-conventions](references/naming-conventions.md) |
| Component Patterns | Vue 3 and React component structure templates, extraction rules | [component-patterns](references/component-patterns.md) |
| TypeScript & Styling | TypeScript rules, SCSS/BEM, Tailwind, CSS-in-JS, CSS Modules | [typescript-and-styling](references/typescript-and-styling.md) |
| Refactoring & Quality | Refactoring workflow, quality checks, git commit conventions | [refactoring-and-quality](references/refactoring-and-quality.md) |

## Quick Reference

### Component Directory Layout

```
components/
├── common/      # Reusable UI (buttons, cards, tags)
├── layout/      # Page structure (header, footer, sidebar)
├── business/    # Domain-specific (news card, paper card)
└── form/        # Form-related (search bar, filters)
```

### Quality Checks

```bash
pnpm lint:fix      # Auto-fix formatting
pnpm type-check    # TypeScript errors
pnpm test          # Tests (if available)
```

### Git Commit Convention

```
<type>(<scope>): <subject>

feat | fix | docs | style | refactor | perf | test | chore
```
