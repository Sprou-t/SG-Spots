import bcrypt from 'bcrypt';
import User from '../models/models.users.js';
import jwt from 'jsonwebtoken';
import { getAuth } from 'firebase-admin/auth';
import admin from '../firebase/firebase.config.js';

// export const getAllUser = async (req, res) => {
// 	try {
// 		const user = await User.find({}).populate('itenaries', { title: 1 });
// 		res.status(200).json({ success: true, data: user });
// 	} catch (error) {
// 		console.error(`error in obtaining users: ${error.message}`);
// 		res.status(500).json({ success: false, message: 'server error' });
// 	}
// };

// flow: after signing up(new user), create a custom token and send to frontend. frontend
// will send the token to req.body and call the login function.
export const signUp = async (req, res) => {
	// sieve out the data from req.body
	// note username is for id purposes, name only as proxy id
	const { email, username, password } = req.body;
	if (!email || !username || !password) {
		return res // immediately send a response back w/o creating user
			.status(401)
			.json({ success: false, message: 'missing user info' });
	}

	try {
		const userRecord = await admin.auth().createUser({
			email,
			password, //firebase hashes the password
		});
		console.log('userRecord ==> ', userRecord);
		const newUser = new User({
			// note that itenaries will be an empty array by default
			email,
			username,
			firebaseUuid: userRecord.uid,
		});

		await newUser.save();
		// create custom token for new user's first session
		const customToken = await admin.auth().createCustomToken(userRecord.uid);
		console.log('signed up!');
		res.status(200).json({ success: true });
	} catch (error) {
		console.error(`error in user creation: ${error.message}`);
		res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

export const login = async (req, res) => {
	// login function will either get idToken from req of sign up when user signs up 
	// or from frontend when user logs in
	const { email, idToken } = req.body;

	// Step 1: Authenticate with Firebase client SDK on the frontend
	// Step 2: Get the ID token from the client and send it to the backend

	if (!idToken) {
		return res
			.status(400)
			.json({ success: false, message: 'ID token is missing' });
	}

	try {
		// Step 3: Verify the ID token using Firebase Admin SDK
		const decodedToken = await getAuth().verifyIdToken(idToken);

		// Step 4: Retrieve user details from the decoded token
		const userId = decodedToken.uid;

		// Find user in the local database using Firebase UID (from decoded token)
		const user = await User.findOne({ firebaseUuid: userId });

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: 'User not found' });
		}

		// Step 5: Generate your own JWT to keep the session
		const userInfoForToken = {
			email: user.email,
			username: user.username,
			id: user._id, // Use the local user _id for your app
		};

		const token = jwt.sign(userInfoForToken, process.env.SECRET, {
			expiresIn: '48h',
		});

		// Step 6: Send the JWT token to the client for use in future requests
		res.status(200).json({
			userId: user._id,
			token,
			email: user.email,
		});
	} catch (error) {
		console.error(`Error in login: ${error.message}`);
		res.status(500).json({
			success: false,
			message: 'Invalid ID token or user not found',
		});
	}
};

// export const login = async (req, res) => {
// 	let passwordCorrect = false;
// 	const { email, password } = req.body;
// 	// check if username nad password matches
// 	// need {} bcoz we are finding w obj key
// 	const user = await User.findOne({ email });
// 	if (!user) {
// 		res.status(401).json({ success: false, message: 'incorrect username' });
// 	} else {
// 		passwordCorrect = await bcrypt.compare(
// 			//return true if same
// 			password,
// 			user.passwordHash
// 		);
// 	}

// 	if (!passwordCorrect) {
// 		res.status(401).json({ success: false, message: 'incorrect password' });
// 	}
// 	// else if correct create a token for user: token use to verify their identity on sub request w/o checking agn
// 	const userInfoForToken = {
// 		email: user.email,
// 		username: user.username,
// 		id: user._id,
// 	};

// 	const token = jwt.sign(userInfoForToken, process.env.SECRET, {
// 		expiresIn: 48 * 60 * 60,
// 	});
// 	console.log('loggged in!');
// 	res.status(200).json({
// 		userId: user._id,
// 		token, // token: token
// 		email: user.email,
// 	});
// };

// export const updateUser = async (req, res) => {
// 	const { id } = req.params;
// 	// more like updatedUserData
// 	const updatedUserData = req.body; // this new update will be sent in using postman

// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res
// 			.status(404)
// 			.json({ success: false, message: 'invalid product id' });
// 	}
// 	try {
// 		const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
// 			new: true,
// 		});
// 		console.log(`updated User to send: ${updatedUser}`);
// 		res.status(201).json({ success: true, data: updatedUser });
// 	} catch (error) {
// 		console.error(`error in updating User: ${error.message}`);
// 		res.status(500).json({ success: false, message: 'server error' });
// 	}
// };

// export const deleteUser = async (req, res) => {
// 	const { id } = req.params;

// 	try {
// 		const deletedUser = await User.findByIdAndDelete(id);

// 		if (!deletedUser) {
// 			// findbyID would return null if User not found
// 			return res
// 				.status(404)
// 				.json({ success: false, message: 'User not found' });
// 		}

// 		// User was successfully deleted
// 		res.status(200).json({
// 			success: true,
// 			message: `User: ${deletedUser.name} deleted`,
// 		});
// 	} catch (error) {
// 		// If there was a server or validation error
// 		res.status(500).json({ success: false, message: 'Server Error' });
// 	}
// };
