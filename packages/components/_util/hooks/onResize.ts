import { isFunction, Undefined } from '../helps'
import { onScopeDispose } from 'vue'
import { useThrottle } from './useThrottle'

export type ResizeCallback = (e: Event) => void
export type Resize = {
  callback: ResizeCallback
  target: HTMLElement | Document | Window
}
export type ResizeReturn = () => void

export const onResize = (resize: ResizeCallback | Resize): ResizeReturn => {
  const resizeCallback = isFunction(resize) ? useThrottle(resize) : useThrottle(resize.callback)
  const target = isFunction(resize)
    ? typeof window !== Undefined
      ? window
      : Undefined
    : resize.target
  const targetEventName = 'resize'
  if (!target) return () => {}
  target.addEventListener(targetEventName, resizeCallback)
  const cleanup = () => {
    target.removeEventListener(targetEventName, resizeCallback)
  }
  onScopeDispose(() => {
    cleanup()
  })
  return cleanup
}
