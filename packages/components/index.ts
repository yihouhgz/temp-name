import type { App, Component } from 'vue'
import { withInstall } from './_util/install'
import { Button, SyncButton, ButtonGroup } from './button/index'
import Watermark from './watermark/index'
import Input from './input/index'
import { Icon, IconJsx } from './icon/index'
import { Row, Col } from './grid/index'
import Popover from './popover/index'
import Tooltip from './tooltip/index'
import Select from './select'
import { SelectOption, SelectOptionGroup } from './select'
import HotKeys from './hot-keys'
import { Tag, TagGroup } from './tag'
import { Avatar, AvatarGroup } from './avatar'
import DragMove from './drag-move'
import Space from './space'
import Spin from './spin'
import { Layout, Header, Content, Footer, Sider } from './layout'
import Switch from './switch'
import { Toast, ToastFactory } from './toast'
import Resizable from './resizable'
import Typography, { Text } from './typography'
const components: Component[] = [
  Button,
  ButtonGroup,
  SyncButton,
  Watermark,
  Input,
  Icon,
  IconJsx,
  Row,
  Col,
  Popover,
  Tooltip,
  Select,
  SelectOption,
  SelectOptionGroup,
  HotKeys,
  Avatar,
  AvatarGroup,
  Tag,
  TagGroup,
  DragMove,
  Space,
  Spin,
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Switch,
  Toast,
  ToastFactory,
  Resizable,
  Typography,
  Text
]
export const install = (app: App) => withInstall(app, components)
export {
  Button,
  ButtonGroup,
  SyncButton,
  Watermark,
  Input,
  Icon,
  IconJsx,
  Row,
  Col,
  Popover,
  Tooltip,
  Select,
  SelectOption,
  SelectOptionGroup,
  HotKeys,
  Avatar,
  AvatarGroup,
  Tag,
  TagGroup,
  DragMove,
  Space,
  Spin,
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Switch,
  Toast,
  ToastFactory,
  Resizable,
  Typography,
  Text
}

const globalApis: { [key: string]: unknown } = {
  Toast,
  ToastFactory
}

type GlobalApiType = typeof globalThis & typeof globalApis
export const registerGlobalApiToDocs = () => {
  for (const api in globalApis) {
    ;(globalThis as GlobalApiType)[api] = globalApis[api]
  }
}
