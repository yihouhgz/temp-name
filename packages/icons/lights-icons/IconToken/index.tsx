import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconToken = defineComponent((props: SVGAttributes) => {
  return () => (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <rect width="8" height="8" rx="4" fill="#F0B114"></rect>
      <rect y="10" width="8" height="8" rx="4" fill="#E91E63"></rect>
      <rect x="10" width="8" height="8" rx="4" fill="#0077FA"></rect>
      <rect x="10" y="10" width="8" height="8" rx="4" fill="#00B3A1"></rect>
    </svg>
  )
})
export default warpperIcon(IconToken, 'IconToken')
