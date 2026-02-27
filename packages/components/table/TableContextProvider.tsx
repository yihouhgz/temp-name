import { defineComponent } from 'vue'
import { useTableProvider } from './table-context'

const TableContextProvider = defineComponent({
  setup(props, { slots }) {
    useTableProvider({
      tableProps: null
    })
    return () => slots.default?.()
  }
})
export default TableContextProvider
