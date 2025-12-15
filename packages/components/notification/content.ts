import { provide, inject } from 'vue'

export const notificationSymbol = Symbol('notification')
export type ProvideData = {
  closeMap: Map<string | number, () => void>
  setTimeOutMap: Map<
    string | number,
    {
      triggerSetTimeout: () => void
      clear: () => void
    }
  >
}
export function useProvideNotification(data: ProvideData) {
  provide(notificationSymbol, data)
}
export function useNotification() {
  return inject<ProvideData>(notificationSymbol)
}
