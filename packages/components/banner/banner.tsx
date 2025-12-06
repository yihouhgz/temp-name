import { defineComponent, computed, getCurrentInstance, reactive } from 'vue'
import { prefix } from 'constants/config'
import { brannerProps, brannerEmits } from './type'
import './style/banner'
import Button from '../button'
import {
  IconTickCircle,
  IconAlertCircle,
  IconAlertTriangle,
  IconInfoCircle,
  IconClose
} from '../icon'
import { hasPropsOrSlots, renderElementForPropsOrSlot } from '../_util'
import { strings } from './constant'
import { Text } from '../typography'

const Banner = defineComponent({
  setup(props, ctx) {
    const state = reactive({
      visible: true
    })
    const wrapperClass = computed(() => {
      return [
        `${prefix}-banner`,
        `${prefix}-banner-${props.type}`,
        props.bordered && `${prefix}-banner-${props.type}-border`,
        props.fullMode && `${prefix}-banner-full`
      ]
    })
    const instance = getCurrentInstance()
    const handleClose = (event: MouseEvent) => {
      state.visible = false
      ctx.emit('close', event)
    }
    const renderIcon = () => {
      let icon = null
      if (props.icon === null) {
        icon = null
      } else if (hasPropsOrSlots('icon', instance)) {
        icon = renderElementForPropsOrSlot('icon', instance)
      } else {
        if (props.type === strings.type.success) {
          icon = <IconTickCircle size="large" aria-label={strings.type.success} />
        } else if (props.type === strings.type.warning) {
          icon = <IconAlertTriangle size="large" aria-label={strings.type.warning} />
        } else if (props.type === strings.type.danger) {
          icon = <IconAlertCircle size="large" aria-label={strings.type.danger} />
        } else {
          icon = <IconInfoCircle size="large" aria-label={strings.type.info} />
        }
      }
      return <div class={`${prefix}-banner-icon`}>{icon}</div>
    }
    const renderDescription = () => {
      if (hasPropsOrSlots('description', instance)) {
        return <Text>{renderElementForPropsOrSlot('description', instance)}</Text>
      }
      return null
    }
    const renderCloseIcon = () => {
      let closeIcon = null
      if (props.closeIcon === null) {
        return null
      }
      if (hasPropsOrSlots('closeIcon', instance)) {
        closeIcon = (
          <span aria-label="close" aria-hidden="true">
            {renderElementForPropsOrSlot('closeIcon', instance)}
          </span>
        )
      } else {
        closeIcon = <IconClose aria-label="close" aria-hidden="true" />
      }
      return (
        <Button
          class={`${prefix}-banner-close-icon`}
          onClick={handleClose}
          aria-label="close"
          aria-disabled="false"
          type="tertiary"
          theme="borderless"
          size="small"
          icon={<>{closeIcon}</>}
        ></Button>
      )
    }
    const renderBanner = () => {
      return (
        <div class={wrapperClass.value} role="alert">
          <div class={`${prefix}-banner-content-wrapper`}>
            <div class={`${prefix}-banner-content`}>
              {renderIcon()}
              <div class={`${prefix}-banner-content-body`}>{renderDescription()}</div>
            </div>
            {renderCloseIcon()}
          </div>
        </div>
      )
    }
    return () => {
      return state.visible ? renderBanner() : null
    }
  },
  props: brannerProps,
  emits: brannerEmits,
  name: prefix + '-banner'
})

export default Banner
