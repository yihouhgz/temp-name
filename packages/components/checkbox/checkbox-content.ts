import { useRandomId } from '../_util'
import { provide, inject } from 'vue'
export type CheckboxProvider = {
  setCheckboxIndex: () => number
  setCheckboxChild: (index: number, child: unknown) => void
  onChnage: (checked: boolean, index: number, value: unknown) => void
  collectPropsChangeMap?: Map<number, (record: Record<string, unknown>) => void>
}
const checkboxProviderKey = Symbol(useRandomId())
export const useCheckboxProvider = (source: CheckboxProvider) => {
  provide<CheckboxProvider>(checkboxProviderKey, source)
}
export const useCheckboxInject = (defaultValue: CheckboxProvider | null) => {
  return inject<CheckboxProvider | null>(checkboxProviderKey, defaultValue)
}
