import {
  defineComponent,
  h,
  useAttrs,
  computed,
  reactive,
  getCurrentInstance,
  type ExtractPropTypes
} from 'vue'
import { prefix } from 'constants/config'
import { textProps, type CopyableConfigType } from './type'
import {
  hasPropsOrSlots,
  isArray,
  isBoolean,
  isFunction,
  // isObject,
  renderElementForPropsOrSlot,
  useRandomId,
  useSetTimeout
} from '../_util'
import { isObject } from 'lodash'
import Tooltip from '../tooltip'
import Popover from '../popover'
import './style/typography'
import type { StyleValue } from 'vue'
import type { VueNode } from '../_util/type'
import { IconCopy, IconTick } from 'icons'
import { copyText } from './utils'
import LocaleConsumer from '../locale/locale-consumer'

const Text = defineComponent({
  setup(props, ctx) {
    const createElement = h
    const vm = getCurrentInstance()
    const attar = useAttrs()
    const state = reactive({
      coping: false
    })
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
        props.disabled && `${prefix}-typography-disabled`,
        attar.class,
        props.link && `${prefix}-typography-link`
      ]
    })
    const getComponentStyle = computed<StyleValue>(() => {
      const style: { [key: string]: string | number } = Object.assign({}, attar.style)
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
    const copyTooltipId = computed(() => {
      return useRandomId(5)
    })
    const handleClickCopy = (content: string) => {
      let text = content
      if (isObject(props.copyable) && props.copyable.content) {
        text = props.copyable.content
      }
      copyText(text).then(() => {
        state.coping = true
        const delay = 3000
        useSetTimeout(() => {
          state.coping = false
        }, delay)
      })
    }
    const getCopyableOptions = () => {
      const { copyable } = props
      let options = {
        content: '',
        copyTip: undefined,
        icon: undefined,
        render: undefined,
        successTip: undefined
      } as unknown as CopyableConfigType
      if (isBoolean(copyable)) {
        return options
      }
      options = { ...options, ...copyable }
      return options
    }
    const renderPopover = (renderChildren: () => unknown[]) => {
      const { ellipsis } = props
      const template = renderChildren() || []
      if (props.copyable) {
        const options = getCopyableOptions()
        const text = template.join('')
        if (isFunction(options.render)) {
          const copied = state.coping
          const doCopy = () => {
            handleClickCopy(text)
          }
          const config = { ...options }
          const vn = config.render(copied, doCopy, config)
          template.push(vn)
        }
        const copyable = (
          <LocaleConsumer componentName="Typography">
            {(locale: { copy: string; copied: string }) => {
              const copy = (
                <span class={`${prefix}-typography-action-copy`}>
                  <Tooltip
                    showArrow
                    content={<span>{options.copyTip || locale.copy}</span>}
                    position="top"
                    wrapperId={copyTooltipId.value}
                  >
                    <a
                      onClick={() => handleClickCopy(text)}
                      class={`${prefix}-typography-action-copy-icon`}
                      tabindex={'0'}
                      aria-describedby={copyTooltipId.value}
                      data-popupid={copyTooltipId.value}
                    >
                      {options.icon ? options.icon : <IconCopy aria-label="copy"></IconCopy>}
                    </a>
                  </Tooltip>
                </span>
              )
              const copied = (
                <span class={`${prefix}-typography-action-copied`}>
                  <span>
                    <IconTick class={`${prefix}-typography-action-copied-icon`}></IconTick>
                    {options.successTip || locale.copied}
                  </span>
                </span>
              )
              return state.coping ? copied : copy
            }}
          </LocaleConsumer>
        )
        template.push(copyable)
      }
      if (ellipsis) {
        return <span>{template}</span>
      }
      return template
    }
    const renderIcon = () => {
      if (hasPropsOrSlots('icon', vm)) {
        return createElement(
          'span',
          { class: [`${prefix}-typography-icon`] },
          { default: () => renderElementForPropsOrSlot('icon', vm) }
        )
      }
    }
    const render = () => {
      const component = props.component
      return createElement(
        component,
        { ...attar, class: getComponentClass.value, style: getComponentStyle.value },
        {
          default: () => {
            const renderChildren = () => {
              const template = []
              if (!props.link && hasPropsOrSlots('icon', vm)) template.push(renderIcon())
              const { delete: del, underline, code, mark, strong } = props
              const children = ctx.slots.default?.() || []
              const tags = [
                { enabled: del, tag: 'del' },
                { enabled: strong, tag: 'strong' },
                { enabled: underline && !props.link, tag: 'u' },
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
              const component = props.disabled ? 'span' : 'a'
              const linkElement = createElement(
                component,
                { ...attars },
                {
                  default: () => {
                    return [
                      renderIcon(),
                      <span
                        class={`${prefix}-typography-link-text ${props.underline ? `${prefix}-typography-link-underline` : ''}`}
                      >
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
                  <Tooltip showArrow content={opts.content as VueNode} position="top">
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
export type TextProps = ExtractPropTypes<typeof textProps>
