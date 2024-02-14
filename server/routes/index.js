// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await req.db.query('SELECT $1::text as message', ['Hello from the server!']);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
