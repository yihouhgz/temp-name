import { computed, defineComponent, reactive, type Ref } from 'vue'
import { prefix } from 'constants/config'
import './style/table'
import Spin from '../spin'
import { tableProps, tableEmits } from './type'
import { isFunction } from '../_util'
import { difference, get, omit } from 'lodash'
import LocaleConsumer from '../locale/locale-consumer'
import type { BodyScrollEvent, BodyScrollPosition, TableLocale } from './interface'
import HeadTable from './headTable'
import { filterColumns as filterColumnsFn, flattenColumns as flattenColumnsFn } from './utils'
import BodyTable from './bodyTable'
import Store from '../_util/store'
// import getColumns from './getColumns'
import type { VueNode } from '../_util/type'
import type { ColumnProps, RecordType, RowSelectionProps } from './type'
import type { HeadTableProps } from './headTable'
import type { BodyProps } from './bodyTable'

type TableState = {
  rootWrapRef: HTMLDivElement | null
  wrapRef: HTMLDivElement | null
  headerWrapRef: HTMLDivElement | null
  bodyWrapRef: HTMLDivElement | null
  loading: boolean
  flattenColumns: unknown[]
  bodyHasScrollBar: boolean

  lastScrollLeft: number
  lastScrollTop: number
  scrollPosition: BodyScrollPosition
  store: Store
  disabledRowKeysSet: Set<string | number>
}
export type TableStateRowSelection =
  | (RowSelectionProps & { selectedRowKeysSet?: Set<string | number> })
  | boolean
export interface RenderTableProps extends HeadTableProps, BodyProps {
  filteredColumns: ColumnProps
  useFixedHeader: boolean
  bodyRef: Ref<HTMLDivElement> | ((instance: unknown) => void)
  rowSelection: TableStateRowSelection
  bodyHasScrollBar: boolean
}

