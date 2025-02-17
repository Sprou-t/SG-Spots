import axios from 'axios';


const TIH_BASE_URL = 'https://api.stb.gov.sg';


export const fetchTIHData = async (dataset) => {
	const TIH_API_KEY = process.env.TIH_API_KEY;
	const endPoint = `content/common/v2/search?dataset=${dataset}`;
	const url = `${TIH_BASE_URL}/${endPoint}`;
	console.log("TIH_API_KEY ==> ", TIH_API_KEY);
	console.log('Request URL: ', url); // Log full URL
	try {
		const response = await axios.get(url, {
			headers: {
				'X-Content-Language': 'en',
				'X-API-Key': TIH_API_KEY,
			},
		});
		return response.data;
	} catch (err) {
		console.error(`error in fetching TIH data: ${err}`);
	}
};


export const fetchTIHImage = async (imageUuid) => {
	const TIH_API_KEY = process.env.TIH_API_KEY;
	const endPoint = 'media/download/v2';
	const url = `${TIH_BASE_URL}/${endPoint}/${imageUuid}`;
	try {
		const response = await axios.get(url, {
			headers: {
				'X-Content-Language': 'en',
				'X-API-Key': TIH_API_KEY,
			},
			params: {
				fileType: 'Thumbnail 1080h', // Set the query parameter here
			},
			responseType: 'arraybuffer',
		});
		return response.data;
	} catch (err) {
		console.error('error in fetching image: ', err);
	}
};
