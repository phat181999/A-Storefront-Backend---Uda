import express, { NextFunction, Request, Response } from 'express'
import produdctService from '../../services/product.service'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, price, categoryId } = req.body
    const data = await produdctService.createProduct({
      name,
      price,
      categoryId,
    })
    res.status(200).json({ data: data })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}
