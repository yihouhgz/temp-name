import { defineComponent, computed, type ExtractPropTypes, type ExtractPublicPropTypes } from 'vue'
import { prefix } from 'constants/config'
import { props as hotKeysProps, emits } from './type'
import './style'
import { Keys } from './keys'

const HotKeys = defineComponent({
  setup() {
    const wrapper = computed(() => {
      return ['tempui-hotKeys']
    })
    return () => {
      return (
        <div class={wrapper.value}>
          <span>
            <span class="tempui-hotKeys-content">1</span>
          </span>
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
