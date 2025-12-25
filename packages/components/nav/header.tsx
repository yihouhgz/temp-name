import { defineComponent, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { headerProps } from './type'
import { renderElementForPropsOrSlot } from '../_util'
import { useNavigationInject } from './content'

const NavHeader = defineComponent({
  setup() {
    const instance = getCurrentInstance()
    const navigationContext = useNavigationInject()
    return () => {
      return (
        <div class={prefix + '-navigation-header'}>
          <div class={prefix + '-navigation-header-logo'}>
            {renderElementForPropsOrSlot('logo', instance)}
          </div>
          {!navigationContext?.isCollapsed && (
            <div class={prefix + '-navigation-header-text'}>
              {renderElementForPropsOrSlot('text', instance)}
            </div>
          )}
        </div>
      )
    }
  },
  props: headerProps,
  name: prefix + '-nav-header'
})
export default NavHeader
