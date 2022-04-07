# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index '/products' [GET]'
- Show '/products/:id' [GET]
- Create [token required] '/products/add' [POST] {name: string, price: number, category: string}
- [OPTIONAL] Products by category (args: product category) '/products/category/:category' [GET]

#### Users
- Index [token required] '/users' [GET]
- Show [token required] '/users/:id' [GET]
- Create [token required] '/users/add' [POST] {first_name: string, last_name: string, password: string}

#### Orders
- Current Order by user (args: user id)[token required] '/orders/user/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] '/orders/completed/:id' [GET]
- [ADDED] Add product to order [token required] '/orders/addProduct/:id' [POST] {quantity: number, order_id: number, product_id: number}

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
Table: products (id: SERIAL PRIMARY KEY, name: VARCHAR(100), price: INTEGER, category: VARCHAR(50))

#### User
- id
- first_name
- last_name
- password
Table: users (id: SERIAL PRIMARY KEY, first_name:varchar(100), last_name:varchar(100), password:varchar(250))

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
Table: orders (id: SERIAL PRIMARY KEY, user_id: bigint, price: INTEGER, status: VARCHAR(100))