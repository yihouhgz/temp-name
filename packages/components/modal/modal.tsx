import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const Modal = defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <div class={prefix + '-modal'}></div>
        </div>
      )
    }
  },
  name: prefix + '-modal'
})
export default Modal
