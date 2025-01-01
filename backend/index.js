// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';
import cors from 'cors';
import reviewRoutes from './routes/routes.review.js';
import userRoutes from './routes/routes.user.js';
import apiRoutes from './routes/routes.apiCall.js';
import TIHDataRoutes from './routes/routes.tih.js';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());
app.use(cors());

// Define routes
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
app.use('/api', apiRoutes);
app.use('/TIHData', TIHDataRoutes);

// Set the port
const PORT = process.env.PORT;

// Start the server and connect to the database
app.listen(PORT, () => {
    // Connect to MongoDB
    connectDb()
        .then(() => {
            console.log('MongoDB connected successfully');
            console.log('Server is listening on Port:', PORT);
        })
        .catch((error) => {
            console.log('MongoDB connection error:', error.message);
        });
});
