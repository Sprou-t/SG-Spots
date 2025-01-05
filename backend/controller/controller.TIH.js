import {
	fetchTIHAttractionData,
	fetchTIHAttractionImage,
} from '../services/tihApi.services.js';
import TIHDocument from '../models/models.TIH.js';
import { extractImageFromS3, uploadImageToS3 } from '../services/s3.services.js';

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
export const uploadTihDataToMongoAndS3 = async (req, res) => {
	try {
		// Fetch TIH data
		const tihResponse = await fetchTIHAttractionData();
		const tihData = tihResponse.data;
		if (!tihResponse || !tihResponse.data) {
			// this is not redundant to the catch block as it gives specificity to error
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
								await uploadImageToS3(imageUuid, imageData); // upload to S3
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

					const S3UploadResult = await Promise.all(imagePromises);

					const failedUploads = S3UploadResult.filter(
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

export const retrieveTihDataFromMongoAndS3 = async (req, res) => {
	// retrieve data from mongo
	// retrieve image from S3
	// use a for loop to iterate thru every attraction
	// iterate thru the image array for each attraction to get the individual images
	try {
		const tihData = await TIHDocument.find();

		if (!tihData) {
			res.status(400).json({
				success: false,
				message: 'tihData not found in mongodb',
			});
		}
		// create an array that contains a new obj that has the image data
		// for display instead of uuid
		const tihArray = [];

		for (const attraction of tihData) {
			// for each attraction, create a new object and push to array
			const tihObjectForClientRender = {
				id: attraction.uuid, // From uuid field
				name: attraction.name, // From name field
				categoryDescription: attraction.categoryDescription, // From categoryDescription field
				description: attraction.description, // From description field
				rating: attraction.rating, // From rating field
				pricing: attraction.pricing, // From pricing field
				address: attraction.address, // From address field
				userReviews: attraction.userReviews, // From userReviews field (currently empty)
				images: [] // contains all the iamge data to be rendered in client
			};
			for (const imageUuid of attraction.imagesUuid) {
				// console.log("imageUuid ==> ", imageUuid);
				// loop thru images array and retrieve the images
				const extractedImgInfo = await extractImageFromS3(imageUuid)
				tihObjectForClientRender.images.push({
					imageUrl: extractedImgInfo
				})
			};
			tihArray.push(tihObjectForClientRender);
		};

		res.status(200).json({
			success: true,
			data: tihArray,
		});
	} catch (err) {
		console.error(
			'system error in retrieving data from mongo and S3: ',
			err
		);
		res.status(500).json({
			success: false,
			message: 'tihData not found in mongodb',
		});
	}
};

export const testExtractSingleImgFromS3 = async (req, res) => {
	const extractedImgInfo = await extractImageFromS3('101140f88a40e1941f19bff29c833c29590')
	console.log("extractedImgInfo ==> ", extractedImgInfo.slice(0, 40));
	res.status(200).json({ success: true })
}

// export const testSingleImageData = async (req, res) => {
// 	const imageData = await fetchTIHAttractionImage(
// 		'101140f88a40e1941f19bff29c833c29590'
// 	);
// 	const previewData = imageData.slice(0, 50);
// 	console.log('Is imageData a Buffer:', Buffer.isBuffer(imageData));
// 	console.log('Preview of imageData (buffer) ==> ', Buffer.from(imageData));
// 	await uploadImageToAws('101ffc63dfe013848d39f6511f8848ff923', imageData)
// 	res.status(200).json({ success: ' i guess?' })
// };
