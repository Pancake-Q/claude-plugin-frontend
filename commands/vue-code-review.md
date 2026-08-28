# Vue 前端代码审查

> 基于 Skills 的 Vue 代码质量审查工具，全面检查代码规范、最佳实践、性能优化和潜在问题
> 覆盖 Skills：`vue` · `vue-best-practices` · `vue-router-best-practices` · `nuxt` · `pinia` · `vueuse-functions` · `vue-style-guide` · `vue-testing-best-practices` · `antfu`

## 使用方式

在 Claude Code 中通过斜杠命令调用：

```bash
/vue-code-review                           # 审查整个项目
/vue-code-review --file UserCard.vue       # 审查指定文件
/vue-code-review --dir src/components      # 审查指定目录
/vue-code-review --type component          # 审查指定类型
/vue-code-review --severity critical       # 仅显示严重问题
```

---

## 任务

AI 将帮助你：

1. **代码扫描**: 扫描项目中的 Vue/TypeScript 文件
2. **规范检查**: 检查代码是否符合 Vue Style Guide 和最佳实践
3. **问题识别**: 识别性能问题、安全隐患和代码异味
4. **优化建议**: 提供具体的优化建议和重构方案
5. **生成报告**: 生成详细的审查报告和优先级清单

---

## 执行步骤

### 1. 扫描目标文件

根据参数扫描对应的文件：

```bash
# 扫描所有 Vue 文件
find . -name "*.vue" -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.nuxt/*" \
  -not -path "*/dist/*" \
  -not -path "*/build/*" | sort

# 扫描 TypeScript 文件
find . \( -name "*.ts" -o -name "*.tsx" \) -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.nuxt/*" \
  -not -path "*/dist/*" | sort
```

### 2. 分类文件

根据路径和内容分类：

| 类型           | 路径模式              | 说明           |
| -------------- | --------------------- | -------------- |
| **Component**  | `components/**/*.vue` | Vue 组件       |
| **Page**       | `pages/**/*.vue`      | 页面组件       |
| **Layout**     | `layouts/**/*.vue`    | 布局组件       |
| **Composable** | `composables/**/*.ts` | 组合式函数     |
| **Store**      | `stores/**/*.ts`      | Pinia 状态管理 |
| **Utils**      | `utils/**/*.ts`       | 工具函数       |
| **Types**      | `types/**/*.ts`       | 类型定义       |
| **API**        | `api/**/*.ts`         | API 接口       |

### 3. 审查维度

对每个文件执行以下维度的检查：

#### 3.1 代码规范（25 分）

基于 `vue-style-guide` 和 `antfu` Skills：

- **命名规范**
  - 组件名：大驼峰（PascalCase）
  - 变量/函数：小驼峰（camelCase），动词前缀
  - 常量：大写下划线（UPPER_SNAKE_CASE）
  - Composable：`use` 前缀
  - Props/Emits：小驼峰
- **文件组织**
  - SFC 顺序：`<script>` → `<template>` → `<style>`
  - script 内部顺序：导入 → Props/Emits → 状态 → 计算属性 → 方法 → 生命周期
  - 单文件行数 ≤ 500 行
  - 单函数行数 ≤ 50 行

- **导入规范**
  - 分组顺序：外部库 → 内部模块 → 类型导入
  - 使用绝对路径或别名（`@/`, `~/`）
  - 避免循环依赖

#### 3.2 Vue 最佳实践（30 分）

基于 `vue-best-practices` Skill：

- **组件设计**
  - 单一职责原则
  - Props 类型完整且必需项标记
  - Emits 事件类型定义
  - 合理使用 `defineModel`
  - 避免过度嵌套（≤3 层）

- **响应式系统**
  - 正确使用 `ref` / `reactive` / `computed`
  - 避免不必要的深层响应（考虑 `shallowRef`）
  - 计算属性无副作用
  - 避免在 `watch` 中修改监听源

- **性能优化**
  - 合理使用 `v-if` vs `v-show`
  - 大列表使用 `key` 属性
  - 静态内容使用 `v-once`
  - 长列表考虑虚拟滚动
  - 适当使用 `v-memo`

