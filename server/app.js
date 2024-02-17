const express = require('express');
const passport = require('passport');
const session = require('express-session');
const pool = require('./config/db');
const initializePassport = require('./passport-config');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userRoutes = require('./routes/user_routes');
const productRoutes = require('./routes/product_routes');

initializePassport(passport);

const app = express();

const secretKey = crypto.randomBytes(64).toString('hex');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: secretKey,
    cookie: { maxAge: 3000000 },
    resave: false,
    saveUninitialized: false,
    sameSite: 'none',
    secure: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//// ROUTES ////

// User Routes
app.use('/api/users', userRoutes);

// Product Routes
app.use('/api/products', productRoutes);

// Login route
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: 'authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Return the user's ID in the response
      return res.json({ success: true, message: 'Logged in successfully', userId: user.user_id });
    });
  })(req, res, next);
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, password, first_name, last_name, mobile, email } = req.body;
  const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (username, password, first_name, last_name, mobile, email) VALUES ($1, $2, $3, $4, $5, $6)', [username, hashedPassword, first_name, last_name, mobile, email]);
    // Generate a token or send a success message
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout route
app.get('/api/logout', (req, res) => {
  req.logout();
  res.json({ success: true, message: 'Logged out successfully' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



/*
ALL APP ENDPOINTS

users:
GET /api/users - getting all users
POST /api/users - creating new user
GET /api/users/:userId - getting specific user
PUT /api/users/:userId - updating user
DELETE /api/users/:userId - deleting user

user_addresses:
GET /api/users/:userId/address - getting user address
POST /api/users/:userId/address - creating user address
PUT /api/users/:userId/address - updating user address
DELETE /api/users/:userId/address - deleting user address

user_payment_methods:
GET /api/users/:userId/paymentMethods - getting user payment methods
GET /api/users/:userId/paymentMethods/:paymentId - getting specific user payment method
POST /api/users/:userId/paymentMethods - creating user payment method
PUT /api/users/:userId/paymentMethods/:paymentId - updating user payment method
DELETE /api/users/:userId/paymentMethods/:paymentId - deleting user payment method

carts:
GET /api/users/:userId/cart - getting user cart
POST /api/users/:userId/cart - creating user cart
DELETE /api/users/:userId/cart - deleting user cart

cart_items:
GET /api/users/:userId/cart/items - getting all cart items
GET /api/users/:userId/cart/items/:productId - getting specific cart item
POST /api/users/:userId/cart/items - creating cart item
PUT /api/users/:userId/cart/items/:productId - updating cart item
DELETE /api/users/:userId/cart/items/:productId - deleting cart item

checkouts:
GET /api/users/:userId/checkouts - getting user checkout session
POST /api/users/:userId/checkouts - creating user checkout session
DELETE /api/users/:userId/checkouts - deleting user checkout session

orders:
GET /api/users/:userId/orders - getting all user orders
POST /api/users/:userId/orders - creating new user order
GET /api/users/:userId/orders/:orderId - getting specific user order
DELETE /api/users/:userId/orders/:orderId - deleting user order

order_status:
GET /api/users/:userId/orders/:orderId/status - getting order status
POST /api/users/:userId/orders/:orderId/status - creating order status
PUT /api/users/:userId/orders/:orderId/status - updating order status

order_items:
GET /api/users/:userId/orders/:orderId/items - getting all order items
GET /api/users/:userId/orders/:orderId/items/:productId - getting specific order item
POST /api/users/:userId/orders/:orderId/items - creating order item

products:
GET /api/products - getting all products
GET /api/products/:productId - getting specific product
POST /api/products - creating new product
PUT /api/products/:productId - updating product
DELETE /api/products/:productId - deleting product
*/
