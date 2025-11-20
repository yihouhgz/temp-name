import { defineComponent, h, useAttrs, computed } from 'vue'
import { prefix } from 'constants/config'
import { textProps } from './type'
import { hasPropsOrSlots, isObject, renderElementForPropsOrSlot } from '../_util'
import { getCurrentInstance } from 'vue'
import './style/typography'
const Text = defineComponent({
  setup(props, ctx) {
    const createElement = h
    const vm = getCurrentInstance()
    const attar = useAttrs()
    const getComponentClass = computed(() => {
      return [
        `${prefix}-typography`,
        props.size && `${prefix}-typography-${props.size}`,
        props.type && `${prefix}-typography-${props.type}`,
        props.weight && `${prefix}-typography-${props.weight}`,
        props.disabled && `${prefix}-typography-disabled`
      ]
    })
    const render = () => {
      const component = props.component
      return createElement(
        component.tagName,
        { class: getComponentClass.value, ...attar },
        {
          default: () => {
            const renderChildren = () => {
              const template = []
              if (hasPropsOrSlots('icon', vm)) {
                template.push(
                  createElement(
                    'span',
                    { class: [`${prefix}-typography-icon`] },
                    { default: () => renderElementForPropsOrSlot('icon', vm) }
                  )
                )
              }
              const { delete: del, underline, code, mark, strong } = props
              const children = ctx.slots.default?.() || []
              const tags = [
                { enabled: del, tag: 'del' },
                { enabled: strong, tag: 'strong' },
                { enabled: underline, tag: 'u' },
                { enabled: code, tag: 'code' },
                { enabled: mark, tag: 'mark' }
              ]

              const enabledTags = tags.filter((item) => item.enabled)

              if (enabledTags.length === 0) {
                template.push(children)
                return template
              }
              let content = children
              for (let i = enabledTags.length - 1; i >= 0; i--) {
                const { tag } = enabledTags[i]
                const currentContent = content
                //@ts-expect-error doc
                content = createElement(tag, {}, { default: () => [currentContent] })
              }
              template.push(content)
              return template
            }
            if (props.link) {
              const attars: { [key: string]: unknown } = {}
              if (isObject(props.link)) {
                Object.entries(props.link).forEach(([key, value]) => {
                  attars[key] = value
                })
              }
              const linkElement = createElement(
                'a',
                { ...attars },
                { default: () => renderChildren() }
              )
              return linkElement
            }
            return renderChildren()
          }
        }
      )
    }
    return () => {
      return render()
    }
  },
  inheritAttrs: false,
  name: prefix + '-text',
  props: textProps
})

export default Text
