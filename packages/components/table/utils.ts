import { filter, isNull } from 'lodash'
import { strings } from './constants'
import { isFunction, isUndefined } from '../_util'

export function filterColumns(
  columns: Record<string, unknown>[],
  ignoreKeys = [strings.DEFAULT_KEY_COLUMN_SCROLLBAR as string]
) {
  return filter(columns, (col) => !ignoreKeys.includes(col.key as string))
}
export function warnIfNoDataIndex(column: Record<string, unknown>) {
  if (typeof column === 'object' && column !== null) {
    const { filters, sorter, dataIndex, onFilter } = column
    if (
      ((Array.isArray(filters) || isFunction(onFilter) || isFunction(sorter)) &&
        isNull(dataIndex)) ||
      isUndefined(dataIndex)
    ) {
      console.warn(`The Table column with sorter or filter must pass the 'dataIndex' prop`)
    }
  }
}
export function flattenColumns(
  cols: Record<string, unknown>[],
  childrenColumnName = 'children'
): Record<string, unknown>[] {
  const list = []
  if (Array.isArray(cols) && cols.length) {
    for (const col of cols) {
      if (Array.isArray(col[childrenColumnName]) && col[childrenColumnName].length) {
        list.push(...flattenColumns(col[childrenColumnName], childrenColumnName))
      } else {
        warnIfNoDataIndex(col)
        list.push(col)
      }
    }
  }

  return list
}
