import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconProgress = defineComponent((props: SVGAttributes) => {
  return () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8" stroke="#3BCE4A" stroke-width="6"></circle>
      <path
        d="M12.14 4A7.93 7.93 0 0 1 20 12c0 4.42-3.52 8-7.86 8A7.8 7.8 0 0 1 6 17"
        stroke="#3BCE4A"
        stroke-width="6"
        stroke-linecap="round"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconProgress, 'IconProgress')
