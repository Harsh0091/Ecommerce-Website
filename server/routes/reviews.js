// server/routes/reviews.js
const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// Create a review
router.post('/', async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
});

// Get reviews for a product
router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ productId: req.params.productId }).populate('userId');
  res.json(reviews);
});

module.exports = router;
