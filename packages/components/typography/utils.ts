import { omit } from 'lodash'

export function extractAllNumbers(text: string) {
  const regex =
    /\b(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|[0-9][0-9_]*(?:\.[0-9_]*)?[eE][+-]?[0-9_]+|(?:[0-9][0-9_]*\.[0-9_]*|[0-9_]*\.[0-9][0-9_]*)|0[0-7_]+|[1-9][0-9_]*|0)\b/g

  return (text.match(regex) || []).map((num) => num.replace(/_/g, ''))
}

export function toPrecision(value: number, len: number) {
  const valueStr = value.toString()
  const [integer, decimal] = valueStr.split('.')
  return decimal ? `${integer}.${decimal.substring(0, len)}` : valueStr.substring(0, len)
}

export function splitByNumbers(text: string) {
  const numberRegex =
    /\b(?:0[xX][0-9a-fA-F](?:_?[0-9a-fA-F])*|0[bB][01](?:_?[01])*|0[oO][0-7](?:_?[0-7])*|(?:[0-9](?:_?[0-9])*(?:\.[0-9](?:_?[0-9])*)?|\.[0-9](?:_?[0-9])*)[eE][+-]?[0-9](?:_?[0-9])*|[0-9](?:_?[0-9])*\.[0-9](?:_?[0-9])*|\.[0-9](?:_?[0-9])*|0[0-7](?:_?[0-7])*|[1-9](?:_?[0-9])*|0)(?![\w.])/g

  const result = []
  let lastIndex = 0
  let match

  numberRegex.lastIndex = 0

  while ((match = numberRegex.exec(text)) !== null) {
    const numberValue = match[0]
    const matchIndex = match.index

    if (matchIndex > lastIndex) {
      const textSegment = text.slice(lastIndex, matchIndex)
      result.push({ type: 'text', value: textSegment })
    }

    const cleanedValue = numberValue.replace(/_/g, '')
    let isValid = true

    try {
      if (numberValue.startsWith('0x') || numberValue.startsWith('0X')) {
        parseInt(cleanedValue.slice(2), 16)
      } else if (numberValue.startsWith('0b') || numberValue.startsWith('0B')) {
        parseInt(cleanedValue.slice(2), 2)
      } else if (numberValue.startsWith('0o') || numberValue.startsWith('0O')) {
        parseInt(cleanedValue.slice(2), 8)
      } else if (/^0[0-7]/.test(numberValue)) {
        parseInt(cleanedValue, 8)
      } else {
        parseFloat(cleanedValue)
      }
    } catch {
      isValid = false
    }

    if (isValid) {
      result.push({
        type: 'number',
        value: cleanedValue,
        raw: numberValue
      })
    } else {
      result.push({ type: 'text', value: numberValue })
    }

    lastIndex = numberRegex.lastIndex
  }

  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex)
    result.push({ type: 'text', value: remainingText })
  }

  return result
}

export function copyText<T extends string>(text: T): Promise<T> {
  let resolve: (value: T) => void
  let reject: (reason: T) => void
  const propmise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {
        resolve(text)
      },
      (err) => {
        reject(err)
      }
    )
  } else {
    setTimeout(() => {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        resolve(text)
      } catch (error) {
        reject(error as T)
      }
    })
  }
  return propmise
}

function styleToString(style: CSSStyleDeclaration): string {
  // There are some different behavior between Firefox & Chrome.
  // We have to handle this ourself.
  const styleNames = Array.prototype.slice.apply(style)
  return styleNames.map((name: string) => `${name}: ${style.getPropertyValue(name)};`).join('')
}

function pxToNumber(value: string) {
  if (!value) {
    return 0
  }
  const match = value.match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}

