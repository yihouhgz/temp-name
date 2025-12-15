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
    zIndex: strings.defaultOptions.zIndex,
    duration: strings.defaultOptions.duration,
    position: strings.defaultOptions.position,
    bottom: undefined,
    left: undefined,
    right: undefined,
    top: undefined
  }
  _firstGobalInit = true
  wrapperInstance: unknown
  _closeIdSet = new Set<string | number>()
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
    if (!this._firstGobalInit) {
      return
    }
    for (const key in config) {
      if (!isUndefined(config[key])) {
        this._config[key] = config[key]
      }
    }
    this._firstGobalInit = false
    const adapter = this.getWrapperAdapter()
    adapter.updateConfig(this._config)
  }

  getWrapperAdapter() {
    const warpper = this.getWrapper()
    return (warpper as { exposed: WrapperAdapter }).exposed
  }

  _handlerItem(options: OptionsTypeProps) {
    const { top, bottom, left, right, getPopupContainer, zIndex } = options
    this._firstGobalInit = true
    this.config({
      top,
      bottom,
      left,
      right,
      getPopupContainer,
      zIndex
    })
    const adapter = this.getWrapperAdapter()
    const newOptions = Object.assign({ ...strings.defaultOptions }, options)
    adapter.updateConfig(this._config)
    adapter.udpateNotification(newOptions)
    this._closeIdSet.add(options.id)
    return options.id
  }
  open(options: OptionsType) {
    const optionsProps = {
      ...options,
      type: 'default' as NotificationType,
      id: options.id || useRandomId()
    }
    return this._handlerItem(optionsProps)
  }

  close(id: string | number) {
    const adapter = this.getWrapperAdapter()
    adapter.close(id)
  }

  info(options: OptionsType) {
    return this._handlerItem({
      ...options,
      type: 'info' as NotificationType,
      id: options.id || useRandomId()
    })
  }

  success(options: OptionsType) {
    const optionsProps = {
      ...options,
      type: 'success' as NotificationType,
      id: options.id || useRandomId()
    }
    return this._handlerItem(optionsProps)
  }

  warning(options: OptionsType) {
    return this._handlerItem({
      ...options,
      type: 'warning' as NotificationType,
      id: options.id || useRandomId()
    })
  }

  danger(options: OptionsType) {
    return this._handlerItem({
      ...options,
      type: 'error' as NotificationType,
      id: options.id || useRandomId()
    })
  }

  destroyAll() {
    this._closeIdSet.forEach((id) => this.close(id))
  }
}
export default Notification
