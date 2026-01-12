import type { PropType } from 'vue'

export const markdownRenderProps = {
  /**
   * @description 用于覆盖 Markdown 元素，也可添加自定义组件
   */
  components: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /**
   * @description 传入的 raw 类型，是否是纯 Markdown 'md'|'mdx'
   */
  format: {
    type: String as PropType<'md' | 'mdx'>,
    default: 'mdx'
  },
  /**
   * @description Markdown 或 MDX 的纯文本
   */
  raw: {
    type: String,
    default: ''
  },
  /**
   * @description 是否开启 Github GFM 语法，safari 16.3 之前不支持环视断言会报错
   */
  remarkGfm: {
    type: Boolean,
    default: true
  },
  /**
   * @description 自定义 Remark Plugin
   */
  remarkPlugins: {
    type: Array as PropType<unknown[]>,
    default: () => []
  },

  /**
   * @description 自定义 Rehype Plugin
   */
  rehypePlugins: {
    type: Array as PropType<unknown[]>,
    default: () => []
  }
}
