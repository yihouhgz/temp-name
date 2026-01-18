import type { Slots } from 'vue'
import Typography from '../../typography'
import { type TextProps } from '../../typography/text'
const p = (props: TextProps, { slots }: { slots: Slots }) => {
  return <Typography.Paragraph {...props}>{slots.default?.()}</Typography.Paragraph>
}
export default p
