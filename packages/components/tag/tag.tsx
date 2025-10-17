import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import { tagEmits, tagProps } from './type'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import './style/tag.ts'
import { IconClose } from '../icon'
import { Avatar } from '../avatar'

const Tag = defineComponent({
  setup(props, { emit, slots }) {
    // 计算类名
    const classes = computed(() =>
      [
        `${prefix}-tag`,
        props.color ? `${prefix}-tag-${props.color}-${props.type}` : '',
        `${prefix}-tag-${props.size}`,
        `${prefix}-tag-${props.shape}`,
        `${prefix}-tag-${props.type}`
      ]
        .filter(Boolean)
        .join(' ')
    )

    // 计算样式
    const styles = computed(() => ({
      ...props.style,
      display: props.visible ? 'inline-flex' : 'none'
    }))

    // 关闭事件
    const handleClose = (e: MouseEvent) => {
      e.stopPropagation()
      emit('close', e)
    }

    // 点击事件
    const handleClick = (e: MouseEvent) => {
      emit('click', e)
    }

    return () => (
      <div class={classes.value} style={styles.value} onClick={handleClick}>
        {props.prefixIcon &&
          (props.prefixIcon instanceof Function ? props.prefixIcon() : props.prefixIcon)}
        {props.avatarSrc && (
          <Avatar size="extra-small" shape={props.avatarShape} src={props.avatarSrc}></Avatar>
        )}
        {slots.default ? slots.default() : 'Tag'}
        {props.suffixIcon &&
          (props.suffixIcon instanceof Function ? props.suffixIcon() : props.suffixIcon)}
        {props.closable && (
          <div class={`${prefix}-tag-close`} onClick={handleClose}>
            <IconClose size="small"></IconClose>
          </div>
        )}
      </div>
    )
  },
  name: prefix + '-tag',
  props: tagProps,
  emits: tagEmits
})
type TagProps = ExtractPropTypes<typeof tagProps>
type TagPropsPublic = ExtractPublicPropTypes<typeof tagProps>

type TagEmits = typeof tagEmits

type TagInstance = InstanceType<typeof Tag> & unknown
export type { TagProps, TagPropsPublic, TagEmits, TagInstance }
export default Tag
