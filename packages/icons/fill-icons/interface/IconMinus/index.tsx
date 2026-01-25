import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'

const IconMinus = defineComponent((props: SVGAttributes) => {
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
        d="M2 12c0-.83.67-1.5 1.5-1.5h17a1.5 1.5 0 0 1 0 3h-17A1.5 1.5 0 0 1 2 12Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconMinus, 'IconMinus')
