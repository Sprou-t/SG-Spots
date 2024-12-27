import mongoose from 'mongoose';
const { Schema } = mongoose;

/* TODO:
1. link to userdb and find a way to upload image either thru api or by download
2. link to attraction */

const reviewSchema = new Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now, //this field is auto inserted w that point in time
		},
		// this field will store a MongoDB ObjectId
		// ref: "User" tells Mongoose that this ObjectId refers to a document in the "User" collection
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required:true
		},

		attractionId:{
			type: mongoose.Schema.Types.ObjectId,
			ref:'Attraction',
			required:true
		},

		rating: {
			// control the rating to be /5 in frontend
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		images: {
			type: String,
		},
	},
	{ timestamps: true } // Automatically adds createdAt and updatedAt fields
);

//creates an reviews collection
const review = mongoose.model('Review', reviewSchema);
export default review;
