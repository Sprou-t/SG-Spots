import mongoose from "mongoose";
const { Schema } = mongoose;

// TODO:link to userdb and find a way to upload image either thru api or by download

const itenarySchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now, //this field is auto inserted w that point in time
	},
	// this field will store a MongoDB ObjectId
	// ref: "User" tells Mongoose that this ObjectId refers to a document in the "User" collection
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: {
		type: String,
		// required:true,
	},
});

//creates an Itenaries collection
const itenary = mongoose.model("Itenary", itenarySchema);
export default itenary;
