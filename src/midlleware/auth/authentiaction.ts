import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

class Auth {
  private readonly secretKey = 'phatht8'
  async authentication(
    userId: number,
    userName: string,
  ): Promise<string | null> {
    const token = jwt.sign(
      { userId: userId, username: userName },
      this.secretKey,
      {
        expiresIn: '1h',
      },
    )
    return token
  }

  authorize(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers && req.headers['authorization']
    if (
      typeof authorizationHeader === 'string' &&
      authorizationHeader.startsWith('Bearer ')
    ) {
      // Extract the token from the Authorization header
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, 'phatht8')
      if (decoded) {
        // Token is present, proceed to the next middleware or route handler
        next()
        return
      }
    }

    // Token is not present or in an invalid format, send an unauthorized response
    res.status(401).json({ message: 'Unauthorized' })
  }
}
const authService = new Auth()

export default authService
