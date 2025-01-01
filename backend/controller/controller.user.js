import bcrypt from 'bcrypt';
import User from '../models/models.users.js';
import jwt from 'jsonwebtoken';

// export const getAllUser = async (req, res) => {
// 	try {
// 		const user = await User.find({}).populate('itenaries', { title: 1 });
// 		res.status(200).json({ success: true, data: user });
// 	} catch (error) {
// 		console.error(`error in obtaining users: ${error.message}`);
// 		res.status(500).json({ success: false, message: 'server error' });
// 	}
// };

export const signUp = async (req, res) => {
	// sieve out the data from req.body
	// note username is for id purposes, name only as proxy id
	const { email, username, password } = req.body;
	if (!email || !username || !password) {
		return res // immediately send a response back w/o creating user
			.status(401)
			.json({ success: false, message: 'missing user info' });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const newUser = new User({
		// note that itenaries will be an empty array by default
		email,
		username,
		passwordHash,
	});

	try {
		await newUser.save();
		// extend the function to log user in
		login(req, res);
		console.log('signed up!');
	} catch (error) {
		console.error(`error in user creation: ${error.message}`);
		res.status(500).json({
			success: false,
			message: 'internal server error',
		});
	}
};

export const login = async (req, res) => {
	let passwordCorrect = false;
	const { email, password } = req.body;
	// check if username nad password matches
	// need {} bcoz we are finding w obj key
	const user = await User.findOne({ email });
	if (!user) {
		res.status(401).json({ success: false, message: 'incorrect username' });
	} else {
		passwordCorrect = await bcrypt.compare(
			//return true if same
			password,
			user.passwordHash
		);
	}

	if (!passwordCorrect) {
		res.status(401).json({ success: false, message: 'incorrect password' });
	}
	// else if correct create a token for user: token use to verify their identity on sub request w/o checking agn
	const userInfoForToken = {
		email: user.email,
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userInfoForToken, process.env.SECRET, {
		expiresIn: 48 * 60 * 60,
	});
	console.log('loggged in!');
	res.status(200).json({
		userId: user._id,
		token, // token: token
		email: user.email,
	});
};

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
