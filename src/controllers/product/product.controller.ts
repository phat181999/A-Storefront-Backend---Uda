import express, { NextFunction, Request, Response } from 'express'
import productService from '../../services/products/product.service'
import Product from '../../interfaces/product.interfaces'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, price, categoryId }: Product = req.body
    if (!name || !price || !categoryId) {
      res.status(400).json({ error: 'Missing some field' })
    }
    const data = await productService.createProduct({
      name,
      price,
      categoryId,
    })
    res.status(200).json({ data: data.rows[0] })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await productService.getAllProducts()
    res.status(200).json({ data: data.rows })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id }: any = req.params
    const data = await productService.getProduct(id)
    res.status(200).json({ data: data.rows })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id }: any = req.params
    const parsedId = parseInt(id, 10)

    const { name, price, categoryId }: Product = req.body
    const data = await productService.updateProduct(parsedId, {
      name,
      price,
      categoryId,
    })
    res.status(200).json({ data: data.rows })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}

export const deteleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id }: any = req.params
    const data = await productService.deleteProduct(id)
    res.status(200).json({ 'Delte Product': data.rows })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}
