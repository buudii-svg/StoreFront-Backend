import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import{product , productStore} from '../models/products'

const store = new productStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = await store.show(id)
    res.json(product)
}
const create = async (req: Request, res: Response) => {
    const p: product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        //@ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    const product = await store.create(p)
    res.json(product)
}


const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products/add', create)
}




export default product_routes;