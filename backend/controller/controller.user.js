import bcrypt from 'bcryptjs';
import User from '../models/models.users.js';
import jwt from 'jsonwebtoken';
import { getAuth } from 'firebase-admin/auth';
import sendVerificationEmail from '../firebase/nodemailer.js';
import TemporaryUser from '../models/models.tempUser.js'

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
		// Hash the password with bcrypt
		const saltRounds = bcrypt.genSaltSync(10); // Number of salt rounds
		const hashedPassword = bcrypt.hashSync(password, saltRounds);

		// send a verification to user email
		await sendVerificationEmail(username, email, password);

		// store in temp user first while user waits to be signed in
		const newUser = new User({
			email,
			username,
			passwordHash: hashedPassword,
		});
		await newUser.save();
		res.status(200).json({ success: true, message: 'User signed up. A copy of your authentication detail has been emailed. You may now log in' });
	} catch (error) {
		console.error(`error in user creation: ${error.message}`);
		res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

export const login = async (req, res) => {
	// login function will either get idTok en from req of sign up when user signs up 
	// or from frontend when user logs in
	const { email, password } = req.body;

	try {
		// Find user in the local database using Firebase UID (from decoded token)
		const user = await User.findOne({ email: email });

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: 'User not found' });
		}

		// Compare the provided password with the hashed password
		const passwordMatch = bcrypt.compareSync(password, user.passwordHash);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid password' });
		}

		// Generate a JWT token for the session
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
			success: true,
			data: {
				userId: user._id,
				token,
				email: user.email,
			}
		});
	} catch (error) {
		console.error(`Error in login: ${error.message}`);
		res.status(500).json({
			success: false,
			message: 'Invalid ID token or user not found',
		});
	}
};

