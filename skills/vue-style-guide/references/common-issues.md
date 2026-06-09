# Common Issue Patterns

## Misplaced Files

| Symptom | Fix |
|---------|-----|
| `use*.ts` in root or `src/` | Move to `composables/` |
| `.vue` in `utils/` or `types/` | Move to `components/<category>/` |
| Type definitions scattered | Consolidate into `types/` |
| Store in `composables/` | Move to `stores/` |
| Utility function in `components/` | Move to `utils/` |

## Naming Violations

| Symptom | Fix |
|---------|-----|
| `user-card.vue` | Rename to `UserCard.vue` |
| `FetchData.ts` in utils | Rename to `fetchData.ts` |
| `composables/auth.ts` | Rename to `useAuth.ts` |
| `Helper.ts` with mixed concerns | Split by function |

## Excessive Nesting

| Symptom | Fix |
|---------|-----|
| `components/business/news/card/header/Title.vue` | Flatten to `components/business/NewsCardTitle.vue` |
| Every component in own sub-dir with one file | Simplify structure |

## Script Block Ordering Violations

| Symptom | Fix |
|---------|-----|
| `watch()` before `computed()` | Move watch to section 7, after lifecycle hooks |
| `ref()` / `reactive()` before `defineProps` | Move state declarations after Props/Emits block |
| `onMounted()` before method definitions | Move lifecycle hooks after methods |
| `computed()` mixed with `ref()` declarations | Separate into distinct State (section 3) and Computed (section 4) blocks |
| Imports scattered between other declarations | Consolidate all imports at the top (section 1) |

Expected order: Imports → Props/Emits → State → Computed → Methods → Lifecycle → Watch

## Missing Standard Directories

| Symptom | Fix |
|---------|-----|
| No `types/` | Create and consolidate type definitions |
| No `composables/` but complex logic in components | Create and extract logic |
| No `stores/` but Pinia installed | Create and move store files |
