import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import getToken from '../middlewares/tokens'
import { order, orderStore } from '../models/orders'

const store = new orderStore()


const create = async (req: Request, res: Response) => {
    const o: order = {
        user_id: req.body.user_id,
        status: req.body.status,
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
    const orders = await store.create(o)
    res.json(orders)
}

const completedOrders = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const orders = await store.completedOrders(id)
        res.json(orders)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getActiveOrders = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const order = await store.getActiveOrders(id)
        res.json(order)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}
const addProductTOOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const order = await store.addProductTOOrder(id, req.body.product_id, req.body.quantity)
        res.json(order)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}


const orders_routes = (app: express.Application) => {
    app.post('/orders/add', create)
    app.get('/orders/completed/:id', getToken, completedOrders)
    app.get('/orders/user/:id', getToken, getActiveOrders)
    app.post('/orders/addProduct/:id', getToken, addProductTOOrder)
}




export default orders_routes;