import { defineComponent, computed, type StyleValue } from 'vue'
import { prefix } from 'constants/config'
import './style/space'
import { spaceProps } from './type'
import { isArray, isNumber, isString } from '../_util'

const Space = defineComponent({
  setup(props, ctx) {
    const wrapperNames = computed(() => {
      const classNames = [
        prefix + '-space',
        prefix + '-space-align-' + props.align,
        props.vertical ? [prefix + '-space-vertical'] : [prefix + '-space-horizontal'],
        {
          [prefix + '-space-wrap']: props.wrap
        }
      ]
      if (isString(props.spacing)) {
        classNames.push(
          prefix + '-space-' + props.spacing + '-horizontal',
          prefix + '-space-' + props.spacing + '-vertical'
        )
      }
      return classNames
    })
    const wrapperStyle = computed(() => {
      const style: StyleValue = Object.assign({}, ctx.attrs.style)
      if (isNumber(props.spacing)) {
        if (props.vertical) style.columnGap = props.spacing + 'px'
        else style.rowGap = props.spacing + 'px'
      }
      if (isArray(props.spacing)) {
        const [x, y] = props.spacing
        style.columnGap = x + 'px'
        style.rowGap = y + 'px'
      }
      return style
    })
    return () => {
      return (
        <div {...ctx.attrs} class={wrapperNames.value} style={wrapperStyle.value}>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
  props: spaceProps,
  name: prefix + '-space'
})
export default Space
