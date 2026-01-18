import type { Slots } from 'vue'
import Typography from '../../typography'
import { type TitleProps } from '../../typography/title'
import { prefix } from 'constants/config'
const h2 = (props: TitleProps, { slots }: { slots: Slots }) => {
  return (
    <Typography.Title {...props} heading={2} class={prefix + '-markdownRender-component-header'}>
      {slots.default?.()}
    </Typography.Title>
  )
}
export default h2
