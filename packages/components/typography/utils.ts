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
