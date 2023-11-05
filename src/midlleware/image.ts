class ImageMiddleware {
  private getFileExtension(url: string): string {
    const urlParts = url.split('.')
    if (urlParts.length > 0) {
      return `.${urlParts[urlParts.length - 1].toLowerCase()}`
    }
    return ''
  }

  async checkImage(url: string): Promise<boolean> {
    try {
      const validImageExtensions = ['.png', '.jpeg', '.jpg']
      const extension = this.getFileExtension(url)

      if (validImageExtensions.includes(extension)) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }

  async checkEndpoint(url: string): Promise<boolean> {
    try {
      const urlParts = url.slice(url.indexOf('url'))

      if (urlParts) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }
}

export default ImageMiddleware
