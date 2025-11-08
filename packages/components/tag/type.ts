import type { PropType, VNode } from 'vue'
import type { PopoverProps } from '../popover/popover.tsx'
import type { TagProps } from './tag.tsx'

export type ColorType =
    | 'amber'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'grey'
    | 'indigo'
    | 'light-blue'
    | 'light-green'
    | 'lime'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'violet'
    | 'yellow'
    | 'white'
export const tagProps = {
    avatarShape: { // 头像形状
        type: String as PropType<'circle' | 'square'>,
        default: 'square',
        required: false
    },
    avatarSrc: { // 头像地址
        type: String,
        default: '',
        required: false
    },
    type: { // 类型 浅色底色 light，白色底色 ghost，深色底色 solid
        type: String as PropType<'ghost' | 'solid' | 'light'>,
        default: 'light',
        required: false
    },
    closable: { // 是否可关闭
        type: Boolean,
        default: false,
        required: false
    },
    color: { // 颜色
        type: String as PropType<ColorType>,
        default: "grey",
        required: false
    },
    prefixIcon: { // 前缀图标
        type: [String, Function] as PropType<string | VNode | (() => VNode)>,
        default: '',
        required: false
    },
    suffixIcon: { // 后缀图标
        type: [String, Function] as PropType<string | VNode | (() => VNode)>,
        default: '',
        required: false
    },
    shape: {    // 形状
        type: String,
        values: ['circle', 'square'],
        default: 'square',
        required: false
    },
    size: { // 大小
        type: String,
        values: ['small', 'large'],
        default: 'small',
        required: false
    },
    visible: { // 是否显示
        type: Boolean,
        default: true,
        required: false
    },
    tagKey: { // 标识符
        type: [String, Number] as PropType<string | number>,
        default: '',
        required: false
    },
    children: { // 标签内容
        type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
        default: null,
        required: false
    }
}

export const tagGroupProps = {
    avatarShape: { // 头像形状
        type: String as PropType<TagProps["avatarShape"]>,
        default: 'square',
        required: false
    },
    maxTagCount: { // 最大显示数量
        type: Number,
        default: undefined,
        required: false
    },
    showPopover: { // 是否显示更多标签弹窗
        type: Boolean,
        default: false,
        required: false
    },
    popoverProps: { // 更多标签弹窗属性
        type: Object as PropType<PopoverProps>,
        default: () => ({}),
        required: false
    },
    size: { // 大小
        type: String as PropType<TagProps["size"]>,
        values: ['small', 'large'],
        default: 'small',
        required: false
    },
    tagList: { // 标签列表
        type: Array as PropType<TagProps[]>,
        default: () => [],
        required: false
    }
}
export const tagGroupEmits = {
    tagClose: (tagChildren: TagProps, evt: MouseEvent, tagKey: string | number) => true,
}

export const tagEmits = {
    close: (evt: MouseEvent) => evt instanceof MouseEvent,
    click: (evt: MouseEvent) => evt instanceof MouseEvent
}
