import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconAILoading = defineComponent((props: SVGAttributes) => {
  return () => (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M15.1112 7.99978C15.1112 4.07242 11.9275 0.888672 8.00009 0.888672C5.18219 0.888672 2.74711 2.52771 1.59619 4.90445"
        stroke="url(#semi-ai-loading-yC5ingh)"
        stroke-width="1.77778"
        stroke-linecap="round"
      ></path>
      <defs>
        <linearGradient
          id="semi-ai-loading-yC5ingh"
          x1="16"
          y1="8"
          x2="2.68594"
          y2="11.022"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="rgba(233,69,255)"></stop>
          <stop offset="0.3" stop-color="rgba(166,71,255)"></stop>
          <stop offset="0.6" stop-color="rgba(107,97,255)"></stop>
          <stop offset="1" stop-color="rgba(46,140,255)" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
})
export default warpperIcon(IconAILoading, 'IconAILoading')
