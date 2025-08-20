import { inject } from 'vue'
export const formInjectionKey = Symbol('form')
export const useFormScope = () => {
  const form = inject(formInjectionKey)
  return {
    form
  }
}
