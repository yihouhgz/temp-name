import { defineComponent, type PropType } from 'vue'
import { useRowScope } from './scope'
import consola from '../_util/console'
import { prefix } from 'constants/config'
import './style/col'
import { computed } from 'vue'
import { getGutter } from './helps'

type UnitReactiveObjectType = {
  span?: number
  offset?: number
}
const gridMaxCol = 24
const props = {
  lg: {
    type: Object as PropType<UnitReactiveObjectType>,
    default: undefined
  },
  md: {
    type: Object as PropType<UnitReactiveObjectType>,
    default: undefined
  },
  sm: {
    type: Object as PropType<UnitReactiveObjectType>,
    default: undefined
  },
  xs: {
    type: Object as PropType<UnitReactiveObjectType>,
    default: undefined
  },
  xl: {
    type: Object as PropType<UnitReactiveObjectType>,
    default: undefined
  },
  xxl: {
    type: Object as PropType<UnitReactiveObjectType>,
    default: undefined
  },
  span: {
    type: Number,
    default: gridMaxCol
  },
  offset: {
    type: Number,
    default: undefined
  },
  order: {
    type: Number,
    default: undefined
  },
  pull: {
    type: Number,
    default: undefined
  },
  push: {
    type: Number,
    default: undefined
  }
}
const Col = defineComponent(
  (props, ctx) => {
    const rowScope = useRowScope()
    if (!rowScope) consola.warn('Col must be placed as a child of Row')
    const colClass = computed(() => {
      const { span } = props
      return [
        'tempui-col',
        `tempui-col-${span}`,
        {
          [`tempui-col-offset-${props.offset}`]: props.offset
        }
      ]
    })
    const colStyle = computed(() => {
      if (rowScope) return getGutter(rowScope.gutter, true)
      else return {}
    })
    return () => {
      return (
        <div style={colStyle.value} class={colClass.value} {...ctx.attrs}>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
  {
    name: prefix + '-col',
    props
  }
)

export default Col
