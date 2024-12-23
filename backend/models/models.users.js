import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	// username is used for logging so it must be unique
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	//store hashed ver of password, thus must hash password first in controller
	passwordHash: {
		//TODO: make password req more robust(prob not for easy going website)
		type: String,
		required: true,
		minlength: 3,
	},
	comments: {
		type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
		ref: "Comment", // Reference to the Comment model
		default: [], // Default value if no itineraries are provided
	},
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		// passwordHash should not be revealed to client side when converted to JSON
		delete returnedObject.passwordHash;
	},
});

const user = mongoose.model('User', userSchema);
export default user;


