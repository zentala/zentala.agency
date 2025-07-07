import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['node_modules/**', '.astro/**', 'dist/**'],
  },
  ...eslintPluginAstro.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
)
