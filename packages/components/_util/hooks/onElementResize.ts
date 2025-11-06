import type { MaybeRefOrGetter } from 'vue'
import { onScopeDispose, watch, toValue, onWatcherCleanup } from 'vue'
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
        cleaup()
      })
    },
    { immediate: true }
  )
  const cleaup = () => {
    if (resizeObserver) {
      resizeObserver.unobserve(toValue(target) as HTMLElement)
      resizeObserver = null
    }
    stop()
  }
  onScopeDispose(() => {
    cleaup()
  })
  return () => cleaup()
}
