import { provide, inject } from 'vue'
const subKey = Symbol('subKey')

export type SubContent = {
  subItems: boolean
}
export function useSubProvide(content: SubContent) {
  provide(subKey, content)
}
export function useSubInject(defaultValue: SubContent) {
  return inject<SubContent>(subKey, defaultValue)
}
