// connect with db
import mongoose from 'mongoose';

const connectDb = async () => {
	// connecting a db takes time hence async
	const url = process.env.MONGO_URI
	try {
		const conn = await mongoose.connect(url); //returns an obj once connection successful
	} catch (error) {
		console.log(`Error: ${error.message}`); //access the msg prop of the error obj
		process.exit(1); //ensure process stops running to prevent unwanted behaviours
	}
};

export default connectDb;
