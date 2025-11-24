export const triggerEventMap = {
  click: {
    enter: 'onClick',
    leave: 'onClick'
  },
  hover: {
    enter: 'onMouseenter',
    leave: 'onMouseleave'
  },
  focus: {
    enter: 'onFocus',
    leave: 'onBlur'
  },
  custom: {
    enter: 'custom',
    leave: 'custom'
  },
  contextMenu: {
    enter: 'onContextmenu',
    leave: 'onContextmenu'
  }
} as const
