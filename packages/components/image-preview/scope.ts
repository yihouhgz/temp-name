import { provide, inject } from 'vue'
import type { VueNode } from '../_util/type'

export type ImagePreviewProvider = {
  isChildren: boolean
  setImageUrl?: (index: number, url: string) => void
  setImagePerviewTitle?: (index: number, title: VueNode) => void
  showImagePerview?: (index?: number) => void
  hideImagePerview?: () => void
  getSchedule?: () => { index: number }
}
const key = Symbol('imagePreviewProvider')
export function useImagePerviewProvider(data: ImagePreviewProvider) {
  provide(key, data)
}
export function useImagePerviewInject(init: ImagePreviewProvider) {
  return inject<ImagePreviewProvider>(key, init)
}
