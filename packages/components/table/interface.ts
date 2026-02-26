import type { VueNode } from '../_util/type'
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
