import { customRef } from 'vue'

type AnimationOptions = {
  duration?: number
  delay?: number
  easing?: (t: number) => number
  onComplete?: () => void
  onStart?: () => void
}

export const EasingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInSine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
}

export const useAnimationReactive = <T extends Record<string, number>>(
  initialValues: T,
  options?: AnimationOptions
) => {
  const {
    duration = 300,
    delay = 0,
    easing = EasingFunctions.easeOutQuad,
    onComplete,
    onStart
  } = options || {}

  let _values = { ...initialValues }
  let _startValues = { ...initialValues }
  let _targetValues = { ...initialValues }
  let _animationId: number | null = null
  let _startTime: number | null = null

  const stopAnimation = () => {
    if (_animationId !== null) {
      cancelAnimationFrame(_animationId)
      _animationId = null
      _startTime = null
    }
  }

  const animate = () => {
    if (_startTime === null) {
      _startTime = Date.now() + delay
    }

    const currentTime = Date.now()
    const elapsed = currentTime - _startTime

    if (elapsed < 0) {
      _animationId = requestAnimationFrame(animate)
      return
    }

    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easing(progress)

    // compute all values
    const currentValues = { ..._values } as Record<string, number>
    let allComplete = true

    Object.keys(_targetValues).forEach((key) => {
      const start = _startValues[key] || 0
      const target = _targetValues[key] || 0
      const distance = target - start

      if (progress < 1) {
        currentValues[key] = start + distance * easedProgress
        allComplete = false
      } else {
        currentValues[key] = target
      }
    })

    _values = currentValues as T

    // 触发更新
    trigger()

    if (!allComplete) {
      _animationId = requestAnimationFrame(animate)
    } else {
      _animationId = null
      _startTime = null
      onComplete?.()
    }
  }

  let trigger: () => void

  const ref = customRef<T>((track, _trigger) => {
    trigger = _trigger

    return {
      get() {
        track()
        return _values
      },
      set(newValues: T) {
        // stop
        stopAnimation()

        // save start values and target values
        _startValues = { ..._values }
        _targetValues = { ...newValues }

        if (options) {
          onStart?.()
          _startTime = null
          animate()
        } else {
          _values = { ...newValues }
          trigger()
        }
      }
    }
  })

  const stop = () => {
    stopAnimation()
  }

  const pause = () => {
    stopAnimation()
  }

  const resume = () => {
    if (_startTime !== null) {
      const currentProgress = Math.min((Date.now() - _startTime) / duration, 1)
      const remainingTime = duration * (1 - currentProgress)
      _startTime = Date.now() - (duration - remainingTime)
      animate()
    }
  }

  const reset = () => {
    stopAnimation()
    _values = { ...initialValues }
    _startValues = { ...initialValues }
    _targetValues = { ...initialValues }
    trigger()
  }

  const setImmediately = (values: Partial<T>) => {
    stopAnimation()
    _values = { ..._values, ...values }
    _startValues = { ..._values }
    _targetValues = { ..._values, ...values }
    trigger()
  }

  return {
    value: ref,
    stop,
    pause,
    resume,
    reset,
    setImmediately,
    isAnimating: () => _animationId !== null
  }
}
