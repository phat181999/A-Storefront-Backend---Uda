import express, { NextFunction, Request, Response } from 'express'
import UserServices from '../../services/users/users.services'
import User from '../../interfaces/user.interface'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { firstName, lastName, password }: User = req.body
    if (!firstName || !lastName || !password) {
      res.status(400).json({ error: 'Name is required' })
    }
    const data = await UserServices.createUser({
      firstName,
      lastName,
      password,
    })
    res.status(201).json({ data: data.rows[0] })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { firstName, password }: User = req.body
    if (!firstName || !password) {
      res.status(400).json({ error: 'Missing some field' })
    }
    const data = await UserServices.signInUser(firstName, password)
    res.status(200).json({ 'SignIn Successfully': data })
  } catch (err) {
    next()
    res.status(501).json({ err: 'error' })
  }
}
