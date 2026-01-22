import { prefix } from 'constants/config'
import { computed, defineComponent, type StyleValue } from 'vue'
import { dividerProps } from './type'
import './style/divider'
import { isNumber, isUndefined } from '../_util'

const Divider = defineComponent({
  setup(props, ctx) {
    const style = computed<StyleValue>(() => {
      let { margin } = props
      if (isUndefined(margin)) return {}
      if (isNumber(margin)) {
        margin = margin + 'px'
      }
      if (props.layout === 'horizontal') {
        return {
          marginTop: margin,
          marginBottom: margin
        }
      }
      return {
        marginLeft: margin,
        marginRight: margin
      }
    })
    return () => {
      const child = ctx.slots.default?.()
      const classCls = [
        prefix + '-divider',
        prefix + '-divider-' + props.layout,
        props.dashed ? prefix + '-divider-dashed' : '',
        child && [prefix + '-divider-with-text', prefix + '-divider-with-text-' + props.align]
      ]
      return (
        <div style={style.value} class={classCls}>
          {child && <span class={prefix + '-divider_inner-text'}>{child}</span>}
        </div>
      )
    }
  },
  props: dividerProps,
  name: prefix + '-divider'
})
export default Divider
