import { isFunction, isString, useRandomId, useSetTimeout } from '../_util'
import type { ConfigType, OptionsType, OptionsTypeBase } from './type'
import { defaultOptions, defaultConfig, ToastType } from './type'
import Wrapper from './wrapper'
import { createApp, type App } from 'vue'

type WarpperInstance = {
  add: (options: PartialOptionsType) => void
  update: (options: PartialOptionsType) => void
  remove: (toastOption: string | number) => void
  destroyAll: () => void
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

type PartialConfigType = Partial<ConfigType>
type PartialOptionsType = Partial<OptionsType>
type ToastOptions = PartialConfigType & PartialOptionsType

export default class ToastImplement {
  _config
  _app: App<Element> | null = null
  wrapperInstance: unknown
  container: HTMLElement
  ids: (string | number)[] = []
  clears: {
    [key: string]: unknown
    id: string | number
    close: () => void
    start: number
    stop: number
    duration: number
  }[] = []
  constructor(config: ConfigType = defaultConfig) {
    this._config = config
    const { getPopupContainer } = config
    this.container = getPopupContainer() as HTMLElement
  }
  createApp() {
    const app = createApp(Wrapper, {
      onStop: (data: OptionsTypeBase) => {
        const index = this.clears.findIndex((item) => item.id === data.id)
        if (index > -1) {
          this.clears[index]?.close()
          this.clears[index] = {
            ...this.clears[index],
            stop: Date.now()
          }
        }
      },
      onStart: (data: OptionsTypeBase) => {
        const index = this.clears.findIndex((item) => item.id === data.id)
        if (index > -1) {
          const item = this.clears[index]
          const { stop, start, duration } = item
          const time = duration * 1000 - (stop - start)
          if (time > 0) {
            const clearCloseCallback = useSetTimeout(() => {
              this.close(item.id!)
            }, time)
            this.clears[index] = {
              ...this.clears[index],
              start: Date.now(),
              close: clearCloseCallback
            }
          } else {
            this.close(item.id!)
          }
        }
      },
      getPopupContainer: () => this.container
    })
    this._app = app
    const inner = document.createElement('div')
    this.container.appendChild(inner)
    app.mount(inner)
    this.wrapperInstance = app._instance
    return app._instance
  }
  getWarpper(options?: ToastOptions) {
    if (this.wrapperInstance) {
      return this.wrapperInstance
    }
    if (options) {
      const { getPopupContainer } = options
      this.container = getPopupContainer?.() || defaultConfig.getPopupContainer()
    }
    return (this.wrapperInstance = this.createApp())
  }

  config(config: ConfigType) {
    this._config = config
  }

  _setConfig(options: PartialConfigType) {
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
  _setDefault() {}
  handler(options: ToastOptions | string, type: string) {
    if (isString(options)) {
      options = {
        content: options
      }
    }
    options = {
      ...this._config,
      ...defaultOptions,
      ...options
    } as ToastOptions
    const styles = this._setConfig(options)
    if (!options.id) {
      options.id = useRandomId()
    }
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
    if (options.zIndex && options.zIndex !== this._config.zIndex) {
      warpper.setZIndex(options.zIndex)
    }
    if (Object.keys(styles).length > 0) {
      warpper.setStyle(styles)
    }
    if (this.ids.includes(options.id)) {
      const index = this.ids.findIndex((id) => id === options.id)
      this.ids.splice(index, 1, options.id)
      warpper.update(toastOption)
    } else {
      this.ids.push(options.id)
      warpper.add(toastOption)
      if (options.duration !== 0) {
        const duration = Math.abs(options.duration! * 1000)
        const clearCloseCallback = useSetTimeout(() => {
          this.close(options.id!)
        }, duration)
        this.clears.push({
          id: options.id,
          close: clearCloseCallback,
          start: Date.now(),
          stop: 0,
          duration: duration / 1000
        })
      }
    }
    return options.id
  }
  info(options: ToastOptions | string) {
    return this.handler(options, ToastType.INFO)
  }
  success(options: ToastOptions | string) {
    return this.handler(options, ToastType.SUCCESS)
  }
  warning(options: ToastOptions | string) {
    return this.handler(options, ToastType.WARNING)
  }
  error(options: ToastOptions | string) {
    return this.handler(options, ToastType.ERROR)
  }

  loading(options: ToastOptions | string) {
    return this.handler(options, 'loading')
  }

  close(toastId: string | number) {
    const warpper = this.getWarpper()
    ;(warpper as { exposed: WarpperInstance }).exposed.remove(toastId)
    const index = this.ids.findIndex((id) => id === toastId)
    this.ids.splice(index, 1)
    if (isFunction(this.clears[index])) {
      this.clears[index]()
      this.clears.splice(index, 1)
    }
  }

  destroyAll() {
    const warpper = this.getWarpper()
    ;(warpper as { exposed: WarpperInstance }).exposed.destroyAll()
    this.ids = []
    this.clears =
      (this.clears.map((c) => {
        c.close()
      }),
      [])
  }

  destroyApp() {
    this._app?.unmount()
  }
}
