import fetchTIHAttractionData from '../services/tih.services.js';
import TIHDocument from '../models/models.TIH.js';
/*this function has 3 functions:
- save info into db
-save image into cloudflare
-retrieve the info and image and display them */

export const getTihData = async (req, res) => {
	try {
		// Fetch TIH data
		const tihResponse = await fetchTIHAttractionData(
			'content/common/v2/search?dataset=attractions'
		);
		const tihData = tihResponse.data;

		// Initialize an array to track save results using map
		const savePromises = tihData.map(async (attraction) => {
			try {
				const newTIHObject = new TIHDocument({
					uuid: attraction.uuid,
					name: attraction.name,
					categoryDescription: attraction.categoryDescription,
					description: attraction.description,
					rating: attraction.rating,
					pricing: attraction.pricing?.others || 'N/A',
					address: attraction.address?.postalCode || 'Unknown',
					imagesUuid: attraction.images.map((image) => image.uuid),
					website: attraction.officialWebsite,
				});
				console.log('Saving new TIH object:', newTIHObject);

				await newTIHObject.save();
				return { success: true, uuid: attraction.uuid };
			} catch (err) {
				console.error('Error saving TIH object:', attraction, err);
				return { success: false, uuid: attraction.uuid, error: err.message };
			}
		});

		// Wait for all save operations to complete
		const results = await Promise.all(savePromises);

		// Check for errors and send a single response
		const failedSaves = results.filter((result) => !result.success);
		if (failedSaves.length !== 0) {
			return res.status(400).json({
				success: false,
				message: 'Some attractions failed to save',
				errors: failedSaves,
			});
		}

		// If all save operations succeed
		res.status(200).json({
			success: true,
			message: 'TIH API data successfully saved to MongoDB',
		});
	} catch (err) {
		console.error('Error fetching TIH data:', err);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

// export const displayTihData = () => { };
