import Review from '../models/models.review.js';
import User from '../models/models.users.js';
import Attraction from '../models/models.attraction.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';

// these 2 lines save the file in RAM,only by saving it in RAM can we
// ltr access the file as buffer and save it to mongodb
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add multer middleware to handle file uploads
export const uploadMiddleware = upload.single('avatar');

const getTokenFrom = (request) => {
	// get token from auth header of req
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	return null;
};

// verify whether token is valid
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
	let user;
	try {
		user = await User.findById(decodedToken.id);
	} catch (err) {
		console.error('error in finding user: ', err);
	}

	const reviewData = req.body;
	console.log('Request Headers:', req.headers); // Log headers
	console.log('Request Body:', req.body); // Log body to see if data is being parsed
	console.log('Request File:', req.file); // Log file to check if file is available

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

	if (req.file) {
		console.log('there is req.file!');
		// convert buffer data into b64 for rendering in frontend
		const b64 = new Buffer.from(req.file.buffer).toString('base64');
		newReview.image = {
			fileName: req.file.originalname,
			mimeType: req.file.mimetype,
			buffer: b64,
		};
	}
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
	const { error, decodedToken } = verifyToken(req, process.env.SECRET);
	const { id } = req.params; // must be id bcoz in route i set :id
	const reviewObjId = id;
	const reviewData = req.body;
	console.log('Uploaded file info:', req.file);

	// Log the request body to check other fields
	console.log('Request body:', req.body);

	// Validate the review ID
	if (!mongoose.Types.ObjectId.isValid(reviewObjId)) {
		return res
			.status(404)
			.json({ success: false, message: 'Invalid review ID' });
	}

	if (!reviewData.rating || !reviewData.description) {
		return res.status(400).json({
			success: false,
			message: 'missing rating or description!',
		});
	}

	if (error) {
		return res.status(401).json({
			success: false,
			message: error,
		});
	}
	// find the user and the attraction to update the review there
	// Find the review to be updated
	const review = await Review.findById(reviewObjId);
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

	const updatedReviewObj = {
		rating: reviewData.rating,
		description: reviewData.description,
	};

	if (req.file) {
		const b64 = new Buffer.from(req.file.buffer).toString('base64');
		updatedReviewObj.image = {
			fileName: req.file.originalname,
			mimeType: req.file.mimetype,
			buffer: b64,
		};
	}
	// Proceed to update the review
	try {
		const updatedReview = await Review.findByIdAndUpdate(
			reviewObjId,
			updatedReviewObj,
			{
				new: true, // Return the updated document
				runValidators: true, // Ensure the updated data adheres to schema validation
			}
		);

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
	console.log(' id  ==> ', id);

	try {
		// Find the review by ID
		const review = await Review.findById(id);
		console.log('review ==> ', review);

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

		// remove the review from both user and attraction
		// note that in attraction and user doc, only review ID is stored
		// .toString() is necessary in this context because MongoDB's ObjectId type is a special BSON object
		const user = await User.findById(review.authorId);
		console.log('user ==> ', user);
		const attraction = await Attraction.findById(review.attractionId);
		console.log('attraction ==> ', attraction);
		user.reviews = user.reviews.filter(
			(reviewId) => reviewId.toString() !== id
		);
		attraction.reviews = attraction.reviews.filter(
			(reviewId) => reviewId.toString() !== id
		);
		await user.save();
		await attraction.save();

		// Delete the review
		await review.deleteOne();

		// Send success response
		res.status(200).json({ success: true, message: 'Review deleted' });
	} catch (error) {
		// Handle server errors
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
