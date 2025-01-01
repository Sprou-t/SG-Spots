// model  contains data from api as well as user's comments:ask chatgpt
// db will save the data from api
// i think for mvp do not implement the auto update shit

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Attraction schema
const attractionSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		type: {
			type: String,
		},
		description: {
			type: String,
		},
		rating: {
			type: Number,
			default: 0,
		},
		pricing: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		openingTime: {
			type: String,
			required: true,
		},
		closingTime: {
			type: String,
			required: true,
		},
		imageURL: [
			{
				type: String,
			},
		],
		website: {
			type: String,
		},
		tags: [
			{
				type: String,
			},
		],
		reviews: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Review',
			default: [],
		},
	},
	{ timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Attraction model
const Attraction = model('Attraction', attractionSchema);

export default Attraction;
