import { iconProps, iconEmits } from './types'
import { defineComponent, computed, type CSSProperties, type VNode, type Component } from 'vue'
import { prefix } from 'constants/config'
import { omitKeys } from '../_util/index'
import './style/icon'

const Icon = defineComponent({
  setup(props, ctx) {
    const spanClass = computed(() => {
      const { spin, size, type } = props
      return [
        `${prefix}-icon}`,
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
    return () => {
      return (
        <span class={spanClass.value} style={spanStyle.value} {...ctx.attrs}>
          {ctx.slots.default?.()}
        </span>
      )
    }
  },
  name: prefix + '-icon',
  props: iconProps,
  emits: iconEmits
})

const nameToSplit = (name: string) => {
  let str = ''
  for (const s of name) {
    if (s === s.toLocaleUpperCase()) str += '-' + s.toLocaleLowerCase()
    else str += s
  }
  return str
}

export function warpperIcon(icon: VNode | Component, name: string) {
  const innerProps = omitKeys(iconProps, ['type', 'svg'])
  const InnerIcon = defineComponent({
    setup(props) {
      return <Icon svg={icon} type={name} {...props}></Icon>
    },
    props: innerProps,
    emits: iconEmits,
    name: prefix + '-icon' + nameToSplit(name)
  })
  return InnerIcon
}

export default Icon
