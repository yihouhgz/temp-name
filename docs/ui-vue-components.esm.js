import {
  defineComponent,
  createVNode,
  Fragment,
  watchEffect,
  onUnmounted,
  watch,
  toValue,
  onScopeDispose,
  onWatcherCleanup,
  computed,
  getCurrentInstance,
  mergeProps,
  ref,
  h,
  createTextVNode,
  reactive,
  onMounted,
  onBeforeUnmount,
  inject,
  provide,
  useAttrs,
  Teleport,
  effectScope,
  nextTick,
  cloneVNode,
  isVNode,
  createApp
} from 'vue'

function withInstall(app, components) {
  components.forEach(function (component) {
    if (component.name) app.component(component.name, component)
  })
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  return __assign.apply(this, arguments)
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value)
        })
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value))
      } catch (e) {
        reject(e)
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1]
        return t[1]
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype)
  return (
    (g.next = verb(0)),
    (g['throw'] = verb(1)),
    (g['return'] = verb(2)),
    typeof Symbol === 'function' &&
      (g[Symbol.iterator] = function () {
        return this
      }),
    g
  )
  function verb(n) {
    return function (v) {
      return step([n, v])
    }
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.')
    while ((g && ((g = 0), op[0] && (_ = 0)), _))
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y['return']
                : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t
        if (((y = 0), t)) op = [op[0] & 2, t.value]
        switch (op[0]) {
          case 0:
          case 1:
            t = op
            break
          case 4:
            _.label++
            return { value: op[1], done: false }
          case 5:
            _.label++
            y = op[1]
            op = [0]
            continue
          case 7:
            op = _.ops.pop()
            _.trys.pop()
            continue
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0
              continue
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1]
              break
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1]
              t = op
              break
            }
            if (t && _.label < t[2]) {
              _.label = t[2]
              _.ops.push(op)
              break
            }
            if (t[2]) _.ops.pop()
            _.trys.pop()
            continue
        }
        op = body.call(thisArg, _)
      } catch (e) {
        op = [6, e]
        y = 0
      } finally {
        f = t = 0
      }
    if (op[0] & 5) throw op[1]
    return { value: op[0] ? op[1] : void 0, done: true }
  }
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i)
        ar[i] = from[i]
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from))
}

typeof SuppressedError === 'function'
  ? SuppressedError
  : function (error, suppressed, message) {
      var e = new Error(message)
      return ((e.name = 'SuppressedError'), (e.error = error), (e.suppressed = suppressed), e)
    }

var buttonPropsDefaults = {
  type: {
    type: String,
    default: 'primary',
    values: ['primary', 'success', 'warning', 'danger', 'tertiary', 'secondary'],
    required: false
  },
  /**
   * @description 按钮尺寸
   */
  size: {
    type: String,
    default: 'default',
    values: ['small', 'default', 'large'],
    required: false
  },
  /**
   * @description 按钮主题，可选值：solid（有背景色）、 borderless（无背景色）、 light（浅背景色）、outline(边框模式)
   */
  theme: {
    type: String,
    default: 'light',
    values: ['solid', 'borderless', 'light', 'outline'],
    required: false
  },
  /**
   * @description 按钮是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 加载状态
   */
  loading: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 图标
   */
  icon: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 图标位置，可选值：left|right
   */
  iconPosition: {
    type: String,
    default: 'left',
    values: ['left', 'right'],
    required: false
  },
  /**
   * @description 设置水平方向是否去掉内边距，只对设置了 icon 的 Button 有效。
   * 可选值：true（等效于 ["left", "right"]），"left"，"right"，["left", "right"]
   */
  noHorizontalPadding: {
    type: [Boolean, String, Array],
    default: false,
    values: [true, 'left', 'right', ['left', 'right']],
    required: false
  },
  autoInsertSpace: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 将按钮设置为块级按钮
   */
  block: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 内容区域 className
   */
  contentClassName: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 设置 button 原生的 type 值，可选值：button、reset、submit
   */
  htmlType: {
    type: String,
    values: ['button', 'reset', 'submit'],
    default: 'button',
    required: false
  }
}
var buttonGroupProps = {
  /**
   * @description 按钮组是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  type: {
    type: String,
    default: 'primary',
    values: ['primary', 'success', 'warning', 'danger', 'info'],
    required: false
  },
  /**
   * @description 按钮尺寸
   */
  size: {
    type: String,
    default: 'default',
    values: ['small', 'default', 'large'],
    required: false
  },
  theme: {
    type: String,
    default: 'light',
    values: ['solid', 'borderless', 'light', 'outline'],
    required: false
  }
}

var prefix = 'tempui'

function isValidWaveColor(color) {
  return (
    color &&
    color !== '#fff' &&
    color !== '#ffffff' &&
    color !== 'rgb(255, 255, 255)' &&
    color !== 'rgba(255, 255, 255, 1)' &&
    !/rgba\((?:\d*, ){3}0\)/.test(color) &&
    // any transparent rgba color
    color !== 'transparent' &&
    color !== 'canvastext'
  )
}
function getTargetWaveColor(node) {
  var _a = getComputedStyle(node),
    borderTopColor = _a.borderTopColor,
    borderColor = _a.borderColor,
    backgroundColor = _a.backgroundColor
  if (isValidWaveColor(borderTopColor)) {
    return borderTopColor
  }
  if (isValidWaveColor(borderColor)) {
    return borderColor
  }
  if (isValidWaveColor(backgroundColor)) {
    return backgroundColor
  }
  return null
}
function getWaveEffectColor(color, opacity) {
  if (opacity === void 0) {
    opacity = 0.15
  }
  if (!color) {
    // 默认使用白色，带有透明度
    return 'rgba(255, 255, 255, '.concat(opacity, ')')
  }
  // 如果已经是rgba格式，直接修改透明度
  var rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (rgbaMatch) {
    var r = rgbaMatch[1],
      g = rgbaMatch[2],
      b = rgbaMatch[3]
    return 'rgba('.concat(r, ', ').concat(g, ', ').concat(b, ', ').concat(opacity, ')')
  }
  // 如果是rgb格式，转换为rgba并添加透明度
  var rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (rgbMatch) {
    var r = rgbMatch[1],
      g = rgbMatch[2],
      b = rgbMatch[3]
    return 'rgba('.concat(r, ', ').concat(g, ', ').concat(b, ', ').concat(opacity, ')')
  }
  // 如果是十六进制格式，转换为rgba并添加透明度
  var hexMatch = color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  if (hexMatch) {
    var hex = hexMatch[1]
    var r = void 0,
      g = void 0,
      b = void 0
    if (hex.length === 3) {
      // 短格式 #RGB
      r = parseInt(hex[0] + hex[0], 16)
      g = parseInt(hex[1] + hex[1], 16)
      b = parseInt(hex[2] + hex[2], 16)
    } else {
      // 长格式 #RRGGBB
      r = parseInt(hex.substring(0, 2), 16)
      g = parseInt(hex.substring(2, 4), 16)
      b = parseInt(hex.substring(4, 6), 16)
    }
    return 'rgba('.concat(r, ', ').concat(g, ', ').concat(b, ', ').concat(opacity, ')')
  }
  // 其他情况（如颜色名称）使用白色替代
  return 'rgba(255, 255, 255, '.concat(opacity, ')')
}
var getTargetScaleRatio = function (targetRect, size) {
  var width = targetRect.width
  var height = targetRect.height
  if (!size)
    size = {
      x: 8,
      y: 8
    }
  return {
    scaleX: size.x / width + 1,
    scaleY: size.y / height + 1
  }
}
var setCssPropertyVariable = function (el, propertys) {
  Object.entries(propertys).forEach(function (_a) {
    var key = _a[0],
      value = _a[1]
    el.style.setProperty(key, String(value))
  })
}
var getBorderPositionLayout = function (el) {
  var style = getComputedStyle(el)
  var top = '0',
    left = '0'
  if (style.borderLeftWidth) {
    top = '-' + style.borderTopWidth
  }
  if (style.borderTopWidth) {
    left = '-' + style.borderLeftWidth
  }
  return {
    top: top,
    left: left
  }
}

var props$2 = {
  rippleSize: {
    type: Array,
    default: function () {
      return [10, 10]
    },
    required: false
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  target: {
    type: HTMLElement,
    required: false
  }
}

var Wave = defineComponent(
  function (props, _a) {
    var slots = _a.slots
    if (props.disabled)
      return function () {
        var _a
        return createVNode(Fragment, null, [
          (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)
        ])
      }
    else {
      var showEffect_1 = function () {
        var _a, _b, _c, _d
        var holder = document.createElement('div')
        holder.style.position = 'absolute'
        holder.style.zIndex = '-1'
        var _e = getBorderPositionLayout(props.target),
          top = _e.top,
          left = _e.left
        holder.style.left = String(top)
        holder.style.top = String(left)
        holder.style.pointerEvents = 'none'
        var width = (_a = props.target) === null || _a === void 0 ? void 0 : _a.offsetWidth
        var height = (_b = props.target) === null || _b === void 0 ? void 0 : _b.offsetHeight
        holder.style.width = ''.concat(width, 'px')
        holder.style.height = ''.concat(height, 'px')
        // 计算波纹颜色
        var targetWaveColor = getTargetWaveColor(props.target)
        var waveEffectColor = getWaveEffectColor(targetWaveColor)
        // 创建波纹元素
        var wave = document.createElement('div')
        wave.style.position = 'absolute'
        wave.style.pointerEvents = 'none'
        wave.style.backgroundColor = waveEffectColor
        wave.style.borderRadius = props.target.style.borderRadius || '4px'
        wave.style.opacity = '0'
        wave.style.transform = 'scale(1)'
        wave.style.transition = 'transform 0.4s , opacity 0.4s'
        wave.style.willChange = 'transform, opacity'
        // 设置波纹的初始位置
        var rect = props.target.getBoundingClientRect()
        wave.style.width = ''.concat(rect.width, 'px')
        wave.style.height = ''.concat(rect.height, 'px')
        wave.style.left = ''.concat(0, 'px')
        wave.style.top = ''.concat(0, 'px')
        holder.appendChild(wave)
        ;(_c = props.target) === null || _c === void 0
          ? void 0
          : _c.insertBefore(
              holder,
              (_d = props.target) === null || _d === void 0 ? void 0 : _d.firstChild
            )
        wave.className = 'wave-effect'
        var _f = getTargetScaleRatio(props.target.getBoundingClientRect(), {
            x: 10,
            y: 10
          }),
          scaleX = _f.scaleX,
          scaleY = _f.scaleY
        setCssPropertyVariable(wave, {
          '--scale-x': scaleX,
          '--scale-y': scaleY
        })
        // 动画结束后移除元素
        wave.addEventListener(
          'animationend',
          function () {
            holder.remove()
          },
          {
            once: true
          }
        )
      }
      var handleClick_1 = function () {
        showEffect_1()
      }
      watchEffect(function () {
        if (props.target)
          props.target.addEventListener('click', handleClick_1, {
            capture: true
          })
      })
      onUnmounted(function () {
        if (props.target) {
          props.target.removeEventListener('click', handleClick_1, {
            capture: true
          })
        }
      })
      return function () {
        var _a
        return createVNode(Fragment, null, [
          (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)
        ])
      }
    }
  },
  {
    name: ''.concat(prefix, '-wave'),
    props: props$2
  }
)

var isFunction = function (value) {
  return typeof value === 'function'
}
var isString = function (value) {
  return typeof value === 'string'
}
var isNumber = function (value) {
  return typeof value === 'number'
}
var isArray = function (value) {
  return Array.isArray(value)
}
var isObject = function (value) {
  return value !== null && typeof value === 'object'
}
var isBoolean = function (value) {
  return typeof value === 'boolean'
}
var isUndefined = function (value) {
  return typeof value === 'undefined'
}
var omitKeys = function (obj, keys) {
  return Object.fromEntries(
    Object.entries(obj).filter(function (_a) {
      var key = _a[0]
      return !keys.includes(key)
    })
  )
}
var isComponentByVNode = function (vnode) {
  return vnode && !!vnode.type && (isObject(vnode.type) || isFunction(vnode.type))
}
var isColorValue = function (color) {
  var hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i
  var rgbColorRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
  var rgbaColorRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|0?\.\d+|1(\.0)?)\)$/
  return hexColorRegex.test(color) || rgbColorRegex.test(color) || rgbaColorRegex.test(color)
}
var renderVnode = function (vnode) {
  if (isFunction(vnode)) return vnode()
  return vnode
}
var hasPropsOrSlots = function (slotName, vm) {
  if (!vm) return false
  var slots = vm.slots,
    props = vm.props
  return (
    Boolean(props[slotName]) ||
    isFunction(slots === null || slots === void 0 ? void 0 : slots[slotName])
  )
}
// 处理props传值或者slot的情况 props.solt 优先级高于slots.solt
var renderElementForPropsOrSlot = function (slotName, vm) {
  var _a
  if (!vm) return null
  var slots = vm.slots,
    props = vm.props
  var pName = isString(slotName) ? slotName : '',
    sName = isString(slotName) ? slotName : ''
  if (typeof slotName === 'object') {
    pName = slotName.propName
    sName = slotName.slotName
  }
  if (props[pName]) {
    return renderVnode(props[pName])
  }
  var vSlots =
    (_a = slots === null || slots === void 0 ? void 0 : slots[sName]) === null || _a === void 0
      ? void 0
      : _a.call(slots)
  return vSlots
}
var domRectToObject = function (rect) {
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    x: rect.x,
    y: rect.y
  }
}
// 首字母大写
var toFirstLocaleUpperCase = function (str) {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}

var useEventListener = function (target, eventName, handler, options) {
  var stopWatch = watch(
    function () {
      return toValue(target)
    },
    function (node) {
      if (node) node.addEventListener(eventName, handler, options)
    },
    {
      immediate: true
    }
  )
  var cleaup = function () {
    var _a
    stopWatch()
    ;(_a = toValue(target)) === null || _a === void 0
      ? void 0
      : _a.removeEventListener(eventName, handler, options)
  }
  onScopeDispose(function () {
    return cleaup()
  })
  return cleaup
}
var useClickOutside = function (target, handler, options) {
  useEventListener(
    window,
    'click',
    function (event) {
      event.stopPropagation()
      if (!isArray(target)) target = [target]
      for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
        var el = target_1[_i]
        if (el.contains(event.target) || el === event.target) {
          return
        }
      }
      handler(event)
    },
    options
  )
}

var onElementResize = function (target, callback) {
  var resizeObserver = null
  var stop = watch(
    function () {
      return toValue(target)
    },
    function (val) {
      if (!val) return
      resizeObserver = new ResizeObserver(function () {
        callback()
      })
      resizeObserver.observe(val)
      onWatcherCleanup(function () {
        cleaup()
      })
    },
    {
      immediate: true
    }
  )
  var cleaup = function () {
    if (resizeObserver) {
      resizeObserver.unobserve(toValue(target))
      resizeObserver = null
    }
    stop()
  }
  onScopeDispose(function () {
    cleaup()
  })
  return function () {
    return cleaup()
  }
}

var useRandomId = function () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

var useSetTimeout = function (callback, delay) {
  if (delay === void 0) {
    delay = 0
  }
  var timer = setTimeout(function () {
    return callback()
  }, delay)
  var clearup = function () {
    clearTimeout(timer)
  }
  onScopeDispose(function () {
    clearup()
  })
  return function () {
    clearup()
  }
}

const LogLevels = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  debug: 4,
  trace: 5,
  verbose: Number.POSITIVE_INFINITY
}
const LogTypes = {
  // Silent
  silent: {
    level: -1
  },
  // Level 0
  fatal: {
    level: LogLevels.fatal
  },
  error: {
    level: LogLevels.error
  },
  // Level 1
  warn: {
    level: LogLevels.warn
  },
  // Level 2
  log: {
    level: LogLevels.log
  },
  // Level 3
  info: {
    level: LogLevels.info
  },
  success: {
    level: LogLevels.success
  },
  fail: {
    level: LogLevels.fail
  },
  ready: {
    level: LogLevels.info
  },
  start: {
    level: LogLevels.info
  },
  box: {
    level: LogLevels.info
  },
  // Level 4
  debug: {
    level: LogLevels.debug
  },
  // Level 5
  trace: {
    level: LogLevels.trace
  },
  // Verbose
  verbose: {
    level: LogLevels.verbose
  }
}

function isPlainObject$1(value) {
  if (value === null || typeof value !== 'object') {
    return false
  }
  const prototype = Object.getPrototypeOf(value)
  if (
    prototype !== null &&
    prototype !== Object.prototype &&
    Object.getPrototypeOf(prototype) !== null
  ) {
    return false
  }
  if (Symbol.iterator in value) {
    return false
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === '[object Module]'
  }
  return true
}

function _defu(baseObject, defaults, namespace = '.', merger) {
  if (!isPlainObject$1(defaults)) {
    return _defu(baseObject, {}, namespace)
  }
  const object = Object.assign({}, defaults)
  for (const key in baseObject) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const value = baseObject[key]
    if (value === null || value === void 0) {
      continue
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]]
    } else if (isPlainObject$1(value) && isPlainObject$1(object[key])) {
      object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : '') + key.toString())
    } else {
      object[key] = value
    }
  }
  return object
}
function createDefu(merger) {
  return (...arguments_) =>
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, ''), {})
}
const defu = createDefu()

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function isLogObj(arg) {
  if (!isPlainObject(arg)) {
    return false
  }
  if (!arg.message && !arg.args) {
    return false
  }
  if (arg.stack) {
    return false
  }
  return true
}

let paused = false
const queue = []
class Consola {
  options
  _lastLog
  _mockFn
  /**
   * Creates an instance of Consola with specified options or defaults.
   *
   * @param {Partial<ConsolaOptions>} [options={}] - Configuration options for the Consola instance.
   */
  constructor(options = {}) {
    const types = options.types || LogTypes
    this.options = defu(
      {
        ...options,
        defaults: { ...options.defaults },
        level: _normalizeLogLevel(options.level, types),
        reporters: [...(options.reporters || [])]
      },
      {
        types: LogTypes,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: {
          date: true,
          colors: false,
          compact: true
        }
      }
    )
    for (const type in types) {
      const defaults = {
        type,
        ...this.options.defaults,
        ...types[type]
      }
      this[type] = this._wrapLogFn(defaults)
      this[type].raw = this._wrapLogFn(defaults, true)
    }
    if (this.options.mockFn) {
      this.mockTypes()
    }
    this._lastLog = {}
  }
  /**
   * Gets the current log level of the Consola instance.
   *
   * @returns {number} The current log level.
   */
  get level() {
    return this.options.level
  }
  /**
   * Sets the minimum log level that will be output by the instance.
   *
   * @param {number} level - The new log level to set.
   */
  set level(level) {
    this.options.level = _normalizeLogLevel(level, this.options.types, this.options.level)
  }
  /**
   * Displays a prompt to the user and returns the response.
   * Throw an error if `prompt` is not supported by the current configuration.
   *
   * @template T
   * @param {string} message - The message to display in the prompt.
   * @param {T} [opts] - Optional options for the prompt. See {@link PromptOptions}.
   * @returns {promise<T>} A promise that infer with the prompt options. See {@link PromptOptions}.
   */
  prompt(message, opts) {
    if (!this.options.prompt) {
      throw new Error('prompt is not supported!')
    }
    return this.options.prompt(message, opts)
  }
  /**
   * Creates a new instance of Consola, inheriting options from the current instance, with possible overrides.
   *
   * @param {Partial<ConsolaOptions>} options - Optional overrides for the new instance. See {@link ConsolaOptions}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  create(options) {
    const instance = new Consola({
      ...this.options,
      ...options
    })
    if (this._mockFn) {
      instance.mockTypes(this._mockFn)
    }
    return instance
  }
  /**
   * Creates a new Consola instance with the specified default log object properties.
   *
   * @param {InputLogObject} defaults - Default properties to include in any log from the new instance. See {@link InputLogObject}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withDefaults(defaults) {
    return this.create({
      ...this.options,
      defaults: {
        ...this.options.defaults,
        ...defaults
      }
    })
  }
  /**
   * Creates a new Consola instance with a specified tag, which will be included in every log.
   *
   * @param {string} tag - The tag to include in each log of the new instance.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withTag(tag) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ':' + tag : tag
    })
  }
  /**
   * Adds a custom reporter to the Consola instance.
   * Reporters will be called for each log message, depending on their implementation and log level.
   *
   * @param {ConsolaReporter} reporter - The reporter to add. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  addReporter(reporter) {
    this.options.reporters.push(reporter)
    return this
  }
  /**
   * Removes a custom reporter from the Consola instance.
   * If no reporter is specified, all reporters will be removed.
   *
   * @param {ConsolaReporter} reporter - The reporter to remove. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  removeReporter(reporter) {
    if (reporter) {
      const i = this.options.reporters.indexOf(reporter)
      if (i !== -1) {
        return this.options.reporters.splice(i, 1)
      }
    } else {
      this.options.reporters.splice(0)
    }
    return this
  }
  /**
   * Replaces all reporters of the Consola instance with the specified array of reporters.
   *
   * @param {ConsolaReporter[]} reporters - The new reporters to set. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  setReporters(reporters) {
    this.options.reporters = Array.isArray(reporters) ? reporters : [reporters]
    return this
  }
  wrapAll() {
    this.wrapConsole()
    this.wrapStd()
  }
  restoreAll() {
    this.restoreConsole()
    this.restoreStd()
  }
  /**
   * Overrides console methods with Consola logging methods for consistent logging.
   */
  wrapConsole() {
    for (const type in this.options.types) {
      if (!console['__' + type]) {
        console['__' + type] = console[type]
      }
      console[type] = this[type].raw
    }
  }
  /**
   * Restores the original console methods, removing Consola overrides.
   */
  restoreConsole() {
    for (const type in this.options.types) {
      if (console['__' + type]) {
        console[type] = console['__' + type]
        delete console['__' + type]
      }
    }
  }
  /**
   * Overrides standard output and error streams to redirect them through Consola.
   */
  wrapStd() {
    this._wrapStream(this.options.stdout, 'log')
    this._wrapStream(this.options.stderr, 'log')
  }
  _wrapStream(stream, type) {
    if (!stream) {
      return
    }
    if (!stream.__write) {
      stream.__write = stream.write
    }
    stream.write = (data) => {
      this[type].raw(String(data).trim())
    }
  }
  /**
   * Restores the original standard output and error streams, removing the Consola redirection.
   */
  restoreStd() {
    this._restoreStream(this.options.stdout)
    this._restoreStream(this.options.stderr)
  }
  _restoreStream(stream) {
    if (!stream) {
      return
    }
    if (stream.__write) {
      stream.write = stream.__write
      delete stream.__write
    }
  }
  /**
   * Pauses logging, queues incoming logs until resumed.
   */
  pauseLogs() {
    paused = true
  }
  /**
   * Resumes logging, processing any queued logs.
   */
  resumeLogs() {
    paused = false
    const _queue = queue.splice(0)
    for (const item of _queue) {
      item[0]._logFn(item[1], item[2])
    }
  }
  /**
   * Replaces logging methods with mocks if a mock function is provided.
   *
   * @param {ConsolaOptions["mockFn"]} mockFn - The function to use for mocking logging methods. See {@link ConsolaOptions["mockFn"]}.
   */
  mockTypes(mockFn) {
    const _mockFn = mockFn || this.options.mockFn
    this._mockFn = _mockFn
    if (typeof _mockFn !== 'function') {
      return
    }
    for (const type in this.options.types) {
      this[type] = _mockFn(type, this.options.types[type]) || this[type]
      this[type].raw = this[type]
    }
  }
  _wrapLogFn(defaults, isRaw) {
    return (...args) => {
      if (paused) {
        queue.push([this, defaults, args, isRaw])
        return
      }
      return this._logFn(defaults, args, isRaw)
    }
  }
  _logFn(defaults, args, isRaw) {
    if ((defaults.level || 0) > this.level) {
      return false
    }
    const logObj = {
      date: /* @__PURE__ */ new Date(),
      args: [],
      ...defaults,
      level: _normalizeLogLevel(defaults.level, this.options.types)
    }
    if (!isRaw && args.length === 1 && isLogObj(args[0])) {
      Object.assign(logObj, args[0])
    } else {
      logObj.args = [...args]
    }
    if (logObj.message) {
      logObj.args.unshift(logObj.message)
      delete logObj.message
    }
    if (logObj.additional) {
      if (!Array.isArray(logObj.additional)) {
        logObj.additional = logObj.additional.split('\n')
      }
      logObj.args.push('\n' + logObj.additional.join('\n'))
      delete logObj.additional
    }
    logObj.type = typeof logObj.type === 'string' ? logObj.type.toLowerCase() : 'log'
    logObj.tag = typeof logObj.tag === 'string' ? logObj.tag : ''
    const resolveLog = (newLog = false) => {
      const repeated = (this._lastLog.count || 0) - this.options.throttleMin
      if (this._lastLog.object && repeated > 0) {
        const args2 = [...this._lastLog.object.args]
        if (repeated > 1) {
          args2.push(`(repeated ${repeated} times)`)
        }
        this._log({ ...this._lastLog.object, args: args2 })
        this._lastLog.count = 1
      }
      if (newLog) {
        this._lastLog.object = logObj
        this._log(logObj)
      }
    }
    clearTimeout(this._lastLog.timeout)
    const diffTime =
      this._lastLog.time && logObj.date ? logObj.date.getTime() - this._lastLog.time.getTime() : 0
    this._lastLog.time = logObj.date
    if (diffTime < this.options.throttle) {
      try {
        const serializedLog = JSON.stringify([logObj.type, logObj.tag, logObj.args])
        const isSameLog = this._lastLog.serialized === serializedLog
        this._lastLog.serialized = serializedLog
        if (isSameLog) {
          this._lastLog.count = (this._lastLog.count || 0) + 1
          if (this._lastLog.count > this.options.throttleMin) {
            this._lastLog.timeout = setTimeout(resolveLog, this.options.throttle)
            return
          }
        }
      } catch {}
    }
    resolveLog(true)
  }
  _log(logObj) {
    for (const reporter of this.options.reporters) {
      reporter.log(logObj, {
        options: this.options
      })
    }
  }
}
function _normalizeLogLevel(input, types = {}, defaultLevel = 3) {
  if (input === void 0) {
    return defaultLevel
  }
  if (typeof input === 'number') {
    return input
  }
  if (types[input] && types[input].level !== void 0) {
    return types[input].level
  }
  return defaultLevel
}
Consola.prototype.add = Consola.prototype.addReporter
Consola.prototype.remove = Consola.prototype.removeReporter
Consola.prototype.clear = Consola.prototype.removeReporter
Consola.prototype.withScope = Consola.prototype.withTag
Consola.prototype.mock = Consola.prototype.mockTypes
Consola.prototype.pause = Consola.prototype.pauseLogs
Consola.prototype.resume = Consola.prototype.resumeLogs
function createConsola$1(options = {}) {
  return new Consola(options)
}

class BrowserReporter {
  options
  defaultColor
  levelColorMap
  typeColorMap
  constructor(options) {
    this.options = { ...options }
    this.defaultColor = '#7f8c8d'
    this.levelColorMap = {
      0: '#c0392b',
      // Red
      1: '#f39c12',
      // Yellow
      3: '#00BCD4'
      // Cyan
    }
    this.typeColorMap = {
      success: '#2ecc71'
      // Green
    }
  }
  _getLogFn(level) {
    if (level < 1) {
      return console.__error || console.error
    }
    if (level === 1) {
      return console.__warn || console.warn
    }
    return console.__log || console.log
  }
  log(logObj) {
    const consoleLogFn = this._getLogFn(logObj.level)
    const type = logObj.type === 'log' ? '' : logObj.type
    const tag = logObj.tag || ''
    const color =
      this.typeColorMap[logObj.type] || this.levelColorMap[logObj.level] || this.defaultColor
    const style = `
      background: ${color};
      border-radius: 0.5em;
      color: white;
      font-weight: bold;
      padding: 2px 0.5em;
    `
    const badge = `%c${[tag, type].filter(Boolean).join(':')}`
    if (typeof logObj.args[0] === 'string') {
      consoleLogFn(
        `${badge}%c ${logObj.args[0]}`,
        style,
        // Empty string as style resets to default console style
        '',
        ...logObj.args.slice(1)
      )
    } else {
      consoleLogFn(badge, style, ...logObj.args)
    }
  }
}

function createConsola(options = {}) {
  const consola2 = createConsola$1({
    reporters: options.reporters || [new BrowserReporter({})],
    prompt(message, options2 = {}) {
      if (options2.type === 'confirm') {
        return Promise.resolve(confirm(message))
      }
      return Promise.resolve(prompt(message))
    },
    ...options
  })
  return consola2
}
const consola = createConsola()

var types = ['info', 'start', 'success', 'error', 'log', 'warn', 'error', 'box']
var generateConsola = function () {
  var functions = {}
  var consolaTag = consola.withTag(prefix)
  types.forEach(function (type) {
    functions[type] = function (message) {
      var args = []
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i]
      }
      consolaTag[type].apply(consolaTag, __spreadArray([message], args, false))
    }
  })
  return functions
}
var consolaWrapper = generateConsola()

var iconProps$1 = {
  /**
   * @description 旋转度数
   */
  rotate: {
    type: Number,
    default: 0,
    required: false
  },
  /**
   * @description 图标大小
   */
  size: {
    values: ['inherit', 'extra-small', 'small', 'default', 'large', 'extra-large'],
    default: 'default',
    required: false
  },
  /**
   * @description 是否旋转
   */
  spin: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 图标类型
   */
  type: {
    type: String,
    default: '',
    required: false
  },
  svg: {
    type: [Object, Function, undefined],
    default: undefined,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  name: {
    type: String,
    default: '',
    required: false
  }
}
var iconEmits = {
  click: function (e) {
    return void 0
  },
  mouseDown: function (e) {
    return void 0
  },
  mouseUp: function (e) {
    return void 0
  },
  mouseEnter: function (e) {
    return void 0
  },
  mouseLeave: function (e) {
    return void 0
  },
  mouseMove: function (e) {
    return void 0
  }
}

var IconJsx = defineComponent({
  setup: function (props, ctx) {
    var spanClass = computed(function () {
      var _a
      var spin = props.spin,
        size = props.size,
        type = props.type
      return [
        ''.concat(prefix, '-icon'),
        ''.concat(prefix, '-icon-').concat(size),
        ''.concat(prefix, '-icon-').concat(type),
        ((_a = {}), (_a[''.concat(prefix, '-icon-spin')] = spin), _a)
      ]
    })
    var spanStyle = computed(function () {
      var rotate = props.rotate
      var style = {}
      if (Number.isSafeInteger(rotate)) {
        style.transform = 'rotate('.concat(rotate, 'deg)')
      }
      return style
    })
    var vm = getCurrentInstance()
    return function () {
      return createVNode(
        'span',
        mergeProps(
          {
            class: spanClass.value,
            style: spanStyle.value
          },
          ctx.attrs
        ),
        [
          renderElementForPropsOrSlot(
            {
              propName: 'svg',
              slotName: 'default'
            },
            vm
          )
        ]
      )
    }
  },
  name: prefix + '-icon-jsx',
  props: iconProps$1,
  emits: iconEmits
})
var nameToSplit = function (name) {
  var str = ''
  for (var _i = 0, name_1 = name; _i < name_1.length; _i++) {
    var s = name_1[_i]
    if (s === s.toLocaleUpperCase() && s !== '-') str += '-' + s.toLocaleLowerCase()
    else str += s
  }
  return str
}
function warpperIcon(icon, name) {
  var innerProps = omitKeys(iconProps$1, ['type', 'svg'])
  var renderIcon = function () {
    return createVNode(icon, null, null)
  }
  var InnerIcon = defineComponent({
    setup: function (props) {
      return function () {
        return createVNode(
          IconJsx,
          mergeProps(
            {
              svg: renderIcon,
              type: name
            },
            props
          ),
          null
        )
      }
    },
    props: innerProps,
    emits: iconEmits,
    name: prefix + '-' + nameToSplit(name)
  })
  return InnerIcon
}

var iconProps = {
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'default',
    require: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
}
var loadSvg = function (name) {
  return __awaiter(void 0, void 0, void 0, function () {
    var module_1
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3])
          return [4 /*yield*/, import(/* @vite-ignore */ './svgs/'.concat(name, '.svg'))]
        case 1:
          module_1 = _b.sent()
          return [2 /*return*/, module_1.default]
        case 2:
          _b.sent()
          return [2 /*return*/, null]
        case 3:
          return [2 /*return*/]
      }
    })
  })
}
var svgDataUriToHtml = function (dataUri) {
  var svgContent = dataUri.replace('data:image/svg+xml,', '')
  svgContent = decodeURIComponent(svgContent)
  return svgContent
}
var Icon = defineComponent({
  name: prefix + '-icon',
  props: iconProps,
  emits: ['click'],
  setup: function (props, ctx) {
    var _this = this
    var svgContent = ref()
    watchEffect(function () {
      return __awaiter(_this, void 0, void 0, function () {
        var dataUri
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!props.name) return [3 /*break*/, 2]
              return [4 /*yield*/, loadSvg(props.name)]
            case 1:
              dataUri = _a.sent()
              if (dataUri) {
                svgContent.value = svgDataUriToHtml(dataUri)
              }
              _a.label = 2
            case 2:
              return [2 /*return*/]
          }
        })
      })
    })
    var iconClass = computed(function () {
      var _a
      return [
        ''.concat(prefix, '-icon'),
        ((_a = {}),
        (_a[''.concat(prefix, '-icon-').concat(props.size)] = props.size),
        (_a[''.concat(prefix, '-icon-disabled')] = props.disabled),
        _a)
      ]
    })
    var handleClick = function (e) {
      ctx.emit('click', e)
    }
    return function () {
      return createVNode(
        'span',
        {
          class: iconClass.value,
          innerHTML: svgContent.value,
          onClick: handleClick
        },
        null
      )
    }
  }
})

