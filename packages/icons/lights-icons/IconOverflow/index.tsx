import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconOverflow = defineComponent((props: SVGAttributes) => {
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
      <rect x="1" y="4" width="22" height="16" rx="3" fill="#DDE3E8"></rect>
      <circle cx="6" cy="12" r="2" fill="#6A6F7F"></circle>
      <circle cx="12" cy="12" r="2" fill="#6A6F7F"></circle>
      <circle cx="18" cy="12" r="2" fill="#6A6F7F"></circle>
    </svg>
  )
})
export default warpperIcon(IconOverflow, 'IconOverflow')