- **数据流**
  - Props 向下，Events 向上
  - 避免修改 Props
  - `provide/inject` 仅用于深层依赖
  - `v-model` 仅用于真正的双向绑定

#### 3.3 TypeScript 类型安全（20 分）

基于 `antfu` 和 `vue-best-practices` Skills：

- **类型完整性**
  - 禁止使用 `any`（使用 `unknown` 或具体类型）
  - 函数显式声明返回类型
  - Props 和 Emits 完整的类型定义
  - API 响应类型定义

- **类型组织**
  - 复杂类型抽离到 `types.ts`
  - 优先使用内置工具类型（`Partial`, `Pick`, `Record` 等）
  - 接口命名清晰（避免 `I` 前缀）

- **类型安全实践**
  - 避免类型断言（`as`），优先类型守卫
  - 枚举使用 `const` 或 `as const`
  - 泛型使用合理约束

#### 3.4 Composable 规范（10 分）

基于 `vueuse-functions` Skill：

- **优先使用 VueUse**
  - 检查是否重复实现 VueUse 已有功能
  - 本地存储、防抖节流、元素监听等

- **Composable 设计**
  - 函数命名以 `use` 开头
  - 返回响应式对象
  - 支持参数响应式
  - 清理副作用（`onUnmounted`）

#### 3.5 状态管理（10 分）

基于 `pinia` Skill：

- **Store 设计**
  - 优先使用 Setup Store
  - 状态最小化原则
  - Actions 异步操作
  - Getters 用于派生状态

- **使用规范**
  - 使用 `storeToRefs` 保持响应性
  - Actions 直接解构
  - 函数内调用 Store（SSR 安全）
  - 避免模块顶层调用

#### 3.6 安全性（5 分）

- **XSS 防护**
  - 避免 `v-html` 使用未转义内容
  - 用户输入需验证和转义

- **敏感信息**
  - API Key 等敏感信息不硬编码
  - 使用环境变量

- **依赖安全**
  - 检查已知漏洞的依赖版本

### 4. 问题严重程度分级

| 级别        | 图标 | 说明                           | 示例                                |
| ----------- | ---- | ------------------------------ | ----------------------------------- |
| 🔴 Critical | 严重 | 必须立即修复，影响功能或安全   | 使用 `any` 类型、内存泄漏、安全漏洞 |
| 🟠 High     | 高   | 应尽快修复，影响性能或可维护性 | 缺少类型定义、过长函数、重复代码    |
| 🟡 Medium   | 中   | 建议修复，影响代码质量         | 命名不规范、缺少注释、可优化性能    |
| 🟢 Low      | 低   | 可选修复，代码风格问题         | 格式问题、顺序问题                  |

### 5. 生成审查报告

报告结构：