var IconChevronDown = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M4.08 7.6a1.5 1.5 0 0 1 2.12 0l5.66 5.65 5.66-5.65a1.5 1.5 0 1 1 2.12 2.12l-6.72 6.72a1.5 1.5 0 0 1-2.12 0L4.08 9.72a1.5 1.5 0 0 1 0-2.12Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconChevronDown$1 = warpperIcon(IconChevronDown, 'icon-chevron-down')

var IconClear = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm5.04-6.14a1.5 1.5 0 0 1-2.13.04l-2.87-2.78L9.26 17A1.5 1.5 0 0 1 7.1 14.9l2.78-2.87L7 9.26A1.5 1.5 0 1 1 9.1 7.1l2.87 2.78L14.74 7A1.5 1.5 0 0 1 16.9 9.1l-2.78 2.87L17 14.74c.6.58.61 1.53.04 2.12Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconClear$1 = warpperIcon(IconClear, 'icon-clear')

var IconEyeClosedSolid = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M21.7 3.7a1 1 0 0 0-1.4-1.4L17.3 5.26A11.59 11.59 0 0 0 12 4C5 4 1 10 1 12c0 1.18 1.38 3.73 3.94 5.64L2.3 20.3a1 1 0 1 0 1.42 1.42l18-18ZM7.84 14.77l1.46-1.47a3 3 0 0 1 4-4l1.47-1.46a5 5 0 0 0-6.93 6.93Z',
            fill: 'currentColor'
          },
          null
        ),
        createVNode(
          'path',
          {
            d: 'M12 20c-1.22 0-2.35-.18-3.38-.5l2.57-2.57a5 5 0 0 0 5.75-5.75l3.56-3.56C22.13 9.27 23 11.07 23 12c0 2-4 8-11 8Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconEyeClosedSolid$1 = warpperIcon(IconEyeClosedSolid, 'IconEyeClosedSolid')

var IconEyeOpened = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M12 4C5 4 1 10 1 12s4 8 11 8 11-6 11-8-4-8-11-8Zm5 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconEyeOpened$1 = warpperIcon(IconEyeOpened, 'IconEyeOpened')

var IconClose = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            d: 'M17.66 19.78a1.5 1.5 0 0 0 2.12-2.12L14.12 12l5.66-5.66a1.5 1.5 0 0 0-2.12-2.12L12 9.88 6.34 4.22a1.5 1.5 0 1 0-2.12 2.12L9.88 12l-5.66 5.66a1.5 1.5 0 0 0 2.12 2.12L12 14.12l5.66 5.66Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconClose$1 = warpperIcon(IconClose, 'icon-close')

var IconTickCircle = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm5.88-13.18-6.2 7.6a1.5 1.5 0 0 1-2.37 0l-3.5-4a1.5 1.5 0 1 1 2.37-1.84l2.3 2.46L15.5 8a1.5 1.5 0 1 1 2.38 1.82Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconTickCircle$1 = warpperIcon(IconTickCircle, 'IconTickCircle')

var IconAlertCircle = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Zm-9.5 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM12 5a1.9 1.9 0 0 0-1.89 2l.3 5.5a1.59 1.59 0 0 0 3.17 0l.3-5.5c.07-1.09-.8-2-1.88-2Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconAlertCircle$1 = warpperIcon(IconAlertCircle, 'IconAlertCircle')

var IconAlertTriangle = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'm10.23 2.4-8.7 16.67A2 2 0 0 0 3.3 22h17.4a2 2 0 0 0 1.77-2.93L13.77 2.4a2 2 0 0 0-3.54 0ZM13.14 14a1.15 1.15 0 0 1-2.28 0l-.58-4.03a1.73 1.73 0 1 1 3.44 0l-.58 4.03Zm.36 4.49a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconAlertTriangle$1 = warpperIcon(IconAlertTriangle, 'IconAlertTriangle')

var IconInfoCircle = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm2-16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-5 3.75c0-.41.34-.75.75-.75h2.75a1 1 0 0 1 1 1v5.5h.75a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h.75v-5h-.75a.75.75 0 0 1-.75-.75Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconInfoCircle$1 = warpperIcon(IconInfoCircle, 'IconInfoCircle')

var randomId = 0
var IconLoading = defineComponent(function (props) {
  randomId += 1
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          width: '48',
          height: '48',
          viewBox: '0 0 36 36',
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': 'true',
          'data-icon': 'spin'
        },
        props
      ),
      [
        createVNode('defs', null, [
          createVNode(
            'linearGradient',
            {
              x1: '0%',
              y1: '100%',
              x2: '100%',
              y2: '100%',
              id: 'linearGradient-'.concat(randomId)
            },
            [
              createVNode(
                'stop',
                {
                  'stop-color': 'currentColor',
                  'stop-opacity': '0',
                  offset: '0%'
                },
                null
              ),
              createVNode(
                'stop',
                {
                  'stop-color': 'currentColor',
                  'stop-opacity': '0.50',
                  offset: '39.9430698%'
                },
                null
              ),
              createVNode(
                'stop',
                {
                  'stop-color': 'currentColor',
                  offset: '100%'
                },
                null
              )
            ]
          )
        ]),
        createVNode(
          'g',
          {
            stroke: 'none',
            'stroke-width': '1',
            fill: 'none',
            'fill-rule': 'evenodd'
          },
          [
            createVNode(
              'rect',
              {
                'fill-opacity': '0.01',
                fill: 'none',
                x: '0',
                y: '0',
                width: '36',
                height: '36'
              },
              null
            ),
            createVNode(
              'path',
              {
                d: 'M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951',
                stroke: 'url(#linearGradient-'.concat(randomId),
                'stroke-width': '4',
                'stroke-linecap': 'round'
              },
              null
            )
          ]
        )
      ]
    )
  }
})
var IconLoading$1 = warpperIcon(IconLoading, 'IconLoading')

var cssKeywords = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
}

const reverseNames = Object.create(null)

// Create a list of reverse color names
for (const name in cssKeywords) {
  if (Object.hasOwn(cssKeywords, name)) {
    reverseNames[cssKeywords[name]] = name
  }
}

const cs = {
  to: {},
  get: {}
}

cs.get = function (string) {
  const prefix = string.slice(0, 3).toLowerCase()
  let value
  let model
  switch (prefix) {
    case 'hsl': {
      value = cs.get.hsl(string)
      model = 'hsl'
      break
    }

    case 'hwb': {
      value = cs.get.hwb(string)
      model = 'hwb'
      break
    }

    default: {
      value = cs.get.rgb(string)
      model = 'rgb'
      break
    }
  }

  if (!value) {
    return null
  }

  return { model, value }
}

cs.get.rgb = function (string) {
  if (!string) {
    return null
  }

  const abbr = /^#([a-f\d]{3,4})$/i
  const hex = /^#([a-f\d]{6})([a-f\d]{2})?$/i
  const rgba =
    /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/
  const per =
    /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/
  const keyword = /^(\w+)$/

  let rgb = [0, 0, 0, 1]
  let match
  let i
  let hexAlpha

  if ((match = string.match(hex))) {
    hexAlpha = match[2]
    match = match[1]

    for (i = 0; i < 3; i++) {
      // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
      const i2 = i * 2
      rgb[i] = Number.parseInt(match.slice(i2, i2 + 2), 16)
    }

    if (hexAlpha) {
      rgb[3] = Number.parseInt(hexAlpha, 16) / 255
    }
  } else if ((match = string.match(abbr))) {
    match = match[1]
    hexAlpha = match[3]

    for (i = 0; i < 3; i++) {
      rgb[i] = Number.parseInt(match[i] + match[i], 16)
    }

    if (hexAlpha) {
      rgb[3] = Number.parseInt(hexAlpha + hexAlpha, 16) / 255
    }
  } else if ((match = string.match(rgba))) {
    for (i = 0; i < 3; i++) {
      rgb[i] = Number.parseInt(match[i + 1], 10)
    }

    if (match[4]) {
      rgb[3] = match[5] ? Number.parseFloat(match[4]) * 0.01 : Number.parseFloat(match[4])
    }
  } else if ((match = string.match(per))) {
    for (i = 0; i < 3; i++) {
      rgb[i] = Math.round(Number.parseFloat(match[i + 1]) * 2.55)
    }

    if (match[4]) {
      rgb[3] = match[5] ? Number.parseFloat(match[4]) * 0.01 : Number.parseFloat(match[4])
    }
  } else if ((match = string.match(keyword))) {
    if (match[1] === 'transparent') {
      return [0, 0, 0, 0]
    }

    if (!Object.hasOwn(cssKeywords, match[1])) {
      return null
    }

    rgb = cssKeywords[match[1]]
    rgb[3] = 1

    return rgb
  } else {
    return null
  }

  for (i = 0; i < 3; i++) {
    rgb[i] = clamp(rgb[i], 0, 255)
  }

  rgb[3] = clamp(rgb[3], 0, 1)

  return rgb
}

cs.get.hsl = function (string) {
  if (!string) {
    return null
  }

  const hsl =
    /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/
  const match = string.match(hsl)

  if (match) {
    const alpha = Number.parseFloat(match[4])
    const h = ((Number.parseFloat(match[1]) % 360) + 360) % 360
    const s = clamp(Number.parseFloat(match[2]), 0, 100)
    const l = clamp(Number.parseFloat(match[3]), 0, 100)
    const a = clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1)

    return [h, s, l, a]
  }

  return null
}

cs.get.hwb = function (string) {
  if (!string) {
    return null
  }

  const hwb =
    /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/
  const match = string.match(hwb)

  if (match) {
    const alpha = Number.parseFloat(match[4])
    const h = ((Number.parseFloat(match[1]) % 360) + 360) % 360
    const w = clamp(Number.parseFloat(match[2]), 0, 100)
    const b = clamp(Number.parseFloat(match[3]), 0, 100)
    const a = clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1)
    return [h, w, b, a]
  }

  return null
}

cs.to.hex = function (...rgba) {
  return (
    '#' +
    hexDouble(rgba[0]) +
    hexDouble(rgba[1]) +
    hexDouble(rgba[2]) +
    (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : '')
  )
}

cs.to.rgb = function (...rgba) {
  return rgba.length < 4 || rgba[3] === 1
    ? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
    : 'rgba(' +
        Math.round(rgba[0]) +
        ', ' +
        Math.round(rgba[1]) +
        ', ' +
        Math.round(rgba[2]) +
        ', ' +
        rgba[3] +
        ')'
}

cs.to.rgb.percent = function (...rgba) {
  const r = Math.round((rgba[0] / 255) * 100)
  const g = Math.round((rgba[1] / 255) * 100)
  const b = Math.round((rgba[2] / 255) * 100)

  return rgba.length < 4 || rgba[3] === 1
    ? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
    : 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')'
}

cs.to.hsl = function (...hsla) {
  return hsla.length < 4 || hsla[3] === 1
    ? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
    : 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')'
}

// Hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function (...hwba) {
  let a = ''
  if (hwba.length >= 4 && hwba[3] !== 1) {
    a = ', ' + hwba[3]
  }

  return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')'
}

cs.to.keyword = function (...rgb) {
  return reverseNames[rgb.slice(0, 3)]
}

// Helpers
function clamp(number_, min, max) {
  return Math.min(Math.max(min, number_), max)
}

function hexDouble(number_) {
  const string_ = Math.round(number_).toString(16).toUpperCase()
  return string_.length < 2 ? '0' + string_ : string_
}

/* MIT license */
/* eslint-disable no-mixed-operators */

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {}
for (const key of Object.keys(cssKeywords)) {
  reverseKeywords[cssKeywords[key]] = key
}

const convert$1 = {
  rgb: { channels: 3, labels: 'rgb' },
  hsl: { channels: 3, labels: 'hsl' },
  hsv: { channels: 3, labels: 'hsv' },
  hwb: { channels: 3, labels: 'hwb' },
  cmyk: { channels: 4, labels: 'cmyk' },
  xyz: { channels: 3, labels: 'xyz' },
  lab: { channels: 3, labels: 'lab' },
  oklab: { channels: 3, labels: ['okl', 'oka', 'okb'] },
  lch: { channels: 3, labels: 'lch' },
  oklch: { channels: 3, labels: ['okl', 'okc', 'okh'] },
  hex: { channels: 1, labels: ['hex'] },
  keyword: { channels: 1, labels: ['keyword'] },
  ansi16: { channels: 1, labels: ['ansi16'] },
  ansi256: { channels: 1, labels: ['ansi256'] },
  hcg: { channels: 3, labels: ['h', 'c', 'g'] },
  apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
  gray: { channels: 1, labels: ['gray'] }
}

// LAB f(t) constant
const LAB_FT = (6 / 29) ** 3

// SRGB non-linear transform functions
function srgbNonlinearTransform(c) {
  const cc = c > 0.003_130_8 ? 1.055 * c ** (1 / 2.4) - 0.055 : c * 12.92
  return Math.min(Math.max(0, cc), 1)
}

function srgbNonlinearTransformInv(c) {
  return c > 0.040_45 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92
}

// Hide .channels and .labels properties
for (const model of Object.keys(convert$1)) {
  if (!('channels' in convert$1[model])) {
    throw new Error('missing channels property: ' + model)
  }

  if (!('labels' in convert$1[model])) {
    throw new Error('missing channel labels property: ' + model)
  }

  if (convert$1[model].labels.length !== convert$1[model].channels) {
    throw new Error('channel and label counts mismatch: ' + model)
  }

  const { channels, labels } = convert$1[model]
  delete convert$1[model].channels
  delete convert$1[model].labels
  Object.defineProperty(convert$1[model], 'channels', { value: channels })
  Object.defineProperty(convert$1[model], 'labels', { value: labels })
}

convert$1.rgb.hsl = function (rgb) {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min
  let h
  let s

  switch (max) {
    case min: {
      h = 0

      break
    }

    case r: {
      h = (g - b) / delta

      break
    }

    case g: {
      h = 2 + (b - r) / delta

      break
    }

    case b: {
      h = 4 + (r - g) / delta

      break
    }
    // No default
  }

  h = Math.min(h * 60, 360)

  if (h < 0) {
    h += 360
  }

  const l = (min + max) / 2

  if (max === min) {
    s = 0
  } else if (l <= 0.5) {
    s = delta / (max + min)
  } else {
    s = delta / (2 - max - min)
  }

  return [h, s * 100, l * 100]
}

convert$1.rgb.hsv = function (rgb) {
  let rdif
  let gdif
  let bdif
  let h
  let s

  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const v = Math.max(r, g, b)
  const diff = v - Math.min(r, g, b)
  const diffc = function (c) {
    return (v - c) / 6 / diff + 1 / 2
  }

  if (diff === 0) {
    h = 0
    s = 0
  } else {
    s = diff / v
    rdif = diffc(r)
    gdif = diffc(g)
    bdif = diffc(b)

    switch (v) {
      case r: {
        h = bdif - gdif

        break
      }

      case g: {
        h = 1 / 3 + rdif - bdif

        break
      }

      case b: {
        h = 2 / 3 + gdif - rdif

        break
      }
      // No default
    }

    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }

  return [h * 360, s * 100, v * 100]
}

convert$1.rgb.hwb = function (rgb) {
  const r = rgb[0]
  const g = rgb[1]
  let b = rgb[2]
  const h = convert$1.rgb.hsl(rgb)[0]
  const w = (1 / 255) * Math.min(r, Math.min(g, b))

  b = 1 - (1 / 255) * Math.max(r, Math.max(g, b))

  return [h, w * 100, b * 100]
}

convert$1.rgb.oklab = function (rgb) {
  // Assume sRGB
  const r = srgbNonlinearTransformInv(rgb[0] / 255)
  const g = srgbNonlinearTransformInv(rgb[1] / 255)
  const b = srgbNonlinearTransformInv(rgb[2] / 255)

  const lp = Math.cbrt(0.412_221_470_8 * r + 0.536_332_536_3 * g + 0.051_445_992_9 * b)
  const mp = Math.cbrt(0.211_903_498_2 * r + 0.680_699_545_1 * g + 0.107_396_956_6 * b)
  const sp = Math.cbrt(0.088_302_461_9 * r + 0.281_718_837_6 * g + 0.629_978_700_5 * b)

  const l = 0.210_454_255_3 * lp + 0.793_617_785 * mp - 0.004_072_046_8 * sp
  const aa = 1.977_998_495_1 * lp - 2.428_592_205 * mp + 0.450_593_709_9 * sp
  const bb = 0.025_904_037_1 * lp + 0.782_771_766_2 * mp - 0.808_675_766 * sp

  return [l * 100, aa * 100, bb * 100]
}

convert$1.rgb.cmyk = function (rgb) {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255

  const k = Math.min(1 - r, 1 - g, 1 - b)
  const c = (1 - r - k) / (1 - k) || 0
  const m = (1 - g - k) / (1 - k) || 0
  const y = (1 - b - k) / (1 - k) || 0

  return [c * 100, m * 100, y * 100, k * 100]
}

function comparativeDistance(x, y) {
  /*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
  return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2
}

convert$1.rgb.keyword = function (rgb) {
  const reversed = reverseKeywords[rgb]
  if (reversed) {
    return reversed
  }

  let currentClosestDistance = Number.POSITIVE_INFINITY
  let currentClosestKeyword

  for (const keyword of Object.keys(cssKeywords)) {
    const value = cssKeywords[keyword]

    // Compute comparative distance
    const distance = comparativeDistance(rgb, value)

    // Check if its less, if so set as closest
    if (distance < currentClosestDistance) {
      currentClosestDistance = distance
      currentClosestKeyword = keyword
    }
  }

  return currentClosestKeyword
}

convert$1.keyword.rgb = function (keyword) {
  return cssKeywords[keyword]
}

convert$1.rgb.xyz = function (rgb) {
  // Assume sRGB
  const r = srgbNonlinearTransformInv(rgb[0] / 255)
  const g = srgbNonlinearTransformInv(rgb[1] / 255)
  const b = srgbNonlinearTransformInv(rgb[2] / 255)

  const x = r * 0.412_456_4 + g * 0.357_576_1 + b * 0.180_437_5
  const y = r * 0.212_672_9 + g * 0.715_152_2 + b * 0.072_175
  const z = r * 0.019_333_9 + g * 0.119_192 + b * 0.950_304_1

  return [x * 100, y * 100, z * 100]
}

convert$1.rgb.lab = function (rgb) {
  const xyz = convert$1.rgb.xyz(rgb)
  let x = xyz[0]
  let y = xyz[1]
  let z = xyz[2]

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > LAB_FT ? x ** (1 / 3) : 7.787 * x + 16 / 116
  y = y > LAB_FT ? y ** (1 / 3) : 7.787 * y + 16 / 116
  z = z > LAB_FT ? z ** (1 / 3) : 7.787 * z + 16 / 116

  const l = 116 * y - 16
  const a = 500 * (x - y)
  const b = 200 * (y - z)

  return [l, a, b]
}

convert$1.hsl.rgb = function (hsl) {
  const h = hsl[0] / 360
  const s = hsl[1] / 100
  const l = hsl[2] / 100
  let t3
  let value

  if (s === 0) {
    value = l * 255
    return [value, value, value]
  }

  const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s

  const t1 = 2 * l - t2

  const rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1)
    if (t3 < 0) {
      t3++
    }

    if (t3 > 1) {
      t3--
    }

    if (6 * t3 < 1) {
      value = t1 + (t2 - t1) * 6 * t3
    } else if (2 * t3 < 1) {
      value = t2
    } else if (3 * t3 < 2) {
      value = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    } else {
      value = t1
    }

    rgb[i] = value * 255
  }

  return rgb
}

convert$1.hsl.hsv = function (hsl) {
  const h = hsl[0]
  let s = hsl[1] / 100
  let l = hsl[2] / 100
  let smin = s
  const lmin = Math.max(l, 0.01)

  l *= 2
  s *= l <= 1 ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  const v = (l + s) / 2
  const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return [h, sv * 100, v * 100]
}

convert$1.hsv.rgb = function (hsv) {
  const h = hsv[0] / 60
  const s = hsv[1] / 100
  let v = hsv[2] / 100
  const hi = Math.floor(h) % 6

  const f = h - Math.floor(h)
  const p = 255 * v * (1 - s)
  const q = 255 * v * (1 - s * f)
  const t = 255 * v * (1 - s * (1 - f))
  v *= 255

  switch (hi) {
    case 0: {
      return [v, t, p]
    }

    case 1: {
      return [q, v, p]
    }

    case 2: {
      return [p, v, t]
    }

    case 3: {
      return [p, q, v]
    }

    case 4: {
      return [t, p, v]
    }

    case 5: {
      return [v, p, q]
    }
  }
}

convert$1.hsv.hsl = function (hsv) {
  const h = hsv[0]
  const s = hsv[1] / 100
  const v = hsv[2] / 100
  const vmin = Math.max(v, 0.01)
  let sl
  let l

  l = (2 - s) * v
  const lmin = (2 - s) * vmin
  sl = s * vmin
  sl /= lmin <= 1 ? lmin : 2 - lmin
  sl = sl || 0
  l /= 2

  return [h, sl * 100, l * 100]
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert$1.hwb.rgb = function (hwb) {
  const h = hwb[0] / 360
  let wh = hwb[1] / 100
  let bl = hwb[2] / 100
  const ratio = wh + bl
  let f

  // Wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio
    bl /= ratio
  }

  const i = Math.floor(6 * h)
  const v = 1 - bl
  f = 6 * h - i

  // eslint-disable-next-line no-bitwise
  if ((i & 0x01) !== 0) {
    f = 1 - f
  }

  const n = wh + f * (v - wh) // Linear interpolation

  let r
  let g
  let b
  /* eslint-disable max-statements-per-line,no-multi-spaces, default-case-last */
  switch (i) {
    default:
    case 6:
    case 0: {
      r = v
      g = n
      b = wh
      break
    }

    case 1: {
      r = n
      g = v
      b = wh
      break
    }

    case 2: {
      r = wh
      g = v
      b = n
      break
    }

    case 3: {
      r = wh
      g = n
      b = v
      break
    }

    case 4: {
      r = n
      g = wh
      b = v
      break
    }

    case 5: {
      r = v
      g = wh
      b = n
      break
    }
  }
  /* eslint-enable max-statements-per-line,no-multi-spaces, default-case-last */

  return [r * 255, g * 255, b * 255]
}

convert$1.cmyk.rgb = function (cmyk) {
  const c = cmyk[0] / 100
  const m = cmyk[1] / 100
  const y = cmyk[2] / 100
  const k = cmyk[3] / 100

  const r = 1 - Math.min(1, c * (1 - k) + k)
  const g = 1 - Math.min(1, m * (1 - k) + k)
  const b = 1 - Math.min(1, y * (1 - k) + k)

  return [r * 255, g * 255, b * 255]
}

convert$1.xyz.rgb = function (xyz) {
  const x = xyz[0] / 100
  const y = xyz[1] / 100
  const z = xyz[2] / 100
  let r
  let g
  let b

  r = x * 3.240_454_2 + y * -1.5371385 + z * -0.4985314
  g = x * -0.969266 + y * 1.876_010_8 + z * 0.041_556
  b = x * 0.055_643_4 + y * -0.2040259 + z * 1.057_225_2

  // Assume sRGB
  r = srgbNonlinearTransform(r)
  g = srgbNonlinearTransform(g)
  b = srgbNonlinearTransform(b)

  return [r * 255, g * 255, b * 255]
}

convert$1.xyz.lab = function (xyz) {
  let x = xyz[0]
  let y = xyz[1]
  let z = xyz[2]

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > LAB_FT ? x ** (1 / 3) : 7.787 * x + 16 / 116
  y = y > LAB_FT ? y ** (1 / 3) : 7.787 * y + 16 / 116
  z = z > LAB_FT ? z ** (1 / 3) : 7.787 * z + 16 / 116

  const l = 116 * y - 16
  const a = 500 * (x - y)
  const b = 200 * (y - z)

  return [l, a, b]
}

convert$1.xyz.oklab = function (xyz) {
  const x = xyz[0] / 100
  const y = xyz[1] / 100
  const z = xyz[2] / 100

  const lp = Math.cbrt(0.818_933_010_1 * x + 0.361_866_742_4 * y - 0.128_859_713_7 * z)
  const mp = Math.cbrt(0.032_984_543_6 * x + 0.929_311_871_5 * y + 0.036_145_638_7 * z)
  const sp = Math.cbrt(0.048_200_301_8 * x + 0.264_366_269_1 * y + 0.633_851_707 * z)

  const l = 0.210_454_255_3 * lp + 0.793_617_785 * mp - 0.004_072_046_8 * sp
  const a = 1.977_998_495_1 * lp - 2.428_592_205 * mp + 0.450_593_709_9 * sp
  const b = 0.025_904_037_1 * lp + 0.782_771_766_2 * mp - 0.808_675_766 * sp

  return [l * 100, a * 100, b * 100]
}

convert$1.oklab.oklch = function (oklab) {
  return convert$1.lab.lch(oklab)
}

convert$1.oklab.xyz = function (oklab) {
  const ll = oklab[0] / 100
  const a = oklab[1] / 100
  const b = oklab[2] / 100

  const l = (0.999_999_998 * ll + 0.396_337_792 * a + 0.215_803_758 * b) ** 3
  const m = (1.000_000_008 * ll - 0.105_561_342 * a - 0.063_854_175 * b) ** 3
  const s = (1.000_000_055 * ll - 0.089_484_182 * a - 1.291_485_538 * b) ** 3

  const x = 1.227_013_851 * l - 0.557_799_98 * m + 0.281_256_149 * s
  const y = -0.040580178 * l + 1.112_256_87 * m - 0.071_676_679 * s
  const z = -0.076381285 * l - 0.421_481_978 * m + 1.586_163_22 * s

  return [x * 100, y * 100, z * 100]
}

convert$1.oklab.rgb = function (oklab) {
  const ll = oklab[0] / 100
  const aa = oklab[1] / 100
  const bb = oklab[2] / 100

  const l = (ll + 0.396_337_777_4 * aa + 0.215_803_757_3 * bb) ** 3
  const m = (ll - 0.105_561_345_8 * aa - 0.063_854_172_8 * bb) ** 3
  const s = (ll - 0.089_484_177_5 * aa - 1.291_485_548 * bb) ** 3

  // Assume sRGB
  const r = srgbNonlinearTransform(4.076_741_662_1 * l - 3.307_711_591_3 * m + 0.230_969_929_2 * s)
  const g = srgbNonlinearTransform(-1.2684380046 * l + 2.609_757_401_1 * m - 0.341_319_396_5 * s)
  const b = srgbNonlinearTransform(-0.0041960863 * l - 0.703_418_614_7 * m + 1.707_614_701 * s)

  return [r * 255, g * 255, b * 255]
}

convert$1.oklch.oklab = function (oklch) {
  return convert$1.lch.lab(oklch)
}

convert$1.lab.xyz = function (lab) {
  const l = lab[0]
  const a = lab[1]
  const b = lab[2]
  let x
  let y
  let z

  y = (l + 16) / 116
  x = a / 500 + y
  z = y - b / 200

  const y2 = y ** 3
  const x2 = x ** 3
  const z2 = z ** 3
  y = y2 > LAB_FT ? y2 : (y - 16 / 116) / 7.787
  x = x2 > LAB_FT ? x2 : (x - 16 / 116) / 7.787
  z = z2 > LAB_FT ? z2 : (z - 16 / 116) / 7.787

  // Illuminant D65 XYZ Tristrimulus Values
  // https://en.wikipedia.org/wiki/CIE_1931_color_space
  x *= 95.047
  y *= 100
  z *= 108.883

  return [x, y, z]
}

convert$1.lab.lch = function (lab) {
  const l = lab[0]
  const a = lab[1]
  const b = lab[2]
  let h

  const hr = Math.atan2(b, a)
  h = (hr * 360) / 2 / Math.PI

  if (h < 0) {
    h += 360
  }

  const c = Math.sqrt(a * a + b * b)

  return [l, c, h]
}

convert$1.lch.lab = function (lch) {
  const l = lch[0]
  const c = lch[1]
  const h = lch[2]

  const hr = (h / 360) * 2 * Math.PI
  const a = c * Math.cos(hr)
  const b = c * Math.sin(hr)

  return [l, a, b]
}

convert$1.rgb.ansi16 = function (args, saturation = null) {
  const [r, g, b] = args
  let value = saturation === null ? convert$1.rgb.hsv(args)[2] : saturation // Hsv -> ansi16 optimization

  value = Math.round(value / 50)

  if (value === 0) {
    return 30
  }

  let ansi =
    30 +
    /* eslint-disable no-bitwise */
    ((Math.round(b / 255) << 2) | (Math.round(g / 255) << 1) | Math.round(r / 255))
  /* eslint-enable no-bitwise */

  if (value === 2) {
    ansi += 60
  }

  return ansi
}

convert$1.hsv.ansi16 = function (args) {
  // Optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert$1.rgb.ansi16(convert$1.hsv.rgb(args), args[2])
}

convert$1.rgb.ansi256 = function (args) {
  const r = args[0]
  const g = args[1]
  const b = args[2]

  // We use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.
  // eslint-disable-next-line no-bitwise
  if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
    if (r < 8) {
      return 16
    }

    if (r > 248) {
      return 231
    }

    return Math.round(((r - 8) / 247) * 24) + 232
  }

  const ansi =
    16 + 36 * Math.round((r / 255) * 5) + 6 * Math.round((g / 255) * 5) + Math.round((b / 255) * 5)

  return ansi
}

convert$1.ansi16.rgb = function (args) {
  args = args[0]

  let color = args % 10

  // Handle greyscale
  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5
    }

    color = (color / 10.5) * 255

    return [color, color, color]
  }

  const mult = (Math.trunc(args > 50) + 1) * 0.5
  /* eslint-disable no-bitwise */
  const r = (color & 1) * mult * 255
  const g = ((color >> 1) & 1) * mult * 255
  const b = ((color >> 2) & 1) * mult * 255
  /* eslint-enable no-bitwise */

  return [r, g, b]
}

convert$1.ansi256.rgb = function (args) {
  args = args[0]

  // Handle greyscale
  if (args >= 232) {
    const c = (args - 232) * 10 + 8
    return [c, c, c]
  }

  args -= 16

  let rem
  const r = (Math.floor(args / 36) / 5) * 255
  const g = (Math.floor((rem = args % 36) / 6) / 5) * 255
  const b = ((rem % 6) / 5) * 255

  return [r, g, b]
}

convert$1.rgb.hex = function (args) {
  /* eslint-disable no-bitwise */
  const integer =
    ((Math.round(args[0]) & 0xff) << 16) +
    ((Math.round(args[1]) & 0xff) << 8) +
    (Math.round(args[2]) & 0xff)
  /* eslint-enable no-bitwise */

  const string = integer.toString(16).toUpperCase()
  return '000000'.slice(string.length) + string
}

