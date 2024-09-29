// server/index.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./config/db'); // Import the db connection function
const { logger, errorHandler } = require('./middleware/middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(logger);

// Function to start the server and connect to the database
const startServer = async () => {
    try {
        const gfs = await db(); // Connect to the database and get GridFS instance
        app.locals.gfs = gfs; // Store gfs in app locals

        // Import routes
        const authRoutes = require('./routes/authRoutes');
        const productRoutes = require('./routes/products'); 
        const orderRoutes = require('./routes/orders');
        const reviewRoutes = require('./routes/reviews');
        const cartRoutes = require('./routes/cartRoutes');
        const userRoutes = require('./routes/users')

        // Use routes
        app.use('/api/auth', authRoutes);
        app.use('/api/products', productRoutes);
        app.use('/api/orders', orderRoutes);
        app.use('/api/reviews', reviewRoutes);
        app.use('/api/cart', cartRoutes);
        app.use('/api/users', userRoutes);

        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();