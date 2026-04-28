# Naming Conventions

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Vue component files | PascalCase | `UserProfile.vue` |
| Page files | kebab-case / camelCase | `index.vue`, `[id].vue` |
| Composable files | `use` prefix + camelCase | `useAuth.ts`, `useFetchNews.ts` |
| Utility files | camelCase | `formatDate.ts`, `stringUtils.ts` |
| Type definition files | camelCase | `api.ts`, `news.ts` |
| Directories | kebab-case / camelCase | `components/`, `server/` |

## Code Naming

| Type | Convention | Example |
|------|-----------|---------|
| Variables / functions | camelCase + verb prefix | `firstName`, `getUserData()`, `handleClick()` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRY_COUNT` |
| Types / interfaces / components | PascalCase | `UserProfile`, `NewsItem`, `ApiResponse` |
| CSS classes (BEM) | block__element--modifier | `.card__title--large` |
| CSS classes (Tailwind) | utility composition | `flex items-center gap-4` |
| Type alias (conflict avoidance) | `Type` suffix | `AgentInfoType`, `UserDataType` |

## Conflict Resolution

### Component vs Type Collision

```typescript
// WRONG — component and type name clash
import AgentInfo from './AgentInfo.vue'
import type { AgentInfo } from '@/types/newsAgent'  // conflict!

// CORRECT — add Type suffix
import AgentInfo from './AgentInfo.vue'
import type { AgentInfoType } from '@/types/newsAgent'
```

### Variable vs Component Collision

```typescript
// WRONG — variable too similar to component
import AgentInfo from './AgentInfo.vue'
const agentInfo = ref({ ... })  // confusing

// CORRECT — descriptive prefix
import AgentInfo from './AgentInfo.vue'
const currentAgentInfo = ref({ ... })
```

### Summary

| Context | Rule | Example |
|---------|------|---------|
| Component name | PascalCase, no suffix | `AgentInfo`, `UserCard` |
| Type name | PascalCase + `Type` | `AgentInfoType`, `UserCardType` |
| Variable name | camelCase + prefix | `currentAgentInfo`, `selectedUser` |
