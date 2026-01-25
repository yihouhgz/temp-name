import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconAIFilledLevel3 = defineComponent((props: SVGAttributes) => {
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
        d="M9.68 5.45c.22-1.1 1.8-1.1 2.02 0a8.79 8.79 0 0 0 6.85 6.85c1.1.22 1.1 1.8 0 2.02a8.79 8.79 0 0 0-6.85 6.85c-.22 1.1-1.8 1.1-2.02 0a8.79 8.79 0 0 0-6.85-6.85c-1.1-.22-1.1-1.8 0-2.02a8.79 8.79 0 0 0 6.85-6.85Zm8.48-3.85c.16-.8 1.31-.8 1.48 0a3.54 3.54 0 0 0 2.76 2.76c.8.17.8 1.32 0 1.48a3.54 3.54 0 0 0-2.76 2.76c-.17.8-1.32.8-1.48 0a3.54 3.54 0 0 0-2.76-2.76c-.8-.16-.8-1.31 0-1.48a3.54 3.54 0 0 0 2.76-2.76Z"
        fill="url(#semi-ai-filled-level-3-fv9VkZl)"
      ></path>
      <defs>
        <linearGradient
          id="semi-ai-filled-level-3-fv9VkZl"
          x1="23"
          y1="22"
          x2="-0.488628"
          y2="18.6969"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="rgba(233,69,255)"></stop>
          <stop offset="0.3" stop-color="rgba(166,71,255)"></stop>
          <stop offset="0.6" stop-color="rgba(107,97,255)"></stop>
          <stop offset="1" stop-color="rgba(46,140,255)"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
})
export default warpperIcon(IconAIFilledLevel3, 'IconAIFilledLevel3')
