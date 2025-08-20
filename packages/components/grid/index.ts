import Row from './row'
import Col from './col'
import Flex from './flex'

export type RowType = typeof Row & {
  Flex: typeof Flex
  Col: typeof Col
}
;(Row as RowType).Flex = Flex
;(Row as RowType).Col = Col
export { Row, Col, Flex }
export default { Row, Col, Flex }
