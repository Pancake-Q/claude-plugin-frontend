import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    markdown: true,
  },
  ignores: [
    '.agents/**',
    '.claude/**',
    '.idea/**',
    'skills/**',
  ],
})
