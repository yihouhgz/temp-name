export const strings = {
  notificationType: {
    default: 'default',
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
    loading: 'loading'
  },
  position: {
    top: 'top',
    bottom: 'bottom',
    topLeft: 'topLeft',
    topRight: 'topRight',
    bottomLeft: 'bottomLeft',
    bottomRight: 'bottomRight'
  },
  theme: {
    light: 'light',
    normal: 'normal'
  },
  defaultOptions: {
    duration: 3,
    position: 'topRight',
    zIndex: 1010,
    content: undefined,
    getPopupContainer: () => document.body,
    icon: undefined,
    id: undefined,
    showClose: true,
    title: '',
    type: 'default',
    theme: 'normal'
  }
} as const
