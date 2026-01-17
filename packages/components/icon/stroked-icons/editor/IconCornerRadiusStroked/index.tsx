import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconCornerRadiusStroked = defineComponent((props: SVGAttributes) => {
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
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 4h9a1 1 0 1 0 0-2h-9A10 10 0 0 0 2 12v9a1 1 0 1 0 2 0v-9a8 8 0 0 1 8-8Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconCornerRadiusStroked, 'IconCornerRadiusStroked')
