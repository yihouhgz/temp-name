import { defineComponent, Transition } from 'vue'
import 'theme/transition/portal.scss'
export default defineComponent((props, ctx) => {
  return () => {
    return (
      <Transition name="portal">
        <div>{ctx.slots.default?.()}</div>
      </Transition>
    )
  }
})
