import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconSmallTriangleRight = defineComponent((props: SVGAttributes) => {
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
        d="M9 17.07V6.93c0-.4.45-.63.78-.41l7.6 5.06c.3.2.3.64 0 .84l-7.6 5.06a.5.5 0 0 1-.78-.41Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconSmallTriangleRight, 'IconSmallTriangleRight')
