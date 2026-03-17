import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import type { ColumnProps, Fixed, Scroll, RowExpandable } from '../type'
import type { VueNode } from '../../_util/type'
import type {
  ExpandedRowRender,
  BodyScrollEvent,
  Size,
  Virtualized,
  TableComponents,
  RowKey,
  VirtualizedOnScroll
} from '../interface'
import type { Ref } from 'vue'
import Store from '../../_util/store'

export interface BodyProps {
  tableLayout?: 'fixed' | 'auto'
  anyColumnFixed?: boolean
  columns?: ColumnProps[]
  dataSource?: Record<string, unknown>[]
  disabledRowKeysSet: Set<unknown> // required
  emptySlot?: VueNode
  expandedRowKeys?: (string | number)[]
  expandedRowRender?: ExpandedRowRender<Record<string, unknown>>
  fixed?: Fixed
  forwardedRef?: Ref<HTMLDivElement> | ((instance: unknown) => void)
  handleBodyScroll?: (e: BodyScrollEvent) => void
  handleWheel?: (e: WheelEvent) => void
  includeHeader?: boolean
  prefixCls?: string
  scroll?: Scroll
  selectedRowKeysSet: Set<unknown> // required
  showHeader?: boolean
  size?: Size
  virtualized?: Virtualized
  components?: TableComponents
  store: Store
  groups?: Map<string, Record<string, unknown>[]>[]
  rowKey?: RowKey<Record<string, unknown>>
  childrenRecordName?: string
  rowExpandable?: RowExpandable<Record<string, unknown>>
  renderExpandIcon: (record: Record<string, unknown>, isNested: boolean) => VueNode
  headerRef?: Ref<HTMLDivElement> | ((instance: unknown) => void)
  onScroll?: VirtualizedOnScroll
  keepDOM?: boolean
}

const BodyTable = defineComponent({
  setup() {
    return () => <div>BodyTable</div>
  },
  name: prefix + '-body-table'
})
export default BodyTable
