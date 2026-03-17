import { defineComponent } from 'vue'
import type { ColumnProps, Fixed, Scroll } from './type'
import type { TableComponents, BodyScrollEvent, OnHeaderRow, Sticky } from './interface'
import type { Ref } from 'vue'

type VueEventHandler<T extends BodyScrollEvent = BodyScrollEvent> = (event: T) => void

export interface HeadTableProps {
  tableLayout?: 'fixed' | 'auto'
  bodyHasScrollBar?: boolean
  columns?: ColumnProps[]
  components?: TableComponents
  dataSource?: Record<string, unknown>[]
  fixed?: Fixed
  handleBodyScroll?: VueEventHandler<BodyScrollEvent>
  prefixCls?: string
  forwardedRef?: Ref<HTMLDivElement> | ((instance: unknown) => void)
  scroll?: Scroll
  selectedRowKeysSet: Set<unknown>
  showHeader?: boolean
  onDidUpdate?: (ref: Ref<unknown>) => void
  onHeaderRow?: OnHeaderRow
  sticky?: Sticky
}

const HeadTable = defineComponent({
  setup() {},
  name: 'HeadTable'
})
export default HeadTable
