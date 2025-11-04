import { defineConfig } from 'vitepress'
import { projectName } from '../constant'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: projectName,
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '基础用法',
        items: [
          { text: '介绍', link: '/api-examples' },
          { text: '快速开始', link: '/markdown-examples' }
        ]
      },
      {
        text: 'components',
        items: [
          {
            text: '基础组件',
            items: [
              { text: 'Button', link: '/components/button' },
              { text: 'Icon', link: '/components/input' }
            ]
          }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  },
  markdown: {
    config: (md) => {
      md.core.ruler.after('inline', 'replace-project-name', (state) => {
        state.tokens.forEach((token) => {
          if (token.type === 'fence' && token.content) {
            token.content = token.content.replace(/\{\{projectName\}\}/g, projectName)
          }
        })
      })
    }
  },
  vite: {
    plugins: [vueJsx()]
  }
})
