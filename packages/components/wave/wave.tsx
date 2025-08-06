import { defineComponent, ref, onUnmounted } from 'vue'

const Wave = defineComponent(
  (props, { slots }) => {
    const waveRef = ref<HTMLElement | null>(null)
    const animRef = ref<HTMLSpanElement | null>(null)
    function onClick(e: MouseEvent) {
      if (props.disabled || !waveRef.value) return
      // 移除上一次动画
      if (animRef.value) {
        animRef.value.remove()
        animRef.value = null
      }
      const el = waveRef.value
      const rect = el.getBoundingClientRect()
      const wave = document.createElement('span')
      wave.className = 'vue-wave-effect'
      wave.style.left = `${e.clientX - rect.left}px`
      wave.style.top = `${e.clientY - rect.top}px`

      animRef.value = wave
      el.appendChild(wave)

      wave.addEventListener(
        'animationend',
        () => {
          wave.remove()
          animRef.value = null
        },
        { once: true }
      )
    }
    onUnmounted(() => {
      if (animRef.value) animRef.value.remove()
    })
    return () => (
      <div
        ref={waveRef}
        class="vue-wave-container"
        onClick={onClick}
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block'
        }}
      >
        {slots.default?.()}
      </div>
    )
  },
  {
    name: 'wave',
    props: {
      disabled: { type: Boolean, default: false, required: false }
    }
  }
)

export default Wave
