import { defineComponent, computed, getCurrentInstance, ref, watch, onScopeDispose } from 'vue'
import { prefix } from 'constants/config'
import SpinIcon from './spin-icon'
import { spinPorps } from './type'
import './style/spin'
import { renderElementForPropsOrSlot } from '../_util'

const Spin = defineComponent({
  setup(props, ctx) {
    const showSpin = ref(false)
    const timer = ref()
    watch(
      () => props.spinning,
      (spinning) => {
        if (spinning) {
          const delay = Math.min(props.delay, Number.MAX_SAFE_INTEGER)
          if (delay <= 0) {
            showSpin.value = true
          } else {
            timer.value = setTimeout(() => {
              showSpin.value = true
            }, delay)
          }
        } else {
          clearTimeout(timer.value)
          timer.value = undefined
          showSpin.value = false
        }
      },
      { immediate: true }
    )
    onScopeDispose(() => {
      if (timer.value) clearTimeout(timer.value)
    })
    const wrapperNames = computed(() => {
      return [prefix + '-spin-wrapper']
    })
    const vm = getCurrentInstance()
    return () => {
      const content = ctx.slots.default?.()
      const spinNames = [prefix + '-spin', prefix + '-spin-' + props.size]
      if (content) spinNames.push(prefix + '-spin-block')
      if (!showSpin.value) spinNames.push(prefix + '-spin-hidden')
      return (
        <div {...ctx.attrs} class={spinNames}>
          {showSpin.value && (
            <div class={wrapperNames.value}>
              {props.indicator ? (
                renderElementForPropsOrSlot('indicator', vm)
              ) : (
                <>
                  <SpinIcon></SpinIcon>
                  {props.tip ? (
                    <div class={prefix + '-spin-tip'}>{renderElementForPropsOrSlot('tip', vm)}</div>
                  ) : null}
                </>
              )}
            </div>
          )}
          {content && <div class={prefix + '-spin-children'}>{content}</div>}
        </div>
      )
    }
  },
  props: spinPorps,
  name: prefix + '-spin'
})
export default Spin
