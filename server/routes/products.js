const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const router = express.Router();
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 2 * 1024 * 1024 } // Limit to 2MB
});

// Add a new product with image upload
router.post('/', upload.single('imageUrl'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read the file and convert it to Base64
    const filePath = req.file.path;
    const file = fs.readFileSync(filePath);
    const imageBase64 = Buffer.from(file).toString('base64');

    // Remove the temporary file
    fs.unlinkSync(filePath);

    const { name, price, description, category, stock } = req.body;

    const newProduct = new Product({
        name,
        price,
        description,
        category,
        stock,
        imageUrl: `data:${req.file.mimetype};base64,${imageBase64}` // Store Base64 string
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve image by ID
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Return image as a Base64 data URL
        res.send(product.imageUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a product
router.put('/:id', upload.single('imageUrl'), async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updateData = {
        name,
        price,
        description,
        category,
        stock,
    };

    // Check if an image was uploaded
    if (req.file) {
        // Read the file and convert it to Base64
        const filePath = req.file.path;
        const file = fs.readFileSync(filePath);
        const imageBase64 = Buffer.from(file).toString('base64');

        // Remove the temporary file
        fs.unlinkSync(filePath);

        updateData.imageUrl = `data:${req.file.mimetype};base64,${imageBase64}`; // Update the imageUrl if a new file is uploaded
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
