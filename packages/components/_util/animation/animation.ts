import { Event } from './utils/event'
import type { AnimationProps, AnimationOptions } from './utils/type'
export class Animation extends Event {
  _values
  _options
  timer = 0
  constructor(values: AnimationProps, options: AnimationOptions) {
    super()
    this._values = values
    this._options = options
  }

  initAnimation() {}

  animation() {
    if (this.timer) {
      return
    }
    this.timer = requestAnimationFrame(() => {})
  }

  start() {}
}
