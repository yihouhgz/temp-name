import { useRandomId } from '../_util'
import { provide, inject } from 'vue'
import type { RadioEvent } from './type'
export type RadioProvider = {
  setRadioIndex: () => number
  setRadioChild: (index: number, child: unknown) => void
  onChange: (event: RadioEvent, value: unknown) => void
  collectPropsChangeMap?: Map<number, (record: Record<string, unknown>) => void>
  collectStopPropagationMap: Map<number, (record: Record<string, unknown>) => void>
  collectPreventDefaultMap: Map<number, (record: Record<string, unknown>) => void>
  collectCancelEventMap: Map<number, (checkedValue: unknown) => void>
}
const RadioProviderKey = Symbol(useRandomId())
export const useRadioProvider = (source: RadioProvider) => {
  provide<RadioProvider>(RadioProviderKey, source)
}
export const useRadioInject = (defaultValue: RadioProvider | null) => {
  return inject<RadioProvider | null>(RadioProviderKey, defaultValue)
}
