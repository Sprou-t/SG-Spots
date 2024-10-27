import bcrypt from "bcrypt";
import User from "../models/models.users.js";
import mongoose from "mongoose";

export const getAllUser = async (req, res) => {
	try {
		const user = await User.find({}).populate('itenaries',{title: 1});
		res.status(200).json({ success: true, data: user });
	} catch (error) {
        console.error(`error in obtaining users: ${error.message}`);
		res.status(500).json({ success: false, message: "server error" });
	}
};

export const createUser = async (req, res) => {
	// sieve out the data from req.body
	const { username, name, password } = req.body;
	if (!username || !name || !password) {
		return res // immediately send a response back w/o creating user
			.status(401)
			.json({ success: false, message: "missing user info" });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ // note that itenaries will be an empty array by default
		username,
		name,
		passwordHash,      
	});

	try {
		await newUser.save();
		res.status(201).json({
			success: true,
			message: `user created: ${newUser}`,
		});
	} catch (error) {
        console.error(`error in user creation: ${error.message}`);
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
    // more like updatedUserData
	const updatedUserData = req.body; // this new update will be sent in using postman

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "invalid product id" });
	}
	try {
		const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
			new: true,
		});
		console.log(`updated User to send: ${updatedUser}`);
		res.status(201).json({ success: true, data: updatedUser });
	} catch (error) {
		console.error(`error in updating User: ${error.message}`);
		res.status(500).json({ success: false, message: "server error" });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedUser = await User.findByIdAndDelete(id);

		if (!deletedUser) {
			// findbyID would return null if User not found
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		// User was successfully deleted
		res.status(200).json({ success: true, message: `User: ${deletedUser.name} deleted` });
	} catch (error) {
		// If there was a server or validation error
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
