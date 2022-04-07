//@ts-ignore
import client from "../database"


export type order = {
    id?: number;
    user_id: number;
    status: string;
}

export class orderStore {
    async create(order: order): Promise<order> {

        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [order.user_id, order.status])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order ${order.id}. Error: ${err}`)
        }
    }
    async getActiveOrders(user_id: number): Promise<order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            //@ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [user_id, 'active'])
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get active orders for user ${user_id}. Error: ${err}`)
        }

    }
    async completedOrders(user_id: number): Promise<order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            //@ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [user_id, 'completed'])
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get completed orders for user ${user_id}. Error: ${err}`)
        }
    }
    async addProductTOOrder(order_id: number, product_id: number, quantity: number): Promise<order> {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2,$3) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [order_id, product_id, quantity])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add product to order ${order_id}. Error: ${err}`)
        }
    }
}

