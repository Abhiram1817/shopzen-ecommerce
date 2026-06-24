const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET CART ITEMS
router.get('/', verifyToken, (req, res) => {
  db.query(
    `SELECT cart.id, cart.quantity, products.name, 
     products.price, products.image_url 
     FROM cart 
     JOIN products ON cart.product_id = products.id 
     WHERE cart.user_id = ?`,
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch cart' });
      res.json(results);
    }
  );
});

// ADD TO CART
router.post('/add', verifyToken, (req, res) => {
  const { product_id, quantity } = req.body;

  // Check if already in cart
  db.query(
    'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
    [req.user.id, product_id],
    (err, results) => {
      if (results.length > 0) {
        // Update quantity
        db.query(
          'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
          [quantity, req.user.id, product_id],
          (err) => {
            if (err) return res.status(500).json({ message: 'Failed to update cart' });
            res.json({ message: 'Cart updated!' });
          }
        );
      } else {
        // Add new item
        db.query(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [req.user.id, product_id, quantity],
          (err) => {
            if (err) return res.status(500).json({ message: 'Failed to add to cart' });
            res.json({ message: 'Added to cart!' });
          }
        );
      }
    }
  );
});

// UPDATE QUANTITY
router.put('/update/:id', verifyToken, (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
    [quantity, id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update' });
      res.json({ message: 'Quantity updated!' });
    }
  );
});

// REMOVE FROM CART
router.delete('/remove/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.query(
    'DELETE FROM cart WHERE id = ? AND user_id = ?',
    [id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Failed to remove' });
      res.json({ message: 'Item removed!' });
    }
  );
});

module.exports = router;
