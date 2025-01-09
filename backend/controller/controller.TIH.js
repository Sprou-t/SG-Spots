import { fetchTIHData, fetchTIHImage } from '../services/tihApi.services.js';
import TIHDocument from '../models/models.TIH.js';
import {
    extractImageFromS3,
    uploadImageToS3,
} from '../services/s3.services.js';

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
        const tihData = await fetchTIHData('accommodation');
        console.log('tihData ==> ', tihData);
        if (!tihData) {
            // this is not redundant to the catch block as it gives specificity to error
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch TIH data',
            });
        }

        // Initialize an array to track save results using map
        const results = await Promise.all(
            tihData.data.map(async (tihObject) => {
                /**1. save all the data in mongo
                 * 2. fetch the image from the other url
                 * 3. upload the image into cloudflare
                 */
                try {
                    const newTIHObject = new TIHDocument({
                        uuid: tihObject.uuid,
                        name: tihObject.name,
                        categoryDescription: tihObject.categoryDescription,
                        description: tihObject.description,
                        rating: tihObject.rating,
                        pricing: tihObject.pricing?.others || 'N/A',
                        address: tihObject.address?.postalCode || 'Unknown',
                        imagesUuid: tihObject.images.map((image) => image.uuid),
                        website: tihObject.officialWebsite,
                    });
                    console.log('Saving new TIH object:', newTIHObject);

                    await newTIHObject.save();

                    // request for image data from another url
                    const imagePromises = tihObject.images.map(
                        async (image) => {
                            const imageUuid = image.uuid;
                            try {
                                const imageData =
                                    await fetchTIHImage(imageUuid);
                                await uploadImageToS3(
                                    'tihImages',
                                    imageUuid,
                                    imageData
                                ); // upload to S3
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
                            uuid: tihObject.uuid,
                            message: 'Some images failed to upload',
                            errors: failedUploads,
                        };
                    }

                    // return the above obj from each promises for each tihObject iterable
                    // note that due to map, the promises would be resolved most likely in the array
                    return { success: true, uuid: tihObject.uuid };
                } catch (err) {
                    // Handle tihObject-level errors
                    console.error('Error saving TIH object:', tihObject, err);
                    return {
                        success: false,
                        uuid: tihObject.uuid,
                        error: `tihObject level save failed: ${err.message}`,
                    };
                }
            })
        );

        // Check for errors and send a single response
        const failedSaves = results.filter((result) => !result.success);
        if (failedSaves.length !== 0) {
            return res.status(400).json({
                success: false,
                message: 'Some tihObjects failed to save',
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
    // use a for loop to iterate thru every tihObject
    // iterate thru the image array for each tihObject to get the individual images
    try {
        const tihData = await TIHDocument.find();
        console.log(' tihData ==> ', tihData);

        if (!tihData) {
            res.status(400).json({
                success: false,
                message: 'tihData not found in mongodb',
            });
        }
        // create an array that contains a new obj that has the image data
        // for display instead of uuid
        const tihArray = [];

        for (const tihObject of tihData) {
            // for each tihObject, create a new object and push to array
            const tihObjectForClientRender = {
                id: tihObject.uuid, // From uuid field
                name: tihObject.name, // From name field
                categoryDescription: tihObject.categoryDescription, // From categoryDescription field
                description: tihObject.description, // From description field
                rating: tihObject.rating, // From rating field
                pricing: tihObject.pricing, // From pricing field
                address: tihObject.address, // From address field
                userReviews: tihObject.userReviews, // From userReviews field (currently empty)
                images: [], // contains all the iamge data to be rendered in client
            };
            for (const imageUuid of tihObject.imagesUuid) {
                // console.log("imageUuid ==> ", imageUuid);
                // loop thru images array and retrieve the images
                const extractedImgInfo = await extractImageFromS3(
                    'tihImages',
                    imageUuid
                );
                if (extractedImgInfo) {
                    tihObjectForClientRender.images.push(extractedImgInfo);
                }
            }
            tihArray.push(tihObjectForClientRender);
        }

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

export const retrieveSingleTihDataFromMongoAndS3 = async (req, res) => {
    const tihObjUuid = req.params.id;

    try {
        const tihObject = await TIHDocument.findOne({ uuid: tihObjUuid });
        console.log(' tihObject ==> ', tihObject);

        if (!tihObject) {
            return res.status(400).json({
                message: 'could not find tihObject',
            });
        }

        const tihObjectForClientRender = {
            uuid: tihObject.uuid, // From uuid field
            name: tihObject.name, // From name field
            categoryDescription: tihObject.categoryDescription, // From categoryDescription field
            description: tihObject.description, // From description field
            rating: tihObject.rating, // From rating field
            pricing: tihObject.pricing, // From pricing field
            address: tihObject.address, // From address field
            userReviews: tihObject.userReviews, // From userReviews field (currently empty)
            images: [], // contains all the iamge data to be rendered in client
        };

        for (const imageUuid of tihObject.imagesUuid) {
            // for each uuid, retrieve from aws
            const extractedImageFromAws = await extractImageFromS3(
                'tihImages',
                imageUuid
            );
            tihObjectForClientRender.images.push(extractedImageFromAws);
        }
        return res.status(200).json(tihObjectForClientRender);
    } catch (err) {
        return res
            .status(500)
            .json('failed in retrieving tih object from mongo and aws');
    }
};
