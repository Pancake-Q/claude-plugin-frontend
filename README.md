# claude-plugin-frontend

全栈前端工具集插件，为 Claude Code 提供 Vue 生态、构建工具、测试、文档、设计与代码规范等全流程辅助能力。

## 功能

### Skills（模型自动触发）

涉及对应技术栈或场景时会自动激活。

| Skill                        | 说明                                                      |
| ---------------------------- | --------------------------------------------------------- |
| `vue`                        | Vue 3 Composition API、`<script setup>`、响应式与内置组件 |
| `vue-best-practices`         | Vue.js 任务必备规范，强制 Composition API + TypeScript    |
| `vue-router-best-practices`  | Vue Router 4 路由模式、导航守卫与生命周期                 |
| `vue-testing-best-practices` | Vue 测试规范，覆盖 Vitest / Vue Test Utils / Playwright   |
| `vueuse-functions`           | VueUse 组合式函数的最佳实践                               |
| `nuxt`                       | Nuxt SSR、自动导入、文件路由、Server Routes               |
| `pinia`                      | Pinia 状态管理与 store 模式                               |
| `unocss`                     | UnoCSS 原子化 CSS 引擎与预设                              |
| `vite`                       | Vite 配置、插件、SSR 与 Vite 8 Rolldown 迁移              |
| `vitepress`                  | VitePress 文档站点构建                                    |
| `vitest`                     | Vitest 单测、Mock、覆盖率与过滤                           |
| `slidev`                     | Slidev 技术演示文稿                                       |
| `tsdown`                     | 基于 Rolldown 的 TS/JS 库打包                             |
| `turborepo`                  | Turborepo monorepo 构建与缓存                             |
| `pnpm`                       | pnpm 工作区、catalogs、patches、overrides                 |
| `antfu`                      | Anthony Fu 的工程化约定与配置                             |
| `code-organizer`             | 前端项目结构分析、诊断与重构建议（Vue/Nuxt/React/Next）   |
| `web-design-guidelines`      | UI 代码的 Web 交互指南合规审查（可访问性、UX、设计审计）  |

### Commands（用户触发）

| Command       | 说明                                                            |
| ------------- | --------------------------------------------------------------- |
| `/commit`     | 分析 git 变更并生成符合 Conventional Commits 规范的英文提交消息 |
| `/dev-guide`  | 前端开发规范指南，整合 Vue/Nuxt/React 多 skill 的检查与重构能力 |
| `/doc-review` | 项目文档质量审计，可按文件、类型或过时状态过滤                  |

## 安装

```bash
claude plugin add pancakeHub/claude-plugin-frontend
```

## 使用

### 模型触发 Skill

在对话中提到对应技术栈或场景，相关 skill 会自动激活：

```
帮我用 Vue 3 + Pinia 实现一个购物车功能
```

```
检查这个组件是否符合 Web 交互可访问性规范
```

### 用户触发 Command

```
/commit
/dev-guide
/doc-review --file README.md
```

## 技术栈

- 项目规范：[antfu/eslint-config](https://github.com/antfu/eslint-config)
- 包管理器：pnpm
- 代码检查：ESLint (flat config)
- Git Hooks：simple-git-hooks + lint-staged

## 许可证

[MIT](./LICENSE)
