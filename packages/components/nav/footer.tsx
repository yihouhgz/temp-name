import { defineComponent, ref, watchEffect } from 'vue'
import { prefix } from 'constants/config'
import Button from '../button'
import { IconSidebar } from 'icons'
import { footerProps, footerEmits } from './type'
import LocaleConsumer from '../locale/locale-consumer'
import Tooltip from '../tooltip'
import { useNavigationInject } from './content'

const NavFooter = defineComponent({
  setup(props) {
    const navigationContext = useNavigationInject()
    const isCollapse = ref(!!navigationContext?.isCollapsed)
    watchEffect(() => {
      const isCollapsed = navigationContext?.isCollapsed
      isCollapse.value = !!isCollapsed
    })
    const handleCollapse = () => {
      // isCollapse.value = !isCollapse.value
      if (navigationContext) {
        navigationContext.collapsedChange(!isCollapse.value)
      }
    }
    return () => {
      return (
        <div class={prefix + '-navigation-footer'}>
          {props.collapseButton && (
            <div class={prefix + '-navigation-collapse-btn'} onClick={handleCollapse}>
              <LocaleConsumer componentName="Navigation">
                {(locale: { collapseText: string; expandText: string }) => {
                  if (!isCollapse.value) {
                    return (
                      <Button theme="borderless" type="tertiary" icon={<IconSidebar></IconSidebar>}>
                        {locale.collapseText}
                      </Button>
                    )
                  }
                  return (
                    <Tooltip position="right" content={locale.expandText}>
                      <Button
                        theme="borderless"
                        type="tertiary"
                        icon={<IconSidebar></IconSidebar>}
                      ></Button>
                    </Tooltip>
                  )
                }}
              </LocaleConsumer>
            </div>
          )}
        </div>
      )
    }
  },
  props: footerProps,
  emits: footerEmits,
  name: prefix + '-nav-footer'
})
export default NavFooter
