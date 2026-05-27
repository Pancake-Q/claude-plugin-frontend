# Component Patterns

## Vue 3 Component Structure

```vue
<script setup lang="ts">
// 1. Imports — Vue API → Components → Composables → Utils → Types
import { computed, ref, watch, onMounted } from 'vue'
import UserAvatar from './UserAvatar.vue'
import { useUserData } from '@/composables/useUserData'
import { formatName } from '@/utils/formatters'
import type { UserType } from '@/types'

// 2. Props / Emits
interface Props {
  user: UserType
  count?: number
}
const props = withDefaults(defineProps<Props>(), { count: 0 })
const emit = defineEmits<{ update: [value: number] }>()

// 3. State
const isLoading = ref(false)

// 4. Computed
const displayName = computed(() => formatName(props.user.firstName, props.user.lastName))

// 5. Methods
function handleClick() {
  emit('update', props.count + 1)
}

// 6. Lifecycle
onMounted(() => {
  // initialization
})

// 7. Watch / Side Effects
watch(() => props.user, (newUser) => {
  isLoading.value = true
})
</script>

<template>
  <div class="user-card">
    {{ displayName }}
  </div>
</template>

<style scoped lang="scss">
.user-card {
  @include card-base;

  &__title {
    color: $color-primary;
  }
}
</style>
```

## React Component Structure

```tsx
import { useState, useCallback, useMemo } from 'react'
import { UserAvatar } from './UserAvatar'
import { useUserData } from '@/hooks/useUserData'
import { formatName } from '@/utils/formatters'
import type { UserType } from '@/types'
import styles from './UserCard.module.css'

interface UserCardProps {
  user: UserType
  count?: number
  onUpdate?: (value: number) => void
}

export function UserCard({ user, count = 0, onUpdate }: UserCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useUserData(user.id)

  const displayName = useMemo(
    () => formatName(user.firstName, user.lastName),
    [user.firstName, user.lastName]
  )

  const handleClick = useCallback(() => {
    onUpdate?.(count + 1)
  }, [count, onUpdate])

  return (
    <div className={styles.userCard}>
      <UserAvatar user={user} />
      <span className={styles.title}>{displayName}</span>
      <button onClick={handleClick}>Update</button>
    </div>
  )
}
```

## Component Extraction Rules

Extract when **any** condition is met:
- Reused across multiple pages
- Exceeds 100 lines
- Contains independent, self-contained logic

## Directory Layout

```
components/
├── common/      # Reusable UI (buttons, cards, tags)
├── layout/      # Page structure (header, footer, sidebar)
├── business/    # Domain-specific (news card, paper card)
└── form/        # Form-related (search bar, filters)

# Vue projects
composables/     # Reusable business logic
├── useFetchNews.ts
├── useSearchState.ts
└── useFilterState.ts

# React projects
hooks/           # Custom hooks
├── useFetchNews.ts
├── useSearchState.ts
└── useDebounce.ts

utils/           # Pure utility functions
├── formatDate.ts
├── stringUtils.ts
└── dataTransform.ts

types/           # TypeScript type definitions
├── api.ts
├── news.ts
└── components.ts
```
