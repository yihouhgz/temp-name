import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconCollapsible = defineComponent((props: SVGAttributes) => {
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
        d="M2.72 5.45A1 1 0 0 1 3.62 4h16.76a1 1 0 0 1 .9 1.45L18 12H6L2.72 5.45Z"
        fill="#DDE3E8"
      ></path>
      <path
        d="M2.72 18.55a1 1 0 0 0 .9 1.45h16.76a1 1 0 0 0 .9-1.45L18 12H6l-3.28 6.55Z"
        fill="#6A6F7F"
      ></path>
      <path d="M12 2v8" stroke="#4CC3FA" stroke-width="2" stroke-linecap="round"></path>
      <path
        d="m9 7 3 3 3-3"
        stroke="#4CC3FA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path d="M12 22v-8" stroke="#4CC3FA" stroke-width="2" stroke-linecap="round"></path>
      <path
        d="m9 17 3-3 3 3"
        stroke="#4CC3FA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconCollapsible, 'IconCollapsible')
