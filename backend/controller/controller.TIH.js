import {
	fetchTIHAttractionData,
	fetchTIHAttractionImage,
} from '../services/tih.services.js';
import TIHDocument from '../models/models.TIH.js';
import { uploadImageToR2 } from '../services/r2.services.js';

// TODO: 1. save the image to cloudflare 2. display the data into UI

/*this function has 3 inner functions:
- save info into db
-save image into cloudflare
-retrieve the info and image and display them */

/* for special functions like map and forEach, each iteration will not wait for 
 previous promise to be resolved bf continuing, thus put all the promises in
 promise.all where the function waits for all promise fulfillment or the first rejection
 however, the promises wont be fulfilled in the same order they are executed in. 
 for that, use for loop     */
export const getAndUploadTihData = async (req, res) => {
	try {
		// Fetch TIH data
		const tihResponse = await fetchTIHAttractionData();
		const tihData = tihResponse.data;
		if (!tihResponse || !tihResponse.data) { // this is not redundant to the catch block as it gives specificity to error
			return res.status(500).json({
				success: false,
				message: 'Failed to fetch TIH data',
			});
		}

		// Initialize an array to track save results using map
		const results = await Promise.all(
			tihData.map(async (attraction) => {
				/**1. save all the data in mongo
				 * 2. fetch the image from the other url
				 * 3. upload the image into cloudflare
				 */
				try {
					const newTIHObject = new TIHDocument({
						uuid: attraction.uuid,
						name: attraction.name,
						categoryDescription: attraction.categoryDescription,
						description: attraction.description,
						rating: attraction.rating,
						pricing: attraction.pricing?.others || 'N/A',
						address: attraction.address?.postalCode || 'Unknown',
						imagesUuid: attraction.images.map(
							(image) => image.uuid
						),
						website: attraction.officialWebsite,
					});
					console.log('Saving new TIH object:', newTIHObject);

					await newTIHObject.save();


					// request for image data from another url
					const imagePromises = attraction.images.map(
						async (image) => {
							const imageUuid = image.uuid;
							try {
								const imageData =
									await fetchTIHAttractionImage(imageUuid);
								await uploadImageToR2(imageUuid, imageData); // upload to r2
								return {
									success: true,
									imageUuid: imageUuid,
									message: 'image fetched and uploaded',
								};
							} catch (err) {
								return {
									suceess: false,
									imageUuid: imageUuid,
									error: `image failed to be fetched or uploaded: ${err.message}`,
								};
							}
						}
					);

					const r2UploadResult = await Promise.all(imagePromises);

					const failedUploads = r2UploadResult.filter(
						(result) => !result.success
					);
					if (failedUploads.length !== 0) {
						return {
							success: false,
							uuid: attraction.uuid,
							message: 'Some images failed to upload',
							errors: failedUploads,
						};
					}

					// return the above obj from each promises for each attraction iterable
					// note that due to map, the promises would be resolved most likely in the array
					return { success: true, uuid: attraction.uuid };
				} catch (err) {
					// Handle attraction-level errors
					console.error('Error saving TIH object:', attraction, err);
					return {
						success: false,
						uuid: attraction.uuid,
						error: `Attraction level save failed: ${err.message}`,
					};
				}
			})
		);

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
		return res.status(200).json({
			success: true,
			message: 'TIH API data successfully saved to MongoDB',
		});
	} catch (err) {
		console.error('Error fetching TIH data:', err);
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error in fetching and uploading data',
			error: err.message,
		});
	}
};

// export const uploadTihImage = async (req, res) => {
// 	const fetchedImage = await fetchTIHAttractionImage(
// 		'101ffc63dfe013848d39f6511f8848ff923'
// 	);
// 	try {
// 		const uploadToR2Result = await uploadImageToR2(
// 			'101ffc63dfe013848d39f6511f8848ff923',
// 			fetchedImage
// 		);
// 		res.status(200).json({ success: true, image: fetchedImage });
// 	} catch (err) {
// 		res.status(500).json({ success: false, message: 'upload image to r2 unsuccessful' });
// 	}

// };

// export const displayTihData = () => { };
