import axios from 'axios';

const TIH_BASE_URL = 'https://api.stb.gov.sg';


const fetchTIHAttractionData = async (endPoint) => {
	try {
		const TIH_API_KEY = process.env.TIH_API_KEY
		console.log("TIH_API_KEY ==> ", TIH_API_KEY);
		const url = `${TIH_BASE_URL}/${endPoint}`;
		console.log("Request URL: ", url);  // Log full URL
		const response = await axios.get(url, {
			headers: {
				'X-Content-Language': 'en',
				'X-API-Key': TIH_API_KEY,
			},
		});
		return response.data;
	} catch (error) {
		console.error(`error in fetching TIH data: ${error}`);
	}

};

export default fetchTIHAttractionData;
