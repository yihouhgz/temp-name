import { defineComponent, Transition, useSlots } from 'vue'

export default defineComponent(() => {
  const slots = useSlots()
  return () => {
    return <Transition appear>{slots.default?.()}</Transition>
  }
})
