import { provide, inject } from 'vue'

const tableKey = Symbol('tableKey')

export type TableContextProps = {
  tableProps: null
}
export function useTableProvider(props: TableContextProps) {
  provide(tableKey, props)
}
export function useTableInject() {
  return inject(tableKey)
}
