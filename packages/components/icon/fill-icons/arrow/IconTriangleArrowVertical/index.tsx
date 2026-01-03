import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconTriangleArrowVertical = defineComponent((props: SVGAttributes) => {
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
        d="M9 0h1c0 4 1 5.5 3 7.5s3 2.5 3 4.5-1 2.5-3 4.5-3 3.5-3 7.5H9V0Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconTriangleArrowVertical, 'IconTriangleArrowVertical')
