import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import { tagGroupEmits, tagGroupProps } from './type'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import Popover from '../popover/popover'
import Tag, { type TagProps } from './tag'

const TagGroup = defineComponent({
    setup(props, { emit, slots }) {
        // 计算类名
        const classes = computed(() => [
            `${prefix}-tag-group`,
            `${prefix}-tag-group-${props.size}`,
            props.maxTagCount ? `${prefix}-tag-group-max` : '',
        ])

        //关闭事件
        const handleTagClose = (tagChildren: TagProps, evt: MouseEvent, tagKey: string | number) => {
            emit('tagClose', tagChildren, evt, tagKey)
        }

        return () => (
            <div
                class={classes.value}
            >
                {
                    props.tagList.slice(0, props.maxTagCount || props.tagList.length).map((tagItem, index) => (
                        <Tag
                            {...tagItem}
                            key={tagItem.tagKey || index}
                            size={tagItem.size || props.size}
                            avatarShape={tagItem.avatarShape || props.avatarShape}
                            onClose={(e: MouseEvent) => handleTagClose(tagItem, e, tagItem.tagKey)}
                        >
                            {tagItem.children}
                        </Tag>
                    ))
                }
                {
                    props.tagList.length > (props.maxTagCount || props.tagList.length) && (
                        <Popover
                            {...props.popoverProps}
                            visible={props.showPopover}
                            showArrow={true}
                            class={`${prefix}-tag-rest-group-popover`}
                            content={
                                <div class={`${prefix}-tag-rest-group-popover-content`}>
                                    {
                                        props.tagList.slice(props.maxTagCount || props.tagList.length).map((tagItem, index) => (
                                            <Tag
                                                {...tagItem}
                                                key={tagItem.tagKey || index}
                                                size={tagItem.size || props.size}
                                                avatarShape={tagItem.avatarShape || props.avatarShape}
                                                onClose={(e: MouseEvent) => handleTagClose(tagItem, e, tagItem.tagKey)}

                                            >
                                                {tagItem.children}
                                            </Tag>
                                        ))
                                    }
                                </div>
                            }
                        >
                            <Tag
                                size={props.size}
                                closable={false}
                                type="light"
                                style={{ backgroundColor: 'transparent', }}
                            >
                                {`+${props.tagList.length - (props.maxTagCount || props.tagList.length)}`}
                            </Tag>
                        </Popover>
                    )
                }
            </div>
        )
    },
    name: prefix + '-tag-group',
    props: tagGroupProps,
    emits: tagGroupEmits,
})
type TagGroupProps = ExtractPropTypes<typeof tagGroupProps>
type TagGroupPropsPublic = ExtractPublicPropTypes<typeof tagGroupProps>

type TagGroupEmits = typeof tagGroupEmits

type TagGroupInstance = InstanceType<typeof TagGroup> & unknown

export type { TagGroupProps, TagGroupPropsPublic, TagGroupEmits, TagGroupInstance }

export default TagGroup