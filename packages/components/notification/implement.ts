import Wrapper from './wrapper'
import type { OptionsTypeProps, WrapperAdapter } from './wrapper'
import { prefix } from 'constants/config'
import { createApp } from 'vue'
import { isUndefined, useRandomId } from '../_util'
import type { ConfigOptiosnType, NotificationType, OptionsType } from './type'
import { strings } from './constants'

type ConfigOptiosn = ConfigOptiosnType & { [key: string]: unknown }

class Notification {
  _config: ConfigOptiosn = {
    zIndex: strings.defaultOptions.defaultZIndex,
    duration: strings.defaultOptions.defaultDuration,
    position: strings.defaultOptions.defaultPosition
  }
  wrapperInstance: unknown
  constructor() {}
  getWrapper() {
    if (this.wrapperInstance) return this.wrapperInstance
    const container = document.createElement('div')
    container.className = prefix + '-notification-wrapper'
    container.id = 'notification-wrapper-' + useRandomId()
    container.style.zIndex = String(this._config.zIndex)
    const app = createApp(Wrapper)
    const root = document.body
    root.appendChild(container)
    app.mount(container)
    this.wrapperInstance = app._instance
    return this.wrapperInstance
  }

  config(config: ConfigOptiosn) {
    for (const key in config) {
      if (!isUndefined(config[key])) {
        this._config[key] = config[key]
      }
    }
  }

  getWrapperAdapter() {
    const warpper = this.getWrapper()
    return (warpper as { exposed: WrapperAdapter }).exposed
  }

  _handlerItem(options: OptionsTypeProps) {
    const adapter = this.getWrapperAdapter()
    adapter.udpateNotification(options)
  }
  open(options: OptionsType) {
    const optionsProps = {
      ...options,
      type: 'default' as NotificationType
    }
    this._handlerItem(optionsProps)
  }

  close() {}

  info() {}

  success(options: OptionsType) {
    const optionsProps = {
      ...options,
      type: 'success' as NotificationType
    }
    this._handlerItem(optionsProps)
  }

  warning() {}

  danger() {}
}
export default Notification
