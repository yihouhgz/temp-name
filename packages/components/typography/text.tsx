import { defineComponent, h, useAttrs, computed } from 'vue'
import { prefix } from 'constants/config'
import { textProps } from './type'
import {
  hasPropsOrSlots,
  isArray,
  isBoolean,
  isObject,
  renderElementForPropsOrSlot
} from '../_util'
import { getCurrentInstance } from 'vue'
import Tooltip from '../tooltip'
import Popover from '../popover'
import './style/typography'
import type { StyleValue } from 'vue'
const Text = defineComponent({
  setup(props, ctx) {
    const createElement = h
    const vm = getCurrentInstance()
    const attar = useAttrs()
    const getComponentClass = computed(() => {
      const { ellipsis } = props
      const rows = !isBoolean(ellipsis) ? ellipsis.rows : 1
      return [
        `${prefix}-typography`,
        props.ellipsis && [
          `${prefix}-typography-ellipsis`,
          rows === 1
            ? [
                `${prefix}-typography-ellipsis-single-line`,
                `${prefix}-typography-ellipsis-overflow-ellipsis`,
                `${prefix}-typography-ellipsis-overflow-ellipsis-text`
              ]
            : [
                `${prefix}-typography-ellipsis-multiple-line`,
                `${prefix}-typography-ellipsis-multiple-line-text`
              ]
        ],
        props.size && `${prefix}-typography-${props.size}`,
        props.type && `${prefix}-typography-${props.type}`,
        props.weight && `${prefix}-typography-${props.weight}`,
        props.disabled && `${prefix}-typography-disabled`
      ]
    })
    const getComponentStyle = computed<StyleValue>(() => {
      const style: { [key: string]: string | number } = {}
      if (
        props.ellipsis &&
        !isBoolean(props.ellipsis) &&
        props.ellipsis.rows &&
        props.ellipsis.rows > 1 &&
        isCssRenderEllipsis
      ) {
        style['-webkit-line-clamp'] = props.ellipsis.rows
      }
      return style
    })
    const isJSRenderEllipsis = computed(() => {
      //CSS 截断和 JS 截断。当设置中间截断（pos='middle')、可展开（expandable)、有后缀（suffix 非空）、可复制（copyable）
      const { ellipsis, copyable } = props
      if (copyable) return true
      if (ellipsis) {
        if (isBoolean(ellipsis)) return true
        if (ellipsis.pos === 'middle') return true
        if (ellipsis.expandable) return true
        if (ellipsis.suffix) return true
      }
      return false
    })
    const isCssRenderEllipsis = computed(() => {
      return !isJSRenderEllipsis.value
    })
    const renderPopover = (renderChildren: () => unknown) => {
      const { ellipsis } = props
      if (ellipsis) {
        return <span>{renderChildren()}</span>
      }
      return renderChildren()
    }
    const render = () => {
      const component = props.component
      return createElement(
        component.tagName,
        { ...attar, class: getComponentClass.value, style: getComponentStyle.value },
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
                    return [
                      <span class={`${prefix}-typography-link-text`}>
                        {renderPopover(renderChildren)}
                      </span>
                    ]
                  }
                }
              )
              return [linkElement]
            }
            const vNodes = renderPopover(renderChildren)
            return isArray(vNodes) ? vNodes : [vNodes]
          }
        }
      )
    }
    return () => {
      const { ellipsis } = props
      if (ellipsis) {
        if (isObject(ellipsis) && ellipsis instanceof Object) {
          const showTooltip = ellipsis.showTooltip
          if (showTooltip) {
            if (isObject(showTooltip) && showTooltip instanceof Object) {
              const {
                type = 'tooltip',
                opts = {
                  content: <span>{ctx.slots.default?.()}</span>
                }
              } = showTooltip
              if (type === 'tooltip') {
                return (
                  <Tooltip showArrow content={opts.content} position="top">
                    {render()}
                  </Tooltip>
                )
              } else {
                return (
                  <Popover content={opts.content} showArrow position="top">
                    {render()}
                  </Popover>
                )
              }
            }
            return (
              <Tooltip showArrow content={<span>{ctx.slots.default?.()}</span>}>
                {render()}
              </Tooltip>
            )
          }
        }
        return render()
      }
      return render()
    }
  },
  inheritAttrs: false,
  name: prefix + '-text',
  props: textProps
})

export default Text
