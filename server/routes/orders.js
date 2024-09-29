// server/routes/orders.js
const express = require('express');
const router = express.Router();
const Order =    require('../models/Order');
const mongoose = require('mongoose');
// List all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
// server/routes/orders.js
router.get('/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;

      // Validate user ID
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Fetch orders
      const orders = await Order.find({ user: userId });

      if (!orders.length) {
          return res.status(404).json({ message: 'No orders found for this user' });
      }

      res.json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Add a new order
router.post('/', async (req, res) => {
  const { user, products, totalPrice } = req.body;

  if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: 'Invalid user ID' });
  }

  // Map product IDs to ObjectId and validate
  const formattedProducts = products.map(p => ({
      name: p.name,
      imageUrl: p.imageUrl,
      quantity: p.quantity
  }));

  try {
      const newOrder = new Order({
          user: new mongoose.Types.ObjectId(user),
          products: formattedProducts,
          totalPrice,
          orderStatus: 'Pending'
      });

      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
  } catch (error) {
      res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Update an order
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;