import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconTriangleUp = defineComponent((props: SVGAttributes) => {
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
        d="m2.17 17.4 9.02-12.3a1 1 0 0 1 1.62 0l9.02 12.3a1 1 0 0 1-.8 1.6H2.97a1 1 0 0 1-.8-1.6Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconTriangleUp, 'IconTriangleUp')
