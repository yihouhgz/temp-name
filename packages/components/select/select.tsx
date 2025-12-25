import {
  defineComponent,
  computed,
  reactive,
  watch,
  ref,
  onMounted,
  h,
  getCurrentInstance
} from 'vue'
import { prefix } from 'constants/config'
import './style/select'
import Popover from '../popover'
import { selectEmits, selectProps, type SelectRefMethods } from './type'
import Option from './option'
import SelectOptionGroup from './option-group'
import { IconChevronDown } from '../icon'
import { consolaWrapper, isArray, isObject } from '../_util'
import type { VNode } from 'vue'
import { hasPropsOrSlots, renderElementForPropsOrSlot } from '../_util'
import Tag from '../tag'
import type { RendererNode } from 'vue'
import type { RendererElement } from 'vue'

type DefaultFunType = () =>
  | VNode<RendererNode, RendererElement, { [key: string]: unknown }>[]
  | undefined

const Select = defineComponent({
  setup(props, ctx) {
    const state = reactive<{
      visible: boolean
      selfValue: string | number | { value: string | number; label: string }[]
      triggerRect: DOMRect | undefined
      options: { _focused?: boolean; value: unknown; label: string; disabled?: boolean }[]
      focusIndex: number
      selectIndex: number | number[]
    }>({
      visible: false,
      selfValue: props.value || props.defaultValue ? [] : [],
      triggerRect: undefined,
      options: props.optionList ?? [],
      focusIndex: -1,
      selectIndex: props.multiple ? [] : -1
    })
    const triggerRef = ref<HTMLDivElement>()

    onMounted(() => {
      const triggerRect = triggerRef.value?.getBoundingClientRect()
      state.triggerRect = triggerRect
    })
    const dropdownWrapperMinWidth = computed(() => {
      let minWidth = 74
      const margin = 0
      if (state.triggerRect) {
        minWidth = Math.max(minWidth, state.triggerRect.width + margin)
      }
      return minWidth + 'px'
    })

    const wrapperClass = computed(() => {
      return [
        `${prefix}-select`,
        {
          [`${prefix}-select-disabled`]: props.disabled,
          [`${prefix}-select-multiple`]: props.multiple,
          [`${prefix}-select-open`]: state.visible,
          [`${prefix}-select-focus`]: state.visible
        }
      ]
    })
    const handleClosePopover = () => {
      state.visible = false
    }
    const handleOpenPopover = () => {
      state.visible = true
    }
    watch(
      () => state.visible,
      (val) => {
        ctx.emit('dropdownVisibleChange', val)
      }
    )
    // 导出的实例方法
    const refMethods = {
      close: () => {
        handleClosePopover()
      },
      open: () => {
        handleOpenPopover()
      },
      focus: () => {
        console.log('focus')
      },
      clearInput: () => {
        console.log('clearInput')
      },
      deselectAll: () => {
        console.log('deselectAll')
      },
      selectAll: () => {
        console.log('selectAll')
      },
      search: (value: string, event: Event) => {
        console.log('search', event)
      }
    }
    ctx.expose<SelectRefMethods>(refMethods)

    const popoverProps = computed(() => {
      return {
        ...props.restTagsPopoverProps,
        position: props.position,
        getPopupContainer: props.getPopupContainer,
        zIndex: props.zIndex,
        autoAdjustOverflow: props.autoAdjustOverflow
      }
    })
    const handleVisibleChange = (visible: boolean) => {
      state.visible = visible
    }
    const handleClickOption = (
      current: { value: string | number; label: string },
      index: number
    ) => {
      if (props.multiple && isArray(state.selectIndex) && isArray(state.selfValue)) {
        const oldIndex = state.selectIndex.findIndex((item) => item == index)
        if (oldIndex >= 0) {
          state.selectIndex.splice(oldIndex, 1)
          state.selfValue = state.selfValue.filter((item) => item.value !== current.value)
        } else {
          state.selectIndex.push(index)
          state.selfValue.push(current)
        }
      }
    }
    const handleFocusOption = (index: number) => {
      state.focusIndex = index
    }
    const renderPopoverContent1 = () => {
      const { dropdownStyle, dropdownClassName, optionList } = props
      const style = { ...dropdownStyle, minWidth: dropdownWrapperMinWidth.value }
      let children: unknown[] = []
      const getSelected = (option: { label: string; value: string | number }) => {
        if (props.multiple && isArray(state.selfValue)) {
          return !!state.selfValue.find((item) => option.value === item.value)
        }
        return state.selfValue == option.value
      }
      if (optionList?.length) {
        children = optionList.map((child, index) => {
          return h(Option, {
            ...child,
            _focused: state.focusIndex === index,
            _selected: getSelected(child),
            onClick: () => handleClickOption(child, index),
            onFocus_: () => handleFocusOption(index)
          })
        })
      } else {
        const items = ctx.slots.default?.()
        if (items?.length) {
          const template = []
          let childIndex = 0
          for (const child of items) {
            const type = child.type as { name: string }
            if (isObject(child.type) && [SelectOptionGroup.name, Option.name].includes(type.name)) {
              if ([SelectOptionGroup.name].includes(type.name)) {
                // hander group
                const optionChilds = (child.children as { default: DefaultFunType }).default() || []
                template.push(h(child, { label: child.props?.label }))
                for (const optionChild of optionChilds) {
                  const currentIndex = childIndex
                  const label =
                    optionChild.props?.label ||
                    (child.children as { default: DefaultFunType })?.default()?.[0]?.children
                  const optionParams = {
                    ...(optionChild.props as { value: string }),
                    label: label as string
                  }
                  template.push(
                    h(
                      optionChild,
                      {
                        ...optionChild.props,
                        onClick: () => handleClickOption(optionParams, currentIndex),
                        onFocus_: () => handleFocusOption(currentIndex),
                        _focused: state.focusIndex === currentIndex,
                        _selected: getSelected(optionParams)
                      },
                      { default: () => label }
                    )
                  )
                  childIndex += 1
                }
              } else {
                const currentIndex = childIndex
                const label =
                  child.props?.label ||
                  (child.children as { default: DefaultFunType })?.default()?.[0]?.children
                const optionParams = {
                  ...(child.props as { value: string }),
                  label: label
                }
                template.push(
                  h(
                    child,
                    {
                      ...child.props,
                      onClick: () => handleClickOption(optionParams, currentIndex),
                      onFocus_: () => handleFocusOption(currentIndex),
                      _focused: state.focusIndex === currentIndex,
                      _selected: getSelected(optionParams)
                    },
                    { default: () => label }
                  )
                )
                childIndex += 1
              }
            } else {
              consolaWrapper.error('Option or SelectOption must be used as a child of Select')
              break
            }
          }
          children = template
        }
      }
      if (
        (!children || (isArray(children) && children.length === 0)) &&
        hasPropsOrSlots('emptyContent', vm)
      ) {
        children = [renderElementForPropsOrSlot('emptyContent', vm)]
      }
      const clxsNames = [`${prefix}-select-dropdown-wrapper`, dropdownClassName]
      return (
        <div class={clxsNames} style={style}>
          {children}
        </div>
      )
    }
    const vm = getCurrentInstance()
    const handleMultipleCloseTag = (
      data: { value: string | number; label: string },
      index: number
    ) => {
      handleClickOption(data, index)
    }
    const isEmpty = (data: unknown) => {
      if (!data) return false
      if (isArray(data)) return data.length > 0
      return !!data
    }
    const multipleTagTemplate = () => {
      if (isArray(state.selfValue)) {
        const resetNumber = state.selfValue.length - props.maxTagCount
        const isShowMaxTagCount = props.maxTagCount > 0 && !state.visible && resetNumber > 0
        const targetList = isShowMaxTagCount
          ? state.selfValue.slice(0, props.maxTagCount)
          : state.selfValue
        const template = targetList.map((item, index) => {
          return (
            <Tag size="large" closable={true} onClose={() => handleMultipleCloseTag(item, index)}>
              {item.label}
            </Tag>
          )
        })
        if (isShowMaxTagCount) {
          const popover = popoverProps.value
          const resetList = state.selfValue.slice(targetList.length, state.selfValue.length)
          template.push(
            <Popover
              position={popover.position}
              autoAdjustOverflow={popover.autoAdjustOverflow}
              getPopupContainer={popover.getPopupContainer}
              zIndex={popover.zIndex}
              trigger="hover"
              showArrow
              content={
                <div>
                  {resetList.map((item) => {
                    return <Tag>{item.label}</Tag>
                  })}
                </div>
              }
            >
              <Tag size="large" style={{ backgroundColor: 'transparent' }}>
                +{resetNumber}
              </Tag>
            </Popover>
          )
        }
        return template
      }
      return null
    }
    return () => {
      const popover = popoverProps.value
      return (
        <Popover
          position={popover.position}
          autoAdjustOverflow={popover.autoAdjustOverflow}
          getPopupContainer={popover.getPopupContainer}
          zIndex={popover.zIndex}
          trigger="custom"
          visible={state.visible}
          content={renderPopoverContent1()}
          onVisibleChange={handleVisibleChange}
        >
          <div
            class={wrapperClass.value}
            {...ctx.attrs}
            onClick={handleOpenPopover}
            ref={triggerRef}
          >
            <div class={prefix + '-select-selection'}>
              <div class={prefix + '-select-selection-wrapper'}>
                {isEmpty(state.selfValue) ? (
                  props.multiple ? (
                    multipleTagTemplate()
                  ) : (
                    <span class={prefix + '-select-selection-text'}>{state.selfValue}</span>
                  )
                ) : (
                  <div
                    class={[
                      prefix + '-select-selection-text',
                      prefix + '-select-selection-placeholder'
                    ]}
                  >
                    {hasPropsOrSlots('placeholder', vm)
                      ? renderElementForPropsOrSlot('placeholder', vm)
                      : '请选择'}
                  </div>
                )}
              </div>
            </div>
            <div class={prefix + '-select-input-arrow'}>
              <div
                class={prefix + '-select-input-arrow-icon'}
                style={{ transform: `rotate(${state.visible ? '180deg' : '0deg'})` }}
              >
                <IconChevronDown></IconChevronDown>
              </div>
            </div>
          </div>
        </Popover>
      )
    }
  },
  name: prefix + '-select',
  props: selectProps,
  emits: selectEmits
})

export default Select
