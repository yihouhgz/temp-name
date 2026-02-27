import { omit } from 'lodash'
import type { VueNode } from '../_util/type'
import Column from './column'
import type { ColumnProps } from './type'
import { isArray } from '../_util'
export default function getColumns(children: VueNode) {
  if (isArray(children)) {
    const columns: ColumnProps[] = []
    for (const child of children) {
      if (child.type === Column) {
        const col = omit(child.props, ['children'])
        if (isArray(child.props.children) && child.props.children.length) {
          col.children = getColumns(child.props.children)
        }
        columns.push({
          key: child.key,
          ...col
        })
      }
    }
    return columns
  }
  return []
}
