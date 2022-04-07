//@ts-ignore
import client from "../database"


export type order = {
    id?: number;
    user_id: string;
    status: string;
}

export class orderStore {

    async index(): Promise<order[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get any order. Error: ${err}`);
        }
    }

    async show(id: number): Promise<order> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`);
        }
    }

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
}

