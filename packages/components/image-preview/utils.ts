export const downloadFile = async (url: string, fileName?: string): Promise<boolean> => {
  try {
    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const blob = await response.blob()
    const contentDisposition = response.headers.get('content-disposition')
    const filename =
      fileName ||
      getFileNameFromContentDisposition(contentDisposition) ||
      url.split('/').pop()?.split('.')[0] ||
      ''
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl)
    }, 100)
    return true
  } catch {
    return false
  }
}

// 辅助函数：从Content-Disposition解析文件名
const getFileNameFromContentDisposition = (contentDisposition: string | null): string | null => {
  if (!contentDisposition) return null

  const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
  if (filenameMatch && filenameMatch[1]) {
    return filenameMatch[1].replace(/['"]/g, '')
  }

  return null
}

export const getPreloadImagArr = (
  imgSrc: string[],
  currentIndex: number,
  preLoadGap: number,
  infinite: boolean
): string[] => {
  const beginIndex = currentIndex - preLoadGap
  const endIndex = currentIndex + preLoadGap
  const srcLength = imgSrc.length
  let leftArr = []
  let rightArr = []
  if (preLoadGap >= Math.floor(srcLength / 2)) {
    if (infinite) {
      leftArr = imgSrc
        .concat(imgSrc)
        .slice(beginIndex + srcLength < 0 ? 0 : beginIndex + srcLength, currentIndex + srcLength)
      rightArr = imgSrc
        .concat(imgSrc)
        .slice(currentIndex + 1, endIndex + 1 < 2 * srcLength ? endIndex + 1 : 2 * srcLength)
    } else {
      leftArr = imgSrc.slice(0, currentIndex)
      rightArr = imgSrc.slice(currentIndex + 1, srcLength)
    }
  } else {
    if (infinite) {
      leftArr = imgSrc.concat(imgSrc).slice(beginIndex + srcLength, currentIndex + srcLength)
      rightArr = imgSrc.concat(imgSrc).slice(currentIndex + 1, endIndex + 1)
    } else {
      if (beginIndex >= 0 && endIndex < srcLength) {
        leftArr = imgSrc.slice(beginIndex, currentIndex)
        rightArr = imgSrc.slice(currentIndex + 1, endIndex + 1)
      } else if (beginIndex < 0) {
        leftArr = imgSrc.slice(0, currentIndex)
        rightArr = imgSrc.slice(currentIndex + 1, 2 * preLoadGap + 1)
      } else {
        rightArr = imgSrc.slice(currentIndex + 1, srcLength)
        leftArr = imgSrc.slice(srcLength - 2 * preLoadGap - 1, currentIndex)
      }
    }
  }
  const result = crossMerge(leftArr.reverse(), rightArr)
  const duplicateResult = Array.from(new Set(result))
  return duplicateResult
}

export const crossMerge = (leftArr: string[] = [], rightArr: string[] = []) => {
  let newArr: string[] = []
  const leftLen = leftArr.length
  const rightLen = rightArr.length
  const crossLength = leftLen <= rightLen ? leftLen : rightLen
  new Array(crossLength).fill(0).forEach((item, index) => {
    newArr.push(rightArr[index])
    newArr.push(leftArr[index])
  })
  if (leftLen > rightLen) {
    newArr = newArr.concat(leftArr.slice(rightLen, leftLen))
  } else if (leftLen < rightLen) {
    newArr = newArr.concat(rightArr.slice(leftLen, rightLen))
  }
  return newArr
}
