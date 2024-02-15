// app.js
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();

// Getting routes
const userRoutes = require('./routes/user_routes');
const productRoutes = require('./routes/product_routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

/*
/api/users (GET, POST) - Getting all users or creating new user
/api/users/:userId (GET, PUT, DELETE) - Getting, updating, or deleting specific user

/api/users/addresses (GET) - Getting all user addresses
/api/users/:userId/address (GET, POST, PUT, DELETE) - Getting, creating, updating, or deleting user address

/api/users/:userId/paymentMethods (GET, POST) - Getting or creating user payment
/api/users/:userId/paymentMethods/:paymentId (GET, PUT, DELETE) - Getting, updating or deleting specifc user payment

/api/users/:userId/carts (GET, POST, PUT, DELETE) - Getting, creating, updating, or deleting users cart
/api/users/:userId/carts/:cartId (GET) - Getting all products in user's cart
/api/users/:userId/carts/:cartId/:productId (GET, POST, PUT, DELETE) - Getting, altering, adding or deleting specific cart product

/api/products (GET, POST) - Getting all products
/api/products/:productId (GET, PUT, DELETE) - Getting, updating, or deleting specific product

/api/users/:userId/orders (GET, POST) - Getting or creating past order
/api/users/:userId/orders/:orderId (GET, PUT, DELETE) - Getting, updating or deleting specific past order
/api/users/:userId/orders/:orderId/status (GET, PUT, POST, DELETE) - Getting, altering, adding or deleting delivery info
/api/users/:userId/orders/:orderId/items (GET, PUT, POST, DELETE) - Getting, altering, adding or deleting order items
*/

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

