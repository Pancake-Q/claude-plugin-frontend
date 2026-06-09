# Standard Directory Structures

## Nuxt 3

```
project-root/
├── assets/                    # Processed static assets
│   ├── images/
│   ├── fonts/
│   └── styles/
│       ├── variables.scss
│       ├── mixins.scss
│       └── global.scss
├── components/                # Vue components (auto-imported)
│   ├── common/
│   ├── layout/
│   ├── business/
│   └── form/
├── composables/               # Composition functions (auto-imported)
├── layouts/                   # Layout templates
├── middleware/                # Route middleware
├── pages/                     # File-based routing
├── plugins/                   # Nuxt plugins
├── public/                    # Unprocessed static files
├── server/                    # Server-side code
│   ├── api/
│   ├── middleware/
│   └── utils/
├── stores/                    # Pinia state management
├── types/                     # TypeScript type definitions
├── utils/                     # Utility functions (auto-imported)
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

## Vue 3 (Vite)

```
project-root/
├── public/
├── src/
│   ├── assets/
│   │   └── styles/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── business/
│   │   └── form/
│   ├── composables/
│   ├── router/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── views/
│   ├── App.vue
│   └── main.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```
