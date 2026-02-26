import type { PropType } from 'vue'
import type { TableComponents } from './interface'
import type { VueNode } from '../_util/type'
import { isArray, isBoolean, isNumber, isObject } from '../_util'

export const tableProps = {
  /**
   * @zh 是否展示外边框和列边框
   * @en Whether to show the outer border and column border
   */
  bordered: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 树形表格 dataSource 中每行元素中表示子级数据的字段，默认为 children
   * @en Tree table dataSource each row element represents the field of sub-level data, defaults to children
   */
  childrenRecordName: {
    type: String,
    default: 'children'
  },
  /**
   * @zh 点击分组表头行时分组内容展开或收起
   * @en Click the group header row to expand or collapse the group content
   */
  clickGroupedRowToExpand: {
    type: Boolean,
    default: true
  },
  /**
   * @zh 表格列的配置描述，详见Column
   * @en Table column configuration, see Column for details
   */
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  /**
   * @zh 覆盖 Table 的组成元素，如 table, body，row，td，th 等
   * @en Reset the components of Table, such as table, body, row, td, th etc.
   */
  components: {
    type: Object as PropType<TableComponents>,
    default: () => ({})
  },
  /**
   * @zh 数据。请为每一条数据分配一个独立的 key，或使用 rowKey 指定一个作为主键的属性名
   * @en data . Please assign a unique key to each piece of data, or use rowKey to specify a property name as the primary key
   */
  dataSource: {
    type: Array as PropType<RecordType[]>,
    default: () => []
  },
  /**
   * @zh 默认是否展开所有行，动态加载数据时不生效
   * @en Default whether to expand all rows, does not take effect when dynamic loading data
   */
  defaultExpandAllRows: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 默认展开所有分组行，动态加载数据时不生效
   * @en Default to expand all group rows, does not take effect when dynamic loading data
   */
  defaultExpandAllGroupRows: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 默认展开的行 key 数组
   * @en Array of keys of default expanded rows
   */
  defaultExpandedRowKeys: {
    type: Array as PropType<unknown[]>,
    default: () => []
  },
  /**
   * @zh RTL、LTR 方向，默认值等于 ConfigProvider direction，可在此单独配置 Table 的 direction
   * @en RTL or LTR direction, default value is equal to ConfigProvider direction, you can configure the direction of Table separately
   */
  direction: {
    type: String as PropType<'ltr' | 'rtl'>,
    values: ['ltr', 'rtl'],
    default: 'ltr'
  },
  /**
   * @zh 无数据时展示的内容
   * @en Content displayed when there is no data
   */
  empty: {
    type: [String, Object] as PropType<string | VueNode>,
    default: '暂无数据'
  },
  /**
   * @zh 展开图标所在列是否固定，与 Column 中的 fixed 取值相同
   * @en Whether the column where the icon is located is fixed, is the same as the value of "fixed" in Column
   */
  expandCellFixed: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: false
  },
  /**
   * @zh 自定义展开按钮，传 false 关闭默认的渲染
   * @en Customize the expand button and pass false to disable the default rendering
   */
  expandIcon: {
    type: [String, Object, Boolean, Function] as PropType<
      string | VueNode | boolean | ((expanded: boolean) => VueNode)
    >
  },
  /**
   * @zh 展开的行，传入此参数时行展开功能将受控
   * @en When this parameter is passed in, the row expansion function will be controlled
   */
  expandedRowKeys: {
    type: Array as PropType<(string | number)[]>
  },
  /**
   * @zh 额外的展开行。请为每一条数据分配一个独立的 key，或使用 rowKey 指定一个作为主键的属性名
   * @en Additional expansion rows. Please assign an independent key to each piece of data, or use the "rowKey" to specify an attribute name as the primary key
   */
  expandedRowRender: {
    type: Function as PropType<(record: object, index: number, expanded: boolean) => VueNode>
  },
  /**
   * @zh 是否展开所有行
   * @en Whether to expand all rows
   */
  expandAllRows: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 是否展开所有分组行
   * @en Whether to expand all group rows
   */
  expandAllGroupRows: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 是否点击行展开
   * @en Whether to click the row to expand
   */
  expandRowByClick: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 表格尾部
   * @en Table footer
   */
  footer: {
    type: [String, Function, Object] as PropType<VueNode | ((pageData: object) => VueNode)>
  },
  /**
   * @zh 返回虚拟化表格所用 VariableSizeList 的 ref，仅在配置 virtualized 时有效
   * @en Returns the ref of the VariableSizeList used by the virtualized table, only valid when virtualized is configured
   */
  getVirtualizedListRef: {
    type: Function as PropType<(ref: Record<string, unknown>) => void>
  },
  /**
   * @zh 分组依据，一般为 dataSource 元素中某个键名或者返回值为字符串、数字的一个方法
   * @en Grouping basis, usually the key name of dataSource elements or a method that returns a string or number
   */
  groupBy: {
    type: [Number, String, Function] as PropType<
      number | string | ((record: RecordType) => string | number)
    >
  },
  /**
   * @zh 当表格可展开时，展开按钮默认会与第一列文案渲染在同一个单元格内，设为 false 时默认将展开按钮单独作为一列渲染
   * @en When the table is expandable, the expand button will be rendered in the same cell as the first column text by default. Set it to false to render the expand button as a separate column by default
   */
  hideExpandedColumn: {
    type: Boolean,
    default: true
  },
  /**
   * @zh 树形结构 TableCell 的缩进大小
   * @en The indentation size of the tree-shaped structure TableCell
   */
  indentSize: {
    type: Number,
    default: 20
  },
  /**
   * @zh 是否保持 DOM 结构折叠行时是否不销毁被折叠的 DOM
   * @en Whether to keep the DOM structure when collapsing rows. Whether to destroy the DOM of collapsed DOMs when collapsing rows
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 是否显示加载中状态
   * @en Whether to show loading state
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 分页配置
   * @en Pagination configuration
   */
  pagination: {
    type: [Boolean, Object] as PropType<boolean | TablePaginationProps>,
    default: true
  },
  /**
   * @zh 样式名前缀
   * @en Style name prefix
   */
  prefixCls: {
    type: String
  },
  /**
   * @zh 列配置项表头渲染方法
   * @en Column configuration item table header rendering method
   */
  renderGroupSection: {
    type: Function as PropType<(groupKey?: string | number, group?: string[] | number[]) => VueNode>
  },
  /**
   * @zh 自定义分页器渲染方法
   * @en Custom pagination rendering method
   */
  renderPagination: {
    type: Function as PropType<(paginationProps?: TablePaginationProps) => VueNode>
  },
  /**
   * @zh 是否开启伸缩列功能，需要进行伸缩的列必须要提供 width 的值
   * @en Whether to enable the resizable column function, the width value needs to be provided to the column that needs to be resized
   */
  resizable: {
    type: [Boolean, Object] as PropType<boolean | Resizable>,
    default: false
  },
  /**
   * @zh 传入该参数时，Table 作行渲染时会调用该函数，返回值用于判断该行是否可展开，返回值为 false 时关闭可展开按钮的渲染
   * @en When this parameter is passed in, the Table will call this function when rendering rows.
   * The return value is used to determine whether the row can be expanded.
   * If the return value is false, the rendering of the expandable button will be disabled
   */
  rowExpandable: {
    type: Function as PropType<(record: Record<string, unknown>) => boolean>
  },
  /**
   * @zh 表格行 key 的取值，可以是字符串或一个函数
   * @en The value of the table row key can be a string or a function
   */
  rowKey: {
    type: [String, Function] as PropType<string | ((record: RecordType) => string)>
  },
  /**
   * @zh 表格行是否可选择，详见 rowSelection
   * @en Whether the table rows can be selected, please refer to "rowSelection"
   */
  rowSelection: {
    type: Object as PropType<TableRowSelection>
  },
  /**
   * @zh 表格是否可滚动，配置滚动区域的宽或高，详见 scroll
   * @en Whether the table can be scrolled, and how to configure the width or height of the scrolling area, please refer to "scroll"
   */
  scroll: {
    type: Object as PropType<TableRowScroll>
  },
  /**
   * @zh 表格是否显示表头
   * @en Whether the table header is displayed
   */
  showHeader: {
    type: Boolean,
    default: true
  },
  /**
   * @zh 表格尺寸，影响表格行 padding
   * @en Table size affects table row padding
   * @values 'small', 'default', 'large'
   */
  size: {
    type: String as PropType<TableSize>,
    values: ['small', 'default', 'large'],
    default: 'default'
  },
  /**
   * @zh 固定表头
   * @en Fixed header
   */
  sticky: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 表格标题
   * @en Table title
   */
  title: {
    type: [String, Object, Function] as PropType<VueNode | ((pageData: RecordType[]) => VueNode)>
  },
  /**
   * @zh 虚拟化配置
   * @en Virtualization configuration
   */
  virtualized: {
    type: [Boolean, Object] as PropType<
      | boolean
      | {
          itemSize: number | ((index: number) => number)
          onScroll: (
            scrollDirection?: 'forward' | 'backward',
            scrollOffset?: number,
            scrollUpdateWasRequested?: boolean
          ) => void
        }
    >,
    default: false
  }
}

