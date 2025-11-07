import { onScopeDispose } from 'vue'
export const useSetTimeout = (callback: () => void, delay: number) => {
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
