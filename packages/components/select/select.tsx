import { defineComponent, computed, reactive, watch } from 'vue'
import { prefix } from 'constants/config'
import './style/select'
import Popover from '../popover'
import { selectEmits, selectProps, type SelectRefMethods } from './type'
import Option from './option'
// import Group from './group'
import { IconChevronDown } from '../icon'

const Select = defineComponent({
  setup(props, ctx) {
    const state = reactive({
      visible: false,
      selfValue: props.value || props.defaultValue
    })
    const wrapperClass = computed(() => {
      return [`${prefix}-select`]
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

    function renderPopoverContent() {
      const { dropdownStyle, dropdownClassName } = props
      const style = dropdownStyle
      const isCustomRender = !!ctx.slots.default
      let content = null
      if (isCustomRender) {
        content = ctx.slots.default?.()
      } else {
        const options = props.optionList ?? []
        if (options.length === 0) {
          content = props.emptyContent
        }
        content = options.map((item) => {
          return <Option {...item} />
        })
      }
      return (
        <div class={dropdownClassName} style={style}>
          asd
          {content}
        </div>
      )
    }
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
          <div class={wrapperClass.value} {...ctx.attrs} onClick={handleOpenPopover}>
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
              <IconChevronDown></IconChevronDown>
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
