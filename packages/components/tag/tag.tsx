import { defineComponent, computed, } from 'vue'
import { prefix } from 'constants/config'
import { tagEmits, tagProps } from './type'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

const Tag = defineComponent(
    {
        setup(props, { emit, slots }) {
            // 计算类名
            const classes = computed(() => [
                `${prefix}-tag`,
                `${prefix}-tag--${props.type}`,
                `${prefix}-tag--${props.size}`,
                `${prefix}-tag--${props.effect}`,
                props.hit ? `${prefix}-tag--hit` : '',
                props.round ? `${prefix}-tag--round` : '',
            ].filter(Boolean).join(' '))

            // 计算样式
            const styles = computed(() => ({
                backgroundColor: props.color || undefined,
                borderRadius: props.round ? '999px' : undefined,
                transition: props.disableTransitions ? 'none' : undefined,
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
                <div
                    class={classes.value}
                    style={styles.value}
                    onClick={handleClick}
                >
                    {slots.default ? slots.default() : 'Tag'}
                    {props.closable && (
                        <span
                            class={`${prefix}-tag__close`}
                            onClick={handleClose}
                        >×</span>
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
