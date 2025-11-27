import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import Tooltip from '../tooltip'
import { popconfirmProps, popconfirmEmits } from './type'
import { useConfigProvider } from '../config-provider/utils'
import { watchEffect } from 'vue'
import { reactive } from 'vue'

const Popconfirm = defineComponent({
  setup(props, ctx) {
    const state = reactive({
      props: { ...props }
    })
    const config = useConfigProvider()
    watchEffect(() => {
      if (config) {
        state.props.cancelText = config.locale.popconfirm.cancelText
        state.props.okText = config.locale.popconfirm.okText
      }
    })
    const handleVisibleChange = (visible: boolean) => {
      ctx.emit('visibleChange', visible)
    }
    const handleClickOutSide = (e: Event) => {
      ctx.emit('clickOutSide', e)
    }
    const renderContent = () => {
      return <span>1</span>
    }
    return () => {
      const tooltipProps = {
        arrowPointAtCenter: props.arrowPointAtCenter,
        showArrow: props.showArrow,
        motion: props.motion,
        getPopupContainer: props.getPopupContainer,
        trigger: props.trigger,
        position: props.position,
        visible: props.visible,
        zIndex: props.zIndex
      }
      return (
        <Tooltip
          {...tooltipProps}
          content={renderContent()}
          onVisibleChange={handleVisibleChange}
          onClickOutSide={handleClickOutSide}
        >
          {ctx.slots.default?.()}
        </Tooltip>
      )
    }
  },
  name: prefix + '-popconfirm',
  props: popconfirmProps,
  emits: popconfirmEmits
})
export default Popconfirm
