import type { App } from 'vue'
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
const components = [
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
  ToastFactory
]
export const install = (app: App) => withInstall(app, components)
export { Button, Watermark, Input, Icon, Row, Col, Popover, Select, HotKeys, Avatar, Tag }
