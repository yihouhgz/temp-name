import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import WithAvatar from './avatar'
import AvatarGroup from './group'
import { avatarEmits } from './type'

const Avatar = WithAvatar as typeof WithAvatar & {
  AvatarGroup: typeof AvatarGroup
}
Avatar.AvatarGroup = AvatarGroup
export type AvatarProps = ExtractPropTypes<typeof Avatar>
export type AvatarPublicProps = ExtractPublicPropTypes<typeof Avatar>
export type AvatarEmits = typeof avatarEmits
export type AvatarInstance = InstanceType<typeof WithAvatar>

export type AvatarGroupProps = ExtractPropTypes<typeof AvatarGroup>
export type AvatarGroupPublicProps = ExtractPublicPropTypes<typeof AvatarGroup>
export type AvatarGroupInstance = InstanceType<typeof AvatarGroup>

export { Avatar, AvatarGroup }
