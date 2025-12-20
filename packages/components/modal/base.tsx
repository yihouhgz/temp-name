import { computed, defineComponent, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { useLocaleInject } from '../locale/content'
import { renderElementForPropsOrSlot, useRandomId } from '../_util'
import Button from '../button'
import { IconClose } from '../icon'
import { modalProps } from './type'
import Typography from '../typography'
import './style/modal'

export default defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const lang = useLocaleInject()
    const modal = 'dialog-' + useRandomId(5)
    const wrapperClass = computed(() => {
      const { size } = props
      return [prefix + '-modal', `${prefix}-modal-${size}`]
    })
    return () => {
      if (!props.visible) {
        return null
      }
      return (
        <div>
          <div class={`${prefix}-modal-mask`} role="none"></div>
          <div class={prefix + '-modal-wrap'}>
            <div class={wrapperClass.value} id={modal}>
              <div
                class={prefix + '-modal-content'}
                role="dialog"
                aria-labelledby={prefix + '-modal-title'}
                aria-describedby={prefix + '-modal-body'}
              >
                <div class={prefix + '-modal-header'}>
                  <Typography.Title class={prefix + '-modal-title'} heading={4}>
                    {renderElementForPropsOrSlot('title', instance)}
                  </Typography.Title>
                  <Button
                    class={`${prefix}-modal-icon-close`}
                    aria-label="close"
                    aria-disabled="false"
                    type="tertiary"
                    theme="borderless"
                    size="small"
                    icon={<IconClose aria-label="close" aria-hidden="true"></IconClose>}
                  ></Button>
                </div>
                <div class={prefix + '-modal-body'} id={prefix + '-modal-body'}>
                  {ctx.slots?.default?.()}
                </div>
                <div class={prefix + '-modal-footer'}>
                  <div>
                    <Button aria-label="cancel" aria-disabled="false" type="tertiary" theme="light">
                      {props.cancelText || lang.Modal.cancelText}
                    </Button>
                    <Button aria-label="confirm" aria-disabled="false" type="primary" theme="solid">
                      {props.okText || lang.Modal.okText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  },
  name: 'ModalBase',
  props: modalProps
})
