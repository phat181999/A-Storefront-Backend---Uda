import express, { NextFunction, Request, Response } from 'express'
import ImageService from '../../services/image.service'
import ImageMiddlware from '../../midlleware/image'

const imageService = new ImageService()
const imageMiddlware = new ImageMiddlware()

export const ImageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { width, height } = req.params
    const url = req.url

    if (!req.params) {
      return res.status(400).json('Missing width or height')
    }

    if (await !imageMiddlware.checkEndpoint(url)) {
      return res.status(400).json('Missing endpoint image')
    }

    if (await imageMiddlware.checkImage(url)) {
      const image = await imageService.resizeImage(
        parseInt(width),
        parseInt(height),
      )
      res.set('Content-Type', 'image/jpeg')
      res.status(200).send(image)
    } else {
      res.status(400).json('Image type invalid')
    }
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}
