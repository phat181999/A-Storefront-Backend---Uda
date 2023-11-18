import express, { NextFunction, Request, Response } from 'express'
import categoryService from '../../services/categorys/category.services'
import Category from '../../interfaces/category.interface'
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { categoryName }: Category = req.body
    if (!categoryName) {
      res.status(400).json({ error: 'Name is required' })
    }
    const data = await categoryService.createCategory({ categoryName })
    res.status(201).json({ data: data.rows[0] })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}