convert$1.hex.rgb = function (args) {
  const match = args.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i)
  if (!match) {
    return [0, 0, 0]
  }

  let colorString = match[0]

  if (match[0].length === 3) {
    colorString = [...colorString].map((char) => char + char).join('')
  }

  const integer = Number.parseInt(colorString, 16)
  /* eslint-disable no-bitwise */
  const r = (integer >> 16) & 0xff
  const g = (integer >> 8) & 0xff
  const b = integer & 0xff
  /* eslint-enable no-bitwise */

  return [r, g, b]
}

convert$1.rgb.hcg = function (rgb) {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const max = Math.max(Math.max(r, g), b)
  const min = Math.min(Math.min(r, g), b)
  const chroma = max - min
  let hue

  const grayscale = chroma < 1 ? min / (1 - chroma) : 0

  if (chroma <= 0) {
    hue = 0
  } else if (max === r) {
    hue = ((g - b) / chroma) % 6
  } else if (max === g) {
    hue = 2 + (b - r) / chroma
  } else {
    hue = 4 + (r - g) / chroma
  }

  hue /= 6
  hue %= 1

  return [hue * 360, chroma * 100, grayscale * 100]
}

convert$1.hsl.hcg = function (hsl) {
  const s = hsl[1] / 100
  const l = hsl[2] / 100

  const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l)

  let f = 0
  if (c < 1) {
    f = (l - 0.5 * c) / (1 - c)
  }

  return [hsl[0], c * 100, f * 100]
}

convert$1.hsv.hcg = function (hsv) {
  const s = hsv[1] / 100
  const v = hsv[2] / 100

  const c = s * v
  let f = 0

  if (c < 1) {
    f = (v - c) / (1 - c)
  }

  return [hsv[0], c * 100, f * 100]
}

convert$1.hcg.rgb = function (hcg) {
  const h = hcg[0] / 360
  const c = hcg[1] / 100
  const g = hcg[2] / 100

  if (c === 0) {
    return [g * 255, g * 255, g * 255]
  }

  const pure = [0, 0, 0]
  const hi = (h % 1) * 6
  const v = hi % 1
  const w = 1 - v
  let mg = 0

  /* eslint-disable max-statements-per-line */
  switch (Math.floor(hi)) {
    case 0: {
      pure[0] = 1
      pure[1] = v
      pure[2] = 0
      break
    }

    case 1: {
      pure[0] = w
      pure[1] = 1
      pure[2] = 0
      break
    }

    case 2: {
      pure[0] = 0
      pure[1] = 1
      pure[2] = v
      break
    }

    case 3: {
      pure[0] = 0
      pure[1] = w
      pure[2] = 1
      break
    }

    case 4: {
      pure[0] = v
      pure[1] = 0
      pure[2] = 1
      break
    }

    default: {
      pure[0] = 1
      pure[1] = 0
      pure[2] = w
    }
  }
  /* eslint-enable max-statements-per-line */

  mg = (1 - c) * g

  return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255]
}

convert$1.hcg.hsv = function (hcg) {
  const c = hcg[1] / 100
  const g = hcg[2] / 100

  const v = c + g * (1 - c)
  let f = 0

  if (v > 0) {
    f = c / v
  }

  return [hcg[0], f * 100, v * 100]
}

convert$1.hcg.hsl = function (hcg) {
  const c = hcg[1] / 100
  const g = hcg[2] / 100

  const l = g * (1 - c) + 0.5 * c
  let s = 0

  if (l > 0 && l < 0.5) {
    s = c / (2 * l)
  } else if (l >= 0.5 && l < 1) {
    s = c / (2 * (1 - l))
  }

  return [hcg[0], s * 100, l * 100]
}

convert$1.hcg.hwb = function (hcg) {
  const c = hcg[1] / 100
  const g = hcg[2] / 100
  const v = c + g * (1 - c)
  return [hcg[0], (v - c) * 100, (1 - v) * 100]
}

convert$1.hwb.hcg = function (hwb) {
  const w = hwb[1] / 100
  const b = hwb[2] / 100
  const v = 1 - b
  const c = v - w
  let g = 0

  if (c < 1) {
    g = (v - c) / (1 - c)
  }

  return [hwb[0], c * 100, g * 100]
}

convert$1.apple.rgb = function (apple) {
  return [(apple[0] / 65_535) * 255, (apple[1] / 65_535) * 255, (apple[2] / 65_535) * 255]
}

convert$1.rgb.apple = function (rgb) {
  return [(rgb[0] / 255) * 65_535, (rgb[1] / 255) * 65_535, (rgb[2] / 255) * 65_535]
}

convert$1.gray.rgb = function (args) {
  return [(args[0] / 100) * 255, (args[0] / 100) * 255, (args[0] / 100) * 255]
}

convert$1.gray.hsl = function (args) {
  return [0, 0, args[0]]
}

convert$1.gray.hsv = convert$1.gray.hsl

convert$1.gray.hwb = function (gray) {
  return [0, 100, gray[0]]
}

convert$1.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]]
}

convert$1.gray.lab = function (gray) {
  return [gray[0], 0, 0]
}

convert$1.gray.hex = function (gray) {
  /* eslint-disable no-bitwise */
  const value = Math.round((gray[0] / 100) * 255) & 0xff
  const integer = (value << 16) + (value << 8) + value
  /* eslint-enable no-bitwise */

  const string = integer.toString(16).toUpperCase()
  return '000000'.slice(string.length) + string
}

convert$1.rgb.gray = function (rgb) {
  const value = (rgb[0] + rgb[1] + rgb[2]) / 3
  return [(value / 255) * 100]
}

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
  const graph = {}
  // https://jsperf.com/object-keys-vs-for-in-with-closure/3
  const models = Object.keys(convert$1)

  for (let { length } = models, i = 0; i < length; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    }
  }

  return graph
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
  const graph = buildGraph()
  const queue = [fromModel] // Unshift -> queue -> pop

  graph[fromModel].distance = 0

  while (queue.length > 0) {
    const current = queue.pop()
    const adjacents = Object.keys(convert$1[current])

    for (let { length } = adjacents, i = 0; i < length; i++) {
      const adjacent = adjacents[i]
      const node = graph[adjacent]

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1
        node.parent = current
        queue.unshift(adjacent)
      }
    }
  }

  return graph
}

function link(from, to) {
  return function (args) {
    return to(from(args))
  }
}

function wrapConversion(toModel, graph) {
  const path = [graph[toModel].parent, toModel]
  let fn = convert$1[graph[toModel].parent][toModel]

  let cur = graph[toModel].parent
  while (graph[cur].parent) {
    path.unshift(graph[cur].parent)
    fn = link(convert$1[graph[cur].parent][cur], fn)
    cur = graph[cur].parent
  }

  fn.conversion = path
  return fn
}

function route(fromModel) {
  const graph = deriveBFS(fromModel)
  const conversion = {}

  const models = Object.keys(graph)
  for (let { length } = models, i = 0; i < length; i++) {
    const toModel = models[i]
    const node = graph[toModel]

    if (node.parent === null) {
      // No possible conversion, or this node is the source model.
      continue
    }

    conversion[toModel] = wrapConversion(toModel, graph)
  }

  return conversion
}

const convert = {}

const models = Object.keys(convert$1)

function wrapRaw(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0]
    if (arg0 === undefined || arg0 === null) {
      return arg0
    }

    if (arg0.length > 1) {
      args = arg0
    }

    return fn(args)
  }

  // Preserve .conversion property if there is one
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion
  }

  return wrappedFn
}

function wrapRounded(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0]

    if (arg0 === undefined || arg0 === null) {
      return arg0
    }

    if (arg0.length > 1) {
      args = arg0
    }

    const result = fn(args)

    // We're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.
    if (typeof result === 'object') {
      for (let { length } = result, i = 0; i < length; i++) {
        result[i] = Math.round(result[i])
      }
    }

    return result
  }

  // Preserve .conversion property if there is one
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion
  }

  return wrappedFn
}

for (const fromModel of models) {
  convert[fromModel] = {}

  Object.defineProperty(convert[fromModel], 'channels', { value: convert$1[fromModel].channels })
  Object.defineProperty(convert[fromModel], 'labels', { value: convert$1[fromModel].labels })

  const routes = route(fromModel)
  const routeModels = Object.keys(routes)

  for (const toModel of routeModels) {
    const fn = routes[toModel]

    convert[fromModel][toModel] = wrapRounded(fn)
    convert[fromModel][toModel].raw = wrapRaw(fn)
  }
}

const skippedModels = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  'keyword',

  // Gray conflicts with some method names, and has its own method defined.
  'gray',

  // Shouldn't really be in color-convert either...
  'hex'
]

const hashedModelKeys = {}
for (const model of Object.keys(convert)) {
  hashedModelKeys[[...convert[model].labels].sort().join('')] = model
}

const limiters = {}

function Color(object, model) {
  if (!(this instanceof Color)) {
    return new Color(object, model)
  }

  if (model && model in skippedModels) {
    model = null
  }

  if (model && !(model in convert)) {
    throw new Error('Unknown model: ' + model)
  }

  let i
  let channels

  if (object == null) {
    // eslint-disable-line no-eq-null,eqeqeq
    this.model = 'rgb'
    this.color = [0, 0, 0]
    this.valpha = 1
  } else if (object instanceof Color) {
    this.model = object.model
    this.color = [...object.color]
    this.valpha = object.valpha
  } else if (typeof object === 'string') {
    const result = cs.get(object)
    if (result === null) {
      throw new Error('Unable to parse color from string: ' + object)
    }

    this.model = result.model
    channels = convert[this.model].channels
    this.color = result.value.slice(0, channels)
    this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1
  } else if (object.length > 0) {
    this.model = model || 'rgb'
    channels = convert[this.model].channels
    const newArray = Array.prototype.slice.call(object, 0, channels)
    this.color = zeroArray(newArray, channels)
    this.valpha = typeof object[channels] === 'number' ? object[channels] : 1
  } else if (typeof object === 'number') {
    // This is always RGB - can be converted later on.
    this.model = 'rgb'
    this.color = [(object >> 16) & 0xff, (object >> 8) & 0xff, object & 0xff]
    this.valpha = 1
  } else {
    this.valpha = 1

    const keys = Object.keys(object)
    if ('alpha' in object) {
      keys.splice(keys.indexOf('alpha'), 1)
      this.valpha = typeof object.alpha === 'number' ? object.alpha : 0
    }

    const hashedKeys = keys.sort().join('')
    if (!(hashedKeys in hashedModelKeys)) {
      throw new Error('Unable to parse color from object: ' + JSON.stringify(object))
    }

    this.model = hashedModelKeys[hashedKeys]

    const { labels } = convert[this.model]
    const color = []
    for (i = 0; i < labels.length; i++) {
      color.push(object[labels[i]])
    }

    this.color = zeroArray(color)
  }

  // Perform limitations (clamping, etc.)
  if (limiters[this.model]) {
    channels = convert[this.model].channels
    for (i = 0; i < channels; i++) {
      const limit = limiters[this.model][i]
      if (limit) {
        this.color[i] = limit(this.color[i])
      }
    }
  }

  this.valpha = Math.max(0, Math.min(1, this.valpha))

  if (Object.freeze) {
    Object.freeze(this)
  }
}

Color.prototype = {
  toString() {
    return this.string()
  },

  toJSON() {
    return this[this.model]()
  },

  string(places) {
    let self = this.model in cs.to ? this : this.rgb()
    self = self.round(typeof places === 'number' ? places : 1)
    const arguments_ = self.valpha === 1 ? self.color : [...self.color, this.valpha]
    return cs.to[self.model](...arguments_)
  },

  percentString(places) {
    const self = this.rgb().round(typeof places === 'number' ? places : 1)
    const arguments_ = self.valpha === 1 ? self.color : [...self.color, this.valpha]
    return cs.to.rgb.percent(...arguments_)
  },

  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha]
  },

  object() {
    const result = {}
    const { channels } = convert[this.model]
    const { labels } = convert[this.model]

    for (let i = 0; i < channels; i++) {
      result[labels[i]] = this.color[i]
    }

    if (this.valpha !== 1) {
      result.alpha = this.valpha
    }

    return result
  },

  unitArray() {
    const rgb = this.rgb().color
    rgb[0] /= 255
    rgb[1] /= 255
    rgb[2] /= 255

    if (this.valpha !== 1) {
      rgb.push(this.valpha)
    }

    return rgb
  },

  unitObject() {
    const rgb = this.rgb().object()
    rgb.r /= 255
    rgb.g /= 255
    rgb.b /= 255

    if (this.valpha !== 1) {
      rgb.alpha = this.valpha
    }

    return rgb
  },

  round(places) {
    places = Math.max(places || 0, 0)
    return new Color([...this.color.map(roundToPlace(places)), this.valpha], this.model)
  },

  alpha(value) {
    if (value !== undefined) {
      return new Color([...this.color, Math.max(0, Math.min(1, value))], this.model)
    }

    return this.valpha
  },

  // Rgb
  red: getset('rgb', 0, maxfn(255)),
  green: getset('rgb', 1, maxfn(255)),
  blue: getset('rgb', 2, maxfn(255)),

  hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, (value) => ((value % 360) + 360) % 360),

  saturationl: getset('hsl', 1, maxfn(100)),
  lightness: getset('hsl', 2, maxfn(100)),

  saturationv: getset('hsv', 1, maxfn(100)),
  value: getset('hsv', 2, maxfn(100)),

  chroma: getset('hcg', 1, maxfn(100)),
  gray: getset('hcg', 2, maxfn(100)),

  white: getset('hwb', 1, maxfn(100)),
  wblack: getset('hwb', 2, maxfn(100)),

  cyan: getset('cmyk', 0, maxfn(100)),
  magenta: getset('cmyk', 1, maxfn(100)),
  yellow: getset('cmyk', 2, maxfn(100)),
  black: getset('cmyk', 3, maxfn(100)),

  x: getset('xyz', 0, maxfn(95.047)),
  y: getset('xyz', 1, maxfn(100)),
  z: getset('xyz', 2, maxfn(108.833)),

  l: getset('lab', 0, maxfn(100)),
  a: getset('lab', 1),
  b: getset('lab', 2),

  keyword(value) {
    if (value !== undefined) {
      return new Color(value)
    }

    return convert[this.model].keyword(this.color)
  },

  hex(value) {
    if (value !== undefined) {
      return new Color(value)
    }

    return cs.to.hex(...this.rgb().round().color)
  },

  hexa(value) {
    if (value !== undefined) {
      return new Color(value)
    }

    const rgbArray = this.rgb().round().color

    let alphaHex = Math.round(this.valpha * 255)
      .toString(16)
      .toUpperCase()
    if (alphaHex.length === 1) {
      alphaHex = '0' + alphaHex
    }

    return cs.to.hex(...rgbArray) + alphaHex
  },

  rgbNumber() {
    const rgb = this.rgb().color
    return ((rgb[0] & 0xff) << 16) | ((rgb[1] & 0xff) << 8) | (rgb[2] & 0xff)
  },

  luminosity() {
    // http://www.w3.org/TR/WCAG20/#relativeluminancedef
    const rgb = this.rgb().color

    const lum = []
    for (const [i, element] of rgb.entries()) {
      const chan = element / 255
      lum[i] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4
    }

    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2]
  },

  contrast(color2) {
    // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
    const lum1 = this.luminosity()
    const lum2 = color2.luminosity()

    if (lum1 > lum2) {
      return (lum1 + 0.05) / (lum2 + 0.05)
    }

    return (lum2 + 0.05) / (lum1 + 0.05)
  },

  level(color2) {
    // https://www.w3.org/TR/WCAG/#contrast-enhanced
    const contrastRatio = this.contrast(color2)
    if (contrastRatio >= 7) {
      return 'AAA'
    }

    return contrastRatio >= 4.5 ? 'AA' : ''
  },

  isDark() {
    // YIQ equation from http://24ways.org/2010/calculating-color-contrast
    const rgb = this.rgb().color
    const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 10000
    return yiq < 128
  },

  isLight() {
    return !this.isDark()
  },

  negate() {
    const rgb = this.rgb()
    for (let i = 0; i < 3; i++) {
      rgb.color[i] = 255 - rgb.color[i]
    }

    return rgb
  },

  lighten(ratio) {
    const hsl = this.hsl()
    hsl.color[2] += hsl.color[2] * ratio
    return hsl
  },

  darken(ratio) {
    const hsl = this.hsl()
    hsl.color[2] -= hsl.color[2] * ratio
    return hsl
  },

  saturate(ratio) {
    const hsl = this.hsl()
    hsl.color[1] += hsl.color[1] * ratio
    return hsl
  },

  desaturate(ratio) {
    const hsl = this.hsl()
    hsl.color[1] -= hsl.color[1] * ratio
    return hsl
  },

  whiten(ratio) {
    const hwb = this.hwb()
    hwb.color[1] += hwb.color[1] * ratio
    return hwb
  },

  blacken(ratio) {
    const hwb = this.hwb()
    hwb.color[2] += hwb.color[2] * ratio
    return hwb
  },

  grayscale() {
    // http://en.wikipedia.org/wiki/Grayscale#Converting_colour_to_grayscale
    const rgb = this.rgb().color
    const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11
    return Color.rgb(value, value, value)
  },

  fade(ratio) {
    return this.alpha(this.valpha - this.valpha * ratio)
  },

  opaquer(ratio) {
    return this.alpha(this.valpha + this.valpha * ratio)
  },

  rotate(degrees) {
    const hsl = this.hsl()
    let hue = hsl.color[0]
    hue = (hue + degrees) % 360
    hue = hue < 0 ? 360 + hue : hue
    hsl.color[0] = hue
    return hsl
  },

  mix(mixinColor, weight) {
    // Ported from sass implementation in C
    // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
    if (!mixinColor || !mixinColor.rgb) {
      throw new Error(
        'Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor
      )
    }

    const color1 = mixinColor.rgb()
    const color2 = this.rgb()
    const p = weight === undefined ? 0.5 : weight

    const w = 2 * p - 1
    const a = color1.alpha() - color2.alpha()

    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2
    const w2 = 1 - w1

    return Color.rgb(
      w1 * color1.red() + w2 * color2.red(),
      w1 * color1.green() + w2 * color2.green(),
      w1 * color1.blue() + w2 * color2.blue(),
      color1.alpha() * p + color2.alpha() * (1 - p)
    )
  }
}

// Model conversion methods and static constructors
for (const model of Object.keys(convert)) {
  if (skippedModels.includes(model)) {
    continue
  }

  const { channels } = convert[model]

  // Conversion methods
  Color.prototype[model] = function (...arguments_) {
    if (this.model === model) {
      return new Color(this)
    }

    if (arguments_.length > 0) {
      return new Color(arguments_, model)
    }

    return new Color(
      [...assertArray(convert[this.model][model].raw(this.color)), this.valpha],
      model
    )
  }

  // 'static' construction methods
  Color[model] = function (...arguments_) {
    let color = arguments_[0]
    if (typeof color === 'number') {
      color = zeroArray(arguments_, channels)
    }

    return new Color(color, model)
  }
}

function roundTo(number, places) {
  return Number(number.toFixed(places))
}

function roundToPlace(places) {
  return function (number) {
    return roundTo(number, places)
  }
}

function getset(model, channel, modifier) {
  model = Array.isArray(model) ? model : [model]

  for (const m of model) {
    ;(limiters[m] ||= [])[channel] = modifier
  }

  model = model[0]

  return function (value) {
    let result

    if (value !== undefined) {
      if (modifier) {
        value = modifier(value)
      }

      result = this[model]()
      result.color[channel] = value
      return result
    }

    result = this[model]().color[channel]
    if (modifier) {
      result = modifier(result)
    }

    return result
  }
}

function maxfn(max) {
  return function (v) {
    return Math.max(0, Math.min(max, v))
  }
}

function assertArray(value) {
  return Array.isArray(value) ? value : [value]
}

function zeroArray(array, length) {
  for (let i = 0; i < length; i++) {
    if (typeof array[i] !== 'number') {
      array[i] = 0
    }
  }

  return array
}

var formats = ['hex', 'rgb', 'hsl']
function getFormat(format) {
  if (!format || formats.indexOf(format) < 0) {
    return 'hex'
  }
  return format
}
var getColorString = function (color, format) {
  var innerFormat = getFormat(format)
  if (innerFormat === 'hex') {
    return color[innerFormat]()
  }
  return color[innerFormat]().round().string()
}

// 动态梯度算法
function colorPalette(originColor, i, format) {
  var color = Color(originColor)
  var h = color.hue()
  var s = color.saturationv()
  var v = color.value()
  var hueStep = 2
  var maxSaturationStep = 100
  var minSaturationStep = 9
  var maxValue = 100
  var minValue = 30
  function getNewHue(isLight, i) {
    var hue
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * i : h + hueStep * i
    } else {
      hue = isLight ? h + hueStep * i : h - hueStep * i
    }
    if (hue < 0) {
      hue += 360
    } else if (hue >= 360) {
      hue -= 360
    }
    return Math.round(hue)
  }
  function getNewSaturation(isLight, i) {
    var newSaturation
    if (isLight) {
      newSaturation = s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i
    } else {
      newSaturation = s + ((maxSaturationStep - s) / 4) * i
    }
    return newSaturation
  }
  function getNewValue(isLight, i) {
    return isLight ? v + ((maxValue - v) / 5) * i : v <= minValue ? v : v - ((v - minValue) / 4) * i
  }
  var isLight = i < 6
  var index = isLight ? 6 - i : i - 6
  var retColor =
    i === 6
      ? color
      : Color({
          h: getNewHue(isLight, index),
          s: getNewSaturation(isLight, index),
          v: getNewValue(isLight, index)
        })
  return getColorString(retColor, format)
}

//暗色色板 动态梯度算法
function colorPaletteDark(originColor, i, format) {
  var lightColor = Color(colorPalette(originColor, 10 - i + 1, format))
  var originBaseColor = Color(originColor)
  var originBaseHue = originBaseColor.hue()
  var originBaseSaturation = originBaseColor.saturationv()
  var baseColor = Color({
    h: originBaseColor.hue(),
    s: getNewSaturation(6),
    v: originBaseColor.value()
  })
  var baseSaturation = baseColor.saturationv()
  var step = Math.ceil((baseSaturation - 9) / 4)
  var step1to5 = Math.ceil((100 - baseSaturation) / 5)
  function getNewSaturation(_index) {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5
    }
    if (_index === 6) {
      if (originBaseHue >= 0 && originBaseHue < 50) {
        return originBaseSaturation - 15
      }
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20
      }
      if (originBaseHue >= 191 && originBaseHue <= 360) {
        return originBaseSaturation - 15
      }
    }
    return baseSaturation - step * (_index - 6)
  }
  var retColor = Color({
    h: lightColor.hue(),
    s: getNewSaturation(i),
    v: lightColor.value()
  })
  return getColorString(retColor, format)
}

function generate(color, options) {
  if (options === void 0) {
    options = {}
  }
  var dark = options.dark,
    list = options.list,
    _a = options.index,
    index = _a === void 0 ? 6 : _a,
    _b = options.format,
    format = _b === void 0 ? 'hex' : _b
  if (list) {
    var list_1 = []
    var func = dark ? colorPaletteDark : colorPalette
    for (var i = 1; i <= 10; i++) {
      list_1.push(func(color, i, format))
    }
    return list_1
  }
  return dark ? colorPaletteDark(color, index, format) : colorPalette(color, index, format)
}

var formChildrenIndex = 0

