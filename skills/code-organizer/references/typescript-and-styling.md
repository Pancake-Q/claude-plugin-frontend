# TypeScript & Styling

## TypeScript Rules

```typescript
// Prefer built-in utility types
type UserMap = Record<string, User>
type UserPartial = Partial<User>
type UserPick = Pick<User, 'id' | 'name'>
type UserOmit = Omit<User, 'age'>

// Never use any — use concrete types or unknown
function process(data: User) { }
function process(data: unknown) { }
```

- Strong typing — Props, events, and function params must have types
- Never use `any` — use concrete types or `unknown`
- Prefer built-in utility types: `Record`, `Partial`, `Pick`, `Omit`

## SCSS + BEM

```scss
$color-primary: #333;
$spacing-md: 20px;

.news-card {
  @include card-base;

  &__title {
    color: $color-primary;
    margin-bottom: $spacing-md;
  }

  &__title--large {
    font-size: 24px;
  }
}
```

## Tailwind CSS

```tsx
export function NewsCard({ title, featured }: NewsCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className={`text-gray-800 mb-4 ${featured ? 'text-2xl font-bold' : 'text-lg'}`}>
        {title}
      </h3>
    </div>
  )
}
```

## CSS-in-JS (styled-components)

```tsx
import styled from 'styled-components'

const Card = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Title = styled.h3<{ $featured?: boolean }>`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.$featured ? '24px' : '16px'};
`

export function NewsCard({ title, featured }: NewsCardProps) {
  return (
    <Card>
      <Title $featured={featured}>{title}</Title>
    </Card>
  )
}
```

## CSS Modules

```tsx
import styles from './NewsCard.module.css'

export function NewsCard({ title, featured }: NewsCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={`${styles.title} ${featured ? styles.titleLarge : ''}`}>
        {title}
      </h3>
    </div>
  )
}
```
