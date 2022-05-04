import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../lib/jwt"

export default function tokenValidator() {
  return function (req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).json({ message: 'Missing autorization header' } )
      return
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer') {
      res.status(401).json({ message: 'Missing autorization header' })
      return
    }

    try {
      const tokenPayload = verifyToken(token)
      req.user = tokenPayload
    } catch {
      res.status(401).json({ message: 'Missing autorization header' })
      return
    }

    return next() //retorna a la siguiente funcion 
  }
}