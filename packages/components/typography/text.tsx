import { defineComponent, h, useAttrs, computed } from 'vue'
import { prefix } from 'constants/config'
import { textProps } from './type'
import { hasPropsOrSlots, isArray, isObject, renderElementForPropsOrSlot } from '../_util'
import { getCurrentInstance } from 'vue'
import Tooltip from '../tooltip'
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
    const renderPopover = (renderChildren: () => unknown) => {
      const { ellipsis } = props
      if (ellipsis) {
        const template = <span>{renderChildren()}</span>
        if (typeof ellipsis === 'object') {
          if (typeof ellipsis.showTooltip === 'object') {
            return (
              <Tooltip showArrow content={ellipsis.showTooltip.opts.content}>
                {template}
              </Tooltip>
            )
          }
        }
        return template
      }
      return renderChildren()
    }
    const render = () => {
      const component = props.component
      console.log(props.ellipsis)
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
                {
                  default: () => {
                    return renderPopover(renderChildren)
                  }
                }
              )
              return linkElement
            }
            const vNodes = renderPopover(renderChildren)
            return isArray(vNodes) ? vNodes : [vNodes]
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
