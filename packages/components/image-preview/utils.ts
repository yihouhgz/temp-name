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
