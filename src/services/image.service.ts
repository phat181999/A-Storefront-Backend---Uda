import sharp from 'sharp'

class ImageService {
  async resizeImage(width: number, height: number) {
    const image = await sharp({
      create: {
        width: width,
        height: height,
        channels: 3,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
    return image
      .jpeg()
      .png()
      .toBuffer()
      .then(data => {
        return data
      })
  }
}

export default ImageService
