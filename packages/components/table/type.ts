import type { PropType, VNode, ExtractPublicPropTypes, Component } from 'vue'
import type { TableComponents } from './interface'
import type { VueNode } from '../_util/type'
import { isArray, isBoolean, isNumber, isObject } from '../_util'
import { prefix } from 'constants/config'
import { strings } from './constants'
import type { DropdownProps } from '../dropdown/dropdown'

export type RowExpandable<RecordType> = (record?: RecordType) => boolean

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
    type: String,
    default: prefix + '-table'
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
    type: Function as PropType<RowExpandable<RecordType>>
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

export const columnProps = {
  /**
   * @zh 设置列的对齐方式，在 RTL 时会自动切换
   * @en Set the alignment of the column, and it will be automatically switched in RTL
   */
  align: {
    type: String as PropType<Align>,
    values: strings.ALIGNS,
    default: 'left'
  },
  /**
   * @zh 表头合并时用于子列的设置
   * @en Table header merge settings for subcolumns
   */
  children: {
    //ExtractPropTypes<typeof columnProps>[]
    type: Array as PropType<Array<unknown>>
  },
  /**
   * @zh 表头列合并，设置为 0 时，不渲染
   * @en Table header column merge, set to 0 to not render
   */
  colSpan: {
    type: Number
  },
  /**
   * @zh 列数据在数据项中对应的 key，使用排序或筛选时必传，且需要保持不重复
   * @en Column data corresponding to the key in the data item, required when sorting or filtering, and needs to be kept non-repeated
   */
  dataIndex: {
    type: String
  },
  /**
   * @zh 筛选的默认值，值为已筛选的 value 数组
   * @en Filtered default value, the value array of the filtered value
   */
  defaultFilteredValue: {
    type: Array as PropType<unknown[]>
  },
  /**
   * @zh 排序的默认值，可设置为 'ascend'|'descend'|false
   * @en Sorting default value, can be set to 'ascend'|'descend'|false
   */
  defaultSortOrder: {
    type: [String, Boolean] as PropType<SortOrder>,
    default: false
  },
  /**
   * @zh 文本缩略，开启后 table-layout 会自动切换为 fixed
   * @en Text abbreviation, after opening, the table-layout will be automatically switched to fixed
   */
  ellipsis: {
    type: [Boolean, Object] as PropType<BaseEllipsis>,
    default: false
  },
  /**
   * @zh 是否需要对子级数据进行本地过滤，开启该功能后如果子级符合过滤标准，父级即使不符合仍然会保留
   * @en Whether to filter child data locally, after opening this function, if the child meets the filtering standard, the parent even if it does not meet the standard will still be retained
   */
  filterChildrenRecord: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互
   * @en Filter menu can be customized, this function only responsible for rendering layers, need to write various interactions yourself
   */
  filterDropdown: {
    type: [String, Object] as PropType<string | VNode | (() => VNode)>
  },
  /**
   * @zh 透传给 Dropdown 的属性，详情点击
   * @en Dropdown props, click for details
   */
  filterDropdownProps: {
    type: Object as PropType<DropdownProps>
  },
  /**
   * @zh 控制 Dropdown 的 visible
   * @en Dropdown visible
   */
  filterDropdownVisible: {
    type: Boolean
  },
  /**
   * @zh 自定义过滤图标
   * @en Custom filter icon
   */
  filterIcon: {
    type: [Function, Object, Boolean] as PropType<
      boolean | VueNode | ((filtered: boolean) => VueNode)
    >
  },
  /**
   * @zh 是否多选
   * @en Whether to select multiple
   */
  filterMultiple: {
    type: Boolean,
    default: true
  },
  /**
   * @zh 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组
   * @en Filter state controlled by the external world, which is an array of value of the filtered column
   */
  filteredValue: {
    type: Array as PropType<unknown[]>
  },
  /**
   * @zh 表头的筛选菜单项
   * @en The filter menu items of the header
   */
  filters: {
    type: Array as PropType<Filter[]>
  },
  /**
   * @zh 列是否固定，可选 true(等效于 left) 'left' 'right'，在 RTL 时会自动切换
   * @en Column is fixed, optional true (equivalent to left) 'left' 'right', will automatically switch in RTL
   */
  fixed: {
    type: [Boolean, String] as PropType<Fixed>,
    default: false
  },
  /**
   * @zh Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
   * @en Vue needed key, if you have already set a unique dataIndex, you can ignore this property
   */
  key: {
    type: String
  },
  /**
   * @zh 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并
   * @en Create a rendering function that generates complex data, the parameters are the value of the current row, the current row data, the row index,
   * @return can set the table row/column merge
   */
  render: {
    type: Function as PropType<
      (
        text: unknown,
        record: RecordType,
        index: number,
        options: { expandIcon?: VueNode; selection?: VueNode; indentText?: VueNode }
      ) => VueNode | Record<string, unknown>
    >
  },
  /**
   * @zh 自定义筛选器 dropdown 面板，用法详见自定义筛选器
   * @en Custom filter dropdown panel, see Custom Filter for details
   */
  renderFilterDropdown: {
    type: Function as PropType<(props?: RenderFilterDropdownProps) => VueNode>
  },
  /**
   * @zh 自定义每个筛选项渲染方式，用法详见自定义筛选项渲染
   * @en Custom each filter option rendering, see Custom Filter Option Rendering for details
   */
  renderFilterDropdownItem: {
    type: Function as PropType<
      (props: {
        value: unknown
        text: unknown
        onChange: (e: unknown) => void
        level: number
      }) => VueNode
    >
  },
  /**
   * @zh 是否开启 resize 模式，只有 Table resizable 开启后此属性才会生效
   * @en Whether to enable resize mode, only takes effect when Table resizable is enabled
   */
  resize: {
    type: Boolean
  },
  /**
   * @zh 是否展示排序提示，如果设置了 sortOrder，排序受控，则该参数不会生效
   * @en Wherthe sorting tip is displayed, if sortOrder is set, sorting is controlled, and this parameter will not take effect
   */
  showSortTip: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 是否对子级数据进行本地排序
   * @en Whether to sort child data locally
   */
  sortChildrenRecord: {
    type: Boolean
  },
  /**
   * @zh 排序的受控属性，外界可用此控制列的排序，可设置为 'ascend'|'descend'|false
   * @en Sorting controlled property, which can be set to 'ascend'|'descend'|false
   */
  sortOrder: {
    type: [String, Boolean] as PropType<SortOrder>
  },
  /**
   * @zh 排序函数，本地排序使用一个函数 (参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true。必须给排序列设置一个独立的 dataIndex，必须为 dataSource 里面的每条数据项设置独立的 key
   * @en Sorting function, local sorting uses a function (refer to Array.sort compareFunction), needs server-side sorting to be set to true. You must give the sorted column a separate dataIndex, and you must set a separate key for each data item in dataSource
   */
  sorter: {
    type: Function as PropType<(props: { sortOrder: SortOrder }) => VueNode>
  },
  /**
   * @zh 自定义控制单元格是否渲染。默认 cell 会深对比 props 和 nextProps 是否变化，来决定是否渲染单元格。如果你的 props 中的 record 比较复杂，建议使用 shouldCellUpdate 接管单元格的渲染。
   * @en Costomize whether to render the cell. The default cell will compare whether the props and nextProps are different to determine whether to render the cell. If your props record is complex, it is recommended to use shouldCellUpdate to take over the rendering of the cell.
   */
  shouldCellUpdate: {
    type: Function as PropType<(props: TableCellProps, prevProps: TableCellProps) => boolean>
  },
  /**
   * @zh 列头显示文字。传入 function 时，title 将使用函数的返回值；传入其他类型，将会和 sorter、filter 进行聚合。需要搭配 useFullRender 获取函数类型中的 filter 等参数
   * @en Cloumn header text. When the title is passed as a function, the title will use the return value of the function; when the type is other types, it will be aggregated with sorter and filter. Need to use useFullRender to get the function type parameters such as filter
   */
  title: {
    type: [Function, Object] as PropType<
      VueNode | ((props: { filter: VueNode; sorter: VueNode; selection: VueNode }) => VueNode)
    >
  },
  /**
   * @zh 是否完全自定义渲染，用法详见完全自定义渲染，开启此功能会造成一定的性能损耗
   * @en Whether to fully customize the rendering, see Fully Customized Rendering, enabling this feature will cause some performance losses
   */
  useFullRender: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 列的宽度
   * @en Column width
   */
  width: {
    type: [String, Number]
  }
}
export const columnEmits = {
  /**
   * @zh 设置单元格属性
   * @en Set cell attributes
   */
  cell: (record: RecordType, rowIndex: number) => {
    return isObject(record) && isNumber(rowIndex)
  },
  /**
   * @zh 本地模式下，确定筛选的运行函数。必须给筛选列设置一个独立的 dataIndex，必须为 dataSource 里面的每条数据项设置独立的 key
   * @en Local mode, the running function of filtering. You must give the filter column a separate dataIndex, and must set a separate key for each data item in dataSource
   */
  filter: (filteredValue: unknown, record: RecordType) => {
    return filteredValue && isObject(record)
  },
  /**
   * @zh 自定义筛选菜单可见变化时回调
   * @en Callback when the visibility of the custom filter menu changes
   */
  filterDropdownVisibleChange: (visible: boolean) => {
    return isBoolean(visible)
  },
  /**
   * @zh 设置头部单元格属性
   * @en Set the attributes of the header cell
   */
  headerCell: (column: RecordType, columnIndex: number) => {
    return isObject(column) && isNumber(columnIndex)
  }
}

