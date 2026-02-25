import { defineComponent, computed, Teleport, useAttrs, onMounted } from 'vue'
import { prefix } from 'constants/config'
import { portalEmits, portalProps } from './type'
import './style/portal'
import { onKeyEsc } from './utils'
const Portal = defineComponent({
  setup(props, ctx) {
    const style = computed(() => {
      return {
        zIndex: props.zIndex
      }
    })
    const allAttrs = useAttrs()
    const targetElement = computed(() => {
      const el = document.body
      const dom = props.getPopupContainer(props.triggerElementRef || el)
      if (dom) return dom
      return el
    })
    onMounted(() => {
      const { closeOnEsc } = props
      if (closeOnEsc) {
        onKeyEsc((e) => {
          ctx.emit('keyEsc', e)
        })
      }
    })
    return () => {
      return (
        <Teleport to={targetElement.value}>
          <div class={`${prefix}-portal`} style={style.value} {...allAttrs}>
            {ctx.slots.default?.()}
          </div>
        </Teleport>
      )
    }
  },
  name: prefix + '-portal',
  props: portalProps,
  emits: portalEmits,
  inheritAttrs: false
})
export default Portal
