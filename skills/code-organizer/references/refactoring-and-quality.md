# Refactoring & Quality

## Refactoring Workflow

### 1. Analyze
- Read target files
- Identify: file too large? duplicate styles? reusable components? missing types?
- Produce checklist

### 2. Execute

**Styles:** extract colors/fonts/spacing → variables/theme; encapsulate reusable patterns → mixins/components; unify naming.

**Components:** identify reusable UI → `components/<category>/`; define TypeScript interfaces; move styles (scoped/modules).

**Logic:** business logic → `composables/` or `hooks/`; pure functions → `utils/`; types → `types/`.

### 3. Verify

```bash
pnpm lint:fix      # Auto-fix formatting
pnpm type-check    # TypeScript errors
pnpm test          # Tests (if available)
```

- Verify UI is pixel-perfect
- Test all functionality (interactions, routing, data)

## Quality Checks

Run after every change:

```bash
pnpm lint:fix
pnpm type-check
pnpm test
```

## Git Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| style | Formatting (no logic change) |
| refactor | Restructuring |
| perf | Performance |
| test | Tests |
| chore | Build / tooling |

Examples:

```
feat(auth): add login page
fix(user): resolve avatar display issue
refactor(news): extract NewsCard component
```
