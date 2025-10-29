import { defineComponent, computed, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { toastProps, toastTypeMap } from './type'
import { IconTickCircle, IconAlertCircle, IconAlertTriangle, IconInfoCircle } from '../icon'
import { hasPropsOrSlots, isNumber, renderElementForPropsOrSlot } from '../_util'
import Button from '../button'

const Toast = defineComponent({
  setup(props) {
    const classNames = computed(() => {
      return [
        prefix + '-toast',
        {
          [prefix + '-toast-info']: props.type
        }
      ]
    })
    const vm = getCurrentInstance()
    const renderIcon = () => {
      if (hasPropsOrSlots('icon', vm)) {
        return <div>{renderElementForPropsOrSlot('icon', vm)}</div>
      }
      return props.type === toastTypeMap.success ? (
        <IconTickCircle />
      ) : props.type === toastTypeMap.warning ? (
        <IconAlertTriangle />
      ) : props.type === toastTypeMap.error ? (
        <IconAlertCircle />
      ) : (
        <IconInfoCircle />
      )
    }
    const renderContent = () => {
      const template = renderElementForPropsOrSlot('content', vm)
      let maxWidth = props.textMaxWidth
      if (isNumber(maxWidth)) maxWidth = maxWidth + 'px'
      else {
        const isFlag = maxWidth.includes('%') || maxWidth.includes('px')
        maxWidth = isFlag ? maxWidth : maxWidth + 'px'
      }
      return (
        <span class={prefix + '-toast-text'} style={{ maxWidth: maxWidth }}>
          {template}
        </span>
      )
    }
    return () => {
      return (
        <div role="alert" aria-label={`${props.type} type`} class={classNames.value}>
          <div class={prefix + '-toast-content'}>
            {renderIcon()}
            {renderContent()}
            {props.showClose && (
              <div class={`${prefix}-toast-close-button`}>
                <Button type="info" size="small">
                  <IconTickCircle />
                </Button>
              </div>
            )}
          </div>
        </div>
      )
    }
  },
  name: prefix + '-toast-interior',
  props: toastProps,
  emits: ['close']
})
export default Toast
