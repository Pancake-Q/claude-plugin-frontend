# 前端开发规范指南

> 前端开发专家。适用于 Vue 3 / Nuxt 3 / React 项目的规范检查、代码优化、重构和组件封装。
> 覆盖 Skills：`vue` · `vue-best-practices` · `vue-router-best-practices` · `nuxt` · `pinia` · `vueuse-functions` · `unocss` · `antfu` · `vitest` · `vue-testing-best-practices` · `vue-style-guide` · `pnpm`

---

## 一、核心原则

| 原则     | 规范                                                     |
| -------- | -------------------------------------------------------- |
| 简洁优先 | 避免过度设计；三行重复优于过早抽象                       |
| 类型安全 | 禁止 `any`；优先内置类型；声明显式返回类型               |
| 单一职责 | 每文件职责清晰；类型 → `types.ts`；常量 → `constants.ts` |
| API 稳定 | 禁止 `@deprecated` / `experimental` API                  |
| 复用抽离 | 重复 >3 次必须抽离为 composable / hook / util            |
| 组件聚焦 | 单文件 ≤500 行；单函数 ≤50 行；多职责必须拆分            |

---

## 二、命名规范（vue-style-guide）

| 类型               | 规范                       | 示例                              |
| ------------------ | -------------------------- | --------------------------------- |
| 变量 / 函数        | 小驼峰 + 动词前缀          | `getUserData()`, `handleClick()`  |
| 常量               | 大写下划线                 | `API_BASE_URL`, `MAX_RETRY_COUNT` |
| 类型 / 接口 / 组件 | 大驼峰                     | `UserProfile`, `ApiResponse`      |
| 组件文件           | 大驼峰                     | `UserCard.vue`, `NewsCard.tsx`    |
| Composable         | `use` 前缀                 | `useUserStore`, `useFetchNews`    |
| CSS 类（BEM）      | block\_\_element--modifier | `.card__title--large`             |

---

## 三、TypeScript 规范（antfu · vue-best-practices）

```typescript
// ✅ 优先内置工具类型
type UserMap = Record<string, User>
type UserPartial = Partial<User>
type UserPick = Pick<User, 'id' | 'name'>

// ✅ 显式返回类型
declare function getUser(id: string): Promise<User>

// ✅ 复杂类型独立声明，抽离到 types.ts
interface ApiResponse<T> { data: T, status: number, message: string }

// ❌ 禁止 any → 使用具体类型或 unknown
function process(data: unknown) { }
```

**文件组织**：

- 类型 / 接口 → `types.ts` 或 `types/*.ts`
- 常量 → `constants.ts`
- 环境特定文件顶部标注：`// @env node` 或 `// @env browser`

**tsconfig.json**：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

---

## 四、Vue 3 组件规范（vue · vue-best-practices）

**SFC 结构顺序**：`<script>` → `<template>` → `<style>`

**script 内部顺序**：导入 → Props/Emits → 状态 → 计算属性 → 方法 → 生命周期

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  update: [value: string]
}>()

const model = defineModel<string>()
const doubled = computed(() => (props.count ?? 0) * 2)

onMounted(() => { /* ... */ })
</script>

<template>
  <div>{{ title }} - {{ doubled }}</div>
</template>
```

**组件拆分触发条件**（满足任一即拆分）：

- 同时包含数据编排和多个 UI 区块
- 模板中有 3+ 个独立 UI 区块
- 存在可复用的重复模板块

**数据流**：Props 向下，Events 向上；`v-model` 仅用于真正的双向绑定；`provide/inject` 仅用于深层依赖。

**性能**（功能完成后再优化）：

- 大列表 → 虚拟滚动
- 静态子树 → `v-once` / `v-memo`
- 深响应非必要 → `shallowRef` 替代 `ref`

---

## 五、Composable 规范（vue-best-practices · vueuse-functions）

```typescript
// composables/useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  return { count, increment }
}
```

**优先使用 VueUse**，避免重复造轮子：

| 场景              | VueUse 函数                               |
| ----------------- | ----------------------------------------- |
| 本地存储          | `useLocalStorage` / `useSessionStorage`   |
| 防抖 / 节流       | `useDebounceFn` / `useThrottleFn`         |
| 元素尺寸 / 可见性 | `useElementSize` / `useElementVisibility` |
| 点击外部          | `onClickOutside`                          |
| 网络状态          | `useOnline` / `useNetwork`                |
| 无限滚动          | `useInfiniteScroll`                       |
| 异步状态          | `useAsyncState`                           |
| 深色模式          | `useDark`                                 |

---

## 六、Pinia 状态管理规范（pinia · nuxt）

```typescript
// ✅ 优先 Setup Store
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function fetchUser(id: string): Promise<void> {
    user.value = await api.getUser(id)
  }

  return { user, isLoggedIn, fetchUser }
})

