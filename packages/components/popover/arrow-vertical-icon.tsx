import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const ArrowHorizontalIcon = defineComponent(
  () => {
    return () => (
      <svg
        class={`${prefix}-popover-icon-arrow`}
        width="24"
        height="8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0.5L0 1.5C4 1.5, 5.5 3, 7.5 5S10,8 12,8S14.5 7, 16.5 5S20,1.5 24,1.5L24 0.5L0 0.5z"></path>
        <path d="M0 0L0 1C4 1, 5.5 2, 7.5 4S10,7 12,7S14.5  6, 16.5 4S20,1 24,1L24 0L0 0z"></path>
      </svg>
    )
  },
  { name: 'ArrowHorizontalIcon' }
)
export default ArrowHorizontalIcon
