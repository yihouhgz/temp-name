import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconTreeTriangleDown = defineComponent((props: SVGAttributes) => {
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
        d="m20.56 9.66-7.8 8.97a1 1 0 0 1-1.51 0L3.44 9.66A1 1 0 0 1 4.19 8h15.62a1 1 0 0 1 .75 1.66Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconTreeTriangleDown, 'IconTreeTriangleDown')
