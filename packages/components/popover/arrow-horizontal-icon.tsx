import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const ArrowHorizontalIcon = defineComponent(
  () => {
    return () => (
      <svg
        width="24"
        height="8"
        xmlns="http://www.w3.org/2000/svg"
        class={`${prefix}-popover-icon-arrow`}
      >
        <path d="M0.5 0L1.5 0C1.5 4, 3 5.5, 5 7.5S8,10 8,12S7 14.5, 5 16.5S1.5,20 1.5,24L0.5 24L0.5 0z"></path>
        <path d="M0 0L1 0C1 4, 2 5.5, 4 7.5S7,10 7,12S6 14.5, 4 16.5S1,20 1,24L0 24L0 0z"></path>
      </svg>
    )
  },
  { name: 'ArrowHorizontalIcon' }
)
export default ArrowHorizontalIcon
