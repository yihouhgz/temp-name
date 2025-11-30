import { useRandomId } from '../_util'
import { provide, inject, type ExtractPublicPropTypes } from 'vue'
import type { Size } from './type'
import { resizeItemProps } from './type'

export type ResizeContent = {
  changeItem: Set<(size: Size, e: Event, direction: string) => void>
  resizeStartItem: Set<(e: Event, direction: string) => void>
  resizeEndItem: Set<(e: Event, direction: string) => void>
  itemProps: Set<ExtractPublicPropTypes<typeof resizeItemProps>>
}

const contentKey = useRandomId()
export const getInjectResizeContent = () => {
  return inject<ResizeContent>(contentKey)
}
export const provideResizeContent = <T extends Record<string, unknown>>(values: T) => {
  provide<T>(contentKey, values)
}
