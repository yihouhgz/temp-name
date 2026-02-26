import type { App, Component } from 'vue'
import { withInstall } from './_util/install'
import { Button, SyncButton, ButtonGroup } from './button/index'
import Watermark from './watermark/index'
import Input from './input/index'
import { Icon, IconJsx } from 'icons'
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
import Resizable, { ResizeItem, ResizableGroup, ResizeHandler } from './resizable'
import Typography, { Text, Title, Paragraph, Numeral } from './typography'
import Checkbox, { CheckboxGroup } from './checkbox'
import Radio, { RadioGroup } from './radio'
import Skeleton, {
  SkeletonAvatar,
  SkeletonButton,
  SkeletonParagraph,
  SkeletonTitle,
  SkeletonImage
} from './skeleton'
import Progress from './progress'
import Banner from './banner'
import Notification from './notification'
import Feedback from './feedback'
import SideSheet from './side-sheet'
import LocaleProvider from './locale/locale-provider'
import Modal from './modal'
import Collapsible from './collapsible'
import Carousel from './carousel/carousel'
import Collapse, { CollapsePanel } from './collapse'
import Nav, { NavItem, NavFooter, NavHeader, NavSub } from './nav'
import Dropdown from './dropdown'
import Empty from './empty'
import MarkdownRender from './markdown-render'
import Image from './image'
import imagePreview from './image-preview'
import Divider from './divider'
import Slider from './slider'
import Badge from './badge'
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
  ResizeItem,
  ResizableGroup,
  ResizeHandler,
  Typography,
  Text,
  Title,
  Paragraph,
  Numeral,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonParagraph,
  SkeletonTitle,
  SkeletonImage,
  Progress,
  Banner,
  Notification,
  Feedback,
  SideSheet,
  LocaleProvider,
  Modal,
  Collapsible,
  Carousel,
  Collapse,
  CollapsePanel,
  Nav,
  NavItem,
  NavFooter,
  NavHeader,
  NavSub,
  Dropdown,
  Empty,
  MarkdownRender,
  Image,
  imagePreview,
  Divider,
  Slider,
  Badge
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
  ResizeItem,
  ResizableGroup,
  ResizeHandler,
  Typography,
  Text,
  Title,
  Paragraph,
  Numeral,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonParagraph,
  SkeletonTitle,
  SkeletonImage,
  Progress,
  Banner,
  Notification,
  Feedback,
  SideSheet,
  LocaleProvider,
  Modal,
  Collapsible,
  Carousel,
  Collapse,
  CollapsePanel,
  Nav,
  NavItem,
  NavFooter,
  NavHeader,
  NavSub,
  Dropdown,
  Empty,
  MarkdownRender,
  Image,
  imagePreview,
  Divider,
  Slider,
  Badge
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
