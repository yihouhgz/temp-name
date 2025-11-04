import { defineComponent, ref, computed, type VNode, getCurrentInstance } from 'vue'
import { buttonPropsDefaults } from './type'
import { prefix } from 'constants/config'
import Wave from '../wave'
import {
  hasPropsOrSlots,
  isArray,
  isBoolean,
  isFunction,
  isString,
  toFirstLocaleUpperCase
} from '../_util'
// import { Icon } from '../icon'
import { IconLoading } from '../icon'
import './style/button'
import { generate } from 'theme/derive'
import { formChildrenIndex } from '../_util/tab-index'
import type { StyleValue } from 'vue'

console.log(prefix, 'prefix', generate('#fff'))
const Button = defineComponent({
  setup(props, ctx) {
    const buttonRef = ref<HTMLButtonElement>()
    const handleClick = (event: MouseEvent) => {
      ctx.emit('click', event)
      if (buttonRef.value) {
        buttonRef.value?.blur()
      }
    }

    const iconRender = () => {
      if (props.loading) return <IconLoading class={`${prefix}-button-loading-icon`}></IconLoading>
      else {
        return props.icon ? (
          isFunction(props.icon) ? (
            props.icon()
          ) : (
            props.icon
          )
        ) : ctx.slots.icon ? (
          ctx.slots.icon()
        ) : (
          <></>
        )
      }
    }
    const defaultTextRender = () => {
      const vnode: VNode[] | undefined = ctx.slots.default?.()
      if (
        props.autoInsertSpace &&
        vnode &&
        vnode[0] &&
        isString(vnode[0].children) &&
        vnode[0].children.length === 2
      ) {
        const isTwoChineseChars = (str: string) => {
          const reg = /^[\u3400-\u4DBF\u4E00-\u9FFF]{2}$/
          return reg.test(str)
        }
        const content = vnode[0].children
        if (isTwoChineseChars(content)) {
          vnode[0].children = content[0] + ' ' + content[1]
        }
      }
      if (vnode) {
        let childs = null
        if (hasPropsOrSlots('icon', vm) || props.loading) {
          const textClass = `${prefix}-button-content-` + props.iconPosition
          childs = <span class={textClass}>{vnode}</span>
        }
        return childs ? childs : vnode
      }
      return null
    }
    const defaultRender = () => {
      const iconSlot = iconRender()
      const textSlot = defaultTextRender()
      let vnodes = [iconSlot, textSlot]
      if (props.iconPosition === 'right') {
        vnodes = [textSlot, iconSlot]
      }
      const template = <span class={`${prefix}-button-content`}>{...vnodes}</span>
      return {
        template: template,
        iconOnlyClass: !!iconSlot && !textSlot
      }
    }

    const buttonClass = computed(() => [
      `${prefix}-button`,
      `${prefix}-button-${props.type}`,
      `${prefix}-button-${props.size}`,
      `${prefix}-button-${props.theme}`,
      {
        [`${prefix}-button-disabled`]: props.disabled,
        [`${prefix}-button-${props.type}-disabled`]: props.disabled,
        [`${prefix}-button-loading`]: props.loading && !props.disabled,
        [`${prefix}-button-icon`]: ctx.slots.icon,
        [`${prefix}-button-block`]: props.block
      }
    ])
    const buttonStyle = computed(() => {
      const style: StyleValue & { [key: string]: string | number } = {}
      if (props.noHorizontalPadding) {
        if (isBoolean(props.noHorizontalPadding)) {
          style.padding = '0px'
        } else if (isArray(props.noHorizontalPadding)) {
          for (const direction of props.noHorizontalPadding) {
            if (direction === 'left') {
              style.paddingLeft = '0px'
            } else if (direction === 'right') {
              style.paddingRight = '0px'
            }
          }
        } else if (isString(props.noHorizontalPadding)) {
          const key = toFirstLocaleUpperCase(props.noHorizontalPadding)
          style['padding' + key] = props.noHorizontalPadding
        }
      }
      return style
    })
    const vm = getCurrentInstance()
    return () => {
      const { template, iconOnlyClass } = defaultRender()
      const classNames = [...buttonClass.value]
      if (iconOnlyClass) classNames.push(`${prefix}-button-with-icon-only`)
      else if (!iconOnlyClass && hasPropsOrSlots('icon', vm)) {
        classNames.push(`${prefix}-button-with-icon`)
      }
      return (
        <Wave
          disabled={props.disabled}
          target={buttonRef.value as HTMLElement}
          rippleSize={[10, 10]}
        >
          <button
            tabindex={formChildrenIndex}
            ref={buttonRef}
            class={classNames}
            style={buttonStyle.value}
            onClick={handleClick}
            disabled={props.disabled}
            {...ctx.attrs}
          >
            {template}
          </button>
        </Wave>
      )
    }
  },
  name: `${prefix}-button`,
  props: buttonPropsDefaults,
  emits: ['click']
})

export default Button
