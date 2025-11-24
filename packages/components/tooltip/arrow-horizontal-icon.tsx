import { defineComponent } from 'vue'
const ArrowHorizontalIcon = defineComponent(
  () => {
    return () => (
      <svg
        aria-hidden="true"
        width="7"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        style="fill: currentcolor;"
      >
        <path d="M0 0L1 0C1 4, 2 5.5, 4 7.5S7,10 7,12S6 14.5, 4 16.5S1,20 1,24L0 24L0 0z"></path>
      </svg>
    )
  },
  { name: 'ArrowHorizontalIcon' }
)
export default ArrowHorizontalIcon
