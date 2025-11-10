import { onScopeDispose } from 'vue'
export const useSetTimeout = (callback: () => void, delay: number = 0) => {
  const timer = setTimeout(() => callback(), delay)
  const clearup = () => {
    clearTimeout(timer)
  }
  onScopeDispose(() => {
    clearup()
  })
  return () => {
    clearup()
  }
}