console.log(prefix, 'prefix', generate('#fff'))
var Button = defineComponent({
  setup: function (props, ctx) {
    var buttonRef = ref()
    var handleClick = function (event) {
      var _a
      ctx.emit('click', event)
      if (buttonRef.value) {
        ;(_a = buttonRef.value) === null || _a === void 0 ? void 0 : _a.blur()
      }
    }
    var iconRender = function () {
      if (props.loading)
        return createVNode(
          IconLoading$1,
          {
            class: ''.concat(prefix, '-button-loading-icon')
          },
          null
        )
      else {
        return props.icon
          ? isFunction(props.icon)
            ? props.icon()
            : props.icon
          : ctx.slots.icon
            ? ctx.slots.icon()
            : createVNode(Fragment, null, null)
      }
    }
    var defaultTextRender = function () {
      var _a, _b
      var vnode = (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
      if (
        props.autoInsertSpace &&
        vnode &&
        vnode[0] &&
        isString(vnode[0].children) &&
        vnode[0].children.length === 2
      ) {
        var isTwoChineseChars = function (str) {
          var reg = /^[\u3400-\u4DBF\u4E00-\u9FFF]{2}$/
          return reg.test(str)
        }
        var content = vnode[0].children
        if (isTwoChineseChars(content)) {
          vnode[0].children = content[0] + ' ' + content[1]
        }
      }
      if (vnode) {
        var childs = null
        if (hasPropsOrSlots('icon', vm) || props.loading) {
          var textClass = ''.concat(prefix, '-button-content-') + props.iconPosition
          childs = createVNode(
            'span',
            {
              class: textClass
            },
            [vnode]
          )
        }
        return childs ? childs : vnode
      }
      return null
    }
    var defaultRender = function () {
      var iconSlot = iconRender()
      var textSlot = defaultTextRender()
      var vnodes = [iconSlot, textSlot]
      if (props.iconPosition === 'right') {
        vnodes = [textSlot, iconSlot]
      }
      var template = createVNode(
        'span',
        {
          class: ''.concat(prefix, '-button-content')
        },
        [...vnodes]
      )
      return {
        template: template,
        iconOnlyClass: !!iconSlot && !textSlot
      }
    }
    var buttonClass = computed(function () {
      var _a
      return [
        ''.concat(prefix, '-button'),
        ''.concat(prefix, '-button-').concat(props.type),
        ''.concat(prefix, '-button-').concat(props.size),
        ''.concat(prefix, '-button-').concat(props.theme),
        ((_a = {}),
        (_a[''.concat(prefix, '-button-disabled')] = props.disabled),
        (_a[''.concat(prefix, '-button-').concat(props.type, '-disabled')] = props.disabled),
        (_a[''.concat(prefix, '-button-loading')] = props.loading && !props.disabled),
        (_a[''.concat(prefix, '-button-icon')] = ctx.slots.icon),
        (_a[''.concat(prefix, '-button-block')] = props.block),
        _a)
      ]
    })
    var buttonStyle = computed(function () {
      var style = {}
      if (props.noHorizontalPadding) {
        if (isBoolean(props.noHorizontalPadding)) {
          style.padding = '0px'
        } else if (isArray(props.noHorizontalPadding)) {
          for (var _i = 0, _a = props.noHorizontalPadding; _i < _a.length; _i++) {
            var direction = _a[_i]
            if (direction === 'left') {
              style.paddingLeft = '0px'
            } else if (direction === 'right') {
              style.paddingRight = '0px'
            }
          }
        } else if (isString(props.noHorizontalPadding)) {
          var key = toFirstLocaleUpperCase(props.noHorizontalPadding)
          style['padding' + key] = props.noHorizontalPadding
        }
      }
      return style
    })
    var vm = getCurrentInstance()
    return function () {
      var _a = defaultRender(),
        template = _a.template,
        iconOnlyClass = _a.iconOnlyClass
      var classNames = __spreadArray([], buttonClass.value, true)
      if (iconOnlyClass) classNames.push(''.concat(prefix, '-button-with-icon-only'))
      else if (!iconOnlyClass && hasPropsOrSlots('icon', vm)) {
        classNames.push(''.concat(prefix, '-button-with-icon'))
      }
      return createVNode(
        Wave,
        {
          disabled: props.disabled,
          target: buttonRef.value,
          rippleSize: [10, 10]
        },
        {
          default: () => [
            createVNode(
              'button',
              mergeProps(
                {
                  tabindex: formChildrenIndex,
                  ref: buttonRef,
                  class: classNames,
                  style: buttonStyle.value,
                  onClick: handleClick,
                  disabled: props.disabled
                },
                ctx.attrs
              ),
              [template]
            )
          ]
        }
      )
    }
  },
  name: ''.concat(prefix, '-button'),
  props: buttonPropsDefaults,
  emits: ['click']
})

var SyncButton = defineComponent({
  setup: function (props, ctx) {
    var loading = ref(false)
    var handleClick = function (e) {
      if (props.onClick) {
        var options = {
          done: function () {
            loading.value = false
          }
        }
        loading.value = true
        props.onClick(e, options).finally(function () {
          loading.value = false
        })
      }
    }
    return function () {
      var _a, _b
      return createVNode(
        Button,
        mergeProps(props, ctx.attrs, {
          loading: loading.value,
          onClick: handleClick
        }),
        {
          default: () => [
            (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
          ]
        }
      )
    }
  },
  inheritAttrs: false,
  name: prefix + '-sync-button',
  props: __assign(__assign({}, buttonPropsDefaults), {
    onClick: {
      type: Function,
      default: null,
      required: false
    }
  })
  // emits: {
  //   click: (event: MouseEvent, options: { done: () => void }) => {
  //     return event instanceof MouseEvent && options
  //   }
  // }
})

var ButtonGroup = defineComponent({
  name: prefix + '-button-group',
  props: buttonGroupProps,
  setup: function (props, _a) {
    var slots = _a.slots
    return function () {
      var _a
      var disabled = props.disabled,
        size = props.size,
        theme = props.theme,
        type = props.type
      var buttons = ((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || []
      var template = []
      var index = 0
      for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
        var button = buttons_1[_i]
        template.push(
          h(button, {
            disabled: disabled,
            size: size,
            theme: theme,
            type: type
          })
        )
        if (index < buttons.length - 1) {
          var lineClass = [
            prefix + '-button-group-line',
            prefix + '-button-group-line-' + theme,
            prefix + '-button-group-line-' + type
          ]
          template.push(
            createVNode(
              'span',
              {
                class: lineClass
              },
              null
            )
          )
        }
        index++
      }
      return createVNode(
        'div',
        {
          class: prefix + '-button-group'
        },
        [template]
      )
    }
  }
})

var watermarkProps = {
  width: 120,
  height: 64,
  inherit: true,
  rotate: -22,
  zIndex: 9,
  image: '',
  content: '',
  font: function () {
    return {
      fontSize: 16,
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: 'rgba(0, 0, 0, 0.15)',
      textAlign: 'center'
    }
  },
  gap: function () {
    return [100, 100]
  },
  offset: function () {
    return [100 / 2, 100 / 2]
  }
}

var Watermark = defineComponent({
  name: prefix + '-watermark',
  props: watermarkProps,
  setup: function (props) {
    console.log(props)
    return function () {
      return createVNode('div', null, [createTextVNode('watermark')])
    }
  }
})

var inputPropsDefaults = {
  modelValue: {
    modelValue: String,
    default: undefined
  },
  value: {
    type: String,
    default: undefined
  },
  defaultValue: {
    type: String,
    default: undefined
  },
  size: {
    values: ['small', 'default', 'large'],
    default: 'default'
  },
  // Whether to disable or not, the default is false
  disabled: {
    type: Boolean,
    default: false
  },
  // input mode
  type: {
    values: ['text', 'password'],
    default: 'text'
  },
  // input placeholder
  placeholder: {
    type: String,
    default: undefined
  },
  // clean icon Custom
  clearIcon: {
    type: [String, Object, Function, null],
    default: undefined,
    required: false
  },
  // When there is a value in the input box and it is in the hover or focus state, the clean icon is displayed
  showClear: {
    type: Boolean,
    default: false
  },
  // Borderless input box
  borderless: {
    type: Boolean,
    default: false
  },
  // Check the status. The selectable values are default, error, and warning. default is default. Only affects the display style
  validateStatus: {
    values: ['default', 'error', 'warning'],
    default: 'default'
  }
}

var Input = defineComponent({
  setup: function (props, ctx) {
    var inputWrapperRef = ref()
    var inputRef = ref()
    var inputSelfData = reactive({
      value: props.value || props.defaultValue,
      showClearIcon: false,
      focus: false,
      showPassword: false
    })
    // style handle
    var inputWrapperClass = computed(function () {
      var _a
      return [
        ''.concat(prefix, '-input'),
        ''.concat(prefix, '-input-') + props.size,
        ((_a = {}),
        (_a[''.concat(prefix, '-input-disabled')] = props.disabled),
        (_a[''.concat(prefix, '-input-clearable')] = props.showClear),
        (_a[''.concat(prefix, '-input-borderless')] = props.borderless),
        (_a[''.concat(prefix, '-input-').concat(props.validateStatus)] =
          props.validateStatus !== 'default'),
        (_a[''.concat(prefix, '-input-focus')] = inputSelfData.focus),
        _a)
      ]
    })
    var inputTargetClass = computed(function () {
      var _a
      return [
        ''.concat(prefix, '-input-target'),
        ''.concat(prefix, '-input-target-') + props.size,
        ((_a = {}),
        (_a[''.concat(prefix, '-input-target-disabled')] = props.disabled),
        (_a[''.concat(prefix, '-input-target-clearable')] = props.showClear),
        _a)
      ]
    })
    // traget input event handle
    var handleTargetInputChange = function (e) {
      inputSelfData.value = e.target.value
      var target = e.target
      handleUpdateModelValue(target.value)
      ctx.emit('change', inputSelfData.value, e)
    }
    var handleTargetInputFocus = function (e) {
      inputSelfData.focus = true
      ctx.emit('focus', e)
    }
    var handleTargetInputBlur = function (e) {
      inputSelfData.focus = false
      ctx.emit('blur', e)
    }
    var handleControlInputCursorForFocus = function () {
      var _a
      ;(_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.focus()
      requestAnimationFrame(function () {
        var _a, _b
        inputSelfData.focus = true
        var len = (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.value.length
        if (len)
          (_b = inputRef.value) === null || _b === void 0 ? void 0 : _b.setSelectionRange(len, len)
      })
    }
    // control the cleaning icon
    var showClearIconWapper = computed(function () {
      var flag = inputSelfData.focus || inputSelfData.showClearIcon
      if (inputValue.value && props.showClear && flag && !props.disabled) return true
      return false
    })
    var handleClearInput = function (e) {
      inputSelfData.value = ''
      ctx.emit('clear', e)
      handleUpdateModelValue(inputSelfData.value)
      ctx.emit('change', inputSelfData.value, e)
      handleControlInputCursorForFocus()
    }
    var handleMoveEnter = function () {
      if (props.showClear) {
        inputSelfData.showClearIcon = true
      }
    }
    var handleMoveLeave = function () {
      inputSelfData.showClearIcon = false
    }
    onMounted(function () {
      var _a, _b
      if (props.showClear) {
        ;(_a = inputWrapperRef.value) === null || _a === void 0
          ? void 0
          : _a.addEventListener('mousemove', handleMoveEnter)
        ;(_b = inputWrapperRef.value) === null || _b === void 0
          ? void 0
          : _b.addEventListener('mouseleave', handleMoveLeave)
      }
    })
    onBeforeUnmount(function () {
      var _a, _b
      ;(_a = inputWrapperRef.value) === null || _a === void 0
        ? void 0
        : _a.removeEventListener('mousemove', handleMoveEnter)
      ;(_b = inputWrapperRef.value) === null || _b === void 0
        ? void 0
        : _b.removeEventListener('mouseleave', handleMoveLeave)
    })
    // password icon status trigger
    var triggerPasswordStatus = function () {
      handleControlInputCursorForFocus()
      inputSelfData.showPassword = !inputSelfData.showPassword
    }
    // v-model
    if (props.modelValue !== undefined && props.value !== undefined) {
      consolaWrapper.warn(
        'Input components modelValue and value cannot be passed in simultaneously.'
      )
    }
    var inputValue = computed(function () {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.value !== undefined && props.value === inputSelfData.value) {
        return props.value
      }
      // When the props value is different from its own value, the own value is adopted
      return inputSelfData.value
    })
    var handleUpdateModelValue = function (value) {
      ctx.emit('update:modelValue', value)
    }
    //expose input ref method
    ctx.expose({
      focus: function () {
        var _a
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.focus()
      },
      blur: function () {
        var _a
        return (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.blur()
      }
    })
    return function () {
      return createVNode(
        'div',
        {
          class: inputWrapperClass.value,
          ref: inputWrapperRef
        },
        [
          createVNode(
            'input',
            mergeProps(
              {
                tabindex: formChildrenIndex,
                ref: inputRef,
                value: inputValue.value,
                onChange: handleTargetInputChange,
                onInput: handleTargetInputChange,
                onFocus: handleTargetInputFocus,
                onBlur: handleTargetInputBlur,
                type: props.type === 'password' && inputSelfData.showPassword ? 'text' : props.type,
                disabled: props.disabled,
                placeholder: props.placeholder,
                class: inputTargetClass.value
              },
              ctx.attrs
            ),
            null
          ),
          showClearIconWapper.value &&
            createVNode(
              'div',
              {
                class: ''.concat(prefix, '-input-clearable-icon')
              },
              [
                createVNode(
                  Icon,
                  {
                    disabled: props.disabled,
                    name: 'IconClear',
                    onClick: handleClearInput
                  },
                  null
                )
              ]
            ),
          props.type === 'password' &&
            createVNode(
              'div',
              {
                class: ''.concat(prefix, '-input-password-icon')
              },
              [
                inputSelfData.showPassword
                  ? createVNode(
                      IconEyeOpened$1,
                      {
                        disabled: props.disabled,
                        onClick: triggerPasswordStatus
                      },
                      null
                    )
                  : createVNode(
                      IconEyeClosedSolid$1,
                      {
                        disabled: props.disabled,
                        onClick: triggerPasswordStatus
                      },
                      null
                    )
              ]
            )
        ]
      )
    }
  },
  name: prefix + '-input',
  props: inputPropsDefaults,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'clear']
})

var rowScopeKey = Symbol('rowScope')
var useRowScope = function () {
  try {
    return inject(rowScopeKey)
  } catch (_a) {
    return undefined
  }
}

var getGutter = function (gutter, scope) {
  var _a, _b
  if (scope === void 0) {
    scope = false
  }
  var trend = scope ? -1 : 1
  var attrName = scope ? 'padding' : 'margin'
  if (isNumber(gutter)) {
    return (
      (_a = {}),
      (_a[''.concat(attrName, 'Left')] = (-gutter / 2) * trend + 'px'),
      (_a[''.concat(attrName, 'Right')] = (-gutter / 2) * trend + 'px'),
      _a
    )
  } else if (isArray(gutter)) {
    var gutterX = gutter[0],
      gutterY = gutter[1]
    if (!isNumber(gutterX)) {
      consolaWrapper.error('gutterX must be a number')
    }
    if (!isNumber(gutterY)) {
      consolaWrapper.error('gutterY must be a number')
    }
    return (
      (_b = {}),
      (_b[attrName] = ''
        .concat((-gutterY / 2) * trend, 'px ')
        .concat((-gutterX / 2) * trend, 'px')),
      _b
    )
  }
  //对象响应式处理 todo
  return {}
}

var rowProps = {
  gutter: {
    type: [Number, Object, Array],
    default: undefined
  },
  type: {
    type: String,
    default: 'grid'
  },
  justify: {
    type: String,
    default: 'start'
  },
  align: {
    type: String,
    default: 'middle'
  }
}
var Row = defineComponent(
  function (props, ctx) {
    provide(rowScopeKey, reactive(props))
    var rowStyle = computed(function () {
      return getGutter(props.gutter)
    })
    var rowClass = computed(function () {
      var _a
      return [
        props.type === 'flex'
          ? ''.concat(prefix, '-row-').concat(props.type)
          : ''.concat(prefix, '-row'),
        ((_a = {}),
        (_a[''.concat(prefix, '-row-flex-').concat(props.justify)] = props.justify),
        (_a[''.concat(prefix, '-row-flex-').concat(props.align)] = props.align),
        _a)
      ]
    })
    return function () {
      var _a, _b
      return createVNode(
        'div',
        {
          style: rowStyle.value,
          class: rowClass.value
        },
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  {
    props: rowProps,
    name: prefix + '-row'
  }
)

var gridMaxCol = 24
var props$1 = {
  lg: {
    type: Object,
    default: undefined
  },
  md: {
    type: Object,
    default: undefined
  },
  sm: {
    type: Object,
    default: undefined
  },
  xs: {
    type: Object,
    default: undefined
  },
  xl: {
    type: Object,
    default: undefined
  },
  xxl: {
    type: Object,
    default: undefined
  },
  span: {
    type: Number,
    default: gridMaxCol
  },
  offset: {
    type: Number,
    default: undefined
  },
  order: {
    type: Number,
    default: undefined
  },
  pull: {
    type: Number,
    default: undefined
  },
  push: {
    type: Number,
    default: undefined
  }
}
var Col = defineComponent(
  function (props, ctx) {
    var rowScope = useRowScope()
    if (!rowScope) consolaWrapper.warn('Col must be placed as a child of Row')
    var colClass = computed(function () {
      var _a
      var span = props.span
      return [
        ''.concat(prefix, '-col'),
        ''.concat(prefix, '-col-').concat(span),
        ((_a = {}), (_a[''.concat(prefix, '-col-offset-').concat(props.offset)] = props.offset), _a)
      ]
    })
    var colStyle = computed(function () {
      if (rowScope) return getGutter(rowScope.gutter, true)
      else return {}
    })
    return function () {
      var _a, _b
      return createVNode(
        'div',
        mergeProps(
          {
            style: colStyle.value,
            class: colClass.value
          },
          ctx.attrs
        ),
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  {
    name: prefix + '-col',
    props: props$1
  }
)

var flexProps = omitKeys(rowProps, ['type'])
var Flex = defineComponent(
  function (props, ctx) {
    return function () {
      var _a, _b
      return createVNode(
        Row,
        mergeProps(props, ctx.attrs, {
          type: 'flex'
        }),
        {
          default: () => [
            (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
          ]
        }
      )
    }
  },
  {
    props: flexProps,
    name: prefix + '-flex'
  }
)

Row.Flex = Flex
Row.Col = Col

var popoverProps = {
  /**
   * @description 是否自动调整弹出层展开方向，用于边缘遮挡时自动调整展开方向
   */
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 小三角”是否指向元素中心，需要同时传入"showArrow=true
   */
  arrowPointAtCenter: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 是否显示“小三角”
   */
  showArrow: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 点击弹出层及内部任一元素时是否自动关闭弹层
   */
  clickToHide: {
    type: Boolean,
    default: false,
    required: false
  },
  position: {
    values: [
      'top',
      'topLeft',
      'topRight',
      'left',
      'leftTop',
      'leftBottom',
      'right',
      'rightTop',
      'rightBottom',
      'bottom',
      'bottomLeft',
      'bottomRight'
    ],
    default: 'top',
    required: false
  },
  /**
   * @description 是否阻止弹出层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false,
    required: false
  },
  content: {
    type: [String, Object, Function, null],
    default: undefined
  },
  getPopupContainer: {
    type: [Function],
    default: function () {
      return function () {
        return document.body
      }
    },
    required: false
  },
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
    default: 'hover',
    required: false
  },
  // if trigger == custom effect
  visible: {
    type: Boolean,
    default: false,
    required: false
  },
  zIndex: {
    type: Number,
    default: 1000,
    required: false
  },
  /**
   * @description 弹出层计算溢出时的增加的冗余值
   */
  margin: {
    type: Array,
    default: function () {
      return [0, 0, 0, 0]
    },
    required: false
  },
  /**
   * @description 弹出层与 children 元素的距离，单位 px
   */
  spacing: {
    type: [Number, Object],
    default: 8,
    required: false
  }
}
var popoverEmits = {
  visibleChange: function (visible) {
    return isBoolean(visible)
  },
  clickOutSide: function (e) {
    return e instanceof Event
  }
}

var positionValues = [
  'top',
  'topLeft',
  'topRight',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
  'bottom',
  'bottomLeft',
  'bottomRight'
]
var tooltioProps = {
  /**
   * @description 弹出层被遮挡时是否自动调整方向
   */
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 小三角”是否指向元素中心，需要同时传入"showArrow=true
   */
  arrowPointAtCenter: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 是否显示箭头三角形
   */
  showArrow: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 是否阻止弹层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否从包裹的元素水平或垂直中心处变换，该参数仅影响动效变换的 transform-origin，一般无需改动
   */
  transformFromCenter: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 弹层出现的位置
   */
  position: {
    values: positionValues,
    default: 'top',
    required: false
  },
  content: {
    type: [String, Object, Function, null],
    default: undefined
  },
  getPopupContainer: {
    type: [Function],
    default: function () {
      return function () {
        return document.body
      }
    },
    required: false
  },
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
    default: 'hover',
    required: false
  },
  // if trigger == custom effect
  visible: {
    type: Boolean,
    default: false,
    required: false
  },
  wrapper: {
    type: [Boolean, String],
    default: false,
    required: false
  },
  clickToHide: {
    type: Boolean,
    default: false,
    required: false
  },
  spacing: {
    type: [Number, Object],
    default: 8,
    required: false
  },
  motion: {
    type: Boolean,
    default: true,
    required: false
  },
  margin: {
    type: Array,
    default: function () {
      return [0, 0, 0, 0]
    },
    required: false
  },
  zIndex: {
    type: Number,
    default: 1000,
    required: false
  }
}
var tooltipEmits = {
  /**
   * @description 弹出层展示/隐藏时触发的回调
   */
  visibleChange: function (visible) {
    return isBoolean(visible)
  },
  /**
   * @description 当弹出层处于展示状态，点击非Children、非浮层内部区域时的回调（仅trigger为custom、click时有效）
   */
  clickOutSide: function (e) {
    return e instanceof Event
  }
}

var portalProps = {
  getPopupContainer: {
    type: [Function],
    default: function () {
      return function () {
        return document.body
      }
    },
    required: false
  },
  //底元素的尺寸 getBoundingClientRect
  targetElementRect: {
    type: Object,
    default: {}
  },
  triggerElementRef: {
    type: Object,
    default: null
  },
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },
  innerStyle: {
    type: Object,
    default: function () {
      return {}
    }
  }
}

var Portal = defineComponent(
  function (props, ctx) {
    var innerRef = ref()
    var style = computed(function () {
      return {
        zIndex: 1006
      }
    })
    var allAttrs = useAttrs()
    return function () {
      var _a, _b
      return createVNode(
        Teleport,
        {
          to: props.getPopupContainer(document.body)
        },
        {
          default: () => [
            createVNode(
              'div',
              mergeProps(
                {
                  class: ''.concat(prefix, '-portal'),
                  style: style.value
                },
                allAttrs
              ),
              [
                createVNode(
                  'div',
                  {
                    ref: innerRef,
                    class: ''.concat(prefix, '-portal-inner'),
                    tabindex: -1,
                    style: props.innerStyle
                  },
                  [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
                )
              ]
            )
          ]
        }
      )
    }
  },
  {
    name: prefix + '-portal',
    props: portalProps,
    inheritAttrs: false
  }
)

var triggerEventMap = {
  click: {
    enter: 'click',
    leave: 'click'
  },
  hover: {
    enter: 'mouseenter',
    leave: 'mouseleave'
  },
  focus: {
    enter: 'focus',
    leave: 'blur'
  },
  custom: {
    enter: 'custom',
    leave: 'custom'
  }
}

var REGS = {
  TOP: /top/i,
  RIGHT: /right/i,
  BOTTOM: /bottom/i,
  LEFT: /left/i
}
var isReverse = function (rowSpace, reverseSpace, size) {
  // 原空间不足，反向空间足够
  // Insufficient original space, enough reverse space
  return rowSpace < size && reverseSpace > size
}
var isOverFlow = function (rowSpace, reverseSpace, size) {
  // 原空间且反向空间都不足
  // The original space and the reverse space are not enough
  return rowSpace < size && reverseSpace < size
}
var isHalfOverFlow = function (posSpace, negSpace, size) {
  // 正半空间或者负半空间不足，即表示有遮挡，需要偏移
  // Insufficient positive half space or negative half space means that there is occlusion and needs to be offset
  return posSpace < size || negSpace < size
}
var isHalfAllEnough = function (posSpace, negSpace, size) {
  // 正半空间和负半空间都足够，即表示可以从 topLeft/topRight 变成 top
  // Both positive and negative half-spaces are sufficient, which means you can change from topLeft/topRight to top
  return posSpace >= size || negSpace >= size
}
var getReverse = function (
  viewOverFlow,
  containerOverFlow,
  shouldReverseView,
  shouldReverseContainer
) {
  /**
   * 基于视口和容器一起判断，以下几种情况允许从原方向转到反方向，以判断是否应该由top->bottom为例子
   *
   * 1. 视口上下空间不足 且 容器上空间❌下空间✅
   * 2. 视口上空间❌下空间✅
   *
   * Based on the judgment of the viewport and the container, the following situations are allowed to turn from the original direction to the opposite direction
   * to judge whether it should be top->bottom as an example
   * 1. There is insufficient space above and below the viewport and the space above the container ❌ the space below ✅
   * 2. The space above the viewport ❌ the space below ✅ and the space above and below the container is insufficient
   * 3. Viewport upper space ❌ lower space✅ and container upper space ❌ lower space✅
   */
  return (viewOverFlow && shouldReverseContainer) || shouldReverseView
}
var _expandPos = function (position, concatPos) {
  if (position === void 0) {
    position = ''
  }
  return position.concat(concatPos)
}
var isLR = function (position) {
  if (position === void 0) {
    position = ''
  }
  return position.includes('left') || position.includes('right')
}
var isTB = function (position) {
  if (position === void 0) {
    position = ''
  }
  return position.includes('top') || position.includes('bottom')
}
var _reducePos = function (position) {
  if (position === void 0) {
    position = ''
  }
  // if cur position consists of two directions, remove the last position
  var found = ['Top', 'Bottom', 'Left', 'Right'].find(function (pos) {
    return position.endsWith(pos)
  })
  return found ? position.replace(found, '') : position
}
var _reversePos = function (position, isVertical) {
  if (position === void 0) {
    position = ''
  }
  if (isVertical === void 0) {
    isVertical = false
  }
  if (isVertical) {
    if (REGS.TOP.test(position)) {
      return position.replace('top', 'bottom').replace('Top', 'Bottom')
    } else if (REGS.BOTTOM.test(position)) {
      return position.replace('bottom', 'top').replace('Bottom', 'Top')
    }
  } else if (REGS.LEFT.test(position)) {
    return position.replace('left', 'right').replace('Left', 'Right')
  } else if (REGS.RIGHT.test(position)) {
    return position.replace('right', 'left').replace('Right', 'Left')
  }
  return position
}
var _adjustPos = function (position, isVertical, adjustType, concatPos) {
  if (position === void 0) {
    position = ''
  }
  if (isVertical === void 0) {
    isVertical = false
  }
  if (adjustType === void 0) {
    adjustType = 'reverse'
  }
  switch (adjustType) {
    case 'reverse':
      return _reversePos(position, isVertical)
    case 'expand':
      // only happens when position is top/bottom/left/right
      return _expandPos(position, concatPos)
    case 'reduce':
      // only happens when position other than top/bottom/left/right
      return _reducePos(position)
    default:
      return _reversePos(position, isVertical)
  }
}
var adjustPosIfNeed = function (position, style, triggerRect, wrapperRect, containerRect, utils) {
  var innerWidth = window.innerWidth,
    innerHeight = window.innerHeight
  var _a = utils.getProp('margin') || [0, 0, 0, 0],
    marginLeft = _a[0],
    marginTop = _a[1],
    marginRight = _a[2],
    marginBottom = _a[3]
  var isHeightOverFlow = false
  var isWidthOverFlow = false
  var raw_spacing = {
    x: 8,
    y: 8
  }
  var spacing = 0
  var ano_spacing = 0
  if (typeof raw_spacing !== 'number') {
    var isTopOrBottom = position.includes('top') || position.includes('bottom')
    spacing = isTopOrBottom ? raw_spacing.y : raw_spacing.x
    ano_spacing = isTopOrBottom ? raw_spacing.x : raw_spacing.y
  }
  if (wrapperRect.width > 0 && wrapperRect.height > 0) {
    var clientLeft = triggerRect.left
    var clientRight = triggerRect.right
    var clientTop = triggerRect.top
    var clientBottom = triggerRect.bottom
    var restClientLeft = innerWidth - clientLeft
    var restClientTop = innerHeight - clientTop
    var restClientRight = innerWidth - clientRight
    var restClientBottom = innerHeight - clientBottom
    var widthIsBigger = wrapperRect.width > triggerRect.width
    var heightIsBigger = wrapperRect.height > triggerRect.height
    // 基于视口的微调判断
    // Fine-tuning judgment based on viewport
    var shouldViewReverseTop =
      clientTop - marginTop < wrapperRect.height + spacing &&
      restClientBottom - marginBottom > wrapperRect.height + spacing
    var shouldViewReverseLeft =
      clientLeft - marginLeft < wrapperRect.width + spacing &&
      restClientRight - marginRight > wrapperRect.width + spacing
    var shouldViewReverseBottom =
      restClientBottom - marginBottom < wrapperRect.height + spacing &&
      clientTop - marginTop > wrapperRect.height + spacing
    var shouldViewReverseRight =
      restClientRight - marginRight < wrapperRect.width + spacing &&
      clientLeft - marginLeft > wrapperRect.width + spacing
    // const shouldViewReverseTopOver =
    //   restClientTop - marginBottom < wrapperRect.height + spacing &&
    //   clientBottom - marginTop > wrapperRect.height + spacing
    // const shouldViewReverseBottomOver =
    //   clientBottom - marginTop < wrapperRect.height + spacing &&
    //   restClientTop - marginBottom > wrapperRect.height + spacing
    var shouldViewReverseTopSide =
      restClientTop < wrapperRect.height + ano_spacing &&
      clientBottom > wrapperRect.height + ano_spacing
    var shouldViewReverseBottomSide =
      clientBottom < wrapperRect.height + ano_spacing &&
      restClientTop > wrapperRect.height + ano_spacing
    var shouldViewReverseLeftSide =
      restClientLeft < wrapperRect.width + ano_spacing &&
      clientRight > wrapperRect.width + ano_spacing
    var shouldViewReverseRightSide =
      clientRight < wrapperRect.width + ano_spacing &&
      restClientLeft > wrapperRect.width + ano_spacing
    var shouldReverseTopOver =
      restClientTop < wrapperRect.height + spacing && clientBottom > wrapperRect.height + spacing
    var shouldReverseBottomOver =
      clientBottom < wrapperRect.height + spacing && restClientTop > wrapperRect.height + spacing
    var shouldReverseLeftOver =
      restClientLeft < wrapperRect.width && clientRight > wrapperRect.width
    var shouldReverseRightOver =
      clientRight < wrapperRect.width && restClientLeft > wrapperRect.width
    // 基于容器的微调判断
    // Fine-tuning judgment based on container
    var clientTopInContainer = clientTop - containerRect.top
    var clientLeftInContainer = clientLeft - containerRect.left
    var clientBottomInContainer = clientTopInContainer + triggerRect.height
    var clientRightInContainer = clientLeftInContainer + triggerRect.width
    var restClientBottomInContainer = containerRect.bottom - clientBottom
    var restClientRightInContainer = containerRect.right - clientRight
    var restClientTopInContainer = restClientBottomInContainer + triggerRect.height
    var restClientLeftInContainer = restClientRightInContainer + triggerRect.width
    // 当原空间不足，反向空间足够时，可以反向。
    // When the original space is insufficient and the reverse space is sufficient, the reverse can be performed.
    var shouldContainerReverseTop = isReverse(
      clientTopInContainer - marginTop,
      restClientBottomInContainer - marginBottom,
      wrapperRect.height + spacing
    )
    var shouldContainerReverseLeft = isReverse(
      clientLeftInContainer - marginLeft,
      restClientRightInContainer - marginRight,
      wrapperRect.width + spacing
    )
    var shouldContainerReverseBottom = isReverse(
      restClientBottomInContainer - marginBottom,
      clientTopInContainer - marginTop,
      wrapperRect.height + spacing
    )
    var shouldContainerReverseRight = isReverse(
      restClientRightInContainer - marginRight,
      clientLeftInContainer - marginLeft,
      wrapperRect.width + spacing
    )
    // const shouldContainerReverseTopOver = isReverse(
    //   restClientTopInContainer - marginBottom,
    //   clientBottomInContainer - marginTop,
    //   wrapperRect.height + spacing
    // )
    // const shouldContainerReverseBottomOver = isReverse(
    //   clientBottomInContainer - marginTop,
    //   restClientTopInContainer - marginBottom,
    //   wrapperRect.height + spacing
    // )
    var shouldContainerReverseTopSide = isReverse(
      restClientTopInContainer,
      clientBottomInContainer,
      wrapperRect.height + ano_spacing
    )
    var shouldContainerReverseBottomSide = isReverse(
      clientBottomInContainer,
      restClientTopInContainer,
      wrapperRect.height + ano_spacing
    )
    var shouldContainerReverseLeftSide = isReverse(
      restClientLeftInContainer,
      clientRightInContainer,
      wrapperRect.width + ano_spacing
    )
    var shouldContainerReverseRightSide = isReverse(
      clientRightInContainer,
      restClientLeftInContainer,
      wrapperRect.width + ano_spacing
    )
    var halfHeight = triggerRect.height / 2
    var halfWidth = triggerRect.width / 2
    // 视口, 原空间与反向空间是否都不足判断
    // Viewport, whether the original space and the reverse space are insufficient to judge
    var isViewYOverFlow = isOverFlow(
      clientTop - marginTop,
      restClientBottom - marginBottom,
      wrapperRect.height + spacing
    )
    var isViewXOverFlow = isOverFlow(
      clientLeft - marginLeft,
      restClientRight - marginRight,
      wrapperRect.width + spacing
    )
    var isViewYOverFlowSide = isOverFlow(
      clientBottom - marginTop,
      restClientTop - marginBottom,
      wrapperRect.height + spacing
    )
    var isViewXOverFlowSide = isOverFlow(
      clientRight - marginLeft,
      restClientLeft - marginRight,
      wrapperRect.width + spacing
    )
    var isViewYOverFlowSideHalf = isHalfOverFlow(
      clientBottom - halfHeight,
      restClientTop - halfHeight,
      (wrapperRect.height + ano_spacing) / 2
    )
    var isViewXOverFlowSideHalf = isHalfOverFlow(
      clientRight - halfWidth,
      restClientLeft - halfWidth,
      (wrapperRect.width + ano_spacing) / 2
    )
    var isViewYEnoughSideHalf = isHalfAllEnough(
      clientBottom - halfHeight,
      restClientTop - halfHeight,
      (wrapperRect.height + ano_spacing) / 2
    )
    var isViewXEnoughSideHalf = isHalfAllEnough(
      clientRight - halfWidth,
      restClientLeft - halfWidth,
      (wrapperRect.width + ano_spacing) / 2
    )
    // 容器, 原空间与反向空间是否都不足判断
    // container, whether the original space and the reverse space are insufficient to judge
    var isContainerYOverFlow = isOverFlow(
      clientTopInContainer - marginTop,
      restClientBottomInContainer - marginBottom,
      wrapperRect.height + spacing
    )
    var isContainerXOverFlow = isOverFlow(
      clientLeftInContainer - marginLeft,
      restClientRightInContainer - marginRight,
      wrapperRect.width + spacing
    )
    var isContainerYOverFlowSide = isOverFlow(
      clientBottomInContainer - marginTop,
      restClientTopInContainer - marginBottom,
      wrapperRect.height + spacing
    )
    var isContainerXOverFlowSide = isOverFlow(
      clientRightInContainer - marginLeft,
      restClientLeftInContainer - marginRight,
      wrapperRect.width + spacing
    )
    var isContainerYOverFlowSideHalf = isHalfOverFlow(
      clientBottomInContainer - halfHeight,
      restClientTopInContainer - halfHeight,
      (wrapperRect.height + ano_spacing) / 2
    )
    var isContainerXOverFlowSideHalf = isHalfOverFlow(
      clientRightInContainer - halfWidth,
      restClientLeftInContainer - halfWidth,
      (wrapperRect.width + ano_spacing) / 2
    )
    var isContainerYEnoughSideHalf = isHalfAllEnough(
      clientBottomInContainer - halfHeight,
      restClientTopInContainer - halfHeight,
      (wrapperRect.height + ano_spacing) / 2
    )
    var isContainerXEnoughSideHalf = isHalfAllEnough(
      clientRightInContainer - halfWidth,
      restClientLeftInContainer - halfWidth,
      (wrapperRect.width + ano_spacing) / 2
    )
    // 综合 viewport + container 判断微调，即视口 + 容器都放置不行时才能考虑位置调整
    // Comprehensive viewport + container judgment fine-tuning, that is, the position adjustment can only be considered when the viewport + container cannot be placed.
    var shouldReverseTop = getReverse(
      isViewYOverFlow,
      isContainerYOverFlow,
      shouldViewReverseTop,
      shouldContainerReverseTop
    )
    var shouldReverseLeft = getReverse(
      isViewXOverFlow,
      isContainerXOverFlow,
      shouldViewReverseLeft,
      shouldContainerReverseLeft
    )
    var shouldReverseBottom = getReverse(
      isViewYOverFlow,
      isContainerYOverFlow,
      shouldViewReverseBottom,
      shouldContainerReverseBottom
    )
    var shouldReverseRight = getReverse(
      isViewXOverFlow,
      isContainerXOverFlow,
      shouldViewReverseRight,
      shouldContainerReverseRight
    )
    // const shouldReverseTopOver = getReverse(isViewYOverFlowSide, isContainerYOverFlowSide, shouldViewReverseTopOver, shouldContainerReverseTopOver);
    // const shouldReverseBottomOver = getReverse(isViewYOverFlowSide, isContainerYOverFlowSide, shouldViewReverseBottomOver, shouldContainerReverseBottomOver);
    var shouldReverseTopSide = getReverse(
      isViewYOverFlowSide,
      isContainerYOverFlowSide,
      shouldViewReverseTopSide,
      shouldContainerReverseTopSide
    )
    var shouldReverseBottomSide = getReverse(
      isViewYOverFlowSide,
      isContainerYOverFlowSide,
      shouldViewReverseBottomSide,
      shouldContainerReverseBottomSide
    )
    var shouldReverseLeftSide = getReverse(
      isViewXOverFlowSide,
      isContainerXOverFlowSide,
      shouldViewReverseLeftSide,
      shouldContainerReverseLeftSide
    )
    var shouldReverseRightSide = getReverse(
      isViewXOverFlowSide,
      isContainerXOverFlowSide,
      shouldViewReverseRightSide,
      shouldContainerReverseRightSide
    )
    var isYOverFlowSideHalf = isViewYOverFlowSideHalf && isContainerYOverFlowSideHalf
    var isXOverFlowSideHalf = isViewXOverFlowSideHalf && isContainerXOverFlowSideHalf
    switch (position) {
      case 'top':
        if (shouldReverseTop) {
          position = _adjustPos(position, true)
        }
        if (isXOverFlowSideHalf && (shouldReverseLeftSide || shouldReverseRightSide)) {
          position = _adjustPos(position, true, 'expand', shouldReverseLeftSide ? 'Right' : 'Left')
        }
        break
      case 'topLeft':
        if (shouldReverseTop) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseLeftSide && widthIsBigger) {
          position = _adjustPos(position)
        }
        if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
          position = _adjustPos(position, true, 'reduce')
        }
        break
      case 'topRight':
        if (shouldReverseTop) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseRightSide && widthIsBigger) {
          position = _adjustPos(position)
        }
        if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
          position = _adjustPos(position, true, 'reduce')
        }
        break
      case 'left':
        if (shouldReverseLeft) {
          position = _adjustPos(position)
        }
        if (isYOverFlowSideHalf && (shouldReverseTopSide || shouldReverseBottomSide)) {
          position = _adjustPos(position, false, 'expand', shouldReverseTopSide ? 'Bottom' : 'Top')
        }
        break
      case 'leftTop':
        if (shouldReverseLeft) {
          position = _adjustPos(position)
        }
        if (shouldReverseTopSide && heightIsBigger) {
          position = _adjustPos(position, true)
        }
        if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
          position = _adjustPos(position, false, 'reduce')
        }
        break
      case 'leftBottom':
        if (shouldReverseLeft) {
          position = _adjustPos(position)
        }
        if (shouldReverseBottomSide && heightIsBigger) {
          position = _adjustPos(position, true)
        }
        if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
          position = _adjustPos(position, false, 'reduce')
        }
        break
      case 'bottom':
        if (shouldReverseBottom) {
          position = _adjustPos(position, true)
        }
        if (isXOverFlowSideHalf && (shouldReverseLeftSide || shouldReverseRightSide)) {
          position = _adjustPos(position, true, 'expand', shouldReverseLeftSide ? 'Right' : 'Left')
        }
        break
      case 'bottomLeft':
        if (shouldReverseBottom) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseLeftSide && widthIsBigger) {
          position = _adjustPos(position)
        }
        if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
          position = _adjustPos(position, true, 'reduce')
        }
        break
      case 'bottomRight':
        if (shouldReverseBottom) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseRightSide && widthIsBigger) {
          position = _adjustPos(position)
        }
        if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
          position = _adjustPos(position, true, 'reduce')
        }
        break
      case 'right':
        if (shouldReverseRight) {
          position = _adjustPos(position)
        }
        if (isYOverFlowSideHalf && (shouldReverseTopSide || shouldReverseBottomSide)) {
          position = _adjustPos(position, false, 'expand', shouldReverseTopSide ? 'Bottom' : 'Top')
        }
        break
      case 'rightTop':
        if (shouldReverseRight) {
          position = _adjustPos(position)
        }
        if (shouldReverseTopSide && heightIsBigger) {
          position = _adjustPos(position, true)
        }
        if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
          position = _adjustPos(position, false, 'reduce')
        }
        break
      case 'rightBottom':
        if (shouldReverseRight) {
          position = _adjustPos(position)
        }
        if (shouldReverseBottomSide && heightIsBigger) {
          position = _adjustPos(position, true)
        }
        if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
          position = _adjustPos(position, false, 'reduce')
        }
        break
      case 'leftTopOver':
        if (shouldReverseTopOver) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseLeftOver) {
          position = _adjustPos(position)
        }
        break
      case 'leftBottomOver':
        if (shouldReverseBottomOver) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseLeftOver) {
          position = _adjustPos(position)
        }
        break
      case 'rightTopOver':
        if (shouldReverseTopOver) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseRightOver) {
          position = _adjustPos(position)
        }
        break
      case 'rightBottomOver':
        if (shouldReverseBottomOver) {
          position = _adjustPos(position, true)
        }
        if (shouldReverseRightOver) {
          position = _adjustPos(position)
        }
        break
    }
    // 判断溢出 Judgment overflow
    // 上下方向 top and bottom
    if (isTB(position)) {
      isHeightOverFlow = isViewYOverFlow && isContainerYOverFlow
      // Related PR: https://github.com/DouyinFE/semi-design/pull/1297
      // If clientRight or restClientRight less than 0, means that the left and right parts of the trigger are blocked
      // Then the display of the wrapper will also be affected, make width overflow to offset the wrapper
      if (position === 'top' || position === 'bottom') {
        isWidthOverFlow =
          (isViewXOverFlowSideHalf && isContainerXOverFlowSideHalf) ||
          clientRight < 0 ||
          restClientRight < 0
      } else {
        isWidthOverFlow =
          (isViewXOverFlowSide && isContainerXOverFlowSide) ||
          clientRight < 0 ||
          restClientRight < 0
      }
    }
    // 左右方向 left and right
    if (isLR(position)) {
      isWidthOverFlow = isViewXOverFlow && isContainerXOverFlow
      // If clientTop or restClientTop less than 0, means that the top and bottom parts of the trigger are blocked
      // Then the display of the wrapper will also be affected, make height overflow to offset the wrapper
      if (position === 'left' || position === 'right') {
        isHeightOverFlow =
          (isViewYOverFlowSideHalf && isContainerYOverFlowSideHalf) ||
          clientTop < 0 ||
          restClientTop < 0
      } else {
        isHeightOverFlow =
          (isViewYOverFlowSide && isContainerYOverFlowSide) || clientTop < 0 || restClientTop < 0
      }
    }
  }
  return {
    position: position,
    isHeightOverFlow: isHeightOverFlow,
    isWidthOverFlow: isWidthOverFlow
  }
}
var _roundPixel = function (pixel) {
  if (typeof pixel === 'number') {
    return Math.round(pixel)
  }
  return pixel
}
var calcTransformOrigin = function (position, triggerRect, translateX, translateY, utils) {
  if (position && triggerRect && translateX != null && translateY != null) {
    if (utils.getProp('transformFromCenter')) {
      if (['topLeft', 'bottomLeft'].includes(position)) {
        return ''.concat(_roundPixel(triggerRect.width / 2), 'px ').concat(-translateY * 100, '%')
      }
      if (['topRight', 'bottomRight'].includes(position)) {
        return 'calc(100% - '
          .concat(_roundPixel(triggerRect.width / 2), 'px) ')
          .concat(-translateY * 100, '%')
      }
      if (['leftTop', 'rightTop'].includes(position)) {
        return ''.concat(-translateX * 100, '% ').concat(_roundPixel(triggerRect.height / 2), 'px')
      }
      if (['leftBottom', 'rightBottom'].includes(position)) {
        return ''
          .concat(-translateX * 100, '% calc(100% - ')
          .concat(_roundPixel(triggerRect.height / 2), 'px)')
      }
    }
    return ''.concat(-translateX * 100, '% ').concat(-translateY * 100, '%')
  }
  return null
}
var calcPosStyle = function (props) {
  var _a
  var spacing = props.spacing,
    isOverFlow = props.isOverFlow,
    utils = props.utils
  var innerWidth = window.innerWidth
  var triggerRect =
    (isEmpty(props.triggerRect) ? props.triggerRect : utils.getTriggerBounding()) ||
    __assign({}, defaultRect)
  var containerRect =
    (isEmpty(props.containerRect) ? props.containerRect : utils.getPopupContainerRect()) ||
    __assign({}, defaultRect)
  var wrapperRect =
    (isEmpty(props.wrapperRect) ? props.wrapperRect : utils.getWrapperBounding()) ||
    __assign({}, defaultRect)
  var position = props.position != null ? props.position : utils.getProp('position')
  var RAW_SPACING = spacing != null ? spacing : utils.getProp('spacing')
  // const showArrow = props.showArrow
  // const arrowPointAtCenter = props.arrowPointAtCenter
  // const arrowBounding = props.arrowBounding
  var _b = utils.getProps(),
    arrowPointAtCenter = _b.arrowPointAtCenter,
    showArrow = _b.showArrow,
    arrowBounding = _b.arrowBounding
  var pointAtCenter = showArrow && arrowPointAtCenter
  var SPACING = RAW_SPACING
  var ANO_SPACING = 0
  if (typeof RAW_SPACING !== 'number') {
    // extended spacing api with {x: number, y: number}, the axes of the spacing is determined based on the position
    var isTopOrBottom = position.includes('top') || position.includes('bottom')
    SPACING = isTopOrBottom ? RAW_SPACING.y : RAW_SPACING.x
    ANO_SPACING = isTopOrBottom ? RAW_SPACING.x : RAW_SPACING.y
  }
  SPACING = SPACING
  var horizontalArrowWidth = arrowBounding.width ? arrowBounding.width : 24
  var verticalArrowHeight = arrowBounding.width ? arrowBounding.width : 24
  var arrowOffsetY = arrowBounding.offsetY ? arrowBounding.offsetY : 0
  var positionOffsetX = 6
  var positionOffsetY = 6
  var left = 0
  var top = 0
  var translateX = 0
  var translateY = 0
  var middleX = triggerRect.left + triggerRect.width / 2
  var middleY = triggerRect.top + triggerRect.height / 2
  var offsetXWithArrow = positionOffsetX + horizontalArrowWidth / 2
  var offsetYWithArrow = positionOffsetY + verticalArrowHeight / 2
  var heightDifference = wrapperRect.height - containerRect.height
  var widthDifference = wrapperRect.width - containerRect.width
  var offsetHeight = heightDifference > 0 ? heightDifference : 0
  var offsetWidth = widthDifference > 0 ? widthDifference : 0
  var isHeightOverFlow = isOverFlow && isOverFlow[0]
  var isWidthOverFlow = isOverFlow && isOverFlow[1]
  var isTriggerNearLeft = middleX - containerRect.left < containerRect.right - middleX
  var isTriggerNearTop = middleY - containerRect.top < containerRect.bottom - middleY
  var isWrapperWidthOverflow = wrapperRect.width > innerWidth
  var scaled =
    Math.abs(
      (wrapperRect === null || wrapperRect === void 0 ? void 0 : wrapperRect.width) -
        ((_a = utils.getContainer()) === null || _a === void 0 ? void 0 : _a.clientWidth)
    ) > 1
  if (scaled) {
    SPACING = (SPACING * wrapperRect.width) / utils.getContainer().clientWidth
  }
  switch (position) {
    case 'top':
      // left = middleX;
      // top = triggerRect.top - SPACING;
      left = isWidthOverFlow
        ? isTriggerNearLeft
          ? containerRect.left + wrapperRect.width / 2
          : containerRect.right - wrapperRect.width / 2 + offsetWidth
        : middleX + ANO_SPACING
      top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING
      translateX = -0.5
      translateY = -1
      break
    case 'topLeft':
      // left = pointAtCenter ? middleX - offsetXWithArrow : triggerRect.left;
      // top = triggerRect.top - SPACING;
      left = isWidthOverFlow
        ? isWrapperWidthOverflow
          ? containerRect.left
          : containerRect.right - wrapperRect.width
        : pointAtCenter
          ? middleX - offsetXWithArrow + ANO_SPACING
          : triggerRect.left + ANO_SPACING
      top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING
      translateY = -1
      break
    case 'topRight':
      // left = pointAtCenter ? middleX + offsetXWithArrow : triggerRect.right;
      // top = triggerRect.top - SPACING;
      left = isWidthOverFlow
        ? containerRect.right + offsetWidth
        : pointAtCenter
          ? middleX + offsetXWithArrow + ANO_SPACING
          : triggerRect.right + ANO_SPACING
      top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING
      translateY = -1
      translateX = -1
      break
    case 'left':
      // left = triggerRect.left - SPACING;
      // top = middleY;
      // left = isWidthOverFlow? containerRect.right - SPACING : triggerRect.left - SPACING;
      left = isWidthOverFlow
        ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow
        : triggerRect.left - SPACING
      top = isHeightOverFlow
        ? isTriggerNearTop
          ? containerRect.top + wrapperRect.height / 2
          : containerRect.bottom - wrapperRect.height / 2 + offsetHeight
        : middleY + ANO_SPACING
      translateX = -1
      translateY = -0.5
      break
    case 'leftTop':
      // left = triggerRect.left - SPACING;
      // top = pointAtCenter ? middleY - offsetYWithArrow : triggerRect.top;
      left = isWidthOverFlow
        ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow
        : triggerRect.left - SPACING
      top = isHeightOverFlow
        ? containerRect.top
        : pointAtCenter
          ? middleY - offsetYWithArrow + ANO_SPACING
          : triggerRect.top + ANO_SPACING
      translateX = -1
      break
    case 'leftBottom':
      // left = triggerRect.left - SPACING;
      // top = pointAtCenter ? middleY + offsetYWithArrow : triggerRect.bottom;
      left = isWidthOverFlow
        ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow
        : triggerRect.left - SPACING
      top = isHeightOverFlow
        ? containerRect.bottom + offsetHeight
        : pointAtCenter
          ? middleY + offsetYWithArrow + ANO_SPACING
          : triggerRect.bottom + ANO_SPACING
      translateX = -1
      translateY = -1
      break
    case 'bottom':
      // left = middleX;
      // top = triggerRect.top + triggerRect.height + SPACING;
      left = isWidthOverFlow
        ? isTriggerNearLeft
          ? containerRect.left + wrapperRect.width / 2
          : containerRect.right - wrapperRect.width / 2 + offsetWidth
        : middleX + ANO_SPACING
      top = isHeightOverFlow
        ? containerRect.top + offsetYWithArrow - SPACING
        : triggerRect.top + triggerRect.height + SPACING
      translateX = -0.5
      break
    case 'bottomLeft':
      // left = pointAtCenter ? middleX - offsetXWithArrow : triggerRect.left;
      // top = triggerRect.bottom + SPACING;
      left = isWidthOverFlow
        ? isWrapperWidthOverflow
          ? containerRect.left
          : containerRect.right - wrapperRect.width
        : pointAtCenter
          ? middleX - offsetXWithArrow + ANO_SPACING
          : triggerRect.left + ANO_SPACING
      top = isHeightOverFlow
        ? containerRect.top + offsetYWithArrow - SPACING
        : triggerRect.top + triggerRect.height + SPACING
      break
    case 'bottomRight':
      // left = pointAtCenter ? middleX + offsetXWithArrow : triggerRect.right;
      // top = triggerRect.bottom + SPACING;
      left = isWidthOverFlow
        ? containerRect.right + offsetWidth
        : pointAtCenter
          ? middleX + offsetXWithArrow + ANO_SPACING
          : triggerRect.right + ANO_SPACING
      top = isHeightOverFlow
        ? containerRect.top + offsetYWithArrow - SPACING
        : triggerRect.top + triggerRect.height + SPACING
      translateX = -1
      break
    case 'right':
      // left = triggerRect.right + SPACING;
      // top = middleY;
      left = isWidthOverFlow
        ? containerRect.left - SPACING + offsetXWithArrow
        : triggerRect.right + SPACING
      top = isHeightOverFlow
        ? isTriggerNearTop
          ? containerRect.top + wrapperRect.height / 2
          : containerRect.bottom - wrapperRect.height / 2 + offsetHeight
        : middleY + ANO_SPACING
      translateY = -0.5
      break
    case 'rightTop':
      // left = triggerRect.right + SPACING;
      // top = pointAtCenter ? middleY - offsetYWithArrow : triggerRect.top;
      left = isWidthOverFlow
        ? containerRect.left - SPACING + offsetXWithArrow
        : triggerRect.right + SPACING
      top = isHeightOverFlow
        ? containerRect.top
        : pointAtCenter
          ? middleY - offsetYWithArrow + ANO_SPACING
          : triggerRect.top + ANO_SPACING
      break
    case 'rightBottom':
      // left = triggerRect.right + SPACING;
      // top = pointAtCenter ? middleY + offsetYWithArrow : triggerRect.bottom;
      left = isWidthOverFlow
        ? containerRect.left - SPACING + offsetXWithArrow
        : triggerRect.right + SPACING
      top = isHeightOverFlow
        ? containerRect.bottom + offsetHeight
        : pointAtCenter
          ? middleY + offsetYWithArrow + ANO_SPACING
          : triggerRect.bottom + ANO_SPACING
      translateY = -1
      break
    case 'leftTopOver':
      left = triggerRect.left - SPACING
      top = triggerRect.top - SPACING
      break
    case 'rightTopOver':
      left = triggerRect.right + SPACING
      top = triggerRect.top - SPACING
      translateX = -1
      break
    case 'leftBottomOver':
      left = triggerRect.left - SPACING
      top = triggerRect.bottom + SPACING
      translateY = -1
      break
    case 'rightBottomOver':
      left = triggerRect.right + SPACING
      top = triggerRect.bottom + SPACING
      translateX = -1
      translateY = -1
      break
  }
  var transformOrigin = calcTransformOrigin(position, triggerRect, translateX, translateY, utils) // Transform origin
  var _containerIsBody = utils.containerIsBody()
  // Calculate container positioning relative to window
  left = left - containerRect.left
  top = top - containerRect.top
  /**
   * container为body时，如果position不为relative或absolute，这时trigger计算出的top/left会根据html定位（initial containing block）
   * 此时如果body有margin，则计算出的位置相对于body会有问题
   *
   * When container is body, if position is not relative or absolute, then the top/left calculated by trigger will be positioned according to html
   * At this time, if the body has a margin, the calculated position will have a problem relative to the body
   */
  if (_containerIsBody && !utils.containerIsRelativeOrAbsolute()) {
    var documentEleRect = utils.getDocumentElementBounding()
    // Represents the left of the body relative to html
    left += containerRect.left - documentEleRect.left
    // Represents the top of the body relative to html
    top += containerRect.top - documentEleRect.top
  }
  // ContainerRect.scrollLeft to solve the inner scrolling of the container
  left = _containerIsBody ? left : left + containerRect.scrollLeft
  top = _containerIsBody ? top : top + containerRect.scrollTop
  var triggerHeight = triggerRect.height
  if (
    utils.getProp('showArrow') &&
    !arrowPointAtCenter &&
    triggerHeight <= (verticalArrowHeight / 2 + arrowOffsetY) * 2
  ) {
    var offsetY = triggerHeight / 2 - (arrowOffsetY + verticalArrowHeight / 2)
    if ((position.includes('Top') || position.includes('Bottom')) && !position.includes('Over')) {
      top = position.includes('Top') ? top + offsetY : top - offsetY
    }
  }
  // The left/top value here must be rounded, otherwise it will cause the small triangle to shake
  var style = {
    left: _roundPixel(left),
    top: _roundPixel(top)
  }
  var transform = ''
  if (translateX != null) {
    transform += 'translateX('.concat(translateX * 100, '%) ')
    Object.defineProperty(style, 'translateX', {
      enumerable: false,
      value: translateX
    })
  }
  if (translateY != null) {
    transform += 'translateY('.concat(translateY * 100, '%) ')
    Object.defineProperty(style, 'translateY', {
      enumerable: false,
      value: translateY
    })
  }
  if (transformOrigin != null) {
    style.transformOrigin = transformOrigin
  }
  if (transform) {
    style.transform = transform
  }
  style._position = position
  return style
}
var defaultRect = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  x: 0,
  y: 0
}
var isEmpty = function (value) {
  return value == null || value === ''
}
var calcPosition = function (utils, triggerRect, wrapperRect, containerRect, shouldUpdatePos) {
  if (shouldUpdatePos === void 0) {
    shouldUpdatePos = false
  }
  triggerRect =
    (isEmpty(triggerRect) ? utils.getTriggerBounding() : triggerRect) || __assign({}, defaultRect)
  containerRect =
    (isEmpty(containerRect) ? utils.getPopupContainerRect() : containerRect) ||
    __assign({}, defaultRect)
  wrapperRect =
    (isEmpty(wrapperRect) ? utils.getWrapperBounding() : wrapperRect) || __assign({}, defaultRect)
  var position = utils.getProp('position')
  var spacing = utils.getProp('spacing')
  var style = calcPosStyle({
    triggerRect: triggerRect,
    wrapperRect: wrapperRect,
    containerRect: containerRect,
    position: position,
    spacing: spacing,
    utils: utils
  })
  if (utils.getProp('autoAdjustOverflow')) {
    // console.log('style: ', style, '\ntriggerRect: ', triggerRect, '\nwrapperRect: ', wrapperRect);
    var _a = adjustPosIfNeed(position, style, triggerRect, wrapperRect, containerRect, utils),
      adjustedPos = _a.position,
      isHeightOverFlow = _a.isHeightOverFlow,
      isWidthOverFlow = _a.isWidthOverFlow
    if (position !== adjustedPos || isHeightOverFlow || isWidthOverFlow) {
      position = adjustedPos
      style = calcPosStyle({
        triggerRect: triggerRect,
        wrapperRect: wrapperRect,
        containerRect: containerRect,
        position: position,
        isOverFlow: [isHeightOverFlow, isWidthOverFlow],
        utils: utils
      })
    }
  }
  if (shouldUpdatePos) {
    // utils.updatePlacementAttr(style.position);
    utils.setPosition(
      __assign(__assign({}, style), {
        position: position
      })
    )
  }
  return style
}

