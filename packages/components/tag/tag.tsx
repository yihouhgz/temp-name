import { defineComponent, computed, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { tagEmits, tagProps } from './type'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import "./style/tag.ts"
import { IconClear } from '../icon'
import { Avatar } from '../avatar'
import { renderElementForPropsOrSlot } from '../_util/helps'

const Tag = defineComponent(
    {
        setup(props, { emit, slots }) {
            const instance = getCurrentInstance()
            // 计算类名
            const classes = computed(() => [
                `${prefix}-tag`,
                props.color ? `${prefix}-tag-${props.color}-${props.type}` : '',
                `${prefix}-tag-${props.size}`,
                `${prefix}-tag-${props.shape}`,
                `${prefix}-tag-${props.type}`,
                !props.visible ? `${prefix}-tag-visible` : "",

            ].filter(Boolean).join(' '))

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
                <div
                    class={classes.value}
                    onClick={handleClick}
                >
                    {renderElementForPropsOrSlot('prefixIcon', instance) || (
                        props.prefixIcon && (
                            props.prefixIcon instanceof Function ? props.prefixIcon() : props.prefixIcon
                        )
                    )}
                    {
                        props.avatarSrc && (
                            <Avatar size="extra-small" shape={props.avatarShape} src={props.avatarSrc} ></Avatar>
                        )
                    }
                    {slots.default ? slots.default() : 'Tag'}
                    {renderElementForPropsOrSlot('suffixIcon', instance) || (
                        props.suffixIcon && (
                            props.suffixIcon instanceof Function ? props.suffixIcon() : props.suffixIcon
                        )
                    )}
                    {props.closable && (
                        <div
                            class={`${prefix}-tag-close`}
                            onClick={handleClose}
                        ><IconClear></IconClear></div>
                    )}
                </div>
            )
        },
        name: prefix + '-tag',
        props: tagProps,
        emits: tagEmits,
    }

)
type TagProps = ExtractPropTypes<typeof tagProps>
type TagPropsPublic = ExtractPublicPropTypes<typeof tagProps>

type TagEmits = typeof tagEmits

type TagInstance = InstanceType<typeof Tag> & unknown
export type { TagProps, TagPropsPublic, TagEmits, TagInstance }
export default Tag
