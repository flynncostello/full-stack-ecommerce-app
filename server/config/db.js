const { Pool } = require('pg');

// Replace these values with your actual database connection details
const pool = new Pool({
  user: 'example_customer',
  host: 'localhost',
  database: 'ecommerce_webapp',
  password: 'example_customer',
  port: 5432,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

module.exports = pool;
