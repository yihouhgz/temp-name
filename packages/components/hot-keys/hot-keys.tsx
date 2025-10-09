import {
  defineComponent,
  computed,
  type ExtractPropTypes,
  type ExtractPublicPropTypes,
  onMounted
} from 'vue'
import { prefix } from 'constants/config'
import { props as hotKeysProps, emits } from './type'
import './style'
import { Keys, getKeyToCode } from './keys'
import { isBoolean, isString, isColorValue, useEventListener, isFunction } from '../_util'

const HotKeys = defineComponent({
  setup(props, ctx) {
    const wrapper = computed(() => {
      return [`${prefix}-hotKeys`]
    })
    const contentWrapper = computed(() => {
      return [
        `${prefix}-hotKeys-content`,
        isBoolean(props.background) && props.background
          ? `${prefix}-hotKeys-content-background`
          : ''
      ]
    })
    const contentBackgroundStyle = computed(() => {
      const background = props.background
      if (isString(background) && isColorValue(background)) {
        return { background: background }
      }
      return {}
    })
    const handleClick = (e: MouseEvent) => {
      props.onClick?.(e)
    }
    const _isValidHotKeys = (hotKeys: string[]) => {
      let commonKeyCnt = 0
      const modifierKeys: string[] = [Keys.Meta, Keys.Alt, Keys.Shift, Keys.Control]
      const allKeys = Object.values(Keys)
      hotKeys.forEach((key) => {
        key = key.toLowerCase()
        if (!allKeys.some((value) => value === key)) {
          throw new Error(`${key} is not a valid key`)
        }
        if (!modifierKeys.includes(key)) {
          commonKeyCnt += 1
        }
      })
      return commonKeyCnt === 1
    }

    onMounted(() => {
      const hotKeys = props.hotKeys
      if (!_isValidHotKeys(hotKeys)) {
        throw new Error('HotKeys must have one common key and 0/some modifier key')
      }
      if (hotKeys.length) {
        const container = props.getListenerTarget() as HTMLElement
        useEventListener(container, 'keydown', handleKeyDown)
      }
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      const { hotKeys, preventDefault } = props
      const allModifier = [false, false, false, false]
      const clickedModifier = [e.metaKey, e.shiftKey, e.altKey, e.ctrlKey]

      const keysPressed = hotKeys?.map((key: KeyboardEvent['key']) => {
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
      if (!allModifier.every((value, index) => value === clickedModifier[index])) {
        return
      }
      if (keysPressed.every(Boolean)) {
        if (preventDefault) {
          e.preventDefault()
        }
        ctx.emit('hotKey', e)
      }
    }
    return () => {
      if (props.render) {
        return (
          <div {...ctx.attrs} class={wrapper.value} onClick={handleClick}>
            {isFunction(props.render) ? props.render() : props.render}
          </div>
        )
      }
      const hotKeys = props.content ?? props.hotKeys
      const isShowSplit = (index: number) => {
        return index > 0 && index <= hotKeys.length - 1
      }
      return (
        <div {...ctx.attrs} class={wrapper.value} onClick={handleClick}>
          {hotKeys.map((key, index) => {
            return (
              <span key={index}>
                {isShowSplit(index) && <span class={`${prefix}-hotKeys-split`}>+</span>}
                <span style={contentBackgroundStyle.value} class={contentWrapper.value}>
                  {key}
                </span>
              </span>
            )
          })}
        </div>
      )
    }
  },
  name: prefix + '-hot-keys',
  props: hotKeysProps,
  emits: emits
})
export type HotKeysInstance = typeof HotKeys & {
  Keys: typeof Keys
}
const HotKeysWithKeys = HotKeys as HotKeysInstance
HotKeysWithKeys.Keys = Keys

export type HotKeysProps = ExtractPropTypes<typeof hotKeysProps>
export type HotKeysPropsPublic = ExtractPublicPropTypes<typeof hotKeysProps>

export type HotKeysEmits = typeof emits

export default HotKeysWithKeys
