//@ts-ignore
import client from '../databse';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
    SALT_ROUNDS,
    PEPPER
} = process.env

export type user = {
    id?: Number;
    first_name: string;
    last_name: string;
    password: string;
};

export class userStore {

    async index(): Promise<user[]> {
        try {
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }


    async show(id: number): Promise<user> {
        try {
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err: any) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(user: user): Promise<user> {
        try {
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(
                user.password + PEPPER,
                //@ts-ignore
                parseInt(SALT_ROUNDS)
            );
            const result = await conn.query(sql, [user.first_name, user.last_name, hash])
            conn.release()
            return result.rows[0]
        } catch (err: any) {
            throw new Error(`Could not create user ${err}`)
        }
    }
}

