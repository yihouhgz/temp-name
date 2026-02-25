import { onScopeDispose, getCurrentScope } from 'vue'
export const onKeyEsc = (callback: (e: KeyboardEvent) => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback(e)
    }
  }
  document.addEventListener('keydown', handleKeyDown)
  const stop = () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
  if (getCurrentScope()) {
    onScopeDispose(stop)
  }
  return stop
}
