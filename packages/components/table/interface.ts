import type { VueNode } from '../_util/type'
import type { Locale } from '../locale'
import type { Component } from 'vue'
import type { ColumnProps } from './type'
import type { strings } from './constants'

export type TableComponent<P> = Component<P> | keyof HTMLElementTagNameMap | VueNode

export interface TableComponents {
  table?: TableComponent<unknown>
  header?: {
    outer?: TableComponent<unknown>
    wrapper?: TableComponent<unknown>
    row?: TableComponent<unknown>
    cell?: TableComponent<unknown>
  }
  body?: {
    outer?: TableComponent<unknown>
    wrapper?: TableComponent<unknown>
    row?: TableComponent<unknown>
    cell?: TableComponent<unknown>
    colgroup?: {
      wrapper?: TableComponent<unknown>
      col?: TableComponent<unknown>
    }
  }
  footer?: {
    wrapper?: TableComponent<unknown>
    row?: TableComponent<unknown>
    cell?: TableComponent<unknown>
    outer?: TableComponent<unknown>
  }
}
export interface BodyScrollEvent extends Omit<UIEvent, 'currentTarget' | 'target'> {
  [x: string]: unknown
  currentTarget: unknown
  target: unknown
}
export type TableLocale = Locale['Table']
export type BodyScrollPosition = 'both' | 'middle' | 'left' | 'right'
export type OnHeaderRowReturnObject = Omit<HTMLTableRowElement, 'ref' | 'style'>
export type OnHeaderRow = (columns?: ColumnProps, index?: number) => OnHeaderRowReturnObject
export type Sticky =
  | boolean
  | {
      top?: number
    }

export type ExpandedRowRender<RecordType> = (
  record?: RecordType,
  index?: number,
  expanded?: boolean
) => VueNode
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
export type Size = ArrayElement<typeof strings.SIZES>

export type VirtualizedOnScrollArgs = {
  scrollDirection?: 'forward' | 'backward'
  scrollOffset?: number
  scrollUpdateWasRequested?: boolean
}
export type VirtualizeItemSizeRow = {
  sectionRow?: boolean
  expandedRow?: boolean
}
export type VirtualizedItemSizeFn = (index?: number, row?: VirtualizeItemSizeRow) => number
export type VirtualizedItemSize = number | VirtualizedItemSizeFn
export type VirtualizedOnScroll = (object: VirtualizedOnScrollArgs) => void
export interface VirtualizedProps {
  [x: string]: unknown
  itemSize?: VirtualizedItemSize
  onScroll?: VirtualizedOnScroll
}
export type Virtualized = boolean | VirtualizedProps

export type BaseRowKeyType = string | number
export type RowKey<RecordType> = BaseRowKeyType | ((record?: RecordType) => string)

export interface Data {
  [x: string]: unknown
  key?: string | number
}
