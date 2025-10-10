import { defineComponent, computed, reactive, watch, ref, onMounted, h, type Slot } from 'vue'
import { prefix } from 'constants/config'
import './style/select'
import Popover from '../popover'
import { selectEmits, selectProps, type SelectRefMethods } from './type'
import Option, { type SelectOptionProps } from './option'
import SelectOptionGroup from './option-group'
import { IconChevronDown } from '../icon'
import { consolaWapper, isArray, isObject } from '../_util'
import type { VNode } from 'vue'

const Select = defineComponent({
  setup(props, ctx) {
    const state = reactive<{
      visible: boolean
      selfValue: unknown
      triggerRect: DOMRect | undefined
      options: { _focused?: boolean; value: unknown; label: string; disabled?: boolean }[]
      focusIndex: number
      selectIndex: number
    }>({
      visible: false,
      selfValue: props.value || props.defaultValue,
      triggerRect: undefined,
      options: props.optionList ?? [],
      focusIndex: -1,
      selectIndex: -1
    })
    const triggerRef = ref<HTMLDivElement>()

    onMounted(() => {
      const triggerRect = triggerRef.value?.getBoundingClientRect()
      state.triggerRect = triggerRect
    })
    const dropdownWrapperMinWidth = computed(() => {
      let minWidth = 74
      const margin = 8
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
      console.log('open')
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

    const handleClickOption = (index: number) => {
      state.selectIndex = index
    }
    const handleFocusOption = (index: number) => {
      state.focusIndex = index
    }
    const renderPopoverContent = () => {
      const { dropdownStyle, dropdownClassName } = props
      const style = { ...dropdownStyle, minWidth: dropdownWrapperMinWidth.value }
      const isCustomRender = !!ctx.slots.default
      let content = null
      if (isCustomRender) {
        //通过 Option组件传入
        content = ctx.slots.default?.()
        let isErrorFlag = false
        content = content?.map((item, index) => {
          if (
            isObject(item.type) &&
            [SelectOptionGroup.name, Option.name].includes((item.type as { name: string }).name)
          ) {
            // 分组情况
            if ((item.type as { name: string }).name.indexOf(SelectOptionGroup.name || '') >= 0) {
              const children =
                (item.children as { default: () => Slot<unknown> | undefined })?.default() || []
              return h(
                SelectOptionGroup,
                {
                  label: item.props?.label || ''
                },
                isArray(children)
                  ? children.map((child: VNode) =>
                      h(child, {
                        onClick: () => handleClickOption(index),
                        onFocus_: () => handleFocusOption(index),
                        _focused: state.focusIndex === index,
                        _selected: false
                      })
                    )
                  : []
              )
            } else {
              const { defaultValue } = props
              const optionsPorps = item.props as SelectOptionProps
              const _selected = !!(defaultValue && optionsPorps.value === defaultValue)
              const getSelected = () => {
                if (state.selectIndex === -1) return _selected
                return state.selectIndex === index
              }
              return h(item, {
                onClick: () => handleClickOption(index),
                onFocus_: () => handleFocusOption(index),
                _focused: state.focusIndex === index,
                _selected: getSelected()
              })
            }
          }
          isErrorFlag = true
        })
        if (isErrorFlag) consolaWapper.error('Option must be used as a child of Select')
      } else {
        const options = props.optionList ?? []
        content = options.map((item, index) => {
          return (
            <Option
              {...item}
              _focused={state.focusIndex === index}
              _selected={false}
              onClick={() => handleClickOption(index)}
              onFocus_={() => handleFocusOption(index)}
            />
          )
        })
      }
      if ((!content || (isArray(content) && content.length === 0)) && props.emptyContent) {
        content = props.emptyContent ? props.emptyContent : ctx.slots.emptyContent?.()
      }
      const clxsNames = [`${prefix}-select-dropdown-wrapper`, dropdownClassName]
      return (
        <div class={clxsNames} style={style}>
          {content}
        </div>
      )
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
          content={renderPopoverContent()}
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
                {/* <span class={prefix + '-select-selection-text'}></span> */}
                <div
                  class={[
                    prefix + '-select-selection-text',
                    prefix + '-select-selection-placeholder'
                  ]}
                >
                  请选择12
                </div>
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
