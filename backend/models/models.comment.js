import mongoose from "mongoose";
const { Schema } = mongoose;

/* TODO:
1. link to userdb and find a way to upload image either thru api or by download
2. link to attraction */

const commentSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now, //this field is auto inserted w that point in time
	},
	// this field will store a MongoDB ObjectId
	// ref: "User" tells Mongoose that this ObjectId refers to a document in the "User" collection
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	rating: { // control the rating to be /5 in frontend
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
});

//creates an comments collection
const comment = mongoose.model("Comment", commentSchema);
export default comment;
