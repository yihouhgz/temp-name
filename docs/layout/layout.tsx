import { defineComponent } from 'vue'
// import { Nav } from '/packages/components'
import HeaderTheme from './header'
import SideTheme from './side'
import './layout.scss'
import LocaleProvider from '../../packages/components/locale/locale-provider'
const Layout = defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <LocaleProvider>
            <HeaderTheme></HeaderTheme>
            <SideTheme></SideTheme>
          </LocaleProvider>
        </div>
      )
    }
  },
  name: 'LayoutTheme'
})
export default Layout
