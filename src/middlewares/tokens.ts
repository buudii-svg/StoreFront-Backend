import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


async function getToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        //@ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

export default getToken;