import type { PropType, VNode, CSSProperties } from 'vue'

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
        default: 'square'
    },
    avatarSrc: { // 头像地址
        type: String,
        default: ''
    },
    className: { // 自定义样式类
        type: String,
        default: ''
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
        default: ''
    },
    suffixIcon: { // 后缀图标
        type: [String, Function] as PropType<string | VNode | (() => VNode)>,
        default: ''
    },
    shape: {    // 形状
        type: String,
        values: ['circle', 'square'],
        default: 'square'
    },
    size: { // 大小
        type: String,
        values: ['small', 'large'],
        default: 'small',
        required: false
    },
    style: { // 自定义样式
        type: Object as PropType<CSSProperties>,
        default: () => ({}),
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
    }
}


export const tagEmits = {
    close: (evt: MouseEvent) => evt instanceof MouseEvent,
    click: (evt: MouseEvent) => evt instanceof MouseEvent
}
