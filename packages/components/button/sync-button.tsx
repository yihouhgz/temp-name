import Button from './button'
import { defineComponent, ref } from 'vue'
import { prefix } from 'constants/config'
import { buttonPropsDefaults } from './type'
import type { PropType } from 'vue'

const SyncButton = defineComponent({
  setup(props, ctx) {
    const loading = ref(false)
    const handleClick = (e: MouseEvent) => {
      if (props.onClick) {
        const options = {
          done() {
            loading.value = false
          }
        }
        loading.value = true
        props.onClick(e, options).finally(() => {
          loading.value = false
        })
      }
    }
    return () => {
      return (
        <Button {...props} {...ctx.attrs} loading={loading.value} onClick={handleClick}>
          {ctx.slots.default?.()}
        </Button>
      )
    }
  },
  inheritAttrs: false,
  name: prefix + '-sync-button',
  props: {
    ...buttonPropsDefaults,
    onClick: {
      type: Function as PropType<
        (e: MouseEvent, options: { done: () => void }) => Promise<unknown>
      >,
      default: null,
      required: false
    }
  }
  // emits: {
  //   click: (event: MouseEvent, options: { done: () => void }) => {
  //     return event instanceof MouseEvent && options
  //   }
  // }
})
export default SyncButton
