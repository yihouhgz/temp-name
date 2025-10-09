
export const tagProps = {
    type: {
        type: String,
        values: ['primary', 'success', 'info', 'warning', 'danger'],
        default: 'primary',
        required: false
    },
    closable: {
        type: Boolean,
        default: false,
        required: false
    },
    hit: {
        type: Boolean,
        default: false,
        required: false
    },
    color: {
        type: String,
        default: '',
        required: false
    },
    size: {
        type: String,
        values: ['small', 'default', 'large'],
        default: 'default',
        required: false
    },
    effect: {
        values: ['dark', 'light', 'plain'],
        default: 'light',
        required: false
    },
    round: {
        type: Boolean,
        default: false,
        required: false
    },
    disableTransitions: {
        type: Boolean,
        default: false,
        required: false
    }
}


export const tagEmits = {
    close: (evt: MouseEvent) => evt instanceof MouseEvent,
    click: (evt: MouseEvent) => evt instanceof MouseEvent
}