// ✅ storeToRefs 保持响应性
const { user, isLoggedIn } = storeToRefs(useUserStore())
const { fetchUser } = useUserStore() // actions 直接解构

// ✅ 在函数内调用（SSR 安全）
router.beforeEach(() => {
  const store = useUserStore() // ✅
})
// ❌ 模块顶层调用
const store = useUserStore()
```

---

## 七、Nuxt 3 规范（nuxt）

**数据获取**：

- `useFetch` → 组件内声明式请求（自动 SSR + 缓存）
- `useAsyncData` → 需要自定义 key 或复杂逻辑
- `$fetch` → 事件处理 / 客户端触发请求

**目录约定**：

```
components/     # 自动导入，大驼峰命名
composables/    # 自动导入，use 前缀
pages/          # 文件路由
server/api/     # 服务端 API 路由
stores/         # Pinia stores
types/          # TypeScript 类型
utils/          # 工具函数
```

**SSR 注意**：

- Store 在函数内调用，避免跨请求状态污染
- 避免在 `setup` 外访问 `window` / `document`（用 `onMounted` 或 `import.meta.client`）

---

## 八、Vue Router 规范（vue-router-best-practices）

```typescript
// ✅ 异步导航守卫
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn)
    return { name: 'login' }
})

// ✅ 同路由参数变化时监听 params
watch(() => route.params.id, fetchData, { immediate: true })

// ✅ 组件卸载时清理事件监听
onUnmounted(() => cleanup())
```

---

## 九、样式规范（unocss · vue-style-guide）

**UnoCSS（推荐）**：

```vue
<div class="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800">
```

**SCSS / BEM（传统项目）**：

```scss
.card {
  &__title { font-size: 1rem; }
  &__title--large { font-size: 1.5rem; }
}
// 公共变量 → variables.scss
// 公共 Mixin → mixins.scss
// UI 库覆盖 → styles/element-override.scss
```

---

## 十、组件目录结构（vue-style-guide）

```
components/
├── common/     # 通用 UI（Button、Card、Tag）
├── layout/     # 页面结构（Header、Footer、Sidebar）
├── business/   # 业务组件（NewsCard、PaperCard）
└── form/       # 表单相关（SearchBar、FilterPanel）
```

---

## 十一、测试规范（vitest · vue-testing-best-practices）

```typescript
// foo.test.ts（与源文件同目录）
import { describe, expect, it } from 'vitest'

describe('useCounter', () => {
  it('increments count', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })
})
```

- 使用 `describe` / `it`（不用 `test`）
- 复杂输出用 `toMatchSnapshot`
- 组件测试用 `@pinia/testing` mock store

---

## 十二、代码质量检查（antfu · vue-style-guide）

```bash
pnpm run lint --fix   # 自动修复（antfu ESLint config）
pnpm type-check       # TypeScript 类型检查
pnpm test             # 运行测试
```

**ESLint 配置**：

```js
// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu()
```

**Git Hooks**：

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm i --frozen-lockfile --ignore-scripts --offline && npx lint-staged"
  },
  "lint-staged": { "*": "eslint --fix" }
}
```

**Git 提交规范（Conventional Commits）**：

```
<type>(<scope>): <subject>
feat | fix | docs | style | refactor | perf | test | chore

feat(auth): add login page
fix(user): resolve avatar display issue
```

---

**最后更新**: 2026-04-16
**版本**: 3.0.0
