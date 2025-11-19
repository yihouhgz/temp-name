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
        props.disabled && `${prefix}-typography-disabled`,
        props.delete && `${prefix}-typography-delete`,
        props.underline && `${prefix}-typography-underline`
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
              if (props.mark || props.code) {
                const tagName = props.code ? 'code' : 'mark'
                template.push(createElement(tagName, {}, { default: () => ctx.slots.default?.() }))
              } else {
                template.push(ctx.slots.default?.())
              }
              return template
            }
            if (props.link) {
              const attars: { [key: string]: unknown } = {}
              if (isObject(props.link)) {
                Object.entries(([key, v]: [string, string]) => {
                  attars[key] = v
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
