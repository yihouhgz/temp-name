import type { Slots } from 'vue'
import Typography from '../../typography'
import { type TextProps } from '../../typography/text'
const a = (props: TextProps, { slots }: { slots: Slots }) => {
  return (
    <Typography.Text {...props} link={{ ...props }}>
      {slots.default?.()}
    </Typography.Text>
  )
}

export default a
