export type ThrottleFnType<T extends unknown[]> = (...args: T) => void
export type ThrottleFnReturnType<T extends unknown[]> = (...args: T) => void

export const useThrottle = <T extends unknown[]>(
  throttleFn: ThrottleFnType<T>,
  delay?: number
): ThrottleFnReturnType<T> => {
  let timer: unknown
  return function (this: unknown, ...args: T) {
    if (timer) {
      clearTimeout(timer as number)
      timer = null
    } else {
      throttleFn.call(this, ...args)
    }
    timer = setTimeout(
      () => {
        throttleFn.call(this, ...args)
      },
      delay ? delay : 20
    )
  }
}