const Table = defineComponent({
  setup(props) {
    const state = reactive<TableState>({
      rootWrapRef: null,
      wrapRef: null,
      headerWrapRef: null,
      bodyWrapRef: null,
      loading: false,
      flattenColumns: [],
      bodyHasScrollBar: false,

      lastScrollLeft: 0,
      lastScrollTop: 0,
      scrollPosition: 'left',
      store: new Store({
        hoveredRowKey: null
      }),
      disabledRowKeysSet: new Set()
    })
    const useFixedHeader = computed(() => {
      const { scroll, sticky } = props
      if (get(scroll, 'y')) {
        return true
      }
      if (sticky) {
        return true
      }
      return false
    })
    const filteredColumns = computed(() => {
      const columns = props.columns
      return filterColumnsFn(columns)
    })
    const flattenFnsColumns = computed(() => {
      const columns = props.columns
      return flattenColumnsFn(columns)
    })
    // const anyColumnFixed = computed(() => {
    //   const columns = props.columns
    //   const children = ctx.slots.default?.()
    //   return some(getColumns(columns || columns, children), (column) => Boolean(column.fixed))
    // })
    const getTableLayout = () => {
      let isFixed = false
      const flattenColumns = state.flattenColumns
      if (Array.isArray(flattenColumns)) {
        isFixed = flattenColumns.some((column) => {
          const { ellipsis, fixed } = column as { ellipsis: boolean; fixed: boolean }
          return Boolean(ellipsis) || Boolean(fixed)
        })
      }

      if (useFixedHeader.value) {
        isFixed = true
      }

      return isFixed ? 'fixed' : 'auto'
    }
    const renderTitle = () => {
      const { title, prefixCls, dataSource } = props
      let titleNode = title
      if (isFunction(title)) {
        titleNode = title(dataSource)
      }
      return titleNode ? <div class={`${prefixCls}-title`}>{titleNode}</div> : null
    }
    const renderEmpty = (props: {
      prefixCls: string
      empty: VueNode
      dataSource: RecordType[]
    }) => {
      const { prefixCls, empty, dataSource } = props
      const wrapCls = `${prefixCls}-placeholder`

      if (!dataSource.length) {
        return null
      }
      return (
        <LocaleConsumer componentName="Table" key={'emptyText'}>
          {(locale: TableLocale) => (
            <div class={wrapCls}>
              <div class={`${prefixCls}-empty`}>{empty || locale.emptyText}</div>
            </div>
          )}
        </LocaleConsumer>
      )
    }
    const onHeaderRow = () => {}
    const handleBodyScrollLeft = (e: BodyScrollEvent) => {
      if (e.currentTarget !== e.target) {
        return
      }
      const target = e.target as { scrollLeft: number }
      const { lastScrollLeft } = state
      const headTable = state.headerWrapRef
      const bodyTable = state.bodyWrapRef
      if (target.scrollLeft !== lastScrollLeft) {
        if (target === bodyTable && headTable) {
          headTable.scrollLeft = target.scrollLeft
        } else if (target === headTable && bodyTable) {
          bodyTable.scrollLeft = target.scrollLeft
        }
        setScrollPositionClassName()
      }
      state.lastScrollLeft = target.scrollLeft
    }
    const setScrollPositionClassName = () => {
      const node = state.bodyWrapRef
      if (node && node.children && node.children.length) {
        const scrollToLeft = node.scrollLeft === 0
        // why use Math.abs? @see https://bugzilla.mozilla.org/show_bug.cgi?id=1447743
        const scrollToRight =
          Math.abs(node.scrollLeft) + 1 >=
          node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width
        if (scrollToLeft && scrollToRight) {
          setScrollPosition('both')
        } else if (scrollToLeft) {
          setScrollPosition('left')
        } else if (scrollToRight) {
          setScrollPosition('right')
        } else if (state.scrollPosition !== 'middle') {
          setScrollPosition('middle')
        }
      }
    }
    const setScrollPosition = (position: BodyScrollPosition) => {
      const { prefixCls } = props
      const positionAll = [
        `${prefixCls}-scroll-position-both`,
        `${prefixCls}-scroll-position-middle`,
        `${prefixCls}-scroll-position-left`,
        `${prefixCls}-scroll-position-right`
      ]
      state.scrollPosition = position
      const tableNode = state.wrapRef
      if (tableNode && tableNode.nodeType) {
        if (position === 'both') {
          const acceptPosition = [
            `${prefixCls}-scroll-position-left`,
            `${prefixCls}-scroll-position-right`
          ]
          tableNode.classList.remove(...difference(positionAll, acceptPosition))
          tableNode.classList.add(...acceptPosition)
        } else {
          const acceptPosition = [`${prefixCls}-scroll-position-${position}`]
          tableNode.classList.remove(...difference(positionAll, acceptPosition))
          tableNode.classList.add(...acceptPosition)
        }
      }
    }
    const handleWheel = () => {}
    const handleBodyScroll = () => {}
    const renderTable = (props: RenderTableProps) => {
      const {
        filteredColumns,
        fixed,
        useFixedHeader,
        scroll,
        prefixCls,
        anyColumnFixed,
        includeHeader,
        showHeader,
        components,
        headerRef,
        bodyRef,
        onHeaderRow,
        rowSelection,
        dataSource,
        bodyHasScrollBar,
        disabledRowKeysSet,
        sticky
      } = props

      const selectedRowKeysSet = get(rowSelection, 'selectedRowKeysSet', new Set())
      const tableLayout = getTableLayout()

      const headTable = useFixedHeader ? (
        <HeadTable
          key="head"
          tableLayout={tableLayout}
          ref={headerRef}
          columns={filteredColumns}
          prefixCls={prefixCls}
          fixed={fixed}
          handleBodyScroll={handleBodyScrollLeft}
          components={components}
          scroll={scroll}
          showHeader={showHeader}
          selectedRowKeysSet={selectedRowKeysSet}
          onHeaderRow={onHeaderRow}
          dataSource={dataSource}
          bodyHasScrollBar={bodyHasScrollBar}
          sticky={sticky}
        />
      ) : null

      const bodyTable = (
        <BodyTable
          {...omit(props, ['rowSelection', 'headWidths'])}
          key="body"
          ref={bodyRef}
          columns={filteredColumns}
          fixed={fixed}
          prefixCls={prefixCls}
          handleWheel={handleWheel}
          handleBodyScroll={handleBodyScroll}
          anyColumnFixed={anyColumnFixed}
          tableLayout={tableLayout}
          includeHeader={includeHeader}
          showHeader={showHeader}
          scroll={scroll}
          components={components}
          store={state.store}
          selectedRowKeysSet={selectedRowKeysSet}
          disabledRowKeysSet={disabledRowKeysSet}
        />
      )
      return [headTable, bodyTable]
    }
    const renderFooter = (props: {
      footer?: VueNode | ((dataSource: RecordType[]) => VueNode)
      prefixCls: string
      dataSource: RecordType[]
    }) => {
      let { footer } = props
      const { prefixCls, dataSource } = props

      if (typeof footer === 'function') {
        footer = footer(dataSource)
      }
      if (footer) {
        return (
          <div class={`${prefixCls}-footer`} key="footer">
            {footer}
          </div>
        )
      }
      return null
    }
    const renderMainTable = (props) => {
      const fixedHeader = useFixedHeader.value
      const emptySlot = renderEmpty(props)
      const table = [
        renderTable({
          ...props,
          fixed: false,
          useFixedHeader,
          headerRef: (node) => {
            state.headerWrapRef = node as HTMLDivElement
          },
          bodyRef: (node) => {
            state.bodyWrapRef = node as HTMLDivElement
          },
          includeHeader: !fixedHeader,
          emptySlot
        }),
        renderFooter(props)
      ]
      return table
    }
    return () => {
      const { prefixCls, direction } = props
      const { loading } = state
      return (
        <div
          ref={(node) => {
            state.rootWrapRef = node as HTMLDivElement
          }}
          class={[`${prefixCls}-wrapper`, `${prefixCls}-wrapper-${direction}`]}
        >
          <Spin spinning={loading} size="large">
            <div
              ref={(node) => {
                state.wrapRef = node as HTMLDivElement
              }}
            >
              {renderTitle()}
              <div class={`${prefixCls}-container`}>{renderMainTable(props)}</div>
            </div>
          </Spin>
        </div>
      )
    }
  },
  props: tableProps,
  emits: tableEmits,
  name: prefix + '-table'
})
export default Table
