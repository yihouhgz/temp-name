import { defineComponent, ref } from 'vue'
import { prefix } from 'constants/config'
import { modalProps } from './type'
import ModalBase from './base'
import Portal from '../portal'

const Modal = defineComponent({
  setup(props, ctx) {
    const triggerElementRef = ref<HTMLElement>()
    return () => {
      return (
        <Portal
          getPopupContainer={props.getPopupContainer}
          triggerElementRef={triggerElementRef.value as HTMLElement}
          zIndex={props.zIndex}
        >
          <ModalBase {...props}>{ctx.slots?.default?.()}</ModalBase>
        </Portal>
      )
    }
  },
  props: modalProps,
  name: prefix + '-modal'
})
export default Modal