export const rowSelectionProps = {
  /**
   * @zh 表头的 Checkbox 是否禁用
   * @en Table header checkbox disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @zh fixed	把选择框列固定在左边
   * @en Fixed selection box column to the left
   */
  fixed: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 选择框的默认属性配置
   * @en Selection box default property configuration
   */
  getCheckboxProps: {
    type: Function as PropType<(record: Record<string, unknown>) => Record<string, unknown>>
  },
  /**
   * @zh 是否隐藏列
   * @en Whether to hide column
   */
  hidden: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 自定义渲染勾选框
   * @en Costomize rendering checkbox
   */
  renderCell: {
    type: Function as PropType<
      (props: {
        selected: boolean
        record: RecordType
        originNode: VueNode
        inHeader: boolean
        disabled: boolean
        indeterminate: boolean
        index?: number
        selectRow?: (selected: boolean, e: Event) => void
        selectAll?: (selected: boolean, e: Event) => void
      }) => VNode
    >
  },
  /**
   * @zh 指定选中项的 key 数组，需要和 onChange 进行配合
   * @en Specify the selected item key array, which needs to be used with onChange
   */
  selectedRowKeys: {
    type: Array as PropType<string[]>
  },
  /**
   * @zh 自定义控制单元格是否渲染。默认 cell 会深对比 props 和 nextProps 是否变化，来决定是否渲染单元格。如果你的 props 中的 record 比较复杂，建议使用 shouldCellUpdate 接管单元格的渲染。
   * @en Costomize cell rendering. The default cell will compare whether props and nextProps have changed to decide whether to render the cell. If your props record is complex, it is recommended to use shouldCellUpdate to take over the rendering of the cell.
   */
  shouldCellUpdate: {
    type: Function as PropType<(props: TableCellProps, prevProps: TableCellProps) => boolean>
  },
  /**
   * @zh 自定义列表选择框宽度
   * @en Costume list selection box width
   */
  width: {
    type: [String, Number]
  }
}
export const rowSelectionEmits = {
  /**
   * @zh 选中项发生变化时的回调。第一个参数会保存上次选中的 row keys，即使你做了分页受控或更新了 dataSource
   * @en Callback when the selected items change. The first parameter will save the last selected row keys, even if you did pagination control or updated the dataSource
   */
  change: (selectedRowKeys: string[], selectedRows: Record<string, unknown>[]) => {
    return isArray(selectedRowKeys) && isArray(selectedRows)
  },
  /**
   * @zh 设置头部单元格属性
   * @en Set header cell attributes
   */
  headerCell: (column: RecordType, columnIndex: number) => {
    return isObject(column) && isNumber(columnIndex)
  },
  /**
   * @zh 用户手动点击某行选择框的回调
   * @en When the user clicks the checkbox of a row
   */
  select: (
    record: RecordType,
    selected: boolean,
    selectedRows: RecordType[],
    nativeEvent: MouseEvent
  ) => {
    return (
      isObject(record) &&
      isBoolean(selected) &&
      isArray(selectedRows) &&
      nativeEvent instanceof MouseEvent
    )
  },
  /**
   * @zh 用户手动点击表头选择框的回调，会选中/取消选中 dataSource 里的所有可选行
   * @en When the user clicks the checkbox in the header, all optional rows in dataSource will be selected/unselected
   */
  selectAll: (selected: boolean, selectedRows: RecordType[], changedRows: RecordType[]) => {
    return isBoolean(selected) && isArray(selectedRows) && isArray(changedRows)
  }
}
export type RowSelectionProps = ExtractPublicPropTypes<typeof rowSelectionProps>

