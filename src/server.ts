import express from 'express';
import bodyParser from 'body-parser';
import product_routes from './handlers/productsHandler';
import users_routes from './handlers/usersHandler';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';
// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions));
app.use(bodyParser.json());

product_routes(app)
users_routes(app)


app.listen(3000, () => {
    console.log(`server started at localhost:${address}`);
});