let ellipsisContainer: HTMLDivElement | null = null
export const getRenderText = (
  originEle: HTMLElement,
  rows: number,
  content = '',
  fixedContent: {
    expand: Node
    copy: Node
  },
  ellipsisStr: string,
  suffix: string,
  ellipsisPos: string,
  isStrong: boolean
) => {
  if (content.length === 0) {
    return ''
  }
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement('div')
    ellipsisContainer.setAttribute('aria-hidden', 'true')
    document.body.appendChild(ellipsisContainer)
  }

  const originStyle = window.getComputedStyle(originEle)
  const originCSS = styleToString(originStyle)
  const lineHeight = pxToNumber(originStyle.lineHeight)
  const maxHeight = Math.round(
    lineHeight * (rows + 1) +
      pxToNumber(originStyle.paddingTop) +
      pxToNumber(originStyle.paddingBottom)
  )

  ellipsisContainer.setAttribute('style', originCSS)
  ellipsisContainer.style.position = 'fixed'
  ellipsisContainer.style.left = '0'

  if (originStyle.getPropertyValue('width') === 'auto' && originEle.offsetWidth) {
    ellipsisContainer.style.width = `${originEle.offsetWidth}px`
  }

  ellipsisContainer.style.height = 'auto'
  ellipsisContainer.style.top = '-999999px'
  ellipsisContainer.style.zIndex = '-1000'
  if (isStrong) ellipsisContainer.style.fontWeight = '600'

  ellipsisContainer.style.textOverflow = 'clip'
  ellipsisContainer.style.webkitLineClamp = 'none'

  ellipsisContainer.innerHTML = ''

  function inRange() {
    if (!ellipsisContainer) {
      return
    }
    // If content does not wrap due to line break strategy, width should be judged to determine whether it's in range
    const widthInRange = ellipsisContainer.scrollWidth <= ellipsisContainer.offsetWidth
    const heightInRange = ellipsisContainer.scrollHeight < maxHeight

    return rows === 1 ? widthInRange && heightInRange : heightInRange
  }

  const ellipsisContentHolder = document.createElement('span')
  const textNode = document.createTextNode(content)

  ellipsisContentHolder.appendChild(textNode)

  if (suffix.length > 0) {
    const ellipsisTextNode = document.createTextNode(suffix)
    ellipsisContentHolder.appendChild(ellipsisTextNode)
  }
  ellipsisContainer.appendChild(ellipsisContentHolder)

  Object.values(omit(fixedContent, 'expand')).map(
    (node) => node && ellipsisContainer?.appendChild(node.cloneNode(true))
  )

  function appendExpandNode() {
    if (!ellipsisContainer) return
    ellipsisContainer.innerHTML = ''
    ellipsisContainer.appendChild(ellipsisContentHolder)
    Object.values(fixedContent).map(
      (node) => node && ellipsisContainer?.appendChild(node.cloneNode(true))
    )
  }

  function getCurrentText(text: string, pos: number) {
    const end = text.length
    if (!pos) {
      return ellipsisStr
    }
    if (ellipsisPos === 'end') {
      return text.slice(0, pos) + ellipsisStr
    }
    return text.slice(0, pos) + ellipsisStr + text.slice(end - pos, end)
  }

  function measureText(
    textNode: Text,
    fullText: string,
    startLoc = 0,
    endLoc = fullText.length,
    lastSuccessLoc = 0
  ): string {
    const midLoc = Math.floor((startLoc + endLoc) / 2)
    const currentText = getCurrentText(fullText, midLoc)
    textNode.textContent = currentText
    if (startLoc >= endLoc - 1 && endLoc > 0) {
      // Loop when step is small
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = getCurrentText(fullText, step)
        textNode.textContent = currentStepText
        if (inRange()) {
          return currentStepText
        }
      }
    } else if (endLoc === 0) {
      return ellipsisStr
    }

    if (inRange()) {
      return measureText(textNode, fullText, midLoc, endLoc, midLoc)
    }
    return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc)
  }

  let resText = content

  if (!inRange()) {
    appendExpandNode()
    resText = measureText(
      textNode,
      content,
      0,
      ellipsisPos === 'middle' ? Math.floor(content.length / 2) : content.length
    )
  }
  ellipsisContainer.innerHTML = ''
  return resText
}
