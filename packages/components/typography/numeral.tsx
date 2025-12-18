import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { numeralProps } from './type'
import Text from './text'
import { isArray, isFunction, isNumber, isObject, isString } from '../_util'
import { extractAllNumbers, toPrecision, splitByNumbers } from './utils'
import { arrays, strings } from './constants'

type NumeralChildren = { children: NumeralChildren[] | string }

const Numeral = defineComponent({
  setup(props, ctx) {
    const getPrecision = (number: number) => {
      const { precision, truncate } = props
      if (precision > 0) {
        return toPrecision(Number(number), precision)
      } else {
        return Math[truncate](Number(number))
      }
    }
    const getBytes = (number: number) => {
      const { rule } = props
      const units = rule === strings.bytesDecimal ? arrays.bytesDecimal : arrays.bytesBinary
      const baseNumber = rule === strings.bytesDecimal ? strings.bytesDecimalNumber : 1024
      const deepGet = (index: number, v: number) => {
        if (v < baseNumber || index == units.length) {
          return getPrecision(v) + units[index]
        } else {
          return deepGet(index + 1, v / baseNumber)
        }
      }
      return deepGet(0, number)
    }
    const formattingNumber = (value: number | string) => {
      const { rule, precision, parser } = props
      if (isFunction(parser)) {
        const list = splitByNumbers(String(value))
        return list
          .map((item) => {
            return parser(item.value)
          })
          .join('')
      }
      const numbers = extractAllNumbers(String(value))
      if (numbers.length == 0) return value
      const after = []

      for (let i = 0; i < numbers.length; i++) {
        let number: number | string = numbers[i]
        if ([strings.numbers, strings.text].includes(rule)) {
          number = getPrecision(Number(number))
          after.push(number)
        }
        if (rule === strings.percentages) {
          number = getPrecision(Number(number) * 100)
          after.push(number + '%')
        }
        if ([strings.bytesDecimal, strings.bytesBinary].includes(rule)) {
          const v = Number(number)
          after.push(getBytes(v))
        }
        if (rule === strings.exponential) {
          after.push(Number(number).toExponential(precision))
        }
      }
      if (rule === strings.numbers) {
        return after.join('')
      }
      let result = String(value)
      for (let i = 0; i < numbers.length; i++) {
        const original = numbers[i]
        const afterNumber = String(after[i])
        result = result.replace(original, afterNumber)
      }
      return result
    }
    const deepHandleTemptale = (childrens: NumeralChildren[]) => {
      const result: unknown = childrens.map((child: NumeralChildren) => {
        if (child) {
          const node = child.children || child
          if (isString(node) || isNumber(node)) {
            return formattingNumber(node)
          }
          if (isObject(child)) {
            if (child.children && isArray(child.children)) {
              return {
                ...child,
                children: deepHandleTemptale(child.children)
              }
            }
            return {
              ...child,
              children: formattingNumber(String(child.children))
            }
          }
        }
        return child
      })
      return result
    }
    return () => {
      let childrens: unknown = ctx.slots.default?.()
      if (childrens) {
        childrens = deepHandleTemptale(childrens as NumeralChildren[])
      }
      return <Text>{childrens}</Text>
    }
  },
  name: prefix + '-numeral',
  props: numeralProps
})
export default Numeral
