// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { MonacoEditor } from '../../monaco.tsx'
import ReplMonaco from '../../editor/repl-monaco.tsx'
import * as Components from '../../../dist'
import '../../..//dist/ui-vue-components.esm.css'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    console.log(app, router, siteData)
    app.component('MonacoEditor', MonacoEditor)
    app.component('ReplMonaco', ReplMonaco)
    app.use(Components)
  }
} satisfies Theme
