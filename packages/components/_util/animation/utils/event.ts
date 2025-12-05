import { isFunction } from '../../helps'
export class Event {
  _eventMap = new Map<string, ((...args: unknown[]) => void)[]>()

  on(eventName: string, callback: (...args: unknown[]) => void) {
    if (isFunction(callback)) {
      this._eventMap.set(eventName, [...(this._eventMap.get(eventName) || []), callback])
    }
  }

  emit(eventName: string, ...args: unknown[]) {
    const callbacks = this._eventMap.get(eventName) || []
    callbacks.forEach((callback) => callback(...args))
  }

  off(eventName: string, callback: () => void) {
    const callbacks = this._eventMap.get(eventName) || []
    this._eventMap.set(
      eventName,
      callbacks.filter((fn) => fn !== callback)
    )
  }

  once(eventName: string, callback: (...args: unknown[]) => void) {
    const fn = (...args: unknown[]) => {
      callback(...args)
      this.off(eventName, callback)
    }
    this.on(eventName, fn)
  }
}
