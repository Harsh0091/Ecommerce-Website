// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity, price, imageUrl, name } = req.body;
      //console.log('Received data:', { userId, productId, quantity, price, imageUrl, name });
    if (!userId || !productId || !quantity || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if item already exists in cart
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // Update the quantity if item exists
      cartItem.quantity += quantity;
      await cartItem.save();
      return res.status(200).json(cartItem);
    }

    // Create a new cart item if it does not exist
    cartItem = new Cart({ userId, productId, quantity, price, imageUrl, name });
    await cartItem.save();
    res.status(201).json(cartItem);
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear all items in the cart for a user
router.delete('/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get cart items for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