```markdown
# Vue 代码审查报告

生成时间：YYYY-MM-DD HH:mm:ss
审查范围：[具体范围]

## 📊 总体评分

| 文件 | 类型 | 代码规范 | 最佳实践 | 类型安全 | 总分 | 等级 |
| ---- | ---- | -------- | -------- | -------- | ---- | ---- |

**总体评分**: XX/100
**等级**: 优秀/良好/合格/需改进/不合格

## 🔍 问题统计

- 🔴 严重问题: X 个
- 🟠 高优先级: X 个
- 🟡 中优先级: X 个
- 🟢 低优先级: X 个

## 📋 详细问题清单

### 文件: src/components/UserCard.vue

**总分**: 75/100 | **等级**: 合格

#### 🔴 严重问题（必须修复）

1. **[类型安全] 使用了 any 类型**
   - 位置：第 25 行
   - 问题：`const data: any = response`
   - 建议：定义具体类型 `interface ResponseData { ... }`
   - 影响：失去类型检查，可能导致运行时错误

#### 🟠 高优先级（应尽快修复）

2. **[性能] 未使用 key 属性**
   - 位置：第 42 行
   - 问题：`v-for="item in items"` 缺少 `:key`
   - 建议：添加 `:key="item.id"`
   - 影响：列表更新性能差

#### 🟡 中优先级（建议修复）

3. **[代码规范] 组件名不符合规范**
   - 位置：文件名
   - 问题：使用 `usercard.vue`
   - 建议：改为 `UserCard.vue`（PascalCase）
   - 影响：不符合 Vue Style Guide

#### 🟢 低优先级（可选修复）

4. **[代码风格] SFC 块顺序不一致**
   - 位置：文件结构
   - 问题：`<template>` → `<script>` → `<style>`
   - 建议：调整为 `<script>` → `<template>` → `<style>`
   - 影响：不符合项目约定

## 💡 优化建议

### 高优先级

1. **类型安全改进**
   - 为所有 API 响应定义类型接口
   - 移除所有 `any` 类型使用
   - 为 Props 和 Emits 添加完整类型

### 中优先级

2. **性能优化**
   - 对于大列表考虑虚拟滚动
   - 静态内容使用 `v-once` 优化
   - 计算属性避免复杂计算

### 低优先级

3. **代码组织**
   - 统一文件命名为 PascalCase
   - 按照约定顺序组织代码
   - 添加适当的注释

## 🎯 改进优先级

1. **立即修复**：所有 🔴 严重问题
2. **本周完成**：所有 🟠 高优先级问题
3. **迭代优化**：🟡 中优先级和 🟢 低优先级问题

## 📚 相关规范文档

- [Vue Style Guide](https://vuejs.org/style-guide/)
- [Vue Best Practices](/commands/dev-guide.md)
- [TypeScript 规范](/commands/dev-guide.md#typescript)

---

**审查工具**: vue-code-review
**Skills 版本**: vue@3.x, vue-best-practices@2.x, antfu@1.x
```

报告输出路径：`docs/review/vue-code-review-{YYYYMMDD-HHMMSS}.md`

---

## 评分标准

### 等级划分

- **优秀** (90-100 分)：代码质量优秀，符合所有最佳实践
- **良好** (80-89 分)：代码质量良好，有少量改进空间
- **合格** (70-79 分)：代码质量合格，建议系统性改进
- **需改进** (60-69 分)：存在较多问题，需要重点改进
- **不合格** (<60 分)：代码质量不合格，需要重构

### 总分计算

```
总分 = 代码规范 × 0.25 + Vue 最佳实践 × 0.30 + 类型安全 × 0.20
     + Composable 规范 × 0.10 + 状态管理 × 0.10 + 安全性 × 0.05
```

---

## 常用参数

### 基本参数

- `--file <path>`: 仅审查指定文件
- `--dir <path>`: 仅审查指定目录
- `--type <type>`: 仅审查指定类型（component/page/composable/store/utils）
- `--exclude <pattern>`: 排除匹配的文件

### 过滤参数

- `--severity <level>`: 仅显示指定严重程度（critical/high/medium/low）
- `--min-score <score>`: 仅显示评分低于指定分数的文件
- `--category <category>`: 仅检查指定类别（naming/structure/performance/type-safety）
- `--no-style`: 跳过代码风格检查（仅检查功能问题）

### 操作参数

- `--fix`: 自动修复可修复的问题（命名、格式、导入排序等）
- `--interactive`: 交互式修复，逐个确认
- `--dry-run`: 仅预览，不生成报告
- `--verbose`: 显示详细输出和检查过程

### 输出参数

- `--output <path>`: 指定审查报告输出路径
- `--format <format>`: 指定报告格式（markdown/json/html，默认 markdown）
- `--diff`: 对比上次审查结果（需要历史报告）
- `--ci`: CI 模式，有严重问题时返回非零退出码

---

## 使用场景

### 场景 1：日常开发前审查

```bash
# 审查当前正在开发的组件
/vue-code-review --file src/components/NewFeature.vue --verbose
```

### 场景 2：PR 提交前检查

```bash
# 审查整个功能模块
/vue-code-review --dir src/modules/user --severity high --fix
```

### 场景 3：代码重构评估