export type TableRowScroll = {
  // 当分页、排序、筛选变化后是否自动滚动到表格顶部
  scrollToFirstRowOnChange: boolean
  // 设置横向滚动区域的宽，可以为像素值、百分比或 'max-content'
  x: `${number}px` | `${number}%` | 'max-content' | number
  // 设置纵向滚动区域的高，可以为像素值
  y: number
}
export type Scroll = TableRowScroll

export type TableCellProps = {
  column: Record<string, unknown>
}

export interface RenderFilterDropdownProps {
  /** 临时筛选值，初始值为 `filteredValue` 或 `defaultFilteredValue`  */
  tempFilteredValue: unknown[]
  /** 设置临时筛选值  */
  setTempFilteredValue: (tempFilteredValue: unknown[]) => void
  /** `confirm` 默认会将 `tempFilteredValue` 赋值给 `filteredValue` 并触发 `onChange` 事件。你也可以通过传入 `filteredValue` 直接设置筛选值  */
  confirm: (props?: { closeDropdown?: boolean; filteredValue?: unknown[] }) => void
  /** 清除筛选值、临时筛选值  */
  clear: (props?: { closeDropdown?: boolean }) => void
  /** 关闭 dropdown  */
  close: () => void
  /** 筛选器配置项，如不需要可以不传  */
  // filters?: RenderDropdownProps['filters']
}
export type Fixed = boolean | 'left' | 'right'
export interface BaseFilter {
  value?: unknown
  text?: unknown
  children?: BaseFilter[]
}
export interface Filter extends BaseFilter {
  value?: unknown
  text?: VueNode
  children?: Filter[]
}
export type SortOrder = 'ascend' | 'descend' | false
export type BaseEllipsis = boolean | { showTitle: boolean }
export type ColumnProps = ExtractPublicPropTypes<typeof columnProps>
export type Align = 'left' | 'center' | 'right'
export type TableSize = 'small' | 'default' | 'large'
export type RecordType = Record<string, unknown>
type TablePaginationProps = {
  total: number
}
export type Resizable = {
  //表格列改变宽度时触发
  onResize: (column: ColumnProps) => ColumnProps
  //表格列开始改变宽度时触发
  onResizeStart: (column: ColumnProps) => ColumnProps
  //表格列停止改变宽度时触发
  onResizeStop: (column: ColumnProps) => ColumnProps
}
type TableColumn = {
  title: string
}
type TableRowSelection = {
  selectedRowKeys: string[]
  onChange: (selectedRowKeys: string[], selectedRows: RecordType[]) => void
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
