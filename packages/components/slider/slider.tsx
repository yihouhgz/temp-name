import { prefix } from 'constants/config'
import { defineComponent } from 'vue'

const Slider = defineComponent({
  setup() {
    return () => (
      <div class={`${prefix}-slider`}>
        <div class={`${prefix}-slider-track`}></div>
        <div class={`${prefix}-slider-handle`}></div>
      </div>
    )
  },
  name: prefix + 'slider'
})

export default Slider