var CSSAnimation = defineComponent({
  name: 'CSSAnimation',
  props: {
    startClassName: String,
    endClassName: String,
    animationState: {
      type: String,
      default: 'enter'
    },
    onAnimationEnd: {
      type: Function,
      default: undefined
    },
    onAnimationStart: {
      type: Function,
      default: undefined
    },
    motion: {
      type: Boolean,
      default: true
    },
    replayKey: {
      type: String,
      default: ''
    },
    fillMode: {
      type: String,
      default: undefined
    }
  },
  setup: function (props, _a) {
    var slots = _a.slots
    // 响应式状态
    var currentClassName = ref(props.startClassName || '')
    var extraStyle = ref({
      animationFillMode: props.fillMode
    })
    var isAnimating = ref(true)
    // 动画开始处理函数
    var handleAnimationStart = function () {
      var _a
      ;(_a = props.onAnimationStart) === null || _a === void 0 ? void 0 : _a.call(props)
    }
    // 动画结束处理函数
    var handleAnimationEnd = function () {
      var _a
      currentClassName.value = props.endClassName || ''
      extraStyle.value = {
        animationFillMode: props.fillMode
      }
      isAnimating.value = false
      ;(_a = props.onAnimationEnd) === null || _a === void 0 ? void 0 : _a.call(props, false)
    }
    // 监听属性变化
    watch(
      function () {
        return [props.startClassName, props.replayKey, props.motion]
      },
      function () {
        var _a, _b
        currentClassName.value = props.startClassName || ''
        extraStyle.value = {
          animationFillMode: props.fillMode
        }
        isAnimating.value = true
        // 触发动画开始回调
        ;(_a = props.onAnimationStart) === null || _a === void 0 ? void 0 : _a.call(props)
        // 如果没有动画，立即结束
        if (!props.motion) {
          ;(_b = props.onAnimationEnd) === null || _b === void 0
            ? void 0
            : _b.call(props, isAnimating.value)
          isAnimating.value = false
        }
      }
    )
    // 组件挂载后处理
    onMounted(function () {
      var _a, _b
      // 触发动画开始回调
      ;(_a = props.onAnimationStart) === null || _a === void 0 ? void 0 : _a.call(props)
      // 如果没有动画，立即结束
      if (!props.motion) {
        ;(_b = props.onAnimationEnd) === null || _b === void 0 ? void 0 : _b.call(props, false)
        isAnimating.value = false
      }
    })
    return function () {
      var _a
      // 渲染插槽内容
      if (props.motion) {
        if (slots.default) {
          return slots.default({
            animationClassName: (_a = currentClassName.value) !== null && _a !== void 0 ? _a : '',
            animationStyle: extraStyle.value,
            animationEventsNeedBind: {
              onAnimationstart: handleAnimationStart,
              onAnimationend: handleAnimationEnd
            },
            isAnimating: isAnimating.value
          })
        }
      } else {
        if (slots.default) {
          return slots.default({
            animationClassName: '',
            animationStyle: {},
            animationEventsNeedBind: {},
            isAnimating: isAnimating.value
          })
        }
      }
      return null
    }
  }
})

