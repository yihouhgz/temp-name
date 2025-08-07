import Color from 'color'
export type formatType = 'hex' | 'rgb' | 'hsl'
export type ColorType = Parameters<typeof Color>[0]
export type ColorInstance = ReturnType<typeof Color>
