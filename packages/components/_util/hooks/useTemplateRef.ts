import { getCurrentInstance, shallowRef, type ShallowRef } from 'vue'
export const useTemplateRef = <T>(key: string): Readonly<ShallowRef<T | null>> => {
  const templateRef = shallowRef(null)
  const currentInstance = getCurrentInstance()
  if (currentInstance) {
    const refs = (currentInstance.refs = { ...(currentInstance.refs || {}) })
    Object.defineProperty(refs, key, {
      enumerable: true,
      get: () => templateRef.value,
      set: (value) => (templateRef.value = value)
    })
  }
  return templateRef
}

export const useTemplateRefs = <T>(keys: string[]): Readonly<ShallowRef<T | null>>[] => {
  const templateRefs = []
  for (const key of keys) {
    const templateRef = useTemplateRef<T>(key)
    templateRefs.push(templateRef)
  }
  return templateRefs
}
