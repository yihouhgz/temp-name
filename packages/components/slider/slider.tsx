import { prefix } from 'constants/config'
import { defineComponent } from 'vue'
import './style/silder'
import Tooltip from '../tooltip'

const Slider = defineComponent({
  setup() {
    return () => (
      <div class={`${prefix}-slider`}>
        <div class={`${prefix}-slider-wrapper`}>
          <div class={`${prefix}-slider-rail`}></div>
          <div class={`${prefix}-slider-track`}></div>
        </div>
        <div>
          <Tooltip content={<span>0</span>}>
            <span
              class={`${prefix}-slider-handle`}
              role="slider"
              tabindex="0"
              aria-disabled="false"
              aria-valuenow="0"
              aria-valuemax="100"
              aria-valuemin="0"
            ></span>
          </Tooltip>
        </div>
        <div class={`${prefix}-slider-boundary`}>
          <div class={`${prefix}-slider-boundary-min`}>0</div>
          <div class={`${prefix}-slider-boundary-max`}>100</div>
        </div>
      </div>
    )
  },
  name: prefix + 'slider'
})

export default Slider
