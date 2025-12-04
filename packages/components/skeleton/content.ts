import { provide, inject } from 'vue'

const skeletonKey = Symbol('skeleton')
export type ProvideSkeleton = {
  active: boolean
}
export const useProvideSkeleton = (source: ProvideSkeleton) => provide(skeletonKey, source)
export const useInjectSkeleton = (defaultValue: ProvideSkeleton | null) =>
  inject<ProvideSkeleton | null>(skeletonKey, defaultValue)
