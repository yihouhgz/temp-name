import { defineConfig } from 'vitepress'
import { projectName } from '../constant'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  title: projectName,
  description: 'A VitePress Site',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '团队成员', link: '/team-members' }
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
          },
          {
            text: '反馈类',
            items: [{ text: 'Toast', link: '/components/toast' }]
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

      // 修改规则以使用 MonacoEditor 组件
      md.core.ruler.after('replace-project-name', 'replace-v-manaco', (state) => {
        state.tokens.forEach((token, index) => {
          // 修复条件判断，确保能正确识别 v-manaco 代码块
          if (token.type === 'fence' && token.info && token.info.indexOf('v-monaco') >= 0) {
            const componentToken = new state.Token('html_block', '', 0)
            // 将代码内容转义并传递给 MonacoEditor 组件的 code 属性
            const escapedContent = token.content
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;')
              .replace(/\n/g, '&#10;')

            componentToken.content = `<MonacoEditor code="${escapedContent}" />`
            state.tokens[index] = componentToken
          }
        })
      })
    }
  },
  vite: {
    plugins: [vueJsx() as unknown as undefined]
  }
})
