import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconList = defineComponent((props: SVGAttributes) => {
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
      <path d="M2 4a1 1 0 0 1 1-1h3v5H3a1 1 0 0 1-1-1V4Z" fill="#0077FA"></path>
      <path d="M8 3h13a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8V3Z" fill="#4CC3FA"></path>
      <path d="M2 11a1 1 0 0 1 1-1h3v5H3a1 1 0 0 1-1-1v-3Z" fill="#AAB2BF"></path>
      <path d="M8 10h13a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8v-5Z" fill="#DDE3E8"></path>
      <path d="M2 18a1 1 0 0 1 1-1h3v5H3a1 1 0 0 1-1-1v-3Z" fill="#AAB2BF"></path>
      <path d="M8 17h13a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8v-5Z" fill="#DDE3E8"></path>
    </svg>
  )
})
export default warpperIcon(IconList, 'IconList')
