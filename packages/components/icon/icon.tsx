import { iconProps, iconEmits } from './types'
import { defineComponent, computed, getCurrentInstance } from 'vue'
import type { CSSProperties, VNode, Component, ComponentInternalInstance } from 'vue'
import { prefix } from 'constants/config'
import { omitKeys, renderElementForPropsOrSlot } from '../_util/index'
import './style/icon'

const IconJsx = defineComponent({
  setup(props, ctx) {
    const spanClass = computed(() => {
      const { spin, size, type } = props
      return [
        `${prefix}-icon`,
        `${prefix}-icon-${size}`,
        `${prefix}-icon-${type}`,
        {
          [`${prefix}-icon-spin`]: spin
        }
      ]
    })
    const spanStyle = computed(() => {
      const { rotate } = props
      const style: CSSProperties = {}
      if (Number.isSafeInteger(rotate)) {
        style.transform = `rotate(${rotate}deg)`
      }
      return style
    })
    const vm = getCurrentInstance()
    return () => {
      return (
        <span class={spanClass.value} style={spanStyle.value} {...ctx.attrs}>
          {renderElementForPropsOrSlot(
            { propName: 'svg', slotName: 'default' },
            vm as ComponentInternalInstance
          )}
        </span>
      )
    }
  },
  name: prefix + '-icon-jsx',
  props: iconProps,
  emits: iconEmits
})

const nameToSplit = (name: string) => {
  let str = ''
  for (const s of name) {
    if (s === s.toLocaleUpperCase() && s !== '-') str += '-' + s.toLocaleLowerCase()
    else str += s
  }
  return str
}

export function warpperIcon(icon: VNode | Component, name: string) {
  const innerProps = omitKeys(iconProps, ['type', 'svg'])
  const renderIcon = () => <icon></icon>
  const InnerIcon = defineComponent({
    setup(props) {
      return () => <IconJsx svg={renderIcon} type={name} {...props}></IconJsx>
    },
    props: innerProps,
    emits: iconEmits,
    name: prefix + '-' + nameToSplit(name)
  })
  return InnerIcon
}

export default IconJsx
