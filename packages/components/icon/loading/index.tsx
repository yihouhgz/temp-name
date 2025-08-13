export default function LoadingIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 36 36"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-icon="spin"
    >
      <defs>
        <linearGradient
          x1="0%"
          y1="100%"
          x2="100%"
          y2="100%"
          id="linearGradient-3"
        >
          <stop stop-color="currentColor" stop-opacity="0" offset="0%"></stop>
          <stop
            stop-color="currentColor"
            stop-opacity="0.50"
            offset="39.9430698%"
          ></stop>
          <stop stop-color="currentColor" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect
          fill-opacity="0.01"
          fill="none"
          x="0"
          y="0"
          width="36"
          height="36"
        ></rect>
        <path
          d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951"
          stroke="url(#linearGradient-3)"
          stroke-width="4"
          stroke-linecap="round"
        ></path>
      </g>
    </svg>
  )
}
