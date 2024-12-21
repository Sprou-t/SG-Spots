import Comment from '../models/models.comment.js';
import User from '../models/models.users.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const getTokenFrom = (request) => {
	// get token from auth header of req
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	return null;
};

const verifyToken = (req, secret) => {
	try {
		const token = getTokenFrom(req);
		if (!token) {
			return { error: 'Token missing' };
		}
		const decodedToken = jwt.verify(token, secret);
		if (!decodedToken.id) {
			return { error: 'Invalid token: Missing user ID' };
		}
		return { decodedToken }; // Return decoded token if valid
	} catch (error) {
		return { error: 'Token invalid or expired' };
	}
};

export const getAllComment = async (req, res) => {
	try {
		const comment = await Comment.find({});
		res.status(200).json({ success: true, data: comment });
	} catch (error) {
		console.error(`error in obtaining itenaries: ${error.message}`);
		res.status(500).json({ success: false, message: 'server error' });
	}
};

export const createComment = async (req, res) => {
	const { error, decodedToken } = verifyToken(req, process.env.SECRET);

	if (error) {
		return res.status(401).json({
			success: false,
			message: error,
		});
	}

	// else continue to create the comment
	const user = await User.findById(decodedToken.id);

	const commentData = req.body;
	//check if req data is sent correctly
	if (!commentData.rating || !commentData.description) {
		return res
			.status(400)
			.json({ success: false, message: 'please input required fields!' });
	}

	const newComment = new Comment({
		authorId: user._id,
		rating: commentData.rating,
		description: commentData.description,
	});

	try {
		const savedComment = await newComment.save();
		user.comments = user.comments.concat(savedComment._id);
		await user.save();
		res.status(201).json({
			success: true,
			message: `Comment created: ${newComment}`,
		});
	} catch (error) {
		console.error(`error in comment creation: ${error.message}`);
		res.status(500).json({ success: false, message: 'server error' });
	}
};

export const updateComment = async (req, res) => {
	const { id } = req.params;
	const commentData = req.body;

	// Validate the comment ID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: 'Invalid comment ID' });
	}

	const { error, decodedToken } = verifyToken(req, process.env.SECRET);

	if (error) {
		return res.status(401).json({
			success: false,
			message: error,
		});
	}

	// Find the comment to be updated
	const comment = await Comment.findById(id);
	if (!comment) {
		return res
			.status(404)
			.json({ success: false, message: 'Comment not found' });
	}

	// Verify if the logged-in user is the author of the comment
	if (comment.authorId.toString() !== decodedToken.id) {
		return res.status(403).json({
			success: false,
			message: 'You are not authorized to update this comment',
		});
	}

	// Proceed to update the comment
	try {
		const updatedComment = await Comment.findByIdAndUpdate(
			id,
			commentData,
			{
				new: true, // Return the updated document
				runValidators: true, // Ensure the updated data adheres to schema validation
			}
		);
		res.status(200).json({ success: true, data: updatedComment });
	} catch (error) {
		console.error(`Error in updating comment: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

export const deleteComment = async (req, res) => {
	// Verify the token
	const { error, decodedToken } = verifyToken(req, process.env.SECRET);

	if (error) {
		return res.status(401).json({
			success: false,
			message: error,
		});
	}

	const { id } = req.params;

	try {
		// Find the comment by ID
		const comment = await Comment.findById(id);

		if (!comment) {
			// If the comment is not found
			return res
				.status(404)
				.json({ success: false, message: 'Comment not found' });
		}

		// Check if the user is the author of the comment
		if (comment.authorId.toString() !== decodedToken.id) {
			return res
				.status(403)
				.json({ success: false, message: 'Unauthorized to delete this comment' });
		}

		// Delete the comment
		await comment.deleteOne();

		// Send success response
		res.status(200).json({ success: true, message: 'Comment deleted' });
	} catch (error) {
		// Handle server errors
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

