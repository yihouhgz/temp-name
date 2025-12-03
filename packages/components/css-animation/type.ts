import type { PropType } from 'vue'
export const cssAnimationProps = {
  startClassName: String,
  endClassName: String,
  animationState: {
    type: String as PropType<'enter' | 'leave'>,
    values: ['enter', 'leave'] as const,
    default: 'enter'
  },
  onAnimationEnd: {
    type: Function as PropType<(stoppedByAnother: boolean) => void>,
    default: undefined
  },
  onAnimationStart: {
    type: Function as PropType<() => void>,
    default: undefined
  },
  motion: {
    type: Boolean,
    default: true
  },
  replayKey: {
    type: String,
    default: ''
  },
  fillMode: {
    type: String as PropType<'backwards' | 'both' | 'forwards' | 'none'>,
    values: ['backwards', 'both', 'forwards', 'none'] as const,
    default: 'none'
  }
}
