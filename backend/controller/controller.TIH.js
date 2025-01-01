import fetchTIHAttractionData from "../services/fetchTIHAPI.js";

export const getTihData = async (req, res) => {
	try {
		// execute fetchTIHdata function, start with attraction
		const tihResponse = await fetchTIHAttractionData(
			'content/common/v2/search?dataset=attractions'
		);
		const tihData = tihResponse.data;
		// extract the UUID and make another req w getImageFile
		const tihUuidObjectList = [];
		tihData.forEach((attraction) => {
			const tihUuidObject = {};
			tihUuidObject.name = attraction.name;
			tihUuidObject.images = attraction.images;
			tihUuidObjectList.push(tihUuidObject);
		});
		// get the individual imgs uuid only into an array for each array in each attraction
		// console.log('TIHImgUUIDArray: ', tihUuidObjectList);
		res.status(200).json({
			success: 'true',
			data: tihUuidObjectList,
		});
	} catch (err) {
		console.error('error fetching TIH data: ', err);
	}
};
