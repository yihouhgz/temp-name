import type { App } from 'vue'
import { withInstall } from './_util/install'
import Button from './button/index'
import Watermark from './watermark/index'
import Input from './input/index'
import { Icon, IconJsx } from './icon/index'
import { Row, Col } from './grid/index'
import Popover from './popover/index'
import Tooltip from './tooltip/index'
import Select from './select'
import HotKeys from './hot-keys'
import { Avatar, AvatarGroup } from './avatar'
const components = [
  Button,
  Watermark,
  Input,
  Icon,
  IconJsx,
  Row,
  Col,
  Popover,
  Tooltip,
  Select,
  HotKeys,
  Avatar,
  AvatarGroup
]
export const install = (app: App) => withInstall(app, components)
export { Button, Watermark, Input, Icon, Row, Col, Popover, Select, HotKeys, Avatar }
