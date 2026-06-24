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

// GET ALL ORDERS
router.get('/', verifyToken, (req, res) => {
  db.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch orders' });
      res.json(results);
    }
  );
});

// PLACE ORDER
router.post('/place', verifyToken, (req, res) => {
  const user_id = req.user.id;

  // Get all cart items
  db.query(
    `SELECT cart.quantity, products.price 
     FROM cart 
     JOIN products ON cart.product_id = products.id 
     WHERE cart.user_id = ?`,
    [user_id],
    (err, cartItems) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch cart' });
      if (cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty!' });

      // Calculate total
      const total = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      // Create order
      db.query(
        'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
        [user_id, total, 'pending'],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Failed to place order' });

          // Clear cart after order
          db.query(
            'DELETE FROM cart WHERE user_id = ?',
            [user_id],
            (err) => {
              if (err) return res.status(500).json({ message: 'Failed to clear cart' });
              res.json({ 
                message: 'Order placed successfully!',
                order_id: result.insertId,
                total_amount: total
              });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
