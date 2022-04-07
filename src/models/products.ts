//@ts-ignore
import client from "../database"


export type product = {
    id?: Number;
    name: string;
    price: number;
    category: string;
};

export class productStore {

    async index(): Promise<product[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get any product. Error: ${err}`);
        }
    }

    async show(id: number): Promise<product> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async create(product: product): Promise<product> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`);
        }
    }
    async getProductsByCategory(category: string): Promise<product[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products by category ${category}. Error: ${err}`);
        }
    }
}

