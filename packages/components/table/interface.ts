import type { VueNode } from '../_util/type'
import type { Locale } from '../locale'

export interface TableComponents {
  table?: VueNode
  header?: {
    outer?: VueNode
    wrapper?: VueNode
    row?: VueNode
    cell?: VueNode
  }
  body?: {
    outer?: VueNode
    wrapper?: VueNode
    row?: VueNode
    cell?: VueNode
    colgroup?: {
      wrapper?: VueNode
      col?: VueNode
    }
  }
  footer?: {
    wrapper?: VueNode
    row?: VueNode
    cell?: VueNode
    outer?: VueNode
  }
}
export interface BodyScrollEvent extends Omit<UIEvent, 'currentTarget' | 'target'> {
  [x: string]: unknown
  currentTarget: unknown
  target: unknown
}
export type TableLocale = Locale['Table']
export type BodyScrollPosition = 'both' | 'middle' | 'left' | 'right'
