import { watch, toValue, onScopeDispose, type MaybeRefOrGetter } from 'vue'
import { isArray } from '../helps'

// 定义常见事件类型映射
export interface EventMap {
  // 鼠标事件
  click: MouseEvent
  dblclick: MouseEvent
  mousedown: MouseEvent
  mouseup: MouseEvent
  mousemove: MouseEvent
  mouseover: MouseEvent
  mouseout: MouseEvent
  mouseenter: MouseEvent
  mouseleave: MouseEvent

  // 键盘事件
  keydown: KeyboardEvent
  keyup: KeyboardEvent
  keypress: KeyboardEvent

  // 焦点事件
  focus: FocusEvent
  blur: FocusEvent

  // 表单事件
  change: Event
  input: Event
  submit: Event

  // 触摸事件
  touchstart: TouchEvent
  touchmove: TouchEvent
  touchend: TouchEvent
  touchcancel: TouchEvent

  // 滚动事件
  scroll: Event

  // 视图事件
  resize: UIEvent

  // 动画事件
  animationstart: AnimationEvent
  animationend: AnimationEvent
  animationiteration: AnimationEvent

  // 过渡事件
  transitionend: TransitionEvent

  // 其他常见事件
  load: Event
  unload: Event
  beforeunload: BeforeUnloadEvent
  error: ErrorEvent
  hashchange: HashChangeEvent
  message: MessageEvent
  popstate: PopStateEvent
  storage: StorageEvent
}

export const useEventListener = <K extends keyof EventMap>(
  target: HTMLElement | MaybeRefOrGetter<null | undefined> | Window,
  eventName: K,
  handler: (event: EventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  const stopWatch = watch(
    () => toValue(target),
    (node) => {
      if (node) node.addEventListener(eventName, handler as EventListener, options)
    },
    {
      immediate: true
    }
  )
  const cleaup = () => {
    stopWatch()
    toValue(target)?.removeEventListener(eventName, handler as EventListener, options)
  }
  onScopeDispose(() => cleaup())
  return cleaup
}

export const useClickOutside = (
  target: HTMLElement | HTMLElement[],
  handler: (event: MouseEvent) => void,
  options?: boolean | AddEventListenerOptions
) => {
  useEventListener(
    document.body,
    'click',
    (event: EventMap['click']) => {
      if (!isArray(target)) target = [target]
      for (const el of target) {
        if (el.contains(event.target as Node) || el === event.target) {
          return
        }
      }
      handler(event)
    },
    options
  )
}
