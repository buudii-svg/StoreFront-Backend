import express, { Request, Response } from 'express'
import getToken from '../middlewares/tokens'
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
    const product = await store.create(p)
    res.json(product)
}
const getProductsByCategory = async (req: Request, res: Response) => {
    const category = req.params.category
    const products = await store.getProductsByCategory(category)
    res.json(products)
}

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products/add',getToken, create)
    app.get('/products/category/:category', getProductsByCategory)
}




export default product_routes;