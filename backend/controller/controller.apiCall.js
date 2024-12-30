import fetchTIHData from '../services/fetchTIHAPI.js';
import Attraction from '../models/models.attraction.js';
/*TODO: change the implementation of getTIHdata and createTIHData in the 
future such that we are calling the api and not setting up a proxy db */

// export const getTIHData = async (req, res) => {
// 	try {
// 		const data = fetchTIHData;
// 		res.status(200).json({ success: true, message: `${data}` });
// 	} catch (err) {
// 		res.status(500).json({ success: false, message: 'server error' });
// 		console.error(err);
// 	}
// };

// export const addTIHData = async (req, res) => {

// };
export const getAttractionById = async (req, res) => {
	const { id } = req.params; // Extract the id from the request parameters

	try {
		const attraction = await Attraction.findById(id).populate({
			path: 'reviews',
			populate: { path: 'authorId', select: 'username' },
		}); // Fetch the attraction by ID from the database

		if (!attraction) {
			return res.status(404).json({
				success: false,
				message: `No attraction found with ID: ${_id}`,
			});
		}

		res.status(200).json({
			success: true,
			message: 'Attraction retrieved successfully',
			attractionData: attraction,
		});
	} catch (error) {
		console.error(
			`Error retrieving attraction with ID ${id}: ${error.message}`
		);

		// Handle invalid ObjectId errors
		if (error.kind === 'ObjectId') {
			return res.status(400).json({
				success: false,
				message: 'Invalid ID format',
			});
		}

		res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const getAllAttractions = async (req, res) => {
	try {
		const attractions = await Attraction.find(); // Fetch all attractions from the database
		if (!attractions || attractions.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'No attractions found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Attractions retrieved successfully',
			attractionData: attractions,
		});
	} catch (error) {
		console.error(`Error retrieving attractions: ${error.message}`);
		res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const createAttraction = async (req, res) => {
	const attractionData = req.body;

	// Check if the required data is provided
	if (
		!attractionData.title ||
		!attractionData.address ||
		!attractionData.pricing
	) {
		return res.status(400).json({
			success: false,
			message:
				'Please input required fields: title, address, and pricing!',
		});
	}

	const newAttraction = new Attraction({
		title: attractionData.title,
		id: attractionData.id, // If this should be auto-generated, you can omit it here
		type: attractionData.type,
		description: attractionData.description,
		rating: attractionData.rating,
		pricing: attractionData.pricing,
		address: attractionData.address,
		openingTime: attractionData.openingTime,
		closingTime: attractionData.closingTime,
		imageURL: attractionData.imageURL,
		website: attractionData.website,
		tags: attractionData.tags,
		reviews: attractionData.reviews,
	});

	try {
		const savedAttraction = await newAttraction.save();
		res.status(201).json({
			success: true,
			message: `Attraction created successfully: ${savedAttraction}`,
		});
	} catch (error) {
		console.error(`Error in attraction creation: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
