declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

import 'vue'
declare module 'vue' {
  export interface ComponentCustomProps {
    onClick?: (e: MouseEvent) => void
    onDblclick?: (e: MouseEvent) => void
    onContextmenu?: (e: MouseEvent) => void
    onMousedown?: (e: MouseEvent) => void
    onMouseup?: (e: MouseEvent) => void
    onMouseenter?: (e: MouseEvent) => void
    onMouseleave?: (e: MouseEvent) => void
    onMousemove?: (e: MouseEvent) => void
    onWheel?: (e: WheelEvent) => void
    onKeydown?: (e: KeyboardEvent) => void
    onKeyup?: (e: KeyboardEvent) => void
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: FocusEvent) => void
    onTouchstart?: (e: TouchEvent) => void
    onTouchmove?: (e: TouchEvent) => void
    onTouchend?: (e: TouchEvent) => void
  }
}
