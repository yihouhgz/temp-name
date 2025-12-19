import type { MaybeRefOrGetter } from 'vue'
import { watch, toValue, onWatcherCleanup } from 'vue'
export type ResizeCallback = () => void
export const onElementResize = (
  target: HTMLElement | MaybeRefOrGetter<null | undefined>,
  callback: ResizeCallback
) => {
  let resizeObserver: ResizeObserver | null = null
  const stop = watch(
    () => toValue(target),
    (val) => {
      if (!val) return
      resizeObserver = new ResizeObserver(() => {
        callback()
      })
      resizeObserver.observe(val)
      onWatcherCleanup(() => {
        cleanup()
      })
    },
    { immediate: true }
  )
  const cleanup = () => {
    if (resizeObserver) {
      resizeObserver.unobserve(toValue(target) as HTMLElement)
      resizeObserver = null
      stop?.()
    }
  }
  return cleanup
}
