import express from 'express';
import bodyParser from 'body-parser';
import product_routes from './handlers/productsHandler';
import users_routes from './handlers/usersHandler';
import orders_routes from './handlers/ordersHandler';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

product_routes(app)
users_routes(app)
orders_routes(app)


app.listen(3000, () => {
    console.log(`server started at localhost:${address}`);
});

export default app;