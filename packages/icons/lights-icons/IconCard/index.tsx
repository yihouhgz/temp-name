import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconCard = defineComponent((props: SVGAttributes) => {
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
      <rect x="1" y="4" width="22" height="16" rx="2" fill="#DDE3E8"></rect>
      <rect x="5" y="8" width="14" height="4" fill="#AAB2BF"></rect>
      <rect x="5" y="14" width="8" height="2" fill="#AAB2BF"></rect>
    </svg>
  )
})
export default warpperIcon(IconCard, 'IconCard')
