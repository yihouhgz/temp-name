import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    rules: {
      'typescript-eslint/no-require-import': 'off'
    }
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/build/**'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue,tsx,jsx}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue,tsx,jsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  }
])
