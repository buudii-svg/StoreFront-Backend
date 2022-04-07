Udacity: Build A Storefront Backend
This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the REQUIRMENTS.md

Installation Instructions
You can fork this repo and run the following command at the root directory to install all packages.

npm install

Set up Database
Create Databases
We shall create the dev and test database.

connect to the default postgres database as the server's root user psql -U postgres
In psql run the following to create a user
CREATE USER client WITH PASSWORD '123456';
In psql run the following to create the dev and test database
CREATE DATABASE market;
CREATE DATABASE market_test;
Connect to the databases and grant all privileges
Grant for dev database
\c market
GRANT ALL PRIVILEGES ON DATABASE market TO client;
Grant for test database
\c market_test
GRANT ALL PRIVILEGES ON DATABASE market_test TO client;
Migrate Database
Navigate to the root directory and run the command below to migrate the database

db-migrate up
npm run watch

Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a .env file. This is the default setting that I used for development, but you can change it to what works for you.

NB: The given values are used in developement and testing.

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=market
POSTGRES_TEST=market_test
POSTGRES_USER=client
POSTGRES_PASSWORD=123456

ENV=dev
BCRYPT_PASSWORD=secret-password
SALT_ROUNDS=10
PEPPER=secret-pepper
TOKEN_SECRET=secret-key

Start App
npm run watch

Running Ports
After start up, the server will start on port 3000 and the database on port 5432

Endpoint Access
All endpoints are described in the REQUIRMENTS.md file.

Token and Authentication
Tokens are passed along with the http header as

Authorization   Bearer <token>

Testing
npm run test