```bash
# 全面审查，生成详细报告
/vue-code-review --output docs/review/refactor-plan.md --verbose
```

### 场景 4：CI/CD 集成

```bash
# 在 CI 中运行，严重问题时失败
/vue-code-review --ci --severity critical --no-style
```

### 场景 5：新人代码指导

```bash
# 详细审查新手代码，包含教育性说明
/vue-code-review --file src/components/Feature.vue --verbose --interactive
```

---

## 检查清单

### Vue 组件 (\*.vue)

- [ ] 组件命名为 PascalCase
- [ ] SFC 块顺序：script → template → style
- [ ] Props 有完整的 TypeScript 类型
- [ ] Emits 有类型定义
- [ ] 使用 `<script setup>` 语法
- [ ] 计算属性无副作用
- [ ] 列表渲染有 `:key` 属性
- [ ] 避免 `v-if` 和 `v-for` 同时使用
- [ ] 事件处理函数以 `handle` 或 `on` 开头
- [ ] 组件大小适中（≤500 行）

### Composable (composables/\*.ts)

- [ ] 函数名以 `use` 开头
- [ ] 返回响应式对象
- [ ] 支持参数响应式（MaybeRef）
- [ ] 正确清理副作用
- [ ] 检查是否可用 VueUse 替代
- [ ] 有 TypeScript 类型定义
- [ ] 单一职责
- [ ] 有 JSDoc 注释

### Pinia Store (stores/\*.ts)

- [ ] 使用 Setup Store 风格
- [ ] Store 命名以 `use` 开头，`Store` 结尾
- [ ] State 类型完整
- [ ] Actions 处理异步操作
- [ ] Getters 用于派生状态
- [ ] 不在模块顶层调用
- [ ] 使用 `storeToRefs` 解构 state

### TypeScript 文件 (\*.ts)

- [ ] 无 `any` 类型
- [ ] 函数有显式返回类型
- [ ] 接口/类型命名清晰
- [ ] 复杂类型抽离到 types.ts
- [ ] 优先使用内置工具类型
- [ ] 枚举使用 `as const`
- [ ] 避免类型断言

---

## 注意事项

1. **性能考虑**
   - 大型项目审查可能需要较长时间
   - 建议先审查修改的文件，再进行全量审查
   - 使用 `--exclude` 排除第三方代码

2. **自动修复限制**
   - `--fix` 仅能修复格式和命名等简单问题
   - 逻辑和架构问题需要手动修复
   - 修复前建议先备份或提交代码

3. **类型检查**
   - 需要项目配置正确的 `tsconfig.json`
   - 确保依赖已安装（`pnpm install`）
   - 某些动态类型可能无法完全检查

4. **规则定制**
   - 可通过项目配置文件定制规则
   - 某些规则可能与团队约定不同，可忽略或调整
   - 建议结合 ESLint 和 TypeScript 检查使用

5. **报告解读**
   - 评分仅供参考，不是唯一标准
   - 关注问题的严重程度，优先修复严重问题
   - 结合项目实际情况判断是否需要修复

---

## 与其他工具对比

| 工具                | 特点                                 | 适用场景                   |
| ------------------- | ------------------------------------ | -------------------------- |
| **vue-code-review** | 基于 Skills 的智能审查，提供具体建议 | 全面代码审查，学习最佳实践 |
| **ESLint**          | 静态规则检查，快速发现语法问题       | 日常开发，CI/CD            |
| **TypeScript**      | 类型检查，编译时错误                 | 开发时类型安全             |
| **Volar**           | IDE 集成，实时提示                   | 开发时即时反馈             |

**建议组合使用**：开发时使用 Volar + ESLint，提交前使用 vue-code-review，CI 中使用 ESLint + TypeScript。

---

## 后续优化

完成代码审查后，建议：

1. 按优先级修复问题（严重 → 高 → 中 → 低）
2. 运行测试确保修改未破坏功能
3. 使用 `pnpm run lint --fix` 修复格式问题
4. 运行 `pnpm type-check` 确认类型安全
5. 提交代码并在 PR 中说明改进内容
