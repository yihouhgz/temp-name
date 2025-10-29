import { defineComponent } from 'vue'
import { wrapperPorpos } from './type'
import { prefix } from 'constants/config'

const Wrapper = defineComponent({
  setup(props, ctx) {
    let id = props.id
    if (!id) {
      id = Math.random().toString(36).substring(2)
    }
    const wrapperId = 'toast-wrapper-' + id
    return () => {
      return (
        <div class={prefix + '-toast-wrapper'} id={wrapperId} style={{ zIndex: props.zIndex }}>
          <div class={`${prefix}-toast-innerWrapper ${prefix}-toast-innerWrapper-hover`}>
            {ctx.slots.default?.()}
          </div>
        </div>
      )
    }
  },
  props: wrapperPorpos,
  name: prefix + '-toast-wrapper'
})
export default Wrapper
