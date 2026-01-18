import { defineComponent, h, reactive, watchEffect } from 'vue'
import { prefix } from 'constants/config'
import { markdownRenderProps } from './type'
import { type CompileOptions, evaluate, type EvaluateOptions, type RunOptions } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import * as runtime from 'vue/jsx-runtime'
import * as defaultComponents from './components'
import './style/markdown'

const MarkdownRender = defineComponent({
  setup(props) {
    const getOptions = () => {
      const remarkPlugins = [...props.remarkPlugins]
      if (props.remarkGfm) {
        remarkPlugins.unshift(remarkGfm)
      }
      return {
        evaluateOptions: {
          remarkPlugins: remarkPlugins,
          rehypePlugins: [...props.rehypePlugins],
          format: props.format
        },
        compileOptions: {
          format: props.format,
          remarkPlugins: remarkPlugins,
          rehypePlugins: [...props.rehypePlugins]
        },
        runOptions: {}
      } as {
        evaluateOptions: EvaluateOptions
        compileOptions: CompileOptions
        runOptions: RunOptions
      }
    }
    const getRuntime = () => {
      const jsx = (type: string, props: Record<string, unknown> = {}) => {
        const { children, ...restProps } = props
        const slots = children ? { default: () => children } : undefined
        return h(type, restProps, slots)
      }
      return {
        ...runtime,
        jsx,
        jsxs: jsx,
        Fragment: defineComponent({
          setup(_, { slots }) {
            return () => slots.default?.()
          }
        })
      } as unknown as RunOptions
    }
    const evaluateMdxRaw = async (mdxRaw: string) => {
      const options = getOptions()
      return (
        await evaluate(mdxRaw, {
          ...options.runOptions,
          ...options.evaluateOptions,
          ...getRuntime()
        })
      ).default
    }
    const state = reactive({
      MDXContentComponent: (props: { components: Record<string, unknown> }) => {
        return <div>{props}</div>
      }
    })
    watchEffect(async () => {
      const raw = props.raw
      const MDXContentComponent = (await evaluateMdxRaw(raw)) as unknown as (props: {
        components: Record<string, unknown>
      }) => runtime.JSX.Element
      console.log('lllashdhad', MDXContentComponent)
      state.MDXContentComponent = MDXContentComponent
    })
    return () => {
      const ComponentConstructor = state.MDXContentComponent
      const components = {
        ...defaultComponents,
        ...props.components
      }

      return (
        <div class={`${prefix}-markdownRender`}>
          <ComponentConstructor components={components} />
        </div>
      )
    }
  },
  name: `${prefix}-markdown-render`,
  props: markdownRenderProps
})
export default MarkdownRender
