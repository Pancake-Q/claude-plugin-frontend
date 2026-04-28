# Organization Workflow

Execute steps in order. Report results after each step before proceeding.

## Step 1 — Scan & Identify

1. List top-level files and directories.
2. Detect framework:
   - `nuxt.config.ts` → **Nuxt 3**
   - `vite.config.ts` + `src/` → **Vue 3 (Vite)**
   - `vue.config.js` → **Vue CLI**
   - Otherwise → ask user
3. Inspect `package.json` dependencies (Pinia, Vue Router, Element Plus, etc.).
4. Recursively scan directory tree (ignore `node_modules`, `.nuxt`, `.output`, `dist`, `.git`).

**Output:** directory tree + detected framework and stack.

## Step 2 — Diagnostic Report

Compare against the standard structure and produce a checklist.

### Directory Structure

| Check | Rule |
|-------|------|
| Standard dirs exist | Compare against framework template |
| Non-standard dirs | Flag directories that don't belong |
| Nesting depth | Component dirs must not exceed 3 levels |

### File Placement

| File type | Expected location |
|-----------|-------------------|
| Components (`.vue`) | `components/`, `pages/`, `layouts/` |
| Composables (`use*.ts`) | `composables/` |
| Utility functions | `utils/` |
| Type definitions | `types/` |
| Pinia stores | `stores/` |
| Middleware | `middleware/` |
| Server code | `server/` |

### Component Classification

| Category | Path | Characteristics |
|----------|------|-----------------|
| Common | `components/common/` | Pure UI, no business logic, cross-project reusable |
| Layout | `components/layout/` | Page structure, slot-based |
| Business | `components/business/` | Business logic, project-specific |
| Form | `components/form/` | Form-related, v-model support |

**Output:** issue table sorted by severity: error → warning → suggestion.

## Step 3 — Reorganization Plan

Produce a concrete plan:

1. **Directories to create** — missing standard directories
2. **Files to move** — `source → destination`
3. **Files to rename** — naming violations
4. **Imports to update** — affected import statements

Present as a table:

```
| Action | Source | Destination | Reason |
|--------|--------|-------------|--------|
| mkdir  | —      | composables/ | Missing standard directory |
| move   | src/useAuth.ts | composables/useAuth.ts | Composable belongs in composables/ |
| rename | components/user-card.vue | components/UserCard.vue | Components use PascalCase |
| update | pages/index.vue | — | Fix import path |
```

**Wait for user confirmation before executing.**

## Step 4 — Execute

**Only proceed after explicit user approval.**

1. Create missing directories
2. Move files to correct locations
3. Rename files violating conventions
4. Update all affected import paths (`.vue`, `.ts`, `.tsx`)
5. Remove empty directories left after moves

Report each operation. Stop immediately on failure.

## Step 5 — Verify

```bash
pnpm type-check || npx vue-tsc --noEmit || npx nuxi typecheck
pnpm lint || pnpm lint:fix
pnpm build  # optional — after user confirms
```

If verification fails: analyze errors, fix missed imports, re-verify.

**Output:** verification results + final directory tree.
