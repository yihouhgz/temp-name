import { defineComponent } from 'vue'
import { wrapperPorpos } from './type'
import { prefix } from 'constants/config'
import Toast from './toast'
import './style/toast'

const Wrapper = defineComponent({
  setup(props) {
    let id = props.id
    if (!id) {
      id = Math.random().toString(36).substring(2)
    }
    const wrapperId = 'toast-wrapper-' + id
    return () => {
      return (
        <div class={prefix + '-toast-wrapper'} id={wrapperId} style={{ zIndex: props.zIndex }}>
          <div class={`${prefix}-toast-wrapper-inner ${prefix}-toast-wrapper-inner-hover`}>
            <Toast content="Not auto close" type={'info'}></Toast>
          </div>
        </div>
      )
    }
  },
  props: wrapperPorpos,
  name: prefix + '-toast-wrapper'
})
export default Wrapper