var Tooltip = defineComponent({
  setup: function (props, ctx) {
    var innerRef = ref()
    var tooltipDefaultRef = ref()
    var triggerElementRef = ref()
    var slotRef = ref()
    var targetElementRect = ref()
    var wrapperClass = computed(function () {
      return [
        props.wrapper ? props.wrapper : ''.concat(prefix, '-tooltip-wrapper'),
        ''.concat(prefix, '-tooltip-') + props.position
      ]
    })
    var arrowClass = computed(function () {
      var _a
      var _position = (_a = innerStyle.value) === null || _a === void 0 ? void 0 : _a._position
      return [
        ''.concat(prefix, '-tooltip-arrow'),
        ''.concat(prefix, '-tooltip-') + (_position || props.position) + '-arrow'
      ]
    })
    var show = ref(false)
    var animationOptions = reactive({
      isAnimating: false,
      transitionState: 'enter'
    })
    watch(
      function () {
        return props.visible
      },
      function (res) {
        animationOptions.isAnimating = true
        animationOptions.transitionState = res ? 'enter' : 'leave'
      }
    )
    var showTooltip = computed(function () {
      var trigger = props.trigger,
        visible = props.visible
      if (animationOptions.isAnimating) return animationOptions.isAnimating
      if (trigger !== 'custom') {
        return show.value
      }
      return visible
    })
    var triggerHnadle = function () {
      animationOptions.isAnimating = true
      animationOptions.transitionState = 'enter'
      show.value = true
    }
    var triggerLeave = function () {
      animationOptions.isAnimating = true
      animationOptions.transitionState = 'leave'
      show.value = false
    }
    onMounted(function () {
      var target = tooltipDefaultRef.value.nextElementSibling
      triggerElementRef.value = target
      targetElementRect.value = target.getBoundingClientRect()
      onElementResize(triggerElementRef.value, function () {
        var position = calcPosition(options.utils)
        if (isNumber(position.top)) position.top = position.top + 'px'
        if (isNumber(position.left)) position.left = position.left + 'px'
        innerStyle.value = position
      })
      var eventMap = triggerEventMap[props.trigger]
      useEventListener(target, eventMap.enter, triggerHnadle)
      if (eventMap.enter === 'click' || eventMap.enter === 'custom') {
        var handleClickOutside = function (event) {
          if (showTooltip.value && innerRef.value) {
            if (!props.clickToHide && innerRef.value.contains(event.target)) return
          } else {
            return
          }
          if (eventMap.enter === 'custom') {
            ctx.emit('visibleChange', false)
          }
          triggerLeave()
          ctx.emit('clickOutSide', event)
        }
        useClickOutside(target, handleClickOutside)
      } else {
        var scope_1 = effectScope()
        useEventListener(target, eventMap.leave, function () {
          if (eventMap.leave === 'mouseleave') {
            scope_1.run(function () {
              var hoverInInner = false
              // 鼠标移出
              useEventListener(
                innerRef.value,
                'mouseenter',
                function () {
                  return (hoverInInner = true)
                },
                {
                  once: true
                }
              )
              useEventListener(
                innerRef.value,
                'mouseleave',
                function () {
                  hoverInInner = false
                  triggerLeave()
                },
                {
                  once: true
                }
              )
              useSetTimeout(function () {
                if (!hoverInInner) {
                  triggerLeave()
                }
              }, 100)
            })
          } else {
            triggerLeave()
          }
        })
      }
    })
    var options = {
      utils: {
        getTriggerBounding: function () {
          return triggerElementRef.value.getBoundingClientRect()
        },
        getPopupContainer: function () {
          return props.getPopupContainer(triggerElementRef.value)
        },
        getPopupContainerRect: function () {
          var container = this.getPopupContainer()
          var rect = null
          var boundingRect = container.getBoundingClientRect()
          rect = __assign(__assign({}, domRectToObject(boundingRect)), {
            scrollLeft: container.scrollLeft,
            scrollTop: container.scrollTop
          })
          return rect
        },
        getWrapperBounding: function () {
          var wrapper = innerRef.value
          if (wrapper) return wrapper.getBoundingClientRect()
          return null
        },
        getContainer: function () {
          var wrapper = innerRef.value
          return wrapper
        },
        setPosition: function (value) {
          console.log(value, 'setPosition')
        },
        getProp: function (name) {
          return props[name]
        },
        containerIsBody: function () {
          var container = this.getPopupContainer()
          return container === document.body
        },
        containerIsRelativeOrAbsolute: function () {
          var container = this.getPopupContainer()
          var computedStyle = window.getComputedStyle(container)
          var position = computedStyle.getPropertyValue('position')
          document.body.setAttribute('data-position', position)
          return ['relative', 'absolute'].includes(position)
        },
        getDocumentElementBounding: function () {
          return document.documentElement.getBoundingClientRect()
        },
        getProps: function () {
          return __assign(__assign({}, props), {
            arrowBounding: {
              offsetX: 0,
              offsetY: 2,
              width: 24,
              height: 7
            }
          })
        }
      }
    }
    var innerStyle = reactive({
      value: {}
    })
    watch(
      function () {
        return showTooltip.value
      },
      function (res) {
        console.log('res', res)
        if (res) {
          nextTick(function () {
            var position = calcPosition(options.utils)
            if (isNumber(position.top)) position.top = position.top + 'px'
            if (isNumber(position.left)) position.left = position.left + 'px'
            innerStyle.value = position
            console.log(position, 'position')
          })
        }
      }
    )
    var ContentWrapper = function () {
      if (isFunction(props.content)) {
        return props.content()
      }
      return createVNode(Fragment, null, [props.content])
    }
    var _defaultRender = function () {
      var _a, _b
      var children =
        (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
      if (children && children.length) {
        var newChildren_1 = []
        children.forEach(function (child) {
          // if child solt is Component
          console.log(child, 'kk')
          newChildren_1.push(
            isComponentByVNode(child)
              ? cloneVNode(child, {
                  ref: slotRef
                })
              : child
          )
        })
        children = newChildren_1
      }
      if (children && children.length > 1) {
        return createVNode('span', null, [children])
      }
      return createVNode(
        Fragment,
        {
          ref: tooltipDefaultRef
        },
        [children]
      )
      // return h(() => children, { ref: tooltipDefaultRef })
    }
    if (props.showArrow && props.clickToHide) _defaultRender() //todo slot为component下的trigger foucs
    var handleAnimationStart = function () {
      animationOptions.isAnimating = true
    }
    var handleAnimationEnd = function () {
      console.log('end')
      var transitionState = animationOptions.transitionState
      if (transitionState === 'leave') {
        // 触发动画结束事件 清理Portal
        show.value = false
      }
      animationOptions.isAnimating = false
    }
    var allAttrs = useAttrs()
    return function () {
      var _a, _b
      return createVNode(Fragment, null, [
        showTooltip.value &&
          createVNode(
            Portal,
            {
              getPopupContainer: props.getPopupContainer,
              targetElementRect: targetElementRect.value,
              autoAdjustOverflow: props.autoAdjustOverflow,
              triggerElementRef: triggerElementRef.value,
              innerStyle: innerStyle.value
            },
            {
              default: () => [
                createVNode(
                  CSSAnimation,
                  {
                    fillMode: 'forwards',
                    motion: props.motion,
                    animationState: animationOptions.transitionState,
                    startClassName:
                      animationOptions.transitionState === 'enter'
                        ? ''.concat(prefix, '-tooltip-animation-show')
                        : ''.concat(prefix, '-tooltip-animation-hide'),
                    onAnimationStart: handleAnimationStart,
                    onAnimationEnd: handleAnimationEnd
                  },
                  {
                    default: function (_a) {
                      var animationStyle = _a.animationStyle,
                        animationClassName = _a.animationClassName,
                        animationEventsNeedBind = _a.animationEventsNeedBind
                      return createVNode(
                        'div',
                        mergeProps(
                          {
                            style: __assign(__assign({}, animationStyle), {
                              transformOrigin: innerStyle.value.transformOrigin
                            }),
                            class: __spreadArray(
                              __spreadArray([], wrapperClass.value, true),
                              [animationClassName],
                              false
                            ),
                            ref: innerRef
                          },
                          animationEventsNeedBind,
                          allAttrs
                        ),
                        [
                          createVNode(
                            'div',
                            {
                              class: ''.concat(prefix, '-tooltip-content')
                            },
                            [createVNode(ContentWrapper, null, null)]
                          ),
                          props.showArrow &&
                            createVNode(
                              'svg',
                              {
                                class: arrowClass.value,
                                'aria-hidden': 'true',
                                width: '24',
                                height: '7',
                                viewBox: '0 0 24 7',
                                fill: 'currentColor',
                                xmlns: 'http://www.w3.org/2000/svg',
                                style: 'fill: currentcolor;'
                              },
                              [
                                createVNode(
                                  'path',
                                  {
                                    d: 'M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z'
                                  },
                                  null
                                )
                              ]
                            )
                        ]
                      )
                    }
                  }
                )
              ]
            }
          ),
        createVNode(
          Fragment,
          {
            ref: tooltipDefaultRef
          },
          [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
        )
      ])
    }
  },
  name: prefix + '-tooltip',
  props: tooltioProps,
  emits: tooltipEmits,
  inheritAttrs: false
})

var Popover = defineComponent({
  setup: function (props, ctx) {
    var allAttrs = useAttrs()
    var ContentWrapper = function () {
      if (isFunction(props.content)) {
        return createVNode(
          'div',
          mergeProps(
            {
              class: ''.concat(prefix, '-popover')
            },
            allAttrs
          ),
          [
            createVNode(
              'div',
              {
                class: ''.concat(prefix, '-popover-content')
              },
              [props.content()]
            )
          ]
        )
      }
      return createVNode(
        'div',
        mergeProps(
          {
            class: ''.concat(prefix, '-popover')
          },
          allAttrs
        ),
        [
          createVNode(
            'div',
            {
              class: ''.concat(prefix, '-popover-content')
            },
            [props.content]
          )
        ]
      )
    }
    var handleTooltipClickOutSide = function (e) {
      ctx.emit('clickOutSide', e)
    }
    var handleTooltipVisibleChange = function (visible) {
      ctx.emit('visibleChange', visible)
    }
    var wrapperClassNames = computed(function () {
      return [
        ''.concat(prefix, '-popover-wrapper'),
        props.showArrow ? ''.concat(prefix, '-popover-with-arrow') : ''
      ]
        .filter(Boolean)
        .join(' ')
    })
    return function () {
      var _a, _b
      return createVNode(
        Tooltip,
        mergeProps(props, {
          content: createVNode(ContentWrapper, null, null),
          wrapper: wrapperClassNames.value,
          clickToHide: props.clickToHide,
          onClickOutSide: handleTooltipClickOutSide,
          onVisibleChange: handleTooltipVisibleChange
        }),
        {
          default: () => [
            (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
          ]
        }
      )
    }
  },
  inheritAttrs: false,
  name: prefix + '-popover',
  props: popoverProps,
  emits: popoverEmits
})

var selectZIndex = 1030

var selectProps = {
  /**
   * 	@description 是否允许用户创建新条目，需配合 filter 使用。该项为true时不再响应 optionList的变更
   */
  allowCreate: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 自定义右侧下拉箭头 Icon，当 showClear 开关打开且当前有选中值时，hover 会优先显示 clear icon
   */
  arrowIcon: {
    type: [String, Object, Function, null],
    default: function () {
      return null
    },
    required: false
  },
  /**
   * 	@description 浮层被遮挡时是否自动调整方向
   */
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 选中选项后，是否自动清空搜索关键字，当 mutilple、filter 都开启时生效
   */
  autoClearSearchValue: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 初始渲染时是否自动 focus
   */
  autoFocus: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 无边框模式
   */
  borderless: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 可用于自定义清除按钮, showClear为true时有效
   */
  clearIcon: {
    type: [String, Object, Function, null],
    default: function () {
      return null
    },
    required: false
  },
  /**
   * @description 是否展示清除按钮
   */
  showClear: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否展示下拉箭头
   */
  showArrow: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 输入框类型
   */
  type: {
    values: ['text', 'password'],
    default: 'text',
    required: false
  },
  /**
   * @description 已展开时，点击选择框是否自动收起下拉列表
   */
  clickToHide: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 默认选中的选项
   */
  defaultValue: {
    type: [String, Number, Array],
    default: undefined,
    required: false
  },
  /**
   * @description 是否默认展开下拉列表
   */
  defaultOpen: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否默认高亮第一个选项（按回车可直接选中）
   */
  defaultActiveFirstOption: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 弹出层的 className
   */
  dropdownClassName: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 弹出层的样式
   */
  dropdownStyle: {
    type: Object,
    default: function () {
      return {}
    },
    required: false
  },
  /**
   * @description 下拉菜单最小宽度是否等于 Select
   */
  dropdownMatchSelectWidth: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 弹出层计算溢出时的增加的冗余值 同 Tooltip margin
   */
  dropdownMargin: {
    type: [Number, Object],
    default: 8,
    required: false
  },
  /**
   * @description 无结果时展示的内容。设为 null 时，下拉列表将不展示
   */
  emptyContent: {
    type: [String, Object, Function, null],
    default: function () {
      return null
    },
    required: false
  },
  /**
   * @description 当 maxTagCount 存在且为多选时，是否对溢出部分的 tag 做自适应处理(当宽度不足时，最后一个tag内容作截断处理)。开启该功能后会有一定性能损耗，不推荐在大表单场景下使用
   */
  ellipsisTrigger: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 当maxTagCount存在且为多选时，select 在面板打开状态下是否展开多余的 Tag
   */
  expandRestTagsOnClick: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否禁用
   */
  filter: {
    type: [Function],
    default: function () {
      return function (inputValue, option) {
        return option.label.toLowerCase().includes(inputValue.toLowerCase())
      }
    },
    required: false
  },
  /**
   * @description 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: [Function],
    default: function () {
      return function () {
        return document.body
      }
    },
    required: false
  },
  /**
   * @description filter 为 true 时, input 输入框的额外配置参数，具体可配置属性请参考 Input 组件（注意：请不要传入 value、ref、onChange、onFocus，否则会覆盖 Select 相关回调，影响组件行为）
   */
  inputProps: {
    type: Object,
    default: function () {
      return {}
    }
  },
  /**
   * @description 渲染在弹出层顶部，在 optionList 内部的自定义 slot
   */
  innerTopSlot: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 渲染在弹出层底部，在 optionList 内部的自定义 slot
   */
  innerBottomSlot: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 下拉列表是否展示加载动画
   */
  loading: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 多选模式下，已选项超出 maxTagCount 时，后续选项会被渲染成+N 的形式
   */
  maxTagCount: {
    type: Number,
    default: 0,
    required: false
  },
  /**
   * @description 最多可选几项，仅在多选模式下生效
   */
  max: {
    type: [Number, null],
    default: null,
    required: false
  },
  /**
   * @description 多选模式下，已选项超出 maxTagCount 时，是否通过 Popover 显示剩余内容
   */
  showRestTagsPopover: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 默认选中项
   */
  maxHeight: {
    type: Number,
    default: 270,
    required: false
  },
  /**
   * @description 多选
   */
  multiple: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 渲染在弹出层顶部，与 optionList 平级的自定义 slot
   */
  outerTopSlot: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 渲染在弹出层底部，与 optionList 平级的自定义 slot
   */
  outerBottomSlot: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 可以通过该属性传入 Option,请确保数组内每个元素都具备 label、value 属性
   */
  optionList: {
    type: [Array, undefined],
    default: undefined,
    required: false
  },
  /**
   * @description 选择框默认文字
   */
  placeholder: {
    type: [String, Object, Function, null],
    default: '',
    required: false
  },
  /**
   * @description 是否禁用
   */
  position: {
    values: positionValues,
    default: 'bottomLeft',
    required: false
  },
  /**
   * @description 选择框的前缀标签
   */
  prefix: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 选择框的后缀标签
   */
  suffix: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 指示浏览器是否应滚动文档以显示新聚焦的元素，作用于组件内的 focus 方法
   */
  preventScroll: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description allowCreate 为 true 时，可自定义创建标签的渲染。与虚拟化结合使用时，必须将第三个参数style传入自定义DOM中消费
   */
  renderCreateItem: {
    type: Function,
    default: null,
    required: false
  },
  /**
   * @description 通过 renderSelectedItem 自定义选择框中已选项标签的渲染
   */
  renderSelectedItem: {
    type: Function,
    default: null,
    required: false
  },
  /**
   * @description 通过 renderOptionItem 完全自定义下拉列表中候选项的渲染
   */
  renderOptionItem: {
    type: Function,
    default: null,
    required: false
  },
  /**
   * @description Popover 的配置属性
   */
  restTagsPopoverProps: {
    type: Object,
    default: function () {
      return {}
    },
    required: false
  },
  /**
   * @description 是否开启远程搜索，当 remote 为 true 时，input 内容改变后不会进行本地筛选匹配
   */
  remote: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description filter开启时，搜索框的位置，默认在 trigger中，可以通过设为 'dropdown' 将搜索框置于下拉列表顶部。搭配 triggerRender 使用可以实现更高自由度的交互
   */
  searchPosition: {
    values: ['trigger', 'dropdown'],
    default: 'trigger',
    required: false
  },
  /**
   * @description 大小
   */
  size: {
    values: ['small', 'default', 'large'],
    default: 'default',
    required: false
  },
  /**
   * @description 是否阻止浮层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 浮层与选择器的距离
   */
  spacing: {
    type: Number,
    default: 4,
    required: false
  },
  /**
   * @description 自定义触发器渲染
   */
  triggerRender: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 当前选中的的值
   */
  value: {
    type: [String, Number, Array],
    default: null,
    required: false
  },
  /**
   * @description 校验结果，可选warning、error、 default（只影响样式背景色）
   */
  validateStatus: {
    values: ['warning', 'error', 'default'],
    default: 'default',
    required: false
  },
  /**
   * @description 列表虚拟化，用于大量节点的情况优化性能表现，由 height, width, itemSize 组成
   */
  virtualize: {
    type: [Object, null],
    default: null,
    required: false
  },
  /**
   * @description 弹出框的 z-index
   */
  zIndex: {
    type: Number,
    default: selectZIndex,
    required: false
  },
  /**
   * @description 是否将选中项 option 的其他属性作为回调。设为 true 时，onChange 的入参类型会从 string 变为 object: { value, label, ...rest }
   */
  onChangeWithObject: {
    type: Boolean,
    default: false,
    required: false
  }
}
var selectEmits = {
  /**
   * @description 失去焦点时的回调
   */
  blur: function (e) {
    return void 0
  },
  /**
   * @description 获得焦点时的回调
   */
  focus: function (e) {
    return void 0
  },
  /**
   * @description 选项改变时的回调
   */
  change: function (value) {
    return void 0
  },
  /**
   * @description allowCreate 为 true，创建备选项时的回调
   */
  create: function (option) {
    return void 0
  },
  /**
   * @description 下拉菜单展开/收起时的回调
   */
  dropdownVisibleChange: function (visible) {
    return void 0
  },
  /**
   * @description 候选项列表滚动时的回调
   */
  listScroll: function (e) {
    return void 0
  },
  /**
   * @description input 输入框内容发生改变时回调函数
   */
  search: function (value, e) {
    return void 0
  },
  /**
   * @description 被选中时的回调
   */
  select: function (value, option) {
    return void 0
  },
  /**
   * @description 取消选中时的回调，仅在多选时有效
   */
  deselect: function (value, option) {
    return void 0
  },
  /**
   * @description 当试图选择数超出 max 限制时的回调
   */
  exceed: function (value) {
    return void 0
  }
}

var IconTick = defineComponent(function (props) {
  return function () {
    return createVNode(
      'svg',
      mergeProps(
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          focusable: 'false',
          'aria-hidden': 'true'
        },
        props
      ),
      [
        createVNode(
          'path',
          {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M21.35 4.27c.68.47.86 1.4.38 2.08l-10 14.5a1.5 1.5 0 0 1-2.33.17l-6.5-7a1.5 1.5 0 0 1 2.2-2.04l5.23 5.63 8.94-12.96a1.5 1.5 0 0 1 2.08-.38Z',
            fill: 'currentColor'
          },
          null
        )
      ]
    )
  }
})
var IconTick$1 = warpperIcon(IconTick, 'IconTick')

var SelectOption = defineComponent({
  setup: function (props, ctx) {
    var optionRef = ref()
    var optionClassName = computed(function () {
      var _a
      return [
        prefix + '-select-option',
        ((_a = {}),
        (_a[prefix + '-select-option-selected'] = props._selected),
        (_a[prefix + '-select-option-focused'] = props._focused),
        (_a[prefix + '-select-option-disabled'] = props.disabled),
        _a)
      ]
    })
    onMounted(function () {
      useEventListener(optionRef.value, 'mouseenter', function (e) {
        ctx.emit('focus_', e)
      })
    })
    var handleClickOption = function () {
      ctx.emit('click', __assign({}, props))
    }
    return function () {
      var _a, _b
      return createVNode(
        'div',
        mergeProps(
          {
            onClick: handleClickOption,
            class: optionClassName.value
          },
          ctx.attrs,
          {
            ref: optionRef
          }
        ),
        [
          createVNode(
            'div',
            {
              class: prefix + '-select-option-prefix'
            },
            [props._selected && createVNode(IconTick$1, null, null)]
          ),
          createVNode(
            'div',
            {
              class: prefix + '-select-option-text'
            },
            [
              props.label
                ? props.label
                : (_b = (_a = ctx.slots).default) === null || _b === void 0
                  ? void 0
                  : _b.call(_a)
            ]
          )
        ]
      )
    }
  },
  name: prefix + '-select-option',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    _focused: {
      type: Boolean,
      default: false,
      required: false
    },
    _selected: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: ['click', 'focus_']
})

var SelectOptionGroup = defineComponent({
  setup: function (props, ctx) {
    return function () {
      var _a, _b
      return createVNode(Fragment, null, [
        createVNode(
          'div',
          {
            class: prefix + '-select-option-group'
          },
          [props.label]
        ),
        (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
      ])
    }
  },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  name: prefix + '-select-option-group'
})

var tagProps = {
  avatarShape: {
    type: String,
    default: 'square',
    required: false
  },
  avatarSrc: {
    type: String,
    default: '',
    required: false
  },
  type: {
    type: String,
    default: 'light',
    required: false
  },
  closable: {
    type: Boolean,
    default: false,
    required: false
  },
  color: {
    type: String,
    default: 'grey',
    required: false
  },
  prefixIcon: {
    type: [String, Function],
    default: '',
    required: false
  },
  suffixIcon: {
    type: [String, Function],
    default: '',
    required: false
  },
  shape: {
    type: String,
    values: ['circle', 'square'],
    default: 'square',
    required: false
  },
  size: {
    type: String,
    values: ['small', 'large'],
    default: 'small',
    required: false
  },
  visible: {
    type: Boolean,
    default: true,
    required: false
  },
  tagKey: {
    type: [String, Number],
    default: '',
    required: false
  },
  children: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  }
}
var tagGroupProps = {
  avatarShape: {
    type: String,
    default: 'square',
    required: false
  },
  maxTagCount: {
    type: Number,
    default: undefined,
    required: false
  },
  showPopover: {
    type: Boolean,
    default: false,
    required: false
  },
  popoverProps: {
    type: Object,
    default: function () {
      return {}
    },
    required: false
  },
  size: {
    type: String,
    values: ['small', 'large'],
    default: 'small',
    required: false
  },
  tagList: {
    type: Array,
    default: function () {
      return []
    },
    required: false
  }
}
var tagGroupEmits = {
  tagClose: function (tagChildren, evt, tagKey) {
    return true
  }
}
var tagEmits = {
  close: function (evt) {
    return evt instanceof MouseEvent
  },
  click: function (evt) {
    return evt instanceof MouseEvent
  }
}

var avatarProps = {
  /**
   * @description 图像的替代文本描述
   */
  alt: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 头像的src
   */
  src: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 设置图片类头像响应式资源地址
   */
  srcSet: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 原生 img 属性
   */
  imgAttr: {
    type: Object,
    default: function () {
      return {}
    },
    required: false
  },
  /**
   * @description 额外边框
   */
  border: {
    type: [Object, Boolean],
    default: false,
    required: false
  },
  /**
   * @description 顶部 Slot 配置
   */
  topSlot: {
    type: Object,
    default: undefined,
    required: false
  },
  /**
   * @description 底部 Slot 配置
   */
  bottomSlot: {
    type: Object,
    default: undefined,
    required: false
  },
  /**
   * @description 指定头像的颜色
   */
  color: {
    type: String,
    default: 'green',
    required: false
  },
  /**
   * @description 头像内容区域动效
   */
  contentMotion: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description hover 时头像内容覆盖层
   */
  hoverMask: {
    type: [String, Object, Function, null],
    default: function () {},
    required: false
  },
  /**
   * @description 字符头像距离左右两侧的像素大小
   */
  gap: {
    type: Number,
    default: 3,
    required: false
  },
  /**
   * @description 指定头像的形状，支持 circle、square
   */
  shape: {
    type: String,
    default: 'circle',
    required: false
  },
  /**
   * @description 设置头像的大小，支持 extra-extra-small、extra-small、small、default、medium、large、extra-large 和 合法的 width 属性值例如 "10px"
   */
  size: {
    type: [String, Number],
    default: 'medium',
    required: false
  }
}
var avatarEmits = {
  /**
   * @description 点击回调函数
   */
  click: function (e) {
    return void 0
  },
  /**
   * @description 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为
   */
  error: function (e) {
    return isBoolean(e)
  },
  /**
   * @description MouseEnter 事件的回调
   */
  mouseEnter: function (e) {
    return void 0
  },
  /**
   * @description MouseLeave 事件的回调
   */
  MouseLeave: function (e) {
    return void 0
  }
}
/**
 * @description 头像group组件的属性
 */
var groupProps = {
  /**
   * @description 最大数量限制，超出后显示+N
   */
  maxCount: {
    type: Number,
    default: 20,
    required: false
  },
  /**
   * @description 设置头像覆盖方向，支持 start, end
   */
  overlapFrom: {
    type: String,
    default: 'start',
    required: false
  },
  /**
   * @description 自定义渲染 more 标签
   */
  renderMore: {
    type: [String, Object, Function, null],
    default: function () {},
    required: false
  },
  /**
   * @description 指定头像的形状，支持circle、square
   */
  shape: {
    type: String,
    default: 'circle',
    required: false
  },
  /**
   * @description 设置头像的大小，支持 extra-extra-small、extra-small、small、default、medium、large、extra-large 和 合法的 width 属性值例如 "10" 单位px
   */
  size: {
    type: [String, Number],
    default: 'medium',
    required: false
  },
  /**
   * @description 是否支持展开
   */
  spread: {
    type: Boolean,
    default: true,
    required: false
  }
}

function TopSlotIcon(props) {
  var gradientStart = props.gradientStart,
    gradientEnd = props.gradientEnd
  return createVNode(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '51',
      height: '52',
      viewBox: '0 0 51 52',
      fill: 'none'
    },
    [
      createVNode(
        'g',
        {
          filter: 'url(#filter0_d_6_2)'
        },
        [
          createVNode(
            'path',
            {
              d: 'M40.4918 46.5592C44.6795 43.176 46.261 34.1333 47.5301 25.6141C49.5854 11.8168 39.6662 1 25.8097 1C11.2857 1 3 11.4279 3 25.3518C3 33.7866 6.29361 43.8947 10.4602 46.5592C12.5868 47.9192 12.5868 47.9051 25.8097 47.9192C38.3651 47.9282 38.5352 48.14 40.4918 46.5592Z',
              fill: 'url(#ucam3eu)'
            },
            null
          )
        ]
      ),
      createVNode('defs', null, [
        createVNode(
          'filter',
          {
            id: 'filter0_d_6_2',
            x: '0.789215',
            y: '0.447304',
            width: '49.2216',
            height: '51.3549',
            filterUnits: 'userSpaceOnUse',
            'color-interpolation-filters': 'sRGB'
          },
          [
            createVNode(
              'feFlood',
              {
                'flood-opacity': '0',
                result: 'BackgroundImageFix'
              },
              null
            ),
            createVNode(
              'feColorMatrix',
              {
                in: 'SourceAlpha',
                type: 'matrix',
                values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0',
                result: 'hardAlpha'
              },
              null
            ),
            createVNode(
              'feOffset',
              {
                dy: '1.65809'
              },
              null
            ),
            createVNode(
              'feGaussianBlur',
              {
                stdDeviation: '1.10539'
              },
              null
            ),
            createVNode(
              'feColorMatrix',
              {
                type: 'matrix',
                values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0'
              },
              null
            ),
            createVNode(
              'feBlend',
              {
                mode: 'normal',
                in2: 'BackgroundImageFix',
                result: 'effect1_dropShadow_6_2'
              },
              null
            ),
            createVNode(
              'feBlend',
              {
                mode: 'normal',
                in: 'SourceGraphic',
                in2: 'effect1_dropShadow_6_2',
                result: 'shape'
              },
              null
            )
          ]
        ),
        createVNode(
          'linearGradient',
          {
            id: 'ucam3eu',
            x1: '17.671',
            y1: '31.7392',
            x2: '17.671',
            y2: '47.9333',
            gradientUnits: 'userSpaceOnUse'
          },
          [
            createVNode(
              'stop',
              {
                'stop-color': gradientStart
              },
              null
            ),
            createVNode(
              'stop',
              {
                offset: '1',
                'stop-color': gradientEnd
              },
              null
            )
          ]
        )
      ])
    ]
  )
}

var marginBorder = 7
var baseBorderZIndex = 1

var Avatar$1 = defineComponent({
  setup: function (props, ctx) {
    var avatarData = reactive({
      showHoverMask: false
    })
    var container = ref()
    var baseClass = computed(function () {
      var _a, _b
      return [
        ''.concat(prefix, '-avatar'),
        ''.concat(prefix, '-avatar-').concat(props.shape),
        ((_a = {}),
        (_a[''.concat(prefix, '-avatar-').concat(props.size)] = isString(props.size)),
        _a),
        props.src
          ? ''.concat(prefix, '-avatar-img')
          : ''.concat(prefix, '-avatar-').concat(props.color),
        ((_b = {}), (_b[''.concat(prefix, '-avatar-animated')] = props.contentMotion), _b)
      ]
    })
    var computedScale = computed(function () {
      var _a
      var gap = props.gap
      var containerEl = container.value
      var stringEl =
        (_a = container.value) === null || _a === void 0 ? void 0 : _a.firstElementChild
      if (stringEl && containerEl && gap) {
        var _b = [
            (containerEl === null || containerEl === void 0 ? void 0 : containerEl.offsetWidth) ||
              0,
            (stringEl === null || stringEl === void 0 ? void 0 : stringEl.offsetWidth) || 0
          ],
          nodeWidth = _b[0],
          stringNodeWidth = _b[1]
        if (nodeWidth !== 0 && stringNodeWidth !== 0 && gap * 2 < nodeWidth) {
          var scale =
            nodeWidth - gap * 2 > stringNodeWidth ? 1 : (nodeWidth - gap * 2) / stringNodeWidth
          return {
            transform: 'scale('.concat(scale, ')')
          }
        }
      }
      return {}
    })
    var handleClick = function (e) {
      var _a
      ;(_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e)
    }
    var handleMouseEnter = function (e) {
      var _a
      if (props.hoverMask) {
        avatarData.showHoverMask = true
      }
      ;(_a = props.onMouseEnter) === null || _a === void 0 ? void 0 : _a.call(props, e)
    }
    var handleMouseLeave = function (e) {
      var _a
      if (props.hoverMask) {
        avatarData.showHoverMask = false
      }
      ;(_a = props.onMouseLeave) === null || _a === void 0 ? void 0 : _a.call(props, e)
    }
    var showHoverMaskComputed = computed(function () {
      if (props.hoverMask) {
        return avatarData.showHoverMask
      }
      return false
    })
    var vm = getCurrentInstance()
    return function () {
      var _a, _b, _c
      var hoverMaskRender = function () {
        if (props.hoverMask) {
          if (isFunction(props.hoverMask)) {
            return props.hoverMask()
          }
          return props.hoverMask
        }
        return null
      }
      var content = createVNode(Fragment, null, [
        createVNode(
          'span',
          {
            class: ''.concat(prefix, '-avatar-content'),
            style: computedScale.value
          },
          [
            createVNode(
              'span',
              {
                class: ''.concat(prefix, '-avatar-label')
              },
              [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
            )
          ]
        ),
        showHoverMaskComputed.value &&
          createVNode(
            'span',
            {
              class: ''.concat(prefix, '-avatar-hover')
            },
            [hoverMaskRender()]
          )
      ])
      if (props.src) {
        content = createVNode(Fragment, null, [
          createVNode(
            'img',
            mergeProps(
              {
                class: ''.concat(prefix, '-avatar-img'),
                src: props.src,
                alt: props.alt
              },
              props.imgAttr,
              {
                style: computedScale.value
              }
            ),
            null
          ),
          showHoverMaskComputed.value &&
            createVNode(
              'span',
              {
                class: ''.concat(prefix, '-avatar-hover')
              },
              [hoverMaskRender()]
            )
        ])
      }
      var showWrapper = props.border || props.topSlot || props.bottomSlot
      var baseAttrs = showWrapper ? {} : ctx.attrs
      var handlerAttrs = showWrapper
        ? {}
        : {
            onClick: handleClick,
            onMouseenter: handleMouseEnter,
            onMouseleave: handleMouseLeave
          }
      var baseStyle = {}
      if (isNumber(props.size)) {
        baseStyle.width = ''.concat(props.size, 'px')
        baseStyle.height = ''.concat(props.size, 'px')
      }
      if (props.border && !hasPropsOrSlots('topSlot', vm)) {
        baseStyle.position = 'relative'
        baseStyle.zIndex = baseBorderZIndex
      }
      var avatarBase = createVNode(
        'span',
        mergeProps(
          {
            class: baseClass.value,
            style: baseStyle
          },
          baseAttrs,
          {
            ref: container
          },
          handlerAttrs
        ),
        [content]
      )
      if (showWrapper) {
        var style = {
          position: 'relative',
          margin: 'inherit'
        }
        var borderColor = (_c = props.border) === null || _c === void 0 ? void 0 : _c.color
        var getBorderClass = function () {
          return [
            ''.concat(prefix, '-avatar-border'),
            isString(props.size) ? ''.concat(prefix, '-avatar-border-').concat(props.size) : '',
            ''.concat(prefix, '-avatar-').concat(props.shape)
          ]
        }
        var mergnStyle = {
          style: borderColor
            ? {
                borderColor: borderColor
              }
            : undefined,
          class: getBorderClass()
        }
        if (isNumber(props.size)) {
          if (mergnStyle.style) {
            mergnStyle.style.width = ''.concat(props.size + marginBorder, 'px')
            mergnStyle.style.height = ''.concat(props.size + marginBorder, 'px')
          }
        }
        var renderTopSlot = function () {
          var _a, _b
          var _c, _d
          var topSlot = props.topSlot
          if (!topSlot) return null
          if (topSlot === null || topSlot === void 0 ? void 0 : topSlot.render)
            return renderVnode(topSlot.render)
          var optionStyle = {}
          if (topSlot.textColor) optionStyle.color = topSlot.textColor
          var slotWrapperClass = [
            ''.concat(prefix, '-avatar-top-slot'),
            ((_a = {}), (_a[topSlot.className] = Boolean(topSlot.className)), _a),
            ((_b = {}), (_b[''.concat(prefix, '-avatar-animated')] = props.contentMotion), _b)
          ]
          var slotWrapperStyle = topSlot.style
          var bgClass = [
            ''.concat(prefix, '-avatar-top-slot-bg'),
            ''.concat(prefix, '-avatar-top-slot-bg-').concat(props.size)
          ]
          var bgSvgClass = [
            ''.concat(prefix, '-avatar-top-slot-bg-svg'),
            ''.concat(prefix, '-avatar-top-slot-bg-svg-').concat(props.size)
          ]
          var gradientStart =
            (_c = topSlot.gradientStart) !== null && _c !== void 0
              ? _c
              : 'var(--'.concat(prefix, '-color-primary)')
          var gradientEnd =
            (_d = topSlot.gradientEnd) !== null && _d !== void 0
              ? _d
              : 'var(--'.concat(prefix, '-color-primary)')
          var exclusion = ['extra-extra-small', 'extra-small']
          var contentClass = [
            ''.concat(prefix, '-avatar-top-slot-content'),
            ''.concat(prefix, '-avatar-top-slot-content-').concat(props.size)
          ]
          return createVNode(
            'div',
            {
              class: slotWrapperClass,
              style: slotWrapperStyle
            },
            [
              !exclusion.includes(props.size) &&
                createVNode(
                  'div',
                  {
                    class: bgClass
                  },
                  [
                    createVNode(
                      'div',
                      {
                        class: bgSvgClass
                      },
                      [
                        createVNode(
                          TopSlotIcon,
                          {
                            gradientStart: gradientStart,
                            gradientEnd: gradientEnd
                          },
                          null
                        )
                      ]
                    )
                  ]
                ),
              createVNode(
                'div',
                {
                  style: optionStyle,
                  class: ''.concat(prefix, '-avatar-top-slot-content-wrapper')
                },
                [
                  createVNode(
                    'span',
                    {
                      class: contentClass
                    },
                    [renderVnode(topSlot.text)]
                  )
                ]
              )
            ]
          )
        }
        var renderBottomSlot = function () {
          var _a
          var _b
          var bottomSlot = props.bottomSlot
          if (!bottomSlot) return null
          if (bottomSlot === null || bottomSlot === void 0 ? void 0 : bottomSlot.render)
            return renderVnode(bottomSlot.render)
          var optionStyle = {}
          if (bottomSlot.bgColor) optionStyle.backgroundColor = bottomSlot.bgColor
          if (bottomSlot.textColor) optionStyle.color = bottomSlot.textColor
          var optionClass = [
            ''
              .concat(prefix, '-avatar-bottom-slot-shape-')
              .concat((_b = bottomSlot.shape) !== null && _b !== void 0 ? _b : props.shape),
            ''.concat(prefix, '-avatar-bottom-slot-shape-circle-').concat(props.size)
          ]
          var slotWrapperClass = [
            ''.concat(prefix, '-avatar-bottom-slot'),
            ((_a = {}), (_a[bottomSlot.className] = Boolean(bottomSlot.className)), _a)
          ]
          var slotWrapperStyle = bottomSlot.style
          return createVNode(
            'div',
            {
              class: slotWrapperClass,
              style: slotWrapperStyle
            },
            [
              createVNode(
                'span',
                {
                  style: optionStyle,
                  class: optionClass
                },
                [renderVnode(bottomSlot.text)]
              )
            ]
          )
        }
        var showSopSlot = props.topSlot && isString(props.size)
        var showBottomSlot = props.bottomSlot && isString(props.size)
        return createVNode(
          'div',
          mergeProps(
            {
              class: ''.concat(prefix, '-avatar-wrapper')
            },
            ctx.attrs,
            {
              onClick: handleClick,
              onMouseenter: handleMouseEnter,
              onMouseleave: handleMouseLeave
            }
          ),
          [
            createVNode(
              'div',
              {
                style: style
              },
              [
                avatarBase,
                props.border && createVNode('span', mergnStyle, null),
                props.border &&
                  Boolean(props.border.motion) &&
                  createVNode(
                    'span',
                    mergeProps(mergnStyle, {
                      class: ''.concat(prefix, '-avatar-border-animated')
                    }),
                    null
                  )
              ]
            ),
            showSopSlot && renderTopSlot(),
            showBottomSlot && renderBottomSlot()
          ]
        )
      }
      return avatarBase
    }
  },
  name: prefix + '-avatar',
  props: avatarProps,
  emits: avatarEmits
})

var AvatarGroup = defineComponent({
  setup: function (props, ctx) {
    var avatarGroupRef = ref()
    var showHover = ref(false)
    var vm = getCurrentInstance()
    if (props.spread) {
      useEventListener(avatarGroupRef, 'mouseenter', function () {
        showHover.value = true
      })
      useEventListener(avatarGroupRef, 'mouseleave', function () {
        return (showHover.value = false)
      })
    }
    var defaultRenderSlot = function () {
      var _a, _b, _c
      var vnodes =
        ((_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)) || []
      var childrenName = Avatar$1.name
      var maxZIndex = Math.max(props.maxCount + 1, 100)
      var showWraning = false
      var visibleNodes = vnodes.length >= props.maxCount ? vnodes.slice(0, props.maxCount) : vnodes
      var avatarNodes =
        visibleNodes === null || visibleNodes === void 0
          ? void 0
          : visibleNodes.map(function (item) {
              if (!isObject(item) || item.type.name !== childrenName) {
                showWraning = true
                return null
              } else {
                var avatarStyle = {
                  zIndex: maxZIndex--
                }
                return h(
                  Avatar$1,
                  __assign(__assign({}, item.props), {
                    shape: props.shape,
                    size: props.size,
                    style: avatarStyle
                  }),
                  __assign({}, item.children)
                )
              }
            })
      if (showWraning) consolaWrapper.warn('AvatarGroup only accepts Avatar as children.')
      if (props.overlapFrom === 'end') {
        return (_c = __spreadArray([], avatarNodes, true)) === null || _c === void 0
          ? void 0
          : _c.reverse()
      }
      if ((vnodes === null || vnodes === void 0 ? void 0 : vnodes.length) > props.maxCount) {
        var renderMoreSlot = null
        if (hasPropsOrSlots('renderMore', vm)) {
          renderMoreSlot = renderElementForPropsOrSlot('renderMore', vm)
        } else {
          renderMoreSlot = h(
            Avatar$1,
            {
              color: 'grey',
              shape: props.shape,
              size: props.size,
              style: {
                zIndex: maxZIndex--
              }
            },
            {
              default: function () {
                return '+' + (vnodes.length - props.maxCount)
              }
            }
          )
        }
        return __spreadArray(
          __spreadArray([], avatarNodes.slice(0, props.maxCount), true),
          [renderMoreSlot],
          false
        )
      }
      return avatarNodes
    }
    var classNames = computed(function () {
      var _a
      return [
        prefix + '-avatar-group',
        ((_a = {}), (_a[prefix + '-avatar-group-hover'] = showHover.value), _a)
      ]
    })
    return function () {
      return createVNode(
        'div',
        {
          class: classNames.value,
          ref: avatarGroupRef
        },
        [defaultRenderSlot()]
      )
    }
  },
  name: prefix + '-avatar-group',
  props: groupProps
})

var Avatar = Avatar$1
Avatar.AvatarGroup = AvatarGroup

var Tag = defineComponent({
  setup: function (props, _a) {
    var emit = _a.emit,
      slots = _a.slots
    var instance = getCurrentInstance()
    // 计算类名
    var classes = computed(function () {
      return [
        ''.concat(prefix, '-tag'),
        props.color ? ''.concat(prefix, '-tag-').concat(props.color, '-').concat(props.type) : '',
        ''.concat(prefix, '-tag-').concat(props.size),
        ''.concat(prefix, '-tag-').concat(props.shape),
        ''.concat(prefix, '-tag-').concat(props.type),
        !props.visible ? ''.concat(prefix, '-tag-visible') : ''
      ]
    })
    // 关闭事件
    var handleClose = function (e) {
      e.stopPropagation()
      emit('close', e)
    }
    // 点击事件
    var handleClick = function (e) {
      emit('click', e)
    }
    return function () {
      return createVNode(
        'div',
        {
          class: classes.value,
          onClick: handleClick
        },
        [
          renderElementForPropsOrSlot('prefixIcon', instance) ||
            (props.prefixIcon &&
              (props.prefixIcon instanceof Function ? props.prefixIcon() : props.prefixIcon)),
          props.avatarSrc &&
            createVNode(
              Avatar,
              {
                size: 'extra-small',
                shape: props.avatarShape,
                src: props.avatarSrc
              },
              null
            ),
          slots.default ? slots.default() : 'Tag',
          renderElementForPropsOrSlot('suffixIcon', instance) ||
            (props.suffixIcon &&
              (props.suffixIcon instanceof Function ? props.suffixIcon() : props.suffixIcon)),
          props.closable &&
            createVNode(
              'div',
              {
                class: ''.concat(prefix, '-tag-close'),
                onClick: handleClose
              },
              [createVNode(IconClear$1, null, null)]
            )
        ]
      )
    }
  },
  name: prefix + '-tag',
  props: tagProps,
  emits: tagEmits
})

function _isSlot(s) {
  return (
    typeof s === 'function' ||
    (Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s))
  )
}
var TagGroup = defineComponent({
  setup: function (props, _a) {
    var emit = _a.emit
    _a.slots
    // 计算类名
    var classes = computed(function () {
      return [
        ''.concat(prefix, '-tag-group'),
        ''.concat(prefix, '-tag-group-').concat(props.size),
        props.maxTagCount ? ''.concat(prefix, '-tag-group-max') : ''
      ]
    })
    //关闭事件
    var handleTagClose = function (tagChildren, evt, tagKey) {
      emit('tagClose', tagChildren, evt, tagKey)
    }
    return function () {
      let _slot
      return createVNode(
        'div',
        {
          class: classes.value
        },
        [
          props.tagList
            .slice(0, props.maxTagCount || props.tagList.length)
            .map(function (tagItem, index) {
              return createVNode(
                Tag,
                mergeProps(tagItem, {
                  key: tagItem.tagKey || index,
                  size: tagItem.size || props.size,
                  avatarShape: tagItem.avatarShape || props.avatarShape,
                  onClose: function (e) {
                    return handleTagClose(tagItem, e, tagItem.tagKey)
                  }
                }),
                {
                  default: () => [tagItem.children]
                }
              )
            }),
          props.tagList.length > (props.maxTagCount || props.tagList.length) &&
            createVNode(
              Popover,
              mergeProps(props.popoverProps, {
                visible: props.showPopover,
                showArrow: true,
                class: ''.concat(prefix, '-tag-rest-group-popover'),
                content: createVNode(
                  'div',
                  {
                    class: ''.concat(prefix, '-tag-rest-group-popover-content')
                  },
                  [
                    props.tagList
                      .slice(props.maxTagCount || props.tagList.length)
                      .map(function (tagItem, index) {
                        return createVNode(
                          Tag,
                          mergeProps(tagItem, {
                            key: tagItem.tagKey || index,
                            size: tagItem.size || props.size,
                            avatarShape: tagItem.avatarShape || props.avatarShape,
                            onClose: function (e) {
                              return handleTagClose(tagItem, e, tagItem.tagKey)
                            }
                          }),
                          {
                            default: () => [tagItem.children]
                          }
                        )
                      })
                  ]
                )
              }),
              {
                default: () => [
                  createVNode(
                    Tag,
                    {
                      size: props.size,
                      closable: false,
                      type: 'light',
                      style: {
                        backgroundColor: 'transparent'
                      }
                    },
                    _isSlot(
                      (_slot = '+'.concat(
                        props.tagList.length - (props.maxTagCount || props.tagList.length)
                      ))
                    )
                      ? _slot
                      : {
                          default: () => [_slot]
                        }
                  )
                ]
              }
            )
        ]
      )
    }
  },
  name: prefix + '-tag-group',
  props: tagGroupProps,
  emits: tagGroupEmits
})

var Select = defineComponent({
  setup: function (props, ctx) {
    var _a
    var state = reactive({
      visible: false,
      selfValue: props.value || props.defaultValue ? [] : [],
      triggerRect: undefined,
      options: (_a = props.optionList) !== null && _a !== void 0 ? _a : [],
      focusIndex: -1,
      selectIndex: props.multiple ? [] : -1
    })
    var triggerRef = ref()
    onMounted(function () {
      var _a
      var triggerRect =
        (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()
      state.triggerRect = triggerRect
    })
    var dropdownWrapperMinWidth = computed(function () {
      var minWidth = 74
      var margin = 0
      if (state.triggerRect) {
        minWidth = Math.max(minWidth, state.triggerRect.width + margin)
      }
      return minWidth + 'px'
    })
    var wrapperClass = computed(function () {
      var _a
      return [
        ''.concat(prefix, '-select'),
        ((_a = {}),
        (_a[''.concat(prefix, '-select-disabled')] = props.disabled),
        (_a[''.concat(prefix, '-select-multiple')] = props.multiple),
        (_a[''.concat(prefix, '-select-open')] = state.visible),
        (_a[''.concat(prefix, '-select-focus')] = state.visible),
        _a)
      ]
    })
    var handleClosePopover = function () {
      state.visible = false
    }
    var handleOpenPopover = function () {
      state.visible = true
    }
    watch(
      function () {
        return state.visible
      },
      function (val) {
        ctx.emit('dropdownVisibleChange', val)
      }
    )
    // 导出的实例方法
    var refMethods = {
      close: function () {
        handleClosePopover()
      },
      open: function () {
        handleOpenPopover()
      },
      focus: function () {
        console.log('focus')
      },
      clearInput: function () {
        console.log('clearInput')
      },
      deselectAll: function () {
        console.log('deselectAll')
      },
      selectAll: function () {
        console.log('selectAll')
      },
      search: function (value, event) {
        console.log('search', event)
      }
    }
    ctx.expose(refMethods)
    var popoverProps = computed(function () {
      return __assign(__assign({}, props.restTagsPopoverProps), {
        position: props.position,
        getPopupContainer: props.getPopupContainer,
        zIndex: props.zIndex,
        autoAdjustOverflow: props.autoAdjustOverflow
      })
    })
    var handleVisibleChange = function (visible) {
      state.visible = visible
    }
    var handleClickOption = function (current, index) {
      if (props.multiple && isArray(state.selectIndex) && isArray(state.selfValue)) {
        var oldIndex = state.selectIndex.findIndex(function (item) {
          return item == index
        })
        if (oldIndex >= 0) {
          state.selectIndex.splice(oldIndex, 1)
          state.selfValue = state.selfValue.filter(function (item) {
            return item.value !== current.value
          })
        } else {
          state.selectIndex.push(index)
          state.selfValue.push(current)
        }
      }
    }
    var handleFocusOption = function (index) {
      state.focusIndex = index
    }
    var renderPopoverContent1 = function () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l
      var dropdownStyle = props.dropdownStyle,
        dropdownClassName = props.dropdownClassName,
        optionList = props.optionList
      var style = __assign(__assign({}, dropdownStyle), {
        minWidth: dropdownWrapperMinWidth.value
      })
      var children = []
      var getSelected = function (option) {
        if (props.multiple && isArray(state.selfValue)) {
          return !!state.selfValue.find(function (item) {
            return option.value === item.value
          })
        }
        return state.selfValue == option.value
      }
      if (optionList === null || optionList === void 0 ? void 0 : optionList.length) {
        children = optionList.map(function (child, index) {
          return h(
            SelectOption,
            __assign(__assign({}, child), {
              _focused: state.focusIndex === index,
              _selected: getSelected(child),
              onClick: function () {
                return handleClickOption(child, index)
              },
              onFocus_: function () {
                return handleFocusOption(index)
              }
            })
          )
        })
      } else {
        var items = (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
        if (items === null || items === void 0 ? void 0 : items.length) {
          var template = []
          var childIndex = 0
          var _loop_1 = function (child) {
            var type = child.type
            if (
              isObject(child.type) &&
              [SelectOptionGroup.name, SelectOption.name].includes(type.name)
            ) {
              if ([SelectOptionGroup.name].includes(type.name)) {
                // hander group
                var optionChilds = child.children.default() || []
                template.push(
                  h(child, {
                    label: (_c = child.props) === null || _c === void 0 ? void 0 : _c.label
                  })
                )
                var _loop_2 = function (optionChild) {
                  var currentIndex = childIndex
                  var label =
                    ((_d = optionChild.props) === null || _d === void 0 ? void 0 : _d.label) ||
                    ((_g =
                      (_f =
                        (_e = child.children) === null || _e === void 0 ? void 0 : _e.default()) ===
                        null || _f === void 0
                        ? void 0
                        : _f[0]) === null || _g === void 0
                      ? void 0
                      : _g.children)
                  var optionParams = __assign(__assign({}, optionChild.props), {
                    label: label
                  })
                  template.push(
                    h(
                      optionChild,
                      __assign(__assign({}, optionChild.props), {
                        onClick: function () {
                          return handleClickOption(optionParams, currentIndex)
                        },
                        onFocus_: function () {
                          return handleFocusOption(currentIndex)
                        },
                        _focused: state.focusIndex === currentIndex,
                        _selected: getSelected(optionParams)
                      }),
                      {
                        default: function () {
                          return label
                        }
                      }
                    )
                  )
                  childIndex += 1
                }
                for (var _m = 0, optionChilds_1 = optionChilds; _m < optionChilds_1.length; _m++) {
                  var optionChild = optionChilds_1[_m]
                  _loop_2(optionChild)
                }
              } else {
                var currentIndex_1 = childIndex
                var label_1 =
                  ((_h = child.props) === null || _h === void 0 ? void 0 : _h.label) ||
                  ((_l =
                    (_k =
                      (_j = child.children) === null || _j === void 0 ? void 0 : _j.default()) ===
                      null || _k === void 0
                      ? void 0
                      : _k[0]) === null || _l === void 0
                    ? void 0
                    : _l.children)
                var optionParams_1 = __assign(__assign({}, child.props), {
                  label: label_1
                })
                template.push(
                  h(
                    child,
                    __assign(__assign({}, child.props), {
                      onClick: function () {
                        return handleClickOption(optionParams_1, currentIndex_1)
                      },
                      onFocus_: function () {
                        return handleFocusOption(currentIndex_1)
                      },
                      _focused: state.focusIndex === currentIndex_1,
                      _selected: getSelected(optionParams_1)
                    }),
                    {
                      default: function () {
                        return label_1
                      }
                    }
                  )
                )
                childIndex += 1
              }
            } else {
              consolaWrapper.error('Option or SelectOption must be used as a child of Select')
              return 'break'
            }
          }
          for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var child = items_1[_i]
            var state_1 = _loop_1(child)
            if (state_1 === 'break') break
          }
          children = template
        }
      }
      if (
        (!children || (isArray(children) && children.length === 0)) &&
        hasPropsOrSlots('emptyContent', vm)
      ) {
        children = [renderElementForPropsOrSlot('emptyContent', vm)]
      }
      var clxsNames = [''.concat(prefix, '-select-dropdown-wrapper'), dropdownClassName]
      return createVNode(
        'div',
        {
          class: clxsNames,
          style: style
        },
        [children]
      )
    }
    var vm = getCurrentInstance()
    var handleMultipleCloseTag = function (data, index) {
      handleClickOption(data, index)
    }
    var isEmpty = function (data) {
      if (!data) return false
      if (isArray(data)) return data.length > 0
      return !!data
    }
    var multipleTagTemplate = function () {
      if (isArray(state.selfValue)) {
        var resetNumber = state.selfValue.length - props.maxTagCount
        var isShowMaxTagCount = props.maxTagCount > 0 && !state.visible && resetNumber > 0
        var targetList = isShowMaxTagCount
          ? state.selfValue.slice(0, props.maxTagCount)
          : state.selfValue
        var template = targetList.map(function (item, index) {
          return createVNode(
            Tag,
            {
              size: 'large',
              closable: true,
              onClose: function () {
                return handleMultipleCloseTag(item, index)
              }
            },
            {
              default: () => [item.label]
            }
          )
        })
        if (isShowMaxTagCount) {
          var popover = popoverProps.value
          var resetList = state.selfValue.slice(targetList.length, state.selfValue.length)
          template.push(
            createVNode(
              Popover,
              {
                position: popover.position,
                autoAdjustOverflow: popover.autoAdjustOverflow,
                getPopupContainer: popover.getPopupContainer,
                zIndex: popover.zIndex,
                trigger: 'hover',
                showArrow: true,
                content: createVNode('div', null, [
                  resetList.map(function (item) {
                    return createVNode(Tag, null, {
                      default: () => [item.label]
                    })
                  })
                ])
              },
              {
                default: () => [
                  createVNode(
                    Tag,
                    {
                      size: 'large',
                      style: {
                        backgroundColor: 'transparent'
                      }
                    },
                    {
                      default: () => [createTextVNode('+'), resetNumber]
                    }
                  )
                ]
              }
            )
          )
        }
        return template
      }
      return null
    }
    return function () {
      var popover = popoverProps.value
      return createVNode(
        Popover,
        {
          position: popover.position,
          autoAdjustOverflow: popover.autoAdjustOverflow,
          getPopupContainer: popover.getPopupContainer,
          zIndex: popover.zIndex,
          trigger: 'custom',
          visible: state.visible,
          content: renderPopoverContent1(),
          onVisibleChange: handleVisibleChange
        },
        {
          default: () => [
            createVNode(
              'div',
              mergeProps(
                {
                  class: wrapperClass.value
                },
                ctx.attrs,
                {
                  onClick: handleOpenPopover,
                  ref: triggerRef
                }
              ),
              [
                createVNode(
                  'div',
                  {
                    class: prefix + '-select-selection'
                  },
                  [
                    createVNode(
                      'div',
                      {
                        class: prefix + '-select-selection-wrapper'
                      },
                      [
                        isEmpty(state.selfValue)
                          ? props.multiple
                            ? multipleTagTemplate()
                            : createVNode(
                                'span',
                                {
                                  class: prefix + '-select-selection-text'
                                },
                                [state.selfValue]
                              )
                          : createVNode(
                              'div',
                              {
                                class: [
                                  prefix + '-select-selection-text',
                                  prefix + '-select-selection-placeholder'
                                ]
                              },
                              [
                                hasPropsOrSlots('placeholder', vm)
                                  ? renderElementForPropsOrSlot('placeholder', vm)
                                  : '请选择'
                              ]
                            )
                      ]
                    )
                  ]
                ),
                createVNode(
                  'div',
                  {
                    class: prefix + '-select-input-arrow'
                  },
                  [
                    createVNode(
                      'div',
                      {
                        class: prefix + '-select-input-arrow-icon',
                        style: {
                          transform: 'rotate('.concat(state.visible ? '180deg' : '0deg', ')')
                        }
                      },
                      [createVNode(IconChevronDown$1, null, null)]
                    )
                  ]
                )
              ]
            )
          ]
        }
      )
    }
  },
  name: prefix + '-select',
  props: selectProps,
  emits: selectEmits
})

var props = {
  /**
   * @description 显示内容
   */
  content: {
    type: [],
    default: undefined,
    required: false
  },
  /**
   * @description 用于设置监听器挂载的DOM
   */
  getListenerTarget: {
    type: Function,
    default: function () {
      return document.body
    },
    required: false
  },
  /**
   * @description 显示内容的背景
   */
  background: {
    type: [Boolean, String],
    default: true,
    required: false
  },
  /**
   * @description 设置快捷键组合
   */
  hotKeys: {
    type: Array,
    default: function () {
      return []
    },
    required: true
  },
  /**
   * @description 是否阻止默认事件
   */
  preventDefault: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 覆盖组件渲染
   */
  render: {
    type: [String, Object, Function, null],
    default: function () {},
    required: false
  }
}
var emits = {
  /**
   * @description 点击回调函数
   */
  click: function (e) {
    return e
  },
  /**
   * @description 快捷键回调函数
   */
  hotKey: function (e) {
    return e
  }
}

var KeysMap = {
  // alpha
  a: 'KeyA',
  b: 'KeyB',
  c: 'KeyC',
  d: 'KeyD',
  e: 'KeyE',
  f: 'KeyF',
  g: 'KeyG',
  h: 'KeyH',
  i: 'KeyI',
  j: 'KeyJ',
  k: 'KeyK',
  l: 'KeyL',
  m: 'KeyM',
  n: 'KeyN',
  o: 'KeyO',
  p: 'KeyP',
  q: 'KeyQ',
  r: 'KeyR',
  s: 'KeyS',
  t: 'KeyT',
  u: 'KeyU',
  v: 'KeyV',
  w: 'KeyW',
  x: 'KeyX',
  y: 'KeyY',
  z: 'KeyZ',
  // digit
  0: 'Digit0',
  1: 'Digit1',
  2: 'Digit2',
  3: 'Digit3',
  4: 'Digit4',
  5: 'Digit5',
  6: 'Digit6',
  7: 'Digit7',
  8: 'Digit8',
  9: 'Digit9',
  // punctuation
  ' ': 'Space',
  enter: 'Enter',
  escape: 'Escape',
  backspace: 'Backspace',
  tab: 'Tab',
  '-': 'Minus',
  '=': 'Equal',
  '[': 'BracketLeft',
  ']': 'BracketRight',
  '\\': 'Backslash',
  ';': 'Semicolon',
  "'": 'Quote',
  '`': 'Backquote',
  ',': 'Comma',
  '.': 'Period',
  '/': 'Slash',
  '?': 'Slash',
  '!': 'Digit1',
  '@': 'Digit2',
  '#': 'Digit3',
  $: 'Digit4',
  '%': 'Digit5',
  '^': 'Digit6',
  '&': 'Digit7',
  '*': 'Digit8',
  '(': 'Digit9',
  ')': 'Digit0',
  // arrow
  arrowup: 'ArrowUp',
  arrowdown: 'ArrowDown',
  arrowleft: 'ArrowLeft',
  arrowright: 'ArrowRight',
  // function
  shift: 'ShiftLeft',
  control: 'ControlLeft',
  alt: 'AltLeft',
  meta: 'MetaLeft',
  capslock: 'CapsLock',
  f1: 'F1',
  f2: 'F2',
  f3: 'F3',
  f4: 'F4',
  f5: 'F5',
  f6: 'F6',
  f7: 'F7',
  f8: 'F8',
  f9: 'F9',
  f10: 'F10',
  f11: 'F11',
  f12: 'F12',
  insert: 'Insert',
  delete: 'Delete',
  home: 'Home',
  end: 'End',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  numlock: 'NumLock',
  scrolllock: 'ScrollLock',
  pause: 'Pause',
  // numpad
  numpad0: 'Numpad0',
  numpad1: 'Numpad1',
  numpad2: 'Numpad2',
  numpad3: 'Numpad3',
  numpad4: 'Numpad4',
  numpad5: 'Numpad5',
  numpad6: 'Numpad6',
  numpad7: 'Numpad7',
  numpad8: 'Numpad8',
  numpad9: 'Numpad9',
  numpaddecimal: 'NumpadDecimal',
  numpaddivide: 'NumpadDivide',
  numpadmultiply: 'NumpadMultiply',
  numpadsubtract: 'NumpadSubtract',
  numpadadd: 'NumpadAdd',
  numpadenter: 'NumpadEnter'
}
var getKeyToCode = function (key) {
  return KeysMap[key.toLowerCase()] || undefined
}
var Keys
;(function (Keys) {
  Keys['A'] = 'a'
  Keys['B'] = 'b'
  Keys['C'] = 'c'
  Keys['D'] = 'd'
  Keys['E'] = 'e'
  Keys['F'] = 'f'
  Keys['G'] = 'g'
  Keys['H'] = 'h'
  Keys['I'] = 'i'
  Keys['J'] = 'j'
  Keys['K'] = 'k'
  Keys['L'] = 'l'
  Keys['M'] = 'm'
  Keys['N'] = 'n'
  Keys['O'] = 'o'
  Keys['P'] = 'p'
  Keys['Q'] = 'q'
  Keys['R'] = 'r'
  Keys['S'] = 's'
  Keys['T'] = 't'
  Keys['U'] = 'u'
  Keys['V'] = 'v'
  Keys['W'] = 'w'
  Keys['X'] = 'x'
  Keys['Y'] = 'y'
  Keys['Z'] = 'z'
  Keys['Digit0'] = '0'
  Keys['Digit1'] = '1'
  Keys['Digit2'] = '2'
  Keys['Digit3'] = '3'
  Keys['Digit4'] = '4'
  Keys['Digit5'] = '5'
  Keys['Digit6'] = '6'
  Keys['Digit7'] = '7'
  Keys['Digit8'] = '8'
  Keys['Digit9'] = '9'
  Keys['Space'] = ' '
  Keys['Enter'] = 'enter'
  Keys['Escape'] = 'escape'
  Keys['Backspace'] = 'backspace'
  Keys['Tab'] = 'tab'
  Keys['Minus'] = '-'
  Keys['Equal'] = '='
  Keys['BracketLeft'] = '['
  Keys['BracketRight'] = ']'
  Keys['Backslash'] = '\\'
  Keys['Semicolon'] = ';'
  Keys['Quote'] = "'"
  Keys['Backquote'] = '`'
  Keys['Comma'] = ','
  Keys['Period'] = '.'
  Keys['Slash'] = '/'
  Keys['Exclamation'] = '!'
  Keys['At'] = '@'
  Keys['Hash'] = '#'
  Keys['Dollar'] = '$'
  Keys['Percent'] = '%'
  Keys['Caret'] = '^'
  Keys['Ampersand'] = '&'
  Keys['Asterisk'] = '*'
  Keys['LeftParenthesis'] = '('
  Keys['RightParenthesis'] = ')'
  Keys['ArrowUp'] = 'arrowup'
  Keys['ArrowDown'] = 'arrowdown'
  Keys['ArrowLeft'] = 'arrowleft'
  Keys['ArrowRight'] = 'arrowright'
  Keys['Shift'] = 'shift'
  Keys['Control'] = 'control'
  Keys['Alt'] = 'alt'
  Keys['Meta'] = 'meta'
  Keys['CapsLock'] = 'capslock'
  Keys['F1'] = 'f1'
  Keys['F2'] = 'f2'
  Keys['F3'] = 'f3'
  Keys['F4'] = 'f4'
  Keys['F5'] = 'f5'
  Keys['F6'] = 'f6'
  Keys['F7'] = 'f7'
  Keys['F8'] = 'f8'
  Keys['F9'] = 'f9'
  Keys['F10'] = 'f10'
  Keys['F11'] = 'f11'
  Keys['F12'] = 'f12'
  Keys['Insert'] = 'insert'
  Keys['Delete'] = 'delete'
  Keys['Home'] = 'home'
  Keys['End'] = 'end'
  Keys['PageUp'] = 'pageup'
  Keys['PageDown'] = 'pagedown'
  Keys['NumLock'] = 'numlock'
  Keys['ScrollLock'] = 'scrolllock'
  Keys['Pause'] = 'pause'
  Keys['Numpad0'] = 'numpad0'
  Keys['Numpad1'] = 'numpad1'
  Keys['Numpad2'] = 'numpad2'
  Keys['Numpad3'] = 'numpad3'
  Keys['Numpad4'] = 'numpad4'
  Keys['Numpad5'] = 'numpad5'
  Keys['Numpad6'] = 'numpad6'
  Keys['Numpad7'] = 'numpad7'
  Keys['Numpad8'] = 'numpad8'
  Keys['Numpad9'] = 'numpad9'
  Keys['NumpadDecimal'] = 'numpaddecimal'
  Keys['NumpadDivide'] = 'numpaddivide'
  Keys['NumpadMultiply'] = 'numpadmultiply'
  Keys['NumpadSubtract'] = 'numpadsubtract'
  Keys['NumpadAdd'] = 'numpadadd'
  Keys['NumpadEnter'] = 'numpadenter'
})(Keys || (Keys = {}))

var HotKeys = defineComponent({
  setup: function (props, ctx) {
    var wrapper = computed(function () {
      return [''.concat(prefix, '-hotKeys')]
    })
    var contentWrapper = computed(function () {
      return [
        ''.concat(prefix, '-hotKeys-content'),
        isBoolean(props.background) && props.background
          ? ''.concat(prefix, '-hotKeys-content-background')
          : ''
      ]
    })
    var contentBackgroundStyle = computed(function () {
      var background = props.background
      if (isString(background) && isColorValue(background)) {
        return {
          background: background
        }
      }
      return {}
    })
    var handleClick = function (e) {
      var _a
      ;(_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e)
    }
    var _isValidHotKeys = function (hotKeys) {
      var commonKeyCnt = 0
      var modifierKeys = [Keys.Meta, Keys.Alt, Keys.Shift, Keys.Control]
      var allKeys = Object.values(Keys)
      hotKeys.forEach(function (key) {
        key = key.toLowerCase()
        if (
          !allKeys.some(function (value) {
            return value === key
          })
        ) {
          throw new Error(''.concat(key, ' is not a valid key'))
        }
        if (!modifierKeys.includes(key)) {
          commonKeyCnt += 1
        }
      })
      return commonKeyCnt === 1
    }
    onMounted(function () {
      var hotKeys = props.hotKeys
      if (!_isValidHotKeys(hotKeys)) {
        throw new Error('HotKeys must have one common key and 0/some modifier key')
      }
      if (hotKeys.length) {
        var container = props.getListenerTarget()
        useEventListener(container, 'keydown', handleKeyDown)
      }
    })
    var handleKeyDown = function (e) {
      var hotKeys = props.hotKeys,
        preventDefault = props.preventDefault
      var allModifier = [false, false, false, false]
      var clickedModifier = [e.metaKey, e.shiftKey, e.altKey, e.ctrlKey]
      var keysPressed =
        hotKeys === null || hotKeys === void 0
          ? void 0
          : hotKeys.map(function (key) {
              key = key.toLowerCase()
              if (key === Keys.Meta) {
                allModifier[0] = true
                return e.metaKey
              } else if (key === Keys.Shift) {
                allModifier[1] = true
                return e.shiftKey
              } else if (key === Keys.Alt) {
                allModifier[2] = true
                return e.altKey
              } else if (key === Keys.Control) {
                allModifier[3] = true
                return e.ctrlKey
              }
              return e.code === getKeyToCode(key)
            })
      if (
        !allModifier.every(function (value, index) {
          return value === clickedModifier[index]
        })
      ) {
        return
      }
      if (keysPressed.every(Boolean)) {
        if (preventDefault) {
          e.preventDefault()
        }
        ctx.emit('hotKey', e)
      }
    }
    return function () {
      var _a
      if (props.render) {
        return createVNode(
          'div',
          mergeProps(ctx.attrs, {
            class: wrapper.value,
            onClick: handleClick
          }),
          [isFunction(props.render) ? props.render() : props.render]
        )
      }
      var hotKeys = (_a = props.content) !== null && _a !== void 0 ? _a : props.hotKeys
      var isShowSplit = function (index) {
        return index > 0 && index <= hotKeys.length - 1
      }
      return createVNode(
        'div',
        mergeProps(ctx.attrs, {
          class: wrapper.value,
          onClick: handleClick
        }),
        [
          hotKeys.map(function (key, index) {
            return createVNode(
              'span',
              {
                key: index
              },
              [
                isShowSplit(index) &&
                  createVNode(
                    'span',
                    {
                      class: ''.concat(prefix, '-hotKeys-split')
                    },
                    [createTextVNode('+')]
                  ),
                createVNode(
                  'span',
                  {
                    style: contentBackgroundStyle.value,
                    class: contentWrapper.value
                  },
                  [key]
                )
              ]
            )
          })
        ]
      )
    }
  },
  name: prefix + '-hot-keys',
  props: props,
  emits: emits
})
var HotKeysWithKeys = HotKeys
HotKeysWithKeys.Keys = Keys

var dragMoveProps = {
  /**
   * @description 点击原生 input/textarea 时是否允许拖动
   */
  allowInputDrag: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 点击/触摸时是否允许拖动的判断函数
   */
  allowMove: {
    type: Function,
    default: function () {
      return true
    },
    required: false
  },
  /**
   * @description 返回限制可拖拽的范围的元素
   */
  constrainer: {
    type: Function,
    default: undefined,
    required: false
  },
  /**
   * @description 自定义拖动后的位置处理
   */
  customMove: {
    type: Function,
    default: undefined,
    required: false
  },
  /**
   * @description 返回触发拖动的元素
   */
  handler: {
    type: Function,
    default: undefined,
    required: false
  }
}
var dragMoveEmits = {
  /**
   * @description 鼠标按下时的回调
   */
  mouseDown: function (event) {
    return event instanceof Event
  },
  /**
   * @description 鼠标移动时的回调
   */
  mouseMove: function (event) {
    return event instanceof Event
  },
  /**
   * @description 鼠标抬起时的回调
   */
  mouseUp: function (event) {
    return event instanceof Event
  },
  /**
   * @description 触摸取消时的回调
   */
  touchCancel: function (event) {
    return event instanceof Event
  },
  /**
   * @description 触摸结束时的回调
   */
  touchEnd: function (event) {
    return event instanceof Event
  },
  /**
   * @description 触摸移动时的回调
   */
  touchMove: function (event) {
    return event instanceof Event
  },
  /**
   * @description 触摸开始时的回调
   */
  touchStart: function (event) {
    return event instanceof Event
  }
}

var dragMove = defineComponent({
  setup: function (props, ctx) {
    var state = reactive({
      isDragging: false,
      constrainerEl: null,
      handlerEl: null
    })
    var dragMoveRef = ref(null)
    onMounted(function () {
      if (props.constrainer && isFunction(props.constrainer)) {
        var constrainerEl = props.constrainer()
        if (constrainerEl instanceof HTMLElement) {
          state.constrainerEl = constrainerEl
          // 处理限制容器没有不是定位包含块情况
          if (constrainerEl.style.position === 'static') {
            constrainerEl.style.position = 'absolute'
          }
        }
      }
      if (props.handler && isFunction(props.handler)) {
        var handlerEl = props.handler()
        if (handlerEl instanceof HTMLElement) {
          state.handlerEl = handlerEl
          state.handlerEl.style.cursor = 'move'
        }
      }
      if (dragMoveRef.value) {
        var style = dragMoveRef.value.style
        if (style && !['absolute', 'fixed'].includes(style.position)) {
          dragMoveRef.value.style.position = 'absolute'
        }
      }
    })
    var triggerDragging = function (isDragging) {
      if (isDragging === undefined) state.isDragging = !state.isDragging
      else state.isDragging = isDragging
    }
    var handleDragMove = function (e) {
      if (!state.isDragging) return
      if (e instanceof MouseEvent) {
        ctx.emit('mouseMove', e)
      } else {
        ctx.emit('touchMove', e)
      }
      var allowMove = props.allowMove,
        customMove = props.customMove,
        allowInputDrag = props.allowInputDrag
      var isAllowMove = !!allowMove(e, dragMoveRef.value)
      if (isAllowMove) {
        if (
          !allowInputDrag &&
          (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        ) {
          return
        }
        if (dragMoveRef.value) {
          var element = dragMoveRef.value
          var currentLeft = element.offsetLeft
          var currentTop = element.offsetTop
          var deltaX = 0
          var deltaY = 0
          if (e instanceof MouseEvent) {
            // 鼠标移动使用movement属性
            deltaX = e.movementX
            deltaY = e.movementY
          } else {
            // 触摸移动需要手动计算
            if (e.touches.length > 0) {
              var touch = e.touches[0]
              if (typeof element._lastTouchX !== 'undefined') {
                deltaX = touch.clientX - element._lastTouchX
              }
              if (typeof element._lastTouchY !== 'undefined') {
                deltaY = touch.clientY - element._lastTouchY
              }
              // 保存当前位置供下次计算使用
              element._lastTouchX = touch.clientX
              element._lastTouchY = touch.clientY
            } else {
              return
            }
          }
          var newLeft = currentLeft + deltaX
          var newTop = currentTop + deltaY
          // 应用边界检测
          if (state.constrainerEl && dragMoveRef.value) {
            var _a = isOverflow(element, newLeft, newTop),
              left = _a.left,
              top_1 = _a.top
            newLeft = left
            newTop = top_1
          }
          if (isFunction(customMove)) {
            customMove(element, newTop, newLeft)
          } else {
            element.style.left = newLeft + 'px'
            element.style.top = newTop + 'px'
          }
        }
      }
      // 对于触摸事件，阻止页面滚动
      if (e instanceof TouchEvent) {
        e.preventDefault()
      }
    }
    var isOverflow = function (element, newLeft, newTop) {
      var container = state.constrainerEl
      var correctedLeft = newLeft
      var correctedTop = newTop
      if (container) {
        // 获取元素的尺寸
        var elementWidth = element.offsetWidth
        var elementHeight = element.offsetHeight
        // 限制左边界
        if (newLeft < 0) {
          correctedLeft = 0
        }
        // 限制右边界
        if (newLeft + elementWidth > container.offsetWidth) {
          correctedLeft = container.offsetWidth - elementWidth
        }
        // 限制上边界
        if (newTop < 0) {
          correctedTop = 0
        }
        // 限制下边界
        if (newTop + elementHeight > container.offsetHeight) {
          correctedTop = container.offsetHeight - elementHeight
        }
      }
      return {
        left: correctedLeft,
        top: correctedTop
      }
    }
    useEventListener(document.body, 'mousemove', function (e) {
      handleDragMove(e)
    })
    useEventListener(document.body, 'mouseup', function (e) {
      ctx.emit('mouseUp', e)
      triggerDragging(false)
    })
    useEventListener(
      document.body,
      'touchmove',
      function (e) {
        handleDragMove(e)
      },
      {
        passive: false
      }
    )
    useEventListener(document.body, 'touchend', function (e) {
      ctx.emit('touchEnd', e)
      triggerDragging(false)
      // 清除保存的触摸位置
      if (dragMoveRef.value) {
        var element = dragMoveRef.value
        delete element._lastTouchX
        delete element._lastTouchY
      }
    })
    function handleMoveStart(e) {
      if (state.handlerEl && !state.handlerEl.contains(e.target)) return
      if (e instanceof MouseEvent) ctx.emit('mouseDown', e)
      else {
        if (e.touches.length > 0) {
          var touch = e.touches[0]
          if (dragMoveRef.value) {
            var element = dragMoveRef.value
            element._lastTouchX = touch.clientX
            element._lastTouchY = touch.clientY
          }
        }
        ctx.emit('touchStart', e)
      }
      triggerDragging(true)
    }
    return function () {
      var _a, _b, _c
      var component =
        (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
      if (component && component.length > 0) {
        var firstChild = component[0]
        var style = __assign(
          {},
          (_c = firstChild.props) === null || _c === void 0 ? void 0 : _c.style
        )
        if (!state.handlerEl) {
          style.cursor = 'move'
        }
        return h(firstChild, {
          ref: dragMoveRef,
          style: style,
          onMousedown: function (e) {
            handleMoveStart(e)
          },
          onTouchstart: function (e) {
            handleMoveStart(e)
          }
        })
      }
      return null
    }
  },
  name: prefix + '-drag-move',
  props: dragMoveProps,
  emits: dragMoveEmits
})

var spaceProps = {
  /**
   * @description 对齐方式, 支持 start、end、center、baseline
   */
  align: {
    values: ['start', 'end', 'center', 'baseline'],
    default: 'center',
    required: false
  },
  /**
   * @description 间距尺寸, 支持 loose、medium、tight 或 number、array
   */
  spacing: {
    type: [String, Number, Object],
    default: 'tight',
    required: false
  },
  /**
   * @description 是否为垂直间距
   */
  vertical: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否自动换行
   */
  wrap: {
    type: Boolean,
    default: false,
    required: false
  }
}

var Space = defineComponent({
  setup: function (props, ctx) {
    var wrapperNames = computed(function () {
      var _a
      var classNames = [
        prefix + '-space',
        prefix + '-space-align-' + props.align,
        props.vertical ? [prefix + '-space-vertical'] : [prefix + '-space-horizontal'],
        ((_a = {}), (_a[prefix + '-space-wrap'] = props.wrap), _a)
      ]
      if (isString(props.spacing)) {
        classNames.push(
          prefix + '-space-' + props.spacing + '-horizontal',
          prefix + '-space-' + props.spacing + '-vertical'
        )
      }
      return classNames
    })
    var wrapperStyle = computed(function () {
      var style = Object.assign({}, ctx.attrs.style)
      if (isNumber(props.spacing)) {
        if (props.vertical) style.columnGap = props.spacing + 'px'
        else style.rowGap = props.spacing + 'px'
      }
      if (isArray(props.spacing)) {
        var _a = props.spacing,
          x = _a[0],
          y = _a[1]
        style.columnGap = x + 'px'
        style.rowGap = y + 'px'
      }
      return style
    })
    return function () {
      var _a, _b
      return createVNode(
        'div',
        mergeProps(ctx.attrs, {
          class: wrapperNames.value,
          style: wrapperStyle.value
        }),
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  props: spaceProps,
  name: prefix + '-space'
})

var strokeNumber = 0
function SpinIcon(props) {
  if (props === void 0) {
    props = {}
  }
  strokeNumber++
  return createVNode(
    'svg',
    mergeProps(props, {
      width: '48',
      height: '48',
      viewBox: '0 0 36 36',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true'
    }),
    [
      createVNode('defs', null, [
        createVNode(
          'linearGradient',
          {
            x1: '0%',
            y1: '100%',
            x2: '100%',
            y2: '100%',
            id: 'linearGradient-'.concat(strokeNumber)
          },
          [
            createVNode(
              'stop',
              {
                'stop-color': 'currentColor',
                'stop-opacity': '0',
                offset: '0%'
              },
              null
            ),
            createVNode(
              'stop',
              {
                'stop-color': 'currentColor',
                'stop-opacity': '0.50',
                offset: '39.9430698%'
              },
              null
            ),
            createVNode(
              'stop',
              {
                'stop-color': 'currentColor',
                offset: '100%'
              },
              null
            )
          ]
        )
      ]),
      createVNode(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          fill: 'none',
          'fill-rule': 'evenodd'
        },
        [
          createVNode(
            'rect',
            {
              'fill-opacity': '0.01',
              fill: 'none',
              x: '0',
              y: '0',
              width: '36',
              height: '36'
            },
            null
          ),
          createVNode(
            'path',
            {
              d: 'M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951',
              stroke: 'url(#linearGradient-'.concat(strokeNumber, ')'),
              'stroke-width': '4',
              'stroke-linecap': 'round'
            },
            null
          )
        ]
      )
    ]
  )
}

var spinPorps = {
  /**
   * @description 延迟显示加载效果的时间 ms
   */
  delay: {
    type: Number,
    default: 0,
    required: false
  },
  /**
   * @description 加载指示符
   */
  indicator: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  /**
   * @description 组件大小，可选值为 small, middle, large
   */
  size: {
    type: String,
    default: 'middle',
    required: false
  },
  /**
   * @description 是否处于加载中的状态
   */
  spinning: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 当 spin 作为包裹元素时，可以自定义描述文字
   */
  tip: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  }
}

var Spin = defineComponent({
  setup: function (props, ctx) {
    var showSpin = ref(false)
    var timer = ref()
    watch(
      function () {
        return props.spinning
      },
      function (spinning) {
        if (spinning) {
          var delay = Math.min(props.delay, Number.MAX_SAFE_INTEGER)
          if (delay <= 0) {
            showSpin.value = true
          } else {
            timer.value = setTimeout(function () {
              showSpin.value = true
            }, delay)
          }
        } else {
          clearTimeout(timer.value)
          timer.value = undefined
          showSpin.value = false
        }
      },
      {
        immediate: true
      }
    )
    onScopeDispose(function () {
      if (timer.value) clearTimeout(timer.value)
    })
    var wrapperNames = computed(function () {
      return [prefix + '-spin-wrapper']
    })
    var vm = getCurrentInstance()
    return function () {
      var _a, _b
      var content = (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
      var spinNames = [prefix + '-spin', prefix + '-spin-' + props.size]
      if (content) spinNames.push(prefix + '-spin-block')
      if (!showSpin.value) spinNames.push(prefix + '-spin-hidden')
      return createVNode(
        'div',
        mergeProps(ctx.attrs, {
          class: spinNames
        }),
        [
          showSpin.value &&
            createVNode(
              'div',
              {
                class: wrapperNames.value
              },
              [
                props.indicator
                  ? renderElementForPropsOrSlot('indicator', vm)
                  : createVNode(Fragment, null, [
                      createVNode(SpinIcon, null, null),
                      props.tip
                        ? createVNode(
                            'div',
                            {
                              class: prefix + '-spin-tip'
                            },
                            [renderElementForPropsOrSlot('tip', vm)]
                          )
                        : null
                    ])
              ]
            ),
          content &&
            createVNode(
              'div',
              {
                class: prefix + '-spin-children'
              },
              [content]
            )
        ]
      )
    }
  },
  props: spinPorps,
  name: prefix + '-spin'
})

var commonProps = {
  /**
   * @description 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动
   */
  hasSider: {
    type: Boolean,
    default: undefined,
    required: false
  }
}
var siderProps = {
  /**
   * @description 触发响应式布局的断点
   */
  breakpoint: {
    values: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    default: 'lg',
    required: false
  }
}
var siderEmits = {
  breakpoint: function (screen, broken) {
    return isString(screen) && isBoolean(broken)
  }
}

var provideKey = Symbol('layout')

var Layout = defineComponent({
  setup: function (props, ctx) {
    var layoutprovider = {
      emitSider: function () {
        exitSider.value = true
      }
    }
    var exitSider = ref(false)
    var hasSider = computed(function () {
      if (isUndefined(props.hasSider)) {
        return exitSider.value
      }
      return props.hasSider
    })
    var classNames = computed(function () {
      var _a
      return [
        prefix + '-layout',
        ((_a = {}), (_a[prefix + '-layout-has-sider'] = hasSider.value), _a)
      ]
    })
    provide(provideKey, layoutprovider)
    return function () {
      var _a, _b
      return createVNode(
        'section',
        {
          class: classNames.value
        },
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  name: prefix + '-layout',
  props: __assign({}, commonProps)
})

var Header = defineComponent({
  setup: function (props, ctx) {
    return function () {
      var _a, _b
      return createVNode(
        'header',
        mergeProps(
          {
            class: prefix + '-layout-header'
          },
          ctx.attrs
        ),
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  name: prefix + '-layout-header'
})

var Content = defineComponent({
  setup: function (props, ctx) {
    return function () {
      var _a, _b
      return createVNode(
        'main',
        mergeProps(
          {
            class: prefix + '-layout-content'
          },
          ctx.attrs
        ),
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  name: prefix + '-layout-content'
})

var Footer = defineComponent({
  setup: function (props, ctx) {
    return function () {
      var _a, _b
      return createVNode(
        'footer',
        mergeProps(
          {
            class: prefix + '-layout-footer'
          },
          ctx.attrs
        ),
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  name: prefix + '-layout-footer'
})

var breakpoint = {
  xs: 575,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
}

var Sider = defineComponent({
  setup: function (props, ctx) {
    var lastTriggered = ref(null)
    var parentData = inject(provideKey)
    if (isFunction(parentData === null || parentData === void 0 ? void 0 : parentData.emitSider))
      parentData.emitSider()
    useEventListener(window, 'resize', function () {
      var innerWidth = window.innerWidth
      var screen = props.breakpoint
      var shouldTrigger = innerWidth > breakpoint[screen]
      if (lastTriggered.value !== shouldTrigger) {
        lastTriggered.value = shouldTrigger
        ctx.emit('breakpoint', screen, shouldTrigger)
      }
    })
    return function () {
      var _a, _b
      return createVNode(
        'aside',
        mergeProps(
          {
            class: prefix + '-layout-sider'
          },
          ctx.attrs
        ),
        [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]
      )
    }
  },
  props: siderProps,
  emits: siderEmits,
  name: prefix + '-layout-sider'
})

var switchProps = {
  modelValue: {
    modelValue: String,
    default: undefined
  },
  /**
   * @description 指示当前是否选中,配合 onChange 使用
   */
  checked: {
    type: Boolean,
    default: undefined
  },
  /**
   * @description 默认是否选中
   */
  defaultChecked: {
    type: Boolean,
    default: false
  },
  /**
   * @description 禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 打开时展示的内容, size 为 small 时无效
   */
  checkedText: {
    type: [String, Object, Function, null],
    default: null
  },
  /**
   * @description 关闭时展示的内容, size 为 small 时无效
   */
  uncheckedText: {
    type: [String, Object, Function, null],
    default: null
  },
  /**
   * @description 开启时展示的旋钮内容
   */
  checkedKnob: {
    type: [String, Object, Function, null],
    default: null
  },
  /**
   * @description 关闭时展示的旋钮内容
   */
  uncheckedKnob: {
    type: [String, Object, Function, null],
    default: null
  },
  /**
   * @description 尺寸
   */
  size: {
    values: ['small', 'default', 'large'],
    default: 'default'
  },
  /**
   * @description 设置加载状态
   */
  loading: {
    type: Boolean,
    default: undefined
  }
}
var switchEmits = {
  /**
   * @description v-model 语法糖
   */
  'update:modelValue': function (value) {
    return isBoolean(value)
  },
  /**
   * @description 点击时回调函数
   */
  click: function (e) {
    return e instanceof Event
  },
  /**
   * @description 变化时回调函数
   */
  change: function (value) {
    return isBoolean(value)
  },
  /**
   * @description 鼠标移入时回调函数
   */
  mouseEnter: function (e) {
    return e instanceof Event
  },
  /**
   * @description 鼠标移出时回调函数
   */
  mouseLeave: function (e) {
    return e instanceof Event
  }
}

var Switch = defineComponent({
  setup: function (props, ctx) {
    var state = reactive({
      checked: props.defaultChecked || !!props.checked
    })
    watch(
      function () {
        return props.checked
      },
      function (val) {
        state.checked = !!val
      }
    )
    var wrapperClassNames = computed(function () {
      var _a
      return [
        ''.concat(prefix, '-switch'),
        ((_a = {}),
        (_a[''.concat(prefix, '-switch-checked')] = state.checked),
        (_a[''.concat(prefix, '-switch-disabled')] = props.disabled),
        (_a[''.concat(prefix, '-switch-loading')] = props.loading),
        (_a[''.concat(prefix, '-switch-').concat(props.size)] = props.size),
        _a)
      ]
    })
    var getSpinSize = computed(function () {
      switch (props.size) {
        case 'small':
          return 'small'
        case 'large':
          return 'large'
        default:
          return 'middle'
      }
    })
    var handleClickSwitch = function (e) {
      if (props.disabled || props.loading) return
      ctx.emit('click', e)
      //受控模式
      if (isBoolean(props.checked)) {
        ctx.emit('change', !state.checked)
      } else {
        state.checked = !state.checked
        if (isUndefined(props.modelValue)) {
          handleUpdateModelValue(state.checked)
        }
      }
      // else {
      //   const stop = watch(
      //     () => props.loading,
      //     () => {
      //       state.checked = !state.checked
      //       stop()
      //     }
      //   )
      // }
    }
    var handleUpdateModelValue = function (value) {
      ctx.emit('update:modelValue', value)
    }
    // v-model
    if (props.modelValue !== undefined && props.checked !== undefined) {
      consolaWrapper.warn(
        'Switch components modelValue and checked cannot be passed in simultaneously.'
      )
    }
    var vm = getCurrentInstance()
    var renderCheckedText = function () {
      return createVNode(
        'div',
        {
          class: ''.concat(prefix, '-switch-checkedText-text')
        },
        [renderElementForPropsOrSlot('checkedText', vm)]
      )
    }
    var renderUncheckedText = function () {
      return createVNode(
        'div',
        {
          class: ''.concat(prefix, '-switch-unchecked-text')
        },
        [renderElementForPropsOrSlot('uncheckedText', vm)]
      )
    }
    var renderTextSlot = function () {
      if (hasPropsOrSlots('checkedText', vm) || hasPropsOrSlots('uncheckedText', vm)) {
        return state.checked ? renderCheckedText() : renderUncheckedText()
      }
      return null
    }
    var renderCheckedKnob = function () {
      var template = createVNode(
        'div',
        {
          class: ''.concat(prefix, '-switch-knob')
        },
        null
      )
      if (hasPropsOrSlots('checkedKnob', vm) || hasPropsOrSlots('uncheckedKnob', vm)) {
        var warpper = function (vnode) {
          if (vnode)
            return createVNode(
              'div',
              {
                class: ''.concat(prefix, '-switch-knob')
              },
              [vnode]
            )
          return template
        }
        return state.checked
          ? warpper(renderElementForPropsOrSlot('checkedKnob', vm))
          : warpper(renderElementForPropsOrSlot('uncheckedKnob', vm))
      }
      return template
    }
    return function () {
      return createVNode(
        'div',
        {
          class: wrapperClassNames.value,
          onClick: handleClickSwitch,
          onMouseenter: function (e) {
            return ctx.emit('mouseEnter', e)
          },
          onMouseleave: function (e) {
            return ctx.emit('mouseLeave', e)
          }
        },
        [
          props.loading
            ? createVNode(
                Spin,
                {
                  size: getSpinSize.value,
                  class: ''.concat(prefix, '-switch-loading-spin')
                },
                null
              )
            : renderCheckedKnob(),
          props.size !== 'small' && renderTextSlot(),
          createVNode(
            'input',
            {
              class: ''.concat(prefix, '-switch-native-control'),
              type: 'checkbox',
              checked: state.checked
            },
            null
          )
        ]
      )
    }
  },
  name: prefix + '-switch',
  props: switchProps,
  emits: switchEmits
})

var ToastType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}
var defaultConfig = {
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1010,
  theme: 'normal',
  duration: 3,
  getPopupContainer: function () {
    return document.body
  }
}
var defaultOptions = {
  content: '',
  icon: null,
  showClose: true,
  textMaxWidth: 450,
  onClose: function () {},
  stack: false,
  id: ''
}
var wrapperPorpos = {
  /**
   * @description 弹层 z-index 值
   */
  zIndex: {
    type: Number,
    default: defaultConfig.zIndex
  },
  /**
   * @description 弹层id
   */
  id: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description 弹层容器
   */
  getPopupContainer: {
    type: Function,
    default: function () {
      return defaultConfig.getPopupContainer
    }
  }
}
var toastTypeMap = {
  success: 'success',
  warning: 'warning',
  error: 'error'
}
var toastProps = {
  theme: {
    type: String,
    default: 'normal'
  },
  type: {
    values: ['success', 'warning', 'info', 'error'],
    required: true
  },
  content: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  icon: {
    type: [String, Object, Function, null],
    default: null,
    required: false
  },
  showClose: {
    type: Boolean,
    default: true,
    required: false
  },
  textMaxWidth: {
    type: [Number, String],
    default: 450,
    required: false
  },
  id: {
    type: [String, Number],
    default: '',
    required: false
  }
}

var Toast$1 = defineComponent({
  setup: function (props, ctx) {
    var state = reactive({
      animationState: 'enter',
      isAnimating: false
    })
    var classNames = computed(function () {
      var _a
      return [
        prefix + '-toast',
        prefix + '-toast-' + props.type,
        ((_a = {}), (_a[prefix + '-toast-light'] = props.theme === 'light'), _a)
      ]
    })
    var vm = getCurrentInstance()
    var renderIcon = function () {
      if (hasPropsOrSlots('icon', vm)) {
        return createVNode('div', null, [renderElementForPropsOrSlot('icon', vm)])
      }
      var size = 'large'
      var classNames = ''.concat(prefix, '-toast-icon-').concat(props.type)
      return props.type === toastTypeMap.success
        ? createVNode(
            IconTickCircle$1,
            {
              class: classNames,
              size: size
            },
            null
          )
        : props.type === toastTypeMap.warning
          ? createVNode(
              IconAlertTriangle$1,
              {
                class: classNames,
                size: size
              },
              null
            )
          : props.type === toastTypeMap.error
            ? createVNode(
                IconAlertCircle$1,
                {
                  class: classNames,
                  size: size
                },
                null
              )
            : createVNode(
                IconInfoCircle$1,
                {
                  class: classNames,
                  size: size
                },
                null
              )
    }
    var renderContent = function () {
      var template = renderElementForPropsOrSlot('content', vm)
      var maxWidth = props.textMaxWidth
      if (isNumber(maxWidth)) maxWidth = maxWidth + 'px'
      else {
        var isFlag = maxWidth.includes('%') || maxWidth.includes('px')
        maxWidth = isFlag ? maxWidth : maxWidth + 'px'
      }
      return createVNode(
        'span',
        {
          class: prefix + '-toast-text',
          style: {
            maxWidth: maxWidth
          }
        },
        [template]
      )
    }
    var handleAnimationStart = function () {
      state.isAnimating = true
    }
    var handleAnimationEnd = function () {
      console.log('handleAnimationEnd')
      if (!state.isAnimating) return
      if (state.animationState === 'leave') {
        //离开动画结束
        console.log('离开动画结束')
        ctx.emit('close', props)
      } else {
        console.log('进入动画结束')
      }
      state.isAnimating = false
    }
    var handleClose = function () {
      if (!state.isAnimating) {
        state.animationState = 'leave'
      }
    }
    ctx.emit('closeCallback_', {
      key: props.id,
      close: handleClose
    })
    return function () {
      return createVNode(
        CSSAnimation,
        {
          fillMode: 'forwards',
          motion: true,
          animationState: state.animationState,
          startClassName:
            state.animationState === 'enter'
              ? ''.concat(prefix, '-toast-animation-show')
              : ''.concat(prefix, '-toast-animation-hide'),
          onAnimationStart: handleAnimationStart,
          onAnimationEnd: handleAnimationEnd
        },
        {
          default: function (_a) {
            var animationStyle = _a.animationStyle,
              animationClassName = _a.animationClassName,
              animationEventsNeedBind = _a.animationEventsNeedBind
            return createVNode(
              'div',
              mergeProps(
                {
                  style: __assign({}, animationStyle)
                },
                animationEventsNeedBind,
                {
                  role: 'alert',
                  'aria-label': ''.concat(props.type, ' type'),
                  class: [classNames.value, animationClassName]
                }
              ),
              [
                createVNode(
                  'div',
                  {
                    class: prefix + '-toast-content'
                  },
                  [
                    renderIcon(),
                    renderContent(),
                    props.showClose &&
                      createVNode(
                        'div',
                        {
                          class: ''.concat(prefix, '-toast-close-button')
                        },
                        [
                          createVNode(
                            Button,
                            {
                              type: 'tertiary',
                              theme: 'borderless',
                              size: 'small',
                              icon: createVNode(IconClose$1, null, null),
                              onClick: handleClose
                            },
                            null
                          )
                        ]
                      )
                  ]
                )
              ]
            )
          }
        }
      )
    }
  },
  name: prefix + '-toast-interior',
  props: toastProps,
  emits: ['close', 'closeCallback_']
})

var Wrapper = defineComponent({
  setup: function (props, ctx) {
    var id = props.id
    if (!id) id = useRandomId()
    var wrapperId = 'toast-wrapper-' + id
    var state = reactive({
      toastPool: [],
      zIndex: props.zIndex,
      style: {},
      absorptionCloseCallbacks: {},
      stack: false,
      isHover: false
    })
    var handleCloseToast = function (data) {
      var id = data.id
      var index = state.toastPool.findIndex(function (item) {
        return item.id === id
      })
      var toast = state.toastPool[index]
      if (isFunction(toast.onClose)) toast.onClose()
      state.toastPool.splice(index, 1)
    }
    ctx.expose({
      add: function (options) {
        if (options.stack !== state.stack) {
          state.stack = options.stack
        }
        state.toastPool.push(options)
      },
      update: function (options) {
        var id = options.id
        var index = state.toastPool.findIndex(function (item) {
          return item.id === id
        })
        state.toastPool[index] = options
        if (options.stack !== state.stack) {
          state.stack = options.stack
        }
      },
      remove: function (toastId) {
        var _a, _b
        var data = state.toastPool.find(function (item) {
          return item.id === toastId
        })
        if (data) {
          ;(_b = (_a = state.absorptionCloseCallbacks)[data.id]) === null || _b === void 0
            ? void 0
            : _b.call(_a)
        }
      },
      destroyAll: function () {
        var _a, _b
        for (var item in state.absorptionCloseCallbacks) {
          ;(_b = (_a = state.absorptionCloseCallbacks)[item]) === null || _b === void 0
            ? void 0
            : _b.call(_a)
        }
      },
      setZIndex: function (index) {
        state.zIndex = index
      },
      setStyle: function (style) {
        var tStyle = {}
        for (var key in style) {
          tStyle[key] = style[key] + 'px'
        }
        state.style = tStyle
      }
    })
    //吸收Toast组件的关闭方法
    var handleAbsorptionCloseCallback = function (data) {
      var key = data.key,
        close = data.close
      state.absorptionCloseCallbacks[key] = close
    }
    var handleMouseenter = function () {
      state.isHover = true
    }
    var handleMouseleave = function () {
      state.isHover = false
    }
    return function () {
      var _a
      var renderToast = function (item) {
        return createVNode(
          Toast$1,
          {
            onCloseCallback_: handleAbsorptionCloseCallback,
            key: item.id,
            content: item.content,
            id: item.id,
            type: item.type,
            onClose: handleCloseToast,
            icon: item.icon,
            showClose: item.showClose,
            textMaxWidth: item.textMaxWidth,
            theme: item.theme
          },
          null
        )
      }
      return createVNode(
        'div',
        {
          onMouseenter: handleMouseenter,
          onMouseleave: handleMouseleave,
          class: [
            prefix + '-toast-wrapper',
            ((_a = {}), (_a[prefix + '-toast-wrapper-hover'] = state.isHover && state.stack), _a)
          ],
          id: wrapperId,
          style: __assign(
            {
              zIndex: state.zIndex
            },
            state.style
          )
        },
        [
          createVNode(
            'div',
            {
              class: ''.concat(prefix, '-toast-wrapper-inner')
            },
            [
              state.toastPool.map(function (item) {
                if (state.stack) {
                  return createVNode(
                    'div',
                    {
                      class: ''.concat(prefix, '-toast-zero-height-wrapper'),
                      key: item.id
                    },
                    [renderToast(item)]
                  )
                }
                return renderToast(item)
              })
            ]
          )
        ]
      )
    }
  },
  props: wrapperPorpos,
  name: prefix + '-toast-wrapper'
})

var ToastImplement = /** @class */ (function () {
  function ToastImplement(config) {
    if (config === void 0) {
      config = defaultConfig
    }
    this._app = null
    this.ids = []
    this.clears = []
    this._config = config
    var getPopupContainer = config.getPopupContainer
    this.container = getPopupContainer()
  }
  ToastImplement.prototype.createApp = function () {
    var app = createApp(Wrapper)
    this._app = app
    var inner = document.createElement('div')
    this.container.appendChild(inner)
    app.mount(inner)
    this.wrapperInstance = app._instance
    return app._instance
  }
  ToastImplement.prototype.getWarpper = function (options) {
    if (this.wrapperInstance) {
      return this.wrapperInstance
    }
    if (options) {
      var getPopupContainer = options.getPopupContainer
      this.container =
        (getPopupContainer === null || getPopupContainer === void 0
          ? void 0
          : getPopupContainer()) || defaultConfig.getPopupContainer()
    }
    return (this.wrapperInstance = this.createApp())
  }
  ToastImplement.prototype.config = function (config) {
    this._config = config
  }
  ToastImplement.prototype._setConfig = function (options) {
    var config = {}
    var directionKeys = ['bottom', 'left', 'right', 'top']
    var style = {}
    for (var key in this._config) {
      if (Object.hasOwnProperty.call(this._config, key)) {
        config[key] = options[key]
        if (directionKeys.includes(key)) {
          style[key] = options[key]
        }
      }
    }
    this._config = __assign(__assign({}, this._config), config)
    return style
  }
  ToastImplement.prototype._setDefault = function () {}
  ToastImplement.prototype.handler = function (options, type) {
    var _this = this
    if (isString(options)) {
      options = {
        content: options
      }
    }
    options = __assign(__assign(__assign({}, this._config), defaultOptions), options)
    var styles = this._setConfig(options)
    if (!options.id) {
      options.id = useRandomId()
    }
    var toastOption = {
      type: type,
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
    var warpper = this.getWarpper(options).exposed
    if (options.zIndex && options.zIndex !== this._config.zIndex) {
      warpper.setZIndex(options.zIndex)
    }
    if (Object.keys(styles).length > 0) {
      warpper.setStyle(styles)
    }
    if (this.ids.includes(options.id)) {
      var index = this.ids.findIndex(function (id) {
        return id === options.id
      })
      this.ids.splice(index, 1, options.id)
      warpper.update(toastOption)
    } else {
      this.ids.push(options.id)
      warpper.add(toastOption)
      if (options.duration !== 0) {
        var duration = Math.abs(options.duration * 1000)
        var clearCloseCallback = useSetTimeout(function () {
          _this.close(options.id)
        }, duration)
        this.clears.push(clearCloseCallback)
      }
    }
    return options.id
  }
  ToastImplement.prototype.info = function (options) {
    return this.handler(options, ToastType.INFO)
  }
  ToastImplement.prototype.success = function (options) {
    return this.handler(options, ToastType.SUCCESS)
  }
  ToastImplement.prototype.warning = function (options) {
    return this.handler(options, ToastType.WARNING)
  }
  ToastImplement.prototype.error = function (options) {
    return this.handler(options, ToastType.ERROR)
  }
  ToastImplement.prototype.loading = function (options) {
    return this.handler(options, 'loading')
  }
  ToastImplement.prototype.close = function (toastId) {
    var warpper = this.getWarpper()
    warpper.exposed.remove(toastId)
    var index = this.ids.findIndex(function (id) {
      return id === toastId
    })
    this.ids.splice(index, 1)
    if (isFunction(this.clears[index])) {
      this.clears[index]()
      this.clears.splice(index, 1)
    }
  }
  ToastImplement.prototype.destroyAll = function () {
    var warpper = this.getWarpper()
    warpper.exposed.destroyAll()
    this.ids = []
    this.clears =
      (this.clears.map(function (c) {
        c()
      }),
      [])
  }
  ToastImplement.prototype.destroyApp = function () {
    var _a
    ;(_a = this._app) === null || _a === void 0 ? void 0 : _a.unmount()
  }
  return ToastImplement
})()

var ToastFactory = {
  create: function (config) {
    if (config === void 0) {
      config = defaultConfig
    }
    return new ToastImplement(config)
  }
}

var Toast = ToastFactory.create()
// Toast.info({
//   content: 'hello info',
//   duration: 0,
//   theme: 'light',
//   stack: true
// })
// setTimeout(() => {
//   Toast.success({
//     content: 'hello success',
//     duration: 0,
//     theme: 'light',
//     stack: true
//   })
// }, 1000)
// setTimeout(() => {
//   Toast.error({
//     content: 'hello error',
//     duration: 0,
//     theme: 'light',
//     stack: true
//   })
// }, 2000)
// setTimeout(() => {
//   const id = 'hello'
//   Toast.warning({
//     content: 'hello warning',
//     id,
//     duration: 0,
//     theme: 'light',
//     stack: true
//   })
//   setTimeout(() => {
//     Toast.success({
//       content: 'hello success',
//       duration: 0,
//       id,
//       theme: 'light',
//       stack: true
//     })
//   }, 1000)
// }, 3000)

var components = [
  Button,
  ButtonGroup,
  SyncButton,
  Watermark,
  Input,
  Icon,
  IconJsx,
  Row,
  Col,
  Popover,
  Tooltip,
  Select,
  SelectOption,
  SelectOptionGroup,
  HotKeysWithKeys,
  Avatar,
  AvatarGroup,
  Tag,
  TagGroup,
  dragMove,
  Space,
  Spin,
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Switch,
  Toast,
  ToastFactory
]
var install = function (app) {
  return withInstall(app, components)
}
var globalApis = {
  Toast: Toast,
  ToastFactory: ToastFactory
}
var registerGlobalApiToDocs = function () {
  for (var api in globalApis) {
    globalThis[api] = globalApis[api]
  }
}

export {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Col,
  Content,
  dragMove as DragMove,
  Footer,
  Header,
  HotKeysWithKeys as HotKeys,
  Icon,
  IconJsx,
  Input,
  Layout,
  Popover,
  Row,
  Select,
  SelectOption,
  SelectOptionGroup,
  Sider,
  Space,
  Spin,
  Switch,
  SyncButton,
  Tag,
  TagGroup,
  Toast,
  ToastFactory,
  Tooltip,
  Watermark,
  install,
  registerGlobalApiToDocs
}