type TableSize = 'small' | 'default' | 'large'
type RecordType = Record<string, unknown>
type TablePaginationProps = {
  total: number
}
type Resizable = {
  defaultWidth: number
}
type TableColumn = {
  title: string
}
type TableRowSelection = {
  selectedRowKeys: string[]
  onChange: (selectedRowKeys: string[], selectedRows: RecordType[]) => void
}
type TableRowScroll = {
  x: number
}

export const tableEmits = {
  /**
   * @zh 分页、排序、筛选变化时触发
   * @en Triggered when pagination, sorting, and filtering changes
   */
  change: (data: {
    pagination: TablePaginationProps
    filters: Array<unknown>
    sorter: object
    extra: { changeType: 'sorter' | 'filter' | 'pagination' }
  }) => isObject(data),
  /**
   * @zh 点击展开行时触发
   * @en Triggered when the expand row is clicked
   */
  expand: (expanded: boolean, record: RecordType, DOMEvent: MouseEvent) => {
    return isBoolean(expanded) && isObject(record) && DOMEvent instanceof MouseEvent
  },
  /**
   * @zh 展开的行变化时触发
   * @en Triggered when the expanded row changes
   */
  expandedRowsChange: (rows: RecordType[]) => {
    return isArray(rows)
  },
  /**
   * @zh 类似于 onRow，不过这个参数单独用于定义分组表头的行属性
   * @en Similar to "onRow", but this parameter is used exclusively to define the row properties of the grouped table headers
   */
  groupedRow: (record: RecordType, index: number) => {
    return isObject(record) && isNumber(index)
  },
  /**
   * @zh 设置头部行属性，返回的对象会被合并传给表头行
   * @en Set the header row properties, and the returned object will be merged and passed to the table header row
   */
  headerRow: (columns: unknown[], index: number) => {
    return isArray(columns) && isNumber(index)
  },
  /**
   * @zh 设置行属性，返回的对象会被合并传给表格行
   * @en Set the row properties, and the returned object will be merged and passed to the row
   */
  row: (record: RecordType, index: number) => {
    return isObject(record) && isNumber(index)
  }
}
