import { onScopeDispose } from 'vue'
import { isArray } from '../helps'
export const useEventListener = (
  target: HTMLElement,
  eventName: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions
) => {
  target.addEventListener(eventName, handler, options)
  onScopeDispose(() => {
    target.removeEventListener(eventName, handler, options)
  })
  return () => target.removeEventListener(eventName, handler, options)
}

export const useClickOutside = (
  target: HTMLElement | HTMLElement[],
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions
) => {
  useEventListener(
    document.body,
    'click',
    (event) => {
      if (!isArray(target)) target = [target]
      for (const el of target) {
        if (el.contains(event.target as Node)) {
          return
        }
      }
      handler(event)
    },
    options
  )
}
