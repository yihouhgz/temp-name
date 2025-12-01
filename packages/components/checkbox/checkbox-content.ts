import { useRandomId } from '../_util'
import { provide, inject } from 'vue'
export type CheckboxProvider = {
  checked: boolean
}
const checkboxProviderKey = Symbol(useRandomId())
export const useCheckboxProvider = (source: CheckboxProvider) => {
  provide<CheckboxProvider>(checkboxProviderKey, source)
}
export const useCheckboxInject = () => {
  return inject<CheckboxProvider>(checkboxProviderKey)
}
