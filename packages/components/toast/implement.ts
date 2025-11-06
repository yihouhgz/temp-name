import { consolaWapper, isString, useRandomId } from '../_util'
import type { ConfigType, OptionsType } from './type'
import { defaultOptions, defaultConfig } from './type'
import Wrapper from './wrapper'
import { createApp, type App } from 'vue'

type WarpperInstance = {
  add: (options: OptionsType) => void
  remove: (toastOption: string | number) => void
  setZIndex: (index: number) => void
  setStyle: (style: Direction) => void
}
export type Direction = {
  top?: number
  bottom?: number
  left?: number
  right?: number
  [key: string]: unknown
}
export default class Toast {
  _config
  _app: App<Element> | null = null
  wrapperInstance: unknown
  container: HTMLElement
  ids: (string | number)[] = []
  constructor(config: ConfigType = defaultConfig) {
    this._config = config
    const { getPopupContainer } = config
    this.container = getPopupContainer() as HTMLElement
  }
  createApp() {
    const app = createApp(Wrapper)
    this._app = app
    const inner = document.createElement('div')
    this.container.appendChild(inner)
    app.mount(inner)
    this.wrapperInstance = app._instance
    return app._instance
  }
  getWarpper(options?: OptionsType & ConfigType) {
    if (this.wrapperInstance) {
      return this.wrapperInstance
    }
    if (options) {
      const { getPopupContainer } = options
      this.container = getPopupContainer() || defaultConfig.getPopupContainer()
    }
    return (this.wrapperInstance = this.createApp())
  }

  config(options: ConfigType) {
    console.log(options)
  }

  _setConfig(options: ConfigType) {
    const config: { [key: string]: unknown } = {}
    const directionKeys = ['bottom', 'left', 'right', 'top']
    const style: Direction = {}
    for (const key in this._config) {
      if (Object.hasOwnProperty.call(this._config, key)) {
        config[key] = (options as { [key: string]: unknown })[key]
        if (directionKeys.includes(key)) {
          style[key] = (options as { [key: string]: unknown })[key]
        }
      }
    }
    this._config = {
      ...this._config,
      ...config
    }
    return style
  }
  handler(options: (OptionsType & ConfigType) | string, type: string) {
    if (isString(options)) {
      options = {
        ...defaultConfig,
        ...defaultOptions,
        content: options
      }
    }
    const styles = this._setConfig(options)
    if (!options.id) {
      options.id = useRandomId()
    }
    if (this.ids.includes(options.id)) {
      consolaWapper.error(`[Toast] The toast with id ${options.id} is already exists`)
      return
    }
    this.ids.push(options.id)
    const toastOption = {
      type,
      content: options.content,
      icon: options.icon,
      showClose: options.showClose,
      stack: options.stack,
      textMaxWidth: options.textMaxWidth,
      onClose: options.onClose,
      id: options.id,

      //config
      duration: options.duration,
      theme: options.theme
    }
    const warpper = (this.getWarpper(options) as { exposed: WarpperInstance }).exposed
    if (options.zIndex !== this._config.zIndex) {
      warpper.setZIndex(options.zIndex)
    }
    if (Object.keys(styles).length > 0) {
      warpper.setStyle(styles)
    }
    warpper.add(toastOption)
    if (options.duration !== 0) {
      const duration = Math.abs(options.duration * 1000)
      setTimeout(() => {
        this.close(options.id)
      }, duration)
    }
    return options.id
  }
  info(options: (OptionsType & ConfigType) | string) {
    return this.handler(options, 'info')
  }
  success(options: (OptionsType & ConfigType) | string) {
    return this.handler(options, 'success')
  }
  warning(options: (OptionsType & ConfigType) | string) {
    return this.handler(options, 'warning')
  }
  error(options: (OptionsType & ConfigType) | string) {
    return this.handler(options, 'error')
  }
  close(toastId: string | number) {
    const warpper = this.getWarpper()
    ;(warpper as { exposed: WarpperInstance }).exposed.remove(toastId)
  }
  destroy() {
    this._app?.unmount()
  }
}
