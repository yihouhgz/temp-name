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
      visible: true,
      focus: false
    })
    const wrapperClass = computed(() => {
      return [
        `${prefix}-banner`,
        `${prefix}-banner-${props.type}`,
        props.bordered && !props.fullMode && `${prefix}-banner-${props.type}-bordered`,
        props.fullMode && `${prefix}-banner-full`,
        !props.fullMode && `${prefix}-banner-in-container`
      ]
    })
    const instance = getCurrentInstance()
    const handleClose = (event: Event) => {
      state.visible = false
      ctx.emit('close', event)
    }
    const handleFocus = () => {
      state.focus = true
    }
    const handleBlur = () => {
      state.focus = true
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
    const renderTitle = () => {
      if (hasPropsOrSlots('title', instance)) {
        return (
          <Text component={'div'} class={`${prefix}-banner-title`}>
            {renderElementForPropsOrSlot('title', instance)}
          </Text>
        )
      }
      return null
    }
    const renderDescription = () => {
      if (hasPropsOrSlots('description', instance)) {
        return (
          <Text component={'div'} class={`${prefix}-banner-description`}>
            {renderElementForPropsOrSlot('description', instance)}
          </Text>
        )
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
          onBlur={handleBlur}
          onFocus={handleFocus}
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
      const template = ctx.slots.default?.()
      return (
        <div class={wrapperClass.value} role="alert">
          <div class={`${prefix}-banner-content-wrapper`}>
            <div class={`${prefix}-banner-content`}>
              {renderIcon()}
              <div class={`${prefix}-banner-content-body`}>
                {renderTitle()}
                {renderDescription()}
              </div>
            </div>
            {renderCloseIcon()}
          </div>
          {template && <div class={`${prefix}-banner-extra`}>{template}</div>}
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
