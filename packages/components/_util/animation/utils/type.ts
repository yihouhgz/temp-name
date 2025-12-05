export type AnimationProps = {
  to: Record<string, number>
  from: Record<string, number>
}

export type AnimationOptions = {
  duration?: number
  delay?: number
  easing?: string
}
