import { inject } from 'vue'
import { type RowProps } from './row'
export const rowScopeKey = Symbol('rowScope')
export const useRowScope = (): RowProps | undefined => {
  try {
    return inject(rowScopeKey)
  } catch {
    return undefined
  }
}
