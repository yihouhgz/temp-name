import { defineComponent, ref, computed, type VNode } from 'vue'
// import type { ButtonInstance } from './type'
import { buttonPropsDefaults } from './type'
import { prefix } from 'constants/config'
import Wave from '../wave'
import { isFunction, isString } from '../_util'
import LoadingIcon from '../icon/loading'
import './style/button'
import { generate } from 'theme/derive'
console.log(prefix, 'prefix', generate('#fff'))
console.log(buttonPropsDefaults, 'ButtonPropsType')
const Button = defineComponent(
  (props, ctx) => {
    console.log(props, 'props')
    const buttonRef = ref<HTMLButtonElement>()
    const handleClick = (event: MouseEvent) => {
      ctx.emit('click', event)
      if (buttonRef.value) {
        buttonRef.value?.blur()
      }
    }

    const iconRender = () => {
      if (props.loading) return <LoadingIcon />
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
      return vnode
    }
    const defaultRender = () => {
      return (
        <span class="tempui-button-content">
          {iconRender()}
          <span>{defaultTextRender()}</span>
        </span>
      )
    }

    const buttonClass = computed(() => [
      'tempui-button',
      `tempui-button-${props.type}`,
      `tempui-button-${props.size}`,
      {
        'is-disabled': props.disabled,
        'tempui-button-loading': props.loading && !props.disabled,
        'tempui-button-icon': ctx.slots.icon,
        'tempui-button-block': props.block
      }
    ])

    return () => {
      return (
        <Wave disabled={props.disabled} target={buttonRef.value as HTMLElement}>
          <button
            ref={buttonRef}
            class={buttonClass.value}
            onClick={handleClick}
            disabled={props.disabled}
            {...ctx.attrs}
          >
            {defaultRender()}
          </button>
        </Wave>
      )
    }
  },
  {
    name: `${prefix}-button`,
    props: buttonPropsDefaults,
    emits: ['click']
  }
)

export default Button
