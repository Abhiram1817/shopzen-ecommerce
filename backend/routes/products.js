const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET ALL PRODUCTS
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch products' });
    res.json(results);
  });
});

// GET SINGLE PRODUCT
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch product' });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
});

// GET PRODUCTS BY CATEGORY
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  db.query(
    'SELECT * FROM products WHERE category = ?',
    [category],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch products' });
      res.json(results);
    }
  );
});

module.exports = router;
