import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconDivider = defineComponent((props: SVGAttributes) => {
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
      <rect
        x="2.75"
        y="2.75"
        width="18.5"
        height="18.5"
        rx="3"
        fill="white"
        stroke="#AAB2BF"
        stroke-width="1.5"
      ></rect>
      <rect x="5" y="11" width="4" height="2" fill="#4CC3FA"></rect>
      <rect x="15" y="11" width="4" height="2" fill="#4CC3FA"></rect>
      <rect x="10" y="11" width="4" height="2" fill="#324350"></rect>
      <rect x="10" y="11" width="4" height="2" fill="#4CC3FA"></rect>
      <rect x="5" y="16" width="14" height="2" fill="#324350"></rect>
      <rect x="5" y="6" width="14" height="2" fill="#324350"></rect>
    </svg>
  )
})
export default warpperIcon(IconDivider, 'IconDivider')
