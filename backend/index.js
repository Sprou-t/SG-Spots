// this is the most fundamental file used to build the express app. it listens to port in dev mode
import express, { request, response } from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';
import cors from 'cors';
import reviewRoutes from './routes/routes.review.js';
import userRoutes from './routes/routes.user.js';
import apiRoutes from './routes/routes.apiCall.js';
import TIHDataRoutes from './routes/routes.TIH.js'

dotenv.config();
const app = express();
const TIH_key = process.env.TIH_API_KEY
// console.log("TIH_key ==> ", TIH_key);

// this line allow our express app to parse(read) requests with json payloads(data)
app.use(express.json());
app.use(cors());
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
app.use('/api', apiRoutes);
app.use('/TIHData', TIHDataRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
	connectDb();
	console.log('server listening on Port:', PORT);
});
