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
import path from 'path';
import { fileURLToPath } from 'url';
// Initialize express app
const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
// serve the static files that are already built and served to backend
app.use(express.static('dist'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Middleware to parse JSON payloads
app.use(express.json());
app.use(cors());

// Define routes
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
app.use('/TIHData', TIHDataRoutes);
app.use('/verifyEmail', handleVerificationRoutes);

// Set the port
const PORT = process.env.PORT || 8080;

// Start the server and connect to the database
app.listen(PORT, '0.0.0.0', () => {
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
