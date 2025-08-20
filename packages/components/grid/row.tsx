import {
  defineComponent,
  provide,
  type PropType,
  reactive,
  computed
} from 'vue'
import { prefix } from 'constants/config'
import { rowScopeKey } from './scope'
import './style/row'
import { getGutter } from './helps'

type GutterObjectType = {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}
export type Guttertype = number | GutterObjectType | Array<number | object>
export type RowProps = {
  gutter: Guttertype
  type: 'flex' | 'grid' | 'block'
  align: 'top' | 'middle' | 'bottom'
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
}
export const rowProps = {
  gutter: {
    type: [Number, Object, Array] as PropType<RowProps['gutter']>,
    default: undefined
  },
  type: {
    type: String as PropType<RowProps['type']>,
    default: 'grid'
  },
  justify: {
    type: String as PropType<RowProps['justify']>,
    default: 'start'
  },
  align: {
    type: String as PropType<RowProps['align']>,
    default: 'middle'
  }
}
const Row = defineComponent(
  (props, ctx) => {
    provide(rowScopeKey, reactive(props))
    const rowStyle = computed(() => {
      return getGutter(props.gutter)
    })
    const rowClass = computed(() => {
      return [
        props.type === 'flex' ? `tempui-row-${props.type}` : 'tempui-row',
        {
          [`tempui-row-flex-${props.justify}`]: props.justify,
          [`tempui-row-felx-${props.align}`]: props.align
        }
      ]
    })
    return () => {
      return (
        <div style={rowStyle.value} class={rowClass.value}>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
  {
    props: rowProps,
    name: prefix + '-row'
  }
)

export default Row
