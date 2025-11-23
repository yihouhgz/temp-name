export const triggerEventMap = {
  click: {
    enter: 'click',
    leave: 'click'
  },
  hover: {
    enter: 'mouseenter',
    leave: 'mouseleave'
  },
  focus: {
    enter: 'focus',
    leave: 'blur'
  },
  custom: {
    enter: 'custom',
    leave: 'custom'
  },
  contextMenu: {
    enter: 'contextmenu',
    leave: 'contextmenu'
  }
} as const
