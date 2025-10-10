import type { PropType } from 'vue'

type SpacingSize = 'loose' | 'medium' | 'tight'

export const spaceProps = {
  /**
   * @description 对齐方式, 支持 start、end、center、baseline
   */
  align: {
    values: ['start', 'end', 'center', 'baseline'],
    default: 'center',
    required: false
  },
  /**
   * @description 间距尺寸, 支持 loose、medium、tight 或 number、array
   */
  spacing: {
    type: [String, Number, Object] as PropType<SpacingSize | number | { x: number; y: number }[]>,
    default: 'tight',
    required: false
  },

  /**
   * @description 是否为垂直间距
   */
  vertical: {
    type: Boolean,
    default: false,
    required: false
  },

  /**
   * @description 是否自动换行
   */
  wrap: {
    type: Boolean,
    default: false,
    required: false
  }
}
