import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconSpace = defineComponent((props: SVGAttributes) => {
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
      <rect x="1" y="2" width="2" height="20" rx="1" fill="#DDE3E8"></rect>
      <rect x="21" y="2" width="2" height="20" rx="1" fill="#DDE3E8"></rect>
      <path d="M6 12h12" stroke="#4CC3FA" stroke-width="2" stroke-linecap="round"></path>
      <path
        d="m15 9 3 3-3 3"
        stroke="#4CC3FA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="m9 9-3 3 3 3"
        stroke="#4CC3FA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconSpace, 'IconSpace')
