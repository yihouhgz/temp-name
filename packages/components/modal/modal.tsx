import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { useLocaleInject } from '../locale/content'

const Modal = defineComponent({
  setup() {
    const lang = useLocaleInject()
    console.log(lang)
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
