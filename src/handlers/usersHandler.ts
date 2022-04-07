import express, { Request, Response } from 'express'
import { user, userStore } from '../models/users'
import jwt from 'jsonwebtoken'
import getToken from '../middlewares/tokens'

const store = new userStore()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
}catch(error){
    res.status(400)
    res.json(error)
}
}
const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = await store.show(id)
    res.json(user)
}
const create = async (req: Request, res: Response) => {
    const u: user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    };
    const user = await store.create(u)
    //@ts-ignore
    var token = jwt.sign({ u: user }, process.env.TOKEN_SECRET)
    res.json(token)
}


const users_routes = (app: express.Application) => {
    app.get('/users',getToken, index)
    app.get('/users/:id',getToken, show)
    app.post('/users/add', create)
}




export default users_routes;

