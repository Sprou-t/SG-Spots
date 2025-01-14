import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
import express from 'express';
import connectDb from './db.js';
import cors from 'cors';
import reviewRoutes from './routes/routes.review.js';
import userRoutes from './routes/routes.user.js';
import TIHDataRoutes from './routes/routes.tih.js';
import handleVerificationRoutes from './routes/routes.verifyEmail.js';
import path from 'path'
// Initialize express app
const app = express();

// serve the static files that are already built and served to backend
app.use(express.static('dist'));

// Middleware to parse JSON payloads
app.use(express.json());
app.use(cors());

// Define routes
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
// app.use('/tempUserDetail', tempUser)
app.use('/TIHData', TIHDataRoutes);
app.use('/verifyEmail', handleVerificationRoutes);

// Set the port
const PORT = process.env.PORT || 3000;

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
