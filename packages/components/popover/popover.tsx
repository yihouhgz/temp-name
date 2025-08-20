import { defineComponent, Fragment } from 'vue'
import { prefix } from 'constants/config'
import { popoverProps } from './type'

const Popover = defineComponent(
  (props, ctx) => {
    const defaultSlot = ctx.slots.default?.()
    console.log(defaultSlot)
    return () => {
      return <Fragment>{ctx.slots.default?.()}</Fragment>
    }
  },
  { name: prefix + '-popover', props: popoverProps }
)

export default Popover
