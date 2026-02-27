export const strings = {
  SIZE_SMALL: 'small',
  SIZE_MIDDLE: 'middle',
  SIZES: ['small', 'default', 'middle'],
  LAYOUTS: ['', 'auto', 'fixed'],
  PAGINATION_POSITIONS: ['bottom', 'top', 'both'],
  FOOTER_POSITIONS: [false, true, 'left', 'right'],
  SORT_DIRECTIONS: ['ascend', 'descend'],
  FIXED_SET: [false, true, 'left', 'right'],
  ALIGNS: ['left', 'right', 'center'],
  JUSTIFY_CONTENT: ['flex-start', 'flex-end', 'center'],
  SCROLL_HORIZONTAL_POSITIONS: ['left', 'middle', 'right'],
  DEFAULT_KEY_COLUMN_SELECTION: 'column-selection',
  DEFAULT_KEY_COLUMN_EXPAND: 'column-expand',
  DEFAULT_KEY_COLUMN_TITLE: 'column-title',
  DEFAULT_KEY_COLUMN_SORTER: 'column-sorter',
  DEFAULT_KEY_COLUMN_FILTER: 'column-filter',
  DEFAULT_KEY_COLUMN_SCROLLBAR: 'column-scrollbar',
  DEFAULT_COMPONENTS: {
    table: 'table',
    header: {
      outer: 'table',
      wrapper: 'thead',
      row: 'tr',
      cell: 'th'
    },
    body: {
      outer: 'table',
      wrapper: 'tbody',
      row: 'tr',
      cell: 'td'
    },
    footer: {
      wrapper: 'tfoot',
      row: 'tr',
      cell: 'td'
    }
  },
  EXPAND_RELATED_PROPS: [
    'expandedRowRender',
    'dataSource',
    'hideExpandedColumn',
    'childrenRecordName',
    'rowExpandable'
  ]
} as const
