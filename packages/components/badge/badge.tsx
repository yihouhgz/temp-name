import { computed, defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { badgeProps } from './type'
import { isObject } from '../_util'
import './style/badge'

const Badge = defineComponent({
  setup(props, ctx) {
    const badgeClass = computed(() => {
      const { dot } = props
      return [
        `${prefix}-badge-${props.type}`,
        `${prefix}-badge-${props.theme}`,
        `${prefix}-badge-${dot ? 'dot' : 'count'}`
      ]
    })
    const renderCount = () => {
      const { count, dot, overflowCount } = props
      if (dot) return null
      if (Number(count) > overflowCount) return overflowCount + '+'
      return count
    }
    return () => {
      const children = ctx.slots.default?.()
      const isCustom = isObject(props.count)
      const classNames = isCustom ? [] : [...badgeClass.value]
      if (children?.length) {
        classNames.push(`${prefix}-badge-${props.position}`)
      } else {
        classNames.push(`${prefix}-badge-block`)
      }
      return (
        <span class={`${prefix}-badge`}>
          {children}
          <span class={classNames}>{renderCount()}</span>
        </span>
      )
    }
  },
  props: badgeProps,
  name: prefix + '-badge'
})
export default Badge
