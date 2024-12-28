import Review from '../models/models.review.js';
import User from '../models/models.users.js';
import Attraction from '../models/models.attraction.js';
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

export const getAllReview = async (req, res) => {
	try {
		const review = await Review.find({});
		res.status(200).json({ success: true, data: review });
	} catch (error) {
		console.error(`error in obtaining itenaries: ${error.message}`);
		res.status(500).json({ success: false, message: 'server error' });
	}
};

export const createReview = async (req, res) => {
	const { error, decodedToken } = verifyToken(req, process.env.SECRET);

	if (error) {
		return res.status(401).json({
			success: false,
			message: error,
		});
	}

	// else continue to create the review
	const user = await User.findById(decodedToken.id);

	const reviewData = req.body;
	console.log('reviewData ==> ', reviewData);
	//check if req data is sent correctly
	if (!reviewData.rating || !reviewData.description) {
		return res
			.status(400)
			.json({ success: false, message: 'please input required fields!' });
	}

	const attraction = await Attraction.findById(reviewData.attractionId);

	const newReview = new Review({
		authorId: user._id,
		attractionId: reviewData.attractionId,
		rating: reviewData.rating,
		description: reviewData.description,
	});
	console.log('new review obj: ', newReview);

	try {
		const savedReview = await newReview.save();
		user.reviews = user.reviews.concat(savedReview._id);
		await user.save();
		attraction.reviews = attraction.reviews.concat(savedReview._id);
		await attraction.save();

		res.status(201).json({
			success: true,
			message: `Review created: ${newReview}`,
		});
	} catch (error) {
		console.error(`error in review creation: ${error.message}`);
		res.status(500).json({ success: false, message: 'server error' });
	}
};

export const updateReview = async (req, res) => {
	const { id } = req.params;
	const reviewData = req.body;

	// Validate the review ID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: 'Invalid review ID' });
	}

	const { error, decodedToken } = verifyToken(req, process.env.SECRET);

	if (error) {
		return res.status(401).json({
			success: false,
			message: error,
		});
	}

	// Find the review to be updated
	const review = await Review.findById(id);
	if (!review) {
		return res
			.status(404)
			.json({ success: false, message: 'Review not found' });
	}

	// Verify if the logged-in user is the author of the review
	if (review.authorId.toString() !== decodedToken.id) {
		return res.status(403).json({
			success: false,
			message: 'You are not authorized to update this review',
		});
	}

	// Proceed to update the review
	try {
		const updatedReview = await Review.findByIdAndUpdate(id, reviewData, {
			new: true, // Return the updated document
			runValidators: true, // Ensure the updated data adheres to schema validation
		});
		res.status(200).json({ success: true, data: updatedReview });
	} catch (error) {
		console.error(`Error in updating review: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

export const deleteReview = async (req, res) => {
	// Verify the token
	const { error, decodedToken } = verifyToken(req, process.env.SECRET);

	if (error) {
		return res.status(401).json({
			success: false,
			message: error,
		});
	}
	/* where does id come from? the frontend sends a delete
	req specifying the id in the http. it will be matched by 
	the route in the backend ~/review/:id so :id would be the 
	number sent and be extracted as id with req.params*/
	const { id } = req.params;

	try {
		// Find the review by ID
		const review = await Review.findById(id);

		if (!review) {
			// If the review is not found
			return res
				.status(404)
				.json({ success: false, message: 'Review not found' });
		}

		// Check if the user is the author of the review
		if (review.authorId.toString() !== decodedToken.id) {
			return res.status(403).json({
				success: false,
				message: 'Unauthorized to delete this review',
			});
		}

		// Delete the review
		await review.deleteOne();

		// Send success response
		res.status(200).json({ success: true, message: 'Review deleted' });
	} catch (error) {
		// Handle server errors
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
